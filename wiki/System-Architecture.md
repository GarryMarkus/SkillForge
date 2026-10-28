# 🏗️ System Architecture & Dataflow

SkillForge is architected as a **Decoupled Single Page Application (SPA) + REST API Monolith** backed by an asynchronous Celery task queue and vector-based machine learning pipelines.

---

## 1. High-Level Architectural Topology

```
┌────────────────────────────────────────────────────────┐
│                   CLIENT TIER (BROWSER)                │
│                                                        │
│  React 19 SPA (Vite 7)                                 │
│  ├── Navigation: React Router DOM v7 (RoleGuard / PB) │
│  ├── State Stores: Zustand (AuthStore, ThemeStore)     │
│  ├── Telemetry & Hardware: React Webcam, Canvas Monitor│
│  └── Resilience: Centralized API Client, Error Boundary│
└───────────────────────────┬────────────────────────────┘
                            │
               HTTP / JSON  │ Bearer JWT Authentication
                            │
┌───────────────────────────▼────────────────────────────┐
│                  BACKEND TIER (DJANGO)                 │
│                                                        │
│  Django 5.2+ REST Framework Monolith                   │
│  ├── URL Router & Exception Handler                    │
│  ├── Apps: accounts, proctor, project, verification    │
│  ├── LangChain Orchestration Client (Gemini 2.5 Flash) │
│  └── scikit-learn TF-IDF Vector Matching Engine        │
└───────────────────────────┬────────────────────────────┘
                            │
              ┌─────────────┴─────────────┐
              ▼                           ▼
    ┌───────────────────┐       ┌───────────────────┐
    │  SQLite / RDBMS   │       │   Redis 7 Alpine  │
    │  Persistent State │       │   Broker & Cache  │
    └───────────────────┘       └─────────┬─────────┘
                                          │
                                ┌─────────▼─────────┐
                                │   Celery Worker   │
                                │ Async Tasks: AI,  │
                                │ Resumes, Audits   │
                                └───────────────────┘
```

---

## 2. Core End-to-End Dataflows

### 📥 A. Candidate Intake & Parsing Pipeline
1. Candidate uploads resume PDF via `/api/accounts/upload-resume/` and enters GitHub username.
2. Django triggers `PyPDF2` stream extraction to pull raw text while enforcing MIME type and size checks.
3. Outbound GitHub API calls inspect candidate repositories, commit distributions, languages, and stars.
4. Celery worker synthesizes extracted text with LangChain Gemini (`ChatGoogleGenerativeAI`) to normalize skills into structured taxonomy records.

### 📝 B. Adaptive Assessment & Proctoring Pipeline
1. Candidate initiates an assessment based on role archetype (e.g., Full Stack Engineer, Backend Specialist).
2. LangChain chain requests structured MCQ and code evaluation items from Gemini 2.5 Flash.
3. Candidate accepts camera and fullscreen permissions. `ProctorWrapper` mounts:
   - Captures frames at regular intervals via `React Webcam`.
   - Runs in-browser canvas heuristics checking pixel variance and skin-tone presence.
   - Listens to document `visibilitychange` and window `blur` events for unauthorized tab switching.
4. Telemetry events stream to `/api/proctor/events/` updating real-time session risk scores.

### 📊 C. Empirical Dossier & Percentile Scoring
1. Assessment submissions are evaluated against server-side answer keys and rubric criteria.
2. Verified scores, proctor violation metrics, and GitHub stats are compiled into a tamper-evident candidate dossier.
3. Platform calculates the candidate's **Skill CIBIL** score and percentile standing relative to all platform participants.

### 💼 D. Algorithmic Recruiter Matching Pipeline
1. Recruiters publish engineering requisitions defining title, required skills, and qualification thresholds.
2. When candidates apply (or when recruiters browse matches), candidate skill dossiers and job specs are tokenized.
3. `scikit-learn`'s `TfidfVectorizer` computes TF-IDF term matrices.
4. Cosine similarity determines match relevance scores (0% to 100%), ordering applicants by empirical fit.

---

## 3. Monorepo Directory Anatomy

SkillForge is organized as a clean monorepo:

```
SkillForge/
├── client/                     # Frontend SPA (React 19, Vite 7, Tailwind, Zustand)
│   ├── src/
│   │   ├── api/                # API client facade & Celery polling hooks
│   │   ├── components/         # Modular component hierarchy
│   │   │   ├── assessment/     # Proctoring wrappers & camera canvas telemetry
│   │   │   ├── auth/           # Login, registration wizard, step guards
│   │   │   ├── client/         # Recruiter tables, rankings, candidate dossier modals
│   │   │   ├── guards/         # ProtectedRoute and RoleGuard RBAC shields
│   │   │   ├── layout/         # Responsive Navbar, Lenis smooth scroll, Footer
│   │   │   └── ui/             # Atomic design system & animation primitives
│   │   ├── store/              # Zustand stores (useAuthStore, useThemeStore)
│   │   └── pages/              # Landing, dashboards, assessments, upskilling
│   ├── Dockerfile              # Multi-stage production container (Node 20 + Nginx)
│   └── nginx.conf              # SPA routing fallback configuration
│
├── server/                     # Backend REST API (Django, DRF, Celery, LangChain)
│   ├── accounts/               # Custom User, JWT tokens, PDF validation, Profiles
│   ├── proctor/                # Proctor session, violation logs, telemetry views
│   ├── project/                # Job requisitions, applications, TF-IDF matcher
│   ├── verification/           # AI assessment generation, grading, Celery tasks
│   ├── modules/                # Adaptive AI upskilling courses & curricula
│   ├── skillforge/             # Root settings, exception handlers, Celery app
│   └── Dockerfile              # Multi-stage Gunicorn WSGI container
│
├── docker-compose.yml          # Multi-container orchestration (Redis, Backend, Worker, Frontend)
├── run_dev.py                  # Concurrent cross-platform development launcher
└── project_knowledge/          # Architectural audits and deep dives
```

---

## 4. Cross-Cutting Design Safeguards

- **Network Drop Resilience:** Frontend `api.js` encapsulates automatic JWT refresh on 401s and queue re-submission for transient network failures.
- **Fail-Safe React Error Boundary:** Top-level `ErrorBoundary.jsx` catches unexpected render lifecycle errors, preventing full white-screen crashes and presenting recovery actions.
- **Upload Hardening:** Backend enforces PDF file signatures (magic bytes `\x25\x50\x44\x46`), max 5MB size caps, and filename sanitization.
- **Prompt Injection Defense:** LangChain templates isolate untrusted user inputs with explicit delimiters and strict JSON output schemas.
- **ORM Optimization:** Core API views use `.select_related()` and `.prefetch_related()` to eliminate N+1 database queries.
