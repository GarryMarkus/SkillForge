import React from 'react';
import { MagneticButton } from '../ui/animations';

const ActionControlStrip = ({ onStartAssessment, onReingestResume, onAccessLearning }) => {
    return (
        <section 
            className="border border-black/20 bg-surface-container-low p-4 sm:p-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 font-mono shadow-[3px_3px_0px_#0A0A0A]" 
            id="ActionControlStrip"
        >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 flex-wrap">
                <MagneticButton strength={0.2} maxDisplacement={6}>
                    <button
                        onClick={onStartAssessment}
                        className="bg-canvas-blueprint text-white px-6 py-3.5 text-xs sm:text-sm uppercase tracking-wider font-bold border-2 border-canvas-blueprint hover:bg-black transition-none flex items-center justify-center gap-2 cursor-pointer shadow-[2px_2px_0px_#0A0A0A]"
                        type="button"
                    >
                        <span>[ START PROCTORED ASSESSMENT → ]</span>
                    </button>
                </MagneticButton>
                <MagneticButton strength={0.15} maxDisplacement={5}>
                    <button
                        onClick={onReingestResume}
                        className="bg-surface-container-lowest text-ink-primary px-6 py-3.5 text-xs sm:text-sm uppercase tracking-wider font-bold border-2 border-black/25 hover:bg-black hover:text-white transition-none flex items-center justify-center gap-2 cursor-pointer"
                        type="button"
                    >
                        <span>[ UPDATE RESUME TELEMETRY ]</span>
                    </button>
                </MagneticButton>
                <MagneticButton strength={0.15} maxDisplacement={5}>
                    <button
                        onClick={onAccessLearning}
                        className="bg-surface-container-lowest text-canvas-blueprint px-6 py-3.5 text-xs sm:text-sm uppercase tracking-wider font-bold border-2 border-canvas-blueprint hover:bg-canvas-blueprint hover:text-white transition-none flex items-center justify-center gap-2 cursor-pointer"
                        type="button"
                    >
                        <span>[ ADAPTIVE UPSKILLING ]</span>
                    </button>
                </MagneticButton>
            </div>
            <div className="text-xs text-on-surface-variant flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-black/15 pt-3 lg:pt-0 lg:pl-6 leading-relaxed">
                <div><span>EVALUATION STATUS:</span> <strong className="text-canvas-blueprint font-bold">READY</strong></div>
                <div className="text-outline">CANDIDATE DISPATCH ELIGIBLE</div>
            </div>
        </section>
    );
};

export default ActionControlStrip;
