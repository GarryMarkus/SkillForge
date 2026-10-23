# SkillForge Frontend (React 19 + Vite)

The `client/` workspace contains the single-page application (SPA) for SkillForge, built with React 19, Vite 7, Tailwind CSS, Zustand, and Framer Motion. It delivers an intuitive, human-centric user interface designed for both candidates undergoing empirical skill evaluations and enterprise recruiters reviewing verified talent portfolios.

---

## Directory Architecture

```
client/
├── public/
│   ├── favicon.svg             # CAD blueprint vector favicon (viewBox 0 0 32 32)
│   └── favicon.ico             # Fallback browser icon
├── src/
│   ├── api/
│   │   └── client.js           # API facade exposing api client & useTaskStatus hook
│   ├── components/
│   │   ├── assessment/         # AssessmentHeader, OptionsMatrix, ProctorTelemetryPanel, ProctorWrapper
│   │   ├── auth/               # LoginForm, RegisterWizard (4-step onboarding), AuthLayout
│   │   ├── client/             # ActiveJobsTableBlock, ApplicantRankingsGrid, ClientHeader, RequisitionActionBar
│   │   ├── common/             # ErrorBoundary.jsx (global runtime exception boundary)
│   │   ├── guards/             # ProtectedRoute and RoleGuard RBAC navigation shields
│   │   ├── layout/             # Navbar (with multi-tab routing & status), Footer
│   │   ├── modals/             # JobPostModal, CandidateDossierModal
│   │   ├── onboarding/         # ResumeUploadZone (drag-and-drop PDF validator), StageProgressIndicator
│   │   ├── sections/           # HeroSection, CapabilitiesGrid, BlueprintSpecSection, PersonaSplitSection
│   │   ├── student/            # StudentHeader, StudentSidebar, MatchedPositionsGrid, VerificationProfileBlock
│   │   ├── ui/                 # Reusable UI primitives (Button, Input, Card, Badge, Loader)
│   │   │   └── animations/     # Mechanical animation primitives:
│   │   │       ├── DecryptedText.jsx       # Monospace text scramble/decrypt hook
│   │   │       ├── CadGridBackground.jsx   # Interactive drafting canvas with pointer proximity
│   │   │       ├── BorderBeam.jsx          # Border hairline light beam effect
│   │   │       ├── CounterTicker.jsx       # Monospace mechanical odometer / ticker
│   │   │       └── MagneticButton.jsx      # Tactile pointer-displacement button wrapper
│   │   └── upskill/            # MarkdownContentReader, ModuleCompletionActions
│   ├── hooks/
│   │   └── useTaskStatus.js    # Resilient Celery task polling hook with exponential backoff & refs
│   ├── lib/
│   │   ├── api.js              # Centralized JWT fetch client with silent refresh & offline resilience
│   │   └── cn.js               # ClassName utility (clsx + tailwind-merge)
│   ├── pages/
│   │   ├── client/             # ClientOnboarding.jsx
│   │   ├── dashboard/          # StudentDashboard.jsx, ClientDashboard.jsx
│   │   ├── student/            # AssessmentPage.jsx, PersonalityTest.jsx, StudentOnboarding.jsx, UpskillPage.jsx
│   │   ├── AuthPage.jsx        # Unified login & multi-step registration page
│   │   ├── HowItWorksPage.jsx  # Dedicated guidance view ("For Job Seekers" / "For Employers")
│   │   └── LandingPage.jsx     # High-conversion public marketing landing page
│   ├── store/
│   │   ├── authStore.js        # Zustand authentication store (session, role, tokens, updateTokens)
│   │   └── themeStore.js       # Zustand theme preferences
│   ├── App.jsx                 # React Router routing table with route protection
│   ├── main.jsx                # Application root with StrictMode & ErrorBoundary wrapper
│   └── index.css               # Global Tailwind CSS and custom typography styles
├── .env.example                # Frontend environment variable template
├── Dockerfile                  # Multi-stage production build container (Node 20 + Nginx)
├── nginx.conf                  # Nginx SPA fallback routing configuration
├── eslint.config.js            # ESLint 9 configuration with React 19 rules
├── package.json                # Frontend package manifest
└── vite.config.js              # Vite bundler configuration
```

---

## Key Features & User Experience Standard

- **Human-Centric, Minimalist Aesthetic**: Designed for clarity, relaxation, and ease of use. Clean off-white and cobalt palette (`#FAFAFA`, `#1D52B8`), generous whitespace, and readable typography without terminal brackets or robotic jargon.
- **Top-Level Error Boundary**: Catches runtime JavaScript exceptions anywhere in the component tree, providing a reassuring recovery screen ("Reload page" / "Try again" / "Return to Home") and collapsible technical diagnostics in development.
- **Offline & Network Resilience**: [`src/lib/api.js`](src/lib/api.js) intercepts network drops and offline states, returning structured `NetworkErrorResponse` objects with friendly messages instead of unhandled promise rejections.
- **Hardware & Stream Cleanup**: [`ProctorWrapper.jsx`](src/components/assessment/ProctorWrapper.jsx) explicitly stops all webcam `MediaStream` hardware tracks (`track.stop()`) and frees canvas memory upon unmount, preventing browser indicator lights from remaining active.
- **Clean Fullscreen Management**: [`AssessmentPage.jsx`](src/pages/student/AssessmentPage.jsx) cleanly exits fullscreen mode when the test concludes or the candidate navigates away.
- **Dynamic Task Polling**: [`useTaskStatus`](src/hooks/useTaskStatus.js) handles asynchronous Celery report generation and AI test drafting with automatic retry policies and cancellation on unmount.

---

## Prerequisites

- **Node.js**: 20.x or higher
- **Package Manager**: npm 10.x or higher

---

## Local Setup & Development

### 1. Install Dependencies
```bash
cd client
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Default configuration:
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### 3. Launch Development Server
```bash
npm run dev
```
The application will be live at `http://localhost:5173`.

---

## Quality & Production Commands

```bash
# Run ESLint across all JavaScript/JSX files
npm run lint

# Compile optimized production bundle to dist/
npm run build

# Preview production build locally
npm run preview
```
