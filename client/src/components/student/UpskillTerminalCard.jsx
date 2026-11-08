import React from 'react';

const UpskillTerminalCard = ({ onResumeCurriculum }) => {
    return (
        <section className="bg-[#0b0b0c] rounded-md border border-white/10 flex flex-col font-mono select-none overflow-hidden" id="UpskillTerminalCard">
            <div className="p-5 sm:p-6 border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-3 bg-[#050505]">
                <div className="text-xs text-white font-semibold uppercase tracking-wider">
                    [ Curated Skill Curriculum ]
                </div>
                <span className="bg-[#111113] text-[#ededed] border border-white/20 px-2.5 py-0.5 rounded-sm text-xs font-mono">
                    [active module]
                </span>
            </div>

            <div className="p-6 sm:p-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
                <div className="space-y-3">
                    <h4 className="text-base sm:text-lg text-white font-semibold font-display">
                        Container Orchestration &amp; Asynchronous Streams
                    </h4>
                    <p className="text-xs text-[#737373] max-w-2xl leading-relaxed">
                        Curriculum derived from latest empirical evaluation. Focuses on in-memory caching patterns, non-blocking queue semantics, and latency budgeting.
                    </p>
                    
                    {/* Modern Progress Bar */}
                    <div className="pt-2 space-y-1.5 max-w-md text-xs">
                        <div className="flex justify-between text-[11px] text-[#737373]">
                            <span>Module Progress</span>
                            <span className="text-white font-mono">70%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-none bg-[#18181b] overflow-hidden">
                            <div className="h-full bg-[#ededed] transition-all duration-500" style={{ width: '70%' }}></div>
                        </div>
                    </div>
                </div>

                <div className="shrink-0 flex items-center pt-2 lg:pt-0">
                    <button
                        onClick={onResumeCurriculum}
                        className="w-full lg:w-auto bg-[#111113] hover:bg-[#1a1a1d] text-white border border-white/20 px-5 py-2.5 rounded-md text-xs font-mono transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                        type="button"
                    >
                        <span>[ Continue Curriculum ↗ ]</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default UpskillTerminalCard;
