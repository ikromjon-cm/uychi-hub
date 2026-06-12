from django.db import models


class MeetingRequest(models.Model):
    PLATFORM_CHOICES = [
        ("zoom", "Zoom"),
        ("teams", "Microsoft Teams"),
        ("meet", "Google Meet"),
        ("whatsapp", "WhatsApp"),
        ("telegram", "Telegram"),
    ]
    name = models.CharField(max_length=255)
    email = models.EmailField()
    company = models.CharField(max_length=255, blank=True, default="")
    phone = models.CharField(max_length=50, blank=True, default="")
    date = models.DateField()
    time = models.TimeField()
    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES)
    topic = models.CharField(max_length=255)
    message = models.TextField(blank=True, default="")
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Meeting Request"
        verbose_name_plural = "Meeting Requests"

    def __str__(self):
        return f"{self.name} - {self.topic} ({self.date})"
