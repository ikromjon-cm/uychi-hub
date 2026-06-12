from rest_framework import viewsets, permissions
from .models import Partner
from .serializers import PartnerSerializer


class PartnerViewSet(viewsets.ModelViewSet):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["category", "tier", "status", "country"]
    search_fields = ["name", "website"]
    ordering_fields = ["name", "created_at"]
