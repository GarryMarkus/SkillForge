"""
Custom exception handling for Django REST Framework views.
Standardizes error response payloads into a predictable {"error": ..., "detail": ...} envelope.
"""
from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status


def custom_exception_handler(exc, context):
    """
    Custom DRF exception handler that standardizes all error responses
    into a uniform JSON schema.
    """
    response = exception_handler(exc, context)

    if response is not None:
        error_message = response.status_text
        if isinstance(response.data, dict) and "detail" in response.data:
            detail = response.data["detail"]
        else:
            detail = response.data

        response.data = {
            "error": error_message,
            "detail": detail,
            "status_code": response.status_code,
        }

    return response
