import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import Button from '../ui/Button';

// Steps
import Step1Role from './steps/Step1Role';
import Step2BasicInfo from './steps/Step2BasicInfo';
import Step3Details from './steps/Step3Details';
import Step4Confirm from './steps/Step4Confirm';
import SuccessState from './SuccessState';

const RegisterWizard = () => {
    const { step, nextStep, prevStep, role, setAuthMode } = useAuthStore();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Step configuration
    const steps = [
        { id: 1, title: 'Role' },
        { id: 2, title: 'Basic Info' },
        { id: 3, title: 'Details' },
        { id: 4, title: 'Confirm' },
    ];

    const renderStep = () => {
        switch (step) {
            case 1: return <Step1Role />;
            case 2: return <Step2BasicInfo />;
            case 3: return <Step3Details />;
            case 4: return <Step4Confirm />;
            default: return null;
        }
    }

    const handleNext = () => {
        // Validation logic can go here
        if (step === 1 && !role) return;

        if (step === 4) {
            handleComplete();
        } else {
            nextStep();
        }
    };

    const handleComplete = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
        }, 2000);
    };

    if (isSuccess) {
        return <SuccessState />;
    }

    return (
        <div className="w-full">
            {/* Header / Progress */}
            <div className="mb-8">
                <div className="flex items-center justify-between relative mb-2">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full -z-10" />
                    <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-500 rounded-full -z-10 transition-all duration-300"
                        style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                    />

                    {steps.map((s) => {
                        const isActive = s.id === step;
                        const isCompleted = s.id < step;

                        return (
                            <div key={s.id} className="flex flex-col items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-4
                                     ${isActive ? 'bg-blue-500 text-white border-white dark:border-black scale-110 shadow-lg' :
                                        isCompleted ? 'bg-blue-500 text-white border-white dark:border-black' :
                                            'bg-gray-200 dark:bg-gray-800 text-gray-500 border-transparent'}
                                 `}>
                                    {isCompleted ? <Check className="w-4 h-4" /> : s.id}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="flex justify-between px-1">
                    {steps.map((s) => (
                        <span key={s.id} className={`text-[10px] font-bold uppercase tracking-wider transition-colors
                             ${s.id === step ? 'text-blue-500' : 'text-gray-400'}
                         `}>{s.title}</span>
                    ))}
                </div>
            </div>

            {/* Step Content */}
            <div className="min-h-[300px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {renderStep()}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Actions */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                {step === 1 ? (
                    <button
                        onClick={() => setAuthMode('login')}
                        className="text-sm font-bold text-gray-500 hover:text-black dark:hover:text-white"
                    >
                        Back to Login
                    </button>
                ) : (
                    <button
                        onClick={prevStep}
                        className="flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-black dark:hover:text-white"
                    >
                        <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                )}

                <Button
                    onClick={handleNext}
                    disabled={(step === 1 && !role) || isLoading}
                    className="px-8 py-3 !bg-black dark:!bg-white !text-white dark:!text-black min-w-[140px]"
                >
                    {isLoading ? 'Creating...' : step === 4 ? 'Create Account' : 'Continue'}
                    {!isLoading && <ChevronRight className="w-4 h-4 ml-1" />}
                </Button>
            </div>
        </div>
    );
};

export default RegisterWizard;
