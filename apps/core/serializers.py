from rest_framework import serializers
from .models import Infrastructure, Perk, Stat, HomepageStartup


class InfrastructureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Infrastructure
        fields = "__all__"


class PerkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Perk
        fields = "__all__"


class StatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stat
        fields = "__all__"


class HomepageStartupSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomepageStartup
        fields = "__all__"
