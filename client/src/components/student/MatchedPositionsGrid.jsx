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
        const matchScore = job.match || 90;
        if (filterMode === 'MATCH_85') return matchScore >= 85;
        if (filterMode === 'APPLIED') return hasApplied(job.id);
        return true;
    });

    return (
        <section className="border border-black/20 bg-canvas-light flex flex-col font-mono shadow-[4px_4px_0px_#0A0A0A]" id="MatchedPositionsGrid">
            <div className="p-4 sm:p-6 border-b border-black/15 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-low">
                <div className="flex items-center gap-2 font-bold text-sm text-ink-primary">
                    <span className="text-canvas-blueprint font-bold">[#]</span>
                    <span>[ REQUISITION MATCH ENGINE // TF-IDF COSINE SIMILARITY ]</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                    <button
                        onClick={() => setFilterMode('ALL')}
                        className={`px-3 py-1.5 uppercase font-bold cursor-pointer transition-none ${
                            filterMode === 'ALL' 
                                ? 'bg-canvas-blueprint text-white border border-canvas-blueprint' 
                                : 'bg-surface-container-lowest text-ink-primary border border-black/20 hover:bg-black hover:text-white'
                        }`}
                        type="button"
                    >
                        [ALL ROLES]
                    </button>
                    <button
                        onClick={() => setFilterMode('MATCH_85')}
                        className={`px-3 py-1.5 uppercase font-bold cursor-pointer transition-none ${
                            filterMode === 'MATCH_85' 
                                ? 'bg-canvas-blueprint text-white border border-canvas-blueprint' 
                                : 'bg-surface-container-lowest text-ink-primary border border-black/20 hover:bg-black hover:text-white'
                        }`}
                        type="button"
                    >
                        [MATCH &gt; 85%]
                    </button>
                    <button
                        onClick={() => setFilterMode('APPLIED')}
                        className={`px-3 py-1.5 uppercase font-bold cursor-pointer transition-none ${
                            filterMode === 'APPLIED' 
                                ? 'bg-canvas-blueprint text-white border border-canvas-blueprint' 
                                : 'bg-surface-container-lowest text-ink-primary border border-black/20 hover:bg-black hover:text-white'
                        }`}
                        type="button"
                    >
                        [APPLIED ({myApplications.length})]
                    </button>
                </div>
            </div>

            {/* Clean Data Table */}
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                        <tr className="bg-surface-container text-xs text-on-surface-variant uppercase border-b border-black/15">
                            <th className="p-3.5 sm:p-4 border-r border-black/15 font-bold">MATCH SCORE</th>
                            <th className="p-3.5 sm:p-4 border-r border-black/15 font-bold">TARGET DESIGNATION</th>
                            <th className="p-3.5 sm:p-4 border-r border-black/15 font-bold">COMPANY</th>
                            <th className="p-3.5 sm:p-4 border-r border-black/15 font-bold">DOMAIN</th>
                            <th className="p-3.5 sm:p-4 border-r border-black/15 font-bold">REQUIRED STACK</th>
                            <th className="p-3.5 sm:p-4 font-bold text-right">ACTION</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/10 text-ink-primary">
                        {filteredJobs.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="p-8 text-center text-outline italic">
                                    No matched requisitions found for the selected filter.
                                </td>
                            </tr>
                        ) : (
                            filteredJobs.map(job => {
                                const applied = hasApplied(job.id);
                                const matchPercent = job.match ? Math.round(job.match) : 92;
                                return (
                                    <tr key={job.id} className="hover:bg-surface-container-low transition-none">
                                        <td className="p-3.5 sm:p-4 border-r border-black/15 font-bold text-canvas-blueprint whitespace-nowrap text-sm sm:text-base">
                                            {matchPercent}% MATCH
                                        </td>
                                        <td className="p-3.5 sm:p-4 border-r border-black/15 font-bold text-ink-primary">
                                            {job.title?.toUpperCase()}
                                        </td>
                                        <td className="p-3.5 sm:p-4 border-r border-black/15 text-on-surface-variant font-medium">
                                            {job.company_name || 'Enterprise Client'}
                                        </td>
                                        <td className="p-3.5 sm:p-4 border-r border-black/15 whitespace-nowrap">
                                            <span className="border border-black/15 px-2 py-0.5 text-xs bg-surface-container">
                                                {job.category || 'REMOTE_GLOBAL'}
                                            </span>
                                        </td>
                                        <td className="p-3.5 sm:p-4 border-r border-black/15 text-xs text-on-surface-variant">
                                            {job.skills_required || 'Python, Django, React'}
                                        </td>
                                        <td className="p-3.5 sm:p-4 text-right whitespace-nowrap">
                                            {applied ? (
                                                <span className="inline-block border border-primary-container bg-primary-fixed/30 text-primary-container px-3 py-1.5 text-xs uppercase font-bold">
                                                    [ DISPATCHED ✓ ]
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() => onApply(job.id)}
                                                    disabled={applyingTo === job.id}
                                                    className="bg-surface-container-lowest text-canvas-blueprint border border-canvas-blueprint hover:bg-canvas-blueprint hover:text-white px-3.5 py-1.5 text-xs uppercase font-bold transition-none cursor-pointer disabled:opacity-50"
                                                    type="button"
                                                >
                                                    {applyingTo === job.id ? '[ DISPATCHING... ]' : '[ DISPATCH PROFILE ]'}
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

            <div className="px-4 py-2.5 border-t border-black/15 bg-surface-container-low flex justify-between items-center text-xs text-outline font-medium">
                <span>SHOWING {filteredJobs.length} OF {jobs.length} REQUISITIONS</span>
                <span>DISPATCH ENGINE ACTIVE</span>
            </div>
        </section>
    );
};

export default MatchedPositionsGrid;
