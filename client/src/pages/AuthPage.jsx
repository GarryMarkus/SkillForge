import React from 'react';
import { useAuthStore } from '../store/authStore';
import AuthLayout from '../components/auth/AuthLayout';
import LeftPanel from '../components/auth/LeftPanel';
import LoginForm from '../components/auth/LoginForm';
import RegisterWizard from '../components/auth/RegisterWizard';

const AuthPage = () => {
    const { authMode } = useAuthStore();

    return (
        <AuthLayout LeftPanel={LeftPanel}>
            {authMode === 'login' ? <LoginForm /> : <RegisterWizard />}
        </AuthLayout>
    );
};

export default AuthPage;
