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
        <div className="w-full bg-[#111318] rounded-md border border-white/[0.08] border-t-white/15 p-7 sm:p-9 font-mono select-none shadow-2xl">
            {/* Header */}
            <div className="text-center mb-6">
                <div className="text-xs text-[#8a8a8e] uppercase tracking-widest mb-2">Authentication Session</div>
                <h1 className="text-xl sm:text-2xl font-bold font-display text-white mb-1.5 tracking-tight">
                    Sign In
                </h1>
                <p className="text-xs text-[#888888]">
                    Access your verified assessments and workspace
                </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex bg-[#060709] p-1 rounded-sm mb-6 border border-white/[0.08]">
                <button
                    type="button"
                    className="flex-1 py-1.5 text-xs font-mono rounded-sm bg-[#181B22] text-white border border-white/15 font-medium transition-colors"
                >
                    Sign In
                </button>
                <button
                    type="button"
                    onClick={() => setAuthMode('register')}
                    className="flex-1 py-1.5 text-xs font-mono rounded-sm text-[#888888] hover:text-white transition-colors cursor-pointer"
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
                        className="w-full px-3.5 py-2.5 rounded-sm bg-[#060709] border border-white/[0.08] focus:border-white/25 focus:outline-none text-xs text-[#f5f5f5] placeholder-[#555555] transition-colors"
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
                        className="w-full px-3.5 py-2.5 rounded-sm bg-[#060709] border border-white/[0.08] focus:border-white/25 focus:outline-none text-xs text-[#f5f5f5] placeholder-[#555555] transition-colors"
                    />
                </div>

                <div className="flex items-center justify-between text-xs text-[#737373] pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            defaultChecked
                            className="w-3.5 h-3.5 rounded-none border border-white/20 bg-[#060709] text-white accent-zinc-200 cursor-pointer"
                        />
                        <span>Remember session</span>
                    </label>
                    <span className="text-[#71717A]">
                        256-Bit Encrypted
                    </span>
                </div>

                {error && (
                    <div className="rounded-sm border border-rose-500/20 bg-rose-500/10 p-3 text-rose-300 text-xs">
                        {error}
                    </div>
                )}

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#F5F5F5] hover:bg-white text-[#050505] py-2.5 px-4 rounded-sm font-mono text-xs sm:text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50"
                    >
                        {loading ? 'Authenticating...' : 'Sign In ↗'}
                    </button>
                </div>
            </form>

            {/* Quick Demo Credentials Footer */}
            <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-col gap-1 text-[11px] text-[#71717A] text-center font-mono">
                <span>Demo Student: student@example.com / Password123!</span>
                <span>Demo Recruiter: recruiter@example.com / Password123!</span>
            </div>
        </div>
    );
};

export default LoginForm;
