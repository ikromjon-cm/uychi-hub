from django.db import models


class Article(models.Model):
    STATUS_CHOICES = [
        ("published", "Published"),
        ("draft", "Draft"),
        ("archived", "Archived"),
    ]
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    category = models.CharField(max_length=100)
    content = models.TextField()
    excerpt = models.TextField(blank=True, default="")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="draft")
    views = models.IntegerField(default=0)
    author_name = models.CharField(max_length=255)
    published_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-published_at", "-created_at"]
        verbose_name = "Article"
        verbose_name_plural = "Articles"

    def __str__(self):
        return self.title
