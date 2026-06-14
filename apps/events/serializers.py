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
        validators = []  # unique_together ni o'zimiz tekshiramiz

    def validate(self, data):
        event = data.get("event") or (self.instance.event if self.instance else None)
        if event and event.is_full:
            raise serializers.ValidationError({"event": "Tadbir joylari to'lgan."})
        email = data.get("email")
        if event and email:
            qs = EventRegistration.objects.filter(event=event, email=email)
            if self.instance:
                qs = qs.exclude(pk=self.instance.pk)
            if qs.exists():
                raise serializers.ValidationError({"email": "Bu email bilan allaqachon ro'yxatdan o'tilgan."})
        return data
