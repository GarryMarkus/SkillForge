import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import ClientDashboard from './pages/dashboard/ClientDashboard';
import ClientOnboarding from './pages/client/ClientOnboarding';
import StudentOnboarding from './pages/student/StudentOnboarding';
import AssessmentPage from './pages/student/AssessmentPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        {/* Redirect generic login/signup routes to /auth */}
        <Route path="/login" element={<Navigate to="/auth" replace />} />
        <Route path="/signup" element={<Navigate to="/auth" replace />} />

        {/* Dashboards */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/onboarding" element={<StudentOnboarding />} />
        <Route path="/student/assessment" element={<AssessmentPage />} />
        <Route path="/client/dashboard" element={<ClientDashboard />} />
        <Route path="/client/onboarding" element={<ClientOnboarding />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
