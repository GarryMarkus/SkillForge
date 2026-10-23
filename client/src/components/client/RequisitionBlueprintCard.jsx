import React from 'react';

const RequisitionBlueprintCard = ({
    skillsList = ["Python", "FastAPI", "Docker", "Kubernetes", "PostgreSQL", "Redis"],
    onRecalibrate,
    onCloneSpec,
    timestamp = '2026-10-24 18:42:01 UTC'
}) => {
    return (
        <section
            className="lg:col-span-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-6 sm:p-7 shadow-sm flex flex-col font-sans"
            id="RequisitionBlueprintCard"
        >
            {/* Header */}
            <div className="w-full border-b border-white/20 pb-4 mb-5 flex items-center justify-between">
                <div>
                    <h4 className="text-base font-bold text-white">Role Criteria &amp; Standards</h4>
                    <p className="text-xs text-blue-100 mt-0.5">Automated screening benchmarks</p>
                </div>
                <span className="text-xs text-white bg-white/20 px-2.5 py-0.5 rounded-full font-semibold">
                    Active
                </span>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-5 text-sm">
                {/* Target Skills */}
                <div>
                    <div className="text-xs uppercase text-blue-200 tracking-wider mb-2 font-semibold">
                        Core Competencies Evaluated
                    </div>
                    <div className="p-3 bg-white/10 rounded-xl border border-white/20 flex flex-wrap gap-1.5">
                        {skillsList.map((skill, i) => (
                            <span key={i} className="px-2.5 py-1 bg-white/20 rounded-lg text-xs font-medium text-white">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Quality & Integrity Standards */}
                <div>
                    <div className="text-xs uppercase text-blue-200 tracking-wider mb-2 font-semibold">
                        Verification Thresholds
                    </div>
                    <div className="rounded-xl bg-white/10 p-3.5 space-y-2.5 border border-white/20 text-xs">
                        <div className="flex items-center gap-2 text-white font-medium">
                            <span className="material-symbols-outlined text-emerald-300 text-[18px]">verified</span>
                            <span>Min 80% practical assessment benchmark</span>
                        </div>
                        <div className="flex items-center gap-2 text-white font-medium">
                            <span className="material-symbols-outlined text-emerald-300 text-[18px]">shield</span>
                            <span>Supervised proctoring integrity confirmed</span>
                        </div>
                        <div className="flex items-center gap-2 text-white font-medium">
                            <span className="material-symbols-outlined text-emerald-300 text-[18px]">code</span>
                            <span>Code AST &amp; GitHub history audited</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-col gap-2">
                    <button
                        onClick={onRecalibrate}
                        className="w-full py-2.5 rounded-xl bg-white text-blue-700 font-semibold text-xs hover:bg-blue-50 transition-colors shadow-xs cursor-pointer text-center"
                    >
                        Edit Role Criteria
                    </button>
                    <button
                        onClick={onCloneSpec}
                        className="w-full py-2.5 rounded-xl bg-blue-700/60 hover:bg-blue-700 text-white font-semibold text-xs border border-white/20 transition-colors cursor-pointer text-center"
                    >
                        Duplicate Role
                    </button>
                </div>

                <div className="text-center text-[11px] text-blue-200 mt-1">
                    Last updated: {timestamp}
                </div>
            </div>
        </section>
    );
};

export default RequisitionBlueprintCard;
