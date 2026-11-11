import React from 'react';

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
                <div>
                    <h3 className="font-semibold text-white text-xs uppercase tracking-wider">Candidate Rankings</h3>
                    <p className="text-xs text-[#888888] mt-0.5">Evaluated against verified technical benchmarks</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-sm bg-white/[0.04] text-zinc-300 border border-white/[0.08] font-mono">
                        Role: {jobTitle}
                    </span>
                </div>
            </div>

            {/* Filter Pills */}
            <div className="w-full px-5 py-2.5 bg-[#060709] border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs text-[#71717A]">Filter:</span>
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
                        Highest Match
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
                        ≥90% Match
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
                        Zero Flags
                    </button>
                </div>
            </div>

            {/* Candidate Cards Stack */}
            <div className="divide-y divide-white/[0.06]">
                {applicants.length === 0 ? (
                    <div className="p-10 text-center text-[#71717A] text-xs">
                        No evaluated candidates currently in the pipeline.
                    </div>
                ) : (
                    applicants.map((cand, idx) => (
                        <div
                            key={cand.id}
                            className="p-4 sm:p-5 hover:bg-white/[0.02] transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-xs"
                        >
                            {/* Candidate Info */}
                            <div className="flex items-start gap-3.5">
                                <div className="w-8 h-8 rounded-sm bg-[#111318] text-zinc-300 border border-white/[0.08] font-mono flex items-center justify-center shrink-0 text-xs font-semibold">
                                    {String(idx + 1).padStart(2, '0')}
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h4 className="font-bold font-display text-white text-sm">{cand.candidate_name}</h4>
                                        <span className="px-2 py-0.5 rounded-sm bg-white/[0.04] text-[#f5f5f5] border border-white/[0.08] text-xs font-mono font-semibold">
                                            {cand.cosine_sim}% Match
                                        </span>
                                    </div>
                                    <p className="text-xs text-[#888888]">{cand.role_label}</p>
                                    <div className="flex flex-wrap gap-1.5 pt-1">
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
                                    onClick={() => onInspectCandidate(cand)}
                                    className="px-3.5 py-1.5 rounded-sm bg-[#121316] border border-white/10 hover:border-white/20 text-xs font-mono text-[#E4E4E7] hover:text-white transition-colors cursor-pointer"
                                >
                                    Inspect Dossier ↗
                                </button>
                                <button
                                    onClick={() => onIssueOffer(cand)}
                                    className={`px-3.5 py-1.5 rounded-sm text-xs font-mono transition-colors cursor-pointer ${
                                        cand.status === 'accepted'
                                            ? 'bg-[#181B22] text-zinc-300 border border-white/20'
                                            : 'bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold'
                                    }`}
                                >
                                    {cand.status === 'accepted' ? 'Offer Sent ✓' : 'Extend Offer ↗'}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default ApplicantRankingsGrid;
