import React, { useState } from 'react';

const ParsedTelemetryPreview = ({
    skills = '',
    onSkillsChange,
    fullName = '',
    education = '',
    experienceLevel = 'Beginner',
    _githubUrl = ''
}) => {
    const [newTagInput, setNewTagInput] = useState('');

    const skillList = skills
        ? skills.split(',').map(s => s.trim()).filter(Boolean)
        : [];

    const handleAddTag = (e) => {
        if (e) e.preventDefault();
        const trimmed = newTagInput.trim();
        if (trimmed && !skillList.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
            const updated = [...skillList, trimmed].join(', ');
            onSkillsChange(updated);
            setNewTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        const updated = skillList.filter(t => t.toLowerCase() !== tagToRemove.toLowerCase()).join(', ');
        onSkillsChange(updated);
    };

    return (
        <div className="w-full rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 font-sans select-none" id="ParsedTelemetryPreview">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                        Profile &amp; Skills Summary
                    </h3>
                    <p className="text-xs text-gray-500">
                        Extracted automatically or added manually
                    </p>
                </div>
                <span className="text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full">
                    Auto-Extracted
                </span>
            </div>

            {/* Profile Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-xs border-b border-gray-100 pb-4">
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="text-gray-400 block mb-0.5">Full Name</span>
                    <strong className="text-gray-900 text-sm font-semibold">{fullName || 'Not specified'}</strong>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="text-gray-400 block mb-0.5">Education / Degree</span>
                    <strong className="text-gray-900 text-sm font-semibold">{education || 'Not specified'}</strong>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="text-gray-400 block mb-0.5">Experience Level</span>
                    <strong className="text-blue-600 text-sm font-semibold">{experienceLevel}</strong>
                </div>
            </div>

            {/* Skills List */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-gray-700">
                        Skills ({skillList.length})
                    </label>
                    <span className="text-xs text-gray-400">Click a skill to remove it</span>
                </div>

                <div className="flex flex-wrap gap-2 min-h-[44px] p-3 rounded-xl bg-gray-50 border border-gray-200 mb-3">
                    {skillList.length === 0 ? (
                        <span className="text-gray-400 text-xs italic">
                            No skills added yet. Add custom skills below or upload your resume.
                        </span>
                    ) : (
                        skillList.map((tag, i) => (
                            <span
                                key={i}
                                onClick={() => handleRemoveTag(tag)}
                                className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-lg text-xs font-medium cursor-pointer hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors"
                                title="Click to remove"
                            >
                                <span>{tag}</span>
                                <span className="text-xs opacity-60">✕</span>
                            </span>
                        ))
                    )}
                </div>

                {/* Add Custom Tag */}
                <form onSubmit={handleAddTag} className="flex gap-2">
                    <input
                        type="text"
                        value={newTagInput}
                        onChange={(e) => setNewTagInput(e.target.value)}
                        placeholder="Add a skill (e.g. React, TypeScript, Docker)..."
                        className="flex-1 px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:outline-none text-xs transition-colors"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-colors cursor-pointer"
                    >
                        + Add Skill
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ParsedTelemetryPreview;
