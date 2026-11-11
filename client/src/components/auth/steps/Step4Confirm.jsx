import React, { useState } from 'react';
import { useAuthStore } from '../../../store/authStore';

const SummaryItem = ({ label, value, step, setStep }) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return null;

    return (
        <div className="flex items-center justify-between py-2 border-b border-white/[0.06] last:border-0 text-xs font-mono">
            <div>
                <span className="text-[#737373] block">{label}</span>
                <span className="font-semibold text-[#f5f5f5] block mt-0.5">
                    {Array.isArray(value) ? value.join(', ') : String(value)}
                </span>
            </div>
            <button
                type="button"
                onClick={() => setStep(step)}
                className="text-[#888888] text-xs font-mono hover:text-white hover:underline cursor-pointer ml-3"
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
        <div className="space-y-4 font-mono">
            <div className="mb-2">
                <h3 className="text-sm font-semibold text-[#f5f5f5]">
                    Review and Confirm
                </h3>
                <p className="text-xs text-[#737373]">
                    Verify configuration before initialization.
                </p>
            </div>

            <div className="rounded-sm border border-white/[0.08] border-t-white/15 bg-[#0D0F14] p-4 space-y-1">
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

            <label className="flex items-start gap-2.5 p-3 rounded-sm border border-white/[0.08] bg-[#0D0F14] cursor-pointer select-none">
                <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 w-3.5 h-3.5 rounded-none border border-white/20 bg-[#060709] text-white accent-zinc-200 cursor-pointer"
                />
                <span className="text-xs text-[#737373] leading-normal font-mono">
                    I accept the <span className="text-[#ededed] underline">Terms of Service</span> and <span className="text-[#ededed] underline">Privacy Policy</span>.
                </span>
            </label>
        </div>
    );
};

export default Step4Confirm;
