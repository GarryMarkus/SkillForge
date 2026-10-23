from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from accounts.models import StudentProfile, ClientProfile

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
        user = User.objects.create_user(
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
