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
        <section className="bg-white rounded-2xl border border-gray-100 flex flex-col font-sans shadow-sm overflow-hidden" id="MatchedPositionsGrid">
            {/* Header & Filter Controls */}
            <div className="p-5 sm:p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className="font-bold text-lg text-gray-900 tracking-tight">
                        Matched Engineering Roles
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                        Opportunities matched directly to your verified technical strengths
                    </p>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-2 text-xs">
                    <button
                        onClick={() => setFilterMode('ALL')}
                        className={`px-3.5 py-1.5 rounded-full font-semibold cursor-pointer transition-all ${
                            filterMode === 'ALL' 
                                ? 'bg-blue-600 text-white shadow-xs' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        type="button"
                    >
                        All Roles
                    </button>
                    <button
                        onClick={() => setFilterMode('MATCH_85')}
                        className={`px-3.5 py-1.5 rounded-full font-semibold cursor-pointer transition-all ${
                            filterMode === 'MATCH_85' 
                                ? 'bg-blue-600 text-white shadow-xs' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        type="button"
                    >
                        Top Matches (85%+)
                    </button>
                    <button
                        onClick={() => setFilterMode('APPLIED')}
                        className={`px-3.5 py-1.5 rounded-full font-semibold cursor-pointer transition-all ${
                            filterMode === 'APPLIED' 
                                ? 'bg-blue-600 text-white shadow-xs' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        type="button"
                    >
                        Applied ({myApplications.length})
                    </button>
                </div>
            </div>

            {/* Clean Modern Data Table */}
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                    <thead>
                        <tr className="bg-gray-50/70 text-xs text-gray-500 uppercase border-b border-gray-100 font-semibold">
                            <th className="py-3 px-5">Match Fit</th>
                            <th className="py-3 px-5">Role &amp; Company</th>
                            <th className="py-3 px-5">Category</th>
                            <th className="py-3 px-5">Compensation</th>
                            <th className="py-3 px-5 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-900">
                        {filteredJobs.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="py-12 px-5 text-center text-gray-400">
                                    No open roles match the current filter selection.
                                </td>
                            </tr>
                        ) : (
                            filteredJobs.map((job) => {
                                const userApp = myApplications.find(app => app.job === job.id || app.job_id === job.id);
                                const applied = Boolean(userApp);
                                const appStatus = userApp?.status;
                                const matchScore = typeof job.match === 'number' ? Math.round(job.match) : 92;
                                const isApplying = applyingTo === job.id;

                                return (
                                    <tr key={job.id} className="hover:bg-gray-50/60 transition-colors">
                                        <td className="py-4 px-5 whitespace-nowrap">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                {matchScore}% Fit
                                            </span>
                                        </td>
                                        <td className="py-4 px-5">
                                            <div className="font-bold text-gray-900">{job.title}</div>
                                            <div className="text-xs text-gray-500">{job.company_name || 'Tech Partner Team'}</div>
                                        </td>
                                        <td className="py-4 px-5 text-gray-600 text-xs">
                                            <span className="px-2 py-0.5 rounded-md bg-gray-100 font-medium">
                                                {job.category || 'Software Engineering'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-5 whitespace-nowrap font-semibold text-gray-900">
                                            ${Number(job.budget_amount || 135000).toLocaleString()} <span className="text-xs text-gray-400 font-normal">/ yr</span>
                                        </td>
                                        <td className="py-4 px-5 text-right whitespace-nowrap">
                                            {applied ? (
                                                appStatus === 'accepted' ? (
                                                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
                                                        <span className="material-symbols-outlined text-[16px]">celebration</span>
                                                        Offer Extended
                                                    </span>
                                                ) : appStatus === 'rejected' ? (
                                                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 px-3 py-1.5 rounded-lg bg-gray-100">
                                                        Closed
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200">
                                                        <span className="material-symbols-outlined text-[16px]">hourglass_top</span>
                                                        Under Review
                                                    </span>
                                                )
                                            ) : (
                                                <button
                                                    onClick={() => onApply(job.id)}
                                                    disabled={isApplying}
                                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                                                >
                                                    {isApplying ? 'Submitting...' : 'Apply with Profile'}
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default MatchedPositionsGrid;
