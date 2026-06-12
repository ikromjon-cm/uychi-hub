from django.contrib import admin
from .models import SystemLog


@admin.register(SystemLog)
class SystemLogAdmin(admin.ModelAdmin):
    list_display = ["action", "user", "level", "module", "ip_address", "timestamp"]
    list_filter = ["level", "module"]
    search_fields = ["action", "user", "module"]
