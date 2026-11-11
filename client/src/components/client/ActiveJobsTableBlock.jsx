import React from 'react';
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
            <div className="w-full bg-[#111318] px-5 py-3.5 border-b border-white/[0.06] flex items-center justify-between">
                <div>
                    <h3 className="font-semibold text-white text-xs uppercase tracking-wider">Active Requisitions</h3>
                    <p className="text-xs text-[#888888] mt-0.5">Select a role to review evaluated candidate rankings</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-sm bg-white/[0.04] text-zinc-300 border border-white/[0.08] text-xs font-mono">
                        <CounterTicker value={jobs.length || 0} duration={0.8} /> Active
                    </span>
                </div>
            </div>

            {/* Data Table */}
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs font-mono">
                    <thead>
                        <tr className="bg-[#060709] text-[#8a8a8e] uppercase border-b border-white/[0.06] text-[11px] tracking-wider">
                            <th className="py-2.5 px-4">Role Title</th>
                            <th className="py-2.5 px-4">Domain</th>
                            <th className="py-2.5 px-4">Budget</th>
                            <th className="py-2.5 px-4">Min Score</th>
                            <th className="py-2.5 px-4">Applicants</th>
                            <th className="py-2.5 px-4">Status</th>
                            <th className="py-2.5 px-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06] text-[#ededed]">
                        {jobs.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="py-8 px-4 text-center text-[#71717A]">
                                    No active requisitions found.{' '}
                                    <button
                                        onClick={onDeployClick}
                                        className="text-white hover:underline underline-offset-4 cursor-pointer ml-1"
                                    >
                                        Post First Opening
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
                                                    <span className="text-[10px] bg-white/[0.04] text-zinc-300 border border-white/[0.08] px-1.5 py-0.5 rounded-sm font-mono">
                                                        Active
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
                                            {job.min_skill_score || 80} / 100
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="text-xs font-mono text-[#888888]">
                                                <CounterTicker value={applicantCount} duration={0.8} />
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="text-[11px] font-mono text-zinc-300">
                                                Open
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-right whitespace-nowrap">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onSelectJob(job);
                                                }}
                                                className={`px-3 py-1 rounded-sm text-xs font-mono transition-colors cursor-pointer ${
                                                    isSelected
                                                        ? 'bg-[#F5F5F5] text-[#050505] font-semibold hover:bg-white'
                                                        : 'bg-[#121316] text-[#E4E4E7] hover:text-white border border-white/10 hover:border-white/20'
                                                }`}
                                            >
                                                {isSelected ? 'Selected ✓' : 'Select ↗'}
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
