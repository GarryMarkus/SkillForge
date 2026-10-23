import React from 'react';

const CandidateDossierModal = ({
    candidate,
    onClose,
    onIssueOffer
}) => {
    if (!candidate) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-none font-mono select-none">
            <div className="bg-surface-container-lowest border border-black/30 w-full max-w-2xl shadow-[6px_6px_0px_#1D52B8] max-h-[90vh] flex flex-col overflow-hidden">
                {/* Title Rail */}
                <div className="px-space-md py-space-sm bg-surface-container border-b border-black/20 flex items-center justify-between">
                    <div className="flex items-center gap-space-xs font-label-md text-label-md font-bold uppercase text-on-surface">
                        <span className="text-primary-container font-bold">[+]</span>
                        <span>[ CANDIDATE_DOSSIER_AUDIT_VIEW // {candidate.candidate_ref || 'SF-REF'} ]</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="px-2 py-0.5 border border-black/20 hover:bg-black hover:text-white text-label-sm font-label-sm uppercase transition-none cursor-pointer font-bold"
                    >
                        [ESC]
                    </button>
                </div>

                {/* Body Content */}
                <div className="p-space-lg overflow-y-auto space-y-space-md flex-1 text-on-surface font-body-sm text-body-sm">
                    {/* Identity Overview */}
                    <div className="border border-black/15 p-space-md bg-surface flex flex-col gap-2">
                        <div className="flex justify-between items-baseline">
                            <span className="font-headline-sm text-headline-sm font-bold">
                                {candidate.candidate_name}
                            </span>
                            <span className="text-primary font-bold text-headline-sm">
                                {candidate.cosine_sim}% MATCH
                            </span>
                        </div>
                        <div className="text-label-sm font-label-sm text-on-surface-variant font-bold">
                            {candidate.role_label} // {candidate.region}
                        </div>
                        <div className="text-label-sm font-label-sm text-outline">
                            EMAIL: {candidate.email} // HASH: {candidate.hash}
                        </div>
                    </div>

                    {/* Verified Proctor Telemetry */}
                    <div className="border border-black/15 p-space-md bg-surface-container-low space-y-2">
                        <div className="font-label-sm text-label-sm font-bold uppercase text-primary">
                            [ VERIFIED_PROCTOR_TELEMETRY ]
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-label-sm font-label-sm">
                            <div>
                                PROCTOR_SCORE: <strong>{candidate.proctor_score}</strong>
                            </div>
                            <div>
                                ANTI_CHEAT: <strong>{candidate.proctor_flags}</strong>
                            </div>
                            <div>
                                OPTICAL_FEED: <strong>{candidate.cam_status}</strong>
                            </div>
                            <div>
                                ACCREDITATION: <strong>{candidate.stars} ({candidate.rating_num})</strong>
                            </div>
                        </div>
                    </div>

                    {/* Matched Skill Vector */}
                    <div className="border border-black/15 p-space-md bg-surface space-y-2">
                        <div className="font-label-sm text-label-sm font-bold uppercase text-outline">
                            [ MATCHED_SKILL_VECTOR ]
                        </div>
                        <div className="flex flex-wrap gap-1.5 font-label-sm text-label-sm">
                            {(candidate.tags || ["PYTHON", "FASTAPI", "DOCKER"]).map((t, idx) => (
                                <span key={idx} className="bg-primary-container text-on-primary px-2 py-0.5 font-bold">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Action Rail */}
                    <div className="pt-space-md border-t border-black/15 flex items-center justify-between">
                        <button
                            onClick={onClose}
                            className="px-space-md py-2 border border-black/30 font-label-md text-label-md uppercase hover:bg-black hover:text-white transition-none cursor-pointer font-bold"
                        >
                            [ CLOSE_DOSSIER ]
                        </button>
                        <button
                            onClick={() => {
                                onIssueOffer(candidate);
                                onClose();
                            }}
                            className="bg-primary text-on-primary px-space-lg py-2 font-label-md text-label-md uppercase font-bold border border-primary hover:bg-surface hover:text-primary transition-none shadow-[2px_2px_0px_#191C1D] cursor-pointer"
                        >
                            [ ISSUE_OFFER_INVITE -&gt; ]
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidateDossierModal;
