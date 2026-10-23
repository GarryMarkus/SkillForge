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
            // Redirect based on role and onboarding status
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
        <div className="w-full border border-black/20 bg-surface-container-lowest p-space-lg shadow-[4px_4px_0px_#1D52B8] font-mono">
            {/* Title Strip */}
            <div className="border-b border-black/15 pb-space-sm mb-space-md">
                <div className="flex items-center gap-2 font-bold uppercase text-headline-sm text-on-surface">
                    <span className="text-primary-container font-bold">+</span>
                    <span>[ IDENTITY_AUTHENTICATION // CREDENTIAL_ENTRY ]</span>
                </div>
                <p className="text-body-sm text-secondary mt-1">
                    Enter cryptographic credentials to access verified candidate or recruiter telemetry console.
                </p>
            </div>

            {/* Mode Switcher Rail */}
            <div className="flex border border-black/20 mb-space-md bg-surface-container">
                <button
                    type="button"
                    className="flex-1 py-2 text-label-md font-bold uppercase transition-none bg-primary-container text-on-primary border-r border-black/20"
                >
                    [ SIGN_IN ]
                </button>
                <button
                    type="button"
                    onClick={() => setAuthMode('register')}
                    className="flex-1 py-2 text-label-md font-bold uppercase text-on-surface-variant hover:bg-surface-container-high transition-none cursor-pointer"
                >
                    [ REGISTER_NEW_ACCOUNT ]
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-space-md">
                <div>
                    <label className="block text-label-sm uppercase font-bold text-outline mb-1">
                        EMAIL_ADDRESS_SPECIFICATION *
                    </label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="candidate@example.com or recruiter@example.com"
                        className="w-full px-3 py-2 bg-surface border border-black/25 focus:border-primary focus:outline-none text-body-md font-mono"
                    />
                </div>

                <div>
                    <label className="block text-label-sm uppercase font-bold text-outline mb-1">
                        PASSWORD_CREDENTIAL *
                    </label>
                    <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="••••••••••••"
                        className="w-full px-3 py-2 bg-surface border border-black/25 focus:border-primary focus:outline-none text-body-md font-mono"
                    />
                </div>

                <div className="flex items-center justify-between text-label-sm text-secondary pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            defaultChecked
                            className="w-4 h-4 border border-black/30 rounded-none accent-primary-container cursor-pointer"
                        />
                        <span>PERSIST_SESSION_LOCAL</span>
                    </label>
                    <span className="text-primary-container font-bold border border-primary-container/20 px-1 py-0.2 bg-primary-fixed/20">
                        256-BIT_ENCRYPTED
                    </span>
                </div>

                {error && (
                    <div className="border border-error bg-error-container/20 p-space-sm text-error text-label-sm font-bold uppercase">
                        [AUTHENTICATION_FAULT] {error}
                    </div>
                )}

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary-container text-on-primary py-2.5 px-space-md font-bold uppercase text-label-md border border-primary-container hover:bg-primary transition-none cursor-pointer flex items-center justify-center gap-2 shadow-[2px_2px_0px_#191C1D] disabled:opacity-50"
                    >
                        <span>
                            {loading ? '[ VERIFYING_CREDENTIALS... ]' : '[ EMIT_AUTHENTICATION_TOKEN -> ]'}
                        </span>
                    </button>
                </div>
            </form>

            {/* Quick Demo Credentials Footer */}
            <div className="mt-space-md pt-space-xs border-t border-black/10 flex flex-wrap items-center justify-between gap-1 text-[10px] text-secondary">
                <span>DEMO_CANDIDATE: student@example.com / Password123!</span>
                <span>DEMO_RECRUITER: recruiter@example.com / Password123!</span>
            </div>
        </div>
    );
};

export default LoginForm;
