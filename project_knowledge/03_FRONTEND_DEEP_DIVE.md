# 03: Frontend Deep Dive

## 1. UI Framework Architecture and Build Toolchain

### Architectural Profile
- **Framework:** React 19 (`react: ^19.2.0`, `react-dom: ^19.2.0`)
- **Rendering Strategy:** 100% Client-Side Rendered (CSR / Single Page Application).
- **Module Format:** Native ECMAScript Modules (`"type": "module"` in `package.json`).
- **Build Toolchain:** Vite 7 (`vite: ^7.2.4`, executing runtime Vite 7.3.1).
- **CSS Pre-processing & Utilities:** PostCSS 8 with Tailwind CSS 3.4.17 and `@tailwindcss/typography`.
- **Smooth Scrolling Integration:** Lenis 1.3.17 smooth momentum scroll engine mounted in the top-level layout wrapper.

### Build & Compilation Pipeline
The Vite pipeline is configured in `Frontend/vite.config.js`:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```
- Entry HTML: `Frontend/index.html` loads Google Fonts (`Bricolage Grotesque`, `Patrick Hand`) and mounts `/src/main.jsx`.
- Entry Script: `Frontend/src/main.jsx` wraps `<App />` in React's `<StrictMode>` and mounts to `#root`.

---

## 2. Routing Structure & Hierarchy

Routing is managed via **React Router DOM v7** (`react-router-dom: ^7.13.0`) in `Frontend/src/App.jsx`.

### Route Map

| Path | Element / Component | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `/` | `<LandingPage />` | Public | Interactive marketing page with hero, testimonials, and trust bar |
| `/auth` | `<AuthPage />` | Public | Dual-mode login and multi-step registration wizard |
| `/login` | `<Navigate to="/auth" replace />` | Public | Legacy redirect to `/auth` |
| `/signup` | `<Navigate to="/auth" replace />` | Public | Legacy redirect to `/auth` |
| `/student/dashboard` | `<StudentDashboard />` | **Unprotected** | Student metrics, recommendation report, and job application list |
| `/student/onboarding` | `<StudentOnboarding />` | **Unprotected** | Student profile creation: resume upload, GitHub URL, skills |
| `/student/assessment` | `<AssessmentPage />` | **Unprotected** | Proctored technical exam session with webcam feed |
| `/student/personality-test` | `<PersonalityTest />` | **Unprotected** | 7-question psychometric archetype diagnostic |
| `/student/upskill` | `<UpskillPage />` | **Unprotected** | Interactive markdown curriculum generator and viewer |
| `/client/dashboard` | `<ClientDashboard />` | **Unprotected** | Recruiter project postings and candidate applicant reviews |
| `/client/onboarding` | `<ClientOnboarding />` | **Unprotected** | Recruiter company details, address, and website setup |

### ⚠️ Route Guard Deficiencies
- **Zero Route Protection:** There is no `<ProtectedRoute>` or `<RoleGuard>` wrapper implemented around dashboard routes.
- Any unauthenticated user who directly inputs `/student/dashboard` or `/client/dashboard` into the browser address bar will mount the page.
- Components only perform an imperative check inside `useEffect` (e.g. `StudentDashboard.jsx:20` checking `if (user && user.onboarding_stage < 2) navigate('/student/onboarding')`), but do not verify whether `tokens` exist before attempting API calls.

### Dead / Unrouted Page Artifacts
The following files exist in `Frontend/src/pages/` but are completely disconnected from the router tree in `App.jsx`:
1. `Frontend/src/pages/Dashboard.jsx` (Legacy exam list view)
2. `Frontend/src/pages/ExamView.jsx` (Legacy exam runner)
3. `Frontend/src/pages/Login.jsx` (Legacy single-form login)
4. `Frontend/src/pages/Register.jsx` (Legacy single-form register)

---

## 3. Component Architecture & Design System

### Design System Configuration
Defined in `Frontend/tailwind.config.js`:
- **Color System:**
  - `light-canvas`: `#FDF8F1` (Warm off-white parchment)
  - `light-card`: `#FFFFFF`
  - `light-border`: `#2D1B14` (Deep espresso charcoal)
  - `dark-canvas`: `#0D0D0D` (Near-black)
  - `dark-card`: `#1A1A1A` (Charcoal grey)
  - Brand accents: Tailwind `orange-500` (Recruiter / CTAs) and `purple-500` (Student / AI Diagnostics).
- **Typography:**
  - `font-sans`: `"Bricolage Grotesque"`, sans-serif (High-contrast modernist grotesque)
  - `font-script`: `"Patrick Hand"`, cursive (Handwritten annotations and labels)
- **Component Aesthetic:** Neobrutalism / Neo-pop styling featuring hard solid borders (`2px solid black`), high contrast cards, and bold drop-shadows (`shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`).

### Component Breakdown

#### 1. Layout & Presentation Wrappers
- `Frontend/src/components/layout/Layout.jsx`:
  - Instantiates `Lenis` smooth momentum scrolling.
  - Subscribes to `themeStore` and toggles `.dark` class on the `<html>` root.
  - Implements and exports utility helper `cn(...inputs)` combining `clsx` and `tailwind-merge`.
- `Frontend/src/components/layout/Navbar.jsx`:
  - Fixed responsive header with animated logo hover, dark-mode toggle, and scroll detection.
- `Frontend/src/components/layout/ThemeToggle.jsx`:
  - Animated sun/moon button triggering `useThemeStore.toggleTheme()`.

#### 2. Atomic UI Primitives (`Frontend/src/components/ui/`)
- `Button.jsx`: Variant-driven button (`primary`, `secondary`, `outline`, `ghost`) with spring hover physics via Framer Motion.
- `Input.jsx`: Standardized text/email/password input with icon slots and error message labels.
- `Card.jsx`: Reusable container with dark/light variants and neobrutalist borders.
- `Badge.jsx`: Pill badge component for skill tags and difficulty levels.
- `Loader.jsx`: Centered animated spinner.

#### 3. Authentication Sub-System (`Frontend/src/components/auth/`)
- `AuthLayout.jsx`: Split layout container (Left marketing panel, right interactive form panel).
- `LeftPanel.jsx`: Visual panel showcasing platform statistics and testimonial cards with textured SVG noise.
- `LoginForm.jsx`: Standalone credential entry form with tab toggle to registration.
- `RegisterWizard.jsx`: Multi-step form controller orchestrating:
  - `Step1Role.jsx`: Role selection (`student` vs `client`).
  - `Step2BasicInfo.jsx`: Name, email, and password credentials.
  - `Step3Details.jsx`: Role-specific metadata (education/goals vs company details).
  - `Step4Confirm.jsx`: Review summary and submission trigger.
  - `SuccessState.jsx`: Animated completion banner redirecting to onboarding.

#### 4. Hardware Proctoring Engine (`Frontend/src/components/assessment/ProctorWrapper.jsx`)
`ProctorWrapper` encapsulates the assessment UI with hardware-level security enforcement:
- **Webcam Stream:** Uses `react-webcam` to capture 64x48 pixel video frames into an in-memory HTML5 `<canvas>`.
- **Heuristic Face Presence Detection:**
  - Evaluates average pixel brightness across a centered bounding region.
  - Analyzes color balance (`r > 60 && g > 40 && b > 20 && r > g && r > b`) as a skin-tone heuristic.
  - If 5 consecutive seconds pass without skin-tone detection, raises a "No face detected" warning.
- **Fullscreen Lock:** Listens to `fullscreenchange`, `webkitfullscreenchange`, `mozfullscreenchange`, and `MSFullscreenChange`. Exiting fullscreen triggers a full-page modal blocker.
- **Tab & Window Focus Loss:** Monitors `document.visibilitychange` and `window.onblur`. Switching tabs triggers an immediate warning.
- **Input Neutralization:** Intercepts and executes `preventDefault()` on `contextmenu`, `copy`, `paste`, and `cut` events.
- **Disqualification Threshold:** Reaching 3 violations halts the test and displays an immovable disqualification screen.

---

## 4. State Management Architecture

SkillForge uses **Zustand** for lightweight, boilerplate-free state management across two dedicated stores:

### 1. `authStore.js` (`Frontend/src/store/authStore.js`)
- **State Properties:**
  - `authMode`: `'login'` or `'register'`
  - `user`: Deserialized user object `{ email, role }` hydrated from `localStorage.getItem('user')`
  - `tokens`: Deserialized JWT tokens `{ access, refresh }` hydrated from `localStorage.getItem('tokens')`
  - `isAuthenticated`: Boolean derived from presence of tokens in `localStorage`
  - `step`: Active registration wizard step (1 to 4)
  - `role`: Selected registration role (`'student'` or `'client'`)
  - `formData`: Accumulator object storing multi-step inputs
- **Store Actions:**
  - `login(email, password)`: Dispatches `POST /api/accounts/login/`, writes to `localStorage`, and updates store state.
  - `signup()`: Dispatches `POST /api/accounts/register/`, writes tokens, and updates state.
  - `logout()`: Dispatches `POST /api/accounts/logout/` with refresh token, purges `localStorage`, and resets wizard state.
  - `updateFormData(data)`: Merges partial fields into `formData`.

### 2. `themeStore.js` (`Frontend/src/store/themeStore.js`)
- Persisted via Zustand's `persist` middleware under key `'theme-storage'`.
- Manages `theme` state (`'light'` or `'dark'`) and provides `toggleTheme()` action.

---

## 5. API Consumption Layer

### Dual Architecture Debt (Axios vs. Fetch)
The frontend contains an unresolved architectural split across its API consumption layers:

```
                      FRONTEND APPLICATION
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
  Legacy / Orphaned Layer               Active Production Layer
   (src/api/apiClient.js)               (Embedded in Components)
  ├── Uses Axios (Not in package.json)  ├── Uses native window.fetch()
  ├── Interceptors look for:            ├── Reads tokens from:
  │   localStorage.getItem('access_token')   useAuthStore (localStorage 'tokens')
  └── Only imported in dead files:      └── Hardcoded URL in 9 components:
      (Dashboard, ExamView, Login, Register) `http://localhost:8000/api/...`
```

### Active HTTP Invocation Pattern
All active pages (`StudentDashboard`, `ClientDashboard`, `AssessmentPage`, `PersonalityTest`, `StudentOnboarding`, `ClientOnboarding`, `UpskillPage`) execute raw inline `fetch()` requests.

Example from `StudentDashboard.jsx:29-34`:
```javascript
const res = await fetch('http://localhost:8000/api/accounts/profile/', {
    headers: { 'Authorization': `Bearer ${tokens.access}` }
});
if (res.ok) setProfile(await res.json());
```

### Critical API Misalignment
In `Frontend/src/pages/student/AssessmentPage.jsx:161`:
```javascript
// Front-end call
await fetch('http://localhost:8000/api/proctor/events/', { ... });
```
**Backend Failure:** `skillforge/proctor/urls.py:16` exposes `path("event/", ProctorEventView.as_view())` (singular). This call returns a **404 Not Found** in the active proctoring flow.
