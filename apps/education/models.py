from django.db import models


class Course(models.Model):
    LEVEL_CHOICES = [
        ("beginner", "Beginner"),
        ("intermediate", "Intermediate"),
        ("advanced", "Advanced"),
    ]
    LANG_CHOICES = [
        ("uz", "Uzbek"),
        ("ru", "Russian"),
        ("en", "English"),
    ]
    ACCENT_CHOICES = [
        ("cyan", "Cyan"),
        ("violet", "Violet"),
        ("emerald", "Emerald"),
    ]
    STATUS_CHOICES = [
        ("active", "Active"),
        ("draft", "Draft"),
        ("archived", "Archived"),
    ]

    slug = models.SlugField(max_length=255, unique=True)
    title = models.CharField(max_length=255)
    instructor = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, default="beginner")
    duration = models.CharField(max_length=50)
    lessons = models.IntegerField(default=0)
    price = models.IntegerField(default=0)
    is_free = models.BooleanField(default=False)
    lang = models.CharField(max_length=5, choices=LANG_CHOICES, default="uz")
    enrolled_count = models.IntegerField(default=0)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    accent = models.CharField(max_length=20, choices=ACCENT_CHOICES, default="cyan")
    tags = models.JSONField(default=list, blank=True)
    description = models.TextField(blank=True, default="")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="active")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Course"
        verbose_name_plural = "Courses"

    def __str__(self):
        return self.title


class CourseApplication(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    ]

    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="applications")
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=30)
    age = models.IntegerField(blank=True, null=True)
    experience = models.TextField(blank=True, default="")
    motivation = models.TextField(blank=True, default="")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Course Application"
        verbose_name_plural = "Course Applications"

    def __str__(self):
        return f"{self.full_name} — {self.course.title}"
