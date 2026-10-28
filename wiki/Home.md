# 🛠️ Welcome to the SkillForge Wiki

<p align="center">
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white" alt="React" /></a>
  <a href="https://vitejs.dev"><img src="https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite&logoColor=white" alt="Vite" /></a>
  <a href="https://www.djangoproject.com"><img src="https://img.shields.io/badge/Django-4.2+-092E20?logo=django&logoColor=white" alt="Django" /></a>
  <a href="https://www.python.org"><img src="https://img.shields.io/badge/Python-3.11+-3776ab?logo=python&logoColor=white" alt="Python" /></a>
  <a href="https://zustand-demo.pmnd.rs"><img src="https://img.shields.io/badge/Zustand-5.0.10-black" alt="Zustand" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/TailwindCSS-3.4.17-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License" /></a>
</p>

**SkillForge** is an open-source, enterprise-grade skill verification and talent discovery platform designed to eliminate resume inflation and credential opacity. It bridges the structural divide between self-reported candidate claims and real employer engineering standards through automated multi-modal parsing, LLM-generated diagnostic evaluations, browser-based tamper-proof proctoring, and empirical vector matching.

---

## 🧭 Wiki Navigation

Explore the technical documentation, design decisions, and architectural specifications across our subsystems:

| Document | Description |
| :--- | :--- |
| 🏗️ **[System Architecture](System-Architecture)** | High-level system design, monorepo anatomy, end-to-end dataflow pipelines, and state transitions. |
| ⚙️ **[Backend Architecture](Backend-Architecture)** | Django 5 REST Framework architecture, apps breakdown, Celery workers, Redis queue, and LangChain integration. |
| 💻 **[Frontend Architecture](Frontend-Architecture)** | React 19 SPA, Vite toolchain, Zustand stores, RBAC navigation guards, and Lenis momentum scrolling. |
| 🛡️ **[Proctoring & Anti-Cheat](Proctoring-&-Anti-Cheat)** | Real-time hardware camera monitoring, canvas pixel/skin-tone heuristics, fullscreen enforcement, and risk scoring. |
| 🧠 **[Candidate Matching & AI](Candidate-Matching-&-AI)** | TF-IDF vector space modeling, cosine similarity matching, resume PDF parsing (`PyPDF2`), and Gemini test generation. |
| 📡 **[API Reference](API-Reference)** | Complete catalog of REST endpoints: authentication, proctoring events, assessments, modules, and jobs. |
| 🚀 **[Deployment & Local Setup](Deployment-&-Local-Setup)** | Local development instructions, environment configuration, Docker Compose multi-service deployment, and tests. |

---

## 🌟 Core Value Propositions

### 🎓 For Candidates & Students
- **Zero-Friction Multi-Modal Intake:** Upload PDF resumes and link public GitHub profiles to extract verified skills, repositories, and development metrics.
- **Dynamic Diagnostic Assessments:** Tailored technical evaluations generated on-the-fly by Google Gemini 2.5 Flash, calibrated to candidate experience levels.
- **Verified Skill Dossier:** Earn tamper-evident, percentile-ranked credentials (Skill CIBIL) backed by proctored verification audits.
- **Adaptive Upskilling:** Access dynamically generated curricula targeting specific knowledge gaps uncovered during assessments.

### 🏢 For Recruiters & Hiring Teams
- **Empirical Talent Ranking:** Job applicant pools are automatically ranked using two-sided TF-IDF and cosine similarity against requisition benchmarks.
- **Proctor Integrity Audits:** Review session-level risk scores, tab switch logs, and camera presence flags before extending interviews.
- **Eliminate Resume Fraud:** Replace self-reported keyword stuffing with verified diagnostic scores and concrete GitHub repository analytics.

---

## 📐 System Anatomy at a Glance

```
┌────────────────────────────────────────────────────────┐
│                   CLIENT TIER (BROWSER)                │
│                                                        │
│  React 19 SPA (Vite Dev / Dist Bundles)                │
│  ├── React Router DOM (RoleGuard / ProtectedRoute)     │
│  ├── Zustand Global Stores (AuthStore, ThemeStore)     │
│  ├── ProctorWrapper (React Webcam + Canvas Checks)     │
│  └── Centralized API Client (JWT Refresh & Recovery)   │
└───────────────────────────┬────────────────────────────┘
                            │
               HTTP / JSON  │ Bearer JWT (DRF SimpleJWT)
                            │
┌───────────────────────────▼────────────────────────────┐
│                  BACKEND TIER (DJANGO)                 │
│                                                        │
│  Django 5.2+ REST Framework Monolith                   │
│  ├── apps: accounts, proctor, project, verification    │
│  ├── Celery 5.5 Task Execution Engine                  │
│  ├── LangChain Orchestrator (Google Gemini 2.5 Flash)  │
│  └── scikit-learn TF-IDF Matching Engine               │
└───────────────────────────┬────────────────────────────┘
                            │
             ┌──────────────┴──────────────┐
             ▼                             ▼
   ┌───────────────────┐         ┌───────────────────┐
   │ SQLite / Postgres │         │ Redis (Port 6379) │
   │ Relational State  │         │ Celery Message Bus│
   └───────────────────┘         └───────────────────┘
```

---

## ⚡ Quickstart

Get a local SkillForge instance running in under 2 minutes:

```bash
# 1. Clone repository
git clone https://github.com/GarryMarkus/SkillForge.git
cd SkillForge

# 2. Setup environment variables
cp .env.example .env
# Edit .env and supply your GEMINI_API_KEY

# 3. Launch with concurrent development runner
python run_dev.py
```

Frontend is accessible at `http://localhost:5173` and backend REST API at `http://localhost:8000`. Full interactive Swagger API documentation is available at `http://localhost:8000/api/docs/`.
