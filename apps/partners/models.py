from django.db import models


class Partner(models.Model):
    CATEGORY_CHOICES = [
        ("Tech Park", "Tech Park"),
        ("Government", "Government"),
        ("Corporate", "Corporate"),
        ("University", "University"),
        ("Accelerator", "Accelerator"),
        ("International", "International"),
        ("Association", "Association"),
    ]
    TIER_CHOICES = [
        ("strategic", "Strategic"),
        ("global", "Global"),
        ("regional", "Regional"),
    ]
    STATUS_CHOICES = [
        ("active", "Active"),
        ("pending", "Pending"),
    ]
    name = models.CharField(max_length=255)
    country = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    tier = models.CharField(max_length=20, choices=TIER_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="active")
    website = models.URLField(blank=True, default="")
    logo = models.CharField(max_length=500, blank=True, default="", help_text="Logo URL or path")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "Partner"
        verbose_name_plural = "Partners"

    def __str__(self):
        return self.name
