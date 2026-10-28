# 💻 Frontend Architecture & React 19 SPA

SkillForge’s frontend is a Single Page Application (SPA) built with **React 19**, **Vite 7**, **Tailwind CSS**, and **Zustand**. It delivers responsive, low-latency interfaces for students and recruiters while enforcing strict anti-cheat proctoring checks during assessments.

---

## 1. Technical Toolchain & Dependencies

| Library | Version | Role in Platform |
| :--- | :--- | :--- |
| **React** | `19.2.0` | Declarative UI component tree and state hydration |
| **Vite** | `7.2.4` | Lightning-fast HMR dev server and optimized rollup bundling |
| **Tailwind CSS** | `3.4.17` | Utility-first styling with typography and custom dark theme |
| **Zustand** | `5.0.10` | Micro-store global state management without boilerplate |
| **React Router DOM**| `7.13.0` | Client-side routing, route loaders, and nested layouts |
| **React Webcam** | `7.2.0` | Live hardware camera video capture for proctoring |
| **Lenis** | `1.3.17` | Smooth momentum scrolling engine across the application |
| **Lucide React** | `0.563.0` | Clean SVG iconography across navigation and dashboards |
| **React Markdown** | `10.1.0` | Renders dynamic AI-generated curriculum and code blocks |

---

## 2. Directory Hierarchy

```
client/src/
├── api/                  # API client facade and async task polling hooks
│   ├── client.js         # Unified HTTP fetch abstractions
│   └── useTaskStatus.js  # Exponential backoff hook for Celery tasks
├── components/
│   ├── assessment/       # ProctorWrapper, VideoCanvas, Timer, OptionsMatrix
│   ├── auth/             # Multi-step RegisterWizard, LoginForm, AuthLayout
│   ├── client/           # JobPostModal, ApplicantRankingsGrid, DossierModal
│   ├── common/           # ErrorBoundary.jsx (catch-all crash shield)
│   ├── guards/           # ProtectedRoute.jsx and RoleGuard.jsx
│   ├── layout/           # Responsive Navbar, Footer, Layout wrapper
│   └── ui/               # Atomic primitives: Button, Card, Badge, Input, Modal
├── hooks/                # Custom React hooks (fullscreen, timer, proctor events)
├── lib/                  # Centralized fetch wrapper (api.js) and cn utility
├── pages/                # Route targets: Landing, Dashboards, Assessments, Upskill
└── store/                # Zustand stores (useAuthStore, useThemeStore)
```

---

## 3. Global State Architecture (Zustand)

State is intentionally decoupled into minimal, performant stores rather than bloated context trees:

### 🔑 `useAuthStore`
- Stores JWT `accessToken` and `refreshToken` in `localStorage` for session persistence.
- Holds current user identity object: `id`, `username`, `email`, and `role` (`student` or `client`).
- Exposes authentication actions: `login(tokens, user)`, `logout()`, `updateUser(data)`.
- Computed getters: `isAuthenticated`, `isStudent`, `isClient`.

### 🌓 `useThemeStore`
- Manages global theme mode (`dark` / `light`).
- Syncs class `dark` on `document.documentElement` for Tailwind dark mode styling.

---

## 4. Navigation Shields & Route Protection

All sensitive application routes are safeguarded using composable wrapper guards in `App.jsx`:

```jsx
<Route
  path="/student/dashboard"
  element={
    <ProtectedRoute allowedRoles={['student']}>
      <RoleGuard requiredRole="student">
        <StudentDashboard />
      </RoleGuard>
    </ProtectedRoute>
  }
/>
```

- **`ProtectedRoute`:** Checks whether `authStore.isAuthenticated` is true. If false, redirects to `/auth` while preserving the intended target URL for post-login return.
- **`RoleGuard`:** Verifies that the authenticated user possesses the required role. Prevents candidate accounts from opening recruiter dashboards, and vice versa.

---

## 5. Resilient HTTP & Token Refresh Flow (`lib/api.js`)

All outbound network requests flow through a unified API client that handles token attachment, transparent refresh, and graceful network failure:

```
[Component fetch request]
         │
         ▼
[api.js Interceptor] ── Attaches 'Authorization: Bearer <token>'
         │
         ├──> [Backend Server Returns 200 OK] ──> Resolved to Component
         │
         └──> [Backend Returns 401 Unauthorized]
                     │
                     ▼
          [Attempt Refresh via /api/accounts/token/refresh/]
                     │
                     ├── Success: Updates access token and retries original request
                     └── Failure: Clears session and redirects user to /auth
```

---

## 6. Global Exception Shield (`ErrorBoundary.jsx`)

To ensure candidates never experience a white screen crash mid-assessment or while reviewing match results, the entire UI tree is guarded by an error boundary. It intercepts unhandled JavaScript exceptions, logs telemetry, and provides a "Reload Application" or "Return to Dashboard" action without losing session state.
