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

    def test_answer_normalization_and_scoring(self):
        """Test is_answer_correct handles index, letter, and text inputs across variations."""
        from verification.services import is_answer_correct

        question = {
            "question": "What is Python?",
            "options": ["Animal", "Programming Language", "Car", "Country"],
            "correct_answer": "B"
        }

        # Candidate passed index 1 (corresponding to B)
        self.assertTrue(is_answer_correct(1, question))
        # Candidate passed letter "B"
        self.assertTrue(is_answer_correct("B", question))
        # Candidate passed lowercase letter "b"
        self.assertTrue(is_answer_correct("b", question))
        # Candidate passed exact option text
        self.assertTrue(is_answer_correct("Programming Language", question))
        # Incorrect choices
        self.assertFalse(is_answer_correct(0, question))
        self.assertFalse(is_answer_correct("A", question))
        self.assertFalse(is_answer_correct("Car", question))
        self.assertFalse(is_answer_correct(None, question))


class AnalysisTransparencyAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email="analysis_student@example.com",
            password="Password123!",
            role="student",
        )
        self.client.force_authenticate(user=self.user)
        self.profile = self.user.student_profile
        self.profile.full_name = "Priya Nair"
        self.profile.skills = "Python, Django, React"
        self.profile.github_url = "https://github.com/priyanair-dev"
        self.profile.save()

    @patch("verification.services.generate_final_report", return_value="Strong Python & React background.")
    @patch("verification.services.analyze_github_profile", return_value="Active GitHub repositories in Python and TypeScript.")
    @patch("verification.services.analyze_resume", return_value="Resume shows production API delivery.")
    @patch("verification.services.fetch_github_profile")
    @patch("verification.services.extract_text_from_pdf_fileobj", return_value="Priya Nair Built Django APIs and React dashboards with PostgreSQL.")
    def test_refresh_and_get_transparent_analysis_preserves_verified_stage(
        self,
        mock_pdf_extract,
        mock_github_fetch,
        mock_analyze_resume,
        mock_analyze_github,
        mock_summary,
    ):
        """Test GET /analysis/ and POST /analysis/refresh/ expose GitHub & Resume provenance and keep verified state."""
        from django.core.files.uploadedfile import SimpleUploadedFile
        from accounts.models import StudentReport, StudentContentAnalysis

        self.profile.resume = SimpleUploadedFile("priya_resume.pdf", b"%PDF-1.4\n%test", content_type="application/pdf")
        self.profile.save()

        # Pre-existing completed assessment state
        StudentReport.objects.create(
            student=self.profile,
            skill_test_score=88.0,
            personality_score=24.0,
            report_summary={
                "stage": "verified",
                "final": {"star_rating": 4.7, "strengths": ["Django"], "weaknesses": ["Redis"]},
            },
        )

        mock_github_fetch.return_value = {
            "username": "priyanair-dev",
            "name": "Priya Nair",
            "bio": "Backend Engineer",
            "public_repos": 2,
            "is_mock": False,
            "repos": [
                {
                    "name": "django-ledger",
                    "description": "High-throughput accounting API in Python",
                    "language": "Python",
                    "stars": 18,
                    "url": "https://github.com/priyanair-dev/django-ledger",
                }
            ],
        }

        res_refresh = self.client.post("/api/verification/analysis/refresh/", {}, format="json")
        self.assertEqual(res_refresh.status_code, status.HTTP_200_OK)
        data = res_refresh.data

        self.assertEqual(data["stage"], "verified")
        self.assertTrue(data["assessment_completed"])
        self.assertEqual(data["final_analysis"]["star_rating"], 4.7)
        self.assertEqual(data["resume_source"]["status"], "analyzed_pdf")
        self.assertIn("priya_resume.pdf", data["resume_source"]["filename"])
        self.assertGreater(data["resume_source"]["extracted_chars"], 10)
        self.assertIn("PostgreSQL", data["resume_source"]["matched_skills"])

        self.assertEqual(data["github_source"]["status"], "analyzed_live")
        self.assertEqual(data["github_source"]["username"], "priyanair-dev")
        self.assertEqual(len(data["github_source"]["repos"]), 1)
        self.assertFalse(data["github_source"]["is_mock"])

        # StudentContentAnalysis synced for both sources
        self.assertTrue(StudentContentAnalysis.objects.filter(student=self.profile, source_type="resume").exists())
        self.assertTrue(StudentContentAnalysis.objects.filter(student=self.profile, source_type="github").exists())

        res_get = self.client.get("/api/verification/analysis/")
        self.assertEqual(res_get.status_code, status.HTTP_200_OK)
        self.assertEqual(res_get.data["github_source"]["username"], "priyanair-dev")
        self.assertIn("Production API delivery".lower(), res_get.data["resume_analysis"].lower())


