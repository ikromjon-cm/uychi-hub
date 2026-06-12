from rest_framework import serializers
from .models import MeetingRequest


class MeetingRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeetingRequest
        fields = "__all__"
        read_only_fields = ["is_read", "created_at"]
