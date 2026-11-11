import React from 'react';
import { SlidersHorizontal, CheckCircle2, Edit3, Copy, Tag } from 'lucide-react';

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
            <div className="w-full border-b border-white/[0.06] pb-3.5 mb-4 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                    <SlidersHorizontal className="w-4 h-4 text-zinc-300 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Role Requirements</h4>
                        <p className="text-[11px] text-[#888888] mt-0.5">Active screening thresholds</p>
                    </div>
                </div>
                <span className="text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 rounded-sm shrink-0">
                    Active
                </span>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-4 text-xs font-mono">
                {/* Target Skills */}
                <div>
                    <div className="inline-flex items-center gap-1.5 text-[11px] uppercase text-[#8a8a8e] tracking-wider mb-2">
                        <Tag className="w-3 h-3" strokeWidth={1.75} aria-hidden="true" />
                        <span>Required Skills</span>
                    </div>
                    <div className="p-3 bg-[#060709] rounded-sm border border-white/[0.08] flex flex-wrap gap-1.5">
                        {skillsList.map((skill, i) => (
                            <span key={i} className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.08] rounded-sm text-xs font-mono text-zinc-200">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Quality & Integrity Standards */}
                <div>
                    <div className="text-[11px] uppercase text-[#8a8a8e] tracking-wider mb-2">
                        Quality Checks
                    </div>
                    <div className="rounded-sm bg-[#060709] p-3 space-y-2 border border-white/[0.08] text-xs text-zinc-300">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                            <span>80%+ verified exam score</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                            <span>Clean camera proctoring check</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                            <span>Verified profile &amp; GitHub history</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-col gap-2">
                    <button
                        type="button"
                        onClick={onRecalibrate}
                        className="w-full py-2.5 rounded-sm bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold text-xs font-mono transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5"
                    >
                        <Edit3 className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                        <span>Post / Update Role</span>
                    </button>
                    <button
                        type="button"
                        onClick={onCloneSpec}
                        className="w-full py-2 rounded-sm bg-[#121316] text-[#E4E4E7] hover:text-white border border-white/10 hover:border-white/20 text-xs font-mono transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5"
                    >
                        <Copy className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                        <span>Duplicate Role</span>
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
