# 🚀 Deployment & Local Setup Guide

This guide covers setting up SkillForge for local development, configuring environment variables, running database migrations, and executing multi-container deployments with Docker Compose.

---

## 1. Prerequisites

Ensure you have the following installed on your machine:
- **Python:** 3.11 or higher
- **Node.js:** 20.x or higher (`npm` 10+)
- **Redis:** 7.x (or run via Docker)
- **Git**
- **Google Gemini API Key:** Obtainable from [Google AI Studio](https://aistudio.google.com/)

---

## 2. Environment Variables Configuration

Copy the example environment template into `.env` files for both the root and server:

```bash
# In the repository root:
cp .env.example .env
```

### Complete Environment Matrix

| Variable | Location | Required | Default / Example | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `GEMINI_API_KEY` | Server `.env` | **Yes** | `AIzaSy...` | Required for LangChain Gemini 2.5 Flash assessment and module synthesis. |
| `SECRET_KEY` | Server `.env` | No | Random 50+ chars | Django cryptographic signing key. |
| `DJANGO_DEBUG` | Server `.env` | No | `True` | Toggles Django debug mode. Set to `False` in production. |
| `REDIS_URL` | Server `.env` | No | `redis://localhost:6379/0` | Connection string for Celery task broker and result backend. |
| `CORS_ALLOWED_ORIGINS` | Server `.env` | No | `http://localhost:5173` | Allowed origins for React client cross-origin HTTP requests. |
| `VITE_API_BASE_URL` | Client `.env` | No | `http://localhost:8000` | Target base URL for frontend API client calls. |

---

## 3. Option A: Local Development Setup (Recommended)

SkillForge provides a unified concurrent development runner (`run_dev.py`) that manages both the Django backend and Vite frontend within a single terminal:

### Step 1: Backend Setup
```bash
# Create and activate Python virtual environment
python3 -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate

# Install backend dependencies
pip install -r requirements.txt

# Run initial migrations and seed demo data
python server/manage.py migrate
python server/manage.py seed_demo_data
```

### Step 2: Frontend Setup
```bash
# Navigate to client and install dependencies
cd client
npm install
cd ..
```

### Step 3: Launch Concurrently
```bash
# Run both servers with unified colored terminal logging
python run_dev.py
```

- **Frontend Client:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:8000](http://localhost:8000)
- **Interactive Swagger Docs:** [http://localhost:8000/api/docs/](http://localhost:8000/api/docs/)

---

## 4. Option B: Docker Compose Deployment

To run the complete production-identical stack (Redis, Backend API, Celery Worker, and Nginx-backed Frontend SPA) in containers:

```bash
# Ensure .env is populated with your GEMINI_API_KEY
docker compose up --build
```

### Container Topology

| Container Name | Service | Port Mapping | Healthcheck |
| :--- | :--- | :--- | :--- |
| `skillforge_redis` | Redis 7 Alpine | `6379:6379` | `redis-cli ping` |
| `skillforge_backend` | Django Gunicorn | `8000:8000` | Depends on Redis healthy |
| `skillforge_worker` | Celery Worker | N/A (Internal) | Depends on Backend started |
| `skillforge_frontend` | Nginx SPA Server | `5173:80` | Serves optimized React dist bundle |

To stop all containers:
```bash
docker compose down
```

---

## 5. Automated Testing

Run the test suite across both frontend and backend to verify platform integrity:

```bash
# Run full project tests
npm test

# Run Django backend unit & integration tests only
python server/manage.py test

# Run client linter
cd client && npm run lint
```
