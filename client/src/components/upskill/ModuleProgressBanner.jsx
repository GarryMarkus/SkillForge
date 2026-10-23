import React from 'react';

const ModuleProgressBanner = ({
    topic = 'SYSTEM_ARCHITECTURE',
    level = 'INTERMEDIATE',
    isCompleted = false,
    estimatedTime = '15_MINUTES',
    prerequisites = [],
    scoreBoost = '+15%'
}) => {
    return (
        <section
            className="w-full bg-primary-container text-on-primary border border-primary p-0 relative shadow-none font-mono select-none"
            id="ModuleProgressBanner"
        >
            {/* Blueprint Corner Crosshairs */}
            <div className="absolute top-1 left-1 text-on-primary/40 font-mono text-[10px] pointer-events-none">+</div>
            <div className="absolute top-1 right-1 text-on-primary/40 font-mono text-[10px] pointer-events-none">+</div>
            <div className="absolute bottom-1 left-1 text-on-primary/40 font-mono text-[10px] pointer-events-none">+</div>
            <div className="absolute bottom-1 right-1 text-on-primary/40 font-mono text-[10px] pointer-events-none">+</div>

            {/* Banner Section Header */}
            <div className="w-full border-b border-white/20 px-space-md py-space-sm bg-primary/40 flex flex-wrap items-center justify-between gap-2">
                <div className="font-headline-sm text-headline-sm text-on-primary uppercase tracking-tight flex items-center gap-2 font-bold">
                    <span className="text-on-primary font-bold">+</span>
                    <span>[ ADAPTIVE_CURRICULUM_SPECIFICATION // CAD_UP_901 ]</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-label-sm font-label-sm text-on-primary/80 border border-white/30 px-1.5 py-0.5 font-bold uppercase">
                        LEVEL: {level?.toUpperCase() || 'INTERMEDIATE'}
                    </span>
                    <span className="text-label-sm font-label-sm text-on-primary/80 border border-white/30 px-1.5 py-0.5 font-bold uppercase">
                        EST_READ: {estimatedTime}
                    </span>
                </div>
            </div>

            {/* Banner Content Grid */}
            <div className="p-space-md grid grid-cols-1 md:grid-cols-12 gap-space-md items-center">
                {/* Left: Completion Status Gauge (5 Cols) */}
                <div className="md:col-span-5 flex flex-col gap-2 border-b md:border-b-0 md:border-r border-white/20 pb-space-sm md:pb-0 md:pr-space-md">
                    <div className="text-label-sm font-label-sm uppercase text-on-primary/75 tracking-wider font-bold">
                        // CURRICULUM_COMPLETION_INDEX
                    </div>
                    <div className="flex items-baseline gap-3">
                        <span className="font-headline-lg text-headline-lg font-bold text-white tracking-tighter">
                            [ {isCompleted ? '100%' : 'IN_PROGRESS'} ]
                        </span>
                        <span className={`text-label-sm font-label-sm px-1.5 py-0.5 border font-bold uppercase ${
                            isCompleted
                                ? 'bg-white text-primary-container border-white'
                                : 'bg-primary-fixed/20 text-white border-white/40'
                        }`}>
                            {isCompleted ? 'VERIFIED_COMPLETED' : 'TRAINING_ENGAGED'}
                        </span>
                    </div>
                    {/* Inline Progress Bar */}
                    <div className="w-full bg-white/20 h-1.5 mt-1 border border-white/30">
                        <div
                            className="bg-white h-full transition-all duration-500"
                            style={{ width: isCompleted ? '100%' : '45%' }}
                        />
                    </div>
                </div>

                {/* Right: Target Deficit Gap Addressal (7 Cols) */}
                <div className="md:col-span-7 flex flex-col gap-2">
                    <div className="text-label-sm font-label-sm uppercase text-on-primary/75 tracking-wider font-bold">
                        // TARGET_SKILL_DEFICIT_ADDRESSAL
                    </div>
                    <div className="text-body-sm font-body-sm text-on-primary leading-relaxed font-bold">
                        TOPIC: <span className="underline uppercase">{topic}</span> // BENCHMARK_SCORE_POTENTIAL: {scoreBoost}
                    </div>
                    <div className="flex flex-wrap gap-1.5 text-label-sm font-label-sm pt-1">
                        <span className="text-on-primary/75 font-bold mr-1">PREREQUISITES:</span>
                        {prerequisites && prerequisites.length > 0 ? (
                            prerequisites.map((p, i) => (
                                <span key={i} className="border border-white/40 px-1 py-0.5 bg-white/10 font-bold uppercase">
                                    [{p}]
                                </span>
                            ))
                        ) : (
                            <span className="border border-white/40 px-1 py-0.5 bg-white/10 font-bold uppercase">
                                [PYTHON_CORE_FOUNDATIONS]
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Micro Coordinate Base Stamp */}
            <div className="w-full bg-primary/80 border-t border-white/20 px-space-md py-1 flex items-center justify-between text-[9px] text-on-primary/70">
                <span>SPEC_LAYER: ADAPTIVE_LEARNING_ENGINE_V3 // BUFFER: HARDENED</span>
                <span>TELEMETRY_CLOCK: REALTIME_DISPATCH</span>
            </div>
        </section>
    );
};

export default ModuleProgressBanner;
