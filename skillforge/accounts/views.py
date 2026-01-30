from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    StudentOnboardingSerializer,
    ClientOnboardingSerializer,
    StudentProfileSerializer,
    ClientProfileSerializer,
)

def get_tokens(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }



class RegisterAPI(APIView):
    permission_classes = []

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()

        return Response({
            "message": "Registered successfully",
            "tokens": get_tokens(user)
        })


class LoginAPI(APIView):
    permission_classes = []

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]

        return Response({
            "tokens": get_tokens(user),
            "role": user.role,
            "onboarding_stage": user.onboarding_stage
        })



class OnboardingAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request):
        user = request.user

        # prevent re-onboarding
        if user.onboarding_stage >= 2:
            return Response(
                {"error": "Onboarding already completed"},
                status=400
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
            return Response({"error": "Invalid role"}, status=400)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        user.onboarding_stage = 2
        user.verified = True
        user.save()

        return Response({
            "message": "Onboarding completed successfully",
            "profile": serializer.data
        })
class ProfileAPI(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        if user.role == "student":
            serializer = StudentProfileSerializer(user.student_profile)
        elif user.role == "client":
            serializer = ClientProfileSerializer(user.client_profile)
        else:
            return Response({"error": "Invalid role"}, status=400)
        return Response(serializer.data)
class ProfileUpdateAPI(APIView):
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
            return Response({"error": "Invalid role"}, status=400)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({
            "message": "Profile updated",
            "data": serializer.data
        })
class LoginAPI(APIView):
    permission_classes = []

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]

        return Response({
            "tokens": get_tokens(user),
            "role": user.role,
            "onboarding_stage": user.onboarding_stage
        })