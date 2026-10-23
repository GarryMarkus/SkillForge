import React from 'react';

const CandidateDossierModal = ({
    candidate,
    onClose,
    onIssueOffer
}) => {
    if (!candidate) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 font-mono select-none">
            <div className="bg-surface-container-lowest border border-black/30 w-full max-w-2xl shadow-[6px_6px_0px_#1D52B8] max-h-[90vh] flex flex-col overflow-hidden">
                {/* Title Rail */}
                <div className="px-5 py-3.5 bg-surface-container border-b border-black/20 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-ink-primary">
                        <span className="text-canvas-blueprint font-bold">+</span>
                        <span>[ CANDIDATE DOSSIER AUDIT // {candidate.candidate_ref || 'SF-REF'} ]</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="px-2.5 py-1 border border-black/20 hover:bg-black hover:text-white text-xs uppercase transition-none cursor-pointer font-bold"
                    >
                        [ESC]
                    </button>
                </div>

                {/* Body Content */}
                <div className="p-6 overflow-y-auto space-y-5 flex-1 text-ink-primary text-xs sm:text-sm">
                    {/* Card 1: Identity & Background Overview */}
                    <div className="border border-black/15 p-5 bg-surface flex flex-col gap-2">
                        <div className="flex justify-between items-baseline flex-wrap gap-2">
                            <span className="text-xl sm:text-2xl font-bold uppercase text-ink-primary">
                                {candidate.candidate_name}
                            </span>
                            <span className="text-canvas-blueprint font-bold text-lg">
                                {candidate.cosine_sim}% MATCH
                            </span>
                        </div>
                        <div className="text-xs text-on-surface-variant font-bold">
                            {candidate.role_label} // {candidate.region}
                        </div>
                        <div className="text-xs text-outline font-mono">
                            EMAIL: {candidate.email}
                        </div>
                    </div>

                    {/* Card 2: Verified Proctor Audit Dossier */}
                    <div className="border border-black/15 p-5 bg-surface-container-low space-y-3">
                        <div className="text-xs font-bold uppercase text-canvas-blueprint">
                            [ HARDWARE PROCTOR AUDIT DOSSIER ]
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div>
                                <span className="text-on-surface-variant">PROCTOR SCORE:</span>{' '}
                                <strong className="text-ink-primary">{candidate.proctor_score}</strong>
                            </div>
                            <div>
                                <span className="text-on-surface-variant">INTEGRITY FLAGS:</span>{' '}
                                <strong className="text-ink-primary">{candidate.proctor_flags}</strong>
                            </div>
                            <div>
                                <span className="text-on-surface-variant">OPTICAL STATUS:</span>{' '}
                                <strong className="text-ink-primary">{candidate.cam_status}</strong>
                            </div>
                            <div>
                                <span className="text-on-surface-variant">ACCREDITATION:</span>{' '}
                                <strong className="text-ink-primary">{candidate.stars} ({candidate.rating_num})</strong>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Matched Skill Vector */}
                    <div className="border border-black/15 p-5 bg-surface space-y-3">
                        <div className="text-xs font-bold uppercase text-outline">
                            [ VERIFIED SKILL VECTORS ]
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs">
                            {(candidate.tags || ["PYTHON", "FASTAPI", "DOCKER"]).map((t, idx) => (
                                <span key={idx} className="bg-canvas-blueprint text-white px-2.5 py-1 font-bold">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Action Rail */}
                    <div className="pt-4 border-t border-black/15 flex flex-wrap items-center justify-between gap-3">
                        <button
                            onClick={onClose}
                            className="px-5 py-3 border border-black/25 text-xs font-bold uppercase hover:bg-black/5 transition-none cursor-pointer"
                        >
                            [ CLOSE DOSSIER ]
                        </button>
                        <button
                            onClick={() => {
                                onIssueOffer(candidate);
                                onClose();
                            }}
                            className="bg-canvas-blueprint text-white px-6 py-3 text-xs uppercase font-bold border border-canvas-blueprint hover:bg-primary-hover transition-none shadow-[3px_3px_0px_#0A0A0A] cursor-pointer"
                        >
                            [ ISSUE DIRECT OFFER / SHORTLIST → ]
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidateDossierModal;
