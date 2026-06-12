from django.contrib import admin
from .models import Investor


@admin.register(Investor)
class InvestorAdmin(admin.ModelAdmin):
    list_display = ["company", "investor_type", "status", "country", "email", "created_at"]
    list_filter = ["investor_type", "status", "country"]
    search_fields = ["company", "contact_name", "email", "sectors"]
