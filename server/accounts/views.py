import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

from verification.services import generate_partial_report
from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    StudentOnboardingSerializer,
    ClientOnboardingSerializer,
    StudentProfileSerializer,
    ClientProfileSerializer,
)

logger = logging.getLogger(__name__)


def get_tokens(user):
    """Generate SimpleJWT access and refresh tokens for a user."""
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


class RegisterAPI(APIView):
    """
    Public endpoint for registering a new user with email, password, and role.
    Automatically generates linked profile via post_save signal.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response({
            "message": "Registered successfully",
            "tokens": get_tokens(user)
        }, status=status.HTTP_201_CREATED)


class LoginAPI(APIView):
    """
    Public endpoint for user authentication.
    Returns JWT tokens, role, and current onboarding stage.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]

        return Response({
            "tokens": get_tokens(user),
            "role": user.role,
            "onboarding_stage": user.onboarding_stage
        }, status=status.HTTP_200_OK)


class OnboardingAPI(APIView):
    """
    Authenticated endpoint for first-time profile onboarding.
    Validates role-specific profile details and initializes student analysis.
    """
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user

        if user.onboarding_stage >= 2:
            return Response(
                {"error": "Onboarding already completed"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if user.role == "student":
            serializer = StudentOnboardingSerializer(
                user.student_profile,
                data=request.data
            )
        elif user.role == "client":
            serializer = ClientOnboardingSerializer(
                user.client_profile,
                data=request.data
            )
        else:
            return Response({"error": "Invalid role"}, status=status.HTTP_400_BAD_REQUEST)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        if user.role == "student":
            try:
                generate_partial_report(user.id)
            except Exception:
                logger.exception("Async-safe partial report generation encountered error")

        user.onboarding_stage = 2
        user.verified = True
        user.save()

        return Response({
            "message": "Onboarding completed successfully",
            "profile": serializer.data
        }, status=status.HTTP_200_OK)


class ProfileAPI(APIView):
    """
    Authenticated endpoint to retrieve the current user's role-specific profile.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role == "student":
            serializer = StudentProfileSerializer(user.student_profile)
        elif user.role == "client":
            serializer = ClientProfileSerializer(user.client_profile)
        else:
            return Response({"error": "Invalid role"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProfileUpdateAPI(APIView):
    """
    Authenticated endpoint for partial updates to user profile information.
    """
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        user = request.user
        if user.role == "student":
            serializer = StudentProfileSerializer(
                user.student_profile,
                data=request.data,
                partial=True
            )
        elif user.role == "client":
            serializer = ClientProfileSerializer(
                user.client_profile,
                data=request.data,
                partial=True
            )
        else:
            return Response({"error": "Invalid role"}, status=status.HTTP_400_BAD_REQUEST)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        if user.role == "student":
            try:
                generate_partial_report(user.id)
            except Exception:
                logger.exception("Partial report regeneration encountered error")

        return Response({
            "message": "Profile updated",
            "data": serializer.data
        }, status=status.HTTP_200_OK)


class LogoutAPI(APIView):
    """
    Authenticated endpoint to blacklist the current JWT refresh token.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                return Response({"error": "Refresh token required"}, status=status.HTTP_400_BAD_REQUEST)
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
        except Exception:
            return Response({"error": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)
