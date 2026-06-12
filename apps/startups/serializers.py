from rest_framework import serializers
from .models import StartupApplication


class StartupApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = StartupApplication
        fields = "__all__"
        read_only_fields = ["status", "created_at", "updated_at"]
