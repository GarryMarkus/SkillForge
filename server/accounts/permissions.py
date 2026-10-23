"""
Declarative role-based access control (RBAC) permissions for SkillForge API endpoints.
"""

from rest_framework.permissions import BasePermission


class IsStudentUser(BasePermission):
    """
    Grants access only to authenticated users with the 'student' role.
    """
    message = "Only candidates with a student role can access this resource."

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and getattr(request.user, "role", None) == "student"
        )


class IsClientUser(BasePermission):
    """
    Grants access only to authenticated users with the 'client' (recruiter) role.
    """
    message = "Only recruiters with a client role can access this resource."

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and getattr(request.user, "role", None) == "client"
        )


class HasCompletedOnboarding(BasePermission):
    """
    Grants access only to users who have completed initial profile onboarding (stage >= 2).
    """
    message = "User must complete profile onboarding before accessing this resource."

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and getattr(request.user, "onboarding_stage", 0) >= 2
        )


# Aliases for backwards compatibility
IsStudent = IsStudentUser
IsClient = IsClientUser
