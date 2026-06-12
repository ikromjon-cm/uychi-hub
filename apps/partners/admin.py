from django.contrib import admin
from .models import Partner


@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "tier", "status", "country", "created_at"]
    list_filter = ["category", "tier", "status", "country"]
    search_fields = ["name", "website"]
