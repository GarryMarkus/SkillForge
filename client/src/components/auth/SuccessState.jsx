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
        <div className="w-full border border-black/20 bg-surface-container-lowest p-space-lg shadow-[4px_4px_0px_#1D52B8] font-mono text-center flex flex-col items-center gap-space-md">
            <div className="border border-primary-container bg-primary-fixed/30 text-primary-container px-space-md py-1 text-label-md font-bold uppercase">
                [+] SYSTEM_PROVISIONED: ACCOUNT_INITIALIZED
            </div>

            <div className="space-y-1">
                <h2 className="text-headline-sm font-bold uppercase text-on-surface">
                    WELCOME TO SKILLFORGE ENTERPRISE
                </h2>
                <p className="text-body-sm text-secondary max-w-md mx-auto">
                    Your cryptographic credentials have been registered. The system is routing you to the intake terminal.
                </p>
            </div>

            <div className="border border-black/15 bg-surface px-space-md py-space-xs text-label-sm font-bold text-on-surface">
                AUTO_ROUTING_IN: [ {count} SECONDS ]
            </div>

            <button
                type="button"
                onClick={handleProceedNow}
                className="bg-primary-container text-on-primary py-2 px-space-lg font-bold uppercase text-label-md border border-primary-container hover:bg-primary shadow-[2px_2px_0px_#191C1D] cursor-pointer"
            >
                [ PROCEED_TO_INTAKE_CONSOLE_NOW -&gt; ]
            </button>
        </div>
    );
};

export default SuccessState;
