import React from 'react';
import { useAuthStore } from '../../../store/authStore';

const SkillPill = ({ label, selected, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className={`px-2.5 py-1 rounded-sm text-xs font-mono transition-all cursor-pointer ${
            selected
                ? 'bg-[#111113] text-white border border-white/30 shadow-sm'
                : 'bg-[#050505] text-[#888888] hover:text-[#f5f5f5] border border-white/10 hover:border-white/20'
        }`}
    >
        {selected ? `[✓ ${label}]` : `[ ${label} ]`}
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
                        className="w-full px-3.5 py-2.5 rounded-md bg-[#050505] border border-white/10 focus:border-white/30 focus:outline-none text-xs text-[#f5f5f5] transition-colors cursor-pointer"
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
                                className={`py-2 px-3 rounded-md text-xs font-mono border transition-all cursor-pointer ${
                                    formData.experienceLevel === level
                                        ? 'bg-[#111113] text-white border-white/30'
                                        : 'bg-[#050505] text-[#737373] border-white/10 hover:border-white/20 hover:text-[#f5f5f5]'
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
                    className="w-full px-3.5 py-2.5 rounded-md bg-[#050505] border border-white/10 focus:border-white/30 focus:outline-none text-xs text-[#f5f5f5] transition-colors cursor-pointer"
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
                            className={`py-2 px-3 rounded-md text-xs font-mono border transition-all cursor-pointer ${
                                formData.companySize === size
                                    ? 'bg-[#111113] text-white border-white/30'
                                    : 'bg-[#050505] text-[#737373] border-white/10 hover:border-white/20 hover:text-[#f5f5f5]'
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
                    className="w-full px-3.5 py-2.5 rounded-md bg-[#050505] border border-white/10 focus:border-white/30 focus:outline-none text-xs text-[#f5f5f5] placeholder-[#444444] transition-colors"
                />
            </div>
        </div>
    );
};

export default Step3Details;
