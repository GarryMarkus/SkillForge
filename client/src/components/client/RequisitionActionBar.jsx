import React from 'react';

const RequisitionActionBar = ({
    onDeployClick,
    onExportCSV,
    lastRunTimestamp = '2026-10-24 18:42:01'
}) => {
    return (
        <section
            className="w-full bg-white border-b border-gray-100 font-sans shadow-xs"
            id="RequisitionActionBar"
        >
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                    <button
                        onClick={onDeployClick}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-sm hover:shadow"
                        type="button"
                    >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        <span>Post New Role</span>
                    </button>

                    <button
                        onClick={onExportCSV}
                        className="bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-xs"
                        type="button"
                    >
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        <span>Export Candidates (CSV)</span>
                    </button>

                    <div className="hidden xl:flex items-center gap-2 pl-4 border-l border-gray-200 text-xs text-gray-600 font-medium">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span>Automated Skill Matching: Active</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>Synchronized: {lastRunTimestamp}</span>
                </div>
            </div>
        </section>
    );
};

export default RequisitionActionBar;
