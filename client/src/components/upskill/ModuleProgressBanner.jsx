import React from 'react';
import { Clock, TrendingUp, Layers, CheckCircle2 } from '../ui/Icons';

const ModuleProgressBanner = ({
    topic = 'System Architecture',
    level = 'Intermediate',
    isCompleted = false,
    estimatedTime = '15 minutes',
    prerequisites = [],
    scoreBoost = '+15%'
}) => {
    const pct = isCompleted ? 100 : 45;
    const radius = 22;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (pct / 100) * circumference;

    return (
        <section
            className="w-full bg-[#0D0F14] border border-white/[0.08] border-t-white/15 text-white rounded-md p-5 sm:p-6 font-mono select-none space-y-5"
            id="ModuleProgressBanner"
        >
            {/* Header Row with Visual Progress Ring */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
                <div className="flex items-center gap-4 min-w-0">
                    <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                        <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56" aria-hidden="true">
                            <circle
                                cx="28"
                                cy="28"
                                r={radius}
                                fill="none"
                                stroke="rgba(255,255,255,0.08)"
                                strokeWidth="4"
                            />
                            <circle
                                cx="28"
                                cy="28"
                                r={radius}
                                fill="none"
                                stroke={isCompleted ? '#34d399' : '#F5F5F5'}
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                strokeDashoffset={offset}
                                className="transition-all duration-500"
                            />
                        </svg>
                        <span className="absolute text-[11px] font-bold text-white">
                            {pct}%
                        </span>
                    </div>

                    <div className="min-w-0">
                        <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#8a8a8e] mb-1">
                            {isCompleted ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.75} aria-hidden="true" />
                            ) : null}
                            <span>{isCompleted ? 'Completed Guide' : 'Active Study Guide'}</span>
                        </div>
                        <h2 className="text-lg sm:text-2xl font-bold font-display text-white tracking-tight truncate">
                            {topic}
                        </h2>
                    </div>
                </div>

                {/* Compact Visual Metric Pills */}
                <div className="flex flex-wrap items-center gap-2 shrink-0 text-xs">
                    <span className="inline-flex items-center gap-1.5 text-zinc-300 border border-white/[0.08] px-2.5 py-1 rounded-sm bg-white/[0.04]">
                        <Layers className="w-3.5 h-3.5 text-[#888888]" strokeWidth={1.75} aria-hidden="true" />
                        <span>{level}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-zinc-300 border border-white/[0.08] px-2.5 py-1 rounded-sm bg-white/[0.04]">
                        <Clock className="w-3.5 h-3.5 text-[#888888]" strokeWidth={1.75} aria-hidden="true" />
                        <span>{estimatedTime}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-white font-semibold border border-white/[0.12] px-2.5 py-1 rounded-sm bg-[#111318]">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.75} aria-hidden="true" />
                        <span>{scoreBoost} Boost</span>
                    </span>
                </div>
            </div>

            {/* Compact Prerequisites Bar */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-[#71717A] text-[11px] uppercase tracking-wider">Prerequisites:</span>
                {prerequisites && prerequisites.length > 0 ? (
                    prerequisites.map((p, i) => (
                        <span key={i} className="px-2.5 py-0.5 rounded-sm bg-white/[0.04] text-zinc-300 text-xs font-mono border border-white/[0.08]">
                            {p}
                        </span>
                    ))
                ) : (
                    <span className="px-2.5 py-0.5 rounded-sm bg-white/[0.04] text-zinc-300 text-xs font-mono border border-white/[0.08]">
                        Core Engineering Fundamentals
                    </span>
                )}
            </div>
        </section>
    );
};

export default ModuleProgressBanner;
