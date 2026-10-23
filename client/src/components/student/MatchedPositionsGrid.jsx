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
        <section className="border border-cad bg-canvas-light flex flex-col font-mono" id="MatchedPositionsGrid">
            <div className="p-space-md border-b border-cad flex flex-col md:flex-row md:items-center justify-between gap-space-sm bg-surface-container-low">
                <div className="flex items-center gap-space-xs font-label-md text-label-md text-ink-primary font-bold">
                    <span className="text-canvas-blueprint font-bold">[#]</span>
                    <span>[ REQUISITION_MATCH_ENGINE // SCIPY_TFIDF_COSINE_SIMILARITY ]</span>
                </div>
                <div className="flex items-center gap-1 font-label-sm text-label-sm">
                    <button
                        onClick={() => setFilterMode('ALL')}
                        className={`px-2.5 py-1 uppercase font-bold cursor-pointer transition-none ${
                            filterMode === 'ALL' 
                                ? 'bg-canvas-blueprint text-white border border-canvas-blueprint' 
                                : 'bg-surface-container-lowest text-ink-primary border border-cad hover:bg-surface-container'
                        }`}
                        type="button"
                    >
                        [ALL_SPECS]
                    </button>
                    <button
                        onClick={() => setFilterMode('MATCH_85')}
                        className={`px-2.5 py-1 uppercase font-bold cursor-pointer transition-none ${
                            filterMode === 'MATCH_85' 
                                ? 'bg-canvas-blueprint text-white border border-canvas-blueprint' 
                                : 'bg-surface-container-lowest text-ink-primary border border-cad hover:bg-surface-container'
                        }`}
                        type="button"
                    >
                        [MATCH &gt; 85%]
                    </button>
                    <button
                        onClick={() => setFilterMode('APPLIED')}
                        className={`px-2.5 py-1 uppercase font-bold cursor-pointer transition-none ${
                            filterMode === 'APPLIED' 
                                ? 'bg-canvas-blueprint text-white border border-canvas-blueprint' 
                                : 'bg-surface-container-lowest text-ink-primary border border-cad hover:bg-surface-container'
                        }`}
                        type="button"
                    >
                        [DISPATCHED ({myApplications.length})]
                    </button>
                </div>
            </div>

            {/* Dense CAD Data Table */}
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse font-body-sm text-body-sm">
                    <thead>
                        <tr className="bg-surface-container font-label-sm text-label-sm text-on-surface-variant uppercase border-b border-cad">
                            <th className="p-space-sm border-r border-cad font-bold">VECTOR_MATCH</th>
                            <th className="p-space-sm border-r border-cad font-bold">TARGET_DESIGNATION</th>
                            <th className="p-space-sm border-r border-cad font-bold">ENTERPRISE_ENTITY</th>
                            <th className="p-space-sm border-r border-cad font-bold">DEPLOYMENT_LOC</th>
                            <th className="p-space-sm border-r border-cad font-bold">REQ_TECH_STACK</th>
                            <th className="p-space-sm font-bold text-right">DISPATCH_ACTION</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-cad/40 text-ink-primary">
                        {filteredJobs.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="p-space-md text-center text-outline italic">
                                    NO MATCHED REQUISITIONS IN CURRENT FILTER BUFFER.
                                </td>
                            </tr>
                        ) : (
                            filteredJobs.map(job => {
                                const applied = hasApplied(job.id);
                                const matchPercent = job.match || 92;
                                return (
                                    <tr key={job.id} className="hover:bg-surface-container-low transition-none">
                                        <td className="p-space-sm border-r border-cad font-bold text-canvas-blueprint whitespace-nowrap">
                                            {matchPercent}% [COSINE_MATCH]
                                        </td>
                                        <td className="p-space-sm border-r border-cad font-bold text-ink-primary">
                                            {job.title?.toUpperCase()}
                                        </td>
                                        <td className="p-space-sm border-r border-cad text-on-surface-variant">
                                            {job.company_name || 'Enterprise Client'}
                                        </td>
                                        <td className="p-space-sm border-r border-cad whitespace-nowrap">
                                            <span className="border border-cad px-1 py-0.5 font-label-sm text-label-sm">
                                                {job.category || 'REMOTE_GLOBAL'}
                                            </span>
                                        </td>
                                        <td className="p-space-sm border-r border-cad font-label-sm text-label-sm text-on-surface-variant">
                                            REQUIRED: {job.skills_required || 'Python, Django, React'}
                                        </td>
                                        <td className="p-space-sm text-right whitespace-nowrap">
                                            {applied ? (
                                                <span className="inline-block border border-canvas-blueprint text-canvas-blueprint px-space-sm py-1 font-label-sm text-label-sm uppercase font-bold">
                                                    [ DISPATCHED ✓ ]
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() => onApply(job.id)}
                                                    disabled={applyingTo === job.id}
                                                    className="bg-surface-container-lowest text-canvas-blueprint border border-canvas-blueprint hover:bg-canvas-blueprint hover:text-white px-space-sm py-1 font-label-sm text-label-sm uppercase font-bold transition-none cursor-pointer disabled:opacity-50"
                                                    type="button"
                                                >
                                                    {applyingTo === job.id ? '[ DISPATCHING... ]' : '[ EXECUTE_APPLICATION_DISPATCH ]'}
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

            <div className="px-space-md py-2 border-t border-cad bg-surface-container-low flex justify-between items-center font-label-sm text-label-sm text-outline">
                <span>SHOWING {filteredJobs.length} OF {jobs.length} REQUISITIONS</span>
                <span>INDEX_CYCLE: REALTIME_DISPATCH</span>
            </div>
        </section>
    );
};

export default MatchedPositionsGrid;
