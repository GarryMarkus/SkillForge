"""
Custom role-based access control (RBAC) permissions for Django REST Framework.
Re-exports canonical permissions from accounts.permissions.
"""

from rest_framework.permissions import BasePermission
from accounts.permissions import (
    IsStudentUser,
    IsClientUser,
    HasCompletedOnboarding,
    IsStudent,
    IsClient,
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
