import logging
from django.contrib.auth import get_user_model

from accounts.models import *
from accounts.models import *
from .models import *
from proctor.models import Exam, ExamSession
from .utils.pdf_utils import extract_text_from_pdf_fileobj
from .utils.git_utils import fetch_github_profile
from .utils.langchain_utils import *
from time import timezone
User = get_user_model()
logger = logging.getLogger(__name__)

def generate_partial_report(student_id: int):
  

    try:
        user = User.objects.get(id=student_id)
        profile: StudentProfile = user.student_profile

        report, _ = StudentReport.objects.get_or_create(student=profile)

   
        resume_analysis = {}

        if profile.resume:
            text = extract_text_from_pdf_fileobj(profile.resume)
            resume_analysis = analyze_resume(text)

        github_analysis = {}

        if profile.github_url:
            username = profile.github_url.rstrip("/").split("/")[-1]
            github_data = fetch_github_profile(username)
            github_analysis = analyze_github_profile(str(github_data))

        summary = generate_final_report(
            resume_analysis,
            github_analysis
        )

      
        report.report_summary = {
            "stage": "temporary",
            "resume_analysis": resume_analysis,
            "github_analysis": github_analysis,
            "summary": summary,
        }

        report.save()

        return report

    except Exception:
        logger.exception("Partial report generation failed")

        StudentReport.objects.update_or_create(
            student_id=student_id,
            defaults={
                "report_summary": {
                    "error": "AI analysis failed. Please retry."
                }
            }
        )

        return None



def generate_skill_test_for_student(student_id: int, category_id: int | None = None):

    try:
        user = User.objects.get(id=student_id)

        report = StudentReport.objects.get(student=user.student_profile)

        summary = report.report_summary or {}

        if category_id:
            category = SkillCategory.objects.get(id=category_id)

        else:
            resume_data = summary.get("resume_analysis", {})
            github_data = summary.get("github_analysis", {})

            skills = []

            if isinstance(resume_data, dict):
                skills += resume_data.get("skills", [])

            if isinstance(github_data, dict):
                skills += github_data.get("skills", [])

            if not skills:
                skills = ["Python"]

            primary_skill = skills[0]

            category, _ = SkillCategory.objects.get_or_create(
                name=primary_skill.title()
            )

        payload = generate_test(
            resume_analysis=str(summary.get("resume_analysis", "")),
            github_analysis=str(summary.get("github_analysis", "")),
            recommendation=str(summary.get("summary", "")),
            num_questions=5,
            role_hint=category.name
        )

        attempt = SkillTestAttempt.objects.create(
            user=user,
            category=category,
            generated_questions=payload["questions"],
            total_questions=len(payload["questions"]),
        )

        # Create Proctor Session
        exam, _ = Exam.objects.get_or_create(
            title=f"{category.name} Assessment", 
            defaults={"duration_minutes": 30}
        )
        session = ExamSession.objects.create(user=user, exam=exam)
        
        attempt.proctor_session = session
        attempt.save()

        return attempt

    except Exception:
        logger.exception("Skill test generation failed")
        raise

def submit_skill_test(student_id: int, attempt_id: int, answers: list):


    try:
        user = User.objects.get(id=student_id)

        attempt = SkillTestAttempt.objects.get(
            id=attempt_id,
            user=user
        )

        report = StudentReport.objects.get(
            student=user.student_profile
        )

        session = attempt.proctor_session

        if session and session.is_flagged:
            return {
                "status": "flagged",
                "risk_score": session.risk_score,
                "message": "Test disqualified due to suspicious activity"
            }

        correct = 0

        for i, question in enumerate(attempt.generated_questions):
            if i < len(answers) and answers[i] == question["correct_answer"]:
                correct += 1

        total = attempt.total_questions
        percentage = (correct / total) * 100 if total else 0
        passed = percentage >= 60

        attempt.submitted_answers = answers
        attempt.score = correct
        attempt.percentage = percentage
        attempt.passed = passed
        attempt.completed_at = timezone.now()
        attempt.is_evaluated = True
        attempt.save()
        final_report = final_analysis(
            str(report.report_summary.get("resume_analysis", "")),
            str(report.report_summary.get("github_analysis", "")),
            str(report.report_summary.get("summary", "")),
            percentage,
            "PASS" if passed else "FAIL"
        )

        report.skill_test_score = percentage

        report.report_summary["final"] = final_report
        report.report_summary["stage"] = "verified" if passed else "needs_improvement"

        report.save()

        return {
            "status": "completed",
            "score": correct,
            "percentage": percentage,
            "passed": passed,
            "analysis": final_report
        }

    except Exception:
        logger.exception("Submit test failed")
        raise





def get_final_analysis(student_id: int):
  
    report = StudentReport.objects.get(
        student__user_id=student_id
    )

    summary = report.report_summary or {}

    return {
        "stage": summary.get("stage", "temporary"),

        "personality_score": report.personality_score,
        "skill_test_score": report.skill_test_score,

        "resume_analysis": summary.get("resume_analysis"),
        "github_analysis": summary.get("github_analysis"),

        "partial_summary": summary.get("summary"),
        "final_analysis": summary.get("final"),
    }




from .personality_data import PERSONALITY_QUESTIONS



def submit_personality_assessment(user, answers):
    total = 0

    for q in PERSONALITY_QUESTIONS:
        choice = answers.get(str(q["id"]))
        if choice:
            total += q["options"].get(choice, 0)

    if total >= 24:
        level = "fast"
    elif total >= 16:
        level = "average"
    else:
        level = "slow"

    attempt = PersonalityAttempt.objects.create(
        user=user,
        answers=answers,
        total_score=total,
        learning_level=level
    )

    report = StudentReport.objects.get(student=user.student_profile)
    report.personality_score = total
    report.save()

    return {
        "score": total,
        "learning_level": level
    }
