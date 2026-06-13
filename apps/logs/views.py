from rest_framework import viewsets, permissions
from .models import SystemLog
from .serializers import SystemLogSerializer


class SystemLogViewSet(viewsets.ModelViewSet):
    queryset = SystemLog.objects.all()
    serializer_class = SystemLogSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["level", "module", "user"]
    search_fields = ["action", "user", "module"]
    ordering_fields = ["timestamp"]
