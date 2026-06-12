from django.db import models


class SystemLog(models.Model):
    LEVEL_CHOICES = [
        ("info", "Info"),
        ("success", "Success"),
        ("warning", "Warning"),
        ("error", "Error"),
    ]
    action = models.CharField(max_length=255)
    user = models.CharField(max_length=255, blank=True, default="")
    role = models.CharField(max_length=100, blank=True, default="")
    ip_address = models.CharField(max_length=50, blank=True, default="")
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, default="info")
    module = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-timestamp"]
        verbose_name = "System Log"
        verbose_name_plural = "System Logs"

    def __str__(self):
        return f"[{self.level.upper()}] {self.action} - {self.module}"
