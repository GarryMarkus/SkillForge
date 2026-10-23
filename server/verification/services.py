import json
import logging
import re
from django.contrib.auth import get_user_model
from django.db import transaction
from django.utils import timezone

from accounts.models import StudentProfile, StudentReport
from proctor.models import Exam, ExamSession
from .models import SkillCategory, SkillTestAttempt, PersonalityAttempt
from .personality_data import PERSONALITY_QUESTIONS
from .schemas import GeneratedTestPayloadSchema, FinalReportSummarySchema
from .utils.git_utils import fetch_github_profile
from .utils.langchain_utils import (
    analyze_resume,
    analyze_github_profile,
    generate_final_report,
    generate_test,
    final_analysis,
)
from .utils.pdf_utils import extract_text_from_pdf_fileobj

User = get_user_model()
logger = logging.getLogger(__name__)


def generate_partial_report(student_id: int):
    """
    Ingest a student's resume PDF and GitHub profile to create an initial AI evaluation report.
    Saved to StudentReport.report_summary.
    """
    try:
        user = User.objects.get(id=student_id)
        profile: StudentProfile = user.student_profile

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
            str(resume_analysis),
            str(github_analysis)
        )

        with transaction.atomic():
            report, _ = StudentReport.objects.get_or_create(student=profile)
            report.report_summary = {
                "stage": "temporary",
                "resume_analysis": resume_analysis,
                "github_analysis": github_analysis,
                "summary": summary,
            }
            report.save()
        return report

    except Exception as exc:
        logger.exception("Partial report generation failed: %s", exc)
        try:
            profile = StudentProfile.objects.filter(user_id=student_id).first()
            if profile:
                with transaction.atomic():
                    StudentReport.objects.update_or_create(
                        student=profile,
                        defaults={
                            "report_summary": {
                                "stage": "error",
                                "error": f"AI analysis failed: {str(exc)}",
                                "timestamp": timezone.now().isoformat()
                            }
                        }
                    )
        except Exception:
            logger.exception("Failed to write fallback error report")
        return None


def generate_skill_test_for_student(student_id: int, category_id: int | None = None):
    """
    Generate dynamic assessment questions tailored to candidate strengths using Gemini LLM.
    Provisions a proctored ExamSession and associates it with the SkillTestAttempt atomically.
    """
    try:
        user = User.objects.get(id=student_id)
        report, _ = StudentReport.objects.get_or_create(student=user.student_profile)
        summary = report.report_summary or {}

        if category_id:
            category = SkillCategory.objects.filter(id=category_id).first()
            if not category:
                category, _ = SkillCategory.objects.get_or_create(name="General Programming")
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

        validated_payload = GeneratedTestPayloadSchema.validate_or_fallback(payload, fallback_role=category.name)
        questions_list = [q.to_dict() for q in validated_payload.questions]

        # Multi-table atomic creation: Attempt, Exam, ExamSession
        with transaction.atomic():
            attempt = SkillTestAttempt.objects.create(
                user=user,
                category=category,
                generated_questions=questions_list,
                total_questions=len(questions_list),
            )

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
    """
    Evaluate candidate assessment answers, verify proctoring integrity, compute score percentage,
    and update candidate standing in StudentReport within a database transaction.
    """
    try:
        user = User.objects.get(id=student_id)
        attempt = SkillTestAttempt.objects.select_related("proctor_session").get(
            id=attempt_id,
            user=user
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
            if i < len(answers) and answers[i] == question.get("correct_answer"):
                correct += 1

        total = attempt.total_questions
        percentage = (correct / total) * 100 if total else 0
        passed = percentage >= 60

        report, _ = StudentReport.objects.get_or_create(
            student=user.student_profile
        )

        # Generate LLM analysis with fallback handling
        try:
            final_report = final_analysis(
                str(report.report_summary.get("resume_analysis", "")),
                str(report.report_summary.get("github_analysis", "")),
                str(report.report_summary.get("summary", "")),
                percentage,
                "PASS" if passed else "FAIL"
            )
            validated_summary = FinalReportSummarySchema.validate_or_fallback(final_report)
            final_dict = validated_summary.to_dict()
        except Exception as llm_err:
            logger.warning("LLM final_analysis failed: %s. Using default rating summary.", llm_err)
            final_dict = {
                "star_rating": 4.0 if passed else 3.0,
                "strengths": ["Completed empirical skill assessment questions"],
                "weaknesses": ["Continue practicing advanced domain problem patterns"],
                "recommended_tags": ["Intermediate" if passed else "Beginner"]
            }

        # Multi-table atomic commit: Attempt + Report
        with transaction.atomic():
            attempt.submitted_answers = answers
            attempt.score = correct
            attempt.percentage = percentage
            attempt.passed = passed
            attempt.completed_at = timezone.now()
            attempt.is_evaluated = True
            attempt.save()

            report.skill_test_score = percentage
            if not isinstance(report.report_summary, dict):
                report.report_summary = {}
            report.report_summary["final"] = final_dict
            report.report_summary["stage"] = "verified" if passed else "needs_improvement"
            report.save()

        return {
            "status": "completed",
            "score": correct,
            "percentage": percentage,
            "passed": passed,
            "analysis": final_dict
        }

    except Exception:
        logger.exception("Submit test failed")
        raise


def get_final_analysis(student_id: int):
    """Retrieve full audit breakdown and assessment scores for a student."""
    report = StudentReport.objects.filter(
        student__user_id=student_id
    ).first()
    if not report:
        return {"stage": "temporary"}
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


def submit_personality_assessment(user, answers):
    """
    Score psychometric personality questions and assign learning level pace atomically.
    Max points = 28. >=24: fast, >=16: average, <16: slow.
    """
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

    with transaction.atomic():
        PersonalityAttempt.objects.create(
            user=user,
            answers=answers,
            total_score=total,
            learning_level=level
        )

        report, _ = StudentReport.objects.get_or_create(student=user.student_profile)
        report.personality_score = total
        report.save()

    return {
        "score": total,
        "learning_level": level
    }


def get_recommendation(student_id: int):
    """Retrieve candidate recommendation card data parsed from final report JSON."""
    report = StudentReport.objects.filter(
        student__user_id=student_id
    ).first()
    if not report or not report.report_summary:
        return {"status": "not_ready"}

    summary = report.report_summary or {}
    final_data = summary.get("final")

    if not final_data:
        return {"status": "not_ready"}

    if isinstance(final_data, str):
        cleaned = re.sub(r"```json|```", "", final_data).strip()
        try:
            final_data = json.loads(cleaned)
        except Exception:
            final_data = {"raw": final_data}

    return {
        "status": "ready",
        **final_data,
        "personality_score": report.personality_score,
        "skill_score": report.skill_test_score,
        "stage": summary.get("stage")
    }
