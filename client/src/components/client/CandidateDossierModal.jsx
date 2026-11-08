import React from 'react';

const CandidateDossierModal = ({
    candidate,
    onClose,
    onIssueOffer
}) => {
    if (!candidate) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none font-sans">
            <div className="bg-[#121318] rounded-2xl border border-white/[0.08] w-full max-w-2xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden text-white animate-in fade-in zoom-in-95 duration-150">
                {/* Header */}
                <div className="px-6 py-4 bg-[#181A22] border-b border-white/[0.08] flex items-center justify-between">
                    <div>
                        <h2 className="text-base font-semibold text-white">
                            Candidate Profile
                        </h2>
                        <p className="text-xs text-zinc-400">
                            Reference ID: {candidate.candidate_ref || 'SF-REF'}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.06] text-sm font-semibold transition-colors cursor-pointer"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>

                {/* Body Content */}
                <div className="p-6 overflow-y-auto space-y-5 flex-1 text-zinc-300 text-sm">
                    {/* Candidate Overview */}
                    <div className="p-5 bg-white/[0.02] rounded-xl border border-white/[0.08] flex flex-col gap-2">
                        <div className="flex justify-between items-baseline flex-wrap gap-2">
                            <span className="text-xl sm:text-2xl font-bold text-white">
                                {candidate.candidate_name}
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                {candidate.cosine_sim}% Match
                            </span>
                        </div>
                        <div className="text-sm font-normal text-zinc-400">
                            {candidate.role_label} • {candidate.region}
                        </div>
                        <div className="text-xs text-zinc-500">
                            Email: {candidate.email}
                        </div>
                    </div>

                    {/* Verified Assessment Results */}
                    <div className="p-5 bg-[#181A22] rounded-xl border border-white/[0.08] space-y-3">
                        <div className="text-xs font-medium uppercase tracking-wider text-blue-400">
                            Proctored Assessment Results
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div className="bg-[#09090B] p-3 rounded-lg border border-white/[0.06]">
                                <span className="text-xs text-zinc-400 block">Assessment Score</span>
                                <strong className="text-white text-base">{candidate.proctor_score}</strong>
                            </div>
                            <div className="bg-[#09090B] p-3 rounded-lg border border-white/[0.06]">
                                <span className="text-xs text-zinc-400 block">Integrity Flags</span>
                                <strong className="text-white text-base">{candidate.proctor_flags}</strong>
                            </div>
                            <div className="bg-[#09090B] p-3 rounded-lg border border-white/[0.06]">
                                <span className="text-xs text-zinc-400 block">Webcam Status</span>
                                <strong className="text-white text-base">{candidate.cam_status}</strong>
                            </div>
                            <div className="bg-[#09090B] p-3 rounded-lg border border-white/[0.06]">
                                <span className="text-xs text-zinc-400 block">Candidate Rating</span>
                                <strong className="text-amber-400 text-base">{candidate.stars} ({candidate.rating_num})</strong>
                            </div>
                        </div>
                    </div>

                    {/* Verified Skills */}
                    <div className="p-5 bg-white/[0.02] rounded-xl border border-white/[0.08] space-y-3">
                        <div className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                            Verified Skills
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs">
                            {(candidate.tags || ["Python", "FastAPI", "Docker"]).map((t, idx) => (
                                <span
                                    key={idx}
                                    className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-md font-mono text-xs"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                        <button
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl border border-white/[0.1] text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer"
                        >
                            Close
                        </button>
                        <button
                            onClick={() => {
                                onIssueOffer(candidate);
                                onClose();
                            }}
                            disabled={candidate.status === 'accepted'}
                            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm cursor-pointer ${
                                candidate.status === 'accepted'
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default'
                                    : 'bg-white hover:bg-zinc-200 text-zinc-950'
                            }`}
                        >
                            {candidate.status === 'accepted' ? '✓ Offer Extended' : 'Shortlist Candidate →'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidateDossierModal;
