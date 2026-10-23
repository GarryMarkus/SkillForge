# SkillForge Backend (Django REST Framework)

The `server/` workspace houses the RESTful API, asynchronous task processing pipeline, and verification intelligence layer for the SkillForge platform, built with Django, Django REST Framework (DRF), Celery, Redis, and LangChain (Google Gemini).

---

## Architecture Overview

```
server/
├── accounts/          # User authentication, registration, profiles, PDF resume validators, JWT tokens
│   ├── validators.py  # validate_pdf_resume (5MB threshold, MIME verification, %PDF- magic byte check)
│   ├── models.py      # CustomUser, StudentProfile, ClientProfile, StudentReport, UUID upload paths
│   ├── serializers.py # User registration, onboarding, and profile serializers
│   ├── views.py       # RegisterAPI, LoginAPI, OnboardingAPI, ProfileAPI, ProfileUpdateAPI, LogoutAPI
│   └── tests.py       # Test suite covering auth and PDF validation (valid, fake, oversized, corrupt)
├── proctor/           # Proctoring event tracking, session telemetry logs, and risk scoring engine
│   ├── models.py      # Exam, Question, ExamSession, ProctorEvent
│   ├── risk.py        # Weighted penalty risk accumulator and flagging logic
│   ├── views.py       # ExamListView, StartExamView, ExamQuestionView, ProctorEventView, EndExamView
│   └── tests.py       # Proctoring lifecycle and violation escalation tests
├── project/           # Client job postings, student applications, and TF-IDF matching
│   ├── models.py      # JobPost, JobApplication
│   ├── serializers.py # JobPostSerializer (with applicant_count optimization), JobApplicationSerializer
│   ├── views.py       # AllJobsAPI, ClientJobsAPI, ApplyJobAPI, MyApplicationsAPI, JobApplicantsAPI
│   └── tests.py       # Job requisition and annotation integration tests
├── verification/      # Skill tests, Gemini AI evaluation, GitHub analyzer, PDF parser, Celery tasks
│   ├── tasks.py       # generate_partial_report_task, generate_skill_test_task (with error recording)
│   ├── services.py    # Atomic transactions for report generation and test submissions
│   ├── utils/         # LangChain Gemini wrappers, GitHub REST retry adapter, PyPDF2 parser
│   ├── views.py       # GenerateSkillTestAPI, SubmitSkillTestAPI, RecommendationAPI, TaskStatusAPI
│   └── tests.py       # Verification test suite and Celery result queries
├── modules/           # Personalized upskilling module generation (Gemini LLM)
│   ├── models.py      # UpskillModule, ModuleProgress
│   ├── services.py    # Dynamic markdown module generation calibrated to user learning pace
│   └── views.py       # GenerateUpskillModuleAPI, ListUpskillModulesAPI, GetUpskillModuleAPI, ModuleProgressAPI
├── skillforge/        # Django settings, URL routing, permissions, exception handler, Celery app
│   ├── settings.py    # Production SECRET_KEY guard, SIMPLE_JWT rotation, CORS, Celery broker
│   ├── celery.py      # Celery application initialization and task autodiscovery
│   ├── permissions.py # Role-based access control (IsStudentUser, IsClientUser)
│   └── urls.py        # Central API routing table
├── manage.py          # Django CLI management script
├── requirements.txt   # Python package dependencies
└── Dockerfile         # Multi-stage production container with Gunicorn WSGI and non-root user
```

---

## Security & Resilience Standards

1. **File Upload Hardening**:
   - Resumes uploaded via [`accounts/validators.py`](accounts/validators.py) undergo strict 4-point validation: 5MB maximum file size, `.pdf` extension check, MIME-type validation (`application/pdf`), and magic byte inspection (`b"%PDF-"`).
   - File storage paths are sanitized with random UUIDs ([`resume_upload_path`](accounts/models.py)) to prevent directory traversal attacks.
   - Text extraction in [`verification/utils/pdf_utils.py`](verification/utils/pdf_utils.py) catches `PdfReadError` gracefully and enforces a 100,000-character ceiling.

2. **Production Secrets Enforcement**:
   - In [`skillforge/settings.py`](skillforge/settings.py), running with `DEBUG=False` raises an immediate `ImproperlyConfigured` exception if `DJANGO_SECRET_KEY` is missing or uses the default insecure development string.

3. **Prompt Injection Defense & Fault-Tolerant AI**:
   - Candidate resumes, GitHub commits, and topics are quarantined inside explicit XML delimiters (`<candidate_resume_data>`, `<candidate_github_data>`) with system instructions to treat candidate input strictly as passive data.
   - All Gemini LLM calls enforce explicit 30-second timeouts (`request_timeout=30`) and provide structured fallback generations on outages.

4. **Third-Party API Retries**:
   - GitHub REST client requests in [`verification/utils/git_utils.py`](verification/utils/git_utils.py) mount an `HTTPAdapter` configured with `Retry(total=3, backoff_factor=0.5)` for automatic exponential backoff on transient HTTP 429/500/502/503/504 responses.

5. **Database Transaction Atomicity & Task Failure State**:
   - Multi-table operations in [`verification/services.py`](verification/services.py) are wrapped in `with transaction.atomic():` blocks to eliminate partial state corruption.
   - Celery worker tasks record explicit `FAILURE` status and exception traces in [`StudentReport`](accounts/models.py) if unhandled errors occur.

6. **N+1 Query Optimization**:
   - Database queries in [`project/views.py`](project/views.py) and [`accounts/views.py`](accounts/views.py) leverage `select_related("client")`, `select_related("user")`, `select_related("job__client")`, and `.annotate(applicant_count=Count("applications"))` to eliminate redundant SQL hits.

---

## Prerequisites

- **Python**: 3.10+ (tested on Python 3.11)
- **Redis**: 7.x (for Celery asynchronous task queue)
- **Database**: SQLite (default for development) or PostgreSQL

---

## Local Setup & Execution

### 1. Create and Activate Virtual Environment
```bash
# Windows (PowerShell)
cd server
python -m venv venv
.\venv\Scripts\Activate.ps1

# Linux / macOS
cd server
python3 -m venv venv
source venv/bin/activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Key configuration parameters:
```env
DJANGO_SECRET_KEY=django-insecure-replace-with-a-secure-random-key-in-production
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
REDIS_URL=redis://localhost:6379/0
GEMINI_API_KEY=your_gemini_api_key_here
GITHUB_TOKEN=optional_github_token_here
```

### 4. Run Migrations & Start Server
```bash
python manage.py migrate
python manage.py runserver 8000
```
API endpoints are served at `http://localhost:8000/api/`.

### 5. Start Celery Worker (in a separate terminal)
```bash
celery -A skillforge worker -l info
```

---

## Core API Endpoints

| Category | Endpoint | Method | Permission | Description |
|---|---|---|---|---|
| **Auth** | `/api/accounts/register/` | POST | AllowAny | Register student or client user |
| **Auth** | `/api/accounts/login/` | POST | AllowAny | Authenticate and obtain JWT token pair |
| **Auth** | `/api/accounts/token/refresh/` | POST | AllowAny | Refresh expired JWT access token |
| **Auth** | `/api/accounts/profile/` | GET | IsAuthenticated | Retrieve authenticated user profile |
| **Auth** | `/api/accounts/onboarding/` | PUT | IsAuthenticated | Submit initial profile and resume upload |
| **Proctor** | `/api/proctor/exams/` | GET | IsAuthenticated | List available exams |
| **Proctor** | `/api/proctor/start/` | POST | IsAuthenticated | Initialize active proctoring session |
| **Proctor** | `/api/proctor/event/` | POST | IsAuthenticated | Log sensor violation & update risk rating |
| **Proctor** | `/api/proctor/end/` | POST | IsAuthenticated | Conclude session and finalize risk score |
| **Project** | `/api/project/jobs/` | GET | IsAuthenticated | List open jobs with TF-IDF match scores |
| **Project** | `/api/project/create/` | POST | IsClientUser | Publish new job opportunity |
| **Project** | `/api/project/apply/` | POST | IsStudentUser | Submit application to open job |
| **Project** | `/api/project/my-jobs/` | GET | IsClientUser | List recruiter's published requisitions |
| **Project** | `/api/project/my-applications/` | GET | IsStudentUser | List student's submitted applications |
| **Verify** | `/api/verification/generate-test/` | POST | IsStudentUser | Generate personalized AI assessment |
| **Verify** | `/api/verification/submit-test/` | POST | IsStudentUser | Submit answers and trigger AI grading |
| **Verify** | `/api/verification/tasks/<id>/status/` | GET | IsAuthenticated | Poll asynchronous Celery task status |
| **Modules** | `/api/modules/upskill/generate/` | POST | IsStudentUser | Generate adaptive learning module |
| **Modules** | `/api/modules/upskill/progress/` | POST / GET | IsStudentUser | Record and inspect module completion |

---

## Verification & Test Commands

```bash
# Validate Django configuration integrity
python manage.py check

# Run complete backend test suite (26 integration & unit tests)
python manage.py test server/
```
