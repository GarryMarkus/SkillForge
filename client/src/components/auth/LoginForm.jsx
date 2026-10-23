import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const LoginForm = () => {
    const { setAuthMode, login } = useAuthStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const user = await login(formData.email, formData.password);
            if (user.role === 'student') {
                if (user.onboarding_stage !== undefined && user.onboarding_stage < 2) {
                    navigate('/student/onboarding');
                } else {
                    navigate('/student/dashboard');
                }
            } else if (user.role === 'client') {
                if (user.onboarding_stage !== undefined && user.onboarding_stage < 2) {
                    navigate('/client/onboarding');
                } else {
                    navigate('/client/dashboard');
                }
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err.message || 'Authentication failed. Please verify your email and password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full bg-white rounded-2xl border border-gray-200 p-8 sm:p-10 shadow-lg font-sans select-none">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-1.5">
                    Welcome Back
                </h1>
                <p className="text-sm text-gray-500">
                    Sign in to access your dashboard and assessments
                </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                <button
                    type="button"
                    className="flex-1 py-2 text-xs font-semibold rounded-lg bg-white text-gray-900 shadow-sm transition-all"
                >
                    Sign In
                </button>
                <button
                    type="button"
                    onClick={() => setAuthMode('register')}
                    className="flex-1 py-2 text-xs font-semibold rounded-lg text-gray-500 hover:text-gray-900 transition-all cursor-pointer"
                >
                    Create Account
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Email Address
                    </label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:outline-none text-sm transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Password
                    </label>
                    <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Enter your password"
                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:outline-none text-sm transition-colors"
                    />
                </div>

                <div className="flex items-center justify-between text-xs text-gray-600 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            defaultChecked
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 accent-blue-600 cursor-pointer"
                        />
                        <span>Remember me</span>
                    </label>
                    <span className="text-gray-400">
                        256-bit encrypted
                    </span>
                </div>

                {error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-red-700 text-xs font-medium">
                        {error}
                    </div>
                )}

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold text-sm transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                    >
                        {loading ? 'Signing In...' : 'Sign In →'}
                    </button>
                </div>
            </form>

            {/* Quick Demo Credentials Footer */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col gap-1 text-xs text-gray-400 text-center">
                <span>Demo Student: student@example.com / Password123!</span>
                <span>Demo Recruiter: recruiter@example.com / Password123!</span>
            </div>
        </div>
    );
};

export default LoginForm;
