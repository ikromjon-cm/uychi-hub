from django.db import models


class Stat(models.Model):
    title = models.CharField(max_length=255)
    value = models.CharField(max_length=50)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return f"{self.value} {self.title}"


class Hub(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=100, blank=True)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return self.title


class Startup(models.Model):
    title = models.CharField(max_length=255)
    sector = models.CharField(max_length=100)
    problem = models.TextField(blank=True)
    solution = models.TextField(blank=True)
    technologies = models.TextField(blank=True)
    users = models.CharField(max_length=100, blank=True)
    partners = models.CharField(max_length=100, blank=True)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return self.title


class Partner(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100, blank=True)
    logo_url = models.URLField(max_length=500, blank=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Lead(models.Model):
    TYPE_CHOICES = [
        ("contact", "Contact"),
        ("investor", "Investor"),
        ("startup", "Startup Application"),
    ]

    name = models.CharField(max_length=255)
    company = models.CharField(max_length=255, blank=True)
    country = models.CharField(max_length=100, blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    message = models.TextField(blank=True)
    lead_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default="contact")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} ({self.lead_type})"
