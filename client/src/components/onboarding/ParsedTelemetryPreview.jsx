import React, { useState } from 'react';

const ParsedTelemetryPreview = ({
    skills = '',
    onSkillsChange,
    fullName = '',
    education = '',
    experienceLevel = 'Beginner',
    githubUrl = ''
}) => {
    const [newTagInput, setNewTagInput] = useState('');

    const skillList = skills
        ? skills.split(',').map(s => s.trim().toUpperCase()).filter(Boolean)
        : [];

    const handleAddTag = (e) => {
        if (e) e.preventDefault();
        const trimmed = newTagInput.trim().toUpperCase();
        if (trimmed && !skillList.includes(trimmed)) {
            const updated = [...skillList, trimmed].join(', ');
            onSkillsChange(updated);
            setNewTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        const updated = skillList.filter(t => t !== tagToRemove).join(', ');
        onSkillsChange(updated);
    };

    return (
        <div className="w-full border border-black/20 bg-surface-container-lowest p-space-md font-mono select-none" id="ParsedTelemetryPreview">
            {/* Header Strip */}
            <div className="flex items-center justify-between border-b border-black/15 pb-2 mb-space-sm">
                <div className="flex items-center gap-2 font-bold text-label-md uppercase text-on-surface">
                    <span className="text-primary-container font-bold">+</span>
                    <span>[ EXTRACTED_TELEMETRY_PREVIEW // SKILL_TAG_TAXONOMY ]</span>
                </div>
                <span className="text-label-sm font-bold text-primary-container border border-primary-container/30 bg-primary-fixed/20 px-1.5 py-0.2">
                    ACTIVE_AST_PARSE
                </span>
            </div>

            {/* Extracted Profile Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm mb-space-md text-label-sm border-b border-black/10 pb-space-sm">
                <div>
                    <span className="text-[9px] font-bold uppercase text-outline block">CANDIDATE_NAME:</span>
                    <strong className="text-on-surface uppercase">{fullName || 'ANONYMOUS_ENGINEER'}</strong>
                </div>
                <div>
                    <span className="text-[9px] font-bold uppercase text-outline block">ACADEMIC_TIER:</span>
                    <strong className="text-on-surface uppercase">{education || 'SELF_TAUGHT / B.S.'}</strong>
                </div>
                <div>
                    <span className="text-[9px] font-bold uppercase text-outline block">EXPERIENCE_BRACKET:</span>
                    <strong className="text-primary-container uppercase">[{experienceLevel}]</strong>
                </div>
            </div>

            {/* Interactive Skill Tags Matrix */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="text-label-sm uppercase font-bold text-outline">
                        EXTRACTED_COMPETENCY_TAGS ({skillList.length})
                    </label>
                    <span className="text-[10px] text-secondary">CLICK TAG TO REMOVE</span>
                </div>

                <div className="flex flex-wrap gap-1.5 min-h-[36px] p-2 bg-surface border border-black/15 mb-space-sm">
                    {skillList.length === 0 ? (
                        <span className="text-outline text-label-sm italic">
                            No skills tagged yet. Enter comma-separated skills below or upload resume PDF.
                        </span>
                    ) : (
                        skillList.map((tag, i) => (
                            <span
                                key={i}
                                onClick={() => handleRemoveTag(tag)}
                                className="inline-flex items-center gap-1 bg-primary-container text-on-primary px-2 py-0.5 text-label-sm font-bold uppercase cursor-pointer hover:bg-error transition-colors"
                                title="Click to remove tag"
                            >
                                <span>[{tag}]</span>
                                <span className="text-[10px] opacity-75">&times;</span>
                            </span>
                        ))
                    )}
                </div>

                {/* Add Custom Tag Input */}
                <form onSubmit={handleAddTag} className="flex gap-2">
                    <input
                        type="text"
                        value={newTagInput}
                        onChange={(e) => setNewTagInput(e.target.value)}
                        placeholder="Add skill tag (e.g. DOCKER, KUBERNETES, POSTGRESQL)..."
                        className="flex-1 px-3 py-1.5 bg-surface border border-black/25 focus:border-primary focus:outline-none text-body-sm font-mono uppercase"
                    />
                    <button
                        type="submit"
                        className="bg-surface-container text-on-surface px-space-md py-1.5 text-label-sm font-bold uppercase border border-black/25 hover:bg-surface-container-high transition-none cursor-pointer"
                    >
                        [+ ADD_TAG]
                    </button>
                </form>
            </div>

            {/* GitHub Audit Status */}
            {githubUrl && (
                <div className="mt-space-sm pt-space-xs border-t border-black/10 flex items-center justify-between text-label-sm text-secondary">
                    <span>GITHUB_TARGET: {githubUrl}</span>
                    <span className="text-primary-container font-bold">[READY_FOR_AST_SCAN]</span>
                </div>
            )}
        </div>
    );
};

export default ParsedTelemetryPreview;
