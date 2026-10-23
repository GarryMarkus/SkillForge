"""
Pydantic schemas for validating dynamic JSON fields produced by AI models.
Ensures data integrity before persisting to database models.
"""

from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


class QuestionItemSchema(BaseModel):
    """Schema for individual multiple-choice question in generated skill tests."""
    question_text: str = Field(alias="question", default="")
    option_a: str = Field(default="")
    option_b: str = Field(default="")
    option_c: str = Field(default="")
    option_d: str = Field(default="")
    correct_option: str = Field(alias="correct_answer", default="A")
    difficulty: Optional[str] = "Medium"
    type: Optional[str] = "practical"

    @classmethod
    def from_raw_item(cls, item: dict) -> "QuestionItemSchema":
        """Construct question schema normalizing from varied LLM question structures."""
        question_text = item.get("question") or item.get("question_text", "Technical Assessment Question")
        options = item.get("options") or []

        opt_a = item.get("option_a") or (options[0] if len(options) > 0 else "Option A")
        opt_b = item.get("option_b") or (options[1] if len(options) > 1 else "Option B")
        opt_c = item.get("option_c") or (options[2] if len(options) > 2 else "Option C")
        opt_d = item.get("option_d") or (options[3] if len(options) > 3 else "Option D")

        correct = item.get("correct_option") or item.get("correct_answer", "A")

        return cls(
            question=str(question_text),
            option_a=str(opt_a),
            option_b=str(opt_b),
            option_c=str(opt_c),
            option_d=str(opt_d),
            correct_answer=str(correct).strip()[:10],
            difficulty=str(item.get("difficulty", "Medium")),
            type=str(item.get("type", "practical"))
        )

    def to_dict(self) -> dict:
        return {
            "question": self.question_text,
            "question_text": self.question_text,
            "options": [self.option_a, self.option_b, self.option_c, self.option_d],
            "option_a": self.option_a,
            "option_b": self.option_b,
            "option_c": self.option_c,
            "option_d": self.option_d,
            "correct_answer": self.correct_option,
            "correct_option": self.correct_option,
            "difficulty": self.difficulty,
            "type": self.type
        }


class GeneratedTestPayloadSchema(BaseModel):
    """Schema for complete dynamic test question collection."""
    role: Optional[str] = "General Developer"
    questions: List[QuestionItemSchema] = Field(default_factory=list)

    @classmethod
    def validate_or_fallback(cls, raw_data: Any, fallback_role: str = "Developer") -> "GeneratedTestPayloadSchema":
        """Validate LLM output or fall back to safe default questions."""
        if not isinstance(raw_data, dict):
            return cls.get_default_fallback(fallback_role)

        raw_questions = raw_data.get("questions") or []
        if not isinstance(raw_questions, list) or len(raw_questions) == 0:
            return cls.get_default_fallback(fallback_role)

        validated_questions = []
        for q in raw_questions:
            try:
                if isinstance(q, dict):
                    validated_questions.append(QuestionItemSchema.from_raw_item(q))
            except Exception:
                continue

        if not validated_questions:
            return cls.get_default_fallback(fallback_role)

        return cls(
            role=raw_data.get("role", fallback_role),
            questions=validated_questions
        )

    @classmethod
    def get_default_fallback(cls, role: str) -> "GeneratedTestPayloadSchema":
        """Structured default fallback questions if AI generation fails schema validation."""
        defaults = [
            QuestionItemSchema(
                question=f"What is the recommended architectural pattern when building modular {role} applications?",
                option_a="Tight coupling all data logic directly in UI templates",
                option_b="Separation of concerns across data models, business services, and presentation components",
                option_c="Using global shared mutable state without synchronization",
                option_d="Hardcoding API credentials in client source code",
                correct_answer="B",
                difficulty="Medium",
                type="theory"
            ),
            QuestionItemSchema(
                question="Which HTTP status code signifies that an asynchronous task has been accepted for background processing?",
                option_a="200 OK",
                option_b="201 Created",
                option_c="202 Accepted",
                option_d="204 No Content",
                correct_answer="C",
                difficulty="Easy",
                type="practical"
            ),
            QuestionItemSchema(
                question="How should API rate limiting errors be handled by robust network interceptors?",
                option_a="Crash the UI immediately",
                option_b="Exponential backoff retry with clear user feedback",
                option_c="Spamming requests continuously in an infinite while loop",
                option_d="Silently dropping all application state",
                correct_answer="B",
                difficulty="Medium",
                type="task"
            ),
        ]
        return cls(role=role, questions=defaults)


class FinalReportSummarySchema(BaseModel):
    """Schema for final evaluation report summary contract."""
    star_rating: float = Field(ge=1.0, le=5.0, default=3.5)
    strengths: List[str] = Field(default_factory=list)
    weaknesses: List[str] = Field(default_factory=list)
    technical_tags: List[str] = Field(default_factory=list)

    @classmethod
    def validate_or_fallback(cls, raw_data: Any) -> "FinalReportSummarySchema":
        """Parse raw LLM output or return fallback contract."""
        if isinstance(raw_data, str):
            import re, json
            cleaned = re.sub(r"```(?:json)?", "", raw_data).strip().rstrip("`").strip()
            try:
                raw_data = json.loads(cleaned)
            except Exception:
                raw_data = {}

        if not isinstance(raw_data, dict):
            raw_data = {}

        try:
            rating = float(raw_data.get("star_rating", 3.5))
            rating = max(1.0, min(5.0, rating))
        except (ValueError, TypeError):
            rating = 3.5

        strengths = raw_data.get("strengths")
        if not isinstance(strengths, list) or not strengths:
            strengths = ["Strong core problem solving abilities", "Solid engineering foundation"]

        weaknesses = raw_data.get("weaknesses")
        if not isinstance(weaknesses, list) or not weaknesses:
            weaknesses = ["Could benefit from additional advanced systems architecture practice"]

        tags = raw_data.get("technical_tags") or raw_data.get("recommended_tags")
        if not isinstance(tags, list) or not tags:
            tags = ["Verified", "Intermediate Developer"]

        return cls(
            star_rating=rating,
            strengths=[str(s) for s in strengths],
            weaknesses=[str(w) for w in weaknesses],
            technical_tags=[str(t) for t in tags]
        )

    def to_dict(self) -> dict:
        return {
            "star_rating": self.star_rating,
            "strengths": self.strengths,
            "weaknesses": self.weaknesses,
            "technical_tags": self.technical_tags,
            "recommended_tags": self.technical_tags,
        }


class UpskillModuleContentSchema(BaseModel):
    """Schema validating generated upskilling module content."""
    content: str = Field(min_length=1)
    metadata: Dict[str, Any] = Field(default_factory=dict)

    @classmethod
    def validate_or_fallback(cls, raw_data: Any, topic: str, level: str) -> "UpskillModuleContentSchema":
        if isinstance(raw_data, str):
            return cls(
                content=raw_data,
                metadata={"topic": topic, "level": level, "status": "validated"}
            )
        if isinstance(raw_data, dict):
            content = raw_data.get("content") or f"# Learning Module: {topic}\n\nComprehensive guide for {topic} at {level} pace."
            metadata = raw_data.get("metadata") or {}
            metadata.setdefault("topic", topic)
            metadata.setdefault("level", level)
            return cls(content=str(content), metadata=metadata)

        return cls(
            content=f"# Learning Module: {topic}\n\nCalibrated upskill module for {level} pace learners.",
            metadata={"topic": topic, "level": level, "fallback": True}
        )
