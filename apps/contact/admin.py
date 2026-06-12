from django.contrib import admin
from .models import ContactSubmission


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ["name", "company", "email", "is_read", "created_at"]
    list_filter = ["is_read", "country"]
    search_fields = ["name", "company", "email", "message"]
