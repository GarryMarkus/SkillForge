import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';

import Step1Role from './steps/Step1Role';
import Step2BasicInfo from './steps/Step2BasicInfo';
import Step3Details from './steps/Step3Details';
import Step4Confirm from './steps/Step4Confirm';
import SuccessState from './SuccessState';

const RegisterWizard = () => {
    const { step, nextStep, prevStep, role, setAuthMode, signup, formData } = useAuthStore();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const steps = [
        { id: 1, title: '01. ROLE' },
        { id: 2, title: '02. IDENTITY' },
        { id: 3, title: '03. PROFILE' },
        { id: 4, title: '04. CONFIRM' },
    ];

    const validateCurrentStep = () => {
        if (step === 1) {
            if (!role) {
                setError('Please select an operational role.');
                return false;
            }
        }
        if (step === 2) {
            if (!formData.fullName || !formData.email || !formData.password) {
                setError('Please fill in all required fields (Name, Email, Password).');
                return false;
            }
            if (formData.password !== formData.confirmPassword) {
                setError('Password verification does not match.');
                return false;
            }
            if (role === 'client' && (!formData.companyName || !formData.designation)) {
                setError('Company Name and Designation are mandatory for recruiter accounts.');
                return false;
            }
        }
        setError(null);
        return true;
    };

    const handleNext = () => {
        if (!validateCurrentStep()) return;

        if (step === 4) {
            handleComplete();
        } else {
            nextStep();
        }
    };

    const handleComplete = async () => {
        setIsLoading(true);
        setError(null);
        try {
            await signup();
            setIsSuccess(true);
        } catch (err) {
            console.error('Registration failed:', err);
            setError(err.message || 'Registration failed. Please verify submitted details.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return <SuccessState />;
    }

    return (
        <div className="w-full border border-black/20 bg-surface-container-lowest p-6 sm:p-10 shadow-[6px_6px_0px_#0A0A0A] font-mono select-none">
            {/* Wizard Header Bar & Step Stepper */}
            <div className="border-b border-black/15 pb-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase text-canvas-blueprint tracking-wider">
                        [ REQUISITION REGISTRATION // WIZARD ]
                    </span>
                    <button
                        type="button"
                        onClick={() => setAuthMode('login')}
                        className="text-xs font-bold uppercase text-outline hover:text-ink-primary hover:underline cursor-pointer"
                    >
                        [ ALREADY REGISTERED? SIGN IN ]
                    </button>
                </div>

                {/* Stepper Tabs */}
                <div className="grid grid-cols-4 gap-1 border border-black/20 bg-surface-container p-1">
                    {steps.map((s) => {
                        const isActive = s.id === step;
                        const isPast = s.id < step;

                        return (
                            <div
                                key={s.id}
                                className={`text-center py-1.5 text-[11px] font-bold uppercase transition-none ${
                                    isActive
                                        ? 'bg-canvas-blueprint text-white'
                                        : isPast
                                        ? 'bg-blue-50 text-canvas-blueprint'
                                        : 'text-on-surface-variant'
                                }`}
                            >
                                {s.title}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Step Body */}
            <div className="min-h-[280px]">
                {step === 1 && <Step1Role />}
                {step === 2 && <Step2BasicInfo />}
                {step === 3 && <Step3Details />}
                {step === 4 && <Step4Confirm />}
            </div>

            {error && (
                <div className="mt-4 border border-red-500 bg-red-50 p-3.5 text-red-700 text-xs font-bold uppercase">
                    [VALIDATION FAULT] {error}
                </div>
            )}

            {/* Stepper Action Bar */}
            <div className="mt-6 pt-4 border-t border-black/15 flex items-center justify-between">
                {step > 1 ? (
                    <button
                        type="button"
                        onClick={prevStep}
                        className="border border-black/25 bg-surface px-6 py-3 font-bold uppercase text-xs text-ink-primary hover:bg-surface-container transition-none cursor-pointer"
                    >
                        [ ← PREVIOUS STEP ]
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => setAuthMode('login')}
                        className="text-outline text-xs font-bold uppercase hover:underline cursor-pointer"
                    >
                        [ CANCEL ]
                    </button>
                )}

                <button
                    type="button"
                    onClick={handleNext}
                    disabled={isLoading}
                    className="bg-canvas-blueprint text-white px-8 py-3.5 font-bold uppercase text-xs sm:text-sm border border-canvas-blueprint hover:bg-primary-hover transition-none cursor-pointer shadow-[3px_3px_0px_#0A0A0A] disabled:opacity-50"
                >
                    <span>
                        {isLoading
                            ? '[ INITIALIZING ACCOUNT... ]'
                            : step === 4
                            ? '[ INITIALIZE ACCOUNT → ]'
                            : '[ PROCEED TO NEXT STEP → ]'}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default RegisterWizard;
