from django.contrib import admin
from .models import CoworkingSpace, Booking


@admin.register(CoworkingSpace)
class CoworkingSpaceAdmin(admin.ModelAdmin):
    list_display = ["name", "space_type", "capacity", "price_per_hour", "price_per_day", "is_active"]
    list_filter = ["space_type", "is_active"]
    search_fields = ["name", "description"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ["full_name", "space", "date", "start_time", "end_time", "status"]
    list_filter = ["status", "space", "date"]
    search_fields = ["full_name", "email"]
