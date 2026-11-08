import React from 'react';

const MatchedPositionsGrid = ({ 
    jobs = [], 
    myApplications = [], 
    filterMode, 
    setFilterMode, 
    onApply, 
    applyingTo 
}) => {
    const hasApplied = (jobId) => myApplications.some(app => app.job === jobId || app.job_id === jobId);

    const filteredJobs = jobs.filter(job => {
        const matchScore = typeof job.match === 'number' ? Math.round(job.match) : 90;
        if (filterMode === 'MATCH_85') return matchScore >= 85;
        if (filterMode === 'APPLIED') return hasApplied(job.id);
        return true;
    });

    const getMatchBadgeStyle = (score) => {
        if (score >= 85) {
            return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
        }
        if (score >= 70) {
            return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
        }
        return 'bg-zinc-800 text-zinc-400 border-zinc-700/60';
    };

    return (
        <section className="rounded-xl bg-[#121318] border border-white/[0.08] flex flex-col font-sans shadow-sm overflow-hidden" id="MatchedPositionsGrid">
            {/* Header & Filter Controls */}
            <div className="p-5 sm:p-6 border-b border-white/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className="font-semibold text-base sm:text-lg text-white tracking-tight">
                        Matched Engineering Roles
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                        Opportunities matched directly to your verified technical strengths
                    </p>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-2 text-xs">
                    <button
                        onClick={() => setFilterMode('ALL')}
                        className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-all ${
                            filterMode === 'ALL' 
                                ? 'bg-zinc-800 text-white shadow-xs border border-zinc-700' 
                                : 'bg-zinc-900/60 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                        }`}
                        type="button"
                    >
                        All Roles ({jobs.length})
                    </button>
                    <button
                        onClick={() => setFilterMode('MATCH_85')}
                        className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-all ${
                            filterMode === 'MATCH_85' 
                                ? 'bg-zinc-800 text-white shadow-xs border border-zinc-700' 
                                : 'bg-zinc-900/60 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                        }`}
                        type="button"
                    >
                        Top Matches (85%+)
                    </button>
                    <button
                        onClick={() => setFilterMode('APPLIED')}
                        className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-all ${
                            filterMode === 'APPLIED' 
                                ? 'bg-zinc-800 text-white shadow-xs border border-zinc-700' 
                                : 'bg-zinc-900/60 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                        }`}
                        type="button"
                    >
                        Applied ({myApplications.length})
                    </button>
                </div>
            </div>

            {/* High-Density Card Tiles Grid */}
            <div className="p-5 sm:p-6">
                {filteredJobs.length === 0 ? (
                    <div className="py-12 text-center text-zinc-500 text-sm">
                        No open roles match the current filter selection.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredJobs.map((job) => {
                            const userApp = myApplications.find(app => app.job === job.id || app.job_id === job.id);
                            const applied = Boolean(userApp);
                            const appStatus = userApp?.status;
                            const matchScore = typeof job.match === 'number' ? Math.round(job.match) : 92;
                            const isApplying = applyingTo === job.id;
                            const stackTags = job.skills || job.tags || ['Python', 'System Architecture', 'PostgreSQL'];

                            return (
                                <div
                                    key={job.id}
                                    className="p-5 rounded-lg bg-[#181A22] border border-white/[0.06] hover:border-zinc-700 transition-colors flex flex-col justify-between gap-4"
                                >
                                    <div className="space-y-3">
                                        {/* Top Row: Match Score & Category */}
                                        <div className="flex items-center justify-between gap-2">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getMatchBadgeStyle(matchScore)}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${matchScore >= 85 ? 'bg-emerald-400' : 'bg-blue-400'}`} />
                                                {matchScore}% Match
                                            </span>
                                            <span className="text-[11px] font-medium text-zinc-400">
                                                ${Number(job.budget_amount || 135000).toLocaleString()} / yr
                                            </span>
                                        </div>

                                        {/* Role & Company Details */}
                                        <div>
                                            <h4 className="font-semibold text-white text-base tracking-tight truncate">
                                                {job.title}
                                            </h4>
                                            <p className="text-xs text-zinc-400 mt-0.5">
                                                {job.company_name || 'Technology Partner'}
                                            </p>
                                        </div>

                                        {/* Stack Tags */}
                                        <div className="flex flex-wrap gap-1.5 pt-1">
                                            {stackTags.slice(0, 3).map((tag, tIdx) => (
                                                <span
                                                    key={tIdx}
                                                    className="px-2 py-0.5 rounded text-[11px] bg-zinc-900 text-zinc-300 border border-zinc-800"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                                        <span className="text-[11px] text-zinc-500">
                                            {job.location || 'Remote / Hybrid'}
                                        </span>

                                        {applied ? (
                                            appStatus === 'accepted' ? (
                                                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                                                    Offer Extended
                                                </span>
                                            ) : appStatus === 'rejected' ? (
                                                <span className="text-xs font-medium text-zinc-500 px-2.5 py-1 rounded-md bg-zinc-800">
                                                    Closed
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-400 px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20">
                                                    Under Review
                                                </span>
                                            )
                                        ) : (
                                            <button
                                                onClick={() => onApply(job.id)}
                                                disabled={isApplying}
                                                className="px-3.5 py-1.5 bg-white hover:bg-zinc-200 text-zinc-950 font-medium rounded-lg text-xs transition-colors cursor-pointer disabled:opacity-50"
                                            >
                                                {isApplying ? 'Applying...' : 'Quick Apply'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default MatchedPositionsGrid;
