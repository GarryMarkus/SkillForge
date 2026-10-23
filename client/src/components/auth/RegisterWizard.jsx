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
        { id: 1, title: '01_ROLE' },
        { id: 2, title: '02_IDENTITY' },
        { id: 3, title: '03_CALIBRATE' },
        { id: 4, title: '04_CONFIRM' },
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
        <div className="w-full border border-black/20 bg-surface-container-lowest p-space-lg shadow-[4px_4px_0px_#1D52B8] font-mono">
            {/* Wizard Header Bar & Step Stepper */}
            <div className="border-b border-black/15 pb-space-sm mb-space-md">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-label-sm font-bold uppercase text-primary-container">
                        [ REQUISITION_REGISTRATION // WIZARD_TX ]
                    </span>
                    <button
                        type="button"
                        onClick={() => setAuthMode('login')}
                        className="text-label-sm font-bold uppercase text-secondary hover:text-black hover:underline cursor-pointer"
                    >
                        [ ALREADY_REGISTERED? SIGN_IN ]
                    </button>
                </div>

                {/* Stepper Tabs */}
                <div className="grid grid-cols-4 gap-1 border border-black/20 bg-surface-container p-0.5">
                    {steps.map((s) => {
                        const isActive = s.id === step;
                        const isPast = s.id < step;

                        return (
                            <div
                                key={s.id}
                                className={`text-center py-1 text-[10px] font-bold uppercase transition-none ${
                                    isActive
                                        ? 'bg-primary-container text-on-primary'
                                        : isPast
                                        ? 'bg-primary-fixed/30 text-primary-container'
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
                <div className="mt-space-md border border-error bg-error-container/20 p-space-sm text-error text-label-sm font-bold uppercase">
                    [VALIDATION_FAULT] {error}
                </div>
            )}

            {/* Stepper Action Bar */}
            <div className="mt-space-lg pt-space-sm border-t border-black/15 flex items-center justify-between">
                {step > 1 ? (
                    <button
                        type="button"
                        onClick={prevStep}
                        className="border border-black/30 bg-surface px-space-md py-2 font-bold uppercase text-label-md text-on-surface hover:bg-surface-container transition-none cursor-pointer"
                    >
                        [ &lt;- PREVIOUS_STEP ]
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => setAuthMode('login')}
                        className="text-secondary text-label-sm font-bold uppercase hover:underline cursor-pointer"
                    >
                        [ CANCEL ]
                    </button>
                )}

                <button
                    type="button"
                    onClick={handleNext}
                    disabled={isLoading}
                    className="bg-primary-container text-on-primary px-space-lg py-2 font-bold uppercase text-label-md border border-primary-container hover:bg-primary transition-none cursor-pointer shadow-[2px_2px_0px_#191C1D] disabled:opacity-50"
                >
                    <span>
                        {isLoading
                            ? '[ COMMITTING_DOSSIER... ]'
                            : step === 4
                            ? '[ INITIALIZE_ACCOUNT -> ]'
                            : '[ PROCEED_NEXT_STEP -> ]'}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default RegisterWizard;
