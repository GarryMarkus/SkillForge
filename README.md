<h1 align="center">
  <img 
    src="./assets/logosvg.svg" 
    alt="SkillForge Logo" 
    width="36"
    style="vertical-align: middle; margin-right: 10px;"
  />
  SkillForge
</h1>

<p align="center">
  <strong>Professional Skill Verification & Job Matching Platform</strong>
</p>

**Bridging the Gap Between Learning and Earning**

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-10.16.16-FF0055?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[🚀 Live Demo](#) • [📖 Documentation](#documentation) • [🎯 Features](#features) • [💻 Installation](#installation)

</div>

---

## 📑 Table of Contents

- Overview
- Screenshots
- System Architecture
- Key Features
- Technology Stack
- User Flows
- Installation & Setup
- Project Structure
- API Integration
- Security Features
- Proctoring System
- Dashboard & Portfolio
- Job Matching System
- Configuration
- Development Guide
- Deployment
- Contributing
- License

---

## 📸 Screenshots

### Loader Page:
![Loader](./assets/loader.png)

### Home Page:
![Home Page](./assets/homepage.png)

### User Selection Page:
![User Page](./assets/userpage.png)

### User Profile Page:
![User Profile](./assets/userprofile.png)

### Browse Job Section:
![Browser Job Section](./assets/browsejobsection.png)

### Learning Page:
![Learning Page](./assets/learningpage.png)


---
## 🌟 Overview

**SkillForge** is a comprehensive platform that transforms learners into verified, job-ready professionals through AI-powered skill verification, adaptive learning paths, and intelligent job matching. Our platform serves both students/learners and clients/recruiters, providing a seamless bridge between education and employment.

### 🎯 Mission

Transform learners into the **top 1%** of verified talent through:
- 🎓 **AI-Personalized Learning Paths**
- 🛡️ **Blockchain-Verified Credentials**
- 📊 **Living Professional Identity (Skill CIBIL Score)**
- 🤝 **Smart Job Matching with Top Startups**

### 👥 Target Users

1. **Students/Learners** - Individuals seeking to upskill, verify their expertise, and land jobs
2. **Clients/Recruiters** - Companies looking for verified, job-ready talent

---

## 🏗️ System Architecture

### Website Flowchart:
![SkillForge Architecture](./assets/skillforge-flow.png)

### Website Flow Overview:

```
┌─────────────────────────────────────────────────────────────────┐
│                        LANDING PAGE                             │
│                  (Public Marketing Site)                        │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                   AUTHENTICATION PAGE                           │
│              (Role-Based Login/Signup)                          │
└───────────┬─────────────────────────┬───────────────────────────┘
            │                         │
            ▼                         ▼
┌───────────────────────┐   ┌────────────────────────┐
│   STUDENT/LEARNER     │   │   CLIENT/RECRUITER     │
│       PATH            │   │        PATH            │
└───────────────────────┘   └────────────────────────┘
```

### Detailed Component Architecture

```
SkillForge Platform
│
├── Frontend (React 18 + Vite)
│   ├── Landing Page
│   ├── Authentication System
│   ├── Student Portal
│   │   ├── Onboarding (CV/Resume/GitHub)
│   │   ├── Dashboard/Portfolio
│   │   ├── Learning Paths
│   │   ├── Proctored Assessments
│   │   ├── Skill Verification
│   │   └── Job Browser
│   └── Recruiter Portal
│       ├── Onboarding (Company Details)
│       ├── Job Posting
│       ├── Candidate Matching
│       ├── Applicant Review
│       └── Tracking System
│
├── Backend API
│   ├── Authentication (JWT)
│   ├── User Management
│   ├── Exam/Assessment Engine
│   ├── Proctoring Service
│   ├── Portfolio Generator
│   ├── Job Matching Algorithm
│   └── Analytics Engine
│
└── Infrastructure
    ├── Database (PostgreSQL/MongoDB)
    ├── File Storage (AWS S3/Cloudinary)
    ├── Blockchain Integration (Credentials)
    └── AI/ML Services (Matching, Proctoring)
```

---

## ✨ Key Features

### 🎓 For Students/Learners

#### 1. **Intelligent Onboarding**
- 📄 CV/Resume upload and parsing
- 💻 GitHub portfolio integration
- 🔗 LinkedIn profile import
- 🎯 Skill extraction and analysis

#### 2. **Personalized Learning Dashboard**
- 📊 Skill CIBIL Score (Dynamic Professional Reputation)
- 🔥 Learning streak tracking (Duolingo-style)
- 📈 Progress visualization
- 🎯 Adaptive roadmap generation
- 🏆 Achievement badges

#### 3. **Proctored Assessment System**
- 📹 Real-time video monitoring
- 🛡️ AI-powered cheating detection
  - Tab switching detection
  - Face recognition
  - Multiple person detection
  - Audio anomaly detection
- 📊 Risk scoring and analytics
- 🔒 Secure exam environment

#### 4. **Skill Verification & Credentials**
- ✅ Blockchain-verified certificates
- 🏅 Portfolio generation
- 📊 Skill assessment reports
- 🎯 Proof-of-work feed

#### 5. **Job Discovery & Application**
- 🔍 Browse curated job listings
- 🤖 AI-powered job recommendations
- 📝 One-click applications
- 📊 Application tracking

### 🏢 For Clients/Recruiters

#### 1. **Streamlined Onboarding**
- 🏢 Company profile setup
- 📋 Form-based information collection
- ✅ Verification process

#### 2. **Smart Job Posting**
- 📝 Create detailed job listings
- 🎯 Skill requirement specification
- 💰 Salary range definition
- 📅 Timeline management

#### 3. **AI-Powered Candidate Matching**
- 🤖 Schematic similarity-based sorting
- 📊 Skill compatibility scoring
- 🔍 Advanced filtering
- 📈 Candidate ranking

#### 4. **Applicant Management**
- 👥 Review applied students
- 📊 View detailed portfolios
- ✅ Skill verification status
- 💬 Direct communication

#### 5. **Tracking & Analytics**
- 📈 Application statistics
- 👀 Job post performance
- 📊 Hiring funnel analytics
- 🎯 Time-to-hire metrics

---

## 🛠️ Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2.0 | UI framework |
| **Vite** | 5.0.8 | Build tool & dev server |
| **Framer Motion** | 10.16.16 | Animations & transitions |
| **Lucide React** | 0.263.1 | Icon library (2.5px stroke) |

### Design System

| Element | Specification |
|---------|--------------|
| **Typography** | Bricolage Grotesque (900 weight) for headings, DM Sans for body |
| **Color Palette (Light)** | Canvas: #FDF8F1, Cards: #FFFFFF, Accent: #3B82F6 |
| **Color Palette (Dark)** | Canvas: #0D0D0D, Cards: #1A1A1A, Accent: #10B981 |
| **Border Radius** | 3rem (48px) for cards, 2rem for components |
| **Button Style** | Pill-shaped with 3px border, 3D shadow effect |

### Backend Integration

| Service | Purpose |
|---------|---------|
| **RESTful API** | Main backend communication |
| **JWT Authentication** | Secure user sessions |
| **WebSocket** | Real-time proctoring events |
| **File Upload API** | CV/Resume/Document handling |

### Proctoring Technology

| Feature | Implementation |
|---------|---------------|
| **Video Capture** | WebRTC MediaDevices API |
| **Face Detection** | AI/ML model integration |
| **Event Tracking** | Real-time event logging |
| **Risk Scoring** | Algorithmic confidence scoring |

---

## 👤 User Flows

### Student/Learner Journey

```
1. Landing Page
   ↓
2. Sign Up / Login (Student Role)
   ↓
3. Onboarding
   ├─ Upload CV/Resume
   ├─ Connect GitHub
   └─ Import LinkedIn
   ↓
4. Data Parsing & Extraction
   ↓
5. Dashboard Generation
   ├─ Skill CIBIL Score
   ├─ Learning Roadmap
   └─ Recommended Paths
   ↓
6. Learning & Assessment
   ├─ Complete Projects
   ├─ Take Proctored Tests
   └─ Earn Verifications
   ↓
7. Portfolio Building
   ├─ Auto-generated Dashboard
   └─ Verified Credentials
   ↓
8. Job Discovery
   ├─ Browse Jobs
   ├─ Get Recommendations
   └─ Apply with One Click
   ↓
9. Career Success
```

### Recruiter Journey

```
1. Landing Page
   ↓
2. Sign Up / Login (Recruiter Role)
   ↓
3. Company Onboarding
   ├─ Company Details
   ├─ Verification
   └─ Profile Setup
   ↓
4. Job Posting
   ├─ Create Job Listing
   ├─ Define Requirements
   └─ Set Criteria
   ↓
5. Candidate Matching
   ├─ AI Sorting by Similarity
   ├─ Review Top Matches
   └─ View Detailed Profiles
   ↓
6. Applicant Review
   ├─ Check Skill Verifications
   ├─ Review Portfolios
   └─ Access Assessments
   ↓
7. Hiring Process
   ├─ Contact Candidates
   ├─ Schedule Interviews
   └─ Make Offers
   ↓
8. Tracking & Analytics
   ├─ Monitor Applications
   ├─ Track Performance
   └─ Optimize Hiring
```

---

## 💻 Installation & Setup

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn**
- **Git**
- Modern web browser (Chrome, Firefox, Edge, Safari)

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/skillforge/skillforge-platform.git
cd skillforge-platform

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env with your configuration

# 4. Start development server
npm run dev

# 5. Open browser
# Navigate to http://localhost:5173
```

### Environment Variables

Create a `.env` file in the root directory:

```bash
# API Configuration
VITE_API_BASE_URL=http://127.0.0.1:8000/api

# Proctoring Service
VITE_PROCTOR_ENABLED=true
VITE_PROCTOR_FACE_DETECTION_INTERVAL=20000

# Feature Flags
VITE_ENABLE_GITHUB_INTEGRATION=true
VITE_ENABLE_LINKEDIN_IMPORT=true
VITE_ENABLE_BLOCKCHAIN_VERIFICATION=true

# Analytics
VITE_ANALYTICS_ID=your-analytics-id

# File Upload
VITE_MAX_FILE_SIZE=10485760  # 10MB
VITE_ALLOWED_FILE_TYPES=.pdf,.doc,.docx

# Job Matching
VITE_MATCHING_ALGORITHM=semantic-similarity
VITE_MIN_MATCH_SCORE=0.7
```

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build
npm run preview

# Output will be in the /dist directory
```

---

## 📁 Project Structure

```
skillforge-platform/
├── public/                      # Static assets
│   ├── assets/
│   │   └── skillforge-flow.png
│   └── vite.svg
│
├── src/                         # Source code
│   ├── components/              # React components
│   │   ├── landing/
│   │   │   ├── Hero.jsx
│   │   │   ├── TrustBar.jsx
│   │   │   ├── Pipeline.jsx
│   │   │   ├── SkillCIBIL.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   └── FinalCTA.jsx
│   │   │
│   │   ├── auth/
│   │   │   ├── LoginScreen.jsx
│   │   │   ├── SignupScreen.jsx
│   │   │   └── RoleSelector.jsx
│   │   │
│   │   ├── student/
│   │   │   ├── Onboarding.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── LearningRoadmap.jsx
│   │   │   ├── Portfolio.jsx
│   │   │   └── JobBrowser.jsx
│   │   │
│   │   ├── recruiter/
│   │   │   ├── CompanyOnboarding.jsx
│   │   │   ├── JobPosting.jsx
│   │   │   ├── CandidateMatching.jsx
│   │   │   ├── ApplicantReview.jsx
│   │   │   └── TrackingDashboard.jsx
│   │   │
│   │   ├── proctor/
│   │   │   ├── VideoMonitor.jsx
│   │   │   ├── EventLog.jsx
│   │   │   ├── ProctoringSession.jsx
│   │   │   └── ExamSelector.jsx
│   │   │
│   │   └── shared/
│   │       ├── Header.jsx
│   │       ├── Footer.jsx
│   │       ├── ThemeToggle.jsx
│   │       └── AnimatedCard.jsx
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useProctor.js
│   │   ├── useTheme.js
│   │   └── useAPI.js
│   │
│   ├── services/                # API & services
│   │   ├── api.js              # Main API service
│   │   ├── auth.service.js
│   │   ├── exam.service.js
│   │   ├── proctor.service.js
│   │   └── job.service.js
│   │
│   ├── utils/                   # Utility functions
│   │   ├── constants.js
│   │   ├── validators.js
│   │   └── helpers.js
│   │
│   ├── styles/                  # Global styles
│   │   └── index.css
│   │
│   ├── App.jsx                  # Main App component
│   └── main.jsx                 # Entry point
│
├── docs/                        # Documentation
│   ├── API_DOCUMENTATION.md
│   ├── SETUP_GUIDE.md
│   └── CONTRIBUTING.md
│
├── .env.example                 # Environment template
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── LICENSE
```

---

## 🔌 API Integration

### Authentication Endpoints

```javascript
// Login
POST /api/auth/login/
Body: { username, password }
Response: { access, refresh, user }

// Logout
POST /api/auth/logout/
Headers: { Authorization: Bearer <token> }

// Refresh Token
POST /api/auth/refresh/
Body: { refresh }
Response: { access }
```

### Exam & Assessment Endpoints

```javascript
// Get Exam List
GET /api/list/
Headers: { Authorization: Bearer <token> }
Response: [{ id, name, duration, questions }]

// Start Exam
POST /api/start/
Body: { exam_id }
Response: { session_id, exam, start_time }

// Submit Exam
POST /api/submit/
Body: { session_id, answers }
Response: { score, results }
```

### Proctoring Endpoints

```javascript
// Send Event
POST /api/event/
Body: { 
  session_id, 
  event_type,      // TAB_SWITCH, NO_FACE, MULTIPLE_FACES, etc.
  confidence,      // 0.0 to 1.0
  timestamp,
  metadata 
}
Response: { risk, event_id }

// Get Event History
GET /api/events/:sessionId/
Response: [{ id, type, confidence, timestamp, risk }]
```

### Job Matching Endpoints

```javascript
// Get Job Listings
GET /api/jobs/
Query: { skill, location, salary_min, salary_max }
Response: [{ id, title, company, requirements }]

// Post Job (Recruiter)
POST /api/jobs/
Body: { title, description, requirements, salary_range }
Response: { job_id, status }

// Get Matched Candidates
GET /api/jobs/:jobId/matches/
Response: [{ user_id, match_score, skills, portfolio }]

// Apply to Job (Student)
POST /api/jobs/:jobId/apply/
Body: { cover_letter, portfolio_link }
Response: { application_id, status }
```

### Portfolio & Analytics

```javascript
// Generate Portfolio
POST /api/portfolio/generate/
Body: { user_id }
Response: { portfolio_url, skill_score }

// Get Analytics
GET /api/analytics/user/:userId/
Response: { 
  skill_cibil_score,
  learning_streak,
  verified_skills,
  job_applications
}
```

### Complete API Usage Example

```javascript
import API from './services/api';

// 1. Authenticate
const loginResult = await API.Auth.login('username', 'password');

// 2. Get exams
const examsResult = await API.Exam.getExamList();

// 3. Start exam
const startResult = await API.Exam.startExam(examId);

// 4. Send proctoring events
await API.Proctor.sendEvent(
  sessionId, 
  'TAB_SWITCH', 
  1.0,
  { source: 'visibility-api' }
);

// 5. Browse jobs
const jobsResult = await API.Job.getJobs({ skill: 'React' });

// 6. Apply to job
await API.Job.apply(jobId, { 
  coverLetter: '...',
  portfolioLink: '...' 
});
```

---

## 🔒 Security Features

### Authentication & Authorization

- ✅ **JWT-based authentication** with access and refresh tokens
- ✅ **Role-based access control** (Student, Recruiter, Admin)
- ✅ **Secure password hashing** (bcrypt)
- ✅ **HTTPS enforcement** in production
- ✅ **CORS protection** with whitelisted origins

### Proctoring Security

- 🛡️ **Real-time monitoring** with WebRTC
- 🎥 **Encrypted video streams**
- 📊 **Tamper-proof event logging**
- 🔒 **Secure session management**
- 📝 **Audit trail** for all proctoring events

### Data Protection

- 🔐 **End-to-end encryption** for sensitive data
- 💾 **Secure file storage** with S3/Cloudinary
- 🗄️ **Database encryption at rest**
- 🚫 **XSS protection** via Content Security Policy
- 🛡️ **SQL injection prevention** via parameterized queries

### Privacy Compliance

- ✅ GDPR compliant
- ✅ Data anonymization options
- ✅ User data export/deletion
- ✅ Cookie consent management
- ✅ Privacy policy enforcement

---

## 📹 Proctoring System

### Event Types & Detection

| Event Type | Description | Confidence | Risk Impact |
|------------|-------------|-----------|-------------|
| **TAB_SWITCH** | User switched browser tab/window | 1.0 | High |
| **NO_FACE** | No face detected in video feed | 0.5-0.9 | Medium-High |
| **MULTIPLE_FACES** | Multiple people detected | 0.7-1.0 | High |
| **LOOKING_AWAY** | User not looking at screen | 0.4-0.7 | Medium |
| **AUDIO_DETECTED** | Unexpected audio/voice detected | 0.6-0.9 | Medium-High |

### Risk Scoring Algorithm

```javascript
Risk Level = (
  (Event Count × Event Weight) + 
  (Confidence Score × 0.3) + 
  (Time Factor × 0.2)
) / 100

Risk Categories:
- Low Risk: 0-0.39 (Green)
- Medium Risk: 0.40-0.69 (Yellow)
- High Risk: 0.70-1.00 (Red)
```

### Proctoring Features

1. **Video Monitoring**
   - Real-time webcam feed
   - Face detection and tracking
   - Recording indicator
   - Camera permission handling

2. **Event Tracking**
   - Automatic event detection
   - Manual event triggers (testing)
   - Timestamp logging
   - Event history

3. **Analytics Dashboard**
   - Live risk score
   - Event counter
   - Event log with filtering
   - Session statistics

4. **Security Measures**
   - Tab switching detection
   - Window blur monitoring
   - Fullscreen enforcement (optional)
   - Copy-paste blocking (optional)

---

## 📊 Dashboard & Portfolio

### Student Dashboard Features

#### Skill CIBIL Score
- **Range:** 0-1000 points
- **Calculation Factors:**
  - Technical Skills (35%)
  - Project Quality (30%)
  - Peer Reviews (20%)
  - Learning Consistency (15%)
- **Updates:** Real-time based on verified achievements

#### Learning Streak
- Daily activity tracking
- Duolingo-style flame icon
- Motivation system
- Streak recovery options

#### Activity Heatmap
- 12-month visualization
- Contribution graph style
- Hover tooltips with activity count
- Color intensity based on activity level

#### Adaptive Roadmap
- Personalized learning path
- Skill modules with status (completed/current/locked)
- Verification gates
- Progress tracking

#### Verified Badges
- React Expert, Node.js Pro, AWS Certified, etc.
- Blockchain-verified credentials
- Shareable on LinkedIn/GitHub
- QR code for verification

### Portfolio Generation

**Auto-generated sections:**
- Personal information
- Skill CIBIL Score (prominent display)
- Verified skills with badges
- Project showcase
- Assessment results
- Proof-of-work feed
- Recommendations

**Customization options:**
- Theme selection
- Section ordering
- Privacy controls
- Download as PDF

---

## 🤖 Job Matching System

### Matching Algorithm

```
Semantic Similarity Scoring

1. Extract Skills from Job Description
   ↓
2. Extract Skills from Student Portfolio
   ↓
3. Calculate Similarity Score
   - Exact Match: 1.0
   - Synonym Match: 0.9
   - Related Skill: 0.7-0.8
   - No Match: 0.0
   ↓
4. Weighted Scoring
   - Required Skills: 50%
   - Preferred Skills: 30%
   - Experience Level: 20%
   ↓
5. Rank Candidates by Total Score
```

### Matching Features

**For Students:**
- 🎯 Personalized job recommendations
- 📊 Match score visibility (0-100%)
- 🔍 Skill gap analysis
- 💡 Improvement suggestions

**For Recruiters:**
- 🤖 AI-sorted candidate list
- 📈 Match score per candidate
- 🔍 Advanced filtering
- 📊 Batch candidate comparison

### Application Tracking

**Student View:**
- Application status (Pending/Under Review/Shortlisted/Rejected)
- Application date
- Company response time
- Interview scheduling

**Recruiter View:**
- Total applications
- Shortlisted candidates
- Interview scheduled
- Offers made
- Time-to-hire metrics

---

## ⚙️ Configuration

### Theme Configuration

```javascript
// Light Mode Colors
const lightTheme = {
  canvas: '#FDF8F1',
  cardBg: '#FFFFFF',
  textPrimary: '#2D1B14',
  textSecondary: '#6B5B52',
  accentBlue: '#3B82F6',
  accentGreen: '#10B981',
  accentYellow: '#FDE047'
};

// Dark Mode Colors
const darkTheme = {
  canvas: '#0D0D0D',
  cardBg: '#1A1A1A',
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0A0',
  accentBlue: '#60A5FA',
  accentGreen: '#34D399',
  accentOrange: '#FB923C'
};
```

### Feature Flags

```javascript
// In .env or config.js
const featureFlags = {
  enableProctoring: true,
  enableGitHubSync: true,
  enableLinkedInImport: true,
  enableBlockchainVerification: true,
  enableJobMatching: true,
  enablePortfolioGeneration: true,
  enableAnalytics: true
};
```

### API Configuration

```javascript
// In api.js
const API_CONFIG = {
  BASE_URL: process.env.VITE_API_BASE_URL,
  TIMEOUT: 30000,
  RETRY: {
    maxAttempts: 3,
    delay: 1000,
    backoffMultiplier: 2
  }
};
```

---

## 🛠️ Development Guide

### Code Style

- **JavaScript:** ES6+ with JSX
- **Naming:** camelCase for variables, PascalCase for components
- **Comments:** JSDoc for functions, inline for complex logic
- **Formatting:** Prettier with 2-space indentation

### Component Guidelines

```javascript
// Component template
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Component description
 * @param {Object} props - Component props
 * @param {string} props.title - Title text
 * @param {Function} props.onAction - Callback function
 */
const MyComponent = ({ title, onAction }) => {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Side effects
  }, [dependencies]);

  return (
    <motion.div 
      className="component-class"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Component content */}
    </motion.div>
  );
};

export default MyComponent;
```

### Testing

```bash
# Run unit tests
npm run test

# Run with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: Add new feature"

# Push to remote
git push origin feature/new-feature

# Create pull request on GitHub
```

### Commit Message Convention

```
feat: Add new feature
fix: Bug fix
docs: Documentation update
style: Code style changes
refactor: Code refactoring
test: Add tests
chore: Build/tooling changes
```

---

## 🚀 Deployment

### Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod

# Set environment variables
vercel env add VITE_API_BASE_URL production
```

### Netlify Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

```bash
# Build Docker image
docker build -t skillforge:latest .

# Run container
docker run -p 5173:5173 skillforge:latest
```

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - uses: vercel/actions@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

---

## 📈 Performance Optimization

### Code Splitting

```javascript
// Lazy loading components
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const Proctor = React.lazy(() => import('./components/Proctor'));

// Usage with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <Dashboard />
</Suspense>
```

### Optimization Checklist

- ✅ Lazy load routes and heavy components
- ✅ Use React.memo for expensive renders
- ✅ Implement virtualization for long lists
- ✅ Optimize images (WebP, lazy loading)
- ✅ Minimize bundle size (tree shaking)
- ✅ Use CDN for static assets
- ✅ Enable compression (gzip/brotli)
- ✅ Implement service worker caching

### Performance Metrics

| Metric | Target | Current |
|--------|--------|---------|
| First Contentful Paint | <1.5s | 1.2s |
| Time to Interactive | <3.5s | 2.8s |
| Largest Contentful Paint | <2.5s | 2.1s |
| Cumulative Layout Shift | <0.1 | 0.05 |
| Total Bundle Size | <300KB | 245KB |

---

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Review Process

- All submissions require review from 2+ maintainers
- CI/CD checks must pass
- Code coverage must be maintained/improved
- Documentation must be updated

---

## 📞 Support & Contact

- **Documentation:** [docs.skillforge.com](https://docs.skillforge.com)
- **Email:** support@skillforge.com
- **Discord:** [Join our community](https://discord.gg/skillforge)
- **Twitter:** [@SkillForge](https://twitter.com/skillforge)
- **Issue Tracker:** [GitHub Issues](https://github.com/skillforge/issues)

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 SkillForge

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---
