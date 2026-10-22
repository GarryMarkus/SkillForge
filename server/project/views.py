from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from accounts.models import ClientProfile, StudentProfile
from skillforge.permissions import IsClient, IsStudent
from .models import JobPost, JobApplication
from .serializers import JobPostSerializer, JobApplicationSerializer


class CreateJobAPI(APIView):
    """Allows authenticated clients (recruiters) to publish new project/job postings."""
    permission_classes = [IsAuthenticated, IsClient]

    def post(self, request):
        try:
            client_profile = request.user.client_profile
        except ClientProfile.DoesNotExist:
            return Response({"error": "Client profile not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = JobPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(client=client_profile)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ClientJobsAPI(APIView):
    """Returns all job postings created by the authenticated recruiter."""
    permission_classes = [IsAuthenticated, IsClient]

    def get(self, request):
        try:
            client_profile = request.user.client_profile
            jobs = JobPost.objects.filter(client=client_profile).order_by('-created_at')
            serializer = JobPostSerializer(jobs, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ClientProfile.DoesNotExist:
            return Response([], status=status.HTTP_200_OK)


class AllJobsAPI(APIView):
    """
    Returns open job postings.
    For student users, computes TF-IDF cosine similarity against their verified profile
    and appends a percentage 'match' score (0-100%).
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        jobs = list(
            JobPost.objects.select_related("client")
            .prefetch_related("applications")
            .filter(status="open")
            .order_by("-created_at")
        )

        if not jobs:
            return Response([], status=status.HTTP_200_OK)

        # Non-student roles receive un-ranked job list
        if getattr(request.user, "role", None) != "student":
            serializer = JobPostSerializer(jobs, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        student = request.user.student_profile
        profile_text = " ".join([
            student.skills or "",
            student.education or "",
            student.experience_level or ""
        ]).strip() or "general development"

        job_texts = [
            f"{j.title} {j.description} {j.skills_required}".strip() or "job description"
            for j in jobs
        ]

        vectorizer = TfidfVectorizer()
        vectors = vectorizer.fit_transform([profile_text] + job_texts)
        scores = cosine_similarity(vectors[0:1], vectors[1:]).flatten()

        results = []
        for job, score in zip(jobs, scores):
            results.append({
                "id": job.id,
                "title": job.title,
                "category": job.category,
                "description": job.description,
                "budget_type": job.budget_type,
                "budget_amount": job.budget_amount,
                "skills_required": job.skills_required,
                "min_skill_score": job.min_skill_score,
                "status": job.status,
                "created_at": job.created_at,
                "company_name": job.client.company_name if job.client else "",
                "applicant_count": job.applications.count(),
                "match": round(float(score) * 100, 2)
            })

        results.sort(key=lambda x: x["match"], reverse=True)
        return Response(results, status=status.HTTP_200_OK)


class ApplyJobAPI(APIView):
    """Allows an authenticated student to submit an application to an open job."""
    permission_classes = [IsAuthenticated, IsStudent]

    def post(self, request):
        job_id = request.data.get('job_id')
        if not job_id:
            return Response({"error": "job_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            job = JobPost.objects.get(id=job_id, status='open')
            student_profile = request.user.student_profile
        except JobPost.DoesNotExist:
            return Response({"error": "Job not found or closed"}, status=status.HTTP_404_NOT_FOUND)
        except StudentProfile.DoesNotExist:
            return Response({"error": "Student profile not found"}, status=status.HTTP_404_NOT_FOUND)

        if JobApplication.objects.filter(job=job, student=student_profile).exists():
            return Response({"error": "Already applied to this job"}, status=status.HTTP_400_BAD_REQUEST)

        if job.min_skill_score and job.min_skill_score > 0:
            report = getattr(student_profile, "report", None)
            score = float(report.skill_test_score) if (report and report.skill_test_score) else 0.0
            effective_score = score * 10 if job.min_skill_score > 100 and score <= 100 else score
            if effective_score < job.min_skill_score:
                return Response(
                    {"error": f"Minimum skill score of {job.min_skill_score} required to apply. Your current verified score is {round(score, 1)}."},
                    status=status.HTTP_403_FORBIDDEN
                )

        application = JobApplication.objects.create(job=job, student=student_profile)
        return Response({
            "message": "Application submitted successfully",
            "application_id": application.id
        }, status=status.HTTP_201_CREATED)


class MyApplicationsAPI(APIView):
    """Returns all job applications submitted by the logged-in student."""
    permission_classes = [IsAuthenticated, IsStudent]

    def get(self, request):
        try:
            student_profile = request.user.student_profile
            applications = JobApplication.objects.filter(student=student_profile).order_by('-applied_at')
            serializer = JobApplicationSerializer(applications, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except StudentProfile.DoesNotExist:
            return Response([], status=status.HTTP_200_OK)


class JobApplicantsAPI(APIView):
    """
    Returns all candidate applicants for a recruiter's job posting,
    ranked descending by TF-IDF profile match score.
    """
    permission_classes = [IsAuthenticated, IsClient]

    def get(self, request, job_id):
        try:
            job = JobPost.objects.select_related("client")\
                                 .prefetch_related("applications__student__user")\
                                 .get(id=job_id, client=request.user.client_profile)
        except JobPost.DoesNotExist:
            return Response({"error": "Job not found"}, status=status.HTTP_404_NOT_FOUND)

        applications = job.applications.all()
        if not applications:
            return Response([], status=status.HTTP_200_OK)

        job_text = f"{job.title} {job.description} {job.skills_required}".strip() or "general requirement"
        student_texts = []
        students = []

        for app in applications:
            s = app.student
            students.append(s)
            text = " ".join([
                s.skills or "",
                s.education or "",
                s.experience_level or ""
            ]).strip() or "candidate profile"
            student_texts.append(text)

        vectorizer = TfidfVectorizer()
        vectors = vectorizer.fit_transform([job_text] + student_texts)
        scores = cosine_similarity(vectors[0:1], vectors[1:]).flatten()

        results = []
        for student, score in zip(students, scores):
            results.append({
                "id": student.id,
                "name": student.full_name,
                "email": student.user.email,
                "education": student.education,
                "skills": student.skills,
                "experience_level": student.experience_level,
                "github_url": student.github_url,
                "match": round(float(score) * 100, 2)
            })

        results.sort(key=lambda x: x["match"], reverse=True)
        return Response(results, status=status.HTTP_200_OK)
