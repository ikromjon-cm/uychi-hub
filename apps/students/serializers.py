from rest_framework import serializers
from .models import StudentProfile, Achievement


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = "__all__"


class StudentProfileSerializer(serializers.ModelSerializer):
    achievements = AchievementSerializer(many=True, read_only=True)

    class Meta:
        model = StudentProfile
        fields = "__all__"


class StudentProfileListSerializer(serializers.ModelSerializer):
    achievements_count = serializers.IntegerField(source="achievements.count", read_only=True)

    class Meta:
        model = StudentProfile
        fields = [
            "id", "full_name", "email", "role", "avatar_url", "bio",
            "course", "specialization", "score", "rank", "projects_count",
            "certificates_count", "github_url", "linkedin_url", "portfolio_url",
            "skills", "accent", "is_featured", "achievements_count",
        ]
