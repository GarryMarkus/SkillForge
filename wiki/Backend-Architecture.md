# ⚙️ Backend Architecture & Django Monolith

The SkillForge backend is implemented in **Python 3.11+** using **Django 5.2+** and **Django REST Framework (DRF)**. It orchestrates user authentication, asynchronous assessment generation, proctoring telemetry ingestion, and vector-space job matching.

---

## 1. Modular Application Architecture

The backend monolith is partitioned into focused, decoupled Django applications:

```
server/
├── accounts/          # Identity, JWT auth, RBAC profiles, PDF resume parsing
├── verification/      # LLM question synthesis, test sessions, grading, dossiers
├── proctor/           # Anti-cheat telemetry, event ingestion, risk scoring
├── project/           # Job requisitions, applications, TF-IDF candidate matching
├── modules/           # Dynamic AI upskilling course generation
└── skillforge/        # Core configuration, Celery worker, unified exceptions
```

### 🔐 1. `accounts` App
- **Custom User Model (`User`):** Extends `AbstractUser`, adding role discrimination (`student`, `client`, `admin`) and unique email constraints.
- **Role Profiles:**
  - `StudentProfile`: Tracks bio, skills array, experience level, GitHub handle, resume file path, Skill CIBIL score, and percentile rank.
  - `ClientProfile`: Tracks company name, website, verified status, and industry taxonomy.
- **Authentication & Security:** Uses `rest_framework_simplejwt` for cryptographically signed access and refresh tokens. Implements token blacklisting upon logout.
- **Resume Parsing Service:** Validates PDF magic headers (`%PDF`), extracts text using `PyPDF2`, and parses candidate skills.

### 📝 2. `verification` App
- **LLM Assessment Generation:** Interfaces with Google Gemini 2.5 Flash via LangChain (`ChatGoogleGenerativeAI`). Prompts generate structured JSON evaluation suites featuring multiple-choice questions, code comprehension items, and debugging puzzles.
- **Assessment Sessions (`TestSession`):** Tracks assessment state (`NOT_STARTED`, `IN_PROGRESS`, `SUBMITTED`, `EVALUATED`), score breakdown, and time elapsed.
- **Celery Task Dispatch:** Long-running LLM generation and grading tasks are offloaded to background Celery workers, returning task IDs for non-blocking frontend polling.

### 🛡️ 3. `proctor` App
- **Proctor Session (`ProctorSession`):** Created concurrently with an assessment to record behavioral telemetry.
- **Event Intake (`/api/proctor/events/`):** Ingests real-time client events:
  - `TAB_BLUR` / `TAB_FOCUS`
  - `FULLSCREEN_EXIT`
  - `FACE_NOT_DETECTED` / `MULTIPLE_FACES`
  - `CAMERA_DISABLED`
- **Risk Calculation Engine:** Evaluates violation frequency, cumulative unverified durations, and outputs a weighted Risk Level (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`).

### 💼 4. `project` App
- **Job Requisitions (`Job`):** Created by recruiters with role title, description, required skills, experience level, and salary range.
- **Candidate Applications (`Application`):** Tracks applicant state (`APPLIED`, `REVIEWING`, `SHORTLISTED`, `REJECTED`).
- **TF-IDF Matching Engine:** Implements `TfidfVectorizer` and `cosine_similarity` from `scikit-learn` to rank candidate dossiers against job requirements.

### 📚 5. `modules` App
- **Upskilling Curricula:** Detects candidate assessment weaknesses and personality archetypes to generate personalized markdown learning modules on demand using Gemini.

---

## 2. Asynchronous Task Architecture (Celery + Redis)

To keep HTTP request cycles sub-100ms, all compute-heavy workloads are executed asynchronously:

```
[React Client] ──── HTTP POST ────> [Django API View]
                                            │
                                            ├─ (1) Creates pending record
                                            ├─ (2) Dispatches Celery task
                                            │
                                            ▼
[React Client] <── 202 Accepted ───── Returns { task_id }
       │
       │ (Polling via useTaskStatus hook)
       ▼
[Redis Broker (Port 6379)] ── Pulls Task ──> [Celery Worker]
                                                    │
                                                    ├─ Calls Gemini API
                                                    ├─ Parses PDF / Git
                                                    └─ Updates DB record
```

### Configured Tasks:
- `generate_assessment_task`: Generates tailored questions via Gemini.
- `evaluate_assessment_task`: Grades code submissions and computes percentile distributions.
- `generate_learning_module_task`: Compiles markdown learning guides for candidate skill deficits.
- `scrape_github_metrics_task`: Fetches repository stats, stars, and language distribution.

---

## 3. Unified Error Handling & Documentation

- **Custom Exception Handler (`skillforge/exceptions.py`):** Translates all DRF validation errors, database integrity violations, and unhandled exceptions into uniform JSON envelopes:
  ```json
  {
    "status": "error",
    "code": "VALIDATION_FAILED",
    "message": "Invalid file upload format. Only PDF files are supported.",
    "errors": { "resume": ["Magic byte verification failed."] }
  }
  ```
- **Automated OpenAPI / Swagger:** Integrated with `drf-spectacular` providing interactive documentation at `http://localhost:8000/api/docs/` and raw OpenAPI schema at `http://localhost:8000/api/schema/`.
