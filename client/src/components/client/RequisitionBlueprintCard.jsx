import React from 'react';

const RequisitionBlueprintCard = ({
    skillsList = ["PYTHON", "FASTAPI", "DOCKER", "KUBERNETES", "POSTGRESQL_INDEXING", "REDIS"],
    onRecalibrate,
    onCloneSpec,
    timestamp = '2026-10-24 18:42:01 UTC'
}) => {
    return (
        <section
            className="lg:col-span-4 bg-canvas-blueprint text-white border border-primary p-6 sm:p-8 shadow-[4px_4px_0px_#0A0A0A] flex flex-col font-mono select-none"
            id="RequisitionBlueprintCard"
        >
            {/* Blueprint Section Header */}
            <div className="w-full border-b border-white/20 pb-3 mb-5 flex items-center justify-between">
                <div className="text-xs uppercase tracking-wider font-bold text-white">
                    [ REQUISITION SPECIFICATION ]
                </div>
                <span className="text-[11px] text-white/90 border border-white/30 px-2 py-0.5 bg-white/10 font-bold">
                    ACTIVE
                </span>
            </div>

            {/* Blueprint Body */}
            <div className="flex flex-col gap-5 text-xs">
                {/* Target Model Vector */}
                <div>
                    <div className="text-[11px] uppercase text-white/80 tracking-wider mb-2 font-bold">
                        // TARGET SKILL VECTOR
                    </div>
                    <div className="p-3 bg-white/10 border border-white/20 text-white flex flex-wrap gap-1.5">
                        {skillsList.map((skill, i) => (
                            <span key={i} className="border border-white/40 px-2 py-1 bg-white/10 font-bold text-[11px]">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Heuristic Policy Enforcement Box */}
                <div>
                    <div className="text-[11px] uppercase text-white/80 tracking-wider mb-2 font-bold">
                        // POLICY ENFORCEMENT RULES
                    </div>
                    <div className="border border-white/30 bg-white/10 p-3.5 space-y-2">
                        <div className="flex items-start gap-2">
                            <span className="text-amber-300 font-bold">!</span>
                            <span className="text-[11px] text-white leading-tight uppercase font-bold">
                                APPLICANTS WITH PROCTOR RISK &gt;= 50 EXCLUDED AUTOMATICALLY
                            </span>
                        </div>
                        <div className="h-[1px] w-full bg-white/15 my-1"></div>
                        <div className="text-[11px] text-white/80 leading-relaxed">
                            AUTONOMOUS SHORTLIST ON COSINE MATCH &gt;= 85%<br />
                            HARDWARE PROCTORING: WEBCAM + AUDIO + WINDOW LOCK
                        </div>
                    </div>
                </div>

                {/* Architectural Parameters Spec Sheet */}
                <div className="border border-white/25 bg-white/10 p-3.5">
                    <div className="text-[11px] font-bold text-white uppercase border-b border-white/20 pb-1.5 mb-2.5">
                        ARCHITECTURAL PARAMETERS
                    </div>
                    <dl className="grid grid-cols-2 gap-y-1.5 text-xs text-white/90">
                        <dt className="text-white/70">MATCH ENGINE:</dt>
                        <dd className="text-right font-bold">SCIPY TF-IDF</dd>
                        <dt className="text-white/70">COSINE TOLERANCE:</dt>
                        <dd className="text-right font-bold">0.05</dd>
                        <dt className="text-white/70">AUDIT LOCK:</dt>
                        <dd className="text-right font-bold text-green-300">ENFORCED</dd>
                        <dt className="text-white/70">SCHEMA REVISION:</dt>
                        <dd className="text-right font-bold">2026.4</dd>
                    </dl>
                </div>

                {/* Blueprint Execution Actions */}
                <div className="pt-2 flex flex-col gap-2.5">
                    <button
                        onClick={onRecalibrate}
                        className="w-full bg-white text-canvas-blueprint text-xs py-3 px-4 border border-white hover:bg-white/90 uppercase transition-none cursor-pointer text-center font-bold"
                        type="button"
                    >
                        [ RE-CALIBRATE VECTOR WEIGHTS ]
                    </button>
                    <button
                        onClick={onCloneSpec}
                        className="w-full bg-transparent text-white text-xs py-2.5 px-4 border border-white/40 hover:bg-white/10 uppercase transition-none cursor-pointer text-center font-bold"
                        type="button"
                    >
                        [ CLONE SPECIFICATION CARD ]
                    </button>
                </div>
            </div>

            {/* Card Base Coordinate Stamp */}
            <div className="mt-5 pt-3 border-t border-white/20 flex items-center justify-between text-[11px] text-white/70">
                <span>SPEC: REQUISITION MATRIX</span>
                <span>STAMP: {timestamp}</span>
            </div>
        </section>
    );
};

export default RequisitionBlueprintCard;
