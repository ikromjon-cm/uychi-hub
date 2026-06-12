from django.db import models


class SEOPage(models.Model):
    path = models.CharField(max_length=255, unique=True)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, default="")
    keywords = models.TextField(blank=True, default="")
    score = models.IntegerField(default=0)
    issues = models.IntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["path"]
        verbose_name = "SEO Page"
        verbose_name_plural = "SEO Pages"

    def __str__(self):
        return self.path
