from django.contrib import admin
from .models import JobPosting


@admin.register(JobPosting)
class JobPostingAdmin(admin.ModelAdmin):
    list_display = ["title", "department", "employment_type", "location", "status", "applicants_count", "posted_at"]
    list_filter = ["department", "employment_type", "status", "location"]
    search_fields = ["title", "description", "requirements"]
