import React from 'react';

const ActionControlStrip = ({ onStartAssessment, onReingestResume, onAccessLearning }) => {
    return (
        <section 
            className="border border-white/[0.08] bg-[#121318] rounded-xl p-5 sm:p-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 font-sans shadow-sm" 
            id="ActionControlStrip"
        >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 flex-wrap">
                <button
                    onClick={onStartAssessment}
                    className="bg-white text-zinc-950 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    type="button"
                >
                    <span className="material-symbols-outlined text-[17px]">play_circle</span>
                    <span>Take Assessment</span>
                </button>
                <button
                    onClick={onReingestResume}
                    className="bg-zinc-900 text-zinc-200 border border-zinc-700/80 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    type="button"
                >
                    <span className="material-symbols-outlined text-[17px]">upload_file</span>
                    <span>Update Resume</span>
                </button>
                <button
                    onClick={onAccessLearning}
                    className="bg-zinc-900 text-zinc-300 border border-zinc-800 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium hover:bg-zinc-800 hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    type="button"
                >
                    <span className="material-symbols-outlined text-[17px]">school</span>
                    <span>Learning Paths</span>
                </button>
            </div>
            <div className="text-xs text-zinc-400 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/[0.06] pt-3 lg:pt-0 lg:pl-6 leading-relaxed">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span className="font-medium text-white">Status: Active &amp; Verified</span>
                </div>
                <div className="text-zinc-500 mt-0.5">Eligible for Direct Fast-Track</div>
            </div>
        </section>
    );
};

export default ActionControlStrip;
