from django.db import models


class MediaItem(models.Model):
    MEDIA_TYPE_CHOICES = [
        ("image", "Image"),
        ("video", "Video"),
        ("document", "Document"),
        ("audio", "Audio"),
        ("vector", "Vector"),
    ]
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to="media/")
    media_type = models.CharField(max_length=20, choices=MEDIA_TYPE_CHOICES)
    size = models.CharField(max_length=50, blank=True, default="")
    dimensions = models.CharField(max_length=50, blank=True, default="")
    alt_text = models.CharField(max_length=255, blank=True, default="")
    in_use = models.BooleanField(default=False)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-uploaded_at"]
        verbose_name = "Media Item"
        verbose_name_plural = "Media Items"

    def __str__(self):
        return self.name
