from django.urls import path
from .views import (
    RegisterAPI,
    LoginAPI,
    OnboardingAPI,
    ProfileAPI,
    ProfileUpdateAPI,
    LogoutAPI,
)

urlpatterns = [
    path("register/", RegisterAPI.as_view()),
    path("login/", LoginAPI.as_view()),
    path("onboarding/", OnboardingAPI.as_view()),
    path("profile/", ProfileAPI.as_view()),          
    path("profile/update/", ProfileUpdateAPI.as_view()),
    path("logout/", LogoutAPI.as_view()),
]
