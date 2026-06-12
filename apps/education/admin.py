from django.contrib import admin
from .models import Course, CourseApplication


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ["title", "category", "level", "instructor", "is_free", "price", "enrolled_count", "status"]
    list_filter = ["category", "level", "lang", "is_free", "status"]
    search_fields = ["title", "instructor", "tags"]
    prepopulated_fields = {"slug": ("title",)}


@admin.register(CourseApplication)
class CourseApplicationAdmin(admin.ModelAdmin):
    list_display = ["full_name", "email", "course", "status", "created_at"]
    list_filter = ["status", "course"]
    search_fields = ["full_name", "email", "phone"]
