import re
from typing import Any


DOMAIN_TAXONOMY = [
    {
        "id": "languages",
        "name": "Programming Languages",
        "short_label": "Languages",
        "keywords": [
            {"label": "Python", "aliases": ["python"]},
            {"label": "C", "aliases": ["C"], "case_sensitive": True, "custom_regex": r"(?<![a-zA-Z0-9_+#.])C(?![a-zA-Z0-9_+#.])|(?i:\bC/C\+\+)"},
            {"label": "C++", "aliases": ["c++"]},
            {"label": "JavaScript", "aliases": ["javascript", "es6"]},
            {"label": "TypeScript", "aliases": ["typescript"]},
            {"label": "Dart", "aliases": ["dart"]},
            {"label": "Go", "aliases": ["golang"], "case_sensitive_aliases": ["Go"]},
            {"label": "Rust", "aliases": ["rust"]},
            {"label": "Java", "aliases": ["java"]},
            {"label": "SQL", "aliases": ["sql"]},
            {"label": "Bash", "aliases": ["bash", "shell scripting"]},
            {"label": "HTML", "aliases": ["html", "html5"]},
            {"label": "CSS", "aliases": ["css", "css3"]},
        ],
    },
    {
        "id": "backend",
        "name": "Backend & APIs",
        "short_label": "Backend",
        "keywords": [
            {"label": "Django", "aliases": ["django", "drf", "django rest framework"]},
            {"label": "FastAPI", "aliases": ["fastapi"]},
            {"label": "Flask", "aliases": ["flask"]},
            {"label": "Node.js", "aliases": ["node.js", "nodejs"]},
            {"label": "Express", "aliases": ["express.js", "expressjs"]},
            {"label": "REST API", "aliases": ["rest api", "restful", "rest apis"]},
            {"label": "GraphQL", "aliases": ["graphql"]},
            {"label": "Celery", "aliases": ["celery"]},
            {"label": "AsyncIO", "aliases": ["asyncio", "async/await"]},
            {"label": "WebSockets", "aliases": ["websockets", "websocket"]},
            {"label": "JWT", "aliases": ["jwt", "oauth2", "oauth"]},
            {"label": "Microservices", "aliases": ["microservices"]},
            {"label": "Spring Boot", "aliases": ["spring boot"]},
        ],
    },
    {
        "id": "frontend",
        "name": "Frontend & Desktop GUI",
        "short_label": "Frontend & GUI",
        "keywords": [
            {"label": "React", "aliases": ["react", "reactjs", "react.js"]},
            {"label": "Next.js", "aliases": ["next.js", "nextjs"]},
            {"label": "TailwindCSS", "aliases": ["tailwind", "tailwindcss", "tailwind css"]},
            {"label": "Vite", "aliases": ["vite"]},
            {"label": "PyQt6", "aliases": ["pyqt6", "pyqt5", "pyqt", "qt"]},
            {"label": "Flutter", "aliases": ["flutter"]},
            {"label": "Browser Extensions", "aliases": ["browser extension", "chrome extension", "webextension"]},
            {"label": "Vue.js", "aliases": ["vue", "vue.js", "vuejs"]},
            {"label": "Electron", "aliases": ["electron"]},
        ],
    },
    {
        "id": "databases",
        "name": "Databases & Caching",
        "short_label": "Databases",
        "keywords": [
            {"label": "PostgreSQL", "aliases": ["postgresql", "postgres"]},
            {"label": "MySQL", "aliases": ["mysql"]},
            {"label": "SQLite", "aliases": ["sqlite"]},
            {"label": "MongoDB", "aliases": ["mongodb", "mongo"]},
            {"label": "Redis", "aliases": ["redis"]},
            {"label": "Caching", "aliases": ["caching", "in-memory cache"]},
            {"label": "Firebase", "aliases": ["firebase"]},
            {"label": "Supabase", "aliases": ["supabase"]},
        ],
    },
    {
        "id": "systems_devops",
        "name": "Systems, Linux & DevOps",
        "short_label": "Systems & DevOps",
        "keywords": [
            {"label": "Linux", "aliases": ["linux", "ubuntu", "debian", "kali linux", "arch linux"]},
            {"label": "systemd", "aliases": ["systemd"]},
            {"label": "iptables", "aliases": ["iptables", "nftables"]},
            {"label": "TCP/IP", "aliases": ["tcp/ip", "networking", "dns", "http/https"]},
            {"label": "Docker", "aliases": ["docker", "containers", "containerization"]},
            {"label": "Kubernetes", "aliases": ["kubernetes", "k8s"]},
            {"label": "CI/CD", "aliases": ["ci/cd", "github actions", "jenkins"]},
            {"label": "Git", "aliases": ["git"]},
            {"label": "AWS", "aliases": ["aws", "amazon web services"]},
            {"label": "GCP", "aliases": ["gcp", "google cloud"]},
            {"label": "Azure", "aliases": ["azure"]},
            {"label": "Nginx", "aliases": ["nginx"]},
        ],
    },
    {
        "id": "cybersecurity",
        "name": "Cybersecurity & Forensics",
        "short_label": "Security",
        "keywords": [
            {"label": "GDB", "aliases": ["gdb"]},
            {"label": "Wireshark", "aliases": ["wireshark"]},
            {"label": "Nmap", "aliases": ["nmap"]},
            {"label": "Burp Suite", "aliases": ["burp suite", "burpsuite"]},
            {"label": "Metasploit", "aliases": ["metasploit"]},
            {"label": "Splunk", "aliases": ["splunk"]},
            {"label": "BloodHound", "aliases": ["bloodhound"]},
            {"label": "Penetration Testing", "aliases": ["penetration testing", "pentesting", "red team", "vulnerability assessment"]},
            {"label": "Incident Response", "aliases": ["incident response", "siem", "soc"]},
            {"label": "OWASP", "aliases": ["owasp"]},
        ],
    },
    {
        "id": "ai_algorithms",
        "name": "AI, ML & Algorithms",
        "short_label": "AI & Algorithms",
        "keywords": [
            {"label": "Machine Learning", "aliases": ["machine learning", "deep learning"]},
            {"label": "PyTorch", "aliases": ["pytorch"]},
            {"label": "TensorFlow", "aliases": ["tensorflow"]},
            {"label": "Scikit-learn", "aliases": ["scikit-learn", "sklearn"]},
            {"label": "LangChain", "aliases": ["langchain"]},
            {"label": "LLM / GenAI", "aliases": ["llm", "llms", "gemini", "generative ai", "rag"]},
            {"label": "Algorithms", "aliases": ["algorithms", "data structures", "swiss pairing", "dynamic programming", "graph theory"]},
            {"label": "Computer Vision", "aliases": ["computer vision", "opencv"]},
            {"label": "NLP", "aliases": ["nlp", "natural language processing"]},
        ],
    },
]


_PREAMBLE_PATTERNS = [
    re.compile(r"^here(?:'s| is)\s+(?:an?|the)\s+.*?(?:analysis|review|evaluation|breakdown|summary).*?:?\s*$", re.IGNORECASE),
    re.compile(r"^as an expert\b.*?reviewer|evaluator|recruiter.*?$", re.IGNORECASE),
    re.compile(r"^as an expert\b.*?metadata\.?\s*$", re.IGNORECASE),
    re.compile(r"^(?:below|following)\s+is\s+(?:an?|the)\s+.*?:?\s*$", re.IGNORECASE),
]

_RESUME_SECTION_TITLES = [
    "SUMMARY",
    "OBJECTIVE",
    "ABOUT",
    "PROFILE",
    "EDUCATION",
    "EXPERIENCE",
    "WORK EXPERIENCE",
    "INTERNSHIPS",
    "INTERNSHIP",
    "PROJECTS",
    "KEY PROJECTS",
    "TECHNICAL SKILLS",
    "SKILLS",
    "PATENTS",
    "PATENTS & PUBLICATIONS",
    "PUBLICATIONS",
    "CERTIFICATIONS",
    "ACHIEVEMENTS",
    "HONORS & AWARDS",
    "AWARDS",
    "LEADERSHIP",
    "EXTRACURRICULAR",
]


def _match_keyword_entry(entry: dict, text: str) -> bool:
    if not text:
        return False
    custom_regex = entry.get("custom_regex")
    if custom_regex and re.search(custom_regex, text):
        return True

    lowered = text.lower()
    if entry.get("case_sensitive"):
        for alias in entry.get("aliases", []):
            pattern = r"(?<![a-zA-Z0-9_+#.])" + re.escape(alias) + r"(?![a-zA-Z0-9_+#.])"
            if re.search(pattern, text):
                return True
    else:
        for alias in entry.get("aliases", []):
            pattern = r"(?<![a-z0-9_+#])" + re.escape(alias.lower()) + r"(?![a-z0-9_+#])"
            if re.search(pattern, lowered):
                return True

    for alias in entry.get("case_sensitive_aliases", []):
        pattern = r"(?<![a-zA-Z0-9_])" + re.escape(alias) + r"(?![a-zA-Z0-9_])"
        if re.search(pattern, text):
            return True

    return False


def extract_domain_matched_skills(text: str, explicit_skills: list[str] | None = None) -> tuple[list[str], dict[str, list[str]]]:
    """
    Match candidate text and explicit profile skills against DOMAIN_TAXONOMY.
    Returns (flat_deduplicated_skills, skills_by_domain_id).
    """
    combined_explicit = [str(s).strip() for s in (explicit_skills or []) if str(s).strip()]
    search_blob = "\n".join([text or "", ", ".join(combined_explicit)]).strip()

    flat_skills: list[str] = []
    flat_seen: set[str] = set()
    by_domain: dict[str, list[str]] = {}

    for domain in DOMAIN_TAXONOMY:
        matched_in_domain: list[str] = []
        for entry in domain["keywords"]:
            if _match_keyword_entry(entry, search_blob):
                label = entry["label"]
                matched_in_domain.append(label)
                if label.lower() not in flat_seen:
                    flat_seen.add(label.lower())
                    flat_skills.append(label)
        if matched_in_domain:
            by_domain[domain["id"]] = matched_in_domain

    # Preserve any candidate explicit skills not covered cleanly by taxonomy aliases
    for skill in combined_explicit:
        low = skill.lower()
        if low not in flat_seen:
            flat_seen.add(low)
            flat_skills.append(skill)

    return flat_skills, by_domain


def normalize_resume_text(raw_text: str) -> str:
    """Clean PyPDF2 whitespace quirks while keeping readable paragraph and bullet structure."""
    if not raw_text:
        return ""
    text = str(raw_text).replace("\r\n", "\n").replace("\r", "\n").replace("\x00", "")
    cleaned_lines: list[str] = []
    for raw_line in text.split("\n"):
        line = re.sub(r"[ \t]+", " ", raw_line).strip()
        # Normalize common Unicode bullets into clean ASCII hyphen bullets
        line = re.sub(r"^[•●▪◦‣–—]+\s*", "- ", line)
        cleaned_lines.append(line)

    normalized = "\n".join(cleaned_lines)
    normalized = re.sub(r"\n{3,}", "\n\n", normalized)
    return normalized.strip()


def _detect_resume_heading(line: str) -> str | None:
    stripped = line.strip().rstrip(":").strip()
    if not stripped or len(stripped) > 55 or len(stripped.split()) > 5:
        return None
    upper = stripped.upper()
    for candidate in _RESUME_SECTION_TITLES:
        if upper == candidate or upper.startswith(f"{candidate} ") or upper.endswith(f" {candidate}"):
            return stripped.title()
    # Accept ALL-CAPS short headers typical of ATS resumes
    if stripped.isupper() and any(ch.isalpha() for ch in stripped) and 3 <= len(stripped) <= 32:
        return stripped.title()
    return None


def extract_resume_structure(raw_text: str, max_full_preview: int = 12000) -> dict[str, Any]:
    """
    Extract normalized preview text, detected resume sections, highlights, and URLs
    so the UI can display everything parsed from the uploaded PDF transparently.
    """
    normalized = normalize_resume_text(raw_text)
    if not normalized:
        return {
            "full_text_preview": "",
            "extracted_preview": "",
            "links": [],
            "sections": [],
            "highlights": [],
            "line_count": 0,
            "word_count": 0,
        }

    # Extract submitted profile/project links cleanly
    links: list[dict[str, str]] = []
    seen_urls: set[str] = set()
    url_pattern = re.compile(
        r"(https?://[^\s<>()\"',]+|(?:github\.com|linkedin\.com|gitlab\.com|kaggle\.com)/[A-Za-z0-9_.\-/]+)",
        re.IGNORECASE,
    )
    for match in url_pattern.finditer(normalized):
        raw_url = match.group(0).rstrip(".,;)")
        href = raw_url if raw_url.lower().startswith(("http://", "https://")) else f"https://{raw_url}"
        if href.lower() not in seen_urls:
            seen_urls.add(href.lower())
            lower_href = href.lower()
            if "github.com" in lower_href:
                label = "GitHub"
            elif "linkedin.com" in lower_href:
                label = "LinkedIn"
            elif "gitlab.com" in lower_href:
                label = "GitLab"
            else:
                label = "Portfolio / Link"
            links.append({"label": label, "url": href})
        if len(links) >= 8:
            break

    # Parse structured resume sections
    sections: list[dict[str, Any]] = []
    current_section: dict[str, Any] | None = None

    for line in normalized.split("\n"):
        if not line:
            continue
        heading = _detect_resume_heading(line)
        if heading:
            if current_section and current_section["lines"]:
                sections.append(current_section)
            current_section = {
                "title": heading,
                "lines": [],
            }
            continue

        target_line = line
        if current_section is None:
            current_section = {
                "title": "Header & Summary",
                "lines": [],
            }
        if len(current_section["lines"]) < 14:
            current_section["lines"].append(target_line)

    if current_section and current_section["lines"]:
        sections.append(current_section)

    # Extract concise high-signal resume highlights (education, patents, projects, achievements)
    highlights: list[dict[str, str]] = []
    priority_order = ("Patent", "Project", "Experience", "Internship", "Education", "Achievement", "Certification", "Leadership")
    for priority_kw in priority_order:
        for sec in sections:
            if priority_kw.lower() in sec["title"].lower():
                for ln in sec["lines"][:3]:
                    clean_ln = ln.lstrip("- ").strip()
                    if len(clean_ln) >= 12:
                        highlights.append({"category": sec["title"], "text": clean_ln[:220]})
                        if len(highlights) >= 6:
                            break
            if len(highlights) >= 6:
                break
        if len(highlights) >= 6:
            break

    words = [w for w in normalized.split() if w]
    non_empty_lines = [ln for ln in normalized.split("\n") if ln.strip()]

    short_preview = normalized[:450].strip() + ("..." if len(normalized) > 450 else "")
    full_preview = normalized[:max_full_preview].strip() + ("\n\n[Truncated at 12,000 characters]" if len(normalized) > max_full_preview else "")

    return {
        "full_text_preview": full_preview,
        "extracted_preview": short_preview,
        "links": links,
        "sections": sections[:10],
        "highlights": highlights,
        "line_count": len(non_empty_lines),
        "word_count": len(words),
    }


def _strip_heading_markdown(text: str) -> str:
    cleaned = str(text or "").strip()
    cleaned = re.sub(r"^#{1,6}\s*", "", cleaned)
    cleaned = re.sub(r"^\*+|\*+$", "", cleaned)
    cleaned = re.sub(r"^`+|`+$", "", cleaned)
    cleaned = cleaned.strip().rstrip(":").strip()
    cleaned = re.sub(r"^\*+|\*+$", "", cleaned).strip()
    return cleaned


def _classify_section_kind(title: str) -> str:
    low = title.lower()
    if any(tok in low for tok in ("executive", "overview", "summary", "profile snapshot", "readiness")):
        return "executive"
    if any(tok in low for tok in ("domain", "stack", "coverage", "competenc")):
        return "domains"
    if any(tok in low for tok in ("strength", "highlight", "positive", "verified")):
        return "strengths"
    if any(tok in low for tok in ("weakness", "gap", "limitation", "risk", "missing")):
        return "weaknesses"
    if any(tok in low for tok in ("suggestion", "recommend", "next step", "improvement", "focus", "action")):
        return "suggestions"
    return "general"


def _split_inline_title_and_body(raw: str) -> tuple[str, str]:
    """
    Split patterns like:
      '**Exceptional Proactiveness:** Text...' -> ('Exceptional Proactiveness', 'Text...')
      '**Broad Technological Aptitude**: Text...' -> ('Broad Technological Aptitude', 'Text...')
      'Domain Name: Text...' -> ('Domain Name', 'Text...')
    """
    text = raw.strip()
    # Pattern 1: Leading **Title:** body or **Title**: body
    m = re.match(r"^\*\*(.+?)\*\*\s*:?\s*(.*)$", text)
    if m:
        raw_title = _strip_heading_markdown(m.group(1))
        rest = m.group(2).strip()
        if rest.startswith(":"):
            rest = rest[1:].strip()
        if raw_title:
            return raw_title, rest

    # Pattern 2: Plain `Short Title: Longer description` (limit prefix length to avoid splitting URLs/sentences)
    m2 = re.match(r"^([A-Za-z0-9 &/+().\-`]{3,58}):\s+(.+)$", text)
    if m2 and not m2.group(1).lower().startswith(("http", "note")):
        raw_title = _strip_heading_markdown(m2.group(1))
        return raw_title, m2.group(2).strip()

    return "", text


def structure_evaluation_text(
    raw_text: str | None,
    source_type: str = "resume",
    context: dict[str, Any] | None = None,
) -> dict[str, Any]:
    """
    Deterministically convert freeform or structured Gemini Markdown evaluations
    into clean structured sections/items so the UI never displays raw Markdown syntax.
    """
    text = str(raw_text or "").replace("\r\n", "\n").replace("\r", "\n").strip()
    ctx = context or {}

    if not text:
        return {
            "executive_summary": "",
            "sections": [],
            "stats": {"strengths": 0, "weaknesses": 0, "suggestions": 0},
        }

    lines = text.split("\n")
    filtered_lines: list[str] = []
    for raw_line in lines:
        stripped = raw_line.strip()
        if not stripped:
            filtered_lines.append("")
            continue
        if re.match(r"^[-*_]{3,}$", stripped):
            continue
        if any(pat.match(stripped) for pat in _PREAMBLE_PATTERNS):
            continue
        filtered_lines.append(raw_line)

    sections: list[dict[str, Any]] = []
    current_section: dict[str, Any] | None = None
    active_parent_item: dict[str, Any] | None = None
    loose_executive_lines: list[str] = []

    def ensure_section(title: str, kind: str | None = None) -> dict[str, Any]:
        nonlocal current_section, active_parent_item
        sec_kind = kind or _classify_section_kind(title)
        new_sec = {
            "id": re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-") or "section",
            "title": title,
            "kind": sec_kind,
            "items": [],
        }
        sections.append(new_sec)
        current_section = new_sec
        active_parent_item = None
        return new_sec

    for raw_line in filtered_lines:
        stripped = raw_line.strip()
        if not stripped:
            continue

        leading_spaces = len(raw_line) - len(raw_line.lstrip(" "))

        # 1. Markdown Headings (#, ##, ###)
        h_match = re.match(r"^#{1,6}\s+(.+)$", stripped)
        if h_match:
            title = _strip_heading_markdown(h_match.group(1))
            if title:
                ensure_section(title)
            continue

        # 2. Standalone Bold Headings (**Key Strengths:**) or plain "Key Strengths:"
        bold_hdr = re.match(r"^\*\*([^*]{3,60})\*\*:?\s*$", stripped)
        plain_hdr = re.match(
            r"^(Executive Summary|Overview|Key Strengths|Strengths|Gaps & Weaknesses|Weaknesses|Areas for Improvement|Actionable Suggestions|Suggestions(?: for Improvement)?|Recommendations|Domain Breakdown|Domain Assessment)\s*:?\s*$",
            stripped,
            re.IGNORECASE,
        )
        if bold_hdr:
            title = _strip_heading_markdown(bold_hdr.group(1))
            if title:
                ensure_section(title)
            continue
        if plain_hdr:
            title = _strip_heading_markdown(plain_hdr.group(1))
            if title:
                ensure_section(title)
            continue

        # 3. Numbered Item (1. **Title:** ...) -> always top-level item inside current section
        num_match = re.match(r"^\d+[.)]\s+(.+)$", stripped)
        if num_match:
            if current_section is None:
                ensure_section("Key Findings", "general")
            item_title, item_body = _split_inline_title_and_body(num_match.group(1))
            item = {
                "title": item_title,
                "summary": item_body,
                "subitems": [],
            }
            current_section["items"].append(item)
            active_parent_item = item
            continue

        # 4. Bullet Item (* ..., - ..., + ...)
        bul_match = re.match(r"^[*\-+•]\s+(.+)$", stripped)
        if bul_match:
            if current_section is None:
                ensure_section("Key Highlights", "general")
            sub_label, sub_text = _split_inline_title_and_body(bul_match.group(1))
            has_numbered_parent = (
                active_parent_item is not None
                and current_section["items"]
                and (
                    leading_spaces >= 2
                    or not active_parent_item.get("summary")
                    or (
                        not sub_label
                        and bool(active_parent_item.get("title"))
                    )
                    or (
                        bool(active_parent_item.get("subitems"))
                        or any(re.match(r"^\d+[.)]\s+", ln.strip()) for ln in filtered_lines)
                    )
                )
            )
            # Attach nested bullet under active numbered item if section uses numbered parents
            # or bullet is indented or parent had no body yet.
            if has_numbered_parent and current_section["kind"] != "domains":
                active_parent_item["subitems"].append({
                    "label": sub_label,
                    "text": sub_text,
                })
            else:
                item = {
                    "title": sub_label,
                    "summary": sub_text,
                    "subitems": [],
                }
                current_section["items"].append(item)
                # Track container bullet (e.g., "- **Title:**" with empty summary)
                active_parent_item = item if not sub_text else None
            continue

        # 5. Prose line
        if current_section is None:
            loose_executive_lines.append(stripped)
        elif active_parent_item is not None and not active_parent_item["summary"] and not active_parent_item["subitems"]:
            active_parent_item["summary"] = stripped
        elif current_section["kind"] == "executive" or not current_section["items"]:
            title_part, body_part = _split_inline_title_and_body(stripped)
            current_section["items"].append({
                "title": title_part,
                "summary": body_part,
                "subitems": [],
            })
        else:
            last_item = current_section["items"][-1]
            last_item["summary"] = f"{last_item['summary']} {stripped}".strip()

    # Extract executive summary cleanly
    executive_summary = " ".join(loose_executive_lines).strip()
    remaining_sections: list[dict[str, Any]] = []
    for sec in sections:
        if not sec["items"]:
            continue
        if sec["kind"] == "executive" and not executive_summary:
            exec_parts = []
            for it in sec["items"]:
                if it["title"] and it["summary"]:
                    exec_parts.append(f"{it['title']}: {it['summary']}")
                else:
                    exec_parts.append(it["summary"] or it["title"])
            executive_summary = " ".join(p for p in exec_parts if p).strip()
        else:
            remaining_sections.append(sec)

    # Synthesize crisp executive summary if LLM jumped straight into headings
    if not executive_summary:
        if source_type == "github" and ctx.get("username"):
            repo_cnt = ctx.get("repo_count", 0)
            langs = ", ".join((ctx.get("languages") or [])[:4])
            executive_summary = (
                f"Evaluated @{ctx['username']} across {repo_cnt} repositories"
                + (f" spanning {langs}." if langs else ".")
            )
        elif source_type == "resume":
            skills_cnt = len(ctx.get("matched_skills") or [])
            domains_cnt = int(ctx.get("active_domain_count") or 0)
            if skills_cnt > 0 and domains_cnt > 0:
                executive_summary = (
                    f"Extracted {skills_cnt} technical capabilities across {domains_cnt} core engineering domains from submitted credentials."
                )
        if not executive_summary and remaining_sections:
            first_item = remaining_sections[0]["items"][0]
            executive_summary = first_item.get("summary") or first_item.get("title") or ""

    stats = {
        "strengths": sum(len(s["items"]) for s in remaining_sections if s["kind"] == "strengths"),
        "weaknesses": sum(len(s["items"]) for s in remaining_sections if s["kind"] == "weaknesses"),
        "suggestions": sum(len(s["items"]) for s in remaining_sections if s["kind"] == "suggestions"),
    }

    return {
        "executive_summary": executive_summary,
        "sections": remaining_sections,
        "stats": stats,
    }


def build_domain_assessments(
    resume_text: str = "",
    explicit_skills: list[str] | None = None,
    github_repos: list[dict[str, Any]] | None = None,
    github_languages: list[str] | None = None,
    github_bio: str = "",
    resume_analysis_text: str = "",
    github_analysis_text: str = "",
    assessment_completed: bool = False,
    skill_score: float = 0.0,
    latest_attempt_category: str = "",
) -> list[dict[str, Any]]:
    """
    Compute cross-domain skill mastery and source provenance across all engineering domains
    combining Resume PDF, Profile tags, GitHub repositories, AI review signals, and Skill Assessments.
    """
    repos = github_repos or []
    resume_blob = "\n".join([
        resume_text or "",
        ", ".join(explicit_skills or []),
        resume_analysis_text or "",
    ])

    repo_lines: list[str] = [github_bio or "", ", ".join(github_languages or []), github_analysis_text or ""]
    for repo in repos:
        topics = " ".join(repo.get("topics") or [])
        repo_lines.append(f"{repo.get('name', '')} {repo.get('language', '')} {repo.get('description', '')} {topics}")
    github_blob = "\n".join(repo_lines)

    assessments: list[dict[str, Any]] = []

    for domain in DOMAIN_TAXONOMY:
        domain_id = domain["id"]
        matched_skills: list[str] = []
        matched_seen: set[str] = set()
        resume_hits: list[str] = []
        github_hits: list[str] = []

        for entry in domain["keywords"]:
            label = entry["label"]
            in_resume = _match_keyword_entry(entry, resume_blob)
            in_github = _match_keyword_entry(entry, github_blob)

            if in_resume:
                resume_hits.append(label)
            if in_github:
                github_hits.append(label)

            if (in_resume or in_github) and label.lower() not in matched_seen:
                matched_seen.add(label.lower())
                matched_skills.append(label)

        # Check matching GitHub repo count directly referencing this domain
        matching_repos = []
        for repo in repos:
            r_blob = f"{repo.get('name', '')} {repo.get('language', '')} {repo.get('description', '')} {' '.join(repo.get('topics') or [])}"
            if any(_match_keyword_entry(entry, r_blob) for entry in domain["keywords"]):
                matching_repos.append(repo.get("name", ""))

        # Check if skill assessment category relates directly to this domain
        in_assessment = False
        if assessment_completed and latest_attempt_category:
            cat_blob = latest_attempt_category
            in_assessment = any(_match_keyword_entry(entry, cat_blob) for entry in domain["keywords"])

        sources: list[str] = []
        if resume_hits:
            sources.append("Resume")
        if github_hits or matching_repos:
            sources.append("GitHub")
        if in_assessment:
            sources.append("Assessment")

        # Transparent deterministic score calculation (0 - 100)
        score = 0
        if matched_skills:
            score += min(48, len(matched_skills) * 14)
        if len(sources) >= 2:
            score += 22
        elif len(sources) == 1:
            score += 8
        if matching_repos:
            score += min(18, len(matching_repos) * 6)
        if in_assessment and skill_score > 0:
            score += int(round(min(15, (float(skill_score) / 100.0) * 15)))
        elif assessment_completed and skill_score >= 60 and matched_skills:
            score += 6

        score = max(0, min(100, score))

        if score >= 75:
            level = "Strong Signal"
        elif score >= 50:
            level = "Verified"
        elif score >= 25:
            level = "Developing"
        else:
            level = "Not Evidenced"

        # Build concise single-sentence evidence note
        if not matched_skills and not matching_repos:
            evidence = "No concrete evidence found across submitted Resume PDF or GitHub repositories."
            action_topic = domain["name"]
        else:
            parts: list[str] = []
            if resume_hits:
                parts.append(f"Resume mentions {', '.join(resume_hits[:4])}")
            if matching_repos:
                sample_repos = ", ".join(matching_repos[:3])
                parts.append(f"{len(matching_repos)} GitHub repo(s) ({sample_repos})")
            elif github_hits:
                parts.append(f"GitHub signals {', '.join(github_hits[:4])}")
            if in_assessment:
                parts.append(f"assessed at {round(skill_score)}%")
            evidence = "; ".join(parts) + "."
            action_topic = matched_skills[0] if len(sources) == 1 else domain["name"]

        assessments.append({
            "id": domain_id,
            "name": domain["name"],
            "short_label": domain["short_label"],
            "score": score,
            "level": level,
            "evidenced": bool(matched_skills or matching_repos),
            "skills": matched_skills,
            "sources": sources,
            "repo_count": len(matching_repos),
            "sample_repos": matching_repos[:4],
            "evidence": evidence,
            "recommended_topic": action_topic,
        })

    # Sort evidenced domains by score descending, then unevidenced domains cleanly at the end
    assessments.sort(key=lambda d: (0 if d["evidenced"] else 1, -d["score"], d["name"]))
    return assessments
