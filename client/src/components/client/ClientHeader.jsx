import React from 'react';

const ClientHeader = ({
    companyName = 'NEXUS_INFRASTRUCTURE_INC',
    activeTab = 'REQUISITIONS',
    setActiveTab,
    jobsCount = 0,
    applicantsCount = 0,
    onLogout
}) => {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest border-b border-black/15 select-none">
            {/* Top Bar */}
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
            <div className="h-10 w-full px-margin bg-surface-container flex items-center justify-between overflow-x-auto">
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
                        APPLICANT_POOL ({applicantsCount})
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
        </header>
    );
};

export default ClientHeader;
