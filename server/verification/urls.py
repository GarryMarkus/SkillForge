from django.urls import path
from .views import (
    GenerateSkillTestAPI,
    SubmitSkillTestAPI,
    PersonalityQuestionsAPI,
    SubmitPersonalityAPI,
    RecommendationAPI,
    VerificationAnalysisAPI,
    RefreshAnalysisAPI,
    TaskStatusAPI,
)

urlpatterns = [
    path("generate-test/", GenerateSkillTestAPI.as_view(), name="generate-test"),
    path("submit-test/", SubmitSkillTestAPI.as_view(), name="submit-test"),
    path("personality/questions/", PersonalityQuestionsAPI.as_view(), name="personality-questions"),
    path("personality/submit/", SubmitPersonalityAPI.as_view(), name="personality-submit"),
    path("recommendation/", RecommendationAPI.as_view(), name="recommendation"),
    path("analysis/", VerificationAnalysisAPI.as_view(), name="verification-analysis"),
    path("analysis/refresh/", RefreshAnalysisAPI.as_view(), name="verification-analysis-refresh"),
    path("tasks/<str:task_id>/status/", TaskStatusAPI.as_view(), name="task-status-endpoint"),
    path("tasks/<str:task_id>/", TaskStatusAPI.as_view(), name="task-status"),
]
