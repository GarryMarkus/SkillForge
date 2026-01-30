from django.db import models
from accounts.models import ClientProfile

class JobPost(models.Model):
    CATEGORY_CHOICES = [
        ('Web Development', 'Web Development'),
        ('Mobile App', 'Mobile App'),
        ('AI/ML', 'AI/ML'),
        ('Design', 'Design'),
        ('Data Science', 'Data Science'),
        ('Other', 'Other'),
    ]

    STATUS_CHOICES = [
        ('open', 'Open'),
        ('closed', 'Closed'),
        ('draft', 'Draft'),
    ]

    BUDGET_TYPE_CHOICES = [
        ('fixed', 'Fixed Price'),
        ('hourly', 'Hourly Rate'),
    ]

    client = models.ForeignKey(ClientProfile, on_delete=models.CASCADE, related_name='job_posts')
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.TextField()
    
    budget_type = models.CharField(max_length=20, choices=BUDGET_TYPE_CHOICES, default='fixed')
    budget_amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Store skills as a comma-separated string or use a JSONField if configured (using TextField for simplicity/compatibility)
    skills_required = models.TextField(help_text="Comma-separated list of skills")
    
    min_skill_score = models.IntegerField(default=0, help_text="Minimum SkillForge Score required to apply")
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.client.company_name}"


class JobApplication(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]

    job = models.ForeignKey(JobPost, on_delete=models.CASCADE, related_name='applications')
    student = models.ForeignKey('accounts.StudentProfile', on_delete=models.CASCADE, related_name='job_applications')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    applied_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('job', 'student')

    def __str__(self):
        return f"{self.student.user.email} -> {self.job.title}"
