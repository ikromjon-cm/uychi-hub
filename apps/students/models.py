from django.db import models


class StudentProfile(models.Model):
    ROLE_CHOICES = [
        ("student", "Student"),
        ("graduate", "Graduate"),
        ("mentor", "Mentor"),
    ]
    ACCENT_CHOICES = [
        ("cyan", "Cyan"),
        ("violet", "Violet"),
        ("emerald", "Emerald"),
    ]

    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="student")
    avatar_url = models.URLField(blank=True, default="")
    bio = models.TextField(blank=True, default="")
    course = models.CharField(max_length=255, blank=True, default="")
    specialization = models.CharField(max_length=255, blank=True, default="")
    score = models.IntegerField(default=0)
    rank = models.IntegerField(default=0)
    projects_count = models.IntegerField(default=0)
    certificates_count = models.IntegerField(default=0)
    github_url = models.URLField(blank=True, default="")
    linkedin_url = models.URLField(blank=True, default="")
    portfolio_url = models.URLField(blank=True, default="")
    skills = models.JSONField(default=list, blank=True)
    accent = models.CharField(max_length=20, choices=ACCENT_CHOICES, default="cyan")
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-score", "full_name"]
        verbose_name = "Student Profile"
        verbose_name_plural = "Student Profiles"

    def __str__(self):
        return self.full_name


class Achievement(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name="achievements")
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, default="")
    date = models.DateField()
    category = models.CharField(max_length=100, default="general")
    icon = models.CharField(max_length=50, blank=True, default="🏆")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-date"]
        verbose_name = "Achievement"
        verbose_name_plural = "Achievements"

    def __str__(self):
        return f"{self.student.full_name} — {self.title}"
