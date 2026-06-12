from rest_framework import viewsets, permissions
from .models import JobPosting
from .serializers import JobPostingSerializer


class JobPostingViewSet(viewsets.ModelViewSet):
    queryset = JobPosting.objects.all()
    serializer_class = JobPostingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["department", "employment_type", "status", "location"]
    search_fields = ["title", "description", "requirements"]
    ordering_fields = ["posted_at", "created_at", "applicants_count"]
