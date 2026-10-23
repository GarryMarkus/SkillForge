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
        <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 font-sans shadow-sm" id="ClientHeader">
            {/* Top Enterprise Navigation */}
            <div className="h-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        S
                    </div>
                    <span className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                        SkillForge Employer Hub
                    </span>
                    <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Employer Enclave Active
                    </span>
                </div>

                <div className="flex items-center gap-4 text-sm font-medium">
                    <div className="hidden lg:flex items-center gap-2 text-xs text-gray-600 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                        <span className="font-semibold text-gray-900">{companyName}</span>
                        <span className="text-gray-300">·</span>
                        <span className="text-gray-500">Hiring Manager</span>
                    </div>

                    <button
                        onClick={onLogout}
                        className="px-3.5 py-1.5 rounded-xl border border-gray-200 hover:border-red-200 text-gray-600 hover:text-red-600 text-xs font-semibold transition-colors cursor-pointer"
                    >
                        Log Out
                    </button>
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                        HR
                    </div>
                </div>
            </div>

            {/* Sub-Header Navigation Tabs Rail */}
            <div className="h-12 w-full bg-gray-50/70 border-t border-gray-100">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between overflow-x-auto">
                    <nav className="flex items-center h-full gap-2 py-1">
                        <button
                            onClick={() => setActiveTab('REQUISITIONS')}
                            className={`h-full flex items-center px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                                activeTab === 'REQUISITIONS'
                                    ? 'bg-white text-blue-600 shadow-xs'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                        >
                            Job Openings ({jobsCount})
                        </button>
                        <button
                            onClick={() => setActiveTab('CANDIDATES')}
                            className={`h-full flex items-center px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                                activeTab === 'CANDIDATES'
                                    ? 'bg-white text-blue-600 shadow-xs'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                        >
                            Candidate Pipeline ({totalApplicantsCount})
                        </button>
                    </nav>

                    {/* Quick Metric Pills */}
                    <div className="hidden md:flex items-center gap-6 text-xs text-gray-500 font-medium">
                        <div>
                            <span>Avg Match Fit:</span>{' '}
                            <strong className="text-blue-600 font-bold">{verifiedTalentIndex}</strong>
                        </div>
                        <div>
                            <span>Time to Shortlist:</span>{' '}
                            <strong className="text-emerald-600 font-bold">{timeToShortlist}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default ClientHeader;
