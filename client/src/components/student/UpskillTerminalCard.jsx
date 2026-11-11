import React from 'react';

const UpskillTerminalCard = ({ onResumeCurriculum }) => {
    return (
        <section className="bg-[#0D0F14] rounded-md border border-white/[0.08] border-t-white/15 flex flex-col font-mono select-none overflow-hidden" id="UpskillTerminalCard">
            <div className="p-5 sm:p-6 border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-3 bg-[#111318]">
                <div className="text-xs text-white font-semibold uppercase tracking-wider">
                    Curated Skill Curriculum
                </div>
                <span className="bg-white/[0.04] text-zinc-300 border border-white/[0.08] px-2.5 py-0.5 rounded-sm text-xs font-mono">
                    Active Module
                </span>
            </div>

            <div className="p-6 sm:p-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
                <div className="space-y-3">
                    <h4 className="text-base sm:text-lg text-white font-bold font-display">
                        Container Orchestration &amp; Asynchronous Streams
                    </h4>
                    <p className="text-xs text-[#888888] max-w-2xl leading-relaxed">
                        Curriculum derived from latest empirical evaluation. Focuses on in-memory caching patterns, non-blocking queue semantics, and latency budgeting.
                    </p>
                    
                    {/* Modern Progress Bar */}
                    <div className="pt-2 space-y-1.5 max-w-md text-xs">
                        <div className="flex justify-between text-[11px] text-[#737373]">
                            <span>Module Progress</span>
                            <span className="text-white font-mono">70%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-none bg-[#060709] border border-white/[0.08] overflow-hidden">
                            <div className="h-full bg-[#F5F5F5] transition-all duration-500" style={{ width: '70%' }}></div>
                        </div>
                    </div>
                </div>

                <div className="shrink-0 flex items-center pt-2 lg:pt-0">
                    <button
                        onClick={onResumeCurriculum}
                        className="w-full lg:w-auto bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold px-5 py-2.5 rounded-sm text-xs font-mono transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        type="button"
                    >
                        <span>Continue Curriculum</span>
                        <span aria-hidden="true">↗</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default UpskillTerminalCard;
