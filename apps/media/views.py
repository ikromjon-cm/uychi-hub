from rest_framework import viewsets, permissions
from .models import MediaItem
from .serializers import MediaItemSerializer


class MediaItemViewSet(viewsets.ModelViewSet):
    queryset = MediaItem.objects.all()
    serializer_class = MediaItemSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["media_type", "in_use"]
    search_fields = ["name", "alt_text"]
    ordering_fields = ["uploaded_at", "name"]
