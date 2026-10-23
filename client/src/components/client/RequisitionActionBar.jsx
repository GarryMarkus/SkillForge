import React from 'react';

const RequisitionActionBar = ({
    onDeployClick,
    onExportCSV,
    lastRunTimestamp = '2026-10-24 18:42:01'
}) => {
    return (
        <section
            className="w-full bg-surface-container-low px-margin py-space-sm border-b border-black/15 flex flex-wrap items-center justify-between gap-space-md"
            id="RequisitionActionBar"
        >
            <div className="flex items-center gap-space-sm flex-wrap">
                <button
                    onClick={onDeployClick}
                    className="bg-primary-container text-on-primary font-label-md text-label-md px-space-md py-space-xs border border-primary-container hover:bg-primary uppercase transition-none cursor-pointer flex items-center gap-2 font-bold shadow-[2px_2px_0px_#191C1D]"
                    type="button"
                >
                    <span>+ DEPLOY_NEW_TECHNICAL_REQUISITION</span>
                </button>
                <button
                    onClick={onExportCSV}
                    className="bg-surface-container-lowest text-on-surface font-label-md text-label-md px-space-md py-space-xs border border-black/20 hover:bg-surface-container hover:border-black/40 uppercase transition-none cursor-pointer flex items-center gap-1 font-bold"
                    type="button"
                >
                    <span>EXPORT_AUDIT_LOGS_CSV</span>
                </button>
                <div className="hidden xl:flex items-center gap-2 pl-space-sm border-l border-black/15 text-label-sm font-label-sm text-on-surface-variant">
                    <span className="w-2 h-2 rounded-none bg-primary-container inline-block"></span>
                    <span>
                        AUTO_MATCH_ENGINE: <strong className="text-on-surface font-bold">ONLINE</strong> [SCIPY_TFIDF_VECTORIZER_ACTIVE]
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-space-sm text-label-sm font-label-sm text-secondary shrink-0">
                <span className="border border-black/10 bg-surface px-space-xs py-0.5 font-bold">
                    INDEX_CYCLE: REALTIME_DISPATCH
                </span>
                <span className="text-black/30">|</span>
                <span>LAST_RUN: {lastRunTimestamp}</span>
            </div>
        </section>
    );
};

export default RequisitionActionBar;
