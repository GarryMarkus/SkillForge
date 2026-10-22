from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import JobPost, JobApplication
from .serializers import JobPostSerializer, JobApplicationSerializer, ApplicantSerializer
from accounts.models import ClientProfile, StudentProfile


class CreateJobAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        if request.user.role != 'client':
            return Response({"error": "Only clients can post jobs"}, status=403)

        try:
            client_profile = request.user.client_profile
        except ClientProfile.DoesNotExist:
            return Response({"error": "Client profile not found"}, status=404)

        serializer = JobPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(client=client_profile)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ClientJobsAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if request.user.role != 'client':
            return Response({"error": "Unauthorized"}, status=403)

        try:
            client_profile = request.user.client_profile
            jobs = JobPost.objects.filter(client=client_profile).order_by('-created_at')
            serializer = JobPostSerializer(jobs, many=True)
            return Response(serializer.data)
        except ClientProfile.DoesNotExist:
            return Response([], status=200)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from .models import JobPost
from .serializers import JobPostSerializer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


class AllJobsAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):

        jobs = JobPost.objects.select_related("client")\
                              .prefetch_related("applications")\
                              .filter(status="open")\
                              .order_by("-created_at")

        # Non student → normal list
        if request.user.role != "student":
            serializer = JobPostSerializer(jobs, many=True)
            return Response(serializer.data)

        student = request.user.student_profile

        profile_text = " ".join([
            student.skills or "",
            student.education or "",
            student.experience_level or ""
        ])

        job_texts = [
            f"{j.title} {j.description} {j.skills_required}"
            for j in jobs
        ]

        vectorizer = TfidfVectorizer()
        vectors = vectorizer.fit_transform([profile_text] + job_texts)

        scores = cosine_similarity(
            vectors[0:1],
            vectors[1:]
        ).flatten()

        results = []

        for job, score in zip(jobs, scores):

            results.append({
                # 🔥 EXACT SAME KEYS (unchanged)
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

                # ✅ ONLY NEW FIELD
                "match": round(score * 100, 2)
            })

        results.sort(key=lambda x: x["match"], reverse=True)

        return Response(results)

class ApplyJobAPI(APIView):
    """Allows a student to apply to a job"""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        if request.user.role != 'student':
            return Response({"error": "Only students can apply"}, status=403)

        job_id = request.data.get('job_id')
        if not job_id:
            return Response({"error": "job_id is required"}, status=400)

        try:
            job = JobPost.objects.get(id=job_id, status='open')
            student_profile = request.user.student_profile
        except JobPost.DoesNotExist:
            return Response({"error": "Job not found or closed"}, status=404)
        except StudentProfile.DoesNotExist:
            return Response({"error": "Student profile not found"}, status=404)

        # Check if already applied
        if JobApplication.objects.filter(job=job, student=student_profile).exists():
            return Response({"error": "Already applied to this job"}, status=400)

        application = JobApplication.objects.create(job=job, student=student_profile)
        return Response({
            "message": "Application submitted successfully",
            "application_id": application.id
        }, status=201)


class MyApplicationsAPI(APIView):
    """Returns all applications for the logged-in student"""
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if request.user.role != 'student':
            return Response({"error": "Unauthorized"}, status=403)

        try:
            student_profile = request.user.student_profile
            applications = JobApplication.objects.filter(student=student_profile).order_by('-applied_at')
            serializer = JobApplicationSerializer(applications, many=True)
            return Response(serializer.data)
        except StudentProfile.DoesNotExist:
            return Response([], status=200)

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


class JobApplicantsAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, job_id):

        if request.user.role != "client":
            return Response({"error": "Unauthorized"}, status=403)

        try:
            job = JobPost.objects.select_related("client")\
                                 .prefetch_related("applications__student__user")\
                                 .get(id=job_id, client=request.user.client_profile)
        except JobPost.DoesNotExist:
            return Response({"error": "Job not found"}, status=404)

        applications = job.applications.all()

        if not applications:
            return Response([])

        job_text = f"{job.title} {job.description} {job.skills_required}"

      
        student_texts = []
        students = []

        for app in applications:
            s = app.student
            students.append(s)

            text = " ".join([
                s.skills or "",
                s.education or "",
                s.experience_level or ""
            ])

            student_texts.append(text)

       
        vectorizer = TfidfVectorizer()
        vectors = vectorizer.fit_transform([job_text] + student_texts)

        scores = cosine_similarity(
            vectors[0:1],
            vectors[1:]
        ).flatten()

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

             
                "match": round(score * 100, 2)
            })

        results.sort(key=lambda x: x["match"], reverse=True)

        return Response(results)
