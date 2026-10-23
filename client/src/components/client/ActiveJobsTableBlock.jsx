import React from 'react';

const ActiveJobsTableBlock = ({
    jobs = [],
    selectedJob = null,
    onSelectJob,
    onDeployClick
}) => {
    return (
        <section className="w-full border border-black/20 bg-surface-container-lowest" id="ActiveJobsTableBlock">
            {/* Section CAD Title Bar */}
            <div className="w-full bg-surface-container px-space-md py-space-xs border-b border-black/20 flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                    <span className="text-primary-container font-bold">+</span>
                    <span className="font-headline-sm text-headline-sm uppercase text-on-surface tracking-tight font-bold">
                        [ DEPLOYED_REQUISITIONS // PIPELINE_SPECIFICATIONS ]
                    </span>
                </div>
                <div className="flex items-center gap-space-sm text-label-sm font-label-sm text-on-surface-variant">
                    <span className="border border-black/15 px-space-xs bg-surface font-bold">
                        [CAD_SYS: REQ_{String(jobs.length || 0).padStart(2, '0')}]
                    </span>
                    <span className="hidden md:inline">SPEC_LAYER: ORTHO_PLAN_01</span>
                </div>
            </div>

            {/* Data Table Container (CAD Hairline Grid) */}
            <div className="w-full overflow-x-auto">
                <table className="w-full border-collapse text-left font-body-sm text-body-sm">
                    <thead>
                        <tr className="bg-surface-variant/70 text-on-surface uppercase border-b border-black/20 font-label-md text-label-md">
                            <th className="p-space-sm border-r border-black/15 font-bold">[ REQ_ID ]</th>
                            <th className="p-space-sm border-r border-black/15 font-bold">[ DESIGNATION_&amp;_TIER ]</th>
                            <th className="p-space-sm border-r border-black/15 font-bold">[ COMPENSATION_SPEC ]</th>
                            <th className="p-space-sm border-r border-black/15 font-bold">[ BENCHMARK_THRESHOLD ]</th>
                            <th className="p-space-sm border-r border-black/15 font-bold">[ AUDITED_APPLICANTS ]</th>
                            <th className="p-space-sm border-r border-black/15 font-bold">[ STATUS ]</th>
                            <th className="p-space-sm text-right font-bold">[ ACTION ]</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/10">
                        {jobs.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="p-space-md text-center text-outline italic">
                                    NO REQUISITION SPECIFICATIONS IN PIPELINE.{' '}
                                    <button
                                        onClick={onDeployClick}
                                        className="text-primary-container font-bold underline cursor-pointer ml-1"
                                    >
                                        CLICK TO DEPLOY NEW TECHNICAL REQUISITION
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
                                            isSelected ? 'bg-primary-fixed/20' : 'hover:bg-surface-container-low'
                                        }`}
                                    >
                                        <td className="p-space-sm border-r border-black/15 font-bold text-primary-container whitespace-nowrap">
                                            {reqCode}{' '}
                                            {isSelected && (
                                                <span className="text-[9px] border border-primary-container/40 bg-primary-container text-on-primary px-1 py-0.2 ml-1">
                                                    SEL
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-space-sm border-r border-black/15 font-bold text-on-surface">
                                            <div>{job.title?.toUpperCase()}</div>
                                            <div className="text-label-sm font-label-sm text-secondary font-normal">
                                                DEPT: {job.category?.toUpperCase() || 'INFRA_CORE_SYSTEMS'} // L{4 + (idx % 3)}_BENCH
                                            </div>
                                        </td>
                                        <td className="p-space-sm border-r border-black/15 text-on-surface-variant">
                                            BUDGET: ${budgetNum} / YR{' '}
                                            <span className="text-label-sm font-label-sm text-on-surface font-bold">
                                                [{job.budget_type?.toUpperCase() || 'FULL_TIME'}]
                                            </span>
                                        </td>
                                        <td className="p-space-sm border-r border-black/15 text-on-surface">
                                            MIN_SKILL_THRESHOLD:{' '}
                                            <span className="font-bold text-primary-container">
                                                {job.min_skill_score || 80}_PTS
                                            </span>
                                        </td>
                                        <td className="p-space-sm border-r border-black/15">
                                            <span className="bg-surface-container px-space-xs py-0.5 border border-black/15 font-bold text-on-surface">
                                                APPLICANTS: [ {applicantCount}_VETTED ]
                                            </span>
                                        </td>
                                        <td className="p-space-sm border-r border-black/15">
                                            <span className="inline-flex items-center gap-1 font-bold text-primary-container border border-primary-container/40 bg-primary-fixed/40 px-space-xs py-0.5 text-label-sm font-label-sm">
                                                ● STATUS: [OPEN // ACTIVE_ROUTING]
                                            </span>
                                        </td>
                                        <td className="p-space-sm text-right">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onSelectJob(job);
                                                }}
                                                className={`font-label-sm text-label-sm px-space-sm py-1 border uppercase transition-none cursor-pointer font-bold ${
                                                    isSelected
                                                        ? 'bg-primary-container text-on-primary border-primary-container'
                                                        : 'bg-surface-container text-on-surface border-black/20 hover:bg-surface-container-high'
                                                }`}
                                                type="button"
                                            >
                                                [ VIEW_RANKED_PIPELINE -&gt; ]
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
            <div className="w-full bg-surface-container-low px-space-md py-space-xs border-t border-black/15 flex flex-wrap items-center justify-between text-label-sm font-label-sm text-secondary">
                <div>
                    TOTAL_ACTIVE_SPECIFICATIONS: {String(jobs.length).padStart(2, '0')} OF 10 ALLOCATED // MAX_QUOTA: 10
                </div>
                <div className="flex items-center gap-2">
                    <span>PAGINATION: [01/01]</span>
                    <span className="text-black/30">|</span>
                    <span className="text-primary-container font-bold">AUTONOMIC_SORT: FIFO_ENABLED</span>
                </div>
            </div>
        </section>
    );
};

export default ActiveJobsTableBlock;
