<h1 align="center">
  <img 
    src="./assets/logosvg.svg" 
    alt="SkillForge Logo" 
    width="42"
    style="vertical-align: middle; margin-right: 10px;"
  />
  SkillForge
</h1>

<p align="center">
  <strong>Industry-Standard AI Skill Verification & Empirical Talent Matching Platform</strong>
</p>

<p align="center">
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white" alt="React" /></a>
  <a href="https://vitejs.dev"><img src="https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite&logoColor=white" alt="Vite" /></a>
  <a href="https://www.djangoproject.com"><img src="https://img.shields.io/badge/Django-4.2+-092E20?logo=django&logoColor=white" alt="Django" /></a>
  <a href="https://www.python.org"><img src="https://img.shields.io/badge/Python-3.11+-3776ab?logo=python&logoColor=white" alt="Python" /></a>
  <a href="https://zustand-demo.pmnd.rs"><img src="https://img.shields.io/badge/Zustand-5.0.10-black" alt="Zustand" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/TailwindCSS-3.4.17-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License" /></a>
</p>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Monorepo Directory Structure](#-monorepo-directory-structure)
- [Quick Start Guide](#-quick-start-guide)
  - [Backend Setup (`server/`)](#1-backend-setup-server)
  - [Frontend Setup (`client/`)](#2-frontend-setup-client)
  - [Docker Deployment (`docker compose`)](#3-docker-deployment-docker-compose)
- [Environment Configuration](#-environment-configuration)
- [Architecture & Key Subsystems](#-architecture--key-subsystems)
  - [Centralized API Client & Network Drop Resilience](#centralized-api-client--network-drop-resilience)
  - [Global React Error Boundary](#global-react-error-boundary)
  - [Security & File Upload Hardening](#security--file-upload-hardening)
  - [Prompt Injection Defense & Fault-Tolerant AI](#prompt-injection-defense--fault-tolerant-ai)
  - [Database Performance & N+1 Elimination](#database-performance--n1-elimination)
  - [Proctoring & Resource Management](#proctoring--resource-management)
- [Continuous Integration & Testing](#-continuous-integration--testing)
- [Documentation Index](#-documentation-index)
- [License](#-license)

---

## 🌟 Overview

**SkillForge** is an enterprise-grade skill verification and talent discovery platform designed to eliminate resume inflation and credential opacity:
- 🎓 **Candidates / Students**: Complete practical, proctored AI technical assessments, analyze personality archetypes, receive personalized learning modules, and showcase a verified skill dossier with real percentile rankings.
- 🏢 **Employers / Recruiters**: Publish engineering requisitions with required skill benchmarks, review pre-vetted applicant portfolios ranked by TF-IDF profile matching, and hire with confidence backed by tamper-evident proctor audits.

---

## 📁 Monorepo Directory Structure

```
SkillForge/
├── client/                     # Frontend SPA (React 19, Vite 7, Tailwind, Zustand)
│   ├── public/                 # Static assets, CAD blueprint favicon.svg, and icons
│   ├── src/
│   │   ├── api/                # API client facade and Celery task status hook
│   │   ├── components/         # Modular UI architecture:
│   │   │   ├── assessment/     # ProctorWrapper, AssessmentHeader, OptionsMatrix, Telemetry
│   │   │   ├── auth/           # LoginForm, RegisterWizard, AuthLayout
│   │   │   ├── client/         # ActiveJobsTable, ApplicantRankings, DossierModal
│   │   │   ├── common/         # ErrorBoundary.jsx (global runtime exception boundary)
│   │   │   ├── guards/         # ProtectedRoute and RoleGuard RBAC navigation shields
│   │   │   ├── layout/         # Responsive Navbar (multi-tab navigation) & Footer
│   │   │   ├── modals/         # JobPostModal, CandidateDossierModal
│   │   │   ├── sections/       # HeroSection, CapabilitiesGrid, BlueprintSpec, PersonaSplit
│   │   │   ├── student/        # StudentHeader, MatchedPositionsGrid, ProfileBlock
│   │   │   ├── ui/             # Core UI components & mechanical animation primitives
│   │   │   └── upskill/        # MarkdownContentReader, ModuleCompletionActions
│   │   ├── hooks/              # useTaskStatus.js (resilient Celery polling)
│   │   ├── lib/                # api.js (JWT refresh, offline recovery) and cn.js
│   │   ├── pages/              # LandingPage, HowItWorksPage, AuthPage, Dashboards, Assessments
│   │   └── store/              # Zustand stores: authStore (tokens, role) & themeStore
│   ├── .env.example            # Frontend environment variable template
│   ├── Dockerfile              # Multi-stage production container (Node 20 + Nginx)
│   ├── nginx.conf              # Nginx SPA fallback routing configuration
│   ├── eslint.config.js        # ESLint 9 configuration with React 19 rules
│   └── package.json            # Node.js dependencies & scripts
│
├── server/                     # Backend REST API (Django, DRF, Celery, LangChain, Gemini)
│   ├── accounts/               # Custom user model, JWT auth, PDF validators, profiles
│   ├── proctor/                # Event recording, webcam monitors, and risk scoring
│   ├── project/                # Client job requisitions and TF-IDF applicant matching
│   ├── verification/           # AI test generation, grading, PDF extraction, Celery tasks
│   ├── modules/                # Adaptive AI-generated learning modules
│   ├── skillforge/             # Settings, unified exception handler, permissions, Celery app
│   ├── .env.example            # Backend environment variable template
│   ├── Dockerfile              # Multi-stage production container with Gunicorn WSGI
│   ├── manage.py               # Django management CLI
│   └── requirements.txt        # Backend Python dependencies
│
├── project_knowledge/          # Architectural memory & audit documentation
│   ├── 00_SYSTEM_OVERVIEW.md
│   ├── 01_ARCHITECTURE_AND_DATAFLOW.md
│   ├── 02_BACKEND_DEEP_DIVE.md
│   ├── 03_FRONTEND_DEEP_DIVE.md
│   ├── 04_ENVIRONMENT_AND_DEVOPS.md
│   └── 05_REFACTORING_AND_ROADMAP.md
│
├── .github/workflows/          # GitHub Actions CI pipelines
│   └── ci.yml
│
├── docker-compose.yml          # Full-stack orchestration (Redis, Backend, Worker, Frontend)
├── assets/                     # Platform logos, branding, and diagram assets
└── README.md                   # Repository master documentation
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Python**: 3.10+ (Python 3.11 recommended)
- **Node.js**: 20.x or higher
- **npm**: 10.x or higher
- **Redis**: 7.x (or run via Docker)

---

### 1. Backend Setup (`server/`)

```bash
# Navigate to the backend directory
cd server

# Create and activate a Python virtual environment
python -m venv venv
# On Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# On Linux / macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Run migrations and start server
python manage.py migrate
python manage.py runserver 8000
```
Backend API will be live at `http://localhost:8000/api/`.

Start the Celery worker in a separate terminal:
```bash
cd server
celery -A skillforge worker -l info
```

---

### 2. Frontend Setup (`client/`)

```bash
# Open a new terminal and navigate to the frontend directory
cd client

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Launch Vite development server
npm run dev
```
Frontend will be live at `http://localhost:5173`.

---

### 3. Docker Deployment (`docker compose`)

Run the complete multi-service environment (Redis, Django backend, Celery worker, and Nginx frontend) with a single command:

```bash
docker compose up --build
```
- **Frontend SPA**: `http://localhost:5173`
- **Backend REST API**: `http://localhost:8000/api/`
- **Redis Queue**: `localhost:6379`

---

## 🔧 Environment Configuration

Both workspaces strictly consume isolated `.env` files that are ignored by Git:

### Frontend (`client/.env.example`)
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### Backend (`server/.env.example`)
```env
DJANGO_SECRET_KEY=django-insecure-replace-with-a-secure-random-key-in-production
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
REDIS_URL=redis://localhost:6379/0
GEMINI_API_KEY=your_gemini_api_key_here
GITHUB_TOKEN=optional_github_token_here
```

---

## 🛡️ Architecture & Key Subsystems

### Centralized API Client & Network Drop Resilience
All frontend network calls flow through [`client/src/lib/api.js`](client/src/lib/api.js):
- Automatically attaches JWT Bearer credentials from `localStorage`.
- Performs silent access token refresh (`/api/accounts/token/refresh/`) and dispatches token rotation to `useAuthStore`.
- Intercepts connection drops and offline states, returning structured `NetworkErrorResponse` objects with human-readable messaging instead of unhandled promise exceptions.

### Global React Error Boundary
[`client/src/components/common/ErrorBoundary.jsx`](client/src/components/common/ErrorBoundary.jsx) wraps the entire root application. When an unhandled runtime error occurs, it catches the exception and renders a calm, user-friendly recovery interface ("Reload page", "Try again", "Return to Home") alongside collapsible diagnostic stack traces in development mode.

### Security & File Upload Hardening
- Resume uploads undergo strict 4-point validation in [`server/accounts/validators.py`](server/accounts/validators.py): 5MB ceiling, `.pdf` extension check, MIME validation, and `%PDF-` magic byte inspection.
- Upload filenames are replaced with random UUIDs to eliminate path traversal vulnerabilities.
- Production safety is guaranteed by an immediate `ImproperlyConfigured` guard in [`settings.py`](server/skillforge/settings.py) if `DEBUG=False` without a valid `DJANGO_SECRET_KEY`.

### Prompt Injection Defense & Fault-Tolerant AI
- Candidate inputs (resumes, GitHub commit logs) are quarantined in XML tags (`<candidate_resume_data>`, `<candidate_github_data>`) with system prompts instructing the LLM to process candidate text strictly as passive data.
- LLM calls in [`server/verification/utils/langchain_utils.py`](server/verification/utils/langchain_utils.py) enforce explicit 30s timeouts and structured fallback evaluations on external outages.
- GitHub REST calls utilize an `HTTPAdapter` configured with `urllib3.util.Retry` for exponential backoff on HTTP 429/500/502/503/504 errors.

### Database Performance & N+1 Elimination
- Database queries across [`project/views.py`](server/project/views.py) and [`accounts/views.py`](server/accounts/views.py) utilize `select_related` and `Count("applications")` annotations, ensuring zero redundant `COUNT(*)` queries when rendering job feeds or applicant rosters.
- Multi-table operations are wrapped in `with transaction.atomic():` to prevent partial database writes on failure.

### Proctoring & Resource Management
- During assessments, [`ProctorWrapper.jsx`](client/src/components/assessment/ProctorWrapper.jsx) monitors tab switching, fullscreen escapes, copy/cut/paste attempts, and face presence.
- Upon component unmount, all active `MediaStream` webcam tracks are explicitly terminated (`track.stop()`) and canvas memory is released, ensuring the hardware camera light turns off immediately.
- Fullscreen lock is cleanly exited upon test conclusion in [`AssessmentPage.jsx`](client/src/pages/student/AssessmentPage.jsx).

---

## 🧪 Continuous Integration & Testing

### Running Tests
```bash
# Backend Test Suite (26 integration & unit tests)
python server/manage.py test server/

# Django Configuration Check
python server/manage.py check

# Frontend Code Quality (ESLint)
npm run lint --prefix client

# Frontend Production Build
npm run build --prefix client
```

Automated GitHub Actions CI in [`.github/workflows/ci.yml`](.github/workflows/ci.yml) validates all pull requests against linting, compilation, configuration checks, and production asset bundling.

---

## 📚 Documentation Index

- [Backend Documentation (`server/README.md`)](server/README.md)
- [Frontend Documentation (`client/README.md`)](client/README.md)
- [System Overview (`project_knowledge/00_SYSTEM_OVERVIEW.md`)](project_knowledge/00_SYSTEM_OVERVIEW.md)
- [Architecture & Dataflow (`project_knowledge/01_ARCHITECTURE_AND_DATAFLOW.md`)](project_knowledge/01_ARCHITECTURE_AND_DATAFLOW.md)
- [Backend Deep Dive (`project_knowledge/02_BACKEND_DEEP_DIVE.md`)](project_knowledge/02_BACKEND_DEEP_DIVE.md)
- [Frontend Deep Dive (`project_knowledge/03_FRONTEND_DEEP_DIVE.md`)](project_knowledge/03_FRONTEND_DEEP_DIVE.md)
- [Environment & DevOps (`project_knowledge/04_ENVIRONMENT_AND_DEVOPS.md`)](project_knowledge/04_ENVIRONMENT_AND_DEVOPS.md)
- [Refactoring History & Roadmap (`project_knowledge/05_REFACTORING_AND_ROADMAP.md`)](project_knowledge/05_REFACTORING_AND_ROADMAP.md)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
