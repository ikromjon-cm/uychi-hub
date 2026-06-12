from django.contrib import admin
from .models import SEOPage


@admin.register(SEOPage)
class SEOPageAdmin(admin.ModelAdmin):
    list_display = ["path", "title", "score", "issues", "updated_at"]
    search_fields = ["path", "title", "description", "keywords"]
    list_filter = ["score", "issues"]
