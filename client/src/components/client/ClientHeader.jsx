import React from 'react';

const ClientHeader = ({
    companyName = 'Nexus Technologies',
    activeTab = 'REQUISITIONS',
    setActiveTab,
    jobsCount = 0,
    totalApplicantsCount = 0,
    verifiedTalentIndex = '96.2%',
    timeToShortlist = '1.4 Days',
    onLogout
}) => {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[#060709]/90 backdrop-blur-md border-b border-white/[0.06] font-mono select-none" id="ClientHeader">
            {/* Top Enterprise Navigation */}
            <div className="h-14 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-sm bg-[#111318] border border-white/15 flex items-center justify-center text-[#f5f5f5] font-bold text-xs font-mono">
                        SF
                    </div>
                    <span className="text-sm font-display font-bold text-white tracking-tight">
                        SkillForge Employer Hub
                    </span>
                    <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-sm bg-white/[0.04] text-zinc-300 border border-white/[0.08] text-[11px] font-mono">
                        Platform Active
                    </span>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono">
                    <div className="hidden lg:flex items-center gap-2 text-xs text-[#888888] bg-[#111318] px-2.5 py-1 rounded-sm border border-white/[0.08]">
                        <span className="font-semibold text-white">{companyName}</span>
                        <span className="text-[#71717A]">&bull;</span>
                        <span className="text-[#8a8a8e]">Hiring Manager</span>
                    </div>

                    <button
                        onClick={onLogout}
                        className="px-3.5 py-1.5 rounded-sm bg-[#121316] border border-white/10 hover:border-rose-500/40 text-[#E4E4E7] hover:text-rose-300 text-xs font-mono transition-colors cursor-pointer"
                    >
                        Sign Out
                    </button>
                    <div className="w-7 h-7 rounded-sm bg-[#111318] border border-white/15 flex items-center justify-center text-[#f5f5f5] font-mono text-xs font-bold">
                        HR
                    </div>
                </div>
            </div>

            {/* Sub-Header Navigation Tabs Rail */}
            <div className="h-11 w-full bg-[#0D0F14] border-t border-white/[0.06]">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between overflow-x-auto text-xs">
                    <nav className="flex items-center h-full gap-2 py-1.5">
                        <button
                            onClick={() => setActiveTab('REQUISITIONS')}
                            className={`h-full flex items-center px-3 rounded-sm text-xs font-mono transition-colors cursor-pointer ${
                                activeTab === 'REQUISITIONS'
                                    ? 'bg-[#181B22] text-white border border-white/25'
                                    : 'text-[#888888] hover:text-white'
                            }`}
                        >
                            Requisitions ({jobsCount})
                        </button>
                        <button
                            onClick={() => setActiveTab('CANDIDATES')}
                            className={`h-full flex items-center px-3 rounded-sm text-xs font-mono transition-colors cursor-pointer ${
                                activeTab === 'CANDIDATES'
                                    ? 'bg-[#181B22] text-white border border-white/25'
                                    : 'text-[#888888] hover:text-white'
                            }`}
                        >
                            Candidate Pipeline ({totalApplicantsCount})
                        </button>
                    </nav>

                    {/* Quick Metric Pills */}
                    <div className="hidden md:flex items-center gap-5 text-xs text-[#71717A] font-mono">
                        <div>
                            <span>Avg Match Fit:</span>{' '}
                            <strong className="text-[#ededed] font-mono font-semibold">{verifiedTalentIndex}</strong>
                        </div>
                        <div>
                            <span>Time to Shortlist:</span>{' '}
                            <strong className="text-[#ededed] font-mono font-semibold">{timeToShortlist}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default ClientHeader;
