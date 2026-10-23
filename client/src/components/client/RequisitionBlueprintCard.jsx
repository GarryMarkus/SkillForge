import React from 'react';

const RequisitionBlueprintCard = ({
    skillsList = ["PYTHON", "FASTAPI", "DOCKER", "KUBERNETES", "POSTGRESQL_INDEXING", "REDIS"],
    onRecalibrate,
    onCloneSpec,
    timestamp = '2026-10-24 18:42:01 UTC'
}) => {
    return (
        <section
            className="lg:col-span-4 bg-primary-container text-on-primary border border-primary p-0 relative shadow-none"
            id="RequisitionBlueprintCard"
        >
            {/* Blueprint Corner Crosshairs */}
            <div className="absolute top-1 left-1 text-on-primary/40 font-mono text-[10px] pointer-events-none select-none">+</div>
            <div className="absolute top-1 right-1 text-on-primary/40 font-mono text-[10px] pointer-events-none select-none">+</div>
            <div className="absolute bottom-1 left-1 text-on-primary/40 font-mono text-[10px] pointer-events-none select-none">+</div>
            <div className="absolute bottom-1 right-1 text-on-primary/40 font-mono text-[10px] pointer-events-none select-none">+</div>

            {/* Blueprint Section Header */}
            <div className="w-full border-b border-white/20 px-space-md py-space-sm bg-primary/40 flex items-center justify-between">
                <div className="font-headline-sm text-headline-sm text-on-primary uppercase tracking-tight flex items-center gap-1 font-bold">
                    <span>[ SYSTEM_REQUISITION_SPEC ]</span>
                </div>
                <span className="text-label-sm font-label-sm text-on-primary/70 border border-white/30 px-1 py-0.5 font-bold">
                    [SCHEMATIC: CAD_902]
                </span>
            </div>

            {/* Blueprint Body */}
            <div className="p-space-md flex flex-col gap-space-md font-body-sm text-body-sm">
                {/* Target Model Vector */}
                <div>
                    <div className="text-label-sm font-label-sm uppercase text-on-primary/75 tracking-wider mb-space-xs font-bold">
                        // TF-IDF_TARGET_VECTOR
                    </div>
                    <div className="p-space-sm bg-primary/50 border border-white/20 text-on-primary flex flex-wrap gap-1.5 font-label-sm text-label-sm">
                        {skillsList.map((skill, i) => (
                            <span key={i} className="border border-white/40 px-1.5 py-0.5 bg-white/10 font-bold">
                                [{skill}]
                            </span>
                        ))}
                    </div>
                </div>

                {/* Heuristic Policy Enforcement Box */}
                <div>
                    <div className="text-label-sm font-label-sm uppercase text-on-primary/75 tracking-wider mb-space-xs font-bold">
                        // HEURISTIC_POLICY_RULES
                    </div>
                    <div className="border border-white/30 bg-primary/30 p-space-sm flex flex-col gap-1.5">
                        <div className="flex items-start gap-2">
                            <span className="text-error-container font-bold text-label-md font-label-md">!</span>
                            <span className="text-label-sm font-label-sm text-on-primary leading-tight uppercase font-bold">
                                APPLICANTS WITH PROCTOR_RISK &gt;= 50 EXCLUDED AUTOMATICALLY
                            </span>
                        </div>
                        <div className="h-[1px] w-full bg-white/15 my-1"></div>
                        <div className="text-[10px] text-on-primary/80 leading-normal">
                            DISCORD_HOOK: DISPATCHED ON COSINE &gt;= 0.95<br />
                            PROCTOR_RESOLUTION: HARD_ENFORCED (CAMERA + AUDIO + TAB_LOCK)
                        </div>
                    </div>
                </div>

                {/* Architectural Parameters Spec Sheet */}
                <div className="border border-white/25 bg-primary/60 p-space-sm">
                    <div className="text-label-sm font-label-sm font-bold text-on-primary uppercase border-b border-white/20 pb-1 mb-2">
                        ARCHITECTURAL_PARAMETERS
                    </div>
                    <dl className="grid grid-cols-2 gap-y-1.5 text-label-sm font-label-sm text-on-primary/90">
                        <dt className="text-on-primary/60">ALGO_ENGINE:</dt>
                        <dd className="text-right font-bold">SCIPY_TFIDF_V3</dd>
                        <dt className="text-on-primary/60">COSINE_TOLERANCE:</dt>
                        <dd className="text-right font-bold">0.05</dd>
                        <dt className="text-on-primary/60">HASH_INTEGRITY:</dt>
                        <dd className="text-right font-bold">BLAKE3_HARDENED</dd>
                        <dt className="text-on-primary/60">SCHEMA_REVISION:</dt>
                        <dd className="text-right font-bold">REV: 2026.4</dd>
                        <dt className="text-on-primary/60">AUDIT_LOCK:</dt>
                        <dd className="text-right font-bold text-primary-fixed">ENABLED (WORM)</dd>
                    </dl>
                </div>

                {/* Blueprint Execution Actions */}
                <div className="pt-space-xs flex flex-col gap-2">
                    <button
                        onClick={onRecalibrate}
                        className="w-full bg-surface-container-lowest text-primary-container font-label-md text-label-md py-space-xs px-space-md border border-surface-container-lowest hover:bg-surface hover:text-primary uppercase transition-none cursor-pointer text-center font-bold"
                        type="button"
                    >
                        [ RE-CALIBRATE_VECTOR_WEIGHTS ]
                    </button>
                    <button
                        onClick={onCloneSpec}
                        className="w-full bg-transparent text-on-primary font-label-sm text-label-sm py-1 px-space-md border border-white/40 hover:bg-white/10 uppercase transition-none cursor-pointer text-center font-bold"
                        type="button"
                    >
                        [ CLONE_SPECIFICATION_CARD ]
                    </button>
                </div>
            </div>

            {/* Card Base Coordinate Stamp */}
            <div className="w-full bg-primary/80 border-t border-white/20 px-space-md py-1 flex items-center justify-between text-[9px] text-on-primary/70">
                <span>LAYER: SEC_REQUISITION // MAT: 0x489F</span>
                <span>STAMP: {timestamp}</span>
            </div>
        </section>
    );
};

export default RequisitionBlueprintCard;
