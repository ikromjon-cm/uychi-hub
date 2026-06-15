from django.db import models

STATUS_CHOICES = [
    ("pending", "Pending"),
    ("approved", "Approved"),
    ("rejected", "Rejected"),
]


class Stat(models.Model):
    title = models.CharField(max_length=255)
    value = models.CharField(max_length=50)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return f"{self.value} {self.title}"


class Partner(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100, blank=True)
    logo_url = models.URLField(max_length=500, blank=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class HeroVideo(models.Model):
    video_file = models.FileField(upload_to="hero/", blank=True)
    video_url = models.URLField(max_length=500, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.video_url or f"HeroVideo {self.id}"


class News(models.Model):
    title_en = models.CharField(max_length=255)
    title_uz = models.CharField(max_length=255, blank=True)
    title_ru = models.CharField(max_length=255, blank=True)
    body_en = models.TextField(blank=True)
    body_uz = models.TextField(blank=True)
    body_ru = models.TextField(blank=True)
    image = models.ImageField(upload_to="news/", blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title_en


class Announcement(models.Model):
    title_en = models.CharField(max_length=255)
    title_uz = models.CharField(max_length=255, blank=True)
    title_ru = models.CharField(max_length=255, blank=True)
    body_en = models.TextField(blank=True)
    body_uz = models.TextField(blank=True)
    body_ru = models.TextField(blank=True)
    image = models.ImageField(upload_to="announcements/", blank=True)
    date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")

    class Meta:
        ordering = ["-date"]

    def __str__(self):
        return self.title_en


class Startup(models.Model):
    title = models.CharField(max_length=255)
    sector = models.CharField(max_length=100)
    problem_en = models.TextField(blank=True)
    problem_uz = models.TextField(blank=True)
    problem_ru = models.TextField(blank=True)
    solution_en = models.TextField(blank=True)
    solution_uz = models.TextField(blank=True)
    solution_ru = models.TextField(blank=True)
    image = models.ImageField(upload_to="startups/", blank=True)
    tech_stack = models.CharField(max_length=500, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return self.title


class Job(models.Model):
    TYPE_CHOICES = [("fulltime", "Full-time"), ("parttime", "Part-time"), ("remote", "Remote"), ("contract", "Contract")]
    title_en = models.CharField(max_length=255)
    title_uz = models.CharField(max_length=255, blank=True)
    title_ru = models.CharField(max_length=255, blank=True)
    department = models.CharField(max_length=100, blank=True)
    image = models.ImageField(upload_to="jobs/", blank=True)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default="fulltime")
    salary = models.CharField(max_length=100, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return self.title_en


class Lead(models.Model):
    name = models.CharField(max_length=255)
    company = models.CharField(max_length=255, blank=True)
    country = models.CharField(max_length=100, blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} - {self.email}"
