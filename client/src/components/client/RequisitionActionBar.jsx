import React from 'react';

const RequisitionActionBar = ({
    onDeployClick,
    onExportCSV,
    lastRunTimestamp = '2026-10-24 18:42:01'
}) => {
    return (
        <section
            className="w-full bg-[#0D0F14]/80 border-b border-white/[0.06] font-mono select-none"
            id="RequisitionActionBar"
        >
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                    <button
                        onClick={onDeployClick}
                        className="bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold text-xs font-mono px-4 py-2 rounded-sm transition-colors cursor-pointer flex items-center gap-1.5"
                        type="button"
                    >
                        <span>Post New Role</span>
                        <span aria-hidden="true">↗</span>
                    </button>

                    <button
                        onClick={onExportCSV}
                        className="bg-[#121316] text-[#E4E4E7] hover:text-white border border-white/10 hover:border-white/20 text-xs font-mono px-4 py-2 rounded-sm transition-colors cursor-pointer flex items-center gap-1.5"
                        type="button"
                    >
                        <span>Export CSV</span>
                    </button>

                    <div className="hidden xl:flex items-center gap-2 pl-4 border-l border-white/[0.06] text-xs text-[#888888] font-mono">
                        <span>Automated Skill Matching Active</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#71717A] font-mono">
                    <span>Synced: {lastRunTimestamp}</span>
                </div>
            </div>
        </section>
    );
};

export default RequisitionActionBar;
