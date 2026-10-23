import React from 'react';

const UpskillTerminalCard = ({ onResumeCurriculum }) => {
    return (
        <section className="border border-black/20 bg-surface-container-lowest flex flex-col font-mono shadow-[4px_4px_0px_#0A0A0A]" id="UpskillTerminalCard">
            <div className="p-4 sm:p-6 border-b border-black/15 flex flex-wrap items-center justify-between gap-2 bg-surface-container-low">
                <div className="text-sm text-ink-primary font-bold flex items-center gap-2">
                    <span className="text-canvas-blueprint font-bold">[&gt;]</span>
                    <span>[ ADAPTIVE LEARNING PIPELINE // DEFICIT CALIBRATION ]</span>
                </div>
                <span className="border border-canvas-blueprint bg-canvas-blueprint/10 text-canvas-blueprint px-2.5 py-0.5 text-xs font-bold uppercase">
                    [ MODULE STATUS: ACTIVE ]
                </span>
            </div>

            <div className="p-6 sm:p-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
                <div className="space-y-2">
                    <div className="text-lg sm:text-xl text-ink-primary font-bold">
                        MODULE 04: CONTAINER ORCHESTRATION &amp; REDIS STREAMING
                    </div>
                    <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl leading-relaxed">
                        Curriculum automatically generated from SkillTestAttempt gap analysis. Targets microservice queue bottlenecks and asynchronous telemetry processing.
                    </p>
                    <div className="pt-2 text-xs sm:text-sm text-ink-primary font-bold">
                        PROGRESS: <span className="text-canvas-blueprint font-bold">[██████████████░░░░░░] 70% COMPLETE</span>
                    </div>
                </div>
                <div className="shrink-0 flex items-center">
                    <button
                        onClick={onResumeCurriculum}
                        className="w-full lg:w-auto bg-canvas-blueprint text-white px-6 py-3.5 text-xs sm:text-sm uppercase font-bold border-2 border-canvas-blueprint hover:bg-black transition-none flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_#0A0A0A]"
                        type="button"
                    >
                        <span>[ RESUME CURRICULUM STREAM → ]</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default UpskillTerminalCard;
