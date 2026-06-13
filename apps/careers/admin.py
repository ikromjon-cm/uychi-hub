from django.contrib import admin
from .models import JobPosting, JobApplication


@admin.register(JobPosting)
class JobPostingAdmin(admin.ModelAdmin):
    list_display = ["title", "department", "employment_type", "location", "status", "applicants_count", "posted_at"]
    list_filter = ["department", "employment_type", "status", "location"]
    search_fields = ["title", "description", "requirements"]


@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ["full_name", "email", "job", "status", "experience_years", "created_at"]
    list_filter = ["status", "job"]
    search_fields = ["full_name", "email", "phone"]
