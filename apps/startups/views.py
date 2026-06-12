from rest_framework import viewsets, permissions
from .models import StartupApplication
from .serializers import StartupApplicationSerializer
from apps.utils.email import startup_admin, startup_confirm


class StartupApplicationViewSet(viewsets.ModelViewSet):
    queryset = StartupApplication.objects.all()
    serializer_class = StartupApplicationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["stage", "status", "sector"]
    search_fields = ["startup_name", "founder_name", "email", "description"]
    ordering_fields = ["created_at", "updated_at", "funding_needed"]

    def get_permissions(self):
        if self.action in ("create",):
            self.permission_classes = [permissions.AllowAny]
        return super().get_permissions()

    def perform_create(self, serializer):
        application = serializer.save()
        try:
            startup_admin(application)
            startup_confirm(application)
        except Exception:
            pass
