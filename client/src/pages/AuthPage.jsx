import React from 'react';
import { useAuthStore } from '../store/authStore';
import AuthLayout from '../components/auth/AuthLayout';
import LeftPanel from '../components/auth/LeftPanel';
import LoginForm from '../components/auth/LoginForm';
import { AnimatePresence, motion } from 'framer-motion';
import RegisterWizard from '../components/auth/RegisterWizard';

const AuthPage = () => {
    const { authMode } = useAuthStore();

    return (
        <AuthLayout LeftPanel={LeftPanel}>
            <AnimatePresence mode="wait">
                {authMode === 'login' ? (
                    <motion.div
                        key="login"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full"
                    >
                        <LoginForm />
                    </motion.div>
                ) : (
                    <motion.div
                        key="register"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full"
                    >
                        <RegisterWizard />
                    </motion.div>
                )}
            </AnimatePresence>
        </AuthLayout>
    );
};

export default AuthPage;
