# Project Context: SkillForge (AI Skill Verification & Talent Matching Platform)

SkillForge is a full-stack, enterprise-grade talent verification and job-matching platform designed to eliminate resume inflation and credential opacity through multi-modal parsing, AI-generated diagnostic assessments, real-time browser proctoring, and empirical vector matching.

---

## 1. Executive Summary & Value Proposition

- **For Candidates / Students:**
  - Ingest PDF resumes and extract verified skills using PyPDF2.
  - Link public GitHub profiles for repository and commit activity scraping.
  - Take dynamic, anti-cheat AI assessments generated on-demand by Google Gemini (calibrated to experience).
  - Complete a 7-question psychometric archetype diagnostic test.
  - Receive adaptive, AI-generated upskilling curricula targeting identified knowledge gaps.
  - Build an unalterable, percentile-ranked skill credential ("Skill CIBIL dossier").

- **For Employers / Recruiters:**
  - Publish technical job requisitions with required skill benchmarks.
  - Review pre-vetted applicant pools automatically ranked using TF-IDF and cosine similarity.
  - Inspect tamper-evident proctoring audit trails (risk scores, tab switches, face presence checks) before interviewing.

---

## 2. Technology Stack

| Layer | Technologies & Libraries |
| :--- | :--- |
| **Frontend SPA** | React 19 (`^19.2.0`), Vite 7 (`^7.2.4`), React Router DOM 7 (`^7.13.0`) |
| **Styling & Motion** | Tailwind CSS 3.4 (with customized CAD blueprint & dark/light theme tokens), Framer Motion (`^12.29.2`), Lenis (`^1.3.17`) momentum scroll |
| **Client State & API Client** | Zustand 5 (`useAuthStore`, `useThemeStore`), centralized API client (`client/src/lib/api.js`) with JWT Bearer injection, auto token refresh, and network drop recovery |
| **Hardware Proctoring** | React Webcam (`^7.2.0`), HTML5 Canvas face/skin-tone presence detection, Fullscreen API enforcement, tab switch & copy-paste prevention |
| **Backend Framework** | Django 5.2 / Django REST Framework (DRF) 3.16, Python 3.11+ |
| **Authentication** | DRF SimpleJWT 5.5 (Access/Refresh tokens, RBAC roles: `student` vs `client`) |
| **Asynchronous Worker Queue** | Celery 5.5 + Redis 7 (`server/skillforge/celery.py`, `server/verification/tasks.py`) |
| **Generative AI & LLM** | Google Gemini (`gemini-2.5-flash`) via LangChain Core/Community (`langchain-google-genai`) |
| **NLP & Matching Algorithm** | Scikit-learn (`TfidfVectorizer`, `cosine_similarity`), NumPy, SciPy |
| **Document & Scraping Engine** | PyPDF2 (PDF resume parser), Requests (GitHub REST API v3 repo & commit scraping) |
| **API Docs & Serialization** | drf-spectacular (OpenAPI 3 / Swagger at `/api/docs/`) |
| **Database & Persistence** | Relational SQLite (Dev) / PostgreSQL (Prod), Media storage with magic-byte PDF validation |
| **DevOps & Orchestration** | Docker Compose (Redis, Django API, Celery worker, Vite/Nginx SPA), `run_dev.py` concurrent runner, GitHub Actions CI |

---

## 3. Monorepo Directory Structure

```
SkillForge/
├── client/                                # React 19 + Vite 7 Frontend
│   ├── src/
│   │   ├── api/client.js                  # Centralized client facade
│   │   ├── components/
│   │   │   ├── assessment/                # ProctorWrapper, AssessmentHeader, OptionsMatrix, Telemetry
│   │   │   ├── auth/                      # LoginForm, RegisterWizard (4-step), AuthLayout
│   │   │   ├── client/                    # ActiveJobsTable, ApplicantRankingsGrid, DossierModal
│   │   │   ├── common/                    # ErrorBoundary.jsx (global runtime crash boundary)
│   │   │   ├── guards/                    # ProtectedRoute.jsx and RoleGuard.jsx RBAC shields
│   │   │   ├── layout/                    # Navbar.jsx, Footer.jsx, ThemeToggle.jsx
│   │   │   ├── modals/                    # JobPostModal.jsx, CandidateDossierModal.jsx
│   │   │   ├── onboarding/                # ResumeUploadZone, CompanySpecForm, TelemetryPreview
│   │   │   ├── personality/               # 7-question psychometric archetype diagnostic
│   │   │   ├── sections/                  # HeroSection, BlueprintSpec, PersonaSplit, Capabilities
│   │   │   ├── student/                   # StudentHeader, MatchedPositionsGrid, ProfileBlock
│   │   │   ├── ui/animations/             # BorderBeam, CadGridBackground, CounterTicker, DecryptedText
│   │   │   └── upskill/                   # MarkdownContentReader, ModuleProgressBanner
│   │   ├── hooks/useTaskStatus.js         # Resilient Celery task polling hook
│   │   ├── lib/api.js                     # Unified JWT auth fetch client with offline resilience
│   │   ├── pages/                         # LandingPage, HowItWorksPage, AuthPage, Dashboards, Assessment
│   │   └── store/                         # authStore.js (tokens, user, role) & themeStore.js
│   ├── package.json
│   └── tailwind.config.js
│
├── server/                                # Django 5.2 REST Monolith
│   ├── accounts/                          # Custom User model, StudentProfile, ClientProfile, StudentReport, JWT views, PDF validators
│   ├── proctor/                           # Exam, ExamSession, ProctorEvent, risk scoring heuristic (threshold = 50)
│   ├── project/                           # JobPost, JobApplication, TF-IDF vector applicant matching engine
│   ├── verification/                      # AI MCQ test generator, Celery tasks, LangChain Gemini chains, PDF & Git parsers
│   ├── modules/                           # Adaptive AI-generated learning modules (UpskillModule, ModuleProgress)
│   ├── skillforge/                        # settings.py, urls.py, celery.py, permissions.py, exceptions.py
│   ├── manage.py
│   └── requirements.txt
│
├── project_knowledge/                     # Architecture & deep dive documentation
├── wiki/                                  # Full system wiki & API reference
├── run_dev.py                             # Single command development launcher (Django + Vite)
└── docker-compose.yml                     # Multi-container orchestration (Redis, Web, Worker, Client)
```

---

## 4. Key Subsystems & Workflows

1. **User Authentication & RBAC:**
   - Two distinct roles: `student` (candidate) and `client` (recruiter/employer).
   - Enforced by DRF permissions (`IsStudent`, `IsClient`) and frontend guards (`<ProtectedRoute>`, `<RoleGuard>`).
   - Token rotation with silent access token refresh via `/api/accounts/token/refresh/`.

2. **Multi-Modal Intake & Parsing:**
   - Candidate uploads PDF resume (strictly checked by magic bytes `%PDF-` and 5MB limit).
   - Candidate links public GitHub profile.
   - Text extracted using `PyPDF2` + GitHub API repository scraping, quarantined in prompt tags `<candidate_resume_data>` to prevent prompt injection.

3. **AI Diagnostic Assessments & Celery Offloading:**
   - Gemini 2.5 Flash generates dynamic multiple-choice and conceptual technical questions matching candidate background.
   - Heavy parsing and AI generation run asynchronously via Celery (`generate_partial_report_task`, `generate_skill_test_task`, `generate_learning_module_task`), tracked with `useTaskStatus.js` polling.

4. **Tamper-Evident Exam Proctoring:**
   - Active examination session (`/student/assessment`) locks fullscreen and initializes the hardware webcam via `ProctorWrapper.jsx`.
   - Canvas pixel sampling analyzes face presence and lighting; monitors window blur, tab switching, and clipboard shortcuts.
   - Proctor events stream to `/api/proctor/events/`; a risk score heuristic flags suspect sessions when risk score exceeds 50.

5. **Empirical Talent Matching Engine:**
   - Recruiter posts job requisitions (`/client/dashboard`) with required skills and description.
   - Scikit-learn computes TF-IDF matrix between candidate profiles and job requirements.
   - Outputs a cosine similarity match score (0-100%) ranking applicants in the recruiter's candidate dossier modal.

6. **Adaptive Upskilling Curricula:**
   - Identifies candidate weaknesses from assessment results and personality test archetypes.
   - Generates custom multi-step learning modules in Markdown, rendered with syntax-highlighted code blocks.

---

## 5. Available API Namespaces
- `/api/accounts/` : Auth (`register/`, `login/`, `token/refresh/`, `student-profile/`, `client-profile/`, `student-report/`)
- `/api/verification/` : Assessments (`generate-test/`, `submit-test/`, `personality-questions/`, `personality-submit/`, `recommendation/`, `tasks/<task_id>/status/`)
- `/api/proctor/` : Proctoring (`exams/`, `start-session/`, `events/`, `end-session/`, `sessions/<id>/risk/`)
- `/api/project/` : Jobs & Applications (`jobs/`, `jobs/<id>/apply/`, `jobs/<id>/applicants/`)
- `/api/modules/` : AI Upskilling (`generate/`, `modules/`, `modules/<id>/`, `modules/<id>/complete/`)
- `/api/docs/` : Interactive Swagger / OpenAPI documentation

---

## 6. Prompting Instructions for Gemini
When generating tasks or instructions for the coding agent (Antigravity):
1. Specify exact target file paths matching the directory structure above.
2. Provide precise code snippets for Django models, views, serializers, or React components.
3. Respect existing architectural patterns:
   - Use the centralized fetch client in `client/src/lib/api.js`.
   - Preserve Tailwind CAD blueprint / dark mode tokens (`canvas-blueprint`, `border-cad`, etc.).
   - Route long-running AI tasks through Celery.
4. Include testing/verification commands (e.g. `python server/manage.py test`, `npm run lint`).
