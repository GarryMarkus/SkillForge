from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import UpskillModule
from .serializers import UpskillModuleSerializer
from .services import generate_upskill_module, list_user_modules


class GenerateUpskillModuleAPI(APIView):
    """
    Generate an AI learning module for a requested topic, calibrated to the student's learning level.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        topic = request.data.get("topic")
        if not topic or not str(topic).strip():
            return Response(
                {"error": "topic required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            module = generate_upskill_module(request.user.id, str(topic).strip())
            return Response({
                "module_id": module.id,
                "topic": module.topic,
                "level": module.level
            }, status=status.HTTP_201_CREATED)
        except Exception:
            return Response(
                {"error": "Failed to generate learning module. Ensure AI services are configured."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ListUpskillModulesAPI(APIView):
    """List all personalized learning modules generated for the authenticated student."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        modules = list_user_modules(request.user.id)
        serializer = UpskillModuleSerializer(modules, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GetUpskillModuleAPI(APIView):
    """Retrieve full markdown content and metadata for a specific learning module."""
    permission_classes = [IsAuthenticated]

    def get(self, request, module_id):
        try:
            module = UpskillModule.objects.get(id=module_id, user=request.user)
        except UpskillModule.DoesNotExist:
            return Response(
                {"error": "Learning module not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = UpskillModuleSerializer(module)
        return Response(serializer.data, status=status.HTTP_200_OK)
