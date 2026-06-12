from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StartupApplicationViewSet

router = DefaultRouter()
router.register(r"startup-applications", StartupApplicationViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
