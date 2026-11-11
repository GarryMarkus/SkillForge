import React from 'react';
import { useAuthStore } from '../../../store/authStore';

const RoleCard = ({ role, title, description, features, selectRole, selected }) => {
    return (
        <div
            onClick={() => selectRole(role)}
            className={`p-5 rounded-md border font-mono transition-colors cursor-pointer flex flex-col justify-between ${
                selected
                    ? 'border-white/30 border-t-white/40 bg-[#181B22]'
                    : 'border-white/[0.08] border-t-white/15 bg-[#0D0F14] hover:border-white/20'
            }`}
        >
            <div>
                <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#737373]">
                        {role === 'student' ? 'For Candidates' : 'For Hiring Teams'}
                    </span>
                    <span className={`text-xs font-mono ${
                        selected
                            ? 'text-white font-bold'
                            : 'text-[#444444]'
                    }`}>
                        {selected ? '✓' : ''}
                    </span>
                </div>

                <h3 className="text-sm font-semibold text-[#f5f5f5] mb-1 font-mono">
                    {title}
                </h3>
                <p className="text-xs text-[#737373] leading-relaxed mb-4">
                    {description}
                </p>
            </div>

            <div className="border-t border-white/[0.06] pt-3 space-y-2">
                {features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#888888]">
                        <span className="text-[#555555]">-</span>
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
        <div className="space-y-4 font-mono">
            <div className="text-center mb-4">
                <h3 className="text-sm font-semibold text-[#f5f5f5]">
                    Select Your Role
                </h3>
                <p className="text-xs text-[#737373]">
                    Choose your operating profile on the protocol
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
                        'Transparent salary benchmarks',
                    ]}
                />
            </div>
        </div>
    );
};

export default Step1Role;
