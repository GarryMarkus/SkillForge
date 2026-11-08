import React from 'react';

const RequisitionActionBar = ({
    onDeployClick,
    onExportCSV,
    lastRunTimestamp = '2026-10-24 18:42:01'
}) => {
    return (
        <section
            className="w-full bg-[#09090B] border-b border-white/[0.08] font-sans"
            id="RequisitionActionBar"
        >
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                    <button
                        onClick={onDeployClick}
                        className="bg-white hover:bg-zinc-200 text-zinc-950 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-sm"
                        type="button"
                    >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        <span>Post New Role</span>
                    </button>

                    <button
                        onClick={onExportCSV}
                        className="bg-white/[0.06] hover:bg-white/[0.1] text-zinc-200 border border-white/[0.08] text-sm font-medium px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2"
                        type="button"
                    >
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        <span>Export Candidates (CSV)</span>
                    </button>

                    <div className="hidden xl:flex items-center gap-2 pl-4 border-l border-white/[0.08] text-xs text-zinc-400 font-medium">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span>Automated Skill Matching: Active</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <span>Synchronized: {lastRunTimestamp}</span>
                </div>
            </div>
        </section>
    );
};

export default RequisitionActionBar;
