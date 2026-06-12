from rest_framework import viewsets, permissions
from .models import ContactSubmission
from .serializers import ContactSubmissionSerializer
from apps.utils.email import contact_admin, contact_confirm


class ContactSubmissionViewSet(viewsets.ModelViewSet):
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionSerializer

    def get_permissions(self):
        if self.action in ("create",):
            self.permission_classes = [permissions.AllowAny]
        else:
            self.permission_classes = [permissions.IsAuthenticated]
        return super().get_permissions()

    def perform_create(self, serializer):
        submission = serializer.save()
        try:
            contact_admin(submission)
            contact_confirm(submission)
        except Exception:
            pass
