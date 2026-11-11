import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const SuccessState = () => {
    const navigate = useNavigate();
    const { role } = useAuthStore();
    const [count, setCount] = useState(3);

    useEffect(() => {
        if (count <= 0) {
            if (role === 'student') {
                navigate('/student/onboarding');
            } else if (role === 'client') {
                navigate('/client/onboarding');
            } else {
                navigate('/');
            }
            return undefined;
        }
        const timer = setTimeout(() => {
            setCount((prev) => prev - 1);
        }, 1000);
        return () => clearTimeout(timer);
    }, [count, navigate, role]);

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
        <div className="w-full bg-[#111318] rounded-md border border-white/[0.08] border-t-white/15 p-8 sm:p-12 font-mono text-center flex flex-col items-center gap-5 shadow-2xl">
            <div className="w-10 h-10 rounded-sm bg-white/[0.04] border border-white/15 text-white flex items-center justify-center text-sm font-mono font-bold">
                ✓
            </div>

            <div className="space-y-1.5">
                <h2 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
                    Account Initialized
                </h2>
                <p className="text-xs text-[#888888] max-w-sm mx-auto leading-relaxed">
                    Identity verified and account record created. Initializing workspace environment.
                </p>
            </div>

            <div className="text-xs text-[#71717A] font-mono">
                Redirecting in {count}s...
            </div>

            <button
                type="button"
                onClick={handleProceedNow}
                className="bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold py-2.5 px-6 rounded-sm font-mono text-xs sm:text-sm transition-colors cursor-pointer"
            >
                Proceed to Workspace ↗
            </button>
        </div>
    );
};

export default SuccessState;
