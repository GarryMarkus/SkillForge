import React from 'react';
import { useAuthStore } from '../../../store/authStore';

const SkillPill = ({ label, selected, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className={`px-2.5 py-1 rounded-sm text-xs font-mono transition-colors cursor-pointer ${
            selected
                ? 'bg-[#F5F5F5] text-[#050505] font-semibold border border-[#F5F5F5]'
                : 'bg-white/[0.04] text-zinc-300 hover:text-white border border-white/[0.08] hover:border-white/20'
        }`}
    >
        {label}
    </button>
);

const Step3Details = () => {
    const { role, formData, updateFormData } = useAuthStore();

    const handleInterestToggle = (interest) => {
        const current = formData.interests || [];
        const updated = current.includes(interest)
            ? current.filter(i => i !== interest)
            : [...current, interest];
        updateFormData({ interests: updated });
    };

    if (role === 'student') {
        return (
            <div className="space-y-4 font-mono">
                <div className="mb-2">
                    <h3 className="text-sm font-semibold text-[#f5f5f5]">
                        Career Objectives
                    </h3>
                    <p className="text-xs text-[#737373]">
                        Specify your target trajectory for tailored assessments.
                    </p>
                </div>

                {/* Primary Learning Goal */}
                <div>
                    <label className="block text-xs font-mono text-[#888888] mb-1.5">
                        Primary Career Goal
                    </label>
                    <select
                        className="w-full px-3.5 py-2.5 rounded-sm bg-[#060709] border border-white/[0.08] focus:border-white/25 focus:outline-none text-xs text-[#f5f5f5] transition-colors cursor-pointer"
                        value={formData.learningGoal || ''}
                        onChange={(e) => updateFormData({ learningGoal: e.target.value })}
                    >
                        <option value="">Select a career goal</option>
                        <option value="first_job">Land first software engineering role</option>
                        <option value="career_switch">Transition into software engineering</option>
                        <option value="skill_upgrade">Advance to senior / staff level</option>
                        <option value="freelancing">Contract / consulting engagements</option>
                    </select>
                </div>

                {/* Experience Tier */}
                <div>
                    <label className="block text-xs font-mono text-[#888888] mb-1.5">
                        Experience Level
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                            <button
                                key={level}
                                type="button"
                                onClick={() => updateFormData({ experienceLevel: level })}
                                className={`py-2 px-3 rounded-sm text-xs font-mono border transition-colors cursor-pointer ${
                                    formData.experienceLevel === level
                                        ? 'bg-[#181B22] text-white border-white/30 font-medium'
                                        : 'bg-[#060709] text-[#888888] border-white/[0.08] hover:border-white/20 hover:text-white'
                                }`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Target Competencies */}
                <div>
                    <label className="block text-xs font-mono text-[#888888] mb-1.5">
                        Target Competencies
                    </label>
                    <div className="flex flex-wrap gap-2 pt-1">
                        {['Python', 'FastAPI', 'Django', 'Docker', 'PostgreSQL', 'Redis', 'Kubernetes', 'React', 'System Design'].map(topic => (
                            <SkillPill
                                key={topic}
                                label={topic}
                                selected={formData.interests?.includes(topic)}
                                onClick={() => handleInterestToggle(topic)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Client/Recruiter Details
    return (
        <div className="space-y-4 font-mono">
            <div className="mb-2">
                <h3 className="text-sm font-semibold text-[#f5f5f5]">
                    Hiring Preferences
                </h3>
                <p className="text-xs text-[#737373]">
                    Configure criteria for engineering pipeline alignment.
                </p>
            </div>

            <div>
                <label className="block text-xs font-mono text-[#888888] mb-1.5">
                    Industry Domain
                </label>
                <select
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#060709] border border-white/[0.08] focus:border-white/25 focus:outline-none text-xs text-[#f5f5f5] transition-colors cursor-pointer"
                    value={formData.industry || ''}
                    onChange={(e) => updateFormData({ industry: e.target.value })}
                >
                    <option value="">Select industry</option>
                    <option value="Cloud Infrastructure">Cloud Infrastructure &amp; Networking</option>
                    <option value="Distributed Systems">Distributed Systems &amp; Databases</option>
                    <option value="Artificial Intelligence">Artificial Intelligence &amp; MLOps</option>
                    <option value="Fintech & Banking">Financial Technology &amp; Banking</option>
                    <option value="Enterprise SaaS">Enterprise SaaS &amp; Software</option>
                </select>
            </div>

            <div>
                <label className="block text-xs font-mono text-[#888888] mb-1.5">
                    Engineering Team Size
                </label>
                <div className="grid grid-cols-2 gap-2">
                    {['1-10 Devs', '11-50 Devs', '51-200 Devs', '201+ Devs'].map(size => (
                        <button
                            key={size}
                            type="button"
                            onClick={() => updateFormData({ companySize: size })}
                            className={`py-2 px-3 rounded-sm text-xs font-mono border transition-colors cursor-pointer ${
                                formData.companySize === size
                                    ? 'bg-[#181B22] text-white border-white/30 font-medium'
                                    : 'bg-[#060709] text-[#888888] border-white/[0.08] hover:border-white/20 hover:text-white'
                            }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-xs font-mono text-[#888888] mb-1.5">
                    Expected Hires This Year
                </label>
                <input
                    type="number"
                    min="1"
                    placeholder="e.g. 15 roles"
                    value={formData.trainCount || ''}
                    onChange={(e) => updateFormData({ trainCount: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#060709] border border-white/[0.08] focus:border-white/25 focus:outline-none text-xs text-[#f5f5f5] placeholder-[#555555] transition-colors"
                />
            </div>
        </div>
    );
};

export default Step3Details;
