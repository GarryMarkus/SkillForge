import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

/**
 * Role-based access control route wrapper.
 * Ensures the authenticated user has the expected role ('student' or 'client').
 * Redirects to the appropriate dashboard if the role does not match.
 */
const RoleGuard = ({ requiredRole, children }) => {
    const { user } = useAuthStore();

    if (!user || user.role !== requiredRole) {
        const fallback = user?.role === 'client' ? '/client/dashboard' : '/student/dashboard';
        return <Navigate to={fallback} replace />;
    }

    return children;
};

export default RoleGuard;
