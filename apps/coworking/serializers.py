from rest_framework import serializers
from .models import CoworkingSpace, Booking


class CoworkingSpaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoworkingSpace
        fields = "__all__"


class BookingSerializer(serializers.ModelSerializer):
    space_name = serializers.CharField(source="space.name", read_only=True)

    class Meta:
        model = Booking
        fields = "__all__"
        read_only_fields = ["status", "created_at"]

    def validate(self, data):
        space = data.get("space")
        date = data.get("date")
        start = data.get("start_time")
        end = data.get("end_time")
        if start and end and start >= end:
            raise serializers.ValidationError({"end_time": "Tugash vaqti boshlanish vaqtidan keyin bo'lishi kerak."})
        if space and date and start and end:
            overlap = Booking.objects.filter(
                space=space,
                date=date,
                status__in=["pending", "confirmed"],
                start_time__lt=end,
                end_time__gt=start,
            )
            if self.instance:
                overlap = overlap.exclude(pk=self.instance.pk)
            if overlap.exists():
                raise serializers.ValidationError({"date": "Bu vaqt oralig'ida joy band."})
        return data
