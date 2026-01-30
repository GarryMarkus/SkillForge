from rest_framework import serializers
from .models import JobPost, JobApplication
from accounts.models import ClientProfile, StudentProfile


class JobPostSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='client.company_name', read_only=True)
    applicant_count = serializers.SerializerMethodField()

    class Meta:
        model = JobPost
        fields = [
            'id', 'title', 'category', 'description',
            'budget_type', 'budget_amount', 'skills_required',
            'min_skill_score', 'status', 'created_at', 'company_name', 'applicant_count'
        ]
        read_only_fields = ['id', 'created_at', 'company_name', 'applicant_count']

    def get_applicant_count(self, obj):
        return obj.applications.count()

    def create(self, validated_data):
        return JobPost.objects.create(**validated_data)


class JobApplicationSerializer(serializers.ModelSerializer):
    job_title = serializers.CharField(source='job.title', read_only=True)
    company_name = serializers.CharField(source='job.client.company_name', read_only=True)

    class Meta:
        model = JobApplication
        fields = ['id', 'job', 'job_title', 'company_name', 'status', 'applied_at']
        read_only_fields = ['id', 'status', 'applied_at', 'job_title', 'company_name']


class ApplicantSerializer(serializers.ModelSerializer):
    """Serializer for client to view applicant details"""
    name = serializers.CharField(source='user.name', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    
    class Meta:
        model = StudentProfile
        fields = ['id', 'name', 'email', 'education', 'skills', 'experience_level', 'github_url', 'linkedin_url']
