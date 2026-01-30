from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .services import submit_personality_assessment
from .personality_data import PERSONALITY_QUESTIONS
from .services import *

class GenerateSkillTestAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            attempt = generate_skill_test_for_student(request.user.id)

            return Response({
                "attempt_id": attempt.id,
                "session_id": attempt.proctor_session.id if attempt.proctor_session else None,
                "category": attempt.category.name,
                "questions": attempt.generated_questions,
                "total_questions": attempt.total_questions
            })

        except Exception:
            return Response(
                {"error": "Failed to generate test"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )



class SubmitSkillTestAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        attempt_id = request.data.get("attempt_id")
        answers = request.data.get("answers")

        if not attempt_id or not answers:
            return Response(
                {"error": "attempt_id and answers required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        result = submit_skill_test(
            student_id=request.user.id,
            attempt_id=attempt_id,
            answers=answers
        )

        return Response(result)

class PersonalityQuestionsAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(PERSONALITY_QUESTIONS)


class SubmitPersonalityAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        result = submit_personality_assessment(
            request.user,
            request.data.get("answers", {})
        )
        return Response(result)
