from django.db import models


class Infrastructure(models.Model):
    ACCENT_CHOICES = [
        ("accent", "Accent"),
        ("violet", "Violet"),
        ("emerald", "Emerald"),
    ]
    title = models.CharField(max_length=255)
    description = models.TextField()
    accent = models.CharField(max_length=20, choices=ACCENT_CHOICES, default="accent")
    icon_name = models.CharField(max_length=100)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order"]
        verbose_name = "Infrastructure"
        verbose_name_plural = "Infrastructure"

    def __str__(self):
        return self.title


class Perk(models.Model):
    symbol = models.CharField(max_length=50)
    title = models.CharField(max_length=255)
    description = models.TextField()
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order"]
        verbose_name = "Perk"
        verbose_name_plural = "Perks"

    def __str__(self):
        return self.title


class Stat(models.Model):
    label = models.CharField(max_length=255)
    value = models.CharField(max_length=50)
    suffix = models.CharField(max_length=20, blank=True, default="")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ["order"]
        verbose_name = "Stat"
        verbose_name_plural = "Stats"

    def __str__(self):
        return f"{self.value}{self.suffix} {self.label}"


class HomepageStartup(models.Model):
    sector = models.CharField(max_length=255)
    tagline = models.CharField(max_length=255)
    problem = models.TextField()
    solution = models.TextField()
    tech_stack = models.TextField(help_text="Comma-separated list of technologies")
    accent = models.CharField(max_length=20, default="accent")
    primary_metric_label = models.CharField(max_length=255)
    primary_metric_value = models.CharField(max_length=50)
    secondary_metric_label = models.CharField(max_length=255, blank=True, default="")
    secondary_metric_value = models.CharField(max_length=50, blank=True, default="")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ["order"]
        verbose_name = "Homepage Startup"
        verbose_name_plural = "Homepage Startups"

    def __str__(self):
        return f"{self.sector} - {self.tagline}"
