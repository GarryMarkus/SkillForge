import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HowItWorksPage from './pages/HowItWorksPage';
import AuthPage from './pages/AuthPage';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import ClientDashboard from './pages/dashboard/ClientDashboard';
import ClientOnboarding from './pages/client/ClientOnboarding';
import StudentOnboarding from './pages/student/StudentOnboarding';
import AssessmentPage from './pages/student/AssessmentPage';
import PersonalityTest from './pages/student/PersonalityTest';
import UpskillPage from './pages/student/UpskillPage';
import ProtectedRoute from './components/guards/ProtectedRoute';
import RoleGuard from './components/guards/RoleGuard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<Navigate to="/auth" replace />} />
        <Route path="/signup" element={<Navigate to="/auth" replace />} />

        {/* Student Protected Routes */}
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
        <Route
          path="/student/onboarding"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <RoleGuard requiredRole="student">
                <StudentOnboarding />
              </RoleGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/assessment"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <RoleGuard requiredRole="student">
                <AssessmentPage />
              </RoleGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/personality-test"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <RoleGuard requiredRole="student">
                <PersonalityTest />
              </RoleGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/upskill"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <RoleGuard requiredRole="student">
                <UpskillPage />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        {/* Client Protected Routes */}
        <Route
          path="/client/dashboard"
          element={
            <ProtectedRoute allowedRoles={['client']}>
              <RoleGuard requiredRole="client">
                <ClientDashboard />
              </RoleGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/onboarding"
          element={
            <ProtectedRoute allowedRoles={['client']}>
              <RoleGuard requiredRole="client">
                <ClientOnboarding />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
