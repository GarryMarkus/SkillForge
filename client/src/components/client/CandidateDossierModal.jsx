import React from 'react';

const CandidateDossierModal = ({
    candidate,
    onClose,
    onIssueOffer
}) => {
    if (!candidate) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none font-mono">
            <div className="bg-[#0b0b0c] rounded-md border border-white/10 w-full max-w-2xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden text-[#ededed]">
                {/* Header */}
                <div className="px-5 py-3.5 bg-[#050505] border-b border-white/[0.06] flex items-center justify-between">
                    <div>
                        <h2 className="text-xs font-semibold uppercase tracking-wider text-white">
                            [ Candidate Dossier ]
                        </h2>
                        <p className="text-xs text-[#737373] mt-0.5">
                            Reference: {candidate.candidate_ref || 'SF-REF'}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-xs text-[#737373] hover:text-white font-mono cursor-pointer"
                        aria-label="Close"
                    >
                        [close ✕]
                    </button>
                </div>

                {/* Body Content */}
                <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs text-[#888888]">
                    {/* Candidate Overview */}
                    <div className="p-4 bg-[#050505] rounded-sm border border-white/10 flex flex-col gap-1.5">
                        <div className="flex justify-between items-baseline flex-wrap gap-2">
                            <span className="text-base font-bold text-white font-display">
                                {candidate.candidate_name}
                            </span>
                            <span className="px-2 py-0.5 rounded-sm text-xs font-mono bg-[#111113] text-[#ededed] border border-white/20">
                                [{candidate.cosine_sim}% Match]
                            </span>
                        </div>
                        <div className="text-xs text-[#737373]">
                            {candidate.role_label} &bull; {candidate.region}
                        </div>
                        <div className="text-[11px] text-[#555555]">
                            email: {candidate.email}
                        </div>
                    </div>

                    {/* Verified Assessment Results */}
                    <div className="p-4 bg-[#050505] rounded-sm border border-white/10 space-y-2.5">
                        <div className="text-[11px] uppercase tracking-wider text-white">
                            [ proctored evaluation telemetry ]
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div className="bg-[#0b0b0c] p-2.5 rounded-sm border border-white/10">
                                <span className="text-[11px] text-[#555555] block">Score</span>
                                <strong className="text-white text-xs font-mono">{candidate.proctor_score}</strong>
                            </div>
                            <div className="bg-[#0b0b0c] p-2.5 rounded-sm border border-white/10">
                                <span className="text-[11px] text-[#555555] block">Integrity Record</span>
                                <strong className="text-white text-xs font-mono">{candidate.proctor_flags}</strong>
                            </div>
                            <div className="bg-[#0b0b0c] p-2.5 rounded-sm border border-white/10">
                                <span className="text-[11px] text-[#555555] block">Hardware Telemetry</span>
                                <strong className="text-white text-xs font-mono">{candidate.cam_status}</strong>
                            </div>
                            <div className="bg-[#0b0b0c] p-2.5 rounded-sm border border-white/10">
                                <span className="text-[11px] text-[#555555] block">Peer Calibrated Rating</span>
                                <strong className="text-white text-xs font-mono">[{candidate.rating_num}]</strong>
                            </div>
                        </div>
                    </div>

                    {/* Verified Skills */}
                    <div className="p-4 bg-[#050505] rounded-sm border border-white/10 space-y-2">
                        <div className="text-[11px] uppercase tracking-wider text-white">
                            [ verified competencies ]
                        </div>
                        <div className="flex flex-wrap gap-1.5 text-xs">
                            {(candidate.tags || ["Python", "FastAPI", "Docker"]).map((t, idx) => (
                                <span
                                    key={idx}
                                    className="bg-[#0b0b0c] text-[#888888] border border-white/10 px-2 py-0.5 rounded-sm font-mono text-xs"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-md border border-white/10 text-xs font-mono text-[#888888] hover:text-white transition-colors cursor-pointer"
                        >
                            [Close]
                        </button>

                        <button
                            onClick={() => {
                                onIssueOffer(candidate);
                                onClose();
                            }}
                            className="bg-[#111113] hover:bg-[#1a1a1d] text-white border border-white/20 px-5 py-2 rounded-md text-xs font-mono transition-colors cursor-pointer"
                        >
                            [Extend Interview / Offer ↗]
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidateDossierModal;
