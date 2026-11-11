import React from 'react';
import { Plus, Download, CheckCircle2, RefreshCw } from '../ui/Icons';

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
                <div className="flex items-center gap-3 flex-wrap">
                    <button
                        onClick={onDeployClick}
                        className="bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold text-xs font-mono px-4 py-2 rounded-sm transition-colors cursor-pointer inline-flex items-center gap-1.5"
                        type="button"
                    >
                        <Plus className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                        <span>Post New Role</span>
                    </button>

                    <button
                        onClick={onExportCSV}
                        className="bg-[#121316] text-[#E4E4E7] hover:text-white border border-white/10 hover:border-white/20 text-xs font-mono px-4 py-2 rounded-sm transition-colors cursor-pointer inline-flex items-center gap-1.5"
                        type="button"
                    >
                        <Download className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                        <span>Export CSV</span>
                    </button>

                    <div className="hidden xl:inline-flex items-center gap-1.5 pl-4 border-l border-white/[0.06] text-xs text-[#888888] font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.75} aria-hidden="true" />
                        <span>Auto-Matching Ready</span>
                    </div>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs text-[#71717A] font-mono">
                    <RefreshCw className="w-3 h-3" strokeWidth={1.75} aria-hidden="true" />
                    <span>Updated: {lastRunTimestamp}</span>
                </div>
            </div>
        </section>
    );
};

export default RequisitionActionBar;
