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
        <div className="w-full bg-[#121318] rounded-xl border border-white/[0.08] p-7 sm:p-9 shadow-xl font-sans select-none">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-white mb-1.5 tracking-tight">
                    Welcome Back
                </h1>
                <p className="text-xs sm:text-sm text-zinc-400">
                    Sign in to access your assessments and verified profile
                </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex bg-zinc-900 p-1 rounded-lg mb-6 border border-zinc-800">
                <button
                    type="button"
                    className="flex-1 py-1.5 text-xs font-medium rounded-md bg-zinc-800 text-white shadow-sm transition-all"
                >
                    Sign In
                </button>
                <button
                    type="button"
                    onClick={() => setAuthMode('register')}
                    className="flex-1 py-1.5 text-xs font-medium rounded-md text-zinc-400 hover:text-white transition-all cursor-pointer"
                >
                    Create Account
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                        Email Address
                    </label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900/80 border border-zinc-700/70 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none text-sm text-white placeholder-zinc-500 transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                        Password
                    </label>
                    <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Enter your password"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900/80 border border-zinc-700/70 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none text-sm text-white placeholder-zinc-500 transition-colors"
                    />
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            defaultChecked
                            className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-blue-600 accent-blue-600 cursor-pointer"
                        />
                        <span>Remember me</span>
                    </label>
                    <span className="text-zinc-400">
                        256-bit encrypted
                    </span>
                </div>

                {error && (
                    <div className="rounded-lg border border-rose-500/20 bg-rose-500/10 p-3 text-rose-400 text-xs font-medium">
                        {error}
                    </div>
                )}

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white hover:bg-zinc-100 text-zinc-950 py-2.5 px-4 rounded-lg font-semibold text-sm transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </div>
            </form>

            {/* Quick Demo Credentials Footer */}
            <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-col gap-1 text-[11px] text-zinc-400 text-center font-mono">
                <span>Demo Student: student@example.com / Password123!</span>
                <span>Demo Recruiter: recruiter@example.com / Password123!</span>
            </div>
        </div>
    );
};

export default LoginForm;
