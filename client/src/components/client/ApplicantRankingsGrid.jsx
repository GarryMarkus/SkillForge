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
            className="lg:col-span-8 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col font-sans overflow-hidden"
            id="ApplicantRankingsGrid"
        >
            {/* Header Strip */}
            <div className="w-full px-6 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h3 className="font-bold text-gray-900 text-lg">Candidate Skill Rankings</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Ranked by demonstrated practical competence and skill match</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold">
                        Role: {jobTitle}
                    </span>
                </div>
            </div>

            {/* Filter Pills */}
            <div className="w-full px-6 py-3 bg-gray-50/60 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-gray-500 font-medium">Filter Candidates:</span>
                <div className="flex items-center gap-2 text-xs">
                    <button
                        onClick={() => setFilterMode('COSINE_DESC')}
                        className={`px-3 py-1 rounded-full font-semibold cursor-pointer transition-all ${
                            filterMode === 'COSINE_DESC'
                                ? 'bg-blue-600 text-white shadow-xs'
                                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                        }`}
                        type="button"
                    >
                        Highest Match Fit
                    </button>
                    <button
                        onClick={() => setFilterMode('TRUST_90')}
                        className={`px-3 py-1 rounded-full font-semibold cursor-pointer transition-all ${
                            filterMode === 'TRUST_90'
                                ? 'bg-blue-600 text-white shadow-xs'
                                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                        }`}
                        type="button"
                    >
                        Top Scores (90%+)
                    </button>
                    <button
                        onClick={() => setFilterMode('PERFECT_PROCTOR')}
                        className={`px-3 py-1 rounded-full font-semibold cursor-pointer transition-all ${
                            filterMode === 'PERFECT_PROCTOR'
                                ? 'bg-blue-600 text-white shadow-xs'
                                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                        }`}
                        type="button"
                    >
                        100% Proctor Integrity
                    </button>
                </div>
            </div>

            {/* Candidate Cards Stack */}
            <div className="divide-y divide-gray-100 p-2 sm:p-4">
                {applicants.length === 0 ? (
                    <div className="p-12 text-center text-gray-400">
                        No evaluated candidates currently in the pipeline.
                    </div>
                ) : (
                    applicants.map((cand, idx) => (
                        <div
                            key={cand.id}
                            className="p-5 sm:p-6 hover:bg-gray-50/60 transition-colors rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
                        >
                            {/* Candidate Info */}
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 font-bold flex items-center justify-center shrink-0 text-sm">
                                    0{idx + 1}
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-gray-900 text-base">{cand.candidate_name}</h4>
                                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                                            {cand.cosine_sim}% Match
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 font-medium">{cand.role_label}</p>
                                    <div className="flex flex-wrap gap-1.5 pt-1.5">
                                        {cand.tags?.map((t, i) => (
                                            <span key={i} className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 text-[11px] font-medium">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Actions & Rating */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                                <div className="text-left sm:text-right pr-2 hidden sm:block">
                                    <div className="text-amber-400 font-bold text-sm">★★★★★</div>
                                    <div className="text-xs text-gray-400">{cand.rating_num || '4.8 / 5.0'}</div>
                                </div>

                                <button
                                    onClick={() => onInspectCandidate(cand)}
                                    className="px-4 py-2 rounded-xl border border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 text-xs font-semibold transition-colors cursor-pointer"
                                >
                                    View Dossier
                                </button>
                                <button
                                    onClick={() => onIssueOffer(cand)}
                                    disabled={cand.status === 'accepted'}
                                    className={`px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer ${
                                        cand.status === 'accepted'
                                            ? 'bg-emerald-600 text-white cursor-default'
                                            : 'bg-blue-600 hover:bg-blue-700 text-white'
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
