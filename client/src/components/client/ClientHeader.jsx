import React from 'react';
import { LayoutGrid, Briefcase, Users, Building2, LogOut, TrendingUp, Clock } from 'lucide-react';

const ClientHeader = ({
    companyName = 'Nexus Technologies',
    activeTab = 'OVERVIEW',
    setActiveTab,
    jobsCount = 0,
    totalApplicantsCount = 0,
    verifiedTalentIndex = '96.2%',
    timeToShortlist = '1.4 Days',
    onLogout
}) => {
    const tabs = [
        { id: 'OVERVIEW', label: 'Overview', icon: LayoutGrid },
        { id: 'REQUISITIONS', label: `Open Roles (${jobsCount})`, icon: Briefcase },
        { id: 'CANDIDATES', label: `Candidates (${totalApplicantsCount})`, icon: Users },
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[#060709]/90 backdrop-blur-md border-b border-white/[0.06] font-mono select-none" id="ClientHeader">
            {/* Top Enterprise Navigation */}
            <div className="h-14 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="w-7 h-7 rounded-sm bg-[#111318] border border-white/15 flex items-center justify-center text-[#f5f5f5] font-bold text-xs font-mono shrink-0">
                        SF
                    </div>
                    <span className="text-sm font-display font-bold text-white tracking-tight truncate">
                        SkillForge
                    </span>
                    <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-white/[0.04] text-zinc-300 border border-white/[0.08] text-[11px] font-mono shrink-0">
                        <Building2 className="w-3 h-3 text-emerald-400" strokeWidth={1.75} aria-hidden="true" />
                        <span>Employer Hub</span>
                    </span>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono shrink-0">
                    <div className="hidden lg:flex items-center gap-2 text-xs text-[#888888] bg-[#111318] px-2.5 py-1 rounded-sm border border-white/[0.08]">
                        <span className="font-semibold text-white truncate max-w-[160px]">{companyName}</span>
                        <span className="text-[#71717A]">&bull;</span>
                        <span className="text-[#8a8a8e]">Hiring Team</span>
                    </div>

                    <button
                        type="button"
                        onClick={onLogout}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#121316] border border-white/10 hover:border-rose-500/40 text-[#E4E4E7] hover:text-rose-300 text-xs font-mono transition-colors cursor-pointer"
                    >
                        <LogOut className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                        <span className="hidden sm:inline">Sign Out</span>
                    </button>
                </div>
            </div>

            {/* Sub-Header Navigation Tabs Rail */}
            <div className="h-11 w-full bg-[#0D0F14] border-t border-white/[0.06]">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between overflow-x-auto text-xs gap-4">
                    <nav className="flex items-center h-full gap-1.5 py-1.5 shrink-0">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`h-full inline-flex items-center gap-1.5 px-3 rounded-sm text-xs font-mono transition-colors cursor-pointer whitespace-nowrap ${
                                        isActive
                                            ? 'bg-[#181B22] text-white border border-white/25'
                                            : 'text-[#888888] hover:text-white border border-transparent'
                                    }`}
                                >
                                    <Icon className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </nav>

                    {/* Quick Metric Pills */}
                    <div className="hidden md:flex items-center gap-5 text-xs text-[#71717A] font-mono shrink-0">
                        <div className="inline-flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.75} aria-hidden="true" />
                            <span>Avg Fit:</span>
                            <strong className="text-[#ededed] font-mono font-semibold">{verifiedTalentIndex}</strong>
                        </div>
                        <div className="inline-flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-zinc-400" strokeWidth={1.75} aria-hidden="true" />
                            <span>Shortlist Speed:</span>
                            <strong className="text-[#ededed] font-mono font-semibold">{timeToShortlist}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default ClientHeader;
