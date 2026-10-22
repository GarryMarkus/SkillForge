from django.utils import timezone
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Exam, Question, ExamSession, ProctorEvent
from .risk import update_risk
from .serializers import ExamSerializer, QuestionSerializer


class ExamListView(APIView):
    """List all available active exams."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        exams = Exam.objects.filter(is_active=True)
        serializer = ExamSerializer(exams, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class StartExamView(APIView):
    """Start an active proctoring session for a candidate taking a specific exam."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        exam_id = request.data.get("exam_id")
        if not exam_id:
            return Response(
                {"error": "exam_id is required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            exam = Exam.objects.get(id=exam_id, is_active=True)
        except Exam.DoesNotExist:
            return Response(
                {"error": "Exam not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        session = ExamSession.objects.create(
            user=request.user,
            exam=exam
        )
        return Response(
            {"session_id": session.id},
            status=status.HTTP_201_CREATED
        )


class ExamQuestionView(APIView):
    """Retrieve all questions for an exam with correct answers excluded."""
    permission_classes = [IsAuthenticated]

    def get(self, request, exam_id):
        questions = Question.objects.filter(exam_id=exam_id)
        if not questions.exists():
            return Response(
                {"error": "No questions found for this exam"},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProctorEventView(APIView):
    """
    Log a real-time anti-cheat violation event from client webcam/focus sensors,
    compute cumulative penalty risk, and evaluate if session should be flagged.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        session_id = request.data.get("session_id")
        event = request.data.get("event_type")
        try:
            confidence = float(request.data.get("confidence", 1.0))
        except (ValueError, TypeError):
            confidence = 1.0

        if not session_id or not event:
            return Response(
                {"error": "session_id and event_type are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            session = ExamSession.objects.get(id=session_id, user=request.user, is_active=True)
        except ExamSession.DoesNotExist:
            return Response(
                {"error": "Active exam session not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        ProctorEvent.objects.create(
            session=session,
            event_type=event,
            confidence=confidence
        )
        update_risk(session, event, confidence)

        return Response(
            {
                "risk": session.risk_score,
                "flagged": session.is_flagged
            },
            status=status.HTTP_200_OK
        )


class EndExamView(APIView):
    """Conclude an exam session, record completion timestamp, and return final risk rating."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        session_id = request.data.get("session_id")
        if not session_id:
            return Response(
                {"error": "session_id is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            session = ExamSession.objects.get(id=session_id, user=request.user)
        except ExamSession.DoesNotExist:
            return Response(
                {"error": "Session not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        session.is_active = False
        session.ended_at = timezone.now()
        session.save()

        return Response(
            {
                "final_risk": session.risk_score,
                "flagged": session.is_flagged
            },
            status=status.HTTP_200_OK
        )
