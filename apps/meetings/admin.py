from django.contrib import admin
from .models import MeetingRequest


@admin.register(MeetingRequest)
class MeetingRequestAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "company", "platform", "topic", "date", "time", "is_read", "created_at"]
    list_filter = ["platform", "is_read"]
    search_fields = ["name", "email", "company", "topic", "message"]
