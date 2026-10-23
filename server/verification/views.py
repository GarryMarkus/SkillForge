import logging
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from celery.result import AsyncResult
from accounts.permissions import IsStudentUser

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
    Provisions a proctored ExamSession.
    """
    permission_classes = [IsAuthenticated, IsStudentUser]

    def post(self, request):
        try:
            category_id = request.data.get("category_id")
            attempt = generate_skill_test_for_student(request.user.id, category_id)

            return Response({
                "attempt_id": attempt.id,
                "session_id": attempt.proctor_session.id if attempt.proctor_session else None,
                "category": attempt.category.name,
                "questions": attempt.generated_questions,
                "total_questions": attempt.total_questions
            }, status=status.HTTP_200_OK)

        except Exception:
            return Response(
                {"error": "Failed to generate test. Ensure AI services are configured."},
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
    Returns: { "status": "PENDING" | "SUCCESS" | "FAILURE", "result": ... }
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, task_id):
        try:
            res = AsyncResult(task_id)
            task_status = res.status  # 'PENDING', 'STARTED', 'SUCCESS', 'FAILURE', 'RETRY', 'REVOKED'
        except Exception as exc:
            logger.warning("Could not query Celery result backend for task %s: %s", task_id, exc)
            return Response({
                "status": "PENDING",
                "result": None
            }, status=status.HTTP_200_OK)

        if task_status == "SUCCESS":
            return Response({
                "status": "SUCCESS",
                "result": res.result
            }, status=status.HTTP_200_OK)
        elif task_status == "FAILURE":
            return Response({
                "status": "FAILURE",
                "error": str(res.result) if res.result else "Task execution failed"
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "status": "PENDING",
                "result": None
            }, status=status.HTTP_200_OK)
