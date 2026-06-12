from django.db import models


class Event(models.Model):
    TYPE_CHOICES = [
        ("Hackathon", "Hackathon"),
        ("Meetup", "Meetup"),
        ("Bootcamp", "Bootcamp"),
        ("Conference", "Conference"),
        ("Training", "Training"),
        ("Workshop", "Workshop"),
    ]
    ACCENT_CHOICES = [
        ("cyan", "Cyan"),
        ("violet", "Violet"),
        ("emerald", "Emerald"),
    ]
    STATUS_CHOICES = [
        ("upcoming", "Upcoming"),
        ("ongoing", "Ongoing"),
        ("past", "Past"),
        ("cancelled", "Cancelled"),
    ]

    slug = models.SlugField(max_length=255, unique=True)
    title = models.CharField(max_length=255)
    event_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    location = models.CharField(max_length=255)
    description = models.TextField()
    speaker = models.CharField(max_length=255, blank=True, default="")
    prize = models.CharField(max_length=100, blank=True, default="")
    seats = models.IntegerField(default=50)
    registered_count = models.IntegerField(default=0)
    accent = models.CharField(max_length=20, choices=ACCENT_CHOICES, default="cyan")
    tags = models.JSONField(default=list, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="upcoming")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["date"]
        verbose_name = "Event"
        verbose_name_plural = "Events"

    def __str__(self):
        return self.title

    @property
    def is_full(self):
        return self.registered_count >= self.seats


class EventRegistration(models.Model):
    STATUS_CHOICES = [
        ("confirmed", "Confirmed"),
        ("waitlist", "Waitlist"),
        ("cancelled", "Cancelled"),
    ]

    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="registrations")
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=30)
    company = models.CharField(max_length=255, blank=True, default="")
    notes = models.TextField(blank=True, default="")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="confirmed")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Event Registration"
        verbose_name_plural = "Event Registrations"
        unique_together = [["event", "email"]]

    def __str__(self):
        return f"{self.full_name} — {self.event.title}"
