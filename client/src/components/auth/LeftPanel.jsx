import React from 'react';

const LeftPanel = () => {
    return (
        <div className="w-full h-full flex flex-col justify-between font-sans select-none text-zinc-100">
            {/* Top Brand */}
            <div>
                <div className="flex items-center gap-2.5 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-sm text-white shadow-sm">
                        SF
                    </span>
                    <span className="text-xl font-bold tracking-tight text-white">SkillForge</span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                    Connecting capable engineers with high-growth teams through verified technical ability, not resume keywords.
                </p>
            </div>

            {/* Feature List */}
            <div className="space-y-4 my-auto py-8">
                <div className="bg-[#121318] rounded-xl p-6 border border-white/[0.08] space-y-4 shadow-sm">
                    <h3 className="text-xs uppercase font-semibold text-blue-400 tracking-wider">
                        The SkillForge Standard
                    </h3>

                    <div className="space-y-4 text-sm">
                        <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-md bg-zinc-800 flex items-center justify-center text-xs font-semibold text-zinc-300 shrink-0 mt-0.5">
                                1
                            </span>
                            <div>
                                <strong className="font-semibold block text-white">Direct Skill Matching</strong>
                                <span className="text-zinc-400 text-xs leading-relaxed block mt-0.5">
                                    Matches candidates to real jobs based on verified technical abilities and real code contributions.
                                </span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-md bg-zinc-800 flex items-center justify-center text-xs font-semibold text-zinc-300 shrink-0 mt-0.5">
                                2
                            </span>
                            <div>
                                <strong className="font-semibold block text-white">Fair &amp; Standardized Evaluations</strong>
                                <span className="text-zinc-400 text-xs leading-relaxed block mt-0.5">
                                    20-minute sandboxed scenarios evaluate what you can actually build and debug under realistic conditions.
                                </span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-md bg-zinc-800 flex items-center justify-center text-xs font-semibold text-zinc-300 shrink-0 mt-0.5">
                                3
                            </span>
                            <div>
                                <strong className="font-semibold block text-white">Actionable Skill Feedback</strong>
                                <span className="text-zinc-400 text-xs leading-relaxed block mt-0.5">
                                    Transparent performance rubrics pinpoint specific technical growth areas and recommended curricula.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-[#121318] rounded-lg p-3.5 border border-white/[0.08]">
                        <span className="text-zinc-400 block mb-0.5 font-medium">Verified Hires</span>
                        <strong className="text-lg text-white font-bold">12,400+</strong>
                    </div>
                    <div className="bg-[#121318] rounded-lg p-3.5 border border-white/[0.08]">
                        <span className="text-zinc-400 block mb-0.5 font-medium">Match Accuracy</span>
                        <strong className="text-lg text-emerald-400 font-bold">96.4%</strong>
                    </div>
                </div>
            </div>

            {/* Bottom Note */}
            <div className="text-xs text-zinc-400 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-emerald-500">
                    lock
                </span>
                <span>Encrypted with 256-bit enterprise security.</span>
            </div>
        </div>
    );
};

export default LeftPanel;
