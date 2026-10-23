import React from 'react';

const RequisitionActionBar = ({
    onDeployClick,
    onExportCSV,
    lastRunTimestamp = '2026-10-24 18:42:01'
}) => {
    return (
        <section
            className="w-full bg-surface-container-low border-b border-black/15 font-mono select-none"
            id="RequisitionActionBar"
        >
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                    <button
                        onClick={onDeployClick}
                        className="bg-canvas-blueprint text-white text-xs sm:text-sm font-bold px-6 py-3.5 border border-canvas-blueprint hover:bg-primary-hover uppercase transition-none cursor-pointer flex items-center gap-2 shadow-[3px_3px_0px_#0A0A0A]"
                        type="button"
                    >
                        <span>[ + DEPLOY NEW TECHNICAL REQUISITION ]</span>
                    </button>

                    <button
                        onClick={onExportCSV}
                        className="bg-surface-container-lowest text-ink-primary text-xs sm:text-sm font-bold px-5 py-3.5 border border-black/25 hover:bg-surface-container hover:border-black/40 uppercase transition-none cursor-pointer flex items-center gap-2"
                        type="button"
                    >
                        <span>[ EXPORT AUDIT LOGS (CSV) ]</span>
                    </button>

                    <div className="hidden xl:flex items-center gap-2 pl-3 border-l border-black/15 text-xs text-on-surface-variant font-bold">
                        <span className="w-2 h-2 bg-canvas-blueprint inline-block"></span>
                        <span>
                            AUTO-MATCH ENGINE: <strong className="text-ink-primary font-bold">ONLINE</strong> [TF-IDF COSINE ACTIVE]
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-on-surface-variant font-mono shrink-0">
                    <span className="border border-black/15 bg-surface px-2 py-0.5 font-bold">
                        DISPATCH: REALTIME
                    </span>
                    <span className="text-black/30">|</span>
                    <span>LAST RUN: {lastRunTimestamp}</span>
                </div>
            </div>
        </section>
    );
};

export default RequisitionActionBar;
