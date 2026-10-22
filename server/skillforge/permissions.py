"""
Custom role-based access control (RBAC) permissions for Django REST Framework.
"""
from rest_framework.permissions import BasePermission


class IsStudent(BasePermission):
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


class IsClient(BasePermission):
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


class IsAdminUserRole(BasePermission):
    """
    Grants access only to staff or users with the 'admin' role.
    """
    message = "Administrator privileges required."

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and (request.user.is_staff or getattr(request.user, "role", None) == "admin")
        )
