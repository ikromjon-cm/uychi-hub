from rest_framework import viewsets, permissions
from .models import JobPosting, JobApplication
from .serializers import JobPostingSerializer, JobApplicationSerializer
from apps.utils.email import job_application_admin, job_application_confirm


class JobPostingViewSet(viewsets.ModelViewSet):
    queryset = JobPosting.objects.all()
    serializer_class = JobPostingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["department", "employment_type", "status", "location"]
    search_fields = ["title", "description", "requirements"]
    ordering_fields = ["posted_at", "created_at", "applicants_count"]

    def get_queryset(self):
        if self.request.user.is_staff:
            return JobPosting.objects.all()
        return JobPosting.objects.filter(status="active")


class JobApplicationViewSet(viewsets.ModelViewSet):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["status", "job"]
    search_fields = ["full_name", "email", "phone"]
    ordering_fields = ["created_at"]

    def get_permissions(self):
        if self.action == "create":
            return [permissions.AllowAny()]
        return super().get_permissions()

    def perform_create(self, serializer):
        application = serializer.save()
        job = application.job
        job.applicants_count += 1
        job.save(update_fields=["applicants_count"])
        try:
            job_application_admin(application)
            job_application_confirm(application)
        except Exception:
            pass
