import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const SuccessState = () => {
    const navigate = useNavigate();
    const { role } = useAuthStore();
    const [count, setCount] = useState(3);

    useEffect(() => {
        const timer = setInterval(() => {
            setCount((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    if (role === 'student') {
                        navigate('/student/onboarding');
                    } else if (role === 'client') {
                        navigate('/client/onboarding');
                    } else {
                        navigate('/');
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [navigate, role]);

    const handleProceedNow = () => {
        if (role === 'student') {
            navigate('/student/onboarding');
        } else if (role === 'client') {
            navigate('/client/onboarding');
        } else {
            navigate('/');
        }
    };

    return (
        <div className="w-full bg-[#121318] rounded-xl border border-white/[0.08] p-8 sm:p-12 shadow-xl font-sans text-center flex flex-col items-center gap-5">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl font-bold">
                ✓
            </div>

            <div className="space-y-1.5">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Welcome to SkillForge
                </h2>
                <p className="text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
                    Your account has been created successfully. Setting up your workspace.
                </p>
            </div>

            <div className="text-xs text-zinc-400 font-mono">
                Redirecting in {count}s...
            </div>

            <button
                type="button"
                onClick={handleProceedNow}
                className="bg-white hover:bg-zinc-100 text-zinc-950 py-2.5 px-6 rounded-lg font-semibold text-xs sm:text-sm transition-colors shadow-sm cursor-pointer"
            >
                Continue Now &rarr;
            </button>
        </div>
    );
};

export default SuccessState;
