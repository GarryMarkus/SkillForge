# 00: System Overview

## 1. Executive Summary

### Core Purpose & Domain Problem
SkillForge is an open-source talent verification and job-matching platform designed to bridge the structural disconnect between education/learning credentials and employer hiring requirements. Traditional hiring workflows rely on unverified claims on resumes and unstructured GitHub portfolios, leading to high screening friction, credential inflation, and mismatched hiring. 

SkillForge addresses this by introducing:
- **Automated Multi-Modal Intake & Parsing:** Ingestion and static extraction of resume PDFs (`PyPDF2`) alongside automated GitHub profile metrics and repository scraping (`requests`).
- **AI-Driven Diagnostic Assessment:** Dynamic question generation tailored to the candidate's verified background and role archetype using Google Gemini via LangChain (`gemini-2.5-flash`).
- **Real-Time Client-Side Exam Proctoring:** Hardware camera verification, canvas-based pixel/skin-tone facial presence checks, tab-switching alerts, fullscreen enforcement, and risk scoring.
- **Dynamic Upskilling Curricula:** On-demand AI course generation calibrated against candidate assessment performance and personality archetypes.
- **Algorithmic Recruiter Matching:** Two-sided vector space candidate-to-job matching using Term Frequency-Inverse Document Frequency (TF-IDF) and cosine similarity (`scikit-learn`).

### Target User Personas
1. **Student / Job-Seeker:** Learners seeking to prove technical competence, take anti-cheat verified technical assessments, generate adaptive upskilling roadmaps, and apply to relevant startup job postings with algorithmic match scoring.
2. **Client / Recruiter / Startup Founder:** Companies seeking pre-vetted candidates who post project requirements, specify minimum qualification thresholds, and review rank-ordered candidate applications sorted by cosine relevance.
3. **Administrator:** System staff managing platform integrity, user roles, and proctoring flag escalation.

---

## 2. Complete Technology Stack Matrix

| Layer | Technology | Version | Purpose / Responsibilities |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | React | `^19.2.0` | UI component tree, reactivity, and client-side view management |
| **Frontend Runtime & Tooling** | Node.js / Vite | `^7.2.4` (Vite 7.3.1 runtime) | ESM-based development server, HMR, bundling, static production build |
| **Client Routing** | React Router DOM | `^7.13.0` | Browser history routing, route transitions, and navigation |
| **Client State Management** | Zustand | `^5.0.10` | Lightweight store management (`useAuthStore`, `useThemeStore`) |
| **Styling & CSS** | Tailwind CSS | `^3.4.17` | Utility-first styling with typography plugins and dark-mode support |
| **Animation & Motion** | Framer Motion | `^12.29.2` | Page transitions, tab layout animations, and modal state animations |
| **Smooth Scrolling** | Lenis | `^1.3.17` | Smooth momentum scrolling wrapper across layout |
| **Iconography** | Lucide React | `^0.563.0` | SVG icons across dashboard, navbar, and assessment pages |
| **Assessment & Hardware** | React Webcam | `^7.2.0` | In-browser camera capture stream for proctoring checks |
| **Markdown Rendering** | React Markdown + Remark GFM | `^10.1.0` / `^4.0.1` | Renders AI-generated upskilling module content and markdown formatting |
| **Backend Framework** | Django | `5.2.5` | Monolithic web application framework, ORM, URL dispatcher, admin |
| **Backend REST Layer** | Django REST Framework | `3.16.1` | Serializers, API views (`APIView`), HTTP request/response contract |
| **Authentication & Tokens** | DRF SimpleJWT | `5.5.1` | JSON Web Token (JWT) issuance, access/refresh tokens, token blacklist |
| **CORS Middleware** | django-cors-headers | `4.7.0` | Cross-Origin Resource Sharing handling for React Vite origin |
| **Language Runtime** | Python | `3.11+` | Backend application execution runtime |
| **Database Engine** | SQLite (Default Dev) | `3.x` (Django ORM) | Relational persistence (`db.sqlite3`), migrations, schema entities |
| **Machine Learning / NLP** | scikit-learn / NumPy / SciPy | `1.7.2` / `1.26.4` / `1.16.3` | TF-IDF Vectorization & Cosine Similarity matching algorithms |
| **Document Processing** | PyPDF2 | `3.0.1` | Text extraction from candidate resume PDF uploads |
| **Generative AI / LLM** | LangChain Core / Community | `0.1.16` / `0.0.38` | Orchestration chains, prompt templates, output parsers |
| **LLM Provider Integration** | langchain-google-genai | `0.0.9` (`gemini-2.5-flash`) | Structured test generation, resume audit, and module generation |
| **HTTP Client (Backend)** | Requests | `2.31.0` | Synchronous outbound HTTP calls to GitHub REST API |

---

## 3. Repository Directory Structure

```
SkillForge/
├── .gitignore                           # Git ignore rules for Python, Node, OS, and env artifacts
├── README.md                            # High-level product and marketing overview
├── requirements.txt                     # Backend Python dependencies
├── assets/                              # UI screenshots, architecture diagrams, and platform logos
│   ├── browsejobsection.png
│   ├── homepage.png
│   ├── learningpage.png
│   ├── loader.png
│   ├── logo.png
│   ├── skillforge-flow.png
│   └── userprofile.png
│
├── Frontend/                            # React 19 Single Page Application
│   ├── .gitignore                       # Frontend-specific node_modules / dist ignores
│   ├── eslint.config.js                 # Flat ESLint configuration rules (React hooks & refresh)
│   ├── index.html                       # HTML5 entry template with viewport and font link definitions
│   ├── package.json                     # NPM manifest declaring scripts and dependencies
│   ├── package-lock.json                # Deterministic dependency lockfile
│   ├── postcss.config.js                # PostCSS configuration with Tailwind and Autoprefixer
│   ├── tailwind.config.js               # Tailwind custom color palettes, fonts, and typography plugins
│   ├── vite.config.js                   # Vite configuration with React plugin
│   ├── public/                          # Static public assets (e.g., vite.svg)
│   └── src/                             # Source code root
│       ├── App.css                      # Global component styles
│       ├── App.jsx                      # Client router root defining public and dashboard routes
│       ├── index.css                    # Tailwind CSS direct imports and root design rules
│       ├── main.jsx                     # ReactDOM root rendering <App /> in StrictMode
│       ├── api/
│       │   └── apiClient.js             # Legacy Axios instance with request/response interceptors
│       ├── assets/                      # Bundled frontend SVGs and icons
│       ├── components/
│       │   ├── assessment/
│       │   │   └── ProctorWrapper.jsx   # Hardware camera, canvas face check, fullscreen, & anti-cheat
│       │   ├── auth/                    # Authentication sub-components and multi-step wizard
│       │   │   ├── AuthLayout.jsx
│       │   │   ├── LeftPanel.jsx
│       │   │   ├── LoginForm.jsx
│       │   │   ├── RegisterWizard.jsx
│       │   │   ├── SuccessState.jsx
│       │   │   └── steps/               # Role selection, basic info, credentials, and confirmation
│       │   ├── client/
│       │   │   └── JobPostModal.jsx     # Recruiter modal dialog for creating job postings
│       │   ├── layout/
│       │   │   ├── Layout.jsx           # Global wrapper with Lenis smooth scroll and dark-mode setup
│       │   │   ├── Navbar.jsx           # Top navigation bar with theme switch and dynamic scroll styling
│       │   │   └── ThemeToggle.jsx      # Theme toggle button persisting state to Zustand
│       │   ├── sections/                # Landing page presentation sections
│       │   │   ├── CTA.jsx
│       │   │   ├── Footer.jsx
│       │   │   ├── Hero.jsx
│       │   │   ├── LearnVerifyEarn.jsx
│       │   │   ├── SkillCIBIL.jsx
│       │   │   ├── Testimonials.jsx
│       │   │   └── TrustBar.jsx
│       │   └── ui/                      # Atomic design UI primitives
│       │       ├── Badge.jsx
│       │       ├── Button.jsx
│       │       ├── Card.jsx
│       │       ├── Input.jsx
│       │       └── Loader.jsx
│       ├── pages/                       # Route destination views
│       │   ├── AuthPage.jsx             # Combined authentication view toggling login / signup wizard
│       │   ├── Dashboard.jsx            # Legacy standalone dashboard (unrouted)
│       │   ├── ExamView.jsx             # Legacy standalone exam view (unrouted)
│       │   ├── LandingPage.jsx          # Public product landing page with animated sections
│       │   ├── Login.jsx                # Legacy unrouted login form
│       │   ├── Register.jsx             # Legacy unrouted registration form
│       │   ├── client/
│       │   │   └── ClientOnboarding.jsx # Recruiter company and profile registration form
│       │   ├── dashboard/
│       │   │   ├── ClientDashboard.jsx  # Recruiter dashboard: job lists, applicant reviews, and match %
│       │   │   └── StudentDashboard.jsx # Student dashboard: skill scores, job browser, and module links
│       │   └── student/
│       │       ├── AssessmentPage.jsx   # Active proctored AI technical exam session
│       │       ├── PersonalityTest.jsx  # 7-question psychological archetype diagnostic test
│       │       ├── StudentOnboarding.jsx# Profile setup: resume upload, GitHub URL, bio, and education
│       │       └── UpskillPage.jsx      # AI learning module generator and markdown viewer
│       └── store/
│           ├── authStore.js             # Zustand store for authentication state, tokens, and wizard steps
│           └── themeStore.js            # Zustand store persisting light/dark mode selection
│
└── skillforge/                          # Django Backend Application Root
    ├── manage.py                        # Django CLI management entry point
    ├── resumes/                         # Sample and uploaded candidate resume PDFs
    ├── templates/
    │   └── proctor.html                 # Legacy HTML/JS test harness for proctoring endpoints
    ├── accounts/                        # Custom authentication, user profiles, and onboarding
    │   ├── admin.py
    │   ├── apps.py
    │   ├── models.py                    # User, StudentProfile, ClientProfile, StudentReport
    │   ├── serializers.py               # Register, Login, and Profile serializers
    │   ├── tests.py                     # App tests (stub)
    │   ├── urls.py                      # /api/accounts/* routes
    │   ├── views.py                     # Register, Login, Onboarding, Profile, and Logout APIViews
    │   └── migrations/
    │       └── 0001_initial.py
    ├── analysis/                        # Stub application (empty models, orphaned url_patterns)
    │   ├── admin.py
    │   ├── apps.py
    │   ├── models.py
    │   ├── tests.py
    │   ├── urls.py
    │   ├── views.py
    │   └── migrations/
    ├── modules/                         # AI-generated educational learning modules
    │   ├── admin.py
    │   ├── apps.py
    │   ├── langchain_utils.py           # Gemini prompt chain for module generation
    │   ├── models.py                    # UpskillModule, ModuleProgress
    │   ├── serializers.py               # UpskillModuleSerializer
    │   ├── services.py                  # Module generation orchestration
    │   ├── tests.py                     # App tests (stub)
    │   ├── urls.py                      # /api/modules/* routes
    │   ├── views.py                     # Generate, List, and Detail module APIViews
    │   └── migrations/
    │       └── 0001_initial.py
    ├── proctor/                         # Exam proctoring, risk scoring, and hardware event logging
    │   ├── admin.py
    │   ├── apps.py
    │   ├── auth_views.py                # Legacy conflicting auth views (imports standard Django User)
    │   ├── models.py                    # Exam, Question, ExamSession, ProctorEvent
    │   ├── risk.py                      # Risk scoring heuristic engine (Threshold = 50)
    │   ├── serializers.py               # ExamSerializer, QuestionSerializer
    │   ├── tests.py                     # App tests (stub)
    │   ├── urls.py                      # /api/proctor/* routes
    │   ├── views.py                     # Exam list, start, question, event, and end APIViews
    │   └── migrations/
    │       └── 0001_initial.py
    ├── project/                         # Job posts, student applications, and TF-IDF matching
    │   ├── admin.py
    │   ├── apps.py
    │   ├── models.py                    # JobPost, JobApplication
    │   ├── serializers.py               # JobPostSerializer, JobApplicationSerializer, ApplicantSerializer
    │   ├── tests.py                     # App tests (stub)
    │   ├── urls.py                      # /api/project/* routes
    │   ├── views.py                     # Job CRUD, application handling, and scikit-learn match ranking
    │   └── migrations/
    │       ├── 0001_initial.py
    │       └── 0002_jobapplication.py
    ├── skillforge/                      # Django project configuration package
    │   ├── __init__.py
    │   ├── asgi.py                      # Standard ASGI entry point
    │   ├── settings.py                  # Django core settings (installed apps, middleware, DB, JWT)
    │   ├── urls.py                      # Root URL dispatcher routing all /api/* namespaces
    │   └── wsgi.py                      # WSGI entry point for synchronous web servers
    └── verification/                    # Multi-modal verification, LangChain AI, and personality testing
        ├── admin.py
        ├── apps.py
        ├── models.py                    # SkillVerification, PersonalityAttempt, SkillCategory, SkillTestAttempt
        ├── personality_data.py          # Static bank of 7 psychometric diagnostic questions
        ├── services.py                  # Orchestrates resume/git parsing, test generation, and evaluation
        ├── tests.py                     # App tests (stub)
        ├── urls.py                      # /api/verification/* routes
        ├── views.py                     # Generate test, submit test, personality questions, recommendation
        ├── migrations/
        │   ├── 0001_initial.py
        │   └── 0002_remove_personalityquestion_test_and_more.py
        └── utils/
            ├── git_utils.py             # GitHub user profile and repository scraper
            ├── langchain_utils.py       # LangChain Gemini chains for resume/git audit and test generation
            └── pdf_utils.py             # PyPDF2 text extraction from Django FileField
```

---

## 4. Setup, Build, Test, and Execution Lifecycle

### Backend Lifecycle (`skillforge/`)

#### 1. Environment Preparation
```bash
# Create and activate a Python 3.11+ virtual environment
python -m venv venv

# Windows (PowerShell)
.\venv\Scripts\Activate.ps1
# Linux/macOS
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

#### 2. Environment Variables Configuration
A `.env` file must be created inside `skillforge/` (or root) with the mandatory Google Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
*(Note: At present, `skillforge/modules/langchain_utils.py:9` and `skillforge/verification/utils/langchain_utils.py:9` raise an immediate `ValueError` on startup if `GEMINI_API_KEY` is undefined).*

#### 3. Database Migration & Superuser Setup
```bash
cd skillforge
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

#### 4. Execution
```bash
# Run Django development HTTP server on port 8000
python manage.py runserver 127.0.0.1:8000
```

#### 5. Backend Testing
```bash
python manage.py test
```
*(Note: Current test files in all apps contain only empty boilerplate).*

---

### Frontend Lifecycle (`Frontend/`)

#### 1. Dependency Installation
```bash
cd Frontend
npm install
```

#### 2. Development Execution
Defined in `package.json`:
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```
Run development server (default port `http://localhost:5173`):
```bash
npm run dev
```

#### 3. Production Build
```bash
npm run build
```
Build output is generated into `Frontend/dist/`.

#### 4. Code Quality & Linting
```bash
npm run lint
```
Runs ESLint 9 across all `.js` and `.jsx` files based on `Frontend/eslint.config.js`.
*(Note: Current build logs reflect 29 lint errors primarily due to unused imported components and motion primitives).*
