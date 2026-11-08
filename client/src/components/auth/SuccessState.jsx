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
        <div className="w-full bg-[#0b0b0c] rounded-md border border-white/10 p-8 sm:p-12 font-mono text-center flex flex-col items-center gap-5">
            <div className="w-10 h-10 rounded-sm bg-[#111113] border border-white/20 text-[#f5f5f5] flex items-center justify-center text-sm font-mono font-bold">
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

            <div className="text-xs text-[#555555] font-mono">
                Redirecting in {count}s...
            </div>

            <button
                type="button"
                onClick={handleProceedNow}
                className="bg-[#111113] hover:bg-[#1a1a1d] text-white border border-white/20 py-2.5 px-6 rounded-md font-mono text-xs transition-colors shadow-sm cursor-pointer"
            >
                Proceed to Workspace ↗
            </button>
        </div>
    );
};

export default SuccessState;
