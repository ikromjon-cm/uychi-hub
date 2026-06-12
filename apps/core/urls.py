from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InfrastructureViewSet, PerkViewSet, StatViewSet, HomepageStartupViewSet

router = DefaultRouter()
router.register(r"infrastructure", InfrastructureViewSet)
router.register(r"perks", PerkViewSet)
router.register(r"stats", StatViewSet)
router.register(r"startups", HomepageStartupViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
