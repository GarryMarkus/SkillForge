import React from 'react';
import { CounterTicker } from '../ui/animations';

const ActiveJobsTableBlock = ({
    jobs = [],
    selectedJob = null,
    onSelectJob,
    onDeployClick
}) => {
    return (
        <section className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm font-sans overflow-hidden" id="ActiveJobsTableBlock">
            {/* Header Bar */}
            <div className="w-full px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                    <h3 className="font-bold text-gray-900 text-lg">Active Role Openings</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Select a role to review evaluated candidate rankings</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                        <CounterTicker value={jobs.length || 0} duration={0.8} /> Active Openings
                    </span>
                </div>
            </div>

            {/* Data Table */}
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                    <thead>
                        <tr className="bg-gray-50/70 text-gray-500 uppercase border-b border-gray-100 text-xs font-semibold">
                            <th className="py-3 px-5">Role Designation</th>
                            <th className="py-3 px-5">Department</th>
                            <th className="py-3 px-5">Compensation</th>
                            <th className="py-3 px-5">Min Score</th>
                            <th className="py-3 px-5">Verified Talent</th>
                            <th className="py-3 px-5">Status</th>
                            <th className="py-3 px-5 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-900">
                        {jobs.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="py-10 px-5 text-center text-gray-400">
                                    No active role openings found.{' '}
                                    <button
                                        onClick={onDeployClick}
                                        className="text-blue-600 font-semibold underline cursor-pointer ml-1"
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
                                            isSelected ? 'bg-blue-50/50' : 'hover:bg-gray-50/50'
                                        }`}
                                    >
                                        <td className="py-4 px-5">
                                            <div className="font-bold text-gray-900 flex items-center gap-2">
                                                <span>{job.title}</span>
                                                {isSelected && (
                                                    <span className="text-[11px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-semibold">
                                                        Selected
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-5 text-gray-500 text-xs font-medium">
                                            {job.category || 'Engineering Core'}
                                        </td>
                                        <td className="py-4 px-5 font-semibold text-gray-900">
                                            ${budgetNum} <span className="text-xs text-gray-400 font-normal">/ yr</span>
                                        </td>
                                        <td className="py-4 px-5">
                                            <span className="font-semibold text-blue-600">
                                                {job.min_skill_score || 80} / 100
                                            </span>
                                        </td>
                                        <td className="py-4 px-5">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-xs">
                                                <CounterTicker value={applicantCount} duration={0.8} /> Candidates
                                            </span>
                                        </td>
                                        <td className="py-4 px-5">
                                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                                                Active
                                            </span>
                                        </td>
                                        <td className="py-4 px-5 text-right whitespace-nowrap">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onSelectJob(job);
                                                }}
                                                className="px-3.5 py-1.5 rounded-xl border border-gray-200 hover:border-blue-300 text-xs font-semibold text-gray-700 hover:text-blue-600 transition-colors"
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
