from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from accounts.models import StudentReport
from project.models import JobPost, JobApplication

User = get_user_model()


class ProjectAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Recruiter user and client profile
        self.recruiter = User.objects.create_user(
            email="recruiter_hiring@example.com",
            password="Password123!",
            role="client"
        )
        self.client_profile = self.recruiter.client_profile
        self.client_profile.company_name = "CloudScale Systems"
        self.client_profile.save()

        # Student user and profile
        self.student = User.objects.create_user(
            email="student_applicant@example.com",
            password="Password123!",
            role="student"
        )
        self.student_profile = self.student.student_profile
        self.student_profile.full_name = "Jordan Lee"
        self.student_profile.skills = "Python, Django, React"
        self.student_profile.save()

        # Verified report with high skill score
        self.report = StudentReport.objects.create(
            student=self.student_profile,
            personality_score=85.0,
            skill_test_score=90.0,
            report_summary={"status": "verified"}
        )

    def test_recruiter_can_create_job_post(self):
        """Test recruiter can publish a new job posting."""
        self.client.force_authenticate(user=self.recruiter)
        payload = {
            "title": "Backend Python Specialist",
            "category": "Web Development",
            "description": "Building high-performance APIs and microservices.",
            "budget_type": "fixed",
            "budget_amount": "5000.00",
            "skills_required": "Python, Django, PostgreSQL",
            "min_skill_score": 75,
            "status": "open"
        }
        response = self.client.post("/api/project/create/", payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["title"], "Backend Python Specialist")
        self.assertTrue(JobPost.objects.filter(title="Backend Python Specialist", client=self.client_profile).exists())

    def test_student_cannot_create_job_post(self):
        """Test students are rejected from creating job posts (IsClient permission)."""
        self.client.force_authenticate(user=self.student)
        payload = {
            "title": "Unauthorized Job",
            "category": "Web Development",
            "description": "Should fail",
            "budget_type": "fixed",
            "budget_amount": "1000.00",
            "skills_required": "Python",
            "min_skill_score": 50,
        }
        response = self.client.post("/api/project/create/", payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_student_can_apply_to_job(self):
        """Test verified student can apply to an open job post."""
        job = JobPost.objects.create(
            client=self.client_profile,
            title="Full-Stack Engineer",
            category="Web Development",
            description="Django + React work",
            budget_type="fixed",
            budget_amount=4000.00,
            skills_required="Python, React",
            min_skill_score=80,
            status="open"
        )

        self.client.force_authenticate(user=self.student)
        response = self.client.post("/api/project/apply/", {"job_id": job.id}, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("application_id", response.data)

        # Verify DB application state
        application = JobApplication.objects.filter(job=job, student=self.student_profile).first()
        self.assertIsNotNone(application)
        self.assertEqual(application.status, "pending")

    def test_duplicate_application_rejected(self):
        """Test student cannot submit multiple applications to the same job."""
        job = JobPost.objects.create(
            client=self.client_profile,
            title="Frontend Specialist",
            category="Web Development",
            description="React interface development",
            budget_type="fixed",
            budget_amount=3500.00,
            skills_required="React, TailwindCSS",
            min_skill_score=60,
            status="open"
        )

        self.client.force_authenticate(user=self.student)
        # First application succeeds
        res1 = self.client.post("/api/project/apply/", {"job_id": job.id}, format="json")
        self.assertEqual(res1.status_code, status.HTTP_201_CREATED)

        # Duplicate application rejected
        res2 = self.client.post("/api/project/apply/", {"job_id": job.id}, format="json")
        self.assertEqual(res2.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Already applied", res2.data["error"])

    def test_job_listings_and_applications_use_annotations_and_relations(self):
        """Test AllJobsAPI, ClientJobsAPI, and MyApplicationsAPI work seamlessly with annotations."""
        job = JobPost.objects.create(
            client=self.client_profile,
            title="Full-Stack Python Engineer",
            category="Web Development",
            description="Django + React work",
            budget_type="fixed",
            budget_amount=4000.00,
            skills_required="Python, React",
            min_skill_score=80,
            status="open"
        )
        JobApplication.objects.create(job=job, student=self.student_profile)

        # 1. Test recruiter ClientJobsAPI returns annotated applicant_count
        self.client.force_authenticate(user=self.recruiter)
        res_recruiter = self.client.get("/api/project/my-jobs/")
        self.assertEqual(res_recruiter.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res_recruiter.data), 1)
        self.assertEqual(res_recruiter.data[0]["applicant_count"], 1)

        # 2. Test student AllJobsAPI returns annotated applicant_count and match
        self.client.force_authenticate(user=self.student)
        res_student_jobs = self.client.get("/api/project/jobs/")
        self.assertEqual(res_student_jobs.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res_student_jobs.data), 1)
        self.assertEqual(res_student_jobs.data[0]["applicant_count"], 1)
        self.assertIn("match", res_student_jobs.data[0])

        # 3. Test student MyApplicationsAPI returns job_title and company_name with select_related
        res_apps = self.client.get("/api/project/my-applications/")
        self.assertEqual(res_apps.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res_apps.data), 1)
        self.assertEqual(res_apps.data[0]["job_title"], "Full-Stack Python Engineer")
        self.assertEqual(res_apps.data[0]["company_name"], "CloudScale Systems")
