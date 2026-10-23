import React from 'react';
import { useAuthStore } from '../../../store/authStore';

const RoleCard = ({ role, title, description, features, selectRole, selected }) => {
    return (
        <div
            onClick={() => selectRole(role)}
            className={`p-5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                selected
                    ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50'
            }`}
        >
            <div>
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        {role === 'student' ? 'For Individuals' : 'For Companies'}
                    </span>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                        selected
                            ? 'bg-blue-600 text-white'
                            : 'border border-gray-300 text-transparent'
                    }`}>
                        ✓
                    </span>
                </div>

                <h3 className="text-base font-bold text-gray-900 mb-1">
                    {title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {description}
                </p>
            </div>

            <div className="border-t border-gray-100 pt-3 space-y-2">
                {features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                        <span className="text-blue-600 font-bold">•</span>
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
        <div className="space-y-4 font-sans">
            <div className="mb-2">
                <h3 className="text-sm font-semibold text-gray-900">
                    How do you plan to use SkillForge?
                </h3>
                <p className="text-xs text-gray-500">
                    Choose your account type so we can customize your workspace.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <RoleCard
                    role="student"
                    title="Candidate / Job Seeker"
                    description="Take verified assessments, discover matching job roles, and access tailored learning modules."
                    features={[
                        'Empirical skill verification',
                        'Direct job recommendations',
                        'Personalized learning paths'
                    ]}
                    selectRole={setRole}
                    selected={role === 'student'}
                />

                <RoleCard
                    role="client"
                    title="Employer / Recruiter"
                    description="Post job openings, specify technical skill criteria, and review ranked verified talent."
                    features={[
                        'Verified candidate pipeline',
                        'Automated skill matching',
                        'Instant direct offer dispatch'
                    ]}
                    selectRole={setRole}
                    selected={role === 'client'}
                />
            </div>
        </div>
    );
};

export default Step1Role;
