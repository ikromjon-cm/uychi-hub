from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CoworkingSpaceViewSet, BookingViewSet

router = DefaultRouter()
router.register(r"spaces", CoworkingSpaceViewSet)
router.register(r"bookings", BookingViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
