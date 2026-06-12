from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, CourseApplicationViewSet

router = DefaultRouter()
router.register(r"courses", CourseViewSet)
router.register(r"applications", CourseApplicationViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
