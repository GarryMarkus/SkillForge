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
            className="lg:col-span-8 bg-[#0b0b0c] rounded-md border border-white/10 shadow-sm flex flex-col font-mono select-none overflow-hidden"
            id="ApplicantRankingsGrid"
        >
            {/* Header Strip */}
            <div className="w-full px-5 py-3.5 border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h3 className="font-semibold text-white text-xs uppercase tracking-wider">[ Candidate Rankings ]</h3>
                    <p className="text-xs text-[#737373] mt-0.5">Evaluated against verified technical benchmarks</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-sm bg-[#050505] text-[#888888] border border-white/10 font-mono">
                        Role: {jobTitle}
                    </span>
                </div>
            </div>

            {/* Filter Pills */}
            <div className="w-full px-5 py-2.5 bg-[#050505] border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs text-[#555555]">Filter:</span>
                <div className="flex items-center gap-1.5 text-xs font-mono">
                    <button
                        onClick={() => setFilterMode('COSINE_DESC')}
                        className={`px-2.5 py-1 rounded-sm font-mono cursor-pointer transition-all ${
                            filterMode === 'COSINE_DESC'
                                ? 'bg-[#111113] text-white border border-white/20'
                                : 'text-[#737373] hover:text-white'
                        }`}
                        type="button"
                    >
                        [Highest Match]
                    </button>
                    <button
                        onClick={() => setFilterMode('TRUST_90')}
                        className={`px-2.5 py-1 rounded-sm font-mono cursor-pointer transition-all ${
                            filterMode === 'TRUST_90'
                                ? 'bg-[#111113] text-white border border-white/20'
                                : 'text-[#737373] hover:text-white'
                        }`}
                        type="button"
                    >
                        [&gt;=90% Match]
                    </button>
                    <button
                        onClick={() => setFilterMode('ZERO_FLAG')}
                        className={`px-2.5 py-1 rounded-sm font-mono cursor-pointer transition-all ${
                            filterMode === 'ZERO_FLAG'
                                ? 'bg-[#111113] text-white border border-white/20'
                                : 'text-[#737373] hover:text-white'
                        }`}
                        type="button"
                    >
                        [Zero Flags]
                    </button>
                </div>
            </div>

            {/* Candidate Cards Stack */}
            <div className="divide-y divide-white/[0.04]">
                {applicants.length === 0 ? (
                    <div className="p-10 text-center text-[#555555] text-xs">
                        No evaluated candidates currently in the pipeline.
                    </div>
                ) : (
                    applicants.map((cand, idx) => (
                        <div
                            key={cand.id}
                            className="p-4 sm:p-5 hover:bg-[#050505] transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-xs"
                        >
                            {/* Candidate Info */}
                            <div className="flex items-start gap-3.5">
                                <div className="w-8 h-8 rounded-sm bg-[#111113] text-[#888888] border border-white/20 font-mono flex items-center justify-center shrink-0 text-xs">
                                    0{idx + 1}
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-semibold text-white text-sm">{cand.candidate_name}</h4>
                                        <span className="px-2 py-0.5 rounded-sm bg-[#111113] text-[#ededed] border border-white/20 text-xs font-mono">
                                            [{cand.cosine_sim}% Match]
                                        </span>
                                    </div>
                                    <p className="text-xs text-[#737373]">{cand.role_label}</p>
                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                        {cand.tags?.map((t, i) => (
                                            <span key={i} className="px-2 py-0.2 rounded-sm bg-[#050505] text-[#888888] border border-white/10 text-[10px] font-mono">
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
                                    className="px-3 py-1.5 rounded-md border border-white/10 text-xs font-mono text-[#888888] hover:text-white hover:border-white/20 transition-colors cursor-pointer"
                                >
                                    [Inspect Dossier ↗]
                                </button>
                                <button
                                    onClick={() => onIssueOffer(cand)}
                                    className="px-3 py-1.5 rounded-md bg-[#111113] hover:bg-[#1a1a1d] text-white border border-white/20 text-xs font-mono transition-colors cursor-pointer"
                                >
                                    {cand.status === 'accepted' ? '[Offer Sent ✓]' : '[Extend Offer ↗]'}
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
