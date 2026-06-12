from django.contrib import admin
from .models import StudentProfile, Achievement


class AchievementInline(admin.TabularInline):
    model = Achievement
    extra = 1


@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):
    list_display = ["full_name", "role", "course", "score", "rank", "is_featured", "is_active"]
    list_filter = ["role", "specialization", "is_featured", "is_active"]
    search_fields = ["full_name", "email", "course", "skills"]
    inlines = [AchievementInline]


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ["title", "student", "category", "date"]
    list_filter = ["category", "date"]
    search_fields = ["title", "student__full_name"]
