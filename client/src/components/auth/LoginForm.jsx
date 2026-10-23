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
            setError(err.message || 'Authentication failed. Please verify credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full border border-black/20 bg-surface-container-lowest p-6 sm:p-10 shadow-[6px_6px_0px_#0A0A0A] font-mono select-none">
            {/* Title Strip */}
            <div className="border-b border-black/15 pb-4 mb-6">
                <div className="flex items-center gap-2 font-bold uppercase text-xs text-canvas-blueprint tracking-wider mb-2">
                    <span>[+]</span>
                    <span>[ IDENTITY AUTHENTICATION // CREDENTIAL ENTRY ]</span>
                </div>
                <h1 className="text-2xl font-bold uppercase tracking-tight text-ink-primary mb-1">
                    SIGN IN TO CONSOLE
                </h1>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Enter credentials to access verified candidate or recruiter telemetry console.
                </p>
            </div>

            {/* Mode Switcher Rail */}
            <div className="flex border border-black/20 mb-6 bg-surface-container">
                <button
                    type="button"
                    className="flex-1 py-2.5 text-xs font-bold uppercase transition-none bg-canvas-blueprint text-white border-r border-black/20"
                >
                    [ SIGN IN ]
                </button>
                <button
                    type="button"
                    onClick={() => setAuthMode('register')}
                    className="flex-1 py-2.5 text-xs font-bold uppercase text-on-surface-variant hover:bg-surface-container-high transition-none cursor-pointer"
                >
                    [ REGISTER NEW ACCOUNT ]
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs uppercase font-bold text-outline mb-1.5">
                        EMAIL ADDRESS *
                    </label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="candidate@example.com or recruiter@example.com"
                        className="w-full px-3.5 py-2.5 bg-surface border border-black/25 focus:border-canvas-blueprint focus:outline-none text-xs sm:text-sm font-mono"
                    />
                </div>

                <div>
                    <label className="block text-xs uppercase font-bold text-outline mb-1.5">
                        PASSWORD CREDENTIAL *
                    </label>
                    <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="••••••••••••"
                        className="w-full px-3.5 py-2.5 bg-surface border border-black/25 focus:border-canvas-blueprint focus:outline-none text-xs sm:text-sm font-mono"
                    />
                </div>

                <div className="flex items-center justify-between text-xs text-on-surface-variant pt-1 font-mono">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            defaultChecked
                            className="w-3.5 h-3.5 border border-black/30 rounded-none accent-canvas-blueprint cursor-pointer"
                        />
                        <span>PERSIST SESSION LOCAL</span>
                    </label>
                    <span className="text-canvas-blueprint font-bold border border-canvas-blueprint/20 px-1.5 py-0.5 bg-blue-50 text-[11px]">
                        256-BIT ENCRYPTED
                    </span>
                </div>

                {error && (
                    <div className="border border-red-500 bg-red-50 p-3.5 text-red-700 text-xs font-bold uppercase">
                        [AUTHENTICATION FAULT] {error}
                    </div>
                )}

                <div className="pt-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-canvas-blueprint text-white py-3.5 px-6 font-bold uppercase text-xs sm:text-sm border border-canvas-blueprint hover:bg-primary-hover transition-none cursor-pointer flex items-center justify-center gap-2 shadow-[3px_3px_0px_#0A0A0A] disabled:opacity-50"
                    >
                        <span>
                            {loading ? '[ VERIFYING CREDENTIALS... ]' : '[ SIGN IN TO CONSOLE → ]'}
                        </span>
                    </button>
                </div>
            </form>

            {/* Quick Demo Credentials Footer */}
            <div className="mt-6 pt-3 border-t border-black/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-outline font-mono">
                <span>DEMO CANDIDATE: student@example.com / Password123!</span>
                <span>DEMO RECRUITER: recruiter@example.com / Password123!</span>
            </div>
        </div>
    );
};

export default LoginForm;
