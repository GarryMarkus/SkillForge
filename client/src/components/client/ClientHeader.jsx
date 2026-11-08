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
        <header className="fixed top-0 left-0 w-full z-50 bg-[#050505] border-b border-white/[0.06] font-mono select-none" id="ClientHeader">
            {/* Top Enterprise Navigation */}
            <div className="h-14 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-sm bg-[#111113] border border-white/20 flex items-center justify-center text-[#f5f5f5] font-bold text-xs font-mono">
                        SF
                    </div>
                    <span className="text-sm font-display font-bold text-white tracking-tight">
                        SkillForge Employer Hub
                    </span>
                    <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-sm bg-[#0b0b0c] text-[#888888] border border-white/10 text-[11px] font-mono">
                        [enclave : active]
                    </span>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono">
                    <div className="hidden lg:flex items-center gap-2 text-xs text-[#888888] bg-[#0b0b0c] px-2.5 py-1 rounded-sm border border-white/10">
                        <span className="font-semibold text-white">{companyName}</span>
                        <span className="text-[#555555]">&bull;</span>
                        <span className="text-[#737373]">Hiring Manager</span>
                    </div>

                    <button
                        onClick={onLogout}
                        className="px-3 py-1.5 rounded-md border border-white/10 hover:border-rose-500/30 text-[#888888] hover:text-rose-300 text-xs font-mono transition-colors cursor-pointer"
                    >
                        [logout]
                    </button>
                    <div className="w-7 h-7 rounded-sm bg-[#111113] border border-white/20 flex items-center justify-center text-[#f5f5f5] font-mono text-xs font-bold">
                        HR
                    </div>
                </div>
            </div>

            {/* Sub-Header Navigation Tabs Rail */}
            <div className="h-11 w-full bg-[#0b0b0c] border-t border-white/[0.06]">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between overflow-x-auto text-xs">
                    <nav className="flex items-center h-full gap-2 py-1">
                        <button
                            onClick={() => setActiveTab('REQUISITIONS')}
                            className={`h-full flex items-center px-3 rounded-sm text-xs font-mono transition-all cursor-pointer ${
                                activeTab === 'REQUISITIONS'
                                    ? 'bg-[#111113] text-white border border-white/20 shadow-xs'
                                    : 'text-[#737373] hover:text-white'
                            }`}
                        >
                            [01: Requisitions ({jobsCount})]
                        </button>
                        <button
                            onClick={() => setActiveTab('CANDIDATES')}
                            className={`h-full flex items-center px-3 rounded-sm text-xs font-mono transition-all cursor-pointer ${
                                activeTab === 'CANDIDATES'
                                    ? 'bg-[#111113] text-white border border-white/20 shadow-xs'
                                    : 'text-[#737373] hover:text-white'
                            }`}
                        >
                            [02: Candidate Pipeline ({totalApplicantsCount})]
                        </button>
                    </nav>

                    {/* Quick Metric Pills */}
                    <div className="hidden md:flex items-center gap-5 text-xs text-[#737373] font-mono">
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
