import json
import re
from django.contrib.auth import get_user_model
from accounts.models import StudentReport
from .models import UpskillModule
from .langchain_utils import generate_learning_module

User = get_user_model()


def generate_upskill_module(student_id: int, topic: str) -> UpskillModule:
    """
    Generate an interactive markdown learning module tailored to the student's personality learning pace.
    """
    user = User.objects.get(id=student_id)
    report = StudentReport.objects.filter(student=user.student_profile).first()
    score = (report.personality_score or 0) if report else 0

    if score >= 24:
        level = "fast"
    elif score >= 16:
        level = "average"
    else:
        level = "slow"

    result = generate_learning_module(topic, level)

    if isinstance(result, str):
        cleaned = re.sub(r"```(?:json)?", "", result).strip()
        cleaned = cleaned.rstrip("`").strip()
        try:
            result = json.loads(cleaned)
        except Exception:
            result = {"content": cleaned, "metadata": {}}
    elif not isinstance(result, dict):
        result = {"content": str(result), "metadata": {}}

    module = UpskillModule.objects.create(
        user=user,
        topic=topic,
        level=level,
        content=result.get("content", ""),
        ai_metadata=result.get("metadata", {})
    )

    return module


def list_user_modules(student_id: int):
    """Retrieve all learning modules created for a student ordered by creation date."""
    return UpskillModule.objects.filter(user_id=student_id).order_by("-created_at")
