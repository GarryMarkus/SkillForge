import React, { useState } from 'react';
import { useAuthStore } from '../../../store/authStore';

const SummaryItem = ({ label, value, step, setStep }) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return null;

    return (
        <div className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0 text-sm">
            <div>
                <span className="text-xs text-gray-500 block">{label}</span>
                <span className="font-semibold text-gray-900 block mt-0.5">
                    {Array.isArray(value) ? value.join(', ') : String(value)}
                </span>
            </div>
            <button
                type="button"
                onClick={() => setStep(step)}
                className="text-blue-600 text-xs font-semibold hover:underline cursor-pointer ml-3"
            >
                Edit
            </button>
        </div>
    );
};

const Step4Confirm = () => {
    const { role, formData, setStep } = useAuthStore();
    const [agreed, setAgreed] = useState(true);

    return (
        <div className="space-y-4 font-sans">
            <div className="mb-2">
                <h3 className="text-sm font-semibold text-gray-900">
                    Review and Confirm
                </h3>
                <p className="text-xs text-gray-500">
                    Please verify your information before finishing setup.
                </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 space-y-1">
                <SummaryItem
                    label="Account Type"
                    value={role === 'student' ? 'Candidate / Job Seeker' : 'Employer / Recruiter'}
                    step={1}
                    setStep={setStep}
                />
                <SummaryItem label="Full Name" value={formData.fullName} step={2} setStep={setStep} />
                <SummaryItem label="Email Address" value={formData.email} step={2} setStep={setStep} />

                {role === 'client' && (
                    <>
                        <SummaryItem label="Company Name" value={formData.companyName} step={2} setStep={setStep} />
                        <SummaryItem label="Your Title" value={formData.designation} step={2} setStep={setStep} />
                        <SummaryItem label="Industry" value={formData.industry} step={3} setStep={setStep} />
                        <SummaryItem label="Team Size" value={formData.companySize} step={3} setStep={setStep} />
                    </>
                )}

                {role === 'student' && (
                    <>
                        <SummaryItem label="Career Goal" value={formData.learningGoal} step={3} setStep={setStep} />
                        <SummaryItem label="Experience Level" value={formData.experienceLevel} step={3} setStep={setStep} />
                        <SummaryItem label="Target Skills" value={formData.interests} step={3} setStep={setStep} />
                    </>
                )}
            </div>

            <label className="flex items-start gap-2.5 p-3 rounded-xl border border-gray-200 bg-white cursor-pointer select-none">
                <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 accent-blue-600 cursor-pointer"
                />
                <span className="text-xs text-gray-600 leading-normal">
                    I agree to the <span className="text-blue-600 font-semibold hover:underline">Terms of Service</span> and <span className="text-blue-600 font-semibold hover:underline">Privacy Policy</span>.
                </span>
            </label>
        </div>
    );
};

export default Step4Confirm;
