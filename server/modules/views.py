from django.utils import timezone
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from accounts.permissions import IsStudentUser

from .models import UpskillModule, ModuleProgress
from .serializers import UpskillModuleSerializer
from .services import generate_upskill_module, list_user_modules


class GenerateUpskillModuleAPI(APIView):
    """
    Generate an AI learning module for a requested topic, calibrated to the student's learning level.
    """
    permission_classes = [IsAuthenticated, IsStudentUser]

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
    permission_classes = [IsAuthenticated, IsStudentUser]

    def get(self, request):
        modules = list_user_modules(request.user.id)
        serializer = UpskillModuleSerializer(modules, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GetUpskillModuleAPI(APIView):
    """Retrieve full markdown content and metadata for a specific learning module."""
    permission_classes = [IsAuthenticated, IsStudentUser]

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


class ModuleProgressAPI(APIView):
    """Record or retrieve completion progress for an adaptive upskill module."""
    permission_classes = [IsAuthenticated, IsStudentUser]

    def post(self, request):
        module_id = request.data.get("module_id")
        if not module_id:
            return Response({"error": "module_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            module = UpskillModule.objects.get(id=module_id, user=request.user)
        except UpskillModule.DoesNotExist:
            return Response({"error": "Learning module not found"}, status=status.HTTP_404_NOT_FOUND)

        progress, _ = ModuleProgress.objects.get_or_create(module=module)
        progress.completed = True
        progress.completed_at = timezone.now()
        progress.save()

        return Response({
            "status": "completed",
            "module_id": module.id,
            "completed": progress.completed,
            "completed_at": progress.completed_at
        }, status=status.HTTP_200_OK)

    def get(self, request):
        module_id = request.query_params.get("module_id")
        if module_id:
            try:
                module = UpskillModule.objects.get(id=module_id, user=request.user)
                progress = getattr(module, "progress", None)
                first_prog = progress.first() if progress else None
                return Response({
                    "module_id": module.id,
                    "completed": first_prog.completed if first_prog else False,
                    "completed_at": first_prog.completed_at if first_prog else None
                }, status=status.HTTP_200_OK)
            except UpskillModule.DoesNotExist:
                return Response({"error": "Learning module not found"}, status=status.HTTP_404_NOT_FOUND)

        completed_ids = list(ModuleProgress.objects.filter(
            module__user=request.user,
            completed=True
        ).values_list("module_id", flat=True))
        return Response({"completed_module_ids": completed_ids}, status=status.HTTP_200_OK)
