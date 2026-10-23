import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

/**
 * Route wrapper that ensures the user is authenticated before granting access.
 * Optionally validates user role against allowedRoles.
 * Redirects unauthenticated visitors to /auth, preserving the intended destination in route state.
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, user } = useAuthStore();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace state={{ from: location }} />;
    }

    if (allowedRoles && Array.isArray(allowedRoles) && user?.role && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
