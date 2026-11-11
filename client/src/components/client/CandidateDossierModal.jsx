import React from 'react';
import { ShieldCheck, X, Award, Camera, Mail, ArrowUpRight, CheckCircle2, Tag } from '../ui/Icons';

const CandidateDossierModal = ({
    candidate,
    onClose,
    onIssueOffer
}) => {
    if (!candidate) return null;

    const fitPct = Math.min(100, Math.max(0, Math.round(parseFloat(candidate.cosine_sim) || 0)));

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
                    <div className="px-5 py-4 bg-[#0D0F14] border-b border-white/[0.06] flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2.5">
                            <Award className="w-4 h-4 text-zinc-300 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                            <div>
                                <h2 className="text-xs font-semibold uppercase tracking-wider text-white">
                                    Candidate Profile
                                </h2>
                                <p className="text-[11px] text-[#888888] mt-0.5">
                                    ID: {candidate.candidate_ref || 'SF-REF'}
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm border border-white/[0.08] text-xs text-[#888888] hover:text-white hover:border-white/20 font-mono cursor-pointer transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                            <span>Close</span>
                        </button>
                    </div>

                    {/* Body Content */}
                    <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs text-[#888888]">
                        {/* Candidate Overview */}
                        <div className="p-4 bg-[#060709] rounded-sm border border-white/[0.08] space-y-2.5">
                            <div className="flex justify-between items-baseline flex-wrap gap-2">
                                <span className="text-base font-bold text-white font-display">
                                    {candidate.candidate_name}
                                </span>
                                <span className="px-2.5 py-0.5 rounded-sm text-xs font-mono font-semibold bg-white/[0.04] text-[#f5f5f5] border border-white/[0.08]">
                                    {candidate.cosine_sim}% Role Fit
                                </span>
                            </div>
                            <div className="w-full h-1.5 bg-[#0D0F14] rounded-full overflow-hidden border border-white/[0.06]">
                                <div
                                    className="h-full bg-[#F5F5F5]"
                                    style={{ width: `${fitPct}%` }}
                                />
                            </div>
                            <div className="text-xs text-[#888888]">
                                {candidate.role_label} &bull; {candidate.region}
                            </div>
                            <div className="inline-flex items-center gap-1.5 text-[11px] text-[#71717A]">
                                <Mail className="w-3 h-3" strokeWidth={1.75} aria-hidden="true" />
                                <span>{candidate.email}</span>
                            </div>
                        </div>

                        {/* Verified Assessment Results */}
                        <div className="p-4 bg-[#060709] rounded-sm border border-white/[0.08] space-y-2.5">
                            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-white font-semibold">
                                <Camera className="w-3.5 h-3.5 text-[#888888]" strokeWidth={1.75} aria-hidden="true" />
                                <span>Exam &amp; Proctoring Check</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                <div className="bg-[#0D0F14] p-3 rounded-sm border border-white/[0.08]">
                                    <span className="text-[11px] text-[#71717A] block mb-0.5">Exam Score</span>
                                    <strong className="text-white text-xs font-mono">{candidate.proctor_score}</strong>
                                </div>
                                <div className="bg-[#0D0F14] p-3 rounded-sm border border-white/[0.08]">
                                    <span className="text-[11px] text-[#71717A] block mb-0.5">Proctoring Status</span>
                                    <strong className="text-emerald-400 text-xs font-mono">{candidate.proctor_flags}</strong>
                                </div>
                                <div className="bg-[#0D0F14] p-3 rounded-sm border border-white/[0.08]">
                                    <span className="text-[11px] text-[#71717A] block mb-0.5">Camera Feed</span>
                                    <strong className="text-white text-xs font-mono">{candidate.cam_status}</strong>
                                </div>
                                <div className="bg-[#0D0F14] p-3 rounded-sm border border-white/[0.08]">
                                    <span className="text-[11px] text-[#71717A] block mb-0.5">Overall Rating</span>
                                    <strong className="text-white text-xs font-mono">{candidate.rating_num}</strong>
                                </div>
                            </div>
                        </div>

                        {/* Verified Skills */}
                        <div className="p-4 bg-[#060709] rounded-sm border border-white/[0.08] space-y-2">
                            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-white font-semibold">
                                <Tag className="w-3.5 h-3.5 text-[#888888]" strokeWidth={1.75} aria-hidden="true" />
                                <span>Verified Skills</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 text-xs">
                                {(candidate.tags || ["Python", "FastAPI", "Docker"]).map((t, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-white/[0.04] text-zinc-200 border border-white/[0.08] px-2.5 py-1 rounded-sm font-mono text-xs"
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
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.5} aria-hidden="true" />
                                    <span>Record ID: {candidate.hash || '3f8a..9e1b'} · Verified</span>
                                </span>
                                <span>SkillForge Verified</span>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 rounded-sm bg-[#121316] border border-white/10 hover:border-white/20 text-xs font-mono text-[#E4E4E7] hover:text-white transition-colors cursor-pointer"
                                >
                                    Close
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        onIssueOffer(candidate);
                                        onClose();
                                    }}
                                    className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-sm text-xs font-mono transition-colors cursor-pointer ${
                                        candidate.status === 'accepted'
                                            ? 'bg-[#181B22] text-emerald-400 border border-emerald-500/30'
                                            : 'bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold'
                                    }`}
                                >
                                    {candidate.status === 'accepted' ? (
                                        <>
                                            <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                                            <span>Offer Sent</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Send Offer</span>
                                            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                                        </>
                                    )}
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
