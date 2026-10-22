from rest_framework import serializers
from .models import UpskillModule


class UpskillModuleSerializer(serializers.ModelSerializer):

    class Meta:
        model = UpskillModule
        fields = "__all__"
