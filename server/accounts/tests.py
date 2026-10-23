from django.test import TestCase
from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.exceptions import ValidationError
from rest_framework.test import APIClient
from rest_framework import status
from accounts.models import StudentProfile, ClientProfile
from accounts.validators import validate_pdf_resume
from verification.utils.pdf_utils import extract_text_from_pdf_fileobj

User = get_user_model()


class AccountsAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.student_email = "student_test@example.com"
        self.recruiter_email = "recruiter_test@example.com"
        self.password = "SecurePassword123!"

    def test_student_registration(self):
        """Test registration endpoint creates user, profile, and returns JWT tokens."""
        payload = {
            "email": self.student_email,
            "password": self.password,
            "role": "student"
        }
        response = self.client.post("/api/accounts/register/", payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("tokens", response.data)
        self.assertIn("access", response.data["tokens"])
        self.assertIn("refresh", response.data["tokens"])
        self.assertEqual(response.data["role"], "student")

        # Verify DB persistence
        user = User.objects.filter(email=self.student_email).first()
        self.assertIsNotNone(user)
        self.assertTrue(user.check_password(self.password))
        self.assertTrue(StudentProfile.objects.filter(user=user).exists())

    def test_jwt_token_generation_and_login(self):
        """Test login endpoint authenticates user and returns valid SimpleJWT tokens."""
        User.objects.create_user(
            email=self.student_email,
            password=self.password,
            role="student"
        )
        login_payload = {
            "email": self.student_email,
            "password": self.password
        }
        response = self.client.post("/api/accounts/login/", login_payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("tokens", response.data)
        tokens = response.data["tokens"]
        self.assertTrue(bool(tokens["access"]))
        self.assertTrue(bool(tokens["refresh"]))

    def test_authenticated_profile_fetching(self):
        """Test profile endpoint retrieves the authenticated user's role-specific profile."""
        user = User.objects.create_user(
            email=self.student_email,
            password=self.password,
            role="student"
        )
        profile = user.student_profile
        profile.full_name = "Jane Developer"
        profile.skills = "Python, Django, React"
        profile.save()

        # Login to obtain JWT
        login_res = self.client.post("/api/accounts/login/", {
            "email": self.student_email,
            "password": self.password
        }, format="json")
        token = login_res.data["tokens"]["access"]

        # Fetch profile with bearer header
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        profile_res = self.client.get("/api/accounts/profile/")
        self.assertEqual(profile_res.status_code, status.HTTP_200_OK)
        self.assertEqual(profile_res.data["full_name"], "Jane Developer")
        self.assertEqual(profile_res.data["skills"], "Python, Django, React")

    def test_recruiter_profile_fetching(self):
        """Test recruiter profile retrieval with authenticated client credentials."""
        recruiter = User.objects.create_user(
            email=self.recruiter_email,
            password=self.password,
            role="client"
        )
        client_prof = recruiter.client_profile
        client_prof.company_name = "Acme Global"
        client_prof.industry = "FinTech"
        client_prof.save()

        login_res = self.client.post("/api/accounts/login/", {
            "email": self.recruiter_email,
            "password": self.password
        }, format="json")
        token = login_res.data["tokens"]["access"]

        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get("/api/accounts/profile/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["company_name"], "Acme Global")
        self.assertEqual(response.data["industry"], "FinTech")

    def test_permission_classes_role_validation(self):
        """Test IsStudentUser, IsClientUser, and HasCompletedOnboarding permissions."""
        from django.test import RequestFactory
        from accounts.permissions import IsStudentUser, IsClientUser, HasCompletedOnboarding

        factory = RequestFactory()
        student = User.objects.create_user(email="perm_student@example.com", password="Password123!", role="student", onboarding_stage=2)
        client = User.objects.create_user(email="perm_client@example.com", password="Password123!", role="client", onboarding_stage=1)

        req_student = factory.get("/test")
        req_student.user = student

        req_client = factory.get("/test")
        req_client.user = client

        # IsStudentUser
        self.assertTrue(IsStudentUser().has_permission(req_student, None))
        self.assertFalse(IsStudentUser().has_permission(req_client, None))

        # IsClientUser
        self.assertFalse(IsClientUser().has_permission(req_student, None))
        self.assertTrue(IsClientUser().has_permission(req_client, None))

        # HasCompletedOnboarding
        self.assertTrue(HasCompletedOnboarding().has_permission(req_student, None))
        self.assertFalse(HasCompletedOnboarding().has_permission(req_client, None))


class ResumeUploadSecurityTests(TestCase):
    def test_valid_pdf_magic_bytes_passes(self):
        """Test genuine PDF bytes starting with %PDF- pass validation."""
        valid_pdf = SimpleUploadedFile("resume.pdf", b"%PDF-1.4\n1 0 obj\n<<>>\nendobj", content_type="application/pdf")
        # Should not raise
        validate_pdf_resume(valid_pdf)

    def test_invalid_magic_bytes_raises_validation_error(self):
        """Test non-PDF binary payload renamed to .pdf fails validation."""
        fake_pdf = SimpleUploadedFile("malicious.pdf", b"NOT_A_REAL_PDF_STREAM", content_type="application/pdf")
        with self.assertRaises(ValidationError) as ctx:
            validate_pdf_resume(fake_pdf)
        self.assertIn("Invalid PDF file header", str(ctx.exception))

    def test_invalid_extension_raises_validation_error(self):
        """Test disallowed file extensions fail validation."""
        bad_ext = SimpleUploadedFile("script.sh", b"%PDF-1.4\nvalid header bad ext", content_type="application/pdf")
        with self.assertRaises(ValidationError) as ctx:
            validate_pdf_resume(bad_ext)
        self.assertIn("Invalid file extension", str(ctx.exception))

    def test_oversized_file_raises_validation_error(self):
        """Test files exceeding 5MB are rejected."""
        oversized = SimpleUploadedFile(
            "large.pdf",
            b"%PDF-" + (b"A" * (6 * 1024 * 1024)),
            content_type="application/pdf"
        )
        with self.assertRaises(ValidationError) as ctx:
            validate_pdf_resume(oversized)
        self.assertIn("exceeds maximum allowed threshold", str(ctx.exception))

    def test_safe_pdf_extraction_guards_corrupted_file(self):
        """Test extract_text_from_pdf_fileobj returns empty string for non-PDF without crashing."""
        corrupt_file = SimpleUploadedFile("corrupt.pdf", b"corrupted bytes", content_type="application/pdf")
        result = extract_text_from_pdf_fileobj(corrupt_file)
        self.assertEqual(result, "")
