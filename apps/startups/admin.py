from django.contrib import admin
from .models import StartupApplication


@admin.register(StartupApplication)
class StartupApplicationAdmin(admin.ModelAdmin):
    list_display = ["startup_name", "stage", "status", "founder_name", "email", "created_at"]
    list_filter = ["stage", "status", "sector"]
    search_fields = ["startup_name", "founder_name", "email", "description"]
