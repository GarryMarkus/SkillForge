import React from 'react';

const RequisitionBlueprintCard = ({
    skillsList = ["Python", "FastAPI", "Docker", "Kubernetes", "PostgreSQL", "Redis"],
    onRecalibrate,
    onCloneSpec,
    timestamp = '2026-10-24 18:42:01 UTC'
}) => {
    return (
        <section
            className="lg:col-span-4 bg-[#0b0b0c] text-white rounded-md border border-white/10 p-5 sm:p-6 shadow-sm flex flex-col font-mono select-none"
            id="RequisitionBlueprintCard"
        >
            {/* Header */}
            <div className="w-full border-b border-white/[0.06] pb-3 mb-4 flex items-center justify-between">
                <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Role Criteria</h4>
                    <p className="text-xs text-[#737373] mt-0.5">Automated screening criteria</p>
                </div>
                <span className="text-[11px] text-[#888888] bg-[#050505] border border-white/10 px-2 py-0.5 rounded-sm">
                    Active
                </span>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-4 text-xs font-mono">
                {/* Target Skills */}
                <div>
                    <div className="text-[11px] uppercase text-[#737373] tracking-wider mb-2">
                        Core Competencies Evaluated
                    </div>
                    <div className="p-3 bg-[#050505] rounded-sm border border-white/10 flex flex-wrap gap-1.5">
                        {skillsList.map((skill, i) => (
                            <span key={i} className="px-2 py-0.5 bg-[#0b0b0c] border border-white/10 rounded-sm text-xs font-mono text-[#888888]">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Quality & Integrity Standards */}
                <div>
                    <div className="text-[11px] uppercase text-[#737373] tracking-wider mb-2">
                        Verification Thresholds
                    </div>
                    <div className="rounded-sm bg-[#050505] p-3 space-y-2 border border-white/10 text-xs text-[#888888]">
                        <div className="flex items-center gap-2">
                            <span className="text-emerald-500 font-mono">✓</span>
                            <span>Min 80% practical assessment benchmark</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-emerald-500 font-mono">✓</span>
                            <span>Supervised proctoring integrity confirmed</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-emerald-500 font-mono">✓</span>
                            <span>Code AST &amp; GitHub history audited</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-col gap-2">
                    <button
                        onClick={onRecalibrate}
                        className="w-full py-2 rounded-md bg-[#111113] hover:bg-[#1a1a1d] text-white border border-white/20 text-xs font-mono transition-colors cursor-pointer text-center"
                    >
                        Edit Criteria
                    </button>
                    <button
                        onClick={onCloneSpec}
                        className="w-full py-2 rounded-md bg-[#050505] hover:bg-[#111113] text-[#888888] hover:text-white border border-white/10 text-xs font-mono transition-colors cursor-pointer text-center"
                    >
                        Duplicate Role Spec
                    </button>
                </div>

                <div className="text-center text-[11px] text-[#555555] mt-1">
                    Updated: {timestamp}
                </div>
            </div>
        </section>
    );
};

export default RequisitionBlueprintCard;
