import React from 'react';

const UpskillTerminalCard = ({ onResumeCurriculum }) => {
    return (
        <section className="bg-white rounded-2xl border border-gray-100 flex flex-col font-sans shadow-sm overflow-hidden" id="UpskillTerminalCard">
            <div className="p-5 sm:p-6 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3 bg-gray-50/50">
                <div className="text-base text-gray-900 font-bold flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-blue-600 text-[22px]">school</span>
                    <span>Personalized Skill Upskilling</span>
                </div>
                <span className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full text-xs font-semibold">
                    In Progress
                </span>
            </div>

            <div className="p-6 sm:p-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
                <div className="space-y-3">
                    <h4 className="text-lg sm:text-xl text-gray-900 font-bold">
                        Container Orchestration &amp; Asynchronous Streams
                    </h4>
                    <p className="text-sm text-gray-600 max-w-2xl leading-relaxed">
                        Curriculum generated from your recent evaluation. Focuses on practical microservice caching, background task queues, and performance optimization.
                    </p>
                    
                    {/* Clean Modern Progress Bar */}
                    <div className="pt-2 space-y-1.5 max-w-md">
                        <div className="flex justify-between text-xs font-medium text-gray-600">
                            <span>Module Progress</span>
                            <span className="font-bold text-blue-600">70%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                            <div className="h-full rounded-full bg-blue-600 transition-all duration-500" style={{ width: '70%' }}></div>
                        </div>
                    </div>
                </div>

                <div className="shrink-0 flex items-center pt-2 lg:pt-0">
                    <button
                        onClick={onResumeCurriculum}
                        className="w-full lg:w-auto bg-blue-600 text-white px-6 py-3.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow"
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
