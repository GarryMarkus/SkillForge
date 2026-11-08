import React from 'react';

/**
 * HeroDossierCard
 * Modular candidate verification dossier card displaying empirical skill telemetry,
 * percentile benchmarking, and audited competency records without faux-terminal clutter.
 */
const HeroDossierCard = () => {
    return (
        <div className="w-full max-w-lg mx-auto lg:max-w-none bg-[#0e0e11] border border-white/[0.08] rounded-md p-6 relative overflow-hidden font-mono shadow-2xl select-none">
            {/* Header Bar */}
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-xs">
                <span className="font-display font-bold text-white tracking-tight">
                    Candidate Dossier
                </span>
                <span className="text-[#8a8a8e] text-[11px] px-2 py-0.5 rounded-sm bg-[#080809] border border-white/[0.06]">
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

            {/* Core Metric Block */}
            <div className="border-y border-white/[0.06] py-4 my-4 space-y-1.5">
                <div className="flex items-baseline gap-2.5 flex-wrap">
                    <span className="text-3xl sm:text-4xl font-display font-bold text-[#f5f5f5] tracking-tight">
                        100th
                    </span>
                    <span className="text-xs text-[#8a8a8e]">
                        Percentile · Empirical Competence
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
                        <span className="text-[11px] text-[#737373] px-1.5 py-0.25 rounded-sm border border-white/[0.08] bg-[#080809]">
                            Verified
                        </span>
                    </div>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.04]">
                    <span className="text-[#8a8a8e]">System Architecture</span>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-[#f5f5f5]">95 / 100</span>
                        <span className="text-[11px] text-[#737373] px-1.5 py-0.25 rounded-sm border border-white/[0.08] bg-[#080809]">
                            Verified
                        </span>
                    </div>
                </div>

                <div className="flex justify-between items-center py-1.5">
                    <span className="text-[#8a8a8e]">Proctor Telemetry</span>
                    <span className="font-bold text-[#f5f5f5]">Clean · Zero Anomalies</span>
                </div>
            </div>

            {/* Verified Competencies */}
            <div className="pt-3">
                <div className="text-[11px] text-[#555555] uppercase tracking-wider mb-2">
                    Verified Competencies
                </div>
                <div className="flex flex-wrap gap-1.5 text-xs text-[#cccccc]">
                    <span className="px-2 py-0.5 border border-white/[0.08] rounded-sm bg-[#080809]">
                        Python
                    </span>
                    <span className="px-2 py-0.5 border border-white/[0.08] rounded-sm bg-[#080809]">
                        FastAPI
                    </span>
                    <span className="px-2 py-0.5 border border-white/[0.08] rounded-sm bg-[#080809]">
                        PostgreSQL
                    </span>
                    <span className="px-2 py-0.5 border border-white/[0.08] rounded-sm bg-[#080809]">
                        Distributed Systems
                    </span>
                </div>
            </div>

            {/* Footer Audit Note */}
            <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#555555]">
                <span>Verification Hash: 3f8a9e · Audited</span>
                <span>SkillForge Engine</span>
            </div>
        </div>
    );
};

export default HeroDossierCard;
