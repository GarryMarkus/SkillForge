import React from 'react';
import { ShieldCheck } from '../../ui/Icons';

/**
 * HeroDossierCard
 * Modular candidate verification dossier card displaying empirical skill telemetry,
 * percentile benchmarking, and audited competency records on an elevated surface panel.
 */
const HeroDossierCard = () => {
    const competencies = ['Python', 'FastAPI', 'PostgreSQL', 'Distributed Systems'];

    return (
        <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
            {/* Faint radial backlight to lift the elevated card off the base canvas */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"
            />

            <div className="relative bg-[#111318] border border-white/[0.08] border-t-white/15 rounded-md p-6 overflow-hidden font-mono shadow-2xl select-none">
                {/* Header Bar */}
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-xs">
                    <span className="font-display font-bold text-white tracking-tight">
                        Candidate Dossier
                    </span>
                    <span className="text-[#8a8a8e] text-[11px] px-2 py-0.5 rounded-sm bg-white/[0.04] border border-white/[0.08]">
                        ID 8F29-ALX
                    </span>
                </div>

                {/* Candidate Identity */}
                <div className="pt-4">
                    <div className="text-base font-bold font-display text-[#f5f5f5]">
                        Alex Rivera
                    </div>
                    <div className="text-xs text-[#737373]">
                        Systems &amp; Backend Engineering
                    </div>
                </div>

                {/* Core Metric Block (Vertically Stacked) */}
                <div className="border-y border-white/[0.06] py-4 my-4 space-y-2">
                    <div className="flex flex-col">
                        <span className="text-3xl sm:text-4xl font-display font-bold text-[#f5f5f5] tracking-tight leading-none">
                            100th
                        </span>
                        <span className="text-xs text-[#888888] tracking-wider uppercase mt-1">
                            PERCENTILE · EMPIRICAL COMPETENCE
                        </span>
                    </div>
                    <p className="text-xs text-[#737373] leading-relaxed">
                        Evaluated across sandboxed coding challenges, AST analysis, and commit telemetry.
                    </p>
                </div>

                {/* Verification Rows */}
                <div className="space-y-1 py-1 text-xs">
                    <div className="flex justify-between items-center py-1.5 border-b border-white/[0.04]">
                        <span className="text-[#8a8a8e]">Problem Solving</span>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-[#f5f5f5]">98 / 100</span>
                            <span className="text-[11px] text-zinc-400 px-1.5 py-0.5 rounded-sm border border-white/[0.08] bg-white/[0.04]">
                                Verified
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center py-1.5 border-b border-white/[0.04]">
                        <span className="text-[#8a8a8e]">System Architecture</span>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-[#f5f5f5]">95 / 100</span>
                            <span className="text-[11px] text-zinc-400 px-1.5 py-0.5 rounded-sm border border-white/[0.08] bg-white/[0.04]">
                                Verified
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center py-1.5">
                        <span className="text-[#8a8a8e]">Proctor Telemetry</span>
                        <span className="font-bold text-[#f5f5f5]">Clean · Zero Anomalies</span>
                    </div>
                </div>

                {/* Verified Competencies Micro-Badges */}
                <div className="pt-3">
                    <div className="text-[11px] text-zinc-500 uppercase tracking-wider mb-2">
                        Verified Competencies
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {competencies.map((tag) => (
                            <span
                                key={tag}
                                className="bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 text-xs text-zinc-300 rounded-sm font-mono"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Footer Audit Note */}
                <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#71717A]">
                    <span className="inline-flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#71717A]" strokeWidth={1.5} aria-hidden="true" />
                        <span>Verification Hash: 3f8a9e · Audited</span>
                    </span>
                    <span>SkillForge Engine</span>
                </div>
            </div>
        </div>
    );
};

export default HeroDossierCard;
