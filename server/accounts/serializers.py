from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import User, StudentProfile, ClientProfile
from .validators import validate_pdf_resume


class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for new user registration with email, password, and role."""
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["email", "password", "role"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    """Serializer for authenticating users via email and password."""
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(email=data["email"], password=data["password"])
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        data["user"] = user
        return data


class StudentOnboardingSerializer(serializers.ModelSerializer):
    """Serializer for initial student onboarding information."""
    resume = serializers.FileField(validators=[validate_pdf_resume], required=False, allow_null=True)

    class Meta:
        model = StudentProfile
        fields = [
            "full_name",
            "location",
            "bio",
            "education",
            "experience_level",
            "github_url",
            "portfolio_links",
            "skills",
            "resume",
        ]
        extra_kwargs = {
            "full_name": {"required": True},
            "skills": {"required": True},
            "education": {"required": True},
        }


class ClientOnboardingSerializer(serializers.ModelSerializer):
    """Serializer for initial recruiter/client onboarding information."""
    class Meta:
        model = ClientProfile
        fields = [
            "company_name",
            "industry",
            "website",
            "address",
        ]
        extra_kwargs = {
            "company_name": {"required": True},
        }


class StudentProfileSerializer(serializers.ModelSerializer):
    """Serializer for reading and updating student profile data."""
    email = serializers.EmailField(source="user.email", read_only=True)
    resume = serializers.FileField(validators=[validate_pdf_resume], required=False, allow_null=True)

    class Meta:
        model = StudentProfile
        fields = [
            "email",
            "full_name",
            "location",
            "bio",
            "education",
            "experience_level",
            "github_url",
            "portfolio_links",
            "skills",
            "resume",
            "rating",
        ]


class ClientProfileSerializer(serializers.ModelSerializer):
    """Serializer for reading and updating recruiter/client profile data."""
    email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:
        model = ClientProfile
        fields = [
            "email",
            "company_name",
            "industry",
            "website",
            "address",
        ]
