import React from 'react';

const ClientHeader = ({
    companyName = 'NEXUS_INFRASTRUCTURE_INC',
    activeTab = 'REQUISITIONS',
    setActiveTab,
    jobsCount = 0,
    totalApplicantsCount = 0,
    verifiedTalentIndex = '96.2%',
    timeToShortlist = '1.4_DAYS',
    onLogout
}) => {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest border-b border-black/15 select-none">
            {/* Top Enterprise Console Rail */}
            <div className="h-16 w-full px-margin flex items-center justify-between border-b border-black/10">
                <div className="flex items-center gap-space-md">
                    <div className="flex items-center gap-space-xs font-headline-sm text-headline-sm text-on-surface uppercase tracking-tight">
                        <span className="text-primary-container font-bold">+</span>
                        <span className="font-bold">SKILLFORGE // ENTERPRISE_CONSOLE</span>
                    </div>
                    <span className="border border-black/15 bg-surface-container-low px-space-xs py-0.5 text-label-sm font-label-sm text-primary-container uppercase hidden sm:inline-block">
                        [CLIENT_NODE: ACTIVE // 256-BIT_ENCRYPTION]
                    </span>
                </div>

                <div className="hidden xl:flex items-center gap-space-xs border border-black/15 bg-surface-container-lowest px-space-md py-space-xs text-label-md font-label-md text-on-surface-variant">
                    <span className="text-primary-container font-bold">LOC:</span>
                    <span>ROOT &gt; ENTERPRISE_PIPELINE &gt; REQUISITION_MANAGER</span>
                </div>

                <div className="flex items-center gap-space-md">
                    <div className="hidden md:flex items-center gap-space-xs border-r border-black/15 pr-space-md text-label-sm font-label-sm text-on-surface-variant">
                        <span>[CLIENT: {companyName.toUpperCase()}]</span>
                        <span className="text-black/30">|</span>
                        <span>ROLE: RECRUITER</span>
                    </div>
                    <button
                        onClick={onLogout}
                        className="border border-error/40 bg-surface-container-lowest px-space-sm py-space-xs text-label-sm font-label-sm text-error uppercase hover:bg-error hover:text-on-error transition-none cursor-pointer font-bold"
                    >
                        [ TERMINATE_SESSION ]
                    </button>
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 text-on-primary">
                        <span className="material-symbols-outlined text-[18px]">person</span>
                    </div>
                </div>
            </div>

            {/* Sub-Header Module Index Strip */}
            <div className="h-10 w-full px-margin bg-surface-container flex items-center justify-between overflow-x-auto border-b border-black/10">
                <div className="flex items-center gap-space-sm text-label-sm font-label-sm text-on-surface-variant shrink-0">
                    <span className="text-primary-container font-bold">[COORD: X01-Y00]</span>
                    <span>MODULE_INDEX:</span>
                </div>

                <nav className="flex items-center h-full gap-0 border-l border-r border-black/15">
                    <button
                        onClick={() => setActiveTab('REQUISITIONS')}
                        className={`h-full flex items-center px-space-lg border-r border-black/15 uppercase font-label-md text-label-md transition-none cursor-pointer ${
                            activeTab === 'REQUISITIONS'
                                ? 'bg-primary-container text-on-primary font-bold'
                                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                        }`}
                    >
                        REQUISITIONS ({jobsCount})
                    </button>
                    <button
                        onClick={() => setActiveTab('APPLICANT_POOL')}
                        className={`h-full flex items-center px-space-lg border-r border-black/15 uppercase font-label-md text-label-md transition-none cursor-pointer ${
                            activeTab === 'APPLICANT_POOL'
                                ? 'bg-primary-container text-on-primary font-bold'
                                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                        }`}
                    >
                        APPLICANT_POOL ({totalApplicantsCount})
                    </button>
                    <button
                        onClick={() => setActiveTab('COSINE_MATCHER')}
                        className={`h-full flex items-center px-space-lg border-r border-black/15 uppercase font-label-md text-label-md transition-none cursor-pointer ${
                            activeTab === 'COSINE_MATCHER'
                                ? 'bg-primary-container text-on-primary font-bold'
                                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                        }`}
                    >
                        COSINE_MATCHER
                    </button>
                    <button
                        onClick={() => setActiveTab('AUDIT_LOGS')}
                        className={`h-full flex items-center px-space-lg uppercase font-label-md text-label-md transition-none cursor-pointer ${
                            activeTab === 'AUDIT_LOGS'
                                ? 'bg-primary-container text-on-primary font-bold'
                                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                        }`}
                    >
                        AUDIT_LOGS
                    </button>
                </nav>

                <div className="hidden lg:flex items-center gap-space-xs text-label-sm font-label-sm text-secondary">
                    <span className="inline-block w-1.5 h-1.5 bg-primary-container"></span>
                    <span>GRID_SYNCHRONIZED</span>
                </div>
            </div>

            {/* Top Micro Telemetry Strip */}
            <div className="w-full px-margin py-space-xs flex flex-wrap items-center justify-between gap-y-1 text-label-sm font-label-sm text-on-surface-variant border-b border-black/10 bg-surface-container-lowest">
                <div className="flex items-center gap-space-sm flex-wrap">
                    <span className="text-primary-container font-bold">+</span>
                    <span className="text-on-surface font-bold">LOC: ROOT &gt; ENTERPRISE_PIPELINE &gt; REQUISITION_MANAGER</span>
                    <span className="text-black/25">|</span>
                    <span className="bg-surface-container px-space-xs py-0.5 border border-black/10 text-on-surface font-bold">
                        [CLIENT: {companyName.toUpperCase()}]
                    </span>
                    <span className="text-black/25">|</span>
                    <span>ROLE: RECRUITER</span>
                </div>
                <div className="flex items-center gap-space-md">
                    <span className="text-primary-container flex items-center gap-1 font-bold">
                        <span className="inline-block w-1.5 h-1.5 bg-primary-container animate-pulse"></span>
                        [SYNC: REALTIME // BUFFER_LATENCY: 18ms]
                    </span>
                    <span className="text-black/25">|</span>
                    <span className="text-on-surface font-bold">[NODE_ID: US-EAST-CL-04]</span>
                </div>
            </div>

            {/* 4-Cell CAD Metric Ribbon */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-black/15 bg-surface-container-lowest">
                {/* Metric 01 */}
                <div className="px-margin py-space-sm relative group bg-surface hover:bg-surface-container-low transition-colors">
                    <span className="absolute top-1 right-2 text-label-sm font-label-sm text-black/30">[MTRX_01]</span>
                    <div className="text-label-sm font-label-sm text-secondary uppercase tracking-widest mb-1 font-bold">
                        OPEN_REQUISITIONS
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="font-headline-lg text-headline-lg text-on-surface tracking-tighter font-bold">
                            [ {String(jobsCount).padStart(2, '0')} ]
                        </span>
                        <span className="text-label-sm font-label-sm text-primary-container border border-primary-container/30 px-1 py-0.5 font-bold">
                            ACTIVE
                        </span>
                    </div>
                    <div className="text-body-sm font-body-sm text-on-surface-variant mt-1 flex items-center gap-1">
                        <span className="text-primary-container font-bold">▲</span> +1 Deployed this cycle
                    </div>
                </div>

                {/* Metric 02 */}
                <div className="px-margin py-space-sm relative group bg-surface hover:bg-surface-container-low transition-colors">
                    <span className="absolute top-1 right-2 text-label-sm font-label-sm text-black/30">[MTRX_02]</span>
                    <div className="text-label-sm font-label-sm text-secondary uppercase tracking-widest mb-1 font-bold">
                        TOTAL_APPLICANTS_AUDITED
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="font-headline-lg text-headline-lg text-on-surface tracking-tighter font-bold">
                            [ {totalApplicantsCount} ]
                        </span>
                        <span className="text-label-sm font-label-sm text-on-surface-variant border border-black/15 px-1 py-0.5 font-bold">
                            100% PARSED
                        </span>
                    </div>
                    <div className="text-body-sm font-body-sm text-on-surface-variant mt-1 flex items-center gap-1">
                        <span className="text-secondary">■</span> Ingest rate: 12 dossiers/hr
                    </div>
                </div>

                {/* Metric 03 */}
                <div className="px-margin py-space-sm relative group bg-surface hover:bg-surface-container-low transition-colors">
                    <span className="absolute top-1 right-2 text-label-sm font-label-sm text-black/30">[MTRX_03]</span>
                    <div className="text-label-sm font-label-sm text-secondary uppercase tracking-widest mb-1 font-bold">
                        VERIFIED_TALENT_INDEX
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="font-headline-lg text-headline-lg text-primary-container tracking-tighter font-bold">
                            [ {verifiedTalentIndex} ]
                        </span>
                        <span className="text-label-sm font-label-sm text-primary-container bg-primary-fixed/30 border border-primary-container/20 px-1 py-0.5 font-bold">
                            PASS
                        </span>
                    </div>
                    <div className="text-body-sm font-body-sm text-on-surface-variant mt-1 flex items-center gap-1">
                        <span className="text-primary-container font-bold">✓</span> Proctor validation verified
                    </div>
                </div>

                {/* Metric 04 */}
                <div className="px-margin py-space-sm relative group bg-surface hover:bg-surface-container-low transition-colors">
                    <span className="absolute top-1 right-2 text-label-sm font-label-sm text-black/30">[MTRX_04]</span>
                    <div className="text-label-sm font-label-sm text-secondary uppercase tracking-widest mb-1 font-bold">
                        TIME_TO_SHORTLIST
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="font-headline-lg text-headline-lg text-on-surface tracking-tighter font-bold">
                            [ {timeToShortlist} ]
                        </span>
                        <span className="text-label-sm font-label-sm text-secondary border border-black/15 px-1 py-0.5 font-bold">
                            EST: 2.0D
                        </span>
                    </div>
                    <div className="text-body-sm font-body-sm text-on-surface-variant mt-1 flex items-center gap-1">
                        <span className="text-primary-container font-bold">▼</span> -30% vs manual benchmark
                    </div>
                </div>
            </div>
        </header>
    );
};

export default ClientHeader;
