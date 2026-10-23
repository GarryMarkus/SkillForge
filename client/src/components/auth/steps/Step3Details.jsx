import React from 'react';
import { useAuthStore } from '../../../store/authStore';

const CadChip = ({ label, selected, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className={`px-3 py-1 text-label-sm font-bold uppercase transition-none border cursor-pointer ${
            selected
                ? 'bg-primary-container text-on-primary border-primary-container shadow-[2px_2px_0px_#191C1D]'
                : 'bg-surface text-on-surface border-black/20 hover:bg-surface-container'
        }`}
    >
        [{label}]
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
            <div className="space-y-space-md font-mono">
                <div className="border-b border-black/15 pb-2">
                    <h2 className="text-headline-sm font-bold uppercase text-on-surface">
                        [ 03_CALIBRATION // CANDIDATE_PROFILE ]
                    </h2>
                    <p className="text-body-sm text-secondary">
                        Calibrate AI diagnostic models to your engineering career trajectory.
                    </p>
                </div>

                {/* Primary Learning Goal */}
                <div>
                    <label className="block text-label-sm uppercase font-bold text-outline mb-1">
                        PRIMARY_CAREER_TRAJECTORY_GOAL
                    </label>
                    <select
                        className="w-full px-3 py-2 bg-surface border border-black/25 focus:border-primary focus:outline-none text-body-md font-mono uppercase font-bold"
                        value={formData.learningGoal || ''}
                        onChange={(e) => updateFormData({ learningGoal: e.target.value })}
                    >
                        <option value="">-- SELECT GOAL SPECIFICATION --</option>
                        <option value="first_job">LAND FIRST SYSTEMS ROLE (JUNIOR_L3)</option>
                        <option value="career_switch">CROSS-DISCIPLINE CAREER SWITCH</option>
                        <option value="skill_upgrade">ADVANCED EMPIRICAL SKILL UPGRADE (L5+)</option>
                        <option value="freelancing">AUTONOMOUS CONTRACT &amp; FREELANCING</option>
                    </select>
                </div>

                {/* Experience Tier */}
                <div>
                    <label className="block text-label-sm uppercase font-bold text-outline mb-1">
                        CURRENT_ENGINEERING_EXPERIENCE_TIER
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                            <button
                                key={level}
                                type="button"
                                onClick={() => updateFormData({ experienceLevel: level })}
                                className={`p-2 border text-label-md font-bold uppercase transition-none cursor-pointer ${
                                    formData.experienceLevel === level
                                        ? 'bg-primary-container text-on-primary border-primary-container shadow-[2px_2px_0px_#191C1D]'
                                        : 'bg-surface text-on-surface border-black/20 hover:bg-surface-container'
                                }`}
                            >
                                [{level}]
                            </button>
                        ))}
                    </div>
                </div>

                {/* Target Competencies */}
                <div>
                    <label className="block text-label-sm uppercase font-bold text-outline mb-1">
                        CORE_TECHNICAL_DOMAINS (SELECT UP TO 5)
                    </label>
                    <div className="flex flex-wrap gap-2 pt-1">
                        {['Python', 'FastAPI', 'Django', 'Docker', 'PostgreSQL', 'Redis', 'Kubernetes', 'React', 'System Design'].map(topic => (
                            <CadChip
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
        <div className="space-y-space-md font-mono">
            <div className="border-b border-black/15 pb-2">
                <h2 className="text-headline-sm font-bold uppercase text-on-surface">
                    [ 03_CALIBRATION // ENTERPRISE_REQUIREMENTS ]
                </h2>
                <p className="text-body-sm text-secondary">
                    Configure technical domain scopes and hiring throughput expectations.
                </p>
            </div>

            <div>
                <label className="block text-label-sm uppercase font-bold text-outline mb-1">
                    PRIMARY_INDUSTRY_VERTICAL
                </label>
                <select
                    className="w-full px-3 py-2 bg-surface border border-black/25 focus:border-primary focus:outline-none text-body-md font-mono uppercase font-bold"
                    value={formData.industry || ''}
                    onChange={(e) => updateFormData({ industry: e.target.value })}
                >
                    <option value="">-- SELECT INDUSTRY DOMAIN --</option>
                    <option value="Cloud Infrastructure">CLOUD INFRASTRUCTURE &amp; NETWORKING</option>
                    <option value="Distributed Systems">DISTRIBUTED SYSTEMS &amp; DATABASES</option>
                    <option value="Artificial Intelligence">ARTIFICIAL INTELLIGENCE &amp; ML OPS</option>
                    <option value="Fintech & Banking">FINANCIAL TECHNOLOGY &amp; CRYPTOGRAPHY</option>
                    <option value="Enterprise SaaS">ENTERPRISE SAAS ARCHITECTURE</option>
                </select>
            </div>

            <div>
                <label className="block text-label-sm uppercase font-bold text-outline mb-1">
                    ENGINEERING_ORGANIZATION_SIZE
                </label>
                <div className="grid grid-cols-2 gap-2">
                    {['1-10 Devs', '11-50 Devs', '51-200 Devs', '201+ Devs'].map(size => (
                        <button
                            key={size}
                            type="button"
                            onClick={() => updateFormData({ companySize: size })}
                            className={`p-2 border text-label-md font-bold uppercase transition-none cursor-pointer ${
                                formData.companySize === size
                                    ? 'bg-primary-container text-on-primary border-primary-container shadow-[2px_2px_0px_#191C1D]'
                                    : 'bg-surface text-on-surface border-black/20 hover:bg-surface-container'
                            }`}
                        >
                            [{size}]
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-label-sm uppercase font-bold text-outline mb-1">
                    ANNUAL_CANDIDATE_INTAKE_QUOTA
                </label>
                <input
                    type="number"
                    min="1"
                    placeholder="e.g. 15 requisitions"
                    value={formData.trainCount || ''}
                    onChange={(e) => updateFormData({ trainCount: e.target.value })}
                    className="w-full px-3 py-2 bg-surface border border-black/25 focus:border-primary focus:outline-none text-body-md font-mono"
                />
            </div>
        </div>
    );
};

export default Step3Details;
