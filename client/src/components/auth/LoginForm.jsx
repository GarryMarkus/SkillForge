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
            setError(err.message || 'Authentication failed. Please verify your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full bg-[#0b0b0c] rounded-md border border-white/10 p-7 sm:p-9 font-mono select-none">
            {/* Header */}
            <div className="text-center mb-6">
                <div className="text-[11px] text-[#737373] uppercase tracking-wider mb-1">Authentication Session</div>
                <h1 className="text-xl sm:text-2xl font-bold font-display text-[#f5f5f5] mb-1.5 tracking-tight">
                    Sign In
                </h1>
                <p className="text-xs text-[#737373]">
                    Access your verified assessments and workspace
                </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex bg-[#050505] p-1 rounded-md mb-6 border border-white/10">
                <button
                    type="button"
                    className="flex-1 py-1.5 text-xs font-mono rounded-sm bg-[#111113] text-white border border-white/10 shadow-sm transition-all"
                >
                    Sign In
                </button>
                <button
                    type="button"
                    onClick={() => setAuthMode('register')}
                    className="flex-1 py-1.5 text-xs font-mono rounded-sm text-[#737373] hover:text-[#f5f5f5] transition-all cursor-pointer"
                >
                    Create Account
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-mono text-[#888888] mb-1.5">
                        Email Address
                    </label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="engineer@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-md bg-[#050505] border border-white/10 focus:border-white/30 focus:outline-none text-xs text-[#f5f5f5] placeholder-[#444444] transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-xs font-mono text-[#888888] mb-1.5">
                        Password
                    </label>
                    <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="••••••••••••"
                        className="w-full px-3.5 py-2.5 rounded-md bg-[#050505] border border-white/10 focus:border-white/30 focus:outline-none text-xs text-[#f5f5f5] placeholder-[#444444] transition-colors"
                    />
                </div>

                <div className="flex items-center justify-between text-xs text-[#737373] pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            defaultChecked
                            className="w-3.5 h-3.5 rounded-none border border-white/20 bg-[#050505] text-white accent-zinc-200 cursor-pointer"
                        />
                        <span>Remember session</span>
                    </label>
                    <span className="text-[#555555]">
                        256-Bit Encrypted
                    </span>
                </div>

                {error && (
                    <div className="rounded-md border border-rose-500/20 bg-rose-500/10 p-3 text-rose-300 text-xs">
                        {error}
                    </div>
                )}

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#111113] hover:bg-[#1a1a1d] text-[#f5f5f5] border border-white/20 py-2.5 px-4 rounded-md font-mono text-xs font-medium transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                    >
                        {loading ? 'Authenticating...' : 'Sign In ↗'}
                    </button>
                </div>
            </form>

            {/* Quick Demo Credentials Footer */}
            <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-col gap-1 text-[11px] text-[#555555] text-center font-mono">
                <span>Demo Student: student@example.com / Password123!</span>
                <span>Demo Recruiter: recruiter@example.com / Password123!</span>
            </div>
        </div>
    );
};

export default LoginForm;
