from rest_framework import serializers
from .models import Investor


class InvestorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investor
        fields = "__all__"


class InvestorPublicSerializer(serializers.ModelSerializer):
    """Public-safe view of an investor — excludes private contact details."""
    class Meta:
        model = Investor
        fields = ["id", "company", "country", "investor_type", "ticket_size", "sectors", "status"]
