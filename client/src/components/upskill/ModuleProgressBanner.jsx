import React from 'react';

const ModuleProgressBanner = ({
    topic = 'System Architecture',
    level = 'Intermediate',
    isCompleted = false,
    estimatedTime = '15 minutes',
    prerequisites = [],
    scoreBoost = '+15%'
}) => {
    return (
        <section
            className="w-full bg-[#121318] border border-white/[0.08] border-t-white/[0.15] text-white rounded-2xl p-6 sm:p-8 shadow-sm font-sans select-none"
            id="ModuleProgressBanner"
        >
            {/* Header */}
            <div className="w-full border-b border-white/[0.08] pb-4 mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 block mb-1">
                        Skill Module
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {topic}
                    </h2>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-300 border border-white/[0.08] px-3 py-1 rounded-full bg-white/[0.03] font-medium">
                        Level: {level}
                    </span>
                    <span className="text-xs text-zinc-300 border border-white/[0.08] px-3 py-1 rounded-full bg-white/[0.03] font-medium">
                        ⏱ {estimatedTime}
                    </span>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Left: Status */}
                <div className="md:col-span-5 flex flex-col gap-2 border-b md:border-b-0 md:border-r border-white/[0.08] pb-4 md:pb-0 md:pr-6">
                    <div className="text-xs font-medium text-zinc-400">
                        Completion Status
                    </div>
                    <div className="flex items-baseline gap-3 flex-wrap">
                        <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                            {isCompleted ? '100% Completed' : 'In Progress'}
                        </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div
                            className="bg-blue-500 h-full rounded-full transition-all duration-500"
                            style={{ width: isCompleted ? '100%' : '45%' }}
                        />
                    </div>
                </div>

                {/* Right: Prereqs & impact */}
                <div className="md:col-span-7 flex flex-col gap-2">
                    <div className="text-xs font-medium text-zinc-400">
                        Score Boost Potential: <span className="text-emerald-400 font-semibold">{scoreBoost}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs pt-1">
                        <span className="text-zinc-500 font-medium self-center">Prerequisites:</span>
                        {prerequisites && prerequisites.length > 0 ? (
                            prerequisites.map((p, i) => (
                                <span key={i} className="px-2.5 py-0.5 rounded-md bg-white/[0.04] text-zinc-300 text-xs font-medium border border-white/[0.08]">
                                    {p}
                                </span>
                            ))
                        ) : (
                            <span className="px-2.5 py-0.5 rounded-md bg-white/[0.04] text-zinc-300 text-xs font-medium border border-white/[0.08]">
                                General Programming Concepts
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ModuleProgressBanner;
