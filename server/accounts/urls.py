from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterAPI,
    LoginAPI,
    OnboardingAPI,
    ProfileAPI,
    ProfileUpdateAPI,
    LogoutAPI,
)

urlpatterns = [
    path("register/", RegisterAPI.as_view(), name="register"),
    path("login/", LoginAPI.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("onboarding/", OnboardingAPI.as_view(), name="onboarding"),
    path("profile/", ProfileAPI.as_view(), name="profile"),          
    path("profile/update/", ProfileUpdateAPI.as_view(), name="profile-update"),
    path("logout/", LogoutAPI.as_view(), name="logout"),
]
