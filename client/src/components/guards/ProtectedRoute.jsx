import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

/**
 * Route wrapper that ensures the user is authenticated before granting access.
 * Redirects unauthenticated visitors to /auth, preserving the intended destination in route state.
 */
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuthStore();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace state={{ from: location }} />;
    }

    return children;
};

export default ProtectedRoute;
