import React from 'react';

const RequisitionActionBar = ({
    onDeployClick,
    onExportCSV,
    lastRunTimestamp = '2026-10-24 18:42:01'
}) => {
    return (
        <section
            className="w-full bg-[#050505] border-b border-white/[0.06] font-mono select-none"
            id="RequisitionActionBar"
        >
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                    <button
                        onClick={onDeployClick}
                        className="bg-[#111113] hover:bg-[#1a1a1d] text-white border border-white/20 text-xs font-mono px-4 py-2 rounded-md transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                        type="button"
                    >
                        <span>Post New Role</span>
                    </button>

                    <button
                        onClick={onExportCSV}
                        className="bg-[#050505] hover:bg-[#111113] text-[#888888] hover:text-white border border-white/10 text-xs font-mono px-4 py-2 rounded-md transition-all cursor-pointer flex items-center gap-1.5"
                        type="button"
                    >
                        <span>Export CSV</span>
                    </button>

                    <div className="hidden xl:flex items-center gap-2 pl-4 border-l border-white/[0.06] text-xs text-[#737373] font-mono">
                        <span>Automated Skill Matching Active</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#555555] font-mono">
                    <span>Synced: {lastRunTimestamp}</span>
                </div>
            </div>
        </section>
    );
};

export default RequisitionActionBar;
