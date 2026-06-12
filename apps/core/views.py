from rest_framework import viewsets, permissions
from django_filters import rest_framework as filters
from .models import Infrastructure, Perk, Stat, HomepageStartup
from .serializers import (
    InfrastructureSerializer,
    PerkSerializer,
    StatSerializer,
    HomepageStartupSerializer,
)


class InfrastructureViewSet(viewsets.ModelViewSet):
    queryset = Infrastructure.objects.all()
    serializer_class = InfrastructureSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["accent"]
    search_fields = ["title", "description"]
    ordering_fields = ["order", "created_at"]


class PerkViewSet(viewsets.ModelViewSet):
    queryset = Perk.objects.all()
    serializer_class = PerkSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    search_fields = ["title", "description"]
    ordering_fields = ["order", "created_at"]


class StatViewSet(viewsets.ModelViewSet):
    queryset = Stat.objects.all()
    serializer_class = StatSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    search_fields = ["label"]
    ordering_fields = ["order"]


class HomepageStartupViewSet(viewsets.ModelViewSet):
    queryset = HomepageStartup.objects.all()
    serializer_class = HomepageStartupSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    search_fields = ["sector", "tagline", "tech_stack"]
    ordering_fields = ["order"]
