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

    return (
        <section className="rounded-md bg-[#0b0b0c] border border-white/10 flex flex-col font-mono select-none overflow-hidden" id="MatchedPositionsGrid">
            {/* Header & Filter Controls */}
            <div className="p-5 sm:p-6 border-b border-white/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className="font-semibold text-base text-white tracking-tight uppercase">
                        [ matched requisitions ]
                    </h3>
                    <p className="text-xs text-[#737373] mt-0.5">
                        Roles algorithmically aligned with your verified competencies
                    </p>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-2 text-xs">
                    <button
                        onClick={() => setFilterMode('ALL')}
                        className={`px-3 py-1.5 rounded-sm font-mono cursor-pointer transition-all ${
                            filterMode === 'ALL' 
                                ? 'bg-[#111113] text-white border border-white/20 shadow-xs' 
                                : 'bg-[#050505] text-[#737373] hover:text-white border border-white/10'
                        }`}
                        type="button"
                    >
                        [All: {jobs.length}]
                    </button>
                    <button
                        onClick={() => setFilterMode('MATCH_85')}
                        className={`px-3 py-1.5 rounded-sm font-mono cursor-pointer transition-all ${
                            filterMode === 'MATCH_85' 
                                ? 'bg-[#111113] text-white border border-white/20 shadow-xs' 
                                : 'bg-[#050505] text-[#737373] hover:text-white border border-white/10'
                        }`}
                        type="button"
                    >
                        [&gt;=85% Match]
                    </button>
                    <button
                        onClick={() => setFilterMode('APPLIED')}
                        className={`px-3 py-1.5 rounded-sm font-mono cursor-pointer transition-all ${
                            filterMode === 'APPLIED' 
                                ? 'bg-[#111113] text-white border border-white/20 shadow-xs' 
                                : 'bg-[#050505] text-[#737373] hover:text-white border border-white/10'
                        }`}
                        type="button"
                    >
                        [Applied: {myApplications.length}]
                    </button>
                </div>
            </div>

            {/* High-Density Card Tiles Grid */}
            <div className="p-5 sm:p-6">
                {filteredJobs.length === 0 ? (
                    <div className="py-12 text-center text-[#555555] text-xs">
                        No requisitions matching current filter criteria.
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
                                    className="p-5 rounded-md bg-[#050505] border border-white/10 hover:border-white/25 transition-colors flex flex-col justify-between gap-4 font-mono"
                                >
                                    <div className="space-y-3">
                                        {/* Top Row: Match Score & Category */}
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-mono bg-[#111113] text-[#ededed] border border-white/20">
                                                [{matchScore}% Match]
                                            </span>
                                            <span className="text-[11px] text-[#737373] font-mono">
                                                ${Number(job.budget_amount || 135000).toLocaleString()} / yr
                                            </span>
                                        </div>

                                        {/* Role & Company Details */}
                                        <div>
                                            <h4 className="font-semibold text-white text-sm tracking-tight truncate">
                                                {job.title}
                                            </h4>
                                            <p className="text-xs text-[#737373] mt-0.5 truncate">
                                                {job.company_name || 'Technology Partner'}
                                            </p>
                                        </div>

                                        {/* Stack Tags */}
                                        <div className="flex flex-wrap gap-1.5 pt-1">
                                            {stackTags.slice(0, 3).map((tag, tIdx) => (
                                                <span
                                                    key={tIdx}
                                                    className="px-2 py-0.5 rounded-sm text-[11px] bg-[#0b0b0c] text-[#888888] border border-white/10"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                                        <span className="text-[11px] text-[#555555]">
                                            {job.location || 'Remote'}
                                        </span>

                                        {applied ? (
                                            appStatus === 'accepted' ? (
                                                <span className="text-xs font-mono text-[#ededed] px-2.5 py-1 rounded-md bg-[#111113] border border-white/20">
                                                    [Offer Extended]
                                                </span>
                                            ) : appStatus === 'rejected' ? (
                                                <span className="text-xs font-mono text-[#555555] px-2.5 py-1 rounded-md bg-[#0b0b0c] border border-white/5">
                                                    [Closed]
                                                </span>
                                            ) : (
                                                <span className="text-xs font-mono text-[#888888] px-2.5 py-1 rounded-md bg-[#0b0b0c] border border-white/10">
                                                    [Under Review]
                                                </span>
                                            )
                                        ) : (
                                            <button
                                                onClick={() => onApply(job.id)}
                                                disabled={isApplying}
                                                className="px-3 py-1.5 bg-[#111113] hover:bg-[#1a1a1d] text-white border border-white/20 font-mono rounded-md text-xs transition-colors cursor-pointer disabled:opacity-50"
                                            >
                                                {isApplying ? 'Applying...' : '[ Quick Apply ↗ ]'}
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
