from rest_framework import serializers
from .models import Event, EventRegistration


class EventSerializer(serializers.ModelSerializer):
    is_full = serializers.BooleanField(read_only=True)

    class Meta:
        model = Event
        fields = "__all__"


class EventRegistrationSerializer(serializers.ModelSerializer):
    event_title = serializers.CharField(source="event.title", read_only=True)

    class Meta:
        model = EventRegistration
        fields = "__all__"
        read_only_fields = ["status", "created_at"]

    def validate(self, data):
        event = data.get("event") or (self.instance.event if self.instance else None)
        if event and event.is_full:
            raise serializers.ValidationError({"event": "Tadbir joylari to'lgan."})
        return data
