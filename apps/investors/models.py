from django.db import models


class Investor(models.Model):
    INVESTOR_TYPE_CHOICES = [
        ("VC Fund", "VC Fund"),
        ("Corporate VC", "Corporate VC"),
        ("Accelerator", "Accelerator"),
        ("Development VC", "Development VC"),
        ("Corporate", "Corporate"),
        ("Strategic", "Strategic"),
        ("Development", "Development"),
        ("Angel", "Angel"),
    ]
    STATUS_CHOICES = [
        ("active", "Active"),
        ("negotiation", "Negotiation"),
        ("due_diligence", "Due Diligence"),
        ("closed", "Closed"),
    ]
    company = models.CharField(max_length=255)
    country = models.CharField(max_length=100)
    investor_type = models.CharField(max_length=50, choices=INVESTOR_TYPE_CHOICES)
    ticket_size = models.CharField(max_length=100, blank=True, default="")
    sectors = models.TextField(blank=True, default="", help_text="Comma-separated list of sectors")
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default="active")
    contact_name = models.CharField(max_length=255, blank=True, default="")
    email = models.EmailField(blank=True, default="")
    notes = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Investor"
        verbose_name_plural = "Investors"

    def __str__(self):
        return f"{self.company} ({self.investor_type})"
