from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email required")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("role", "admin")
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ("student", "Student"),   
        ("client", "Client"),
        ("admin", "Admin"),
    )

    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    verified = models.BooleanField(default=True)
    onboarding_stage = models.IntegerField(default=0)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["role"]

    def __str__(self):
        return self.email



class StudentProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="student_profile",
        limit_choices_to={"role": "student"}
    )

    full_name = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True)
    bio = models.TextField(blank=True)

    education = models.CharField(max_length=255, blank=True)
    experience_level = models.CharField(max_length=100, blank=True)

    github_url = models.URLField(blank=True, null=True)
    portfolio_links = models.TextField(blank=True)

    resume = models.FileField(upload_to="resumes/", blank=True, null=True)

    skills = models.TextField(blank=True)

    rating = models.DecimalField(max_digits=2, decimal_places=1, default=0.0)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - Student"



class StudentContentAnalysis(models.Model):
    SOURCE_CHOICES = (
        ("resume", "Resume"),
        ("github", "GitHub"),
    )

    student = models.ForeignKey(
        StudentProfile,
        on_delete=models.CASCADE,
        related_name="analyses"
    )

    source_type = models.CharField(max_length=20, choices=SOURCE_CHOICES)

    file = models.FileField(upload_to="analysis_docs/", null=True, blank=True)

    extracted_keywords = models.JSONField(default=dict)
    ai_summary = models.JSONField(default=dict)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.user.email} - {self.source_type}"


class StudentReport(models.Model):
    student = models.OneToOneField(
        StudentProfile,
        on_delete=models.CASCADE,
        related_name="report"
    )

    personality_score = models.FloatField(default=0)
    skill_test_score = models.FloatField(default=0)

    report_summary = models.JSONField(default=dict)

    generated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.student.user.email} Report"



class ClientProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="client_profile",
        limit_choices_to={"role": "client"}
    )

    company_name = models.CharField(max_length=255)
    industry = models.CharField(max_length=255, blank=True)
    website = models.URLField(blank=True, null=True)
    address = models.TextField(blank=True)

    saved_students = models.ManyToManyField(
        StudentProfile,
        blank=True,
        related_name="saved_by_clients"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.company_name



from django.db.models.signals import post_save
from django.dispatch import receiver


@receiver(post_save, sender=User)
def create_profiles(sender, instance, created, **kwargs):
    if created:
        if instance.role == "student":
            StudentProfile.objects.create(user=instance)
        elif instance.role == "client":
            ClientProfile.objects.create(user=instance)
