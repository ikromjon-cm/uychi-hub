from rest_framework import viewsets, permissions
from .models import CoworkingSpace, Booking
from .serializers import CoworkingSpaceSerializer, BookingSerializer


class CoworkingSpaceViewSet(viewsets.ModelViewSet):
    queryset = CoworkingSpace.objects.filter(is_active=True)
    serializer_class = CoworkingSpaceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["space_type", "is_active"]
    search_fields = ["name", "description", "amenities"]
    ordering_fields = ["name", "price_per_hour", "capacity"]

    def get_queryset(self):
        if self.request.user.is_staff:
            return CoworkingSpace.objects.all()
        return CoworkingSpace.objects.filter(is_active=True)


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["status", "space", "date"]
    search_fields = ["full_name", "email", "phone"]
    ordering_fields = ["date", "created_at"]

    def get_permissions(self):
        if self.action == "create":
            return [permissions.AllowAny()]
        return super().get_permissions()
