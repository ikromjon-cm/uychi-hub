from rest_framework import viewsets, permissions
from .models import Event, EventRegistration
from .serializers import EventSerializer, EventRegistrationSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.exclude(status="cancelled")
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["event_type", "status", "accent"]
    search_fields = ["title", "description", "speaker", "location", "tags"]
    ordering_fields = ["date", "registered_count", "created_at"]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Event.objects.all()
        return Event.objects.exclude(status="cancelled")


class EventRegistrationViewSet(viewsets.ModelViewSet):
    queryset = EventRegistration.objects.all()
    serializer_class = EventRegistrationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["status", "event"]
    search_fields = ["full_name", "email", "phone"]
    ordering_fields = ["created_at"]

    def get_permissions(self):
        if self.action == "create":
            return [permissions.AllowAny()]
        return super().get_permissions()

    def perform_create(self, serializer):
        registration = serializer.save()
        event = registration.event
        event.registered_count += 1
        event.save(update_fields=["registered_count"])
