from rest_framework import serializers
from .models import JobPosting, JobApplication


class JobPostingSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobPosting
        fields = "__all__"


class JobApplicationSerializer(serializers.ModelSerializer):
    job_title = serializers.CharField(source="job.title", read_only=True)
    job_department = serializers.CharField(source="job.department", read_only=True)

    class Meta:
        model = JobApplication
        fields = "__all__"
        read_only_fields = ["status", "created_at"]
