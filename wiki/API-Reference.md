# 📡 API Reference & REST Contracts

The SkillForge REST API provides comprehensive endpoints for authentication, live proctoring telemetry, asynchronous assessment generation, upskilling modules, and recruiter job matching.

All requests and responses use `application/json` (except multi-part file uploads). Protected endpoints require a valid JSON Web Token:
`Authorization: Bearer <access_token>`

---

## 1. Authentication & Profiles (`/api/accounts/`)

### Register Account
- **Endpoint:** `POST /api/accounts/auth/register/`
- **Access:** Public
- **Request Body:**
  ```json
  {
    "username": "alexdev",
    "email": "alex@example.com",
    "password": "SecurePassword123!",
    "role": "student"
  }
  ```
- **Response:** `201 Created` returning user object and JWT token pair (`access`, `refresh`).

### Login
- **Endpoint:** `POST /api/accounts/auth/login/`
- **Access:** Public
- **Request Body:**
  ```json
  {
    "email": "alex@example.com",
    "password": "SecurePassword123!"
  }
  ```
- **Response:** `200 OK`
  ```json
  {
    "access": "eyJhbGciOi...",
    "refresh": "eyJhbGciOi...",
    "user": {
      "id": 4,
      "username": "alexdev",
      "email": "alex@example.com",
      "role": "student"
    }
  }
  ```

### Refresh Access Token
- **Endpoint:** `POST /api/accounts/auth/token/refresh/`
- **Access:** Public
- **Request Body:**
  ```json
  {
    "refresh": "eyJhbGciOi..."
  }
  ```
- **Response:** `200 OK` returning new `access` token.

### Upload Resume
- **Endpoint:** `POST /api/accounts/upload-resume/`
- **Access:** Authenticated (`student`)
- **Headers:** `Content-Type: multipart/form-data`
- **Body:** `resume` (PDF binary file, max 5MB)
- **Response:** `200 OK` returning extracted skills array and parsed summary.

---

## 2. Proctoring & Telemetry (`/api/proctor/`)

### Ingest Proctoring Violation Event
- **Endpoint:** `POST /api/proctor/events/`
- **Access:** Authenticated (`student`)
- **Request Body:**
  ```json
  {
    "session_id": "8fa1-419b-a01c",
    "event_type": "TAB_BLUR",
    "unverified_duration_seconds": 4.5,
    "timestamp": "2026-10-28T09:30:00Z"
  }
  ```
- **Response:** `201 Created`
  ```json
  {
    "status": "recorded",
    "cumulative_risk_score": 15,
    "risk_level": "LOW"
  }
  ```

### Get Proctoring Session Audit
- **Endpoint:** `GET /api/proctor/sessions/<session_id>/`
- **Access:** Authenticated (`client`, `admin`, owning `student`)
- **Response:** `200 OK` returning full event log, risk metrics, and integrity breakdown.

---

## 3. Assessments & Verification (`/api/verification/`)

### Trigger Assessment Generation
- **Endpoint:** `POST /api/verification/assessments/generate/`
- **Access:** Authenticated (`student`)
- **Request Body:**
  ```json
  {
    "role_archetype": "Full Stack Engineer",
    "difficulty": "Mid"
  }
  ```
- **Response:** `202 Accepted` returning Celery `task_id` for polling:
  ```json
  {
    "status": "PENDING",
    "task_id": "c135-42bf-90ab-1299"
  }
  ```

### Poll Celery Task Status
- **Endpoint:** `GET /api/verification/tasks/<task_id>/`
- **Access:** Authenticated
- **Response:** `200 OK`
  ```json
  {
    "task_id": "c135-42bf-90ab-1299",
    "status": "SUCCESS",
    "result": {
      "assessment_id": 18,
      "total_questions": 10,
      "duration_minutes": 30
    }
  }
  ```

### Submit Assessment Answers
- **Endpoint:** `POST /api/verification/assessments/submit/`
- **Access:** Authenticated (`student`)
- **Request Body:**
  ```json
  {
    "assessment_id": 18,
    "answers": [
      { "question_id": 1, "selected_option": 0 },
      { "question_id": 2, "selected_option": 2 }
    ]
  }
  ```
- **Response:** `200 OK` returning score breakdown, percentile ranking, and generated Skill CIBIL updates.

---

## 4. Jobs & Candidate Matching (`/api/project/`)

### List Active Requisitions
- **Endpoint:** `GET /api/project/jobs/`
- **Access:** Public / Authenticated

### Create Job Requisition
- **Endpoint:** `POST /api/project/jobs/`
- **Access:** Authenticated (`client`)
- **Request Body:**
  ```json
  {
    "title": "Senior React & Django Engineer",
    "required_skills": ["React", "Django", "PostgreSQL", "Docker"],
    "experience_years": 3,
    "description": "Looking for a full stack engineer to build verified talent pipelines."
  }
  ```

### Get Ranked Applicants (TF-IDF Cosine Similarity)
- **Endpoint:** `GET /api/project/jobs/<job_id>/applicants/`
- **Access:** Authenticated (`client` owner of the job)
- **Response:** `200 OK`
  ```json
  [
    {
      "applicant_id": 4,
      "name": "Alex Chen",
      "match_percentage": 94.2,
      "skill_cibil_score": 820,
      "percentile": 96.5,
      "proctor_risk_level": "LOW",
      "application_status": "REVIEWING"
    }
  ]
  ```

### Update Application Status
- **Endpoint:** `PATCH /api/project/applications/<application_id>/status/`
- **Access:** Authenticated (`client`)
- **Request Body:**
  ```json
  {
    "status": "SHORTLISTED"
  }
  ```
