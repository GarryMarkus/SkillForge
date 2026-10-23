import React from 'react';

const ClientHeader = ({
    companyName = 'NEXUS_INFRASTRUCTURE_INC',
    activeTab = 'REQUISITIONS',
    setActiveTab,
    jobsCount = 0,
    totalApplicantsCount = 0,
    verifiedTalentIndex = '96.2%',
    timeToShortlist = '1.4 DAYS',
    onLogout
}) => {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest border-b border-black/15 select-none font-mono" id="ClientHeader">
            {/* Top Enterprise Console Rail */}
            <div className="h-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between border-b border-black/10">
                <div className="flex items-center gap-3">
                    <span className="text-canvas-blueprint font-bold text-base">+</span>
                    <span className="text-sm sm:text-base font-bold text-ink-primary uppercase tracking-tight truncate">
                        SKILLFORGE // ENTERPRISE TALENT ACQUISITION
                    </span>
                    <span className="border border-black/15 bg-surface-container-low px-2 py-0.5 text-xs font-bold text-canvas-blueprint uppercase hidden md:inline-block">
                        [ SYSTEM STATUS: ACTIVE ]
                    </span>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="hidden lg:flex items-center gap-2 border-r border-black/15 pr-4 text-xs text-on-surface-variant font-bold">
                        <span className="text-ink-primary">{companyName.toUpperCase()}</span>
                        <span className="text-black/30">|</span>
                        <span className="text-outline uppercase">RECRUITER</span>
                    </div>

                    <button
                        onClick={onLogout}
                        className="border border-red-500/40 bg-surface-container-lowest px-3 py-1 text-xs text-red-600 uppercase hover:bg-red-600 hover:text-white transition-none cursor-pointer font-bold"
                    >
                        [ LOGOUT ]
                    </button>
                    <div className="w-8 h-8 bg-canvas-blueprint flex items-center justify-center shrink-0 text-white font-bold text-xs">
                        R
                    </div>
                </div>
            </div>

            {/* Sub-Header Navigation Tabs Rail */}
            <div className="h-11 w-full bg-surface-container border-b border-black/15">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between overflow-x-auto">
                    <nav className="flex items-center h-full gap-0 border-l border-r border-black/15">
                        <button
                            onClick={() => setActiveTab('REQUISITIONS')}
                            className={`h-full flex items-center px-4 sm:px-6 border-r border-black/15 uppercase text-xs transition-none cursor-pointer ${
                                activeTab === 'REQUISITIONS'
                                    ? 'bg-canvas-blueprint text-white font-bold'
                                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-bold'
                            }`}
                        >
                            REQUISITIONS ({jobsCount})
                        </button>
                        <button
                            onClick={() => setActiveTab('APPLICANT_POOL')}
                            className={`h-full flex items-center px-4 sm:px-6 border-r border-black/15 uppercase text-xs transition-none cursor-pointer ${
                                activeTab === 'APPLICANT_POOL'
                                    ? 'bg-canvas-blueprint text-white font-bold'
                                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-bold'
                            }`}
                        >
                            APPLICANT POOL ({totalApplicantsCount})
                        </button>
                        <button
                            onClick={() => setActiveTab('COSINE_MATCHER')}
                            className={`h-full flex items-center px-4 sm:px-6 border-r border-black/15 uppercase text-xs transition-none cursor-pointer ${
                                activeTab === 'COSINE_MATCHER'
                                    ? 'bg-canvas-blueprint text-white font-bold'
                                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-bold'
                            }`}
                        >
                            COSINE MATCHER
                        </button>
                        <button
                            onClick={() => setActiveTab('AUDIT_LOGS')}
                            className={`h-full flex items-center px-4 sm:px-6 uppercase text-xs transition-none cursor-pointer ${
                                activeTab === 'AUDIT_LOGS'
                                    ? 'bg-canvas-blueprint text-white font-bold'
                                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-bold'
                            }`}
                        >
                            AUDIT LOGS
                        </button>
                    </nav>

                    <div className="hidden lg:flex items-center gap-2 text-xs text-on-surface-variant">
                        <span className="inline-block w-2 h-2 bg-canvas-blueprint"></span>
                        <span className="font-bold">GRID SYNCHRONIZED</span>
                    </div>
                </div>
            </div>

            {/* 4-Cell CAD Metric Ribbon */}
            <div className="w-full bg-surface-container-lowest border-b border-black/15">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-black/15">
                    {/* Metric 01 */}
                    <div className="py-3 sm:py-3.5 px-3 bg-surface hover:bg-surface-container-low transition-colors">
                        <div className="text-[11px] text-outline uppercase tracking-wider font-bold mb-1">
                            OPEN REQUISITIONS
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl sm:text-3xl text-ink-primary tracking-tight font-bold">
                                [ {String(jobsCount).padStart(2, '0')} ]
                            </span>
                            <span className="text-[11px] text-canvas-blueprint border border-canvas-blueprint/30 px-1 py-0.5 font-bold">
                                ACTIVE
                            </span>
                        </div>
                        <div className="text-xs text-on-surface-variant mt-1 flex items-center gap-1 font-mono">
                            <span className="text-canvas-blueprint font-bold">▲</span> +1 Deployed this cycle
                        </div>
                    </div>

                    {/* Metric 02 */}
                    <div className="py-3 sm:py-3.5 px-3 bg-surface hover:bg-surface-container-low transition-colors">
                        <div className="text-[11px] text-outline uppercase tracking-wider font-bold mb-1">
                            AUDITED APPLICANTS
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl sm:text-3xl text-ink-primary tracking-tight font-bold">
                                [ {totalApplicantsCount} ]
                            </span>
                            <span className="text-[11px] text-on-surface-variant border border-black/15 px-1 py-0.5 font-bold">
                                100% PARSED
                            </span>
                        </div>
                        <div className="text-xs text-on-surface-variant mt-1 flex items-center gap-1 font-mono">
                            <span className="text-outline">■</span> Ingest rate: 12 dossiers/hr
                        </div>
                    </div>

                    {/* Metric 03 */}
                    <div className="py-3 sm:py-3.5 px-3 bg-surface hover:bg-surface-container-low transition-colors">
                        <div className="text-[11px] text-outline uppercase tracking-wider font-bold mb-1">
                            VERIFIED TALENT INDEX
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl sm:text-3xl text-canvas-blueprint tracking-tight font-bold">
                                [ {verifiedTalentIndex} ]
                            </span>
                            <span className="text-[11px] text-canvas-blueprint bg-blue-50 border border-canvas-blueprint/30 px-1 py-0.5 font-bold">
                                PASS
                            </span>
                        </div>
                        <div className="text-xs text-on-surface-variant mt-1 flex items-center gap-1 font-mono">
                            <span className="text-canvas-blueprint font-bold">✓</span> Proctor validation verified
                        </div>
                    </div>

                    {/* Metric 04 */}
                    <div className="py-3 sm:py-3.5 px-3 bg-surface hover:bg-surface-container-low transition-colors">
                        <div className="text-[11px] text-outline uppercase tracking-wider font-bold mb-1">
                            TIME TO SHORTLIST
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl sm:text-3xl text-ink-primary tracking-tight font-bold">
                                [ {timeToShortlist} ]
                            </span>
                            <span className="text-[11px] text-on-surface-variant border border-black/15 px-1 py-0.5 font-bold">
                                EST: 2.0D
                            </span>
                        </div>
                        <div className="text-xs text-on-surface-variant mt-1 flex items-center gap-1 font-mono">
                            <span className="text-canvas-blueprint font-bold">▼</span> -30% vs manual benchmark
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default ClientHeader;
