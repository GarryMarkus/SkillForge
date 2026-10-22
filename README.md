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
  <strong>Industry-Standard AI Skill Verification & Talent Matching Monorepo</strong>
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
- [Environment Configuration](#-environment-configuration)
- [Architecture & Key Subsystems](#-architecture--key-subsystems)
  - [Centralized API Client](#centralized-api-client)
  - [Route Protection & RBAC](#route-protection--rbac)
  - [Proctoring & Risk Engine](#proctoring--risk-engine)
  - [Lazy AI Model Loading](#lazy-ai-model-loading)
- [Continuous Integration](#-continuous-integration)
- [Documentation Index](#-documentation-index)
- [License](#-license)

---

## 🌟 Overview

**SkillForge** is an enterprise-grade skill verification and talent discovery platform that bridges the gap between learning and verified hiring:
- 🎓 **Students / Learners**: Undergo proctored AI skill assessments, analyze personality archetypes, receive tailored AI upskilling modules, and generate a dynamic **Skill CIBIL Score**.
- 🏢 **Clients / Recruiters**: Publish project requirements, set minimum verified skill thresholds, and evaluate matched applicants using schematic similarity scoring.

---

## 📁 Monorepo Directory Structure

The repository is organized into a clean monorepo architecture:

```
SkillForge/
├── client/                     # Frontend SPA (React 19, Vite 7, Tailwind, Zustand)
│   ├── src/
│   │   ├── components/         # UI primitives, layout, guards, modals, proctoring
│   │   ├── lib/                # Centralized api.js client and cn.js utility
│   │   ├── pages/              # Role-separated dashboards and test views
│   │   └── store/              # Zustand global authentication and theme stores
│   ├── .env.example            # Frontend environment variable template
│   ├── eslint.config.js        # ESLint 9 configuration with React 19 rules
│   └── package.json            # Frontend package manifest
│
├── server/                     # Backend REST API (Django, DRF, LangChain, Gemini)
│   ├── accounts/               # Custom user model, JWT auth, and profile endpoints
│   ├── proctor/                # Event recording, webcam monitors, and risk scoring
│   ├── project/                # Client job postings and applicant matching
│   ├── verification/           # AI test generation, grading, PDF and GitHub parsing
│   ├── modules/                # Adaptive AI-generated learning modules
│   ├── skillforge/             # Settings, unified exception handler, permissions
│   ├── .env.example            # Backend environment variable template
│   ├── manage.py               # Django management CLI
│   └── requirements.txt        # Backend Python dependencies
│
├── project_knowledge/          # Persistent architectural memory & audit documentation
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
├── assets/                     # Platform logos and diagram assets
└── README.md                   # Repository master documentation
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Python**: 3.10+ (Python 3.11 recommended)
- **Node.js**: 20.x or higher
- **npm**: 10.x or higher
- **Git**

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
Backend will be live at `http://localhost:8000/api/`.

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

## 🔧 Environment Configuration

Both environments strictly use isolated `.env` files that are untracked by Git:

### Frontend (`client/.env.example`)
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### Backend (`server/.env.example`)
```env
SECRET_KEY=your-django-secret-key-change-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
GEMINI_API_KEY=your-gemini-api-key-here
GITHUB_TOKEN=optional-github-token-to-avoid-rate-limits
```

---

## 🛡️ Architecture & Key Subsystems

### Centralized API Client
All frontend requests flow through [`client/src/lib/api.js`](client/src/lib/api.js):
- Injects JWT `Authorization: Bearer <token>` from persistent local storage.
- Dynamically resolves `VITE_API_BASE_URL`.
- Automatically configures multipart boundaries for `FormData` resume uploads.

### Route Protection & RBAC
Frontend routes in [`client/src/App.jsx`](client/src/App.jsx) are defended by two concentric guard layers:
1. `<ProtectedRoute>`: Blocks unauthenticated visitors and redirects to `/auth` with return state.
2. `<RoleGuard requiredRole="student"|"client">`: Blocks cross-role access (e.g., student accessing client dashboard).

Backend endpoints in `server/` enforce role permissions via custom DRF permission classes in [`server/skillforge/permissions.py`](server/skillforge/permissions.py):
- `IsStudent`: Allows access only to users with `role='student'`.
- `IsClient`: Allows access only to users with `role='client'`.

### Proctoring & Risk Engine
During student assessments, [`ProctorWrapper.jsx`](client/src/components/assessment/ProctorWrapper.jsx) continuously checks:
- Tab switching and browser blur events.
- Fullscreen enforcement.
- Clipboard copy/paste prevention.
- Real-time webcam brightness/skin-tone presence detection.

Events are logged via `/api/proctor/events/` and processed by [`server/proctor/risk.py`](server/proctor/risk.py) with weighted penalty formulas to determine candidate disqualification.

### Lazy AI Model Loading
Google Gemini AI models in `server/modules/langchain_utils.py` and `server/verification/utils/langchain_utils.py` use lazy singleton getters (`get_model()`). This guarantees that missing or unconfigured API keys will never crash the server at startup or during migrations.

---

## 🧪 Continuous Integration

The monorepo includes automated GitHub Actions CI in [`.github/workflows/ci.yml`](.github/workflows/ci.yml) validating every pull request:
- **Backend Validation**: Python syntax compilation across all files, dependency checks, and `python manage.py check`.
- **Frontend Validation**: ESLint 9 checks across all JSX/JS files and a clean production `vite build`.

---

## 📚 Documentation Index

- [Backend Guide (`server/README.md`)](server/README.md)
- [Frontend Guide (`client/README.md`)](client/README.md)
- [System Overview (`project_knowledge/00_SYSTEM_OVERVIEW.md`)](project_knowledge/00_SYSTEM_OVERVIEW.md)
- [Architecture & Dataflow (`project_knowledge/01_ARCHITECTURE_AND_DATAFLOW.md`)](project_knowledge/01_ARCHITECTURE_AND_DATAFLOW.md)
- [Backend Deep Dive (`project_knowledge/02_BACKEND_DEEP_DIVE.md`)](project_knowledge/02_BACKEND_DEEP_DIVE.md)
- [Frontend Deep Dive (`project_knowledge/03_FRONTEND_DEEP_DIVE.md`)](project_knowledge/03_FRONTEND_DEEP_DIVE.md)
- [Environment & DevOps (`project_knowledge/04_ENVIRONMENT_AND_DEVOPS.md`)](project_knowledge/04_ENVIRONMENT_AND_DEVOPS.md)
- [Refactoring History & Roadmap (`project_knowledge/05_REFACTORING_AND_ROADMAP.md`)](project_knowledge/05_REFACTORING_AND_ROADMAP.md)

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
