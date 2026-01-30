import React, { useState } from 'react';
import { useAuthStore } from '../../../store/authStore';
import { Edit2 } from 'lucide-react';

const SummaryItem = ({ label, value, step, setStep }) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return null;

    return (
        <div className="flex items-start justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0 group">
            <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">{label}</span>
                <span className="text-sm font-medium text-black dark:text-white block">
                    {Array.isArray(value) ? value.join(', ') : value}
                </span>
            </div>
            <button
                onClick={() => setStep(step)}
                className="p-1.5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg"
            >
                <Edit2 className="w-3.5 h-3.5" />
            </button>
        </div>
    );
};

const Step4Confirm = () => {
    const { role, formData, setStep } = useAuthStore();
    const [agreed, setAgreed] = useState(false);

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-black text-black dark:text-white">Review & Confirm</h2>
                <p className="text-gray-500">One last look before you join.</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800">
                <SummaryItem label="Role" value={role === 'student' ? 'Student / Individual' : 'Client / Startup'} step={1} setStep={setStep} />
                <SummaryItem label="Full Name" value={formData.fullName} step={2} setStep={setStep} />
                <SummaryItem label="Email" value={formData.email} step={2} setStep={setStep} />

                {role === 'client' && (
                    <>
                        <SummaryItem label="Company" value={formData.companyName} step={2} setStep={setStep} />
                        <SummaryItem label="Designation" value={formData.designation} step={2} setStep={setStep} />
                        <SummaryItem label="Industry" value={formData.industry} step={3} setStep={setStep} />
                    </>
                )}

                {role === 'student' && (
                    <>
                        <SummaryItem label="Goal" value={formData.learningGoal} step={3} setStep={setStep} />
                        <SummaryItem label="Experience" value={formData.experienceLevel} step={3} setStep={setStep} />
                        <SummaryItem label="Interests" value={formData.interests} step={3} setStep={setStep} />
                    </>
                )}
            </div>

            <label className="flex items-start gap-3 cursor-pointer group p-4 border-2 border-transparent hover:border-gray-100 dark:hover:border-gray-800 rounded-2xl transition-colors">
                <input
                    type="checkbox"
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                />
                <span className="text-sm text-gray-500 leading-relaxed">
                    I agree to the <a href="#" className="font-bold text-black dark:text-white hover:underline">Terms of Service</a> and <a href="#" className="font-bold text-black dark:text-white hover:underline">Privacy Policy</a>. I consent to receiving product updates and newsletters.
                </span>
            </label>
        </div>
    );
};

export default Step4Confirm;
