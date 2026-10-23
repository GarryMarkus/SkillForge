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
        <div className="w-full bg-white rounded-2xl border border-gray-200 p-8 sm:p-10 shadow-lg font-sans select-none">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">
                        Create Your Account
                    </h2>
                    <p className="text-xs text-gray-500">
                        Step {step} of 4: {steps[step - 1]?.title}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                >
                    Already have an account? Sign in
                </button>
            </div>

            {/* Stepper Tabs */}
            <div className="grid grid-cols-4 gap-2 mb-6">
                {steps.map((s) => {
                    const isActive = s.id === step;
                    const isPast = s.id < step;

                    return (
                        <div
                            key={s.id}
                            className={`py-2 px-1 text-center rounded-lg text-xs font-semibold transition-all ${
                                isActive
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : isPast
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'bg-gray-100 text-gray-400'
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
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3.5 text-red-700 text-xs font-medium">
                    {error}
                </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                {step > 1 ? (
                    <button
                        type="button"
                        onClick={prevStep}
                        className="px-5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        ← Back
                    </button>
                ) : (
                    <div />
                )}

                <button
                    type="button"
                    onClick={handleNext}
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-xs font-semibold transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                >
                    {isLoading
                        ? 'Creating Account...'
                        : step === 4
                        ? 'Confirm & Create Account →'
                        : 'Continue →'}
                </button>
            </div>
        </div>
    );
};

export default RegisterWizard;
