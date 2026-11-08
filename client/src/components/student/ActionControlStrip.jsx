import React from 'react';

const ActionControlStrip = ({ onStartAssessment, onReingestResume, onAccessLearning }) => {
    return (
        <section 
            className="border border-white/10 bg-[#0b0b0c] rounded-md p-4 sm:p-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 font-mono select-none" 
            id="ActionControlStrip"
        >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 flex-wrap">
                <button
                    onClick={onStartAssessment}
                    className="bg-[#111113] hover:bg-[#1a1a1d] text-[#f5f5f5] border border-white/20 px-4 py-2 rounded-md text-xs font-mono flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors"
                    type="button"
                >
                    <span>Take Assessment ↗</span>
                </button>
                <button
                    onClick={onReingestResume}
                    className="bg-[#050505] hover:bg-[#111113] text-[#888888] hover:text-white border border-white/10 px-4 py-2 rounded-md text-xs font-mono flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    type="button"
                >
                    <span>Update Resume</span>
                </button>
                <button
                    onClick={onAccessLearning}
                    className="bg-[#050505] hover:bg-[#111113] text-[#888888] hover:text-white border border-white/10 px-4 py-2 rounded-md text-xs font-mono flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    type="button"
                >
                    <span>Learning Paths</span>
                </button>
            </div>
            <div className="text-xs text-[#737373] flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/[0.06] pt-3 lg:pt-0 lg:pl-6 leading-relaxed">
                <div className="flex items-center gap-2">
                    <span className="text-[#ededed]">Status: Active &amp; Verified</span>
                </div>
                <div className="text-[#555555] text-[11px] mt-0.5">Eligible for direct fast-track evaluation</div>
            </div>
        </section>
    );
};

export default ActionControlStrip;
