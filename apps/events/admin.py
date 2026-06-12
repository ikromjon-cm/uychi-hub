from django.contrib import admin
from .models import Event, EventRegistration


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ["title", "event_type", "date", "location", "registered_count", "seats", "status"]
    list_filter = ["event_type", "status", "accent"]
    search_fields = ["title", "speaker", "location"]
    prepopulated_fields = {"slug": ("title",)}


@admin.register(EventRegistration)
class EventRegistrationAdmin(admin.ModelAdmin):
    list_display = ["full_name", "email", "event", "status", "created_at"]
    list_filter = ["status", "event"]
    search_fields = ["full_name", "email"]
