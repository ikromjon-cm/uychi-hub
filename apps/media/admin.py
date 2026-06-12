from django.contrib import admin
from .models import MediaItem


@admin.register(MediaItem)
class MediaItemAdmin(admin.ModelAdmin):
    list_display = ["name", "media_type", "size", "in_use", "uploaded_at"]
    list_filter = ["media_type", "in_use"]
    search_fields = ["name", "alt_text"]
