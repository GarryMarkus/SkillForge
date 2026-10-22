# 04: Environment and DevOps

## 1. Environment Variables Inventory

### Current State of Configuration
- **Missing Template Files:** There are no `.env`, `.env.example`, or `.env.local` files tracked anywhere in the repository.
- **Hardcoded Secret Keys:** In `skillforge/skillforge/settings.py:23`:
  ```python
  SECRET_KEY = 'django-insecure-q@=j-czk(lt3)n@0_^u05&ul&gcqo(a6+9!w_#)1f=!+!#9xw@'
  ```
- **Startup Crash Hazard:** In both `skillforge/modules/langchain_utils.py:7-9` and `skillforge/verification/utils/langchain_utils.py:7-9`:
  ```python
  API_KEY = os.getenv("GEMINI_API_KEY")
  if not API_KEY:
      raise ValueError("GEMINI_API_KEY or GOOGLE_API_KEY is missing. Set it in your .env file.")
  ```
  Failing to provide `GEMINI_API_KEY` prevents the Django backend from starting or executing migrations.

### Complete Variable Matrix (Actual vs. Expected)

| Variable Name | Defined Location | Required / Optional | Expected Format / Example | Actual Code Behavior / Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `GEMINI_API_KEY` | `langchain_utils.py` (both modules and verification) | **Mandatory** | String: `AIzaSy...` | Authenticates LangChain `ChatGoogleGenerativeAI(model="gemini-2.5-flash")`. Server crashes if unset. |
| `SECRET_KEY` | `settings.py:23` | Optional (Currently hardcoded) | String: 50+ char random string | Django cryptographic signing. Needs extraction to env. |
| `DEBUG` | `settings.py:26` | Optional (Currently hardcoded) | Boolean: `True` / `False` | Currently hardcoded to `True`. Exposes tracebacks in responses. |
| `ALLOWED_HOSTS` | `settings.py:28` | Optional (Currently hardcoded) | Comma-separated strings: `localhost,127.0.0.1` | Currently empty list `[]`. Must be parameterized for production. |
| `VITE_API_BASE_URL` | None (Currently hardcoded in Frontend) | **Missing** | URL: `http://localhost:8000/api` | Base URL for REST API. Currently hardcoded across 9 frontend files. |
| `DATABASE_URL` | None (Currently hardcoded in `settings.py`) | **Missing** | Connection URI: `postgresql://user:pass@host:5432/db` | Currently uses local SQLite (`db.sqlite3`). |
| `GITHUB_TOKEN` | None (Currently unauthenticated) | **Recommended** | String: `ghp_...` | GitHub API requests in `git_utils.py:11` are unauthenticated (rate-limited to 60 req/hr). |

---

## 2. Containerization and Orchestration

### Audit Findings
- **Zero Dockerfiles:** Neither `skillforge/` nor `Frontend/` contains a `Dockerfile`.
- **Zero Orchestration Manifests:** No `docker-compose.yml`, Kubernetes manifests, Helm charts, or systemd unit files exist in the repository.
- **Documentation Discrepancy:** The root `README.md` includes code snippets for deploying a Node 18 Alpine Docker container and running `celery -A skillforge worker`, but none of the supporting scripts, configuration files, or image build definitions exist in the codebase.

---

## 3. CI/CD Pipelines, Linting, & Test Harnesses

### CI/CD Pipeline
- **Status:** **Completely absent.**
- There is no `.github/workflows/` directory, GitLab CI (`.gitlab-ci.yml`), or automated build pipeline.
- Pull requests and commits in git history were merged without automated integration checks or branch protection status checks.

### Automated Test Suites
- **Backend Tests:**
  - `accounts/tests.py`: Empty (`# Create your tests here.`)
  - `analysis/tests.py`: Empty
  - `modules/tests.py`: Empty
  - `proctor/tests.py`: Empty
  - `project/tests.py`: Empty
  - `verification/tests.py`: Empty
  - **Coverage:** 0.0%
- **Frontend Tests:**
  - `Frontend/package.json` contains no test runner (`vitest`, `jest`, `playwright`, or `cypress` are absent from `devDependencies`).
  - **Coverage:** 0.0%

### Code Quality & Linting Configuration
- **Configuration File:** `Frontend/eslint.config.js`
- **Lint Engine:** Flat ESLint 9 (`@eslint/js: ^9.39.1`) with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`.
- **Rules Configured:**
  ```javascript
  rules: {
    'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
  }
  ```
- **Current Lint Status:**
  - `Frontend/lint_full.txt` logs **29 errors** and **1 warning**.
  - 28 errors are caused by unused variables/imports (`motion`, `Icon`, `useState`, `refreshError`).
  - 1 error is in `Layout.jsx` for exporting `cn` utility alongside a component (`react-refresh/only-export-components`).
  - 1 warning is in `ExamView.jsx` for missing hook dependencies in `useEffect`.

---

## 4. Third-Party Integrations & External SDKs

```
┌────────────────────────────────────────────────────────┐
│                   SKILLFORGE PLATFORM                  │
└──────────────┬──────────────────────────┬──────────────┘
               │                          │
               │ HTTP GET                 │ gRPC / REST
               ▼                          ▼
┌──────────────────────────────┐ ┌──────────────────────────────┐
│       GITHUB REST API        │ │      GOOGLE GEMINI API       │
│    (https://api.github.com)  │ │     (gemini-2.5-flash)       │
├──────────────────────────────┤ ├──────────────────────────────┤
│ - GET /users/{username}      │ │ - Resume strength/weakness   │
│ - GET /users/{username}/repos│ │ - GitHub project breakdown   │
│ - Rate limit: 60 req/hr IP   │ │ - 5-question scenario exam   │
│ - Direct requests.get()      │ │ - Star rating evaluation     │
│ - Synchronous execution      │ │ - Upskill module curriculum  │
└──────────────────────────────┘ └──────────────────────────────┘
```

### 1. Google Generative AI (Gemini via LangChain)
- **SDKs:** `google-generativeai==0.3.2`, `langchain-google-genai==0.0.9`.
- **Model Target:** `gemini-2.5-flash`.
- **Invocation Points:**
  - `skillforge/verification/utils/langchain_utils.py`:
    - `analyze_resume()`: Generates qualitative strengths/weaknesses from parsed PDF text.
    - `analyze_github_profile()`: Reviews candidate's repository list, languages, and stars.
    - `generate_final_report()`: Synthesizes initial diagnostic evaluation.
    - `generate_test()`: Generates practical, scenario-based multiple choice technical questions.
    - `final_analysis()`: Emits structured JSON containing star rating, strengths, weaknesses, and tags.
  - `skillforge/modules/langchain_utils.py`:
    - `generate_learning_module()`: Generates interactive Markdown course text, estimated hours, and tags.

### 2. GitHub REST API v3
- **Invocation Point:** `skillforge/verification/utils/git_utils.py:8-20`
- **Endpoints Queried:**
  - `https://api.github.com/users/{username}`
  - `https://api.github.com/users/{username}/repos`
- **Vulnerability:** Calls are made unauthenticated without a GitHub Personal Access Token or OAuth client ID. In production or multi-user testing environments, IP addresses will quickly hit GitHub's unauthenticated rate limit of **60 requests per hour**, throwing unhandled HTTP 403 exceptions.

### 3. PyPDF2 Document Extractor
- **Invocation Point:** `skillforge/verification/utils/pdf_utils.py:7-18`
- Reads file buffers from Django's `FileField` and concatenates page text streams.
- Relies on basic text stream extraction; does not perform OCR on scanned PDF resumes.
