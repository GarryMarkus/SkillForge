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
        <header className="fixed top-0 left-0 w-full z-50 bg-[#09090B]/90 backdrop-blur-md border-b border-white/[0.08] font-sans" id="ClientHeader">
            {/* Top Enterprise Navigation */}
            <div className="h-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        SF
                    </div>
                    <span className="text-base sm:text-lg font-semibold text-white tracking-tight">
                        SkillForge Employer Hub
                    </span>
                    <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Enclave Active
                    </span>
                </div>

                <div className="flex items-center gap-4 text-sm font-medium">
                    <div className="hidden lg:flex items-center gap-2 text-xs text-zinc-400 bg-white/[0.04] px-3 py-1 rounded-full border border-white/[0.08]">
                        <span className="font-semibold text-white">{companyName}</span>
                        <span className="text-zinc-600">·</span>
                        <span className="text-zinc-400">Hiring Manager</span>
                    </div>

                    <button
                        onClick={onLogout}
                        className="px-3.5 py-1.5 rounded-xl border border-white/[0.08] hover:border-rose-500/20 text-zinc-400 hover:text-rose-400 text-xs font-medium transition-colors cursor-pointer"
                    >
                        Log Out
                    </button>
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                        HR
                    </div>
                </div>
            </div>

            {/* Sub-Header Navigation Tabs Rail */}
            <div className="h-12 w-full bg-[#0C0E14] border-t border-white/[0.06]">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between overflow-x-auto">
                    <nav className="flex items-center h-full gap-2 py-1">
                        <button
                            onClick={() => setActiveTab('REQUISITIONS')}
                            className={`h-full flex items-center px-4 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                                activeTab === 'REQUISITIONS'
                                    ? 'bg-white/[0.08] text-white border border-white/[0.1] shadow-xs'
                                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                            }`}
                        >
                            Job Openings ({jobsCount})
                        </button>
                        <button
                            onClick={() => setActiveTab('CANDIDATES')}
                            className={`h-full flex items-center px-4 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                                activeTab === 'CANDIDATES'
                                    ? 'bg-white/[0.08] text-white border border-white/[0.1] shadow-xs'
                                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                            }`}
                        >
                            Candidate Pipeline ({totalApplicantsCount})
                        </button>
                    </nav>

                    {/* Quick Metric Pills */}
                    <div className="hidden md:flex items-center gap-6 text-xs text-zinc-400 font-medium">
                        <div>
                            <span>Avg Match Fit:</span>{' '}
                            <strong className="text-blue-400 font-semibold">{verifiedTalentIndex}</strong>
                        </div>
                        <div>
                            <span>Time to Shortlist:</span>{' '}
                            <strong className="text-emerald-400 font-semibold">{timeToShortlist}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default ClientHeader;
