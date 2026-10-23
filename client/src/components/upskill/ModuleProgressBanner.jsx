import React from 'react';

const ModuleProgressBanner = ({
    topic = 'SYSTEM ARCHITECTURE',
    level = 'INTERMEDIATE',
    isCompleted = false,
    estimatedTime = '15 MINUTES',
    prerequisites = [],
    scoreBoost = '+15%'
}) => {
    return (
        <section
            className="w-full bg-canvas-blueprint text-white border border-primary p-6 sm:p-8 shadow-[4px_4px_0px_#0A0A0A] font-mono select-none"
            id="ModuleProgressBanner"
        >
            {/* Banner Section Header */}
            <div className="w-full border-b border-white/20 pb-3 mb-5 flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs uppercase tracking-wider text-white flex items-center gap-2 font-bold">
                    <span>+</span>
                    <span>[ ADAPTIVE CURRICULUM SPECIFICATION ]</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[11px] text-white/90 border border-white/30 px-2 py-0.5 bg-white/10 font-bold uppercase">
                        LEVEL: {level?.toUpperCase() || 'INTERMEDIATE'}
                    </span>
                    <span className="text-[11px] text-white/90 border border-white/30 px-2 py-0.5 bg-white/10 font-bold uppercase">
                        EST READ: {estimatedTime}
                    </span>
                </div>
            </div>

            {/* Banner Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Left: Completion Status Gauge (5 Cols) */}
                <div className="md:col-span-5 flex flex-col gap-2 border-b md:border-b-0 md:border-r border-white/20 pb-4 md:pb-0 md:pr-6">
                    <div className="text-[11px] uppercase text-white/80 tracking-wider font-bold">
                        // CURRICULUM COMPLETION INDEX
                    </div>
                    <div className="flex items-baseline gap-3 flex-wrap">
                        <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                            [ {isCompleted ? '100%' : 'IN PROGRESS'} ]
                        </span>
                        <span className={`text-[11px] px-2 py-0.5 border font-bold uppercase ${
                            isCompleted
                                ? 'bg-white text-canvas-blueprint border-white'
                                : 'bg-white/10 text-white border-white/40'
                        }`}>
                            {isCompleted ? 'VERIFIED' : 'ACTIVE TRAINING'}
                        </span>
                    </div>
                    {/* Inline Progress Bar */}
                    <div className="w-full bg-white/20 h-2 mt-2 border border-white/30">
                        <div
                            className="bg-white h-full transition-all duration-500"
                            style={{ width: isCompleted ? '100%' : '45%' }}
                        />
                    </div>
                </div>

                {/* Right: Target Deficit Gap Addressal (7 Cols) */}
                <div className="md:col-span-7 flex flex-col gap-2">
                    <div className="text-[11px] uppercase text-white/80 tracking-wider font-bold">
                        // TARGET SKILL DEFICIT ADDRESSAL
                    </div>
                    <div className="text-xs sm:text-sm text-white leading-relaxed font-bold">
                        TOPIC: <span className="underline uppercase">{topic}</span> // SCORE POTENTIAL: {scoreBoost}
                    </div>
                    <div className="flex flex-wrap gap-1.5 text-xs pt-1">
                        <span className="text-white/80 font-bold mr-1">PREREQUISITES:</span>
                        {prerequisites && prerequisites.length > 0 ? (
                            prerequisites.map((p, i) => (
                                <span key={i} className="border border-white/40 px-2 py-0.5 bg-white/10 font-bold uppercase text-[11px]">
                                    [{p}]
                                </span>
                            ))
                        ) : (
                            <span className="border border-white/40 px-2 py-0.5 bg-white/10 font-bold uppercase text-[11px]">
                                [SYSTEM ARCHITECTURE FOUNDATIONS]
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ModuleProgressBanner;
