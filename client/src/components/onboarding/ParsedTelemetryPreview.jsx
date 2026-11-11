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
        <div className="w-full rounded-md border border-white/[0.08] border-t-white/15 bg-[#111318] p-5 sm:p-6 font-mono select-none text-[#ededed]" id="ParsedTelemetryPreview">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
                <div>
                    <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                        Profile &amp; Skills Telemetry
                    </h3>
                    <p className="text-xs text-[#737373] mt-0.5">
                        Extracted automatically or calibrated manually
                    </p>
                </div>
                <span className="text-[11px] font-mono text-zinc-300 bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded-sm">
                    Auto-Indexed
                </span>
            </div>

            {/* Profile Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-xs border-b border-white/[0.06] pb-4">
                <div className="bg-[#060709] p-3 rounded-sm border border-white/[0.08]">
                    <span className="text-[#737373] block mb-0.5 text-[11px]">Candidate Name</span>
                    <strong className="text-[#f5f5f5] text-xs font-semibold">{fullName || 'Not specified'}</strong>
                </div>
                <div className="bg-[#060709] p-3 rounded-sm border border-white/[0.08]">
                    <span className="text-[#737373] block mb-0.5 text-[11px]">Credential</span>
                    <strong className="text-[#f5f5f5] text-xs font-semibold">{education || 'Not specified'}</strong>
                </div>
                <div className="bg-[#060709] p-3 rounded-sm border border-white/[0.08]">
                    <span className="text-[#737373] block mb-0.5 text-[11px]">Tier</span>
                    <strong className="text-[#ededed] text-xs font-semibold">{experienceLevel}</strong>
                </div>
            </div>

            {/* Skills List */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-mono text-[#888888]">
                        Indexed Skills ({skillList.length})
                    </label>
                    <span className="text-xs text-[#71717A]">Click to remove</span>
                </div>

                <div className="flex flex-wrap gap-2 min-h-[44px] p-3 rounded-sm bg-[#060709] border border-white/[0.08] mb-3">
                    {skillList.length === 0 ? (
                        <span className="text-[#71717A] text-xs italic">
                            No skills indexed. Add custom skills below or upload your resume document.
                        </span>
                    ) : (
                        skillList.map((tag, i) => (
                            <span
                                key={i}
                                onClick={() => handleRemoveTag(tag)}
                                className="inline-flex items-center gap-1.5 bg-white/[0.04] text-zinc-300 border border-white/[0.08] px-2.5 py-1 rounded-sm text-xs font-mono cursor-pointer hover:border-rose-500/40 hover:text-rose-300 transition-colors"
                                title="Click to remove"
                            >
                                <span>{tag}</span>
                                <span className="text-[10px] text-[#737373]">✕</span>
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
                        placeholder="Add skill (e.g. Python, Docker, PostgreSQL)..."
                        className="flex-1 px-3 py-2 rounded-sm bg-[#060709] border border-white/[0.08] text-xs font-mono text-[#f5f5f5] placeholder-[#555555] focus:border-white/25 focus:outline-none transition-colors"
                    />
                    <button
                        type="submit"
                        className="px-3.5 py-2 rounded-sm border border-white/10 bg-[#121316] text-xs font-mono text-[#E4E4E7] hover:text-white hover:border-white/20 transition-colors cursor-pointer"
                    >
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ParsedTelemetryPreview;
