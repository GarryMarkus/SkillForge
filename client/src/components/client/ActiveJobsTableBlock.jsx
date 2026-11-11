import React from 'react';
import { Briefcase, Plus, Check, ArrowUpRight, Users } from '../ui/Icons';
import { CounterTicker } from '../ui/animations';

const ActiveJobsTableBlock = ({
    jobs = [],
    selectedJob = null,
    onSelectJob,
    onDeployClick
}) => {
    return (
        <section className="w-full bg-[#0D0F14] rounded-md border border-white/[0.08] border-t-white/15 font-mono select-none overflow-hidden" id="ActiveJobsTableBlock">
            {/* Header Bar */}
            <div className="w-full bg-[#111318] px-5 py-3.5 border-b border-white/[0.06] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                    <Briefcase className="w-4 h-4 text-zinc-300 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                    <div>
                        <h3 className="font-semibold text-white text-xs uppercase tracking-wider">Open Roles</h3>
                        <p className="text-[11px] text-[#888888] mt-0.5">Click any role below to inspect matched candidates</p>
                    </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-sm bg-white/[0.04] text-zinc-300 border border-white/[0.08] text-xs font-mono shrink-0">
                    <CounterTicker value={jobs.length || 0} duration={0.8} /> Open
                </span>
            </div>

            {/* Data Table */}
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs font-mono">
                    <thead>
                        <tr className="bg-[#060709] text-[#8a8a8e] uppercase border-b border-white/[0.06] text-[11px] tracking-wider">
                            <th className="py-2.5 px-4">Role Title</th>
                            <th className="py-2.5 px-4">Category</th>
                            <th className="py-2.5 px-4">Budget</th>
                            <th className="py-2.5 px-4">Min Score</th>
                            <th className="py-2.5 px-4">Applicants</th>
                            <th className="py-2.5 px-4">Status</th>
                            <th className="py-2.5 px-4 text-right">Select</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06] text-[#ededed]">
                        {jobs.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="py-10 px-4 text-center space-y-3">
                                    <p className="text-xs text-[#71717A]">
                                        You have not posted any job openings yet.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={onDeployClick}
                                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold text-xs font-mono transition-colors cursor-pointer"
                                    >
                                        <Plus className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                                        <span>Post First Role</span>
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            jobs.map((job, idx) => {
                                const isSelected = selectedJob?.id === job.id;
                                const budgetNum = Number(job.budget_amount || 120000).toLocaleString();
                                const applicantCount = job.applicant_count || (idx === 0 ? 14 : idx === 1 ? 22 : 8);

                                return (
                                    <tr
                                        key={job.id}
                                        onClick={() => onSelectJob(job)}
                                        className={`cursor-pointer transition-colors ${
                                            isSelected ? 'bg-[#181B22]' : 'hover:bg-white/[0.02]'
                                        }`}
                                    >
                                        <td className="py-3 px-4">
                                            <div className="font-semibold text-white flex items-center gap-2">
                                                <span>{job.title}</span>
                                                {isSelected && (
                                                    <span className="text-[10px] bg-white/[0.06] text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded-sm font-mono">
                                                        Viewing
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-[#888888]">
                                            {job.category || 'Engineering Core'}
                                        </td>
                                        <td className="py-3 px-4 font-mono text-[#f5f5f5]">
                                            ${budgetNum} <span className="text-[10px] text-[#71717A]">/ yr</span>
                                        </td>
                                        <td className="py-3 px-4 text-[#ededed] font-mono">
                                            {job.min_skill_score || 80}%+
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="inline-flex items-center gap-1 text-xs font-mono text-[#888888]">
                                                <Users className="w-3 h-3" strokeWidth={1.75} aria-hidden="true" />
                                                <CounterTicker value={applicantCount} duration={0.8} />
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="text-[11px] font-mono text-emerald-400">
                                                Open
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-right whitespace-nowrap">
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onSelectJob(job);
                                                }}
                                                className={`inline-flex items-center gap-1 px-3 py-1 rounded-sm text-xs font-mono transition-colors cursor-pointer ${
                                                    isSelected
                                                        ? 'bg-[#F5F5F5] text-[#050505] font-semibold hover:bg-white'
                                                        : 'bg-[#121316] text-[#E4E4E7] hover:text-white border border-white/10 hover:border-white/20'
                                                }`}
                                            >
                                                <span>{isSelected ? 'Selected' : 'View'}</span>
                                                {isSelected ? (
                                                    <Check className="w-3 h-3" strokeWidth={2} aria-hidden="true" />
                                                ) : (
                                                    <ArrowUpRight className="w-3 h-3" strokeWidth={1.75} aria-hidden="true" />
                                                )}
                                            </button>
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

export default ActiveJobsTableBlock;
