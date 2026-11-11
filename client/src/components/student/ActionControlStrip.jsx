import React from 'react';
import {
    ShieldCheck,
    BookOpen,
    Briefcase,
    BrainCircuit,
    ArrowUpRight,
} from '../ui/Icons';

const ActionControlStrip = ({
    onStartAssessment,
    onAccessLearning,
    onViewJobs,
    onOpenPersonality,
    jobsCount = 0,
    modulesCount = 0,
}) => {
    const cards = [
        {
            title: 'Skill Test',
            subtitle: '20-min practical evaluation',
            icon: ShieldCheck,
            onClick: onStartAssessment,
            highlight: true,
        },
        {
            title: 'Learning Studio',
            subtitle: modulesCount > 0 ? `${modulesCount} guides in catalog` : 'Generate technical guides',
            icon: BookOpen,
            onClick: onAccessLearning,
        },
        {
            title: 'Matched Jobs',
            subtitle: `${jobsCount} open ${jobsCount === 1 ? 'role' : 'roles'} matched`,
            icon: Briefcase,
            onClick: onViewJobs,
        },
        {
            title: 'Work Style',
            subtitle: '4-min cadence calibration',
            icon: BrainCircuit,
            onClick: onOpenPersonality,
        },
    ];

    return (
        <section
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 font-mono select-none"
            id="ActionControlStrip"
        >
            {cards.map((card) => {
                const Icon = card.icon;
                return (
                    <button
                        key={card.title}
                        type="button"
                        onClick={card.onClick}
                        className={`group text-left p-4 rounded-md border transition-colors cursor-pointer flex items-center justify-between gap-3 ${
                            card.highlight
                                ? 'bg-[#111318] border-white/[0.12] border-t-white/25 hover:border-white/30'
                                : 'bg-[#0D0F14] border-white/[0.08] border-t-white/15 hover:border-white/20'
                        }`}
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            <div
                                className={`w-9 h-9 rounded-sm border flex items-center justify-center shrink-0 transition-colors ${
                                    card.highlight
                                        ? 'bg-[#F5F5F5] border-white text-[#050505]'
                                        : 'bg-[#060709] border-white/[0.08] text-zinc-300 group-hover:text-white group-hover:border-white/20'
                                }`}
                            >
                                <Icon className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                            </div>
                            <div className="min-w-0">
                                <div className="text-xs font-display font-bold text-white truncate">
                                    {card.title}
                                </div>
                                <div className="text-[11px] text-[#888888] truncate mt-0.5">
                                    {card.subtitle}
                                </div>
                            </div>
                        </div>

                        <ArrowUpRight
                            className="w-4 h-4 text-[#71717A] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
                            strokeWidth={1.75}
                            aria-hidden="true"
                        />
                    </button>
                );
            })}
        </section>
    );
};

export default ActionControlStrip;
