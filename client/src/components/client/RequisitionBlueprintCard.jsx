import React from 'react';

const RequisitionBlueprintCard = ({
    skillsList = ["Python", "FastAPI", "Docker", "Kubernetes", "PostgreSQL", "Redis"],
    onRecalibrate,
    onCloneSpec,
    timestamp = '2026-10-24 18:42:01 UTC'
}) => {
    return (
        <section
            className="lg:col-span-4 bg-[#121318] text-white rounded-2xl border border-white/[0.08] p-6 sm:p-7 shadow-sm flex flex-col font-sans"
            id="RequisitionBlueprintCard"
        >
            {/* Header */}
            <div className="w-full border-b border-white/[0.08] pb-4 mb-5 flex items-center justify-between">
                <div>
                    <h4 className="text-base font-semibold text-white">Role Criteria &amp; Standards</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">Automated screening benchmarks</p>
                </div>
                <span className="text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full font-medium">
                    Active
                </span>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-5 text-sm">
                {/* Target Skills */}
                <div>
                    <div className="text-xs uppercase text-zinc-400 tracking-wider mb-2 font-medium">
                        Core Competencies Evaluated
                    </div>
                    <div className="p-3 bg-white/[0.02] rounded-xl border border-white/[0.06] flex flex-wrap gap-1.5">
                        {skillsList.map((skill, i) => (
                            <span key={i} className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.08] rounded-lg text-xs font-mono text-zinc-300">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Quality & Integrity Standards */}
                <div>
                    <div className="text-xs uppercase text-zinc-400 tracking-wider mb-2 font-medium">
                        Verification Thresholds
                    </div>
                    <div className="rounded-xl bg-white/[0.02] p-3.5 space-y-2.5 border border-white/[0.06] text-xs">
                        <div className="flex items-center gap-2 text-zinc-300 font-medium">
                            <span className="material-symbols-outlined text-emerald-400 text-[18px]">verified</span>
                            <span>Min 80% practical assessment benchmark</span>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-300 font-medium">
                            <span className="material-symbols-outlined text-emerald-400 text-[18px]">shield</span>
                            <span>Supervised proctoring integrity confirmed</span>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-300 font-medium">
                            <span className="material-symbols-outlined text-emerald-400 text-[18px]">code</span>
                            <span>Code AST &amp; GitHub history audited</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-col gap-2">
                    <button
                        onClick={onRecalibrate}
                        className="w-full py-2.5 rounded-xl bg-white text-zinc-950 font-semibold text-xs hover:bg-zinc-200 transition-colors shadow-xs cursor-pointer text-center"
                    >
                        Edit Role Criteria
                    </button>
                    <button
                        onClick={onCloneSpec}
                        className="w-full py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 font-medium text-xs border border-white/[0.08] transition-colors cursor-pointer text-center"
                    >
                        Duplicate Role
                    </button>
                </div>

                <div className="text-center text-[11px] text-zinc-500 mt-1">
                    Last updated: {timestamp}
                </div>
            </div>
        </section>
    );
};

export default RequisitionBlueprintCard;
