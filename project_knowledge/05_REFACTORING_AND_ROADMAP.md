# 05: Refactoring and Roadmap

## 1. Technical Debt & Vulnerability Inventory

### Critical Severity (Breaks Functionality or Security)

#### 1. Top-Level Module Crash Hazard on Missing Environment Variable
- **Files:** `skillforge/modules/langchain_utils.py:8-9` and `skillforge/verification/utils/langchain_utils.py:8-9`
- **Issue:** Both files evaluate `os.getenv("GEMINI_API_KEY")` and raise an immediate `ValueError` at the root module level upon import.
- **Impact:** Any administrative CLI command (`python manage.py makemigrations`, `python manage.py migrate`, `python manage.py collectstatic`) or server startup fails instantly if the API key is not present in `.env`.
- **Remediation:** Refactor initialization into lazy factory functions or instantiate the client only during service execution.

#### 2. Model Attribute Bug in Recruiter Applicant Serialization
- **File:** `skillforge/project/serializers.py:38`
- **Issue:** `ApplicantSerializer` declares `name = serializers.CharField(source='user.name', read_only=True)`.
- **Impact:** `accounts.User` does not define a `name` attribute (`full_name` is located on `StudentProfile`). Invoking this serializer raises an `AttributeError: 'User' object has no attribute 'name'`.
- **Remediation:** Change source to `source='full_name'` on `StudentProfile`.

#### 3. Proctoring Endpoint Route Mismatch (HTTP 404 in Live Exams)
- **Files:** `skillforge/proctor/urls.py:16` vs `Frontend/src/pages/student/AssessmentPage.jsx:161`
- **Issue:** Backend registers `path("event/", ProctorEventView.as_view())`, but the frontend explicitly calls `fetch('http://localhost:8000/api/proctor/events/', ...)`.
- **Impact:** Hardware security violation events (e.g., look away, tab switch) result in an unhandled 404 error and are never registered in the backend session risk tracker.
- **Remediation:** Standardize the backend route and frontend client to `/api/proctor/events/` (or update frontend to `/event/`).

#### 4. Shadow Authentication System in Proctor App
- **File:** `skillforge/proctor/auth_views.py:1-93` and `skillforge/proctor/urls.py:22-23`
- **Issue:** Implements duplicate `/api/proctor/auth/register/` and `/api/proctor/auth/login/` endpoints that import the default Django `from django.contrib.auth.models import User`.
- **Impact:** Directly creating users with `username` violates `AUTH_USER_MODEL = "accounts.User"`, producing runtime database integrity errors.
- **Remediation:** Remove `proctor/auth_views.py` and delete duplicate routes from `proctor/urls.py`. Route all authentication through `accounts/urls.py`.

#### 5. Missing Media Configuration for Resume File Storage
- **File:** `skillforge/skillforge/settings.py`
- **Issue:** Neither `MEDIA_ROOT` nor `MEDIA_URL` is configured in `settings.py`, nor is `static(settings.MEDIA_URL, ...)` added to `skillforge/urls.py`.
- **Impact:** Resumes uploaded via `StudentOnboarding` are stored in arbitrary local file paths and cannot be retrieved or downloaded by recruiters or the PDF parser.
- **Remediation:** Add `MEDIA_ROOT = BASE_DIR / 'media'` and `MEDIA_URL = '/media/'` to settings and expose them in `urls.py`.

---

### High Severity (Architectural Debt & Maintainability)

#### 6. Hardcoded API Base URLs Across Frontend Components
- **Files:** `ClientOnboarding.jsx`, `ClientDashboard.jsx`, `StudentDashboard.jsx`, `AssessmentPage.jsx`, `PersonalityTest.jsx`, `StudentOnboarding.jsx`, `UpskillPage.jsx`, `JobPostModal.jsx`, `authStore.js`
- **Issue:** `http://localhost:8000/api/...` is hardcoded across **9 different files**.
- **Impact:** The frontend cannot be deployed to staging or production without manual find-and-replace.
- **Remediation:** Introduce `VITE_API_BASE_URL` in a `.env` file and create a unified API service client.

#### 7. Dual / Orphaned API Client Layer
- **Files:** `Frontend/src/api/apiClient.js` vs individual component `fetch()` calls
- **Issue:** `apiClient.js` imports `axios` (which is not declared in `Frontend/package.json`) and attempts to read `access_token` from `localStorage`, whereas `authStore.js` stores tokens under `tokens`.
- **Impact:** High developer confusion. Legacy unrouted pages (`Login.jsx`, `Register.jsx`, `Dashboard.jsx`, `ExamView.jsx`) import a broken client.
- **Remediation:** Either install `axios` and refactor all components to use `apiClient`, or replace `apiClient.js` with a lightweight, typed native `fetch` client using `authStore`. Delete dead pages.

#### 8. Synchronous Execution of LLM and Scraping Workflows
- **Files:** `verification/services.py:27-50`, `modules/services.py:20`
- **Issue:** Resume PDF text extraction, GitHub REST API profile scraping, and multi-turn Gemini completions execute synchronously inside HTTP request handlers.
- **Impact:** Requests can block for 15-45 seconds, risking HTTP gateway timeouts (504) and thread starvation under concurrent user load.
- **Remediation:** Offload long-running parsing and AI jobs to a background task queue (Celery + Redis or Django-Q) and return a task ID with status polling / WebSockets.

---

### Moderate Severity (Code Quality & Hygiene)

#### 9. Orphaned & Incomplete `analysis` App
- **Directory:** `skillforge/analysis/`
- **Issue:** App is installed in `INSTALLED_APPS`, but contains empty models, empty views, and a misspelled `url_patterns = []` in `urls.py` that is never included in root `urls.py`.
- **Remediation:** Either implement the intended content analysis domain or cleanly purge the app from `INSTALLED_APPS` and the filesystem.

#### 10. Missing Frontend Route Guards & Role Protection
- **File:** `Frontend/src/App.jsx:16-32`
- **Issue:** All routes (`/student/dashboard`, `/client/dashboard`, `/student/assessment`, etc.) are completely open.
- **Impact:** Unauthenticated or unauthorized users can render private views without tokens, causing unexpected UI states and uncaught promise rejections.
- **Remediation:** Create a `<ProtectedRoute allowedRoles={['student']} />` layout component to protect private routes and redirect unauthenticated sessions to `/auth`.

#### 11. ESLint Failures (29 Errors)
- **Files:** Across 15 frontend files
- **Issue:** Build output reports 29 errors due to unused variable imports (`motion`, `useState`, etc.) and `Layout.jsx` exporting non-component functions.
- **Remediation:** Clean up unused imports, isolate `cn` into `src/utils/cn.js`, and verify that `npm run lint` passes with 0 errors.

---

## 2. Coupling Bottlenecks

```
                  ┌────────────────────────┐
                  │      accounts.User     │
                  └───────────┬────────────┘
                              │ 
               ┌──────────────┼──────────────┐
               ▼              ▼              ▼
       StudentProfile   ClientProfile   ExamSession (proctor)
               │              │              │
        ┌──────┴──────┐       │              │
        ▼             ▼       ▼              ▼
  StudentReport   JobApplication <───> SkillTestAttempt (verification)
        │                     ▲
        ▼                     │
  UpskillModule (modules)  JobPost (project)
```

1. **`accounts.models.StudentReport` as the Central Hub:**
   - Both `verification/services.py` and `modules/services.py` read and write to `StudentReport.report_summary`.
   - Modifying the JSON structure of `report_summary` risks breaking:
     - The candidate recommendation card on `StudentDashboard.jsx`
     - The difficulty calibration logic in `UpskillPage.jsx`
     - The question generation logic in `verification/services.py`
2. **Coupling between `verification` and `proctor`:**
   - `verification.SkillTestAttempt` maintains a direct one-to-one relationship with `proctor.ExamSession`.
   - `submit_skill_test()` inspects `attempt.proctor_session.is_flagged` to invalidate results.
3. **Implicit Dependency on Post-Save Signal:**
   - Registration relies on `accounts/models.py:157` (`create_profiles` signal) to instantiate `StudentProfile` or `ClientProfile`. If a user is created programmatically without a role, or if signal registration fails, profile foreign keys break.

---

## 3. Safe Modification Roadmap

### Phase 1: Stability & Security Baseline (Non-Destructive Fixes)
1. **Sanitize Environment & Startup:**
   - Wrap top-level `ChatGoogleGenerativeAI` instantiations in `langchain_utils.py` into lazy getter functions to prevent crashes when `GEMINI_API_KEY` is not present in development.
   - Create `.env.example` templates for both backend and frontend.
   - Extract `SECRET_KEY`, `DEBUG`, and `ALLOWED_HOSTS` into environment variables.
2. **Correct Critical Runtime Bugs:**
   - Fix `ApplicantSerializer` in `project/serializers.py` to point to `source='full_name'`.
   - Synchronize proctor event route between `proctor/urls.py` and `AssessmentPage.jsx`.
   - Delete orphaned `proctor/auth_views.py` and duplicate auth routes.
   - Configure `MEDIA_ROOT` and `MEDIA_URL` in `settings.py`.
3. **Frontend Lint & Hygiene:**
   - Extract `cn()` from `Layout.jsx` into `src/utils/cn.js`.
   - Purge dead pages (`Dashboard.jsx`, `ExamView.jsx`, `Login.jsx`, `Register.jsx`).
   - Fix all 29 ESLint errors to establish a green lint pipeline.

### Phase 2: Architectural Decoupling & API Standardization
1. **Frontend Unified API Client:**
   - Implement a standardized API client (`src/api/client.js`) using `VITE_API_BASE_URL`.
   - Attach JWT Bearer tokens automatically from `authStore`.
   - Implement a 401 response interceptor that dispatches refresh token rotation.
   - Replace raw `fetch('http://localhost:8000/api/...')` in all components with typed API service methods.
2. **Route Protection Layer:**
   - Implement `<ProtectedRoute />` and `<RoleGuard allowedRoles={[...]} />` wrappers in `App.jsx`.
   - Redirect unauthenticated users to `/auth`.
3. **Backend Service Refactoring:**
   - Define formal schemas/dataclasses for `report_summary` JSON payloads rather than unstructured dictionaries.
   - Separate external API clients (`GitHubClient`, `GeminiClient`) from Django view/service logic with mockable interfaces.

### Phase 3: Asynchronous Pipeline & Scalability
1. **Background Job Queue:**
   - Wire up `Celery` with `Redis` (already present in `requirements.txt`).
   - Move `generate_partial_report`, `generate_skill_test_for_student`, and `generate_upskill_module` to asynchronous Celery tasks.
   - Expose task polling endpoints (`/api/tasks/<task_id>/status/`) to the frontend with loading skeletons.
2. **Database & Containerization:**
   - Switch from SQLite to PostgreSQL.
   - Create multi-stage `Dockerfile` definitions for both Django (WSGI/Gunicorn) and React (Nginx / Vite static dist).
   - Author a `docker-compose.yml` orchestrating Django, PostgreSQL, Redis, Celery, and Vite.

### Phase 4: Verification, Testing & CI/CD
1. **Backend Test Suite:**
   - Write pytest/Django test cases for:
     - User registration, JWT login, and profile creation signals.
     - Proctor risk scoring heuristics (`proctor/risk.py`).
     - TF-IDF job matching logic (`project/views.py`).
     - Mocked Gemini test generation and scoring pipelines.
2. **Frontend Test Harness:**
   - Install Vitest and React Testing Library.
   - Add unit tests for `useAuthStore`, `ProctorWrapper` heuristic calculations, and form wizards.
3. **Automated CI/CD:**
   - Set up GitHub Actions workflow (`.github/workflows/ci.yml`) running lint, type checks, and test suites on every pull request.

---

## 4. High-Leverage Entry Points for Codebase Overhaul

Prioritize modifications to these files first before touching secondary presentation components:

| Priority | Target File / Module | Rationale / Leverage |
| :--- | :--- | :--- |
| **1** | `skillforge/skillforge/settings.py` | Configures environment variables, security keys, media handling, and database connection. Foundation for all backend stability. |
| **2** | `skillforge/verification/utils/langchain_utils.py` & `skillforge/modules/langchain_utils.py` | Eliminates the startup crash hazard; encapsulates Gemini LLM client into a reliable service. |
| **3** | `Frontend/src/store/authStore.js` & new `Frontend/src/api/client.js` | Centralizes authentication, token storage, and dynamic base URL routing for the entire frontend application. |
| **4** | `Frontend/src/App.jsx` | Establishes authenticated and role-based route guards across all student and recruiter pages. |
| **5** | `skillforge/project/serializers.py` & `skillforge/project/views.py` | Resolves `ApplicantSerializer` crash and hardens TF-IDF vectorization against zero-job / empty profile edge cases. |
| **6** | `skillforge/proctor/urls.py` & `Frontend/src/pages/student/AssessmentPage.jsx` | Fixes the live proctoring event 404 error and eliminates broken duplicate authentication views in `proctor`. |
| **7** | `Frontend/src/components/layout/Layout.jsx` & `src/utils/cn.js` | Fixes Vite Fast Refresh violations and resolves ESLint errors. |

---

## 5. Executed Monorepo Architectural Refactoring Record

The 6-layer architectural refactoring has been successfully executed, verified, and committed across the repository:

### Layer 1: Repository Restructure & Dead Code Purge
- **Changes**: Renamed `Frontend/` to `client/` and `skillforge/` to `server/` via `git mv`. Purged 12 orphaned and dead files (`Dashboard.jsx`, `ExamView.jsx`, `Login.jsx`, `Register.jsx`, `apiClient.js`, `server/analysis/`, `server/proctor/auth_views.py`, `server/templates/proctor.html`, build logs).
- **Commit**: `7d2f651 restructure repository into client and server folders and purge dead pages`

### Layer 2: Environment Isolation & Backend Stabilization
- **Changes**: Created `client/.env.example` and `server/.env.example`. Isolated secrets in `server/skillforge/settings.py` via `os.environ.get()` with fallbacks. Added `MEDIA_ROOT` and dev media routes. Converted `langchain_utils.py` in both `verification/` and `modules/` to lazy `get_model()` factory functions, eliminating startup crashes without `GEMINI_API_KEY`. Fixed `ApplicantSerializer` `source='full_name'` bug, added `events/` route to `proctor/urls.py`, and eliminated wildcard imports.
- **Commit**: `46ba92e isolate environment configs and fix startup crash in server/modules/langchain_utils.py`

### Layer 3: Backend API Architecture & Error Handling
- **Changes**: Created custom uniform exception handler (`server/skillforge/exceptions.py`) returning `{error, detail, status_code}` envelope and registered in DRF `EXCEPTION_HANDLER`. Created role permission classes `IsStudent` and `IsClient` in `server/skillforge/permissions.py`. Hardened `server/project/views.py` with empty queryset guards for TF-IDF vectorizer. Added GitHub API timeout and token support to `git_utils.py`. Normalized proctor risk scoring penalty dictionary.
- **Commit**: `76e273b add custom DRF exception handler, role permissions, and error handling across views`

### Layer 4: Frontend API Layer, Utilities & Lint Cleanup
- **Changes**: Extracted `cn()` utility to `client/src/lib/cn.js`. Created centralized API client in `client/src/lib/api.js` automatically attaching JWT tokens and resolving `VITE_API_BASE_URL`. Migrated all frontend direct fetch calls (`StudentOnboarding`, `AssessmentPage`, `PersonalityTest`, `UpskillPage`, `ClientOnboarding`, `JobPostModal`, `StudentDashboard`, `ClientDashboard`). Replaced all relative `cn` imports and resolved all 56 ESLint errors down to zero.
- **Commit**: `902e943 add centralized API client, extract cn() utility, and fix all ESLint errors`

### Layer 5: Route Guards & State Architecture
- **Changes**: Created `ProtectedRoute.jsx` (authentication guard) and `RoleGuard.jsx` (role authorization barrier). Wrapped all `/student/*` and `/client/*` routes in `client/src/App.jsx`. Enhanced `useAuthStore` with persistent `onboarding_stage` and dedicated update helpers.
- **Commit**: `6c5da2a add ProtectedRoute and RoleGuard wrappers and persist onboarding_stage in Zustand store`

### Layer 6: Documentation, CI Readiness & Project Knowledge Update
- **Changes**: Created comprehensive `server/README.md` and `client/README.md`. Rewrote root `README.md` into monorepo developer setup guide. Added GitHub Actions CI pipeline `.github/workflows/ci.yml`. Updated `project_knowledge/00_SYSTEM_OVERVIEW.md` directory trees and setup guides.
- **Commit**: `c5d0e1f add developer documentation, update project_knowledge, and create GitHub Actions CI skeleton`

---

## 6. Post-Refactoring Code Audit & Bug Fix Log

Following the 6-layer monorepo refactoring, an exhaustive code audit was performed to resolve runtime crashes, state synchronization traps, and security flaws:

1. **State Trap (Infinite Onboarding Redirect Loop)**:
   - *Problem*: `StudentOnboarding.jsx` and `ClientOnboarding.jsx` submitted profile updates, but never updated `user.onboarding_stage` in `useAuthStore`. Navigating to `StudentDashboard.jsx` immediately triggered `user.onboarding_stage < 2`, redirecting the student back to onboarding in an inescapable loop.
   - *Fix*: Handled API response and dispatched `updateOnboardingStage(data.onboarding_stage || 2)`.
   - *Commit*: `7294844 update onboarding_stage in Zustand store upon profile submission in StudentOnboarding.jsx and ClientOnboarding.jsx`

2. **Unseeded Category & Missing Report Crash**:
   - *Problem*: `generate_skill_test_for_student`, `submit_personality_assessment`, and `get_recommendation` in `server/verification/services.py` performed direct `.get()` lookups for `SkillCategory` and `StudentReport`, throwing `DoesNotExist` 500 crashes whenever a category was unseeded or a user visited before generating a report.
   - *Fix*: Used `get_or_create` for `StudentReport` and safe fallback lookups for `SkillCategory`.
   - *Commit*: `6d79ac9 add safety fallbacks for StudentReport and SkillCategory queries in server/verification/services.py`

3. **Upskill JSON Parsing Crash & Field Mismatch**:
   - *Problem*: `server/modules/services.py` crashed with `JSONDecodeError` if Gemini returned raw markdown or varied output formats. Additionally, `UpskillPage.jsx` looked for `m.learner_level` while the Django model defined the field as `level`.
   - *Fix*: Added resilient fallback dictionary extraction for non-JSON outputs in `services.py` and aligned `m.level` in `UpskillPage.jsx`.
   - *Commit*: `89a23e7 harden JSON parsing in server/modules/services.py and align level field in UpskillPage.jsx`

4. **Insecure Direct Object Reference (IDOR) & Proctor Rule Gaps**:
   - *Problem*: `ProctorEventView` and `EndExamView` queried `ExamSession.objects.get(id=session_id)` without checking `user=request.user`, allowing candidates to inject violations or terminate other students' exam sessions. Furthermore, `rules` in `risk.py` had no mapping for `VIOLATION_WARNING`.
   - *Fix*: Scoped session queries to `user=request.user`, parsed `confidence` with `try...except`, and added `"VIOLATION_WARNING": 15` to penalty rules.
   - *Commit*: `c51d041 prevent IDOR on exam sessions in server/proctor/views.py and add warning rules in risk.py`

5. **Unenforced Minimum Skill Score on Job Applications**:
   - *Problem*: Recruiter job posts specified a `min_skill_score` threshold, but `ApplyJobAPI` never validated the candidate's verified skill score before creating an application.
   - *Fix*: Added threshold validation comparing candidate's verified skill score against `job.min_skill_score`, returning 403 Forbidden if unqualified.
   - *Commit*: `a836ea4 enforce minimum skill score check on job applications in server/project/views.py`

6. **Profile Endpoint Auto-Creation & Consistent Registration Schema**:
   - *Problem*: `ProfileAPI`, `ProfileUpdateAPI`, and `OnboardingAPI` assumed profiles existed, throwing 500 errors for users created via CLI or missing signals. `RegisterAPI` omitted `role` and `onboarding_stage` in responses.
   - *Fix*: Replaced direct attribute access with `get_or_create(user=user)` and added `role`/`onboarding_stage` to register response.
   - *Commit*: `ce76668 ensure profile auto-creation on profile endpoints in server/accounts/views.py`

7. **Assessment & Personality Test UI Edge Case Guards**:
   - *Problem*: `AssessmentPage.jsx` rendered a blank screen if question generation returned empty, and `PersonalityTest.jsx` submitted empty answers without prompting.
   - *Fix*: Added dedicated "No Questions Available" retry card and answer completion confirmation check.
   - *Commit*: `7316582 add error and completion guards in AssessmentPage.jsx and PersonalityTest.jsx`

