import React from 'react';
import {
    Briefcase,
    SlidersHorizontal,
    MapPin,
    DollarSign,
    CheckCircle2,
    Award,
    ArrowUpRight,
} from 'lucide-react';

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
        <section className="rounded-md bg-[#0D0F14] border border-white/[0.08] border-t-white/15 flex flex-col font-mono select-none overflow-hidden" id="MatchedPositionsGrid">
            {/* Header & Filter Controls */}
            <div className="p-5 sm:p-6 border-b border-white/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-sm bg-[#111318] border border-white/[0.08] flex items-center justify-center text-white shrink-0">
                        <Briefcase className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <div>
                        <h3 className="font-display font-bold text-base text-white tracking-tight">
                            Matched Roles
                        </h3>
                        <p className="text-xs text-[#888888] mt-0.5">
                            Open positions ranked by skill compatibility
                        </p>
                    </div>
                </div>

                {/* Filter Pills */}
                <div className="inline-flex items-center p-1 rounded-sm bg-[#060709] border border-white/[0.08] gap-1 text-xs">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#71717A] mx-2 hidden sm:inline" strokeWidth={1.75} aria-hidden="true" />
                    <button
                        onClick={() => setFilterMode('ALL')}
                        className={`px-3 py-1 rounded-sm font-mono cursor-pointer transition-colors ${
                            filterMode === 'ALL'
                                ? 'bg-[#181B22] text-white border border-white/15 font-medium'
                                : 'text-[#888888] hover:text-white border border-transparent'
                        }`}
                        type="button"
                    >
                        All ({jobs.length})
                    </button>
                    <button
                        onClick={() => setFilterMode('MATCH_85')}
                        className={`px-3 py-1 rounded-sm font-mono cursor-pointer transition-colors ${
                            filterMode === 'MATCH_85'
                                ? 'bg-[#181B22] text-white border border-white/15 font-medium'
                                : 'text-[#888888] hover:text-white border border-transparent'
                        }`}
                        type="button"
                    >
                        &ge;85% Match
                    </button>
                    <button
                        onClick={() => setFilterMode('APPLIED')}
                        className={`px-3 py-1 rounded-sm font-mono cursor-pointer transition-colors ${
                            filterMode === 'APPLIED'
                                ? 'bg-[#181B22] text-white border border-white/15 font-medium'
                                : 'text-[#888888] hover:text-white border border-transparent'
                        }`}
                        type="button"
                    >
                        Applied ({myApplications.length})
                    </button>
                </div>
            </div>

            {/* Role Cards Grid */}
            <div className="p-5 sm:p-6">
                {filteredJobs.length === 0 ? (
                    <div className="py-12 px-4 text-center space-y-2">
                        <Briefcase className="w-6 h-6 text-[#555555] mx-auto" strokeWidth={1.5} aria-hidden="true" />
                        <div className="text-xs text-zinc-300 font-medium">No matching positions found</div>
                        <p className="text-[11px] text-[#71717A]">
                            Try clearing filters or completing an assessment to unlock more roles.
                        </p>
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
                                    className="p-5 rounded-md bg-[#111318] border border-white/[0.08] border-t-white/15 hover:border-white/20 transition-colors flex flex-col justify-between gap-4 font-mono"
                                >
                                    <div className="space-y-3">
                                        {/* Top Row: Match Visual & Compensation */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-mono font-semibold bg-white/[0.05] text-white border border-white/[0.08]">
                                                    {matchScore}% Match
                                                </span>
                                                <span className="inline-flex items-center gap-1 text-[11px] text-[#888888] font-mono">
                                                    <DollarSign className="w-3 h-3 text-[#71717A]" strokeWidth={1.75} aria-hidden="true" />
                                                    <span>{Number(job.budget_amount || 135000).toLocaleString()} / yr</span>
                                                </span>
                                            </div>
                                            <div className="w-full h-1 bg-[#060709] border border-white/[0.06] overflow-hidden">
                                                <div
                                                    className="h-full bg-[#F5F5F5]"
                                                    style={{ width: `${Math.min(100, matchScore)}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Role & Company Details */}
                                        <div>
                                            <h4 className="font-display font-bold text-white text-sm tracking-tight truncate">
                                                {job.title}
                                            </h4>
                                            <p className="text-xs text-[#888888] mt-0.5 truncate">
                                                {job.company_name || 'Technology Partner'}
                                            </p>
                                        </div>

                                        {/* Stack Tags */}
                                        <div className="flex flex-wrap gap-1.5">
                                            {stackTags.slice(0, 3).map((tag, tIdx) => (
                                                <span
                                                    key={tIdx}
                                                    className="px-2 py-0.5 rounded-sm text-[11px] bg-white/[0.04] text-zinc-300 border border-white/[0.08]"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Bottom Row: Location + Action */}
                                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2 text-xs">
                                        <span className="inline-flex items-center gap-1 text-[11px] text-[#71717A] truncate">
                                            <MapPin className="w-3 h-3 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                                            <span className="truncate">{job.location || 'Remote'}</span>
                                        </span>

                                        {applied ? (
                                            appStatus === 'accepted' ? (
                                                <span className="inline-flex items-center gap-1 text-xs font-mono text-white px-2.5 py-1 rounded-sm bg-white/[0.06] border border-white/20 shrink-0">
                                                    <Award className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.75} aria-hidden="true" />
                                                    <span>Offer Sent</span>
                                                </span>
                                            ) : appStatus === 'rejected' ? (
                                                <span className="text-xs font-mono text-[#71717A] px-2.5 py-1 rounded-sm bg-[#060709] border border-white/[0.06] shrink-0">
                                                    Closed
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-xs font-mono text-zinc-300 px-2.5 py-1 rounded-sm bg-white/[0.04] border border-white/[0.08] shrink-0">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.75} aria-hidden="true" />
                                                    <span>Applied</span>
                                                </span>
                                            )
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => onApply(job.id)}
                                                disabled={isApplying}
                                                className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold font-mono rounded-sm text-xs transition-colors cursor-pointer disabled:opacity-50 shrink-0"
                                            >
                                                <span>{isApplying ? 'Sending...' : 'Apply'}</span>
                                                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
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
