from rest_framework import viewsets, permissions
from .models import Investor
from .serializers import InvestorSerializer
from apps.utils.email import investor_admin, investor_confirm


class InvestorViewSet(viewsets.ModelViewSet):
    queryset = Investor.objects.all()
    serializer_class = InvestorSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["investor_type", "status", "country"]
    search_fields = ["company", "contact_name", "email", "sectors"]
    ordering_fields = ["created_at", "company"]

    def get_permissions(self):
        if self.action in ("create",):
            self.permission_classes = [permissions.AllowAny]
        return super().get_permissions()

    def perform_create(self, serializer):
        investor = serializer.save()
        try:
            investor_admin(investor)
            investor_confirm(investor)
        except Exception:
            pass
