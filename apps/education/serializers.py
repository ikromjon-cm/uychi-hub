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

    def validate(self, data):
        course = data.get("course") or (self.instance.course if self.instance else None)
        email = data.get("email")
        if course and email:
            qs = CourseApplication.objects.filter(course=course, email=email)
            if self.instance:
                qs = qs.exclude(pk=self.instance.pk)
            if qs.exists():
                raise serializers.ValidationError({"email": "Bu email bilan ushbu kursga allaqachon ariza topshirilgan."})
        return data
