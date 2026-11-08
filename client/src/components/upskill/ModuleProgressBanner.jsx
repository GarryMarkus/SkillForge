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
            className="w-full bg-[#0b0b0c] border border-white/10 text-white rounded-md p-6 sm:p-7 font-mono select-none"
            id="ModuleProgressBanner"
        >
            {/* Header */}
            <div className="w-full border-b border-white/[0.06] pb-4 mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#737373] block mb-1">
                        Skill Module Specification
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
                        {topic}
                    </h2>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-[#888888] border border-white/10 px-2.5 py-1 rounded-sm bg-[#050505] font-mono">
                        Level: {level}
                    </span>
                    <span className="text-xs text-[#888888] border border-white/10 px-2.5 py-1 rounded-sm bg-[#050505] font-mono">
                        Est: {estimatedTime}
                    </span>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Left: Status */}
                <div className="md:col-span-5 flex flex-col gap-2 border-b md:border-b-0 md:border-r border-white/[0.06] pb-4 md:pb-0 md:pr-6">
                    <div className="text-xs text-[#737373]">
                        Completion Status
                    </div>
                    <div className="flex items-baseline gap-3 flex-wrap">
                        <span className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight">
                            {isCompleted ? '100% Completed' : 'In Progress'}
                        </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-[#18181b] h-1.5 rounded-none mt-2 overflow-hidden">
                        <div
                            className="bg-[#ededed] h-full transition-all duration-500"
                            style={{ width: isCompleted ? '100%' : '45%' }}
                        />
                    </div>
                </div>

                {/* Right: Prereqs & impact */}
                <div className="md:col-span-7 flex flex-col gap-2 text-xs">
                    <div className="text-[#737373]">
                        Score boost benchmark: <span className="text-white font-mono font-semibold">{scoreBoost}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="text-[#555555] self-center">Prerequisites:</span>
                        {prerequisites && prerequisites.length > 0 ? (
                            prerequisites.map((p, i) => (
                                <span key={i} className="px-2 py-0.5 rounded-sm bg-[#050505] text-[#888888] text-xs font-mono border border-white/10">
                                    {p}
                                </span>
                            ))
                        ) : (
                            <span className="px-2 py-0.5 rounded-sm bg-[#050505] text-[#888888] text-xs font-mono border border-white/10">
                                Foundational Systems Architecture
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ModuleProgressBanner;
