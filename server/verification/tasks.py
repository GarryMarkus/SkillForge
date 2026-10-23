"""
Celery asynchronous background tasks for AI-driven verification and test generation.
Hardened with comprehensive error handling, explicit task failure states, and metadata recording.
"""

import logging
from celery import shared_task
from django.utils import timezone
from accounts.models import StudentProfile, StudentReport
from .services import generate_partial_report as service_generate_partial_report
from .services import generate_skill_test_for_student as service_generate_skill_test

logger = logging.getLogger(__name__)


@shared_task(bind=True)
def generate_partial_report_task(self, student_id: int):
    """
    Celery task to asynchronously process resume PDF and GitHub profile analysis.
    Explicitly catches worker failures and records failure metadata in StudentReport.
    """
    logger.info("Executing async partial report generation for student %s (Task %s)", student_id, self.request.id)
    try:
        report = service_generate_partial_report(student_id)
        if report and report.report_summary and "error" not in report.report_summary:
            return {
                "status": "SUCCESS",
                "student_id": student_id,
                "report_id": report.id,
                "report_summary": report.report_summary
            }

        err_msg = report.report_summary.get("error") if report and report.report_summary else "Service returned empty report"
        return {
            "status": "FAILURE",
            "student_id": student_id,
            "error": err_msg
        }
    except Exception as exc:
        logger.exception("Critical error during async partial report generation task for student %s: %s", student_id, exc)
        try:
            profile = StudentProfile.objects.filter(user_id=student_id).first()
            if profile:
                StudentReport.objects.update_or_create(
                    student=profile,
                    defaults={
                        "report_summary": {
                            "stage": "error",
                            "status": "FAILURE",
                            "error": f"Background verification failed: {str(exc)}",
                            "timestamp": timezone.now().isoformat()
                        }
                    }
                )
        except Exception as db_err:
            logger.exception("Failed to write task error state to StudentReport: %s", db_err)

        return {
            "status": "FAILURE",
            "student_id": student_id,
            "error": str(exc)
        }


@shared_task(bind=True)
def generate_skill_test_task(self, student_id: int, category_id: int | None = None):
    """
    Celery task to asynchronously generate personalized assessment questions and proctor session.
    Guarded against unhandled exceptions and crashes.
    """
    logger.info("Executing async skill test generation for student %s (Task %s)", student_id, self.request.id)
    try:
        attempt = service_generate_skill_test(student_id, category_id)
        if attempt:
            return {
                "status": "SUCCESS",
                "attempt_id": attempt.id,
                "session_id": attempt.proctor_session.id if attempt.proctor_session else None,
                "category": attempt.category.name,
                "total_questions": attempt.total_questions,
                "questions": attempt.generated_questions
            }
        return {
            "status": "FAILURE",
            "student_id": student_id,
            "error": "Failed to provision skill test attempt"
        }
    except Exception as exc:
        logger.exception("Async skill test generation task failed for student %s: %s", student_id, exc)
        return {
            "status": "FAILURE",
            "student_id": student_id,
            "error": str(exc)
        }


@shared_task(bind=True)
def generate_learning_module_task(self, student_id: int, topic: str):
    """
    Celery task to asynchronously generate an upskilling module calibrated to the student's learning pace.
    """
    logger.info("Executing async learning module generation for student %s, topic '%s' (Task %s)", student_id, topic, self.request.id)
    from modules.services import generate_upskill_module
    try:
        module = generate_upskill_module(student_id, topic)
        return {
            "status": "SUCCESS",
            "module_id": module.id,
            "topic": module.topic,
            "level": module.level
        }
    except Exception as exc:
        logger.exception("Learning module generation task failed: %s", exc)
        return {
            "status": "FAILURE",
            "error": str(exc)
        }


# Canonical aliases
generate_partial_report = generate_partial_report_task
generate_skill_test_for_student = generate_skill_test_task
generate_learning_module = generate_learning_module_task
