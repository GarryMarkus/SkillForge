import React from 'react';

const UpskillTerminalCard = ({ onResumeCurriculum }) => {
    return (
        <section className="border border-cad bg-surface-container-lowest flex flex-col font-mono" id="UpskillTerminalCard">
            <div className="p-space-md border-b border-cad flex flex-wrap items-center justify-between gap-space-xs bg-surface-container-low">
                <div className="font-label-md text-label-md text-ink-primary font-bold flex items-center gap-space-xs">
                    <span className="text-canvas-blueprint font-bold">[&gt;]</span>
                    <span>[ ADAPTIVE_LEARNING_PIPELINE // DEFICIT_CALIBRATION ]</span>
                </div>
                <div className="font-label-sm text-label-sm border border-canvas-blueprint text-canvas-blueprint px-2 py-0.5 font-bold">
                    [STATUS: ACTIVE_STREAM]
                </div>
            </div>

            <div className="p-space-md md:p-space-lg flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-lg">
                <div className="space-y-space-xs">
                    <div className="font-headline-sm text-headline-sm text-ink-primary font-bold">
                        MODULE_04: CONTAINER_ORCHESTRATION_&amp;_REDIS_STREAMING
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                        Generated based on SkillTestAttempt gap analysis. Targets microservice queue bottlenecks.
                    </p>
                    <div className="pt-2 font-body-sm text-body-sm text-ink-primary">
                        PROGRESS: <strong className="text-canvas-blueprint font-bold">[██████████████░░░░░░] 70% COMPLETE</strong>
                    </div>
                </div>
                <div className="shrink-0 flex items-center">
                    <button
                        onClick={onResumeCurriculum}
                        className="w-full lg:w-auto bg-canvas-blueprint text-white px-space-lg py-3 font-label-md text-label-md uppercase font-bold border border-canvas-blueprint hover:bg-surface-container-lowest hover:text-canvas-blueprint transition-none flex items-center justify-center gap-2 cursor-pointer shadow-[2px_2px_0px_#0A0A0A]"
                        type="button"
                    >
                        <span>[ RESUME_CURRICULUM_STREAM -&gt; ]</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default UpskillTerminalCard;
