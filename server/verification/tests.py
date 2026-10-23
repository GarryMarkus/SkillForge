from unittest.mock import patch, MagicMock
from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from skillforge.celery import app as celery_app
from verification.tasks import (
    generate_partial_report_task,
    generate_skill_test_task,
    generate_learning_module_task,
)

User = get_user_model()


class CeleryTaskQueueTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email="celery_test@example.com",
            password="Password123!",
            role="student"
        )
        self.client.force_authenticate(user=self.user)

    def test_celery_task_registration(self):
        """Test that verification tasks are properly discovered and registered in celery_app."""
        registered_tasks = celery_app.tasks
        self.assertIn("verification.tasks.generate_partial_report_task", registered_tasks)
        self.assertIn("verification.tasks.generate_skill_test_task", registered_tasks)
        self.assertIn("verification.tasks.generate_learning_module_task", registered_tasks)

    @patch("verification.views.generate_skill_test_task.delay")
    def test_generate_skill_test_async_dispatch(self, mock_delay):
        """Test generating assessment questions dispatches Celery task and returns 202 Accepted."""
        mock_task = MagicMock()
        mock_task.id = "test-uuid-98765"
        mock_delay.return_value = mock_task

        response = self.client.post("/api/verification/generate-test/", {"category_id": 1}, format="json")
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)
        self.assertEqual(response.data["task_id"], "test-uuid-98765")
        self.assertEqual(response.data["status"], "QUEUED")
        mock_delay.assert_called_once_with(self.user.id, 1)

    def test_task_status_endpoint_pending(self):
        """Test task status endpoint returns PENDING for unresolved task ID."""
        response = self.client.get("/api/verification/tasks/dummy-task-id-12345/status/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["status"], "PENDING")
        self.assertIsNone(response.data["result"])

    @patch("verification.views.AsyncResult")
    def test_task_status_endpoint_success(self, mock_async_result):
        """Test task status endpoint returns SUCCESS with payload for resolved task."""
        mock_instance = MagicMock()
        mock_instance.status = "SUCCESS"
        mock_instance.result = {"report_id": 42, "summary": "Great match"}
        mock_async_result.return_value = mock_instance

        response = self.client.get("/api/verification/tasks/mock-success-task-id/status/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["status"], "SUCCESS")
        self.assertEqual(response.data["result"]["report_id"], 42)

    @patch("verification.views.AsyncResult")
    def test_task_status_endpoint_failure(self, mock_async_result):
        """Test task status endpoint returns FAILURE for failed task."""
        mock_instance = MagicMock()
        mock_instance.status = "FAILURE"
        mock_instance.result = "AI API timeout error"
        mock_async_result.return_value = mock_instance

        response = self.client.get("/api/verification/tasks/mock-failure-task-id/status/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["status"], "FAILURE")
        self.assertIn("AI API timeout error", response.data["error"])

    def test_schema_validation_and_fallback(self):
        """Test Pydantic schema validation and fallback behavior for dynamic AI JSON payloads."""
        from verification.schemas import (
            GeneratedTestPayloadSchema,
            FinalReportSummarySchema,
            UpskillModuleContentSchema,
        )

        # 1. Valid test payload
        valid_raw_test = {
            "role": "Frontend Specialist",
            "questions": [
                {
                    "question": "What is the primary benefit of React Virtual DOM?",
                    "options": ["Direct DOM mutation", "Batched reconciliations", "Server threading", "SQL cache"],
                    "correct_answer": "B",
                    "difficulty": "Easy"
                }
            ]
        }
        test_schema = GeneratedTestPayloadSchema.validate_or_fallback(valid_raw_test)
        self.assertEqual(len(test_schema.questions), 1)
        self.assertEqual(test_schema.questions[0].correct_option, "B")

        # Fallback on corrupt input
        fallback_test = GeneratedTestPayloadSchema.validate_or_fallback("Not a dict at all")
        self.assertGreater(len(fallback_test.questions), 0)

        # 2. Final report schema validation
        valid_report = {
            "star_rating": 4.5,
            "strengths": ["Deep Django ORM knowledge"],
            "weaknesses": ["Async pipelines"],
            "technical_tags": ["Backend", "Python"]
        }
        report_schema = FinalReportSummarySchema.validate_or_fallback(valid_report)
        self.assertEqual(report_schema.star_rating, 4.5)
        self.assertIn("Deep Django ORM knowledge", report_schema.strengths)

        # Fallback on corrupt report input
        fallback_report = FinalReportSummarySchema.validate_or_fallback("{corrupt_json: true")
        self.assertTrue(1.0 <= fallback_report.star_rating <= 5.0)
        self.assertGreater(len(fallback_report.strengths), 0)

        # 3. Upskill module schema
        module_schema = UpskillModuleContentSchema.validate_or_fallback(
            {"content": "# Docker Guide", "metadata": {"estimated_hours": 2}},
            topic="Docker",
            level="fast"
        )
        self.assertIn("# Docker Guide", module_schema.content)

