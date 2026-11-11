import React from 'react';

const RequisitionBlueprintCard = ({
    skillsList = ["Python", "FastAPI", "Docker", "Kubernetes", "PostgreSQL", "Redis"],
    onRecalibrate,
    onCloneSpec,
    timestamp = '2026-10-24 18:42:01 UTC'
}) => {
    return (
        <section
            className="lg:col-span-4 bg-[#111318] text-white rounded-md border border-white/[0.08] border-t-white/15 p-5 sm:p-6 shadow-2xl flex flex-col font-mono select-none"
            id="RequisitionBlueprintCard"
        >
            {/* Header */}
            <div className="w-full border-b border-white/[0.06] pb-3 mb-4 flex items-center justify-between">
                <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Role Criteria</h4>
                    <p className="text-xs text-[#888888] mt-0.5">Automated screening criteria</p>
                </div>
                <span className="text-[11px] text-zinc-300 bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded-sm">
                    Active
                </span>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-4 text-xs font-mono">
                {/* Target Skills */}
                <div>
                    <div className="text-[11px] uppercase text-[#8a8a8e] tracking-wider mb-2">
                        Core Competencies Evaluated
                    </div>
                    <div className="p-3 bg-[#060709] rounded-sm border border-white/[0.08] flex flex-wrap gap-1.5">
                        {skillsList.map((skill, i) => (
                            <span key={i} className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.08] rounded-sm text-xs font-mono text-zinc-300">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Quality & Integrity Standards */}
                <div>
                    <div className="text-[11px] uppercase text-[#8a8a8e] tracking-wider mb-2">
                        Verification Thresholds
                    </div>
                    <div className="rounded-sm bg-[#060709] p-3 space-y-2 border border-white/[0.08] text-xs text-[#888888]">
                        <div className="flex items-center gap-2">
                            <span className="text-emerald-400 font-mono">✓</span>
                            <span>Min 80% practical assessment benchmark</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-emerald-400 font-mono">✓</span>
                            <span>Supervised proctoring integrity confirmed</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-emerald-400 font-mono">✓</span>
                            <span>Code AST &amp; GitHub history audited</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-col gap-2">
                    <button
                        onClick={onRecalibrate}
                        className="w-full py-2.5 rounded-sm bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold text-xs font-mono transition-colors cursor-pointer text-center"
                    >
                        Edit Criteria
                    </button>
                    <button
                        onClick={onCloneSpec}
                        className="w-full py-2 rounded-sm bg-[#121316] text-[#E4E4E7] hover:text-white border border-white/10 hover:border-white/20 text-xs font-mono transition-colors cursor-pointer text-center"
                    >
                        Duplicate Role Spec
                    </button>
                </div>

                <div className="text-center text-[11px] text-[#71717A] mt-1">
                    Updated: {timestamp}
                </div>
            </div>
        </section>
    );
};

export default RequisitionBlueprintCard;
