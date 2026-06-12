from django.db import models


class CoworkingSpace(models.Model):
    TYPE_CHOICES = [
        ("desk", "Desk"),
        ("meeting_room", "Meeting Room"),
        ("private_office", "Private Office"),
        ("lab", "Lab"),
        ("conference_hall", "Conference Hall"),
    ]
    ACCENT_CHOICES = [
        ("cyan", "Cyan"),
        ("violet", "Violet"),
        ("emerald", "Emerald"),
    ]

    slug = models.SlugField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    space_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    capacity = models.IntegerField(default=1)
    price_per_hour = models.IntegerField(default=0)
    price_per_day = models.IntegerField(default=0)
    description = models.TextField(blank=True, default="")
    amenities = models.JSONField(default=list, blank=True)
    accent = models.CharField(max_length=20, choices=ACCENT_CHOICES, default="cyan")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "Coworking Space"
        verbose_name_plural = "Coworking Spaces"

    def __str__(self):
        return self.name


class Booking(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("confirmed", "Confirmed"),
        ("cancelled", "Cancelled"),
        ("completed", "Completed"),
    ]

    space = models.ForeignKey(CoworkingSpace, on_delete=models.CASCADE, related_name="bookings")
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=30)
    company = models.CharField(max_length=255, blank=True, default="")
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    purpose = models.TextField(blank=True, default="")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-date", "-start_time"]
        verbose_name = "Booking"
        verbose_name_plural = "Bookings"

    def __str__(self):
        return f"{self.full_name} — {self.space.name} ({self.date})"
