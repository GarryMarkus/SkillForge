import logging
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from celery.result import AsyncResult
from accounts.permissions import IsStudentUser
from .tasks import generate_skill_test_task

logger = logging.getLogger(__name__)

from .personality_data import PERSONALITY_QUESTIONS
from .services import (
    generate_skill_test_for_student,
    submit_skill_test,
    submit_personality_assessment,
    get_recommendation,
)


class GenerateSkillTestAPI(APIView):
    """
    Generate dynamic assessment questions tailored to candidate strengths using Gemini LLM.
    Dispatches Celery background worker and returns 202 Accepted with task_id.
    """
    permission_classes = [IsAuthenticated, IsStudentUser]

    def post(self, request):
        try:
            category_id = request.data.get("category_id")
            task = generate_skill_test_task.delay(request.user.id, category_id)

            return Response({
                "task_id": str(task.id),
                "status": "QUEUED",
                "message": "Assessment generation initiated in background worker."
            }, status=status.HTTP_202_ACCEPTED)

        except Exception as exc:
            logger.exception("Failed to dispatch skill test generation task: %s", exc)
            return Response(
                {"error": "Failed to queue test generation. Ensure Celery broker is running."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class SubmitSkillTestAPI(APIView):
    """
    Submit completed answers for a proctored test attempt.
    Grades responses, computes score percentage, and generates final analysis.
    """
    permission_classes = [IsAuthenticated, IsStudentUser]

    def post(self, request):
        attempt_id = request.data.get("attempt_id")
        answers = request.data.get("answers")

        if not attempt_id or answers is None:
            return Response(
                {"error": "attempt_id and answers required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            result = submit_skill_test(
                student_id=request.user.id,
                attempt_id=attempt_id,
                answers=answers
            )
            return Response(result, status=status.HTTP_200_OK)
        except Exception:
            return Response(
                {"error": "Failed to evaluate test submission."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class PersonalityQuestionsAPI(APIView):
    """Returns the static bank of 7 psychometric personality questions."""
    permission_classes = [IsAuthenticated, IsStudentUser]

    def get(self, request):
        return Response(PERSONALITY_QUESTIONS, status=status.HTTP_200_OK)


class SubmitPersonalityAPI(APIView):
    """
    Submit answers to the 7-question psychometric test.
    Computes personality score and assigns learning pace level.
    """
    permission_classes = [IsAuthenticated, IsStudentUser]

    def post(self, request):
        answers = request.data.get("answers", {})
        result = submit_personality_assessment(request.user, answers)
        return Response(result, status=status.HTTP_200_OK)


class RecommendationAPI(APIView):
    """Retrieve the candidate's verified recommendation card, star rating, and tags."""
    permission_classes = [IsAuthenticated, IsStudentUser]

    def get(self, request):
        data = get_recommendation(request.user.id)
        return Response(data, status=status.HTTP_200_OK)


class TaskStatusAPI(APIView):
    """
    Check the status and result of an asynchronous Celery task.
    Returns: { "task_id": str, "status": "PENDING" | "STARTED" | "SUCCESS" | "FAILURE", "result": ... }
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, task_id):
        try:
            res = AsyncResult(task_id)
            task_status = res.status  # 'PENDING', 'STARTED', 'SUCCESS', 'FAILURE', 'RETRY', 'REVOKED'
        except Exception as exc:
            logger.warning("Could not query Celery result backend for task %s: %s", task_id, exc)
            return Response({
                "task_id": task_id,
                "status": "PENDING",
                "result": None
            }, status=status.HTTP_200_OK)

        result_payload = res.result if task_status == "SUCCESS" else None
        error_payload = str(res.result) if task_status == "FAILURE" else None

        response_data = {
            "task_id": task_id,
            "status": task_status,
            "result": result_payload
        }
        if error_payload:
            response_data["error"] = error_payload

        return Response(response_data, status=status.HTTP_200_OK)
