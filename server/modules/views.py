from .serializers import UpskillModuleSerializer
from .services import generate_upskill_module, list_user_modules
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import UpskillModule

class GenerateUpskillModuleAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        topic = request.data.get("topic")

        if not topic:
            return Response({"error": "topic required"}, status=400)

        module = generate_upskill_module(request.user.id, topic)

        return Response({
            "module_id": module.id,
            "topic": module.topic,
            "level": module.level
        })


class ListUpskillModulesAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        modules = list_user_modules(request.user.id)

        serializer = UpskillModuleSerializer(modules, many=True)

        return Response(serializer.data)


class GetUpskillModuleAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, module_id):

        module = UpskillModule.objects.get(id=module_id, user=request.user)

        serializer = UpskillModuleSerializer(module)

        return Response(serializer.data)
