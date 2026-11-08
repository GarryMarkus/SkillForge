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
        <div className="w-full rounded-2xl border border-white/[0.08] bg-[#121318] p-5 sm:p-6 font-sans select-none text-white" id="ParsedTelemetryPreview">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
                <div>
                    <h3 className="text-sm font-semibold text-white">
                        Profile &amp; Skills Summary
                    </h3>
                    <p className="text-xs text-zinc-400">
                        Extracted automatically or added manually
                    </p>
                </div>
                <span className="text-xs font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full">
                    Auto-Extracted
                </span>
            </div>

            {/* Profile Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-xs border-b border-white/[0.08] pb-4">
                <div className="bg-[#181A22] p-3 rounded-xl border border-white/[0.06]">
                    <span className="text-zinc-500 block mb-0.5">Full Name</span>
                    <strong className="text-white text-sm font-semibold">{fullName || 'Not specified'}</strong>
                </div>
                <div className="bg-[#181A22] p-3 rounded-xl border border-white/[0.06]">
                    <span className="text-zinc-500 block mb-0.5">Education / Degree</span>
                    <strong className="text-white text-sm font-semibold">{education || 'Not specified'}</strong>
                </div>
                <div className="bg-[#181A22] p-3 rounded-xl border border-white/[0.06]">
                    <span className="text-zinc-500 block mb-0.5">Experience Level</span>
                    <strong className="text-blue-400 text-sm font-semibold">{experienceLevel}</strong>
                </div>
            </div>

            {/* Skills List */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-zinc-300">
                        Skills ({skillList.length})
                    </label>
                    <span className="text-xs text-zinc-500">Click a skill to remove it</span>
                </div>

                <div className="flex flex-wrap gap-2 min-h-[44px] p-3 rounded-xl bg-[#181A22] border border-white/[0.08] mb-3">
                    {skillList.length === 0 ? (
                        <span className="text-zinc-500 text-xs italic">
                            No skills added yet. Add custom skills below or upload your resume.
                        </span>
                    ) : (
                        skillList.map((tag, i) => (
                            <span
                                key={i}
                                onClick={() => handleRemoveTag(tag)}
                                className="inline-flex items-center gap-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-lg text-xs font-mono font-medium cursor-pointer hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30 transition-colors"
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
                        className="flex-1 px-3.5 py-2 rounded-xl bg-[#09090B] border border-white/[0.08] focus:border-blue-500 focus:outline-none text-xs text-white placeholder:text-zinc-500 transition-colors"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-zinc-200 border border-white/[0.08] text-xs font-medium transition-colors cursor-pointer"
                    >
                        + Add Skill
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ParsedTelemetryPreview;
