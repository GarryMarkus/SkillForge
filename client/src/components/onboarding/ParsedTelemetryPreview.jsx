import React, { useState } from 'react';
import { User, GraduationCap, Layers, Tag, Plus, X, Sparkles } from '../ui/Icons';

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
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3.5 mb-4">
                <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-white shrink-0" strokeWidth={1.75} aria-hidden="true" />
                    <div>
                        <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                            Skills &amp; Profile Summary
                        </h3>
                        <p className="text-[11px] text-[#737373] mt-0.5">
                            Add or remove skills used for job matching
                        </p>
                    </div>
                </div>
                <span className="text-[11px] font-mono text-zinc-300 bg-white/[0.04] border border-white/[0.08] px-2.5 py-0.5 rounded-sm">
                    {skillList.length} Skills
                </span>
            </div>

            {/* Profile Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-xs border-b border-white/[0.06] pb-4">
                <div className="bg-[#060709] p-3 rounded-sm border border-white/[0.08] flex items-center gap-2.5">
                    <User className="w-4 h-4 text-[#71717A] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                    <div className="min-w-0">
                        <span className="text-[#737373] block text-[10px] uppercase">Name</span>
                        <strong className="text-[#f5f5f5] text-xs font-semibold truncate block">{fullName || 'Not set'}</strong>
                    </div>
                </div>
                <div className="bg-[#060709] p-3 rounded-sm border border-white/[0.08] flex items-center gap-2.5">
                    <GraduationCap className="w-4 h-4 text-[#71717A] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                    <div className="min-w-0">
                        <span className="text-[#737373] block text-[10px] uppercase">Education</span>
                        <strong className="text-[#f5f5f5] text-xs font-semibold truncate block">{education || 'Not set'}</strong>
                    </div>
                </div>
                <div className="bg-[#060709] p-3 rounded-sm border border-white/[0.08] flex items-center gap-2.5">
                    <Layers className="w-4 h-4 text-[#71717A] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                    <div className="min-w-0">
                        <span className="text-[#737373] block text-[10px] uppercase">Experience</span>
                        <strong className="text-[#ededed] text-xs font-semibold truncate block">{experienceLevel}</strong>
                    </div>
                </div>
            </div>

            {/* Skills List */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300">
                        <Tag className="w-3.5 h-3.5 text-[#888888]" strokeWidth={1.75} aria-hidden="true" />
                        <span>Your Skills ({skillList.length})</span>
                    </label>
                    <span className="text-[11px] text-[#71717A]">Click chip to remove</span>
                </div>

                <div className="flex flex-wrap gap-2 min-h-[44px] p-3 rounded-sm bg-[#060709] border border-white/[0.08] mb-3">
                    {skillList.length === 0 ? (
                        <span className="text-[#71717A] text-xs italic">
                            No skills added yet. Upload a PDF or add tags below.
                        </span>
                    ) : (
                        skillList.map((tag, i) => (
                            <button
                                type="button"
                                key={i}
                                onClick={() => handleRemoveTag(tag)}
                                className="inline-flex items-center gap-1.5 bg-white/[0.04] text-zinc-200 border border-white/[0.08] px-2.5 py-1 rounded-sm text-xs font-mono cursor-pointer hover:border-rose-500/40 hover:text-rose-300 transition-colors"
                                title="Click to remove"
                            >
                                <span>{tag}</span>
                                <X className="w-3 h-3 text-[#737373]" strokeWidth={1.75} aria-hidden="true" />
                            </button>
                        ))
                    )}
                </div>

                {/* Add Custom Tag (Note: intentionally button + key handler, avoid nested <form> inside main profile form) */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newTagInput}
                        onChange={(e) => setNewTagInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddTag();
                            }
                        }}
                        placeholder="Add skill (e.g. Python, Docker, PostgreSQL)..."
                        className="flex-1 px-3 py-2 rounded-sm bg-[#060709] border border-white/[0.08] text-xs font-mono text-[#f5f5f5] placeholder-[#555555] focus:border-white/25 focus:outline-none transition-colors"
                    />
                    <button
                        type="button"
                        onClick={handleAddTag}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm border border-white/10 bg-[#121316] text-xs font-mono text-[#E4E4E7] hover:text-white hover:border-white/20 transition-colors cursor-pointer"
                    >
                        <Plus className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                        <span>Add</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ParsedTelemetryPreview;
