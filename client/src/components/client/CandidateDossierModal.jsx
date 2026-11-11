import React from 'react';
import { ShieldCheck } from 'lucide-react';

const CandidateDossierModal = ({
    candidate,
    onClose,
    onIssueOffer
}) => {
    if (!candidate) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060709]/85 backdrop-blur-md select-none font-mono">
            <div className="relative w-full max-w-2xl">
                {/* Faint radial backlight behind modal panel */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)]"
                />

                <div className="relative bg-[#111318] rounded-md border border-white/[0.08] border-t-white/15 w-full shadow-2xl max-h-[90vh] flex flex-col overflow-hidden text-[#ededed]">
                    {/* Header */}
                    <div className="px-5 py-4 bg-[#0D0F14] border-b border-white/[0.06] flex items-center justify-between">
                        <div>
                            <h2 className="text-xs font-semibold uppercase tracking-wider text-white">
                                Candidate Dossier
                            </h2>
                            <p className="text-xs text-[#888888] mt-0.5">
                                Reference: {candidate.candidate_ref || 'SF-REF'}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-xs text-[#888888] hover:text-white font-mono cursor-pointer transition-colors"
                            aria-label="Close"
                        >
                            Close ✕
                        </button>
                    </div>

                    {/* Body Content */}
                    <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs text-[#888888]">
                        {/* Candidate Overview */}
                        <div className="p-4 bg-[#060709] rounded-sm border border-white/[0.08] flex flex-col gap-1.5">
                            <div className="flex justify-between items-baseline flex-wrap gap-2">
                                <span className="text-base font-bold text-white font-display">
                                    {candidate.candidate_name}
                                </span>
                                <span className="px-2.5 py-0.5 rounded-sm text-xs font-mono font-semibold bg-white/[0.04] text-[#f5f5f5] border border-white/[0.08]">
                                    {candidate.cosine_sim}% Match
                                </span>
                            </div>
                            <div className="text-xs text-[#888888]">
                                {candidate.role_label} &bull; {candidate.region}
                            </div>
                            <div className="text-[11px] text-[#71717A]">
                                Email: {candidate.email}
                            </div>
                        </div>

                        {/* Verified Assessment Results */}
                        <div className="p-4 bg-[#060709] rounded-sm border border-white/[0.08] space-y-2.5">
                            <div className="text-[11px] uppercase tracking-wider text-white font-semibold">
                                Proctored Evaluation Telemetry
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                <div className="bg-[#0D0F14] p-3 rounded-sm border border-white/[0.08]">
                                    <span className="text-[11px] text-[#71717A] block mb-0.5">Score</span>
                                    <strong className="text-white text-xs font-mono">{candidate.proctor_score}</strong>
                                </div>
                                <div className="bg-[#0D0F14] p-3 rounded-sm border border-white/[0.08]">
                                    <span className="text-[11px] text-[#71717A] block mb-0.5">Integrity Record</span>
                                    <strong className="text-white text-xs font-mono">{candidate.proctor_flags}</strong>
                                </div>
                                <div className="bg-[#0D0F14] p-3 rounded-sm border border-white/[0.08]">
                                    <span className="text-[11px] text-[#71717A] block mb-0.5">Hardware Telemetry</span>
                                    <strong className="text-white text-xs font-mono">{candidate.cam_status}</strong>
                                </div>
                                <div className="bg-[#0D0F14] p-3 rounded-sm border border-white/[0.08]">
                                    <span className="text-[11px] text-[#71717A] block mb-0.5">Peer Calibrated Rating</span>
                                    <strong className="text-white text-xs font-mono">{candidate.rating_num}</strong>
                                </div>
                            </div>
                        </div>

                        {/* Verified Skills */}
                        <div className="p-4 bg-[#060709] rounded-sm border border-white/[0.08] space-y-2">
                            <div className="text-[11px] uppercase tracking-wider text-white font-semibold">
                                Verified Competencies
                            </div>
                            <div className="flex flex-wrap gap-1.5 text-xs">
                                {(candidate.tags || ["Python", "FastAPI", "Docker"]).map((t, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-white/[0.04] text-zinc-300 border border-white/[0.08] px-2.5 py-1 rounded-sm font-mono text-xs"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Verification Audit Footer & Actions */}
                        <div className="pt-4 border-t border-white/[0.06] space-y-4">
                            <div className="flex items-center justify-between text-[11px] text-[#71717A]">
                                <span className="inline-flex items-center gap-1.5">
                                    <ShieldCheck className="w-3.5 h-3.5 text-[#71717A]" strokeWidth={1.5} aria-hidden="true" />
                                    <span>Verification Hash: {candidate.hash || '3f8a..9e1b'} · Audited</span>
                                </span>
                                <span>SkillForge Engine</span>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 rounded-sm bg-[#121316] border border-white/10 hover:border-white/20 text-xs font-mono text-[#E4E4E7] hover:text-white transition-colors cursor-pointer"
                                >
                                    Close
                                </button>

                                <button
                                    onClick={() => {
                                        onIssueOffer(candidate);
                                        onClose();
                                    }}
                                    className={`px-5 py-2 rounded-sm text-xs font-mono transition-colors cursor-pointer ${
                                        candidate.status === 'accepted'
                                            ? 'bg-[#181B22] text-zinc-300 border border-white/20'
                                            : 'bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold'
                                    }`}
                                >
                                    {candidate.status === 'accepted' ? 'Offer Extended ✓' : 'Extend Interview / Offer ↗'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidateDossierModal;
