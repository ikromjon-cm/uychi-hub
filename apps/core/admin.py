from django.contrib import admin
from .models import Infrastructure, Perk, Stat, HomepageStartup


@admin.register(Infrastructure)
class InfrastructureAdmin(admin.ModelAdmin):
    list_display = ["title", "accent", "order", "created_at"]
    list_filter = ["accent"]
    search_fields = ["title", "description"]


@admin.register(Perk)
class PerkAdmin(admin.ModelAdmin):
    list_display = ["title", "symbol", "order", "created_at"]
    search_fields = ["title", "description"]


@admin.register(Stat)
class StatAdmin(admin.ModelAdmin):
    list_display = ["label", "value", "suffix", "order"]
    search_fields = ["label"]


@admin.register(HomepageStartup)
class HomepageStartupAdmin(admin.ModelAdmin):
    list_display = ["sector", "tagline", "accent", "order"]
    list_filter = ["sector"]
    search_fields = ["sector", "tagline"]
