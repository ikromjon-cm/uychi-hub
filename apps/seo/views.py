from rest_framework import viewsets, permissions
from .models import SEOPage
from .serializers import SEOPageSerializer


class SEOPageViewSet(viewsets.ModelViewSet):
    queryset = SEOPage.objects.all()
    serializer_class = SEOPageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["score", "issues"]
    search_fields = ["path", "title", "description", "keywords"]
    ordering_fields = ["path", "updated_at", "score"]
