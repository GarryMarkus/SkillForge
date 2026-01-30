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


class AllJobsAPI(APIView):
    """Returns all open jobs for students to browse"""
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        jobs = JobPost.objects.filter(status='open').order_by('-created_at')
        serializer = JobPostSerializer(jobs, many=True)
        return Response(serializer.data)


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


class JobApplicantsAPI(APIView):
    """Returns all applicants for a specific job (for clients)"""
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, job_id):
        if request.user.role != 'client':
            return Response({"error": "Unauthorized"}, status=403)

        try:
            client_profile = request.user.client_profile
            job = JobPost.objects.get(id=job_id, client=client_profile)
        except (ClientProfile.DoesNotExist, JobPost.DoesNotExist):
            return Response({"error": "Job not found"}, status=404)

        applications = job.applications.select_related('student__user').all()
        applicants = [app.student for app in applications]
        serializer = ApplicantSerializer(applicants, many=True)
        return Response(serializer.data)
