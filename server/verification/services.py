import json
import logging
import os
import re
from urllib.parse import urlparse
from django.contrib.auth import get_user_model
from django.db import transaction
from django.utils import timezone

from accounts.models import StudentProfile, StudentReport, StudentContentAnalysis
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

KNOWN_TECH_KEYWORDS = [
    "Python", "Django", "Flask", "FastAPI", "React", "Next.js", "TypeScript",
    "JavaScript", "Node.js", "PostgreSQL", "MySQL", "SQLite", "MongoDB",
    "Redis", "Docker", "Kubernetes", "AWS", "GCP", "Azure", "Linux",
    "Git", "CI/CD", "Celery", "GraphQL", "REST API", "TailwindCSS", "Vite",
    "PyTorch", "TensorFlow", "Scikit-learn", "Machine Learning", "Java", "Go",
    "Rust", "C++", "HTML", "CSS", "SQL",
]

RESUME_FALLBACK_PREFIX = "Candidate resume analysis: Demonstrates foundational software development competencies."
GITHUB_FALLBACK_PREFIX = "GitHub profile review: Active repositories demonstrate version control proficiency"
SUMMARY_FALLBACK_PREFIX = "Comprehensive Candidate Evaluation: Candidate exhibits solid engineering capabilities"


def _extract_github_username(github_url: str | None) -> str:
    """Safely extract a GitHub username from a profile URL or raw handle."""
    if not github_url:
        return ""
    raw = str(github_url).strip()
    if not raw:
        return ""
    if "://" not in raw and "/" not in raw:
        return raw.lstrip("@")
    if "://" not in raw:
        raw = f"https://{raw}"
    parsed = urlparse(raw)
    segments = [seg for seg in (parsed.path or "").split("/") if seg]
    return segments[0].lstrip("@") if segments else ""


def _parse_explicit_skills(skills_text: str | None) -> list[str]:
    """Parse comma-separated skills into a clean deduplicated list."""
    if not skills_text:
        return []
    seen = set()
    result = []
    for part in str(skills_text).split(","):
        cleaned = part.strip()
        if cleaned and cleaned.lower() not in seen:
            seen.add(cleaned.lower())
            result.append(cleaned)
    return result


def _extract_keywords_from_text(text: str, explicit_skills: list[str] | None = None) -> list[str]:
    """Identify known technical stack keywords + explicit skills present in text."""
    seen = set()
    found = []

    for skill in (explicit_skills or []):
        low = skill.lower()
        if low not in seen:
            seen.add(low)
            found.append(skill)

    if text:
        lowered = text.lower()
        for kw in KNOWN_TECH_KEYWORDS:
            pattern = r"(?<![a-z0-9])" + re.escape(kw.lower()) + r"(?![a-z0-9])"
            if re.search(pattern, lowered) and kw.lower() not in seen:
                seen.add(kw.lower())
                found.append(kw)

    return found


def _is_llm_configured() -> bool:
    return bool(os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY"))


def generate_partial_report(student_id: int):
    """
    Ingest a student's resume PDF and GitHub profile to create an initial AI evaluation report
    with auditable source provenance saved to StudentReport.report_summary and StudentContentAnalysis.
    Preserves existing assessment stage and final test analysis if already evaluated.
    """
    try:
        user = User.objects.get(id=student_id)
        profile, _ = StudentProfile.objects.get_or_create(user=user)
        now_iso = timezone.now().isoformat()
        llm_configured = _is_llm_configured()

        explicit_skills = _parse_explicit_skills(profile.skills)

        # 1. Resume PDF Extraction & Analysis
        has_resume_file = bool(profile.resume and getattr(profile.resume, "name", ""))
        resume_filename = os.path.basename(profile.resume.name) if has_resume_file else ""
        extracted_text = ""
        if has_resume_file:
            extracted_text = extract_text_from_pdf_fileobj(profile.resume)

        if extracted_text:
            resume_status = "analyzed_pdf"
            resume_input_text = extracted_text
            resume_analysis = analyze_resume(resume_input_text)
        elif profile.bio or explicit_skills or profile.education:
            resume_status = "profile_fallback"
            resume_input_text = "\n".join(filter(None, [
                f"Candidate: {profile.full_name}",
                f"Education: {profile.education}",
                f"Experience Level: {profile.experience_level}",
                f"Declared Skills: {', '.join(explicit_skills)}" if explicit_skills else "",
                f"Bio: {profile.bio}",
            ]))
            resume_analysis = analyze_resume(resume_input_text)
        else:
            resume_status = "missing"
            resume_input_text = ""
            resume_analysis = "No resume PDF or profile technical summary provided yet."

        resume_keywords = _extract_keywords_from_text(resume_input_text, explicit_skills)
        resume_used_fallback = str(resume_analysis).startswith(RESUME_FALLBACK_PREFIX)
        extracted_preview = ""
        if extracted_text:
            extracted_preview = (
                extracted_text[:450].strip() + ("..." if len(extracted_text) > 450 else "")
            )

        resume_source = {
            "status": resume_status,
            "has_file": has_resume_file,
            "filename": resume_filename,
            "extracted_chars": len(extracted_text),
            "extracted_preview": extracted_preview,
            "matched_skills": resume_keywords,
            "profile_skills": explicit_skills,
            "analysis_mode": (
                "none" if resume_status == "missing"
                else ("gemini_ai" if llm_configured and not resume_used_fallback else "fallback_heuristic")
            ),
            "analyzed_at": now_iso,
        }

        # 2. GitHub Profile Extraction & Analysis
        username = _extract_github_username(profile.github_url)
        github_analysis = "No GitHub URL linked yet."
        github_source = {
            "status": "missing",
            "has_github": False,
            "github_url": profile.github_url or "",
            "username": "",
            "display_name": "",
            "bio": "",
            "public_repos": 0,
            "is_mock": False,
            "fallback_reason": "",
            "repos": [],
            "detected_languages": [],
            "matched_skills": [],
            "analysis_mode": "none",
            "analyzed_at": now_iso,
        }

        if username:
            github_data = fetch_github_profile(username)
            github_analysis = analyze_github_profile(str(github_data))
            repos = github_data.get("repos", []) if isinstance(github_data, dict) else []
            detected_languages = []
            seen_langs = set()
            repo_corpus_parts = [github_data.get("bio", "")]
            for repo in repos:
                lang = str(repo.get("language") or "").strip()
                if lang and lang.lower() not in seen_langs:
                    seen_langs.add(lang.lower())
                    detected_languages.append(lang)
                repo_corpus_parts.append(str(repo.get("name") or ""))
                repo_corpus_parts.append(str(repo.get("description") or ""))

            github_keywords = _extract_keywords_from_text(" ".join(repo_corpus_parts), detected_languages)
            github_used_fallback = str(github_analysis).startswith(GITHUB_FALLBACK_PREFIX)
            is_mock = bool(github_data.get("is_mock", False))

            github_source = {
                "status": "analyzed_fallback" if is_mock else "analyzed_live",
                "has_github": True,
                "github_url": profile.github_url or f"https://github.com/{username}",
                "username": github_data.get("username", username),
                "display_name": github_data.get("name", username),
                "bio": github_data.get("bio", ""),
                "public_repos": github_data.get("public_repos", len(repos)),
                "is_mock": is_mock,
                "fallback_reason": github_data.get("fallback_reason", ""),
                "repos": repos[:8],
                "detected_languages": detected_languages,
                "matched_skills": github_keywords,
                "analysis_mode": (
                    "gemini_ai" if llm_configured and not github_used_fallback else "fallback_heuristic"
                ),
                "analyzed_at": now_iso,
            }

        # 3. Combined Synthesis Report
        if resume_status == "missing" and not github_source["has_github"]:
            summary = "Upload a resume PDF or link your GitHub profile so SkillForge can run a transparent multi-source analysis."
        else:
            summary = generate_final_report(str(resume_analysis), str(github_analysis))

        with transaction.atomic():
            if resume_status != "missing":
                StudentContentAnalysis.objects.update_or_create(
                    student=profile,
                    source_type="resume",
                    defaults={
                        "extracted_keywords": {
                            "primary_skills": resume_keywords[:8],
                            "secondary_skills": explicit_skills,
                            "filename": resume_filename,
                            "extracted_chars": len(extracted_text),
                        },
                        "ai_summary": {
                            "text": resume_analysis,
                            "status": resume_status,
                            "preview": extracted_preview,
                            "analyzed_at": now_iso,
                        },
                    },
                )

            if github_source["has_github"]:
                StudentContentAnalysis.objects.update_or_create(
                    student=profile,
                    source_type="github",
                    defaults={
                        "extracted_keywords": {
                            "username": github_source["username"],
                            "languages": github_source["detected_languages"],
                            "skills": github_source["matched_skills"],
                            "public_repos": github_source["public_repos"],
                        },
                        "ai_summary": {
                            "text": github_analysis,
                            "is_mock": github_source["is_mock"],
                            "fallback_reason": github_source["fallback_reason"],
                            "repos": github_source["repos"],
                            "analyzed_at": now_iso,
                        },
                    },
                )

            report, _ = StudentReport.objects.get_or_create(student=profile)
            existing_summary = dict(report.report_summary) if isinstance(report.report_summary, dict) else {}
            preserved_stage = existing_summary.get("stage")
            next_stage = (
                preserved_stage
                if preserved_stage in ("verified", "needs_improvement")
                else "temporary"
            )

            updated_summary = {
                **existing_summary,
                "stage": next_stage,
                "resume_analysis": resume_analysis,
                "github_analysis": github_analysis,
                "summary": summary,
                "sources": {
                    "resume": resume_source,
                    "github": github_source,
                },
                "analyzed_at": now_iso,
            }
            updated_summary.pop("error", None)
            report.report_summary = updated_summary
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


def is_answer_correct(candidate_ans, question: dict) -> bool:
    """
    Resiliently evaluates whether a candidate's answer matches the question's correct answer.
    Supports:
    - Zero-based integer or string index (0 -> A, 1 -> B, etc.)
    - Option letter ('A', 'B', 'C', 'D' case-insensitive)
    - Full text of the option matching question option text
    """
    if candidate_ans is None or not isinstance(question, dict):
        return False

    raw_correct = question.get("correct_answer") or question.get("correct_option") or question.get("correct_index")
    options = question.get("options")
    if not isinstance(options, list):
        options = [
            question.get("option_a", ""),
            question.get("option_b", ""),
            question.get("option_c", ""),
            question.get("option_d", ""),
        ]

    letter_to_idx = {"A": 0, "B": 1, "C": 2, "D": 3}
    idx_to_letter = {0: "A", 1: "B", 2: "C", 3: "D"}

    # 1. Determine correct letter and correct index
    correct_idx = None
    correct_letter = None

    if isinstance(raw_correct, int) and 0 <= raw_correct < len(options):
        correct_idx = raw_correct
        correct_letter = idx_to_letter.get(correct_idx)
    elif isinstance(raw_correct, str):
        cleaned_correct = raw_correct.strip().upper()
        if cleaned_correct in letter_to_idx:
            correct_letter = cleaned_correct
            correct_idx = letter_to_idx[cleaned_correct]
        else:
            try:
                num = int(cleaned_correct)
                if 0 <= num < len(options):
                    correct_idx = num
                    correct_letter = idx_to_letter.get(num)
            except ValueError:
                for idx, opt in enumerate(options):
                    if str(opt).strip().lower() == raw_correct.strip().lower():
                        correct_idx = idx
                        correct_letter = idx_to_letter.get(idx)
                        break

    # 2. Determine candidate's selected index and letter
    cand_idx = None
    cand_letter = None

    if isinstance(candidate_ans, int) and 0 <= candidate_ans < len(options):
        cand_idx = candidate_ans
        cand_letter = idx_to_letter.get(cand_idx)
    elif isinstance(candidate_ans, str):
        cleaned_cand = candidate_ans.strip().upper()
        if cleaned_cand in letter_to_idx:
            cand_letter = cleaned_cand
            cand_idx = letter_to_idx[cleaned_cand]
        else:
            try:
                num = int(cleaned_cand)
                if 0 <= num < len(options):
                    cand_idx = num
                    cand_letter = idx_to_letter.get(num)
            except ValueError:
                for idx, opt in enumerate(options):
                    if str(opt).strip().lower() == candidate_ans.strip().lower():
                        cand_idx = idx
                        cand_letter = idx_to_letter.get(idx)
                        break

    # Check for match
    if correct_idx is not None and cand_idx is not None and correct_idx == cand_idx:
        return True
    if correct_letter is not None and cand_letter is not None and correct_letter == cand_letter:
        return True
    if isinstance(candidate_ans, str) and isinstance(raw_correct, str):
        if candidate_ans.strip().lower() == raw_correct.strip().lower():
            return True

    return False


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
            cand_ans = answers[i] if i < len(answers) else None
            if is_answer_correct(cand_ans, question):
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

        # Multi-table atomic commit: Attempt + Report + StudentProfile rating
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

            # Synchronize profile star rating
            profile = getattr(user, "student_profile", None)
            if profile:
                profile.rating = round(float(final_dict.get("star_rating", 4.0)), 1)
                profile.save(update_fields=["rating"])

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
    """
    Retrieve full AI verification transparency breakdown and assessment scores for a student.
    Reconstructs source provenance safely from StudentReport, StudentContentAnalysis, and StudentProfile.
    """
    profile = (
        StudentProfile.objects.select_related("user", "report")
        .prefetch_related("analyses")
        .filter(user_id=student_id)
        .first()
    )
    report = getattr(profile, "report", None) if profile else StudentReport.objects.filter(student__user_id=student_id).first()
    summary = report.report_summary if (report and isinstance(report.report_summary, dict)) else {}

    explicit_skills = _parse_explicit_skills(profile.skills) if profile else []
    has_resume_file = bool(profile and profile.resume and getattr(profile.resume, "name", ""))
    resume_filename = os.path.basename(profile.resume.name) if has_resume_file else ""
    github_url = (profile.github_url or "") if profile else ""
    github_username = _extract_github_username(github_url)

    analyses_by_type = {}
    if profile:
        for analysis in profile.analyses.all():
            analyses_by_type[analysis.source_type] = analysis

    sources = summary.get("sources") if isinstance(summary.get("sources"), dict) else {}

    # Resume provenance reconstruction
    saved_resume_source = sources.get("resume") if isinstance(sources.get("resume"), dict) else None
    resume_analysis_record = analyses_by_type.get("resume")
    if saved_resume_source:
        resume_source = {
            **saved_resume_source,
            "has_file": has_resume_file or bool(saved_resume_source.get("has_file")),
            "filename": resume_filename or saved_resume_source.get("filename", ""),
        }
    elif resume_analysis_record:
        kw = resume_analysis_record.extracted_keywords if isinstance(resume_analysis_record.extracted_keywords, dict) else {}
        ai_sum = resume_analysis_record.ai_summary if isinstance(resume_analysis_record.ai_summary, dict) else {}
        matched = (kw.get("primary_skills") or []) + (kw.get("secondary_skills") or [])
        resume_source = {
            "status": "analyzed_pdf" if has_resume_file else "profile_fallback",
            "has_file": has_resume_file,
            "filename": resume_filename or kw.get("filename", ""),
            "extracted_chars": kw.get("extracted_chars", 0),
            "extracted_preview": ai_sum.get("preview", ""),
            "matched_skills": matched or explicit_skills,
            "profile_skills": explicit_skills,
            "analysis_mode": "stored_analysis",
            "analyzed_at": ai_sum.get("analyzed_at") or resume_analysis_record.created_at.isoformat(),
        }
    else:
        resume_source = {
            "status": "pending_scan" if (has_resume_file or explicit_skills) else "missing",
            "has_file": has_resume_file,
            "filename": resume_filename,
            "extracted_chars": 0,
            "extracted_preview": "",
            "matched_skills": explicit_skills,
            "profile_skills": explicit_skills,
            "analysis_mode": "none",
            "analyzed_at": None,
        }

    # GitHub provenance reconstruction
    saved_github_source = sources.get("github") if isinstance(sources.get("github"), dict) else None
    github_analysis_record = analyses_by_type.get("github")
    if saved_github_source and (
        not github_username or saved_github_source.get("username", "").lower() == github_username.lower()
    ):
        github_source = saved_github_source
    elif github_analysis_record and github_username:
        kw = github_analysis_record.extracted_keywords if isinstance(github_analysis_record.extracted_keywords, dict) else {}
        ai_sum = github_analysis_record.ai_summary if isinstance(github_analysis_record.ai_summary, dict) else {}
        is_mock = bool(ai_sum.get("is_mock", False))
        github_source = {
            "status": "analyzed_fallback" if is_mock else "analyzed_live",
            "has_github": True,
            "github_url": github_url,
            "username": kw.get("username", github_username),
            "display_name": kw.get("username", github_username),
            "bio": "",
            "public_repos": kw.get("public_repos", 0),
            "is_mock": is_mock,
            "fallback_reason": ai_sum.get("fallback_reason", ""),
            "repos": ai_sum.get("repos", []),
            "detected_languages": kw.get("languages", []),
            "matched_skills": kw.get("skills", []),
            "analysis_mode": "stored_analysis",
            "analyzed_at": ai_sum.get("analyzed_at") or github_analysis_record.created_at.isoformat(),
        }
    else:
        github_source = {
            "status": "pending_scan" if github_username else "missing",
            "has_github": bool(github_username),
            "github_url": github_url,
            "username": github_username,
            "display_name": github_username,
            "bio": "",
            "public_repos": 0,
            "is_mock": False,
            "fallback_reason": "",
            "repos": [],
            "detected_languages": [],
            "matched_skills": [],
            "analysis_mode": "none",
            "analyzed_at": None,
        }

    latest_attempt = (
        SkillTestAttempt.objects.select_related("category")
        .filter(user_id=student_id, is_evaluated=True)
        .order_by("-completed_at", "-started_at")
        .first()
    )
    latest_personality = (
        PersonalityAttempt.objects.filter(user_id=student_id)
        .order_by("-created_at")
        .first()
    )

    skill_score = float(report.skill_test_score or 0) if report else 0.0
    personality_score = float(report.personality_score or 0) if report else 0.0
    assessment_completed = bool(skill_score > 0 or latest_attempt is not None)
    personality_completed = bool(personality_score > 0 or latest_personality is not None)

    final_data = summary.get("final")
    star_rating = float(profile.rating or 0.0) if profile else 0.0
    if isinstance(final_data, dict) and final_data.get("star_rating"):
        try:
            star_rating = float(final_data["star_rating"])
        except (ValueError, TypeError):
            pass

    resume_text_summary = summary.get("resume_analysis")
    if not resume_text_summary and resume_analysis_record and isinstance(resume_analysis_record.ai_summary, dict):
        resume_text_summary = (
            resume_analysis_record.ai_summary.get("text")
            or resume_analysis_record.ai_summary.get("executive_summary")
        )

    github_text_summary = summary.get("github_analysis")
    if not github_text_summary and github_analysis_record and isinstance(github_analysis_record.ai_summary, dict):
        github_text_summary = github_analysis_record.ai_summary.get("text")

    return {
        "stage": summary.get("stage", "temporary"),
        "assessment_completed": assessment_completed,
        "personality_completed": personality_completed,
        "personality_score": round(personality_score, 1),
        "learning_level": latest_personality.learning_level if latest_personality else None,
        "skill_test_score": round(skill_score, 1),
        "star_rating": round(star_rating, 1),
        "latest_attempt": (
            {
                "id": latest_attempt.id,
                "category": latest_attempt.category.name,
                "score": latest_attempt.score,
                "total_questions": latest_attempt.total_questions,
                "percentage": round(float(latest_attempt.percentage or 0), 1),
                "passed": latest_attempt.passed,
                "completed_at": latest_attempt.completed_at.isoformat() if latest_attempt.completed_at else None,
            }
            if latest_attempt
            else None
        ),
        "profile_inputs": {
            "full_name": profile.full_name if profile else "",
            "education": profile.education if profile else "",
            "experience_level": profile.experience_level if profile else "",
            "skills": explicit_skills,
            "github_url": github_url,
            "has_resume_file": has_resume_file,
            "resume_filename": resume_filename,
        },
        "resume_source": resume_source,
        "github_source": github_source,
        "resume_analysis": resume_text_summary,
        "github_analysis": github_text_summary,
        "partial_summary": summary.get("summary") or summary.get("recommendations"),
        "final_analysis": final_data,
        "generated_at": summary.get("analyzed_at") or (report.generated_at.isoformat() if report else None),
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
        if summary.get("strengths") or (report.skill_test_score and report.skill_test_score > 0):
            profile = getattr(report, "student", None)
            star_val = float(getattr(profile, "rating", 4.8) or 4.8)
            final_data = {
                "star_rating": star_val,
                "strengths": summary.get("strengths") or ["Verified engineering competencies and problem solving"],
                "weaknesses": summary.get("weaknesses") or ["In-Memory Caching and Distributed Tracing"],
                "recommended_tags": summary.get("recommended_tags") or ["Python", "Django", "React", "Docker"],
            }
        else:
            return {"status": "not_ready"}

    if isinstance(final_data, str):
        cleaned = re.sub(r"```json|```", "", final_data).strip()
        try:
            final_data = json.loads(cleaned)
        except Exception:
            final_data = {"raw": final_data}

    return {
        "status": "ready",
        "recommendation": final_data,
        **final_data,
        "personality_score": report.personality_score,
        "skill_score": report.skill_test_score,
        "stage": summary.get("stage", "verified")
    }
