from django.db import models


class StartupApplication(models.Model):
    STAGE_CHOICES = [
        ("Idea", "Idea"),
        ("Pre-Seed", "Pre-Seed"),
        ("Seed", "Seed"),
        ("Series A", "Series A"),
    ]
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("review", "In Review"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    ]
    startup_name = models.CharField(max_length=255)
    sector = models.CharField(max_length=255)
    stage = models.CharField(max_length=20, choices=STAGE_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    founder_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True, default="")
    team_size = models.IntegerField(default=1)
    funding_needed = models.CharField(max_length=100, blank=True, default="")
    description = models.TextField()
    tech_stack = models.TextField(blank=True, default="")
    website = models.URLField(blank=True, default="")
    country = models.CharField(max_length=100, blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Startup Application"
        verbose_name_plural = "Startup Applications"

    def __str__(self):
        return f"{self.startup_name} - {self.stage} ({self.status})"
