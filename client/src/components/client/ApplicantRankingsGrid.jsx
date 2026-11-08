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
            className="lg:col-span-8 bg-[#121318] rounded-2xl border border-white/[0.08] shadow-sm flex flex-col font-sans overflow-hidden"
            id="ApplicantRankingsGrid"
        >
            {/* Header Strip */}
            <div className="w-full px-6 py-4 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h3 className="font-semibold text-white text-base sm:text-lg">Candidate Skill Rankings</h3>
                    <p className="text-xs text-zinc-400 mt-0.5">Ranked by demonstrated practical competence and skill match</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
                        Role: {jobTitle}
                    </span>
                </div>
            </div>

            {/* Filter Pills */}
            <div className="w-full px-6 py-3 bg-white/[0.02] border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-zinc-400 font-medium">Filter Candidates:</span>
                <div className="flex items-center gap-2 text-xs">
                    <button
                        onClick={() => setFilterMode('COSINE_DESC')}
                        className={`px-3 py-1 rounded-full font-medium cursor-pointer transition-all ${
                            filterMode === 'COSINE_DESC'
                                ? 'bg-white/[0.1] text-white border border-white/[0.15]'
                                : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                        }`}
                        type="button"
                    >
                        Highest Match Fit
                    </button>
                    <button
                        onClick={() => setFilterMode('TRUST_90')}
                        className={`px-3 py-1 rounded-full font-medium cursor-pointer transition-all ${
                            filterMode === 'TRUST_90'
                                ? 'bg-white/[0.1] text-white border border-white/[0.15]'
                                : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                        }`}
                        type="button"
                    >
                        Top Scores (90%+)
                    </button>
                    <button
                        onClick={() => setFilterMode('PERFECT_PROCTOR')}
                        className={`px-3 py-1 rounded-full font-medium cursor-pointer transition-all ${
                            filterMode === 'PERFECT_PROCTOR'
                                ? 'bg-white/[0.1] text-white border border-white/[0.15]'
                                : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                        }`}
                        type="button"
                    >
                        100% Proctor Integrity
                    </button>
                </div>
            </div>

            {/* Candidate Cards Stack */}
            <div className="divide-y divide-white/[0.04] p-2 sm:p-4">
                {applicants.length === 0 ? (
                    <div className="p-12 text-center text-zinc-500">
                        No evaluated candidates currently in the pipeline.
                    </div>
                ) : (
                    applicants.map((cand, idx) => (
                        <div
                            key={cand.id}
                            className="p-5 sm:p-6 hover:bg-white/[0.02] transition-colors rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
                        >
                            {/* Candidate Info */}
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/[0.05] text-zinc-300 border border-white/[0.08] font-mono flex items-center justify-center shrink-0 text-xs">
                                    0{idx + 1}
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-semibold text-white text-base">{cand.candidate_name}</h4>
                                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">
                                            {cand.cosine_sim}% Match
                                        </span>
                                    </div>
                                    <p className="text-xs text-zinc-400 font-normal">{cand.role_label}</p>
                                    <div className="flex flex-wrap gap-1.5 pt-1.5">
                                        {cand.tags?.map((t, i) => (
                                            <span key={i} className="px-2 py-0.5 rounded-md bg-white/[0.04] text-zinc-300 border border-white/[0.06] text-[11px] font-mono">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Actions & Rating */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                                <div className="text-left sm:text-right pr-2 hidden sm:block">
                                    <div className="text-amber-400 font-medium text-sm">★★★★★</div>
                                    <div className="text-xs text-zinc-500">{cand.rating_num || '4.8 / 5.0'}</div>
                                </div>

                                <button
                                    onClick={() => onInspectCandidate(cand)}
                                    className="px-4 py-2 rounded-xl border border-white/[0.08] hover:border-white/[0.2] text-zinc-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
                                >
                                    View Dossier
                                </button>
                                <button
                                    onClick={() => onIssueOffer(cand)}
                                    disabled={cand.status === 'accepted'}
                                    className={`px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer ${
                                        cand.status === 'accepted'
                                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default'
                                            : 'bg-white hover:bg-zinc-200 text-zinc-950'
                                    }`}
                                >
                                    {cand.status === 'accepted' ? '✓ Offer Extended' : 'Fast-Track Offer'}
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
