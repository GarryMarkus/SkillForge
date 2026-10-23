"""
Celery asynchronous background tasks for AI-driven verification and test generation.
"""

import logging
from celery import shared_task
from .services import generate_partial_report as service_generate_partial_report
from .services import generate_skill_test_for_student as service_generate_skill_test

logger = logging.getLogger(__name__)


@shared_task(bind=True)
def generate_partial_report_task(self, student_id: int):
    """
    Celery task to asynchronously process resume PDF and GitHub profile analysis.
    """
    logger.info("Executing async partial report generation for student %s (Task %s)", student_id, self.request.id)
    report = service_generate_partial_report(student_id)
    if report:
        return {
            "status": "SUCCESS",
            "student_id": student_id,
            "report_id": report.id,
            "report_summary": report.report_summary
        }
    return {
        "status": "FAILURE",
        "student_id": student_id,
        "error": "Failed to generate partial report"
    }


@shared_task(bind=True)
def generate_skill_test_task(self, student_id: int, category_id: int | None = None):
    """
    Celery task to asynchronously generate personalized assessment questions and proctor session.
    """
    logger.info("Executing async skill test generation for student %s (Task %s)", student_id, self.request.id)
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
        "error": "Failed to generate skill test"
    }
