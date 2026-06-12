from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentProfileViewSet, AchievementViewSet

router = DefaultRouter()
router.register(r"profiles", StudentProfileViewSet)
router.register(r"achievements", AchievementViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
