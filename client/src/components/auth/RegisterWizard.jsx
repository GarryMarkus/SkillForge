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
        { id: 1, title: 'Role' },
        { id: 2, title: 'Account' },
        { id: 3, title: 'Profile' },
        { id: 4, title: 'Review' },
    ];

    const validateCurrentStep = () => {
        if (step === 1) {
            if (!role) {
                setError('Please select how you plan to use SkillForge.');
                return false;
            }
        }
        if (step === 2) {
            if (!formData.fullName || !formData.email || !formData.password) {
                setError('Please fill in your name, email, and password.');
                return false;
            }
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match. Please re-enter them.');
                return false;
            }
            if (role === 'client' && (!formData.companyName || !formData.designation)) {
                setError('Company name and job title are required for recruiter accounts.');
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
            setError(err.message || 'Registration failed. Please check the details you entered.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return <SuccessState />;
    }

    return (
        <div className="w-full bg-[#121318] rounded-xl border border-white/[0.08] p-7 sm:p-9 shadow-xl font-sans select-none">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.06]">
                <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">
                        Create Your Account
                    </h2>
                    <p className="text-xs text-zinc-400 mt-0.5">
                        Step {step} of 4: {steps[step - 1]?.title}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                >
                    Sign In instead
                </button>
            </div>

            {/* Stepper Tabs - Minimalist horizontal progress bar */}
            <div className="grid grid-cols-4 gap-2 mb-6">
                {steps.map((s) => {
                    const isActive = s.id === step;
                    const isPast = s.id < step;

                    return (
                        <div
                            key={s.id}
                            className={`py-2 px-1 text-center rounded-lg text-xs font-medium transition-all ${
                                isActive
                                    ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
                                    : isPast
                                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                    : 'bg-zinc-900/60 text-zinc-400 border border-zinc-800/80'
                            }`}
                        >
                            <span>{s.title}</span>
                        </div>
                    );
                })}
            </div>

            {/* Step Body */}
            <div className="mb-6">
                {step === 1 && <Step1Role />}
                {step === 2 && <Step2BasicInfo />}
                {step === 3 && <Step3Details />}
                {step === 4 && <Step4Confirm />}
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-4 rounded-lg border border-rose-500/20 bg-rose-500/10 p-3 text-rose-400 text-xs font-medium">
                    {error}
                </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                {step > 1 ? (
                    <button
                        type="button"
                        onClick={prevStep}
                        className="px-4 py-2 rounded-lg border border-zinc-700/80 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                        &larr; Back
                    </button>
                ) : (
                    <div />
                )}

                <button
                    type="button"
                    onClick={handleNext}
                    disabled={isLoading}
                    className="bg-white hover:bg-zinc-100 text-zinc-950 px-5 py-2 rounded-lg text-xs font-semibold transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                >
                    {isLoading
                        ? 'Creating Account...'
                        : step === 4
                        ? 'Confirm & Create Account'
                        : 'Continue'}
                </button>
            </div>
        </div>
    );
};

export default RegisterWizard;
