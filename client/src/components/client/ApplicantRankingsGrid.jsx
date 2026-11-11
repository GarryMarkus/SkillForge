import React from 'react';
import { Users, SlidersHorizontal, Eye, Send, CheckCircle2, ShieldCheck } from '../ui/Icons';

const ApplicantRankingsGrid = ({
    selectedJob,
    applicants = [],
    filterMode = 'COSINE_DESC',
    setFilterMode,
    onInspectCandidate,
    onIssueOffer
}) => {
    const jobTitle = selectedJob?.title
        ? selectedJob.title
        : 'Senior Full-Stack Software Engineer';

    return (
        <section
            className="lg:col-span-8 bg-[#0D0F14] rounded-md border border-white/[0.08] border-t-white/15 shadow-sm flex flex-col font-mono select-none overflow-hidden"
            id="ApplicantRankingsGrid"
        >
            {/* Header Strip */}
            <div className="w-full bg-[#111318] px-5 py-3.5 border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-zinc-300 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                    <div>
                        <h3 className="font-semibold text-white text-xs uppercase tracking-wider">Ranked Candidates</h3>
                        <p className="text-[11px] text-[#888888] mt-0.5">Sorted by verified benchmark and skill match</p>
                    </div>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-sm bg-white/[0.04] text-zinc-300 border border-white/[0.08] font-mono truncate max-w-[240px]">
                    {jobTitle}
                </span>
            </div>

            {/* Filter Pills */}
            <div className="w-full px-5 py-2.5 bg-[#060709] border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-[#71717A]">
                    <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                    <span>Filter:</span>
                </span>
                <div className="flex items-center gap-1.5 text-xs font-mono">
                    <button
                        onClick={() => setFilterMode('COSINE_DESC')}
                        className={`px-2.5 py-1 rounded-sm font-mono cursor-pointer transition-colors ${
                            filterMode === 'COSINE_DESC'
                                ? 'bg-[#181B22] text-white border border-white/25'
                                : 'text-[#888888] hover:text-white border border-transparent'
                        }`}
                        type="button"
                    >
                        All Ranked
                    </button>
                    <button
                        onClick={() => setFilterMode('TRUST_90')}
                        className={`px-2.5 py-1 rounded-sm font-mono cursor-pointer transition-colors ${
                            filterMode === 'TRUST_90'
                                ? 'bg-[#181B22] text-white border border-white/25'
                                : 'text-[#888888] hover:text-white border border-transparent'
                        }`}
                        type="button"
                    >
                        90%+ Fit
                    </button>
                    <button
                        onClick={() => setFilterMode('ZERO_FLAG')}
                        className={`px-2.5 py-1 rounded-sm font-mono cursor-pointer transition-colors ${
                            filterMode === 'ZERO_FLAG'
                                ? 'bg-[#181B22] text-white border border-white/25'
                                : 'text-[#888888] hover:text-white border border-transparent'
                        }`}
                        type="button"
                    >
                        Clean Integrity
                    </button>
                </div>
            </div>

            {/* Candidate Cards Stack */}
            <div className="divide-y divide-white/[0.06]">
                {applicants.length === 0 ? (
                    <div className="p-10 text-center text-[#71717A] text-xs">
                        No candidates match this filter right now.
                    </div>
                ) : (
                    applicants.map((cand, idx) => {
                        const fitValue = Math.min(100, Math.max(0, Math.round(parseFloat(cand.cosine_sim) || 0)));
                        const isClean = (cand.proctor_flags || '').toLowerCase().includes('clean') ||
                            (cand.proctor_flags || '').toLowerCase().includes('zero');

                        return (
                            <div
                                key={cand.id}
                                className="p-4 sm:p-5 hover:bg-white/[0.02] transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-xs"
                            >
                                {/* Candidate Info */}
                                <div className="flex items-start gap-3.5 min-w-0 flex-1">
                                    <div className="w-8 h-8 rounded-sm bg-[#111318] text-zinc-300 border border-white/[0.08] font-mono flex items-center justify-center shrink-0 text-xs font-semibold">
                                        {String(idx + 1).padStart(2, '0')}
                                    </div>
                                    <div className="space-y-1.5 min-w-0 flex-1">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h4 className="font-bold font-display text-white text-sm">{cand.candidate_name}</h4>
                                            <span className="px-2 py-0.5 rounded-sm bg-white/[0.04] text-[#f5f5f5] border border-white/[0.08] text-xs font-mono font-semibold">
                                                {cand.cosine_sim}% Fit
                                            </span>
                                            {isClean && (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-[11px]">
                                                    <ShieldCheck className="w-3 h-3" strokeWidth={1.75} aria-hidden="true" />
                                                    <span>Clean</span>
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-xs text-[#888888]">{cand.role_label}</p>

                                        {/* Visual Match Bar */}
                                        <div className="max-w-xs h-1 bg-[#060709] rounded-full overflow-hidden border border-white/[0.05]">
                                            <div
                                                className="h-full bg-[#F5F5F5]"
                                                style={{ width: `${fitValue}%` }}
                                            />
                                        </div>

                                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                                            {cand.tags?.map((t, i) => (
                                                <span key={i} className="px-2 py-0.5 rounded-sm bg-white/[0.04] text-zinc-300 border border-white/[0.08] text-[11px] font-mono">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Candidate Stats & Actions */}
                                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                                    <button
                                        type="button"
                                        onClick={() => onInspectCandidate(cand)}
                                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-[#121316] border border-white/10 hover:border-white/20 text-xs font-mono text-[#E4E4E7] hover:text-white transition-colors cursor-pointer"
                                    >
                                        <Eye className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                                        <span>Inspect</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => onIssueOffer(cand)}
                                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm text-xs font-mono transition-colors cursor-pointer ${
                                            cand.status === 'accepted'
                                                ? 'bg-[#181B22] text-emerald-400 border border-emerald-500/30'
                                                : 'bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold'
                                        }`}
                                    >
                                        {cand.status === 'accepted' ? (
                                            <>
                                                <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                                                <span>Offer Sent</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                                                <span>Send Offer</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </section>
    );
};

export default ApplicantRankingsGrid;
