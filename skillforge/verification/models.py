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


class PersonalityQuestion(models.Model):
    text = models.TextField()
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.text[:50]


class PersonalityOption(models.Model):
    question = models.ForeignKey(
        PersonalityQuestion,
        related_name="options",
        on_delete=models.CASCADE
    )

    text = models.CharField(max_length=255)
    score = models.IntegerField(default=0)


class PersonalityAttempt(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="personality_attempts"
    )

    total_score = models.IntegerField(default=0)

    learning_level = models.CharField(
        max_length=20,
        choices=(
            ("slow", "Slow"),
            ("average", "Average"),
            ("fast", "Fast"),
        ),
        blank=True
    )

    completed_at = models.DateTimeField(auto_now_add=True)


class PersonalityAnswer(models.Model):
    attempt = models.ForeignKey(
        PersonalityAttempt,
        related_name="answers",
        on_delete=models.CASCADE
    )

    question = models.ForeignKey(PersonalityQuestion, on_delete=models.CASCADE)
    selected_option = models.ForeignKey(PersonalityOption, on_delete=models.CASCADE)



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

    category = models.ForeignKey(SkillCategory, on_delete=models.CASCADE)
    generated_questions = models.JSONField(default=list)
    submitted_answers = models.JSONField(default=list)
    score = models.FloatField(default=0)
    total_questions = models.IntegerField(default=0)
    percentage = models.FloatField(default=0)
    passed = models.BooleanField(default=False)
    ai_feedback = models.JSONField(default=dict)
    tab_switch_count = models.IntegerField(default=0)
    face_detection_flags = models.IntegerField(default=0)

    is_flagged = models.BooleanField(default=False)
    flag_level = models.CharField(max_length=10, blank=True)

    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    is_evaluated = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.email} - {self.category.name}"
