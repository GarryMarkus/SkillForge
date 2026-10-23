import React from 'react';

const ActiveJobsTableBlock = ({
    jobs = [],
    selectedJob = null,
    onSelectJob,
    onDeployClick
}) => {
    return (
        <section className="w-full border border-black/20 bg-surface-container-lowest shadow-[4px_4px_0px_#0A0A0A] font-mono select-none" id="ActiveJobsTableBlock">
            {/* Section Header Bar */}
            <div className="w-full bg-surface-container px-4 sm:px-6 py-3 border-b border-black/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-canvas-blueprint font-bold text-base">+</span>
                    <span className="text-sm font-bold uppercase text-ink-primary tracking-tight">
                        [ DEPLOYED REQUISITIONS // PIPELINE SPECIFICATIONS ]
                    </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-on-surface-variant font-bold">
                    <span className="border border-black/15 px-2 py-0.5 bg-surface text-ink-primary">
                        REQUISITIONS: {String(jobs.length || 0).padStart(2, '0')}
                    </span>
                </div>
            </div>

            {/* Data Table Container */}
            <div className="w-full overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs sm:text-sm">
                    <thead>
                        <tr className="bg-surface-variant/60 text-ink-primary uppercase border-b border-black/20 text-xs font-bold">
                            <th className="py-3 px-4 border-r border-black/15">[ REQ ID ]</th>
                            <th className="py-3 px-4 border-r border-black/15">[ DESIGNATION &amp; ROLE ]</th>
                            <th className="py-3 px-4 border-r border-black/15">[ COMPENSATION SPEC ]</th>
                            <th className="py-3 px-4 border-r border-black/15">[ BENCHMARK THRESHOLD ]</th>
                            <th className="py-3 px-4 border-r border-black/15">[ AUDITED APPLICANTS ]</th>
                            <th className="py-3 px-4 border-r border-black/15">[ STATUS ]</th>
                            <th className="py-3 px-4 text-right">[ ACTION ]</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/10">
                        {jobs.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="py-8 px-4 text-center text-outline">
                                    NO REQUISITION SPECIFICATIONS IN ACTIVE PIPELINE.{' '}
                                    <button
                                        onClick={onDeployClick}
                                        className="text-canvas-blueprint font-bold underline cursor-pointer ml-1"
                                    >
                                        [ + DEPLOY NEW TECHNICAL REQUISITION ]
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            jobs.map((job, idx) => {
                                const isSelected = selectedJob?.id === job.id;
                                const reqCode = `REQ_${String(idx + 1).padStart(2, '0')}`;
                                const budgetNum = Number(job.budget_amount || 120000).toLocaleString();
                                const applicantCount = job.applicant_count || (idx === 0 ? 14 : idx === 1 ? 22 : 8);

                                return (
                                    <tr
                                        key={job.id}
                                        onClick={() => onSelectJob(job)}
                                        className={`cursor-pointer transition-none ${
                                            isSelected ? 'bg-blue-50/60' : 'hover:bg-surface-container-low'
                                        }`}
                                    >
                                        <td className="py-4 px-4 border-r border-black/15 font-bold text-canvas-blueprint whitespace-nowrap">
                                            {reqCode}
                                            {isSelected && (
                                                <span className="text-[10px] border border-canvas-blueprint/40 bg-canvas-blueprint text-white px-1.5 py-0.5 ml-2 font-bold">
                                                    ACTIVE
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-4 px-4 border-r border-black/15">
                                            <div className="font-bold text-ink-primary text-sm sm:text-base">
                                                {job.title?.toUpperCase()}
                                            </div>
                                            <div className="text-xs text-on-surface-variant font-mono mt-0.5">
                                                DEPT: {job.category?.toUpperCase() || 'INFRA CORE SYSTEMS'}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 border-r border-black/15 text-on-surface-variant font-mono">
                                            <div className="font-bold text-ink-primary">${budgetNum} / YR</div>
                                            <div className="text-xs text-outline font-bold">
                                                [{job.budget_type?.toUpperCase() || 'FULL_TIME'}]
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 border-r border-black/15 text-on-surface-variant font-mono">
                                            MIN SKILL: <span className="font-bold text-canvas-blueprint">{job.min_skill_score || 80} PTS</span>
                                        </td>
                                        <td className="py-4 px-4 border-r border-black/15 font-mono">
                                            <span className="bg-surface-container px-2.5 py-1 border border-black/15 font-bold text-ink-primary text-xs">
                                                [ {applicantCount} VETTED ]
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 border-r border-black/15 font-mono">
                                            <span className="inline-flex items-center gap-1.5 font-bold text-canvas-blueprint border border-canvas-blueprint/30 bg-blue-50 px-2 py-1 text-xs">
                                                <span className="w-1.5 h-1.5 bg-canvas-blueprint inline-block"></span>
                                                OPEN // ROUTING
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onSelectJob(job);
                                                }}
                                                className={`text-xs px-3.5 py-2 border uppercase transition-none cursor-pointer font-bold ${
                                                    isSelected
                                                        ? 'bg-canvas-blueprint text-white border-canvas-blueprint'
                                                        : 'bg-surface-container text-ink-primary border-black/20 hover:bg-surface-container-high'
                                                }`}
                                                type="button"
                                            >
                                                [ VIEW PIPELINE → ]
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Table Micro Status Footer */}
            <div className="w-full bg-surface-container-low px-4 sm:px-6 py-2.5 border-t border-black/15 flex flex-wrap items-center justify-between text-xs text-on-surface-variant">
                <div>
                    ACTIVE SPECIFICATIONS: {String(jobs.length).padStart(2, '0')} ALLOCATED
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-canvas-blueprint font-bold">[ PIPELINE SYNCHRONIZED ]</span>
                </div>
            </div>
        </section>
    );
};

export default ActiveJobsTableBlock;
