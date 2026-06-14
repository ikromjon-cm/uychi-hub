from rest_framework import viewsets, permissions, serializers as drf_serializers
from rest_framework.response import Response
from rest_framework import status
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

    def create(self, request, *args, **kwargs):
        email = request.data.get("email", "").strip().lower()
        existing = Subscriber.objects.filter(email=email).first()
        if existing:
            if not existing.is_active:
                existing.is_active = True
                existing.name = request.data.get("name", existing.name)
                existing.save(update_fields=["is_active", "name"])
                try:
                    newsletter_confirm(existing)
                except Exception:
                    pass
            return Response({"detail": "Muvaffaqiyatli obuna bo'ldingiz."}, status=status.HTTP_200_OK)
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        subscriber = serializer.save()
        try:
            newsletter_confirm(subscriber)
        except Exception:
            pass
