from rest_framework import viewsets, permissions
from .models import Investor
from .serializers import InvestorSerializer, InvestorPublicSerializer
from apps.utils.email import investor_admin, investor_confirm

PUBLIC_ACTIONS = ("list", "retrieve", "create")


class InvestorViewSet(viewsets.ModelViewSet):
    queryset = Investor.objects.all()
    serializer_class = InvestorSerializer
    filterset_fields = ["investor_type", "status", "country"]
    search_fields = ["company", "contact_name", "email", "sectors"]
    ordering_fields = ["created_at", "company"]

    def get_serializer_class(self):
        # Non-admins only ever see the public-safe fields.
        if not (self.request.user and self.request.user.is_staff) and self.action in ("list", "retrieve"):
            return InvestorPublicSerializer
        return InvestorSerializer

    def get_queryset(self):
        qs = Investor.objects.all()
        if not (self.request.user and self.request.user.is_staff):
            qs = qs.filter(status="active")
        return qs

    def get_permissions(self):
        if self.action in PUBLIC_ACTIONS:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    def perform_create(self, serializer):
        investor = serializer.save()
        try:
            investor_admin(investor)
            investor_confirm(investor)
        except Exception:
            pass
