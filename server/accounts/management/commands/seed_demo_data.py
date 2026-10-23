"""
Django management command to populate the database with realistic development data.
Idempotent: safe to run repeatedly without creating duplicates.
"""

from django.core.management.base import BaseCommand
from accounts.models import User, StudentProfile, StudentReport, StudentContentAnalysis, ClientProfile
from project.models import JobPost, JobApplication


class Command(BaseCommand):
    help = "Seed database with idempotent demo student, recruiter, job posts, and applications."

    def handle(self, *args, **options):
        self.stdout.write("Seeding demo data...")

        # 1. Demo Student User
        student_email = "student@example.com"
        student_user, _ = User.objects.get_or_create(
            email=student_email,
            defaults={
                "role": "student",
                "verified": True,
                "onboarding_stage": 4,
                "is_active": True,
            }
        )
        student_user.set_password("Password123!")
        student_user.role = "student"
        student_user.verified = True
        student_user.onboarding_stage = 4
        student_user.is_active = True
        student_user.save()

        # Student Profile
        student_profile, _ = StudentProfile.objects.get_or_create(user=student_user)
        student_profile.full_name = "Alex Johnson"
        student_profile.location = "San Francisco, CA"
        student_profile.bio = (
            "Passionate full-stack developer with 3+ years building high-throughput web apps, "
            "REST APIs, and reactive interfaces using Django and React."
        )
        student_profile.education = "B.S. in Computer Science, UC Berkeley"
        student_profile.experience_level = "Mid-Level"
        student_profile.github_url = "https://github.com/alexjohnson-demo"
        student_profile.portfolio_links = "https://alexjohnson.dev"
        student_profile.skills = "Python, React, Django"
        student_profile.rating = 4.8
        student_profile.save()

        # Student Content Analysis (Resume text representation)
        StudentContentAnalysis.objects.update_or_create(
            student=student_profile,
            source_type="resume",
            defaults={
                "extracted_keywords": {
                    "primary_skills": ["Python", "React", "Django"],
                    "secondary_skills": ["PostgreSQL", "REST APIs", "Docker", "Git"],
                    "experience_years": 3,
                },
                "ai_summary": {
                    "executive_summary": "Strong engineering foundations in backend Python architectures and frontend component lifecycles.",
                    "strengths": ["Clean architectural separation", "REST API development", "State management"],
                }
            }
        )

        # Student Report
        StudentReport.objects.update_or_create(
            student=student_profile,
            defaults={
                "personality_score": 88.0,
                "skill_test_score": 92.5,
                "report_summary": {
                    "strengths": [
                        "Deep proficiency with Django ORM and REST Framework",
                        "Modern React architecture and component optimization",
                        "Reliable proactive communication and team collaboration"
                    ],
                    "recommendations": "Strong candidate for full-stack and backend engineering roles.",
                    "composite_grade": "A+"
                }
            }
        )
        self.stdout.write(self.style.SUCCESS(f"Successfully configured demo student: {student_email}"))

        # 2. Demo Recruiter User
        recruiter_email = "recruiter@example.com"
        recruiter_user, _ = User.objects.get_or_create(
            email=recruiter_email,
            defaults={
                "role": "client",
                "verified": True,
                "onboarding_stage": 4,
                "is_active": True,
            }
        )
        recruiter_user.set_password("Password123!")
        recruiter_user.role = "client"
        recruiter_user.verified = True
        recruiter_user.onboarding_stage = 4
        recruiter_user.is_active = True
        recruiter_user.save()

        # Client Profile
        client_profile, _ = ClientProfile.objects.get_or_create(user=recruiter_user)
        client_profile.company_name = "TechCorp Labs"
        client_profile.industry = "Software & Artificial Intelligence"
        client_profile.website = "https://techcorp-labs.example.com"
        client_profile.address = "100 Innovation Way, Austin, TX"
        client_profile.save()
        self.stdout.write(self.style.SUCCESS(f"Successfully configured demo recruiter: {recruiter_email}"))

        # 3. Open Job Posts (3 distinct positions)
        jobs_seed = [
            {
                "title": "Full-Stack Engineer",
                "category": "Web Development",
                "description": (
                    "Join our core product team to design, build, and maintain mission-critical web applications. "
                    "You will work across the stack with Django on the backend and React on the frontend."
                ),
                "budget_type": "fixed",
                "budget_amount": 5500.00,
                "skills_required": "Python, React, Django",
                "min_skill_score": 75,
                "status": "open",
            },
            {
                "title": "Backend Python Specialist",
                "category": "Web Development",
                "description": (
                    "Focus on high-performance REST APIs, background job workers, and database query optimizations. "
                    "Experience with Django REST Framework, PostgreSQL, and Redis caching is strongly desired."
                ),
                "budget_type": "hourly",
                "budget_amount": 70.00,
                "skills_required": "Python, Django, PostgreSQL, Docker",
                "min_skill_score": 80,
                "status": "open",
            },
            {
                "title": "Frontend React Developer",
                "category": "Web Development",
                "description": (
                    "Build responsive, delightful user experiences with React, Vite, and modern styling libraries. "
                    "You will collaborate closely with product designers to implement interactive workflows."
                ),
                "budget_type": "fixed",
                "budget_amount": 4500.00,
                "skills_required": "React, JavaScript, TailwindCSS, Vite",
                "min_skill_score": 70,
                "status": "open",
            },
        ]

        seeded_jobs = []
        for job_data in jobs_seed:
            job, _ = JobPost.objects.update_or_create(
                client=client_profile,
                title=job_data["title"],
                defaults=job_data
            )
            seeded_jobs.append(job)
            self.stdout.write(f"  - Configured job post: '{job.title}'")

        # 4. Sample Job Application (Student -> Full-Stack Engineer)
        primary_job = seeded_jobs[0]
        application, app_created = JobApplication.objects.update_or_create(
            job=primary_job,
            student=student_profile,
            defaults={"status": "pending"}
        )
        app_status_msg = "Created" if app_created else "Updated"
        self.stdout.write(self.style.SUCCESS(f"{app_status_msg} sample application: {student_email} -> {primary_job.title}"))

        self.stdout.write(self.style.SUCCESS("Database seeding completed successfully!"))
