from rest_framework import serializers
from .models import Course, CourseApplication


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"


class CourseApplicationSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source="course.title", read_only=True)

    class Meta:
        model = CourseApplication
        fields = "__all__"
        read_only_fields = ["status", "created_at"]
