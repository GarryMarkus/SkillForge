from django.db import models
from django.contrib.auth.models import User

class Exam(models.Model):
    title = models.CharField(max_length=200)
    duration_minutes = models.PositiveIntegerField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title


class Question(models.Model):
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    text = models.TextField()
    option_a = models.CharField(max_length=200)
    option_b = models.CharField(max_length=200)
    option_c = models.CharField(max_length=200)
    option_d = models.CharField(max_length=200)
    correct_option = models.CharField(max_length=1)

    def __str__(self):
        return self.text[:50]


class ExamSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    started_at = models.DateTimeField(auto_now_add=True)
    ended_at = models.DateTimeField(null=True, blank=True)
    risk_score = models.FloatField(default=0)
    is_flagged = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)


class ProctorEvent(models.Model):
    session = models.ForeignKey(ExamSession, on_delete=models.CASCADE)
    event_type = models.CharField(max_length=50)
    confidence = models.FloatField(default=1.0)
    timestamp = models.DateTimeField(auto_now_add=True)
