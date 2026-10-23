from unittest.mock import patch, MagicMock
from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from skillforge.celery import app as celery_app
from verification.tasks import generate_partial_report_task, generate_skill_test_task

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

    def test_task_status_endpoint_pending(self):
        """Test task status endpoint returns PENDING for unresolved task ID."""
        response = self.client.get("/api/verification/tasks/dummy-task-id-12345/")
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

        response = self.client.get("/api/verification/tasks/mock-success-task-id/")
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

        response = self.client.get("/api/verification/tasks/mock-failure-task-id/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["status"], "FAILURE")
        self.assertIn("AI API timeout error", response.data["error"])
