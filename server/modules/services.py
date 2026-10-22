from .models import UpskillModule
from .langchain_utils import generate_learning_module
from accounts.models import *
from .models import *
def generate_upskill_module(student_id: int, topic: str):

    user = User.objects.get(id=student_id)

    report = StudentReport.objects.get(student=user.student_profile)

    score = report.personality_score or 0

    if score >= 24:
        level = "fast"
    elif score >= 16:
        level = "average"
    else:
        level = "slow"

    result = generate_learning_module(topic, level)

    if isinstance(result, str):
        import re
        import json
        cleaned = re.sub(r"```[\w]*", "", result) 
        cleaned = cleaned.strip()
        result = json.loads(cleaned)

    module = UpskillModule.objects.create(
    user=user,
    topic=topic,
    level=level,
    content=result["content"],
    ai_metadata=result["metadata"]
)


    return module


def list_user_modules(student_id: int):
    return UpskillModule.objects.filter(user_id=student_id).order_by("-created_at")
