import React from 'react';

const ActionControlStrip = ({ onStartAssessment, onReingestResume, onAccessLearning }) => {
    return (
        <section 
            className="border border-white/[0.08] border-t-white/15 bg-[#0D0F14] rounded-md p-4 sm:p-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 font-mono select-none" 
            id="ActionControlStrip"
        >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 flex-wrap">
                <button
                    onClick={onStartAssessment}
                    className="bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold px-4 py-2 rounded-sm text-xs font-mono flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    type="button"
                >
                    <span>Take Assessment</span>
                    <span aria-hidden="true">↗</span>
                </button>
                <button
                    onClick={onReingestResume}
                    className="bg-[#121316] text-[#E4E4E7] hover:text-white border border-white/10 hover:border-white/20 px-4 py-2 rounded-sm text-xs font-mono flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    type="button"
                >
                    <span>Update Resume</span>
                </button>
                <button
                    onClick={onAccessLearning}
                    className="bg-[#121316] text-[#E4E4E7] hover:text-white border border-white/10 hover:border-white/20 px-4 py-2 rounded-sm text-xs font-mono flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    type="button"
                >
                    <span>Learning Paths</span>
                </button>
            </div>
            <div className="text-xs text-[#888888] flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/[0.06] pt-3 lg:pt-0 lg:pl-6 leading-relaxed">
                <div className="flex items-center gap-2">
                    <span className="text-[#ededed] font-medium">Active &amp; Verified Profile</span>
                </div>
                <div className="text-[#71717A] text-[11px] mt-0.5">Eligible for direct fast-track evaluation</div>
            </div>
        </section>
    );
};

export default ActionControlStrip;
