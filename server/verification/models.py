from django.db import models
from django.conf import settings



class SkillVerification(models.Model):

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="verification"
    )

    resume_analysis = models.JSONField(default=dict, blank=True)
    github_analysis = models.JSONField(default=dict, blank=True)
    ai_recommendation = models.JSONField(default=dict, blank=True)

    trust_score = models.FloatField(default=100)  # starts full, decreases

    is_flagged = models.BooleanField(default=False)

    FLAG_LEVELS = (
        ("low", "Low"),
        ("medium", "Medium"),
        ("high", "High"),
    )

    flag_level = models.CharField(
        max_length=10,
        choices=FLAG_LEVELS,
        blank=True
    )

    cheating_events = models.IntegerField(default=0)

    # suspicious logs (AI/proctoring)
    flag_reasons = models.JSONField(default=list, blank=True)
    # ["tab_switch", "multiple_faces", "copy_paste"]

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email} - Trust {self.trust_score}"

class PersonalityAttempt(models.Model):

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="personality_attempts"
    )

    answers = models.JSONField(default=list)

    total_score = models.IntegerField(default=0)

    learning_level = models.CharField(
        max_length=20,
        choices=(
            ("fast", "Fast"),
            ("average", "Average"),
            ("slow", "Slow"),
        )
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.learning_level}"

class SkillCategory(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class SkillTestAttempt(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="skill_attempts"
    )

    category = models.ForeignKey(
        SkillCategory,
        on_delete=models.CASCADE
    )

    proctor_session = models.OneToOneField(
        "proctor.ExamSession",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="skill_attempt"
    )

    generated_questions = models.JSONField(default=list)
    submitted_answers = models.JSONField(default=list)

    total_questions = models.IntegerField(default=0)
    score = models.IntegerField(default=0)
    percentage = models.FloatField(default=0)
    passed = models.BooleanField(default=False)

    ai_feedback = models.JSONField(default=dict)

    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    is_evaluated = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.email} - {self.category.name}"
