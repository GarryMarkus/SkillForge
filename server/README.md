# SkillForge Backend (Django REST Framework)

The `server/` workspace houses the RESTful API and proctoring/verification intelligence layer for the SkillForge platform, built with Django and Django REST Framework (DRF).

---

## Architecture Overview

```
server/
├── accounts/          # User authentication, registration, profiles, and JWT tokens
├── proctor/           # Proctoring event tracking, session logs, and risk scoring engine
├── project/           # Client job postings, student applications, and TF-IDF matching
├── verification/      # Skill tests, Gemini AI evaluation, GitHub analyzer, PDF parser
├── modules/           # Personalized upskilling module generation (Gemini LLM)
├── skillforge/        # Core Django settings, URL routing, permissions, exception handler
├── manage.py          # Django CLI management script
└── requirements.txt   # Python package dependencies
```

---

## Prerequisites

- **Python**: 3.10+ (tested on Python 3.10, 3.11, 3.12, 3.14)
- **Virtualenv**: `venv` or `virtualenv`
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
Edit `.env` to configure:
- `SECRET_KEY`: Django secret key
- `DEBUG`: Set to `True` for development, `False` for production
- `ALLOWED_HOSTS`: Comma-separated list of hosts (e.g. `localhost,127.0.0.1`)
- `GEMINI_API_KEY`: Google Gemini API key for AI-driven skill tests and upskilling modules
- `GITHUB_TOKEN`: (Optional) GitHub Personal Access Token to avoid API rate limits during repo analysis

> **Resilience Note**: LangChain / Gemini models are lazily loaded on first API request. Missing `GEMINI_API_KEY` will not crash Django during startup or test runs; it will return an informative error when an AI feature is invoked.

### 4. Run Migrations & Start Server
```bash
python manage.py migrate
python manage.py runserver 8000
```
The API is available at `http://localhost:8000/api/`.

---

## Core API Endpoints

| Endpoint | Method | Permission | Description |
|---|---|---|---|
| `/api/accounts/register/` | POST | AllowAny | Register new student or client |
| `/api/accounts/login/` | POST | AllowAny | JWT login returning access & refresh tokens |
| `/api/accounts/profile/` | GET | IsAuthenticated | Retrieve current user profile |
| `/api/accounts/onboarding/` | PUT | IsAuthenticated | Complete initial onboarding |
| `/api/accounts/profile/update/` | PATCH | IsAuthenticated | Update profile information |
| `/api/proctor/events/` | POST | IsAuthenticated | Log proctoring security events |
| `/api/proctor/session/<id>/risk/` | GET | IsAuthenticated | Calculate risk score for exam session |
| `/api/project/jobs/` | GET | IsAuthenticated | List available job postings |
| `/api/project/create/` | POST | IsClient | Create a new job posting |
| `/api/project/apply/` | POST | IsStudent | Submit a job application |
| `/api/verification/generate-test/` | POST | IsStudent | Generate AI assessment questions |
| `/api/verification/submit-test/` | POST | IsStudent | Submit answers and trigger AI grading |
| `/api/modules/upskill/generate/` | POST | IsStudent | Generate customized markdown learning module |

---

## Quality & Verification

Run the Django system check and syntax validation:
```bash
python manage.py check
python -m py_compile **/*.py
```
