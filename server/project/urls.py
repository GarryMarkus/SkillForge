from django.urls import path
from .views import (
    CreateJobAPI,
    ClientJobsAPI,
    AllJobsAPI,
    ApplyJobAPI,
    MyApplicationsAPI,
    JobApplicantsAPI,
    ApplicationStatusUpdateAPI,
)

urlpatterns = [
    path('create/', CreateJobAPI.as_view(), name='create-job'),
    path('my-jobs/', ClientJobsAPI.as_view(), name='client-jobs'),
    path('jobs/', AllJobsAPI.as_view(), name='all-jobs'),
    path('apply/', ApplyJobAPI.as_view(), name='apply-job'),
    path('my-applications/', MyApplicationsAPI.as_view(), name='my-applications'),
    path('applicants/<int:job_id>/', JobApplicantsAPI.as_view(), name='job-applicants'),
    path('applications/<int:application_id>/status/', ApplicationStatusUpdateAPI.as_view(), name='update-application-status'),
]