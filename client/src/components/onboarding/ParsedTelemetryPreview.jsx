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
        <div className="w-full border border-black/20 bg-surface-container-lowest p-5 sm:p-6 font-mono select-none" id="ParsedTelemetryPreview">
            {/* Header Strip */}
            <div className="flex items-center justify-between border-b border-black/15 pb-3 mb-4">
                <div className="flex items-center gap-2 font-bold text-xs uppercase text-ink-primary">
                    <span className="text-canvas-blueprint font-bold">+</span>
                    <span>[ EXTRACTED TELEMETRY PREVIEW // SKILL TAXONOMY ]</span>
                </div>
                <span className="text-xs font-bold text-canvas-blueprint border border-canvas-blueprint/30 bg-blue-50 px-2 py-0.5">
                    AST PARSE ACTIVE
                </span>
            </div>

            {/* Extracted Profile Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-xs border-b border-black/10 pb-4 font-mono">
                <div>
                    <span className="text-[11px] font-bold uppercase text-outline block">CANDIDATE NAME:</span>
                    <strong className="text-ink-primary uppercase">{fullName || 'ANONYMOUS CANDIDATE'}</strong>
                </div>
                <div>
                    <span className="text-[11px] font-bold uppercase text-outline block">EDUCATION / DEGREE:</span>
                    <strong className="text-ink-primary uppercase">{education || 'ENGINEERING CREDENTIAL'}</strong>
                </div>
                <div>
                    <span className="text-[11px] font-bold uppercase text-outline block">EXPERIENCE LEVEL:</span>
                    <strong className="text-canvas-blueprint uppercase font-bold">[{experienceLevel}]</strong>
                </div>
            </div>

            {/* Interactive Skill Tags Matrix */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="text-xs uppercase font-bold text-outline">
                        EXTRACTED SKILL COMPETENCY TAGS ({skillList.length})
                    </label>
                    <span className="text-[11px] text-on-surface-variant font-mono">CLICK TAG TO REMOVE</span>
                </div>

                <div className="flex flex-wrap gap-2 min-h-[44px] p-3 bg-surface border border-black/15 mb-3">
                    {skillList.length === 0 ? (
                        <span className="text-outline text-xs italic">
                            No skills tagged yet. Enter comma-separated skills below or upload resume PDF.
                        </span>
                    ) : (
                        skillList.map((tag, i) => (
                            <span
                                key={i}
                                onClick={() => handleRemoveTag(tag)}
                                className="inline-flex items-center gap-1.5 bg-canvas-blueprint text-white px-2.5 py-1 text-xs font-bold uppercase cursor-pointer hover:bg-red-600 transition-colors"
                                title="Click to remove tag"
                            >
                                <span>[{tag}]</span>
                                <span className="text-xs opacity-80">&times;</span>
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
                        className="flex-1 px-3.5 py-2 bg-surface border border-black/25 focus:border-canvas-blueprint focus:outline-none text-xs font-mono uppercase"
                    />
                    <button
                        type="submit"
                        className="bg-surface-container text-ink-primary px-4 py-2 text-xs font-bold uppercase border border-black/25 hover:bg-surface-container-high transition-none cursor-pointer"
                    >
                        [ + ADD TAG ]
                    </button>
                </form>
            </div>

            {/* GitHub Audit Status */}
            {githubUrl && (
                <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between text-xs text-on-surface-variant font-mono">
                    <span>GITHUB TARGET: {githubUrl}</span>
                    <span className="text-canvas-blueprint font-bold">[ READY FOR AST VERIFICATION ]</span>
                </div>
            )}
        </div>
    );
};

export default ParsedTelemetryPreview;
