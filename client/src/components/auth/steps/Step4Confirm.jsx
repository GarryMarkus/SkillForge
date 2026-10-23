import React, { useState } from 'react';
import { useAuthStore } from '../../../store/authStore';

const SummaryItem = ({ label, value, step, setStep }) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return null;

    return (
        <div className="flex items-center justify-between py-2 border-b border-black/10 last:border-0 text-body-sm font-mono">
            <div>
                <span className="text-[10px] font-bold text-secondary uppercase block">{label}</span>
                <span className="font-bold text-on-surface uppercase block">
                    {Array.isArray(value) ? value.join(', ') : String(value)}
                </span>
            </div>
            <button
                type="button"
                onClick={() => setStep(step)}
                className="text-primary-container text-label-sm font-bold uppercase hover:underline cursor-pointer ml-2"
            >
                [EDIT]
            </button>
        </div>
    );
};

const Step4Confirm = () => {
    const { role, formData, setStep } = useAuthStore();
    const [agreed, setAgreed] = useState(true);

    return (
        <div className="space-y-space-md font-mono">
            <div className="border-b border-black/15 pb-2">
                <h2 className="text-headline-sm font-bold uppercase text-on-surface">
                    [ 04_CONFIRMATION // AUDIT_PARAMETERS ]
                </h2>
                <p className="text-body-sm text-secondary">
                    Review and finalize dossier parameters before account initialization.
                </p>
            </div>

            <div className="border border-black/20 bg-surface p-space-md shadow-[2px_2px_0px_rgba(0,0,0,0.1)]">
                <SummaryItem
                    label="OPERATIONAL_ROLE"
                    value={role === 'student' ? 'CANDIDATE / STUDENT_ENGINEER' : 'RECRUITER / ENTERPRISE_CLIENT'}
                    step={1}
                    setStep={setStep}
                />
                <SummaryItem label="LEGAL_NAME" value={formData.fullName} step={2} setStep={setStep} />
                <SummaryItem label="EMAIL_IDENTIFIER" value={formData.email} step={2} setStep={setStep} />

                {role === 'client' && (
                    <>
                        <SummaryItem label="COMPANY_NAME" value={formData.companyName} step={2} setStep={setStep} />
                        <SummaryItem label="ROLE_DESIGNATION" value={formData.designation} step={2} setStep={setStep} />
                        <SummaryItem label="INDUSTRY_VERTICAL" value={formData.industry} step={3} setStep={setStep} />
                        <SummaryItem label="ENGINEERING_SIZE" value={formData.companySize} step={3} setStep={setStep} />
                    </>
                )}

                {role === 'student' && (
                    <>
                        <SummaryItem label="CAREER_GOAL" value={formData.learningGoal} step={3} setStep={setStep} />
                        <SummaryItem label="EXPERIENCE_TIER" value={formData.experienceLevel} step={3} setStep={setStep} />
                        <SummaryItem label="TARGET_SKILLS" value={formData.interests} step={3} setStep={setStep} />
                    </>
                )}
            </div>

            <label className="flex items-start gap-2.5 p-space-sm border border-black/20 bg-surface-container-low cursor-pointer select-none">
                <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 w-4 h-4 border border-black/30 rounded-none accent-primary-container cursor-pointer"
                />
                <span className="text-body-sm text-secondary leading-normal">
                    I AGREE TO THE <strong className="text-on-surface underline">TERMS OF SERVICE</strong> AND <strong className="text-on-surface underline">PRIVACY SPECIFICATION</strong>. I CONSENT TO VERIFIED HARDWARE TELEMETRY AUDITS AND CRYPTOGRAPHIC PROFILE RECORDING.
                </span>
            </label>
        </div>
    );
};

export default Step4Confirm;
