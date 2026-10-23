import React from 'react';

const ActionControlStrip = ({ onStartAssessment, onReingestResume, onAccessLearning }) => {
    return (
        <section 
            className="border border-cad bg-surface-container-low p-space-md flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md font-mono" 
            id="ActionControlStrip"
        >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-sm flex-wrap">
                <button
                    onClick={onStartAssessment}
                    className="bg-canvas-blueprint text-white px-space-lg py-2.5 font-label-md text-label-md uppercase tracking-wider font-bold border border-canvas-blueprint hover:bg-primary transition-none flex items-center justify-center gap-2 cursor-pointer shadow-[2px_2px_0px_#0A0A0A]"
                    type="button"
                >
                    <span>[ INITIALIZE_PROCTORED_ASSESSMENT_SESSION -&gt; ]</span>
                </button>
                <button
                    onClick={onReingestResume}
                    className="bg-surface-container-lowest text-ink-primary px-space-md py-2.5 font-label-md text-label-md uppercase tracking-wider font-bold border border-cad hover:bg-surface-container-highest transition-none flex items-center justify-center gap-2 cursor-pointer"
                    type="button"
                >
                    <span>[ RE-INGEST_UPDATED_RESUME_PDF ]</span>
                </button>
                <button
                    onClick={onAccessLearning}
                    className="bg-surface-container-lowest text-canvas-blueprint px-space-md py-2.5 font-label-md text-label-md uppercase tracking-wider font-bold border border-canvas-blueprint hover:bg-canvas-blueprint hover:text-white transition-none flex items-center justify-center gap-2 cursor-pointer"
                    type="button"
                >
                    <span>[ ACCESS_LEARNING_PIPELINE ]</span>
                </button>
            </div>
            <div className="font-label-sm text-label-sm text-on-surface-variant flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-cad pt-space-xs lg:pt-0 lg:pl-space-md leading-relaxed">
                <div><span>LAST_DIAGNOSTIC_RUN:</span> <strong className="text-ink-primary">2026-10-21</strong></div>
                <div><span>NEXT_PERMITTED_RUN:</span> <strong className="text-canvas-blueprint font-bold">IMMEDIATE</strong> // <span>LATENCY_TOLERANCE:</span> <strong>15ms</strong></div>
            </div>
        </section>
    );
};

export default ActionControlStrip;
