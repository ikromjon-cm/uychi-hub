from rest_framework import viewsets, permissions
from .models import MeetingRequest
from .serializers import MeetingRequestSerializer
from apps.utils.email import meeting_admin, meeting_confirm


class MeetingRequestViewSet(viewsets.ModelViewSet):
    queryset = MeetingRequest.objects.all()
    serializer_class = MeetingRequestSerializer

    def get_permissions(self):
        if self.action in ("create",):
            self.permission_classes = [permissions.AllowAny]
        else:
            self.permission_classes = [permissions.IsAuthenticated]
        return super().get_permissions()

    def perform_create(self, serializer):
        meeting = serializer.save()
        try:
            meeting_admin(meeting)
            meeting_confirm(meeting)
        except Exception:
            pass
