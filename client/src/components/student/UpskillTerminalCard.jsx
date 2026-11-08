import React from 'react';

const UpskillTerminalCard = ({ onResumeCurriculum }) => {
    return (
        <section className="bg-[#121318] rounded-2xl border border-white/[0.08] flex flex-col font-sans overflow-hidden" id="UpskillTerminalCard">
            <div className="p-5 sm:p-6 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-3 bg-white/[0.02]">
                <div className="text-base text-white font-semibold flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-blue-400 text-[20px]">school</span>
                    <span>Curated Skill Path</span>
                </div>
                <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-medium">
                    Active Module
                </span>
            </div>

            <div className="p-6 sm:p-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
                <div className="space-y-3">
                    <h4 className="text-lg sm:text-xl text-white font-semibold">
                        Container Orchestration &amp; Asynchronous Streams
                    </h4>
                    <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
                        Curriculum generated from your recent evaluation. Focuses on practical microservice caching, background task queues, and performance optimization.
                    </p>
                    
                    {/* Modern Progress Bar */}
                    <div className="pt-2 space-y-1.5 max-w-md">
                        <div className="flex justify-between text-xs font-medium text-zinc-400">
                            <span>Module Progress</span>
                            <span className="font-semibold text-blue-400">70%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                            <div className="h-full rounded-full bg-blue-500 transition-all duration-500" style={{ width: '70%' }}></div>
                        </div>
                    </div>
                </div>

                <div className="shrink-0 flex items-center pt-2 lg:pt-0">
                    <button
                        onClick={onResumeCurriculum}
                        className="w-full lg:w-auto bg-white text-zinc-950 px-6 py-3 rounded-xl text-sm font-semibold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                        type="button"
                    >
                        <span>Continue Learning</span>
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default UpskillTerminalCard;
