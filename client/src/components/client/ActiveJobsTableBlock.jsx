import React from 'react';
import { CounterTicker } from '../ui/animations';

const ActiveJobsTableBlock = ({
    jobs = [],
    selectedJob = null,
    onSelectJob,
    onDeployClick
}) => {
    return (
        <section className="w-full bg-[#121318] rounded-2xl border border-white/[0.08] font-sans overflow-hidden" id="ActiveJobsTableBlock">
            {/* Header Bar */}
            <div className="w-full px-6 py-4 border-b border-white/[0.08] flex items-center justify-between">
                <div>
                    <h3 className="font-semibold text-white text-base sm:text-lg">Active Role Openings</h3>
                    <p className="text-xs text-zinc-400 mt-0.5">Select a role to review evaluated candidate rankings</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-medium">
                        <CounterTicker value={jobs.length || 0} duration={0.8} /> Active Openings
                    </span>
                </div>
            </div>

            {/* Data Table */}
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                    <thead>
                        <tr className="bg-white/[0.02] text-zinc-400 uppercase border-b border-white/[0.08] text-xs font-medium tracking-wider">
                            <th className="py-3 px-5">Role Designation</th>
                            <th className="py-3 px-5">Department</th>
                            <th className="py-3 px-5">Compensation</th>
                            <th className="py-3 px-5">Min Score</th>
                            <th className="py-3 px-5">Verified Talent</th>
                            <th className="py-3 px-5">Status</th>
                            <th className="py-3 px-5 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04] text-zinc-200">
                        {jobs.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="py-10 px-5 text-center text-zinc-500">
                                    No active role openings found.{' '}
                                    <button
                                        onClick={onDeployClick}
                                        className="text-blue-400 font-medium underline cursor-pointer ml-1"
                                    >
                                        Post your first opening
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
                                            isSelected ? 'bg-blue-500/10' : 'hover:bg-white/[0.02]'
                                        }`}
                                    >
                                        <td className="py-4 px-5">
                                            <div className="font-medium text-white flex items-center gap-2">
                                                <span>{job.title}</span>
                                                {isSelected && (
                                                    <span className="text-[11px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full font-medium">
                                                        Selected
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-5 text-zinc-400 text-xs font-normal">
                                            {job.category || 'Engineering Core'}
                                        </td>
                                        <td className="py-4 px-5 font-medium text-white">
                                            ${budgetNum} <span className="text-xs text-zinc-500 font-normal">/ yr</span>
                                        </td>
                                        <td className="py-4 px-5">
                                            <span className="font-semibold text-blue-400">
                                                {job.min_skill_score || 80} / 100
                                            </span>
                                        </td>
                                        <td className="py-4 px-5">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium text-xs">
                                                <CounterTicker value={applicantCount} duration={0.8} /> Candidates
                                            </span>
                                        </td>
                                        <td className="py-4 px-5">
                                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                                Active
                                            </span>
                                        </td>
                                        <td className="py-4 px-5 text-right whitespace-nowrap">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onSelectJob(job);
                                                }}
                                                className="px-3.5 py-1.5 rounded-xl border border-white/[0.08] hover:border-white/[0.2] text-xs font-medium text-zinc-300 hover:text-white transition-colors"
                                            >
                                                View Pipeline
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
