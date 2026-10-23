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
        <div className="w-full bg-white rounded-2xl border border-gray-200 p-8 sm:p-12 shadow-lg font-sans text-center flex flex-col items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-green-50 border border-green-200 text-green-600 flex items-center justify-center text-2xl font-bold">
                ✓
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">
                    Welcome to SkillForge!
                </h2>
                <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
                    Your account has been created successfully. We're setting up your workspace now.
                </p>
            </div>

            <div className="text-xs text-gray-400">
                Redirecting automatically in {count} seconds...
            </div>

            <button
                type="button"
                onClick={handleProceedNow}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-6 rounded-xl font-semibold text-xs sm:text-sm transition-colors shadow-sm cursor-pointer"
            >
                Continue to Setup Now →
            </button>
        </div>
    );
};

export default SuccessState;
