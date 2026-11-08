import React from 'react';
import { useAuthStore } from '../../../store/authStore';

const SkillPill = ({ label, selected, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
            selected
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-zinc-700/60'
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
            <div className="space-y-4 font-sans">
                <div className="mb-2">
                    <h3 className="text-sm font-semibold text-white">
                        Customize Your Career Goals
                    </h3>
                    <p className="text-xs text-zinc-400">
                        Tell us what you want to achieve so we can suggest relevant assessments.
                    </p>
                </div>

                {/* Primary Learning Goal */}
                <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                        Primary Career Goal
                    </label>
                    <select
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900/80 border border-zinc-700/70 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none text-sm text-white transition-colors cursor-pointer"
                        value={formData.learningGoal || ''}
                        onChange={(e) => updateFormData({ learningGoal: e.target.value })}
                    >
                        <option value="">Select a career goal</option>
                        <option value="first_job">Land my first engineering role</option>
                        <option value="career_switch">Switch into software engineering</option>
                        <option value="skill_upgrade">Advance to senior level roles</option>
                        <option value="freelancing">Find freelance or contract projects</option>
                    </select>
                </div>

                {/* Experience Tier */}
                <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                        Experience Level
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                            <button
                                key={level}
                                type="button"
                                onClick={() => updateFormData({ experienceLevel: level })}
                                className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                                    formData.experienceLevel === level
                                        ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                                        : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-800 hover:text-white'
                                }`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Target Competencies */}
                <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                        Areas of Interest
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
        <div className="space-y-4 font-sans">
            <div className="mb-2">
                <h3 className="text-sm font-semibold text-white">
                    Hiring Preferences
                </h3>
                <p className="text-xs text-zinc-400">
                    Help us match you with candidates fitting your company's scale.
                </p>
            </div>

            <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Industry Domain
                </label>
                <select
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900/80 border border-zinc-700/70 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none text-sm text-white transition-colors cursor-pointer"
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
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Engineering Team Size
                </label>
                <div className="grid grid-cols-2 gap-2">
                    {['1-10 Devs', '11-50 Devs', '51-200 Devs', '201+ Devs'].map(size => (
                        <button
                            key={size}
                            type="button"
                            onClick={() => updateFormData({ companySize: size })}
                            className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                                formData.companySize === size
                                    ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                                    : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-800 hover:text-white'
                            }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Expected Hires This Year
                </label>
                <input
                    type="number"
                    min="1"
                    placeholder="e.g. 15 roles"
                    value={formData.trainCount || ''}
                    onChange={(e) => updateFormData({ trainCount: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900/80 border border-zinc-700/70 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none text-sm text-white placeholder-zinc-500 transition-colors"
                />
            </div>
        </div>
    );
};

export default Step3Details;
