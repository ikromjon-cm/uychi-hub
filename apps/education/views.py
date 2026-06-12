from rest_framework import viewsets, permissions
from .models import Course, CourseApplication
from .serializers import CourseSerializer, CourseApplicationSerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.filter(status="active")
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["category", "level", "lang", "is_free", "status"]
    search_fields = ["title", "instructor", "tags", "description"]
    ordering_fields = ["created_at", "rating", "enrolled_count", "price"]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Course.objects.all()
        return Course.objects.filter(status="active")


class CourseApplicationViewSet(viewsets.ModelViewSet):
    queryset = CourseApplication.objects.all()
    serializer_class = CourseApplicationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["status", "course"]
    search_fields = ["full_name", "email", "phone"]
    ordering_fields = ["created_at"]

    def get_permissions(self):
        if self.action == "create":
            return [permissions.AllowAny()]
        return super().get_permissions()

    def perform_create(self, serializer):
        application = serializer.save()
        course = application.course
        course.enrolled_count += 1
        course.save(update_fields=["enrolled_count"])
