from django.contrib import admin
from django.contrib.auth.models import User


class UserAdmin(admin.ModelAdmin):
    list_display = ["username", "email", "first_name", "last_name", "is_staff", "is_active", "date_joined"]
    list_filter = ["is_staff", "is_active", "groups"]
    search_fields = ["username", "email", "first_name", "last_name"]

admin.site.unregister(User)
admin.site.register(User, UserAdmin)
