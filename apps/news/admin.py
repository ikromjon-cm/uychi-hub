from django.contrib import admin
from .models import Article


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ["title", "slug", "category", "status", "views", "author_name", "published_at"]
    list_filter = ["category", "status"]
    search_fields = ["title", "content", "excerpt", "author_name"]
    prepopulated_fields = {"slug": ("title",)}
