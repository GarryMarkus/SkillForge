import React from 'react';
import { useAuthStore } from '../../../store/authStore';

const RoleCard = ({ role, title, description, features, selectRole, selected }) => {
    return (
        <div
            onClick={() => selectRole(role)}
            className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                selected
                    ? 'border-blue-500 bg-blue-500/[0.06] shadow-sm'
                    : 'border-white/[0.08] bg-[#181A22] hover:border-zinc-700 hover:bg-zinc-900/60'
            }`}
        >
            <div>
                <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                        {role === 'student' ? 'For Individuals' : 'For Companies'}
                    </span>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                        selected
                            ? 'bg-blue-600 text-white'
                            : 'border border-zinc-700 text-transparent'
                    }`}>
                        ✓
                    </span>
                </div>

                <h3 className="text-base font-semibold text-white mb-1">
                    {title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {description}
                </p>
            </div>

            <div className="border-t border-white/[0.06] pt-3 space-y-2">
                {features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                        <span className="text-blue-400 font-bold">•</span>
                        <span>{feat}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Step1Role = () => {
    const { role, setRole } = useAuthStore();

    return (
        <div className="space-y-4">
            <div className="text-center mb-4">
                <h3 className="text-sm font-semibold text-white">
                    Choose Your Path
                </h3>
                <p className="text-xs text-zinc-400">
                    Select how you intend to use the platform to tailor your experience
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <RoleCard
                    role="student"
                    selected={role === 'student'}
                    selectRole={setRole}
                    title="Developer / Candidate"
                    description="Take objective skill assessments, highlight real-world code ability, and connect directly with hiring teams."
                    features={[
                        'Empirical skill verification',
                        'Personalized learning tracks',
                        'Direct recruiter outreach',
                    ]}
                />

                <RoleCard
                    role="client"
                    selected={role === 'client'}
                    selectRole={setRole}
                    title="Employer / Recruiter"
                    description="Access pre-evaluated software engineers without manual resume screening delays or guesswork."
                    features={[
                        'Pre-screened candidate pipeline',
                        'Objective code evaluation',
                        'Salary benchmark transparency',
                    ]}
                />
            </div>
        </div>
    );
};

export default Step1Role;
