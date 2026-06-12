from rest_framework import viewsets, permissions
from .models import Subscriber
from .serializers import SubscriberSerializer
from apps.utils.email import newsletter_confirm


class SubscriberViewSet(viewsets.ModelViewSet):
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer

    def get_permissions(self):
        if self.action in ("create",):
            self.permission_classes = [permissions.AllowAny]
        else:
            self.permission_classes = [permissions.IsAuthenticated]
        return super().get_permissions()

    def perform_create(self, serializer):
        subscriber = serializer.save()
        try:
            newsletter_confirm(subscriber)
        except Exception:
            pass
