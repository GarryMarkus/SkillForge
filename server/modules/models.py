from django.db import models
from django.conf import settings


class UpskillModule(models.Model):
    LEVELS = (
        ("slow", "Beginner"),
        ("average", "Intermediate"),
        ("fast", "Advanced"),
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="modules"
    )
    topic = models.CharField(max_length=255)
    level = models.CharField(max_length=20, choices=LEVELS)
    content = models.TextField()
    ai_metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.topic} - {self.level}"


class ModuleProgress(models.Model):
    module = models.ForeignKey(
        UpskillModule,
        on_delete=models.CASCADE,
        related_name="progress"
    )
    completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)

