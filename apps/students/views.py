from rest_framework import viewsets, permissions
from .models import StudentProfile, Achievement
from .serializers import StudentProfileSerializer, StudentProfileListSerializer, AchievementSerializer


class StudentProfileViewSet(viewsets.ModelViewSet):
    queryset = StudentProfile.objects.filter(is_active=True)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["role", "specialization", "is_featured", "is_active"]
    search_fields = ["full_name", "email", "course", "skills", "bio"]
    ordering_fields = ["score", "rank", "projects_count", "created_at"]

    def get_serializer_class(self):
        if self.action == "list":
            return StudentProfileListSerializer
        return StudentProfileSerializer

    def get_queryset(self):
        if self.request.user.is_staff:
            return StudentProfile.objects.all()
        return StudentProfile.objects.filter(is_active=True)


class AchievementViewSet(viewsets.ModelViewSet):
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["category", "student"]
    search_fields = ["title", "description"]
    ordering_fields = ["date", "created_at"]
