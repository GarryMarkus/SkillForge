# SkillForge Frontend (React 19 + Vite)

The `client/` workspace contains the single-page application (SPA) for SkillForge, built with React 19, Vite 7, Tailwind CSS, Zustand, and Framer Motion.

---

## Directory Architecture

```
client/
├── src/
│   ├── components/
│   │   ├── assessment/     # Proctoring wrappers & webcam monitoring
│   │   ├── auth/           # Login form, registration wizard & role cards
│   │   ├── client/         # Job posting modal & recruiter widgets
│   │   ├── guards/         # ProtectedRoute and RoleGuard navigation shields
│   │   ├── layout/         # Root Layout, Navbar, and ThemeToggle
│   │   ├── sections/       # Landing page sections (Hero, SkillCIBIL, Testimonials, etc.)
│   │   └── ui/             # Reusable primitives (Button, Input, Card, Badge, Loader)
│   ├── lib/
│   │   ├── api.js          # Centralized JWT-injecting fetch client (VITE_API_BASE_URL)
│   │   └── cn.js           # ClassName merging utility (clsx + tailwind-merge)
│   ├── pages/
│   │   ├── client/         # Client onboarding & workspace
│   │   ├── dashboard/      # StudentDashboard and ClientDashboard
│   │   ├── student/        # AssessmentPage, PersonalityTest, StudentOnboarding, UpskillPage
│   │   ├── AuthPage.jsx    # Unified login & multi-step registration page
│   │   └── LandingPage.jsx # Public marketing landing page
│   ├── store/
│   │   ├── authStore.js    # Zustand store: user session, JWT tokens, onboarding_stage
│   │   └── themeStore.js   # Zustand store: light/dark theme preference
│   ├── App.jsx             # React Router routing table with route guards
│   ├── main.jsx            # Application root bootstrap
│   └── index.css           # Global Tailwind and font styles
├── .env.example            # Environment template for frontend
├── eslint.config.js        # ESLint 9 flat configuration with React hooks & purity rules
├── package.json            # Node.js dependencies & scripts
└── vite.config.js          # Vite build and dev server configuration
```

---

## Prerequisites

- **Node.js**: 18.x or 20+ (tested on Node 20)
- **Package Manager**: npm 9+ or npm 10+ / 11+

---

## Local Setup & Execution

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

### 3. Start Development Server
```bash
npm run dev
```
Navigate to `http://localhost:5173`.

---

## Route Protection & State Architecture

### Route Guards
- `ProtectedRoute`: Verifies that `useAuthStore.getState().isAuthenticated` is true. Redirects unauthorized users to `/auth`.
- `RoleGuard`: Verifies that `user.role` matches `requiredRole` (`student` or `client`). Redirects cross-role navigation to the proper dashboard.

### API Client (`src/lib/api.js`)
All HTTP requests route through the centralized API client which:
- Automatically prefixes the base URL from `VITE_API_BASE_URL`.
- Automatically injects the JWT access token `Authorization: Bearer <token>` from localStorage.
- Handles JSON payloads and `FormData` uploads transparently.

---

## Linting & Building

```bash
# Check code style and React rules
npm run lint

# Compile production bundle
npm run build

# Preview production bundle locally
npm run preview
```
