import React from 'react';
import { Compass, Bug, Gauge, Clock, Layers, ShieldCheck, ArrowLeft, ArrowUpRight, BrainCircuit } from '../ui/Icons';

const PersonalityIntroCard = ({ onStart, onReturn }) => {
    const pillars = [
        {
            icon: Compass,
            title: 'Work Style',
            desc: 'How you scope features and weigh architectural trade-offs.',
        },
        {
            icon: Bug,
            title: 'Debugging Approach',
            desc: 'How you isolate issues, read logs, and unblock builds.',
        },
        {
            icon: Gauge,
            title: 'Study Pace',
            desc: 'Tunes guide depth across Accelerated, Optimal, or In-Depth tracks.',
        },
    ];

    return (
        <div className="relative w-full max-w-3xl mx-auto space-y-6 font-mono select-none" id="PersonalityIntroCard">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"
            />
            {/* Main Briefing Container */}
            <div className="relative bg-[#111318] rounded-md border border-white/[0.08] border-t-white/15 p-6 sm:p-8 text-[#ededed] shadow-2xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
                    <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-sm bg-[#060709] border border-white/15 flex items-center justify-center shrink-0">
                            <BrainCircuit className="w-5 h-5 text-white" strokeWidth={1.75} aria-hidden="true" />
                        </div>
                        <div>
                            <span className="text-[11px] font-mono uppercase tracking-wider text-[#8a8a8e] block mb-1">
                                Work Style Check
                            </span>
                            <h1 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white">
                                Engineering Style &amp; Pace
                            </h1>
                            <p className="text-xs text-[#888888] mt-1">
                                Answer 7 quick workflow questions so SkillForge tailors study guides to you.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quick Metric Pills */}
                <div className="grid grid-cols-3 gap-2.5 text-xs">
                    <div className="flex items-center gap-2 p-2.5 rounded-sm bg-[#060709] border border-white/[0.08] text-zinc-200">
                        <Layers className="w-3.5 h-3.5 text-[#888888] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                        <span>7 Scenarios</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 rounded-sm bg-[#060709] border border-white/[0.08] text-zinc-200">
                        <Clock className="w-3.5 h-3.5 text-[#888888] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                        <span>~3 Minutes</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 rounded-sm bg-[#060709] border border-white/[0.08] text-zinc-200">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                        <span>No Trick Items</span>
                    </div>
                </div>

                {/* 3 Visual Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {pillars.map((pillar) => {
                        const Icon = pillar.icon;
                        return (
                            <div key={pillar.title} className="bg-[#060709] rounded-sm border border-white/[0.08] p-4 space-y-2">
                                <div className="w-8 h-8 rounded-sm bg-[#111318] border border-white/[0.08] flex items-center justify-center">
                                    <Icon className="w-4 h-4 text-white" strokeWidth={1.75} aria-hidden="true" />
                                </div>
                                <h4 className="font-semibold text-xs text-[#f5f5f5]">
                                    {pillar.title}
                                </h4>
                                <p className="text-[11px] text-[#737373] leading-relaxed">
                                    {pillar.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Actions */}
                <div className="pt-5 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
                    <button
                        type="button"
                        onClick={onReturn}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[#121316] border border-white/10 text-xs font-mono text-[#E4E4E7] hover:text-white hover:border-white/20 transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                        <span>Dashboard</span>
                    </button>

                    <button
                        type="button"
                        onClick={onStart}
                        className="inline-flex items-center gap-1.5 bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold px-6 py-2.5 rounded-sm text-xs sm:text-sm font-mono transition-colors cursor-pointer"
                    >
                        <span>Begin Check</span>
                        <ArrowUpRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PersonalityIntroCard;
