import React from 'react';

const LeftPanel = () => {
    return (
        <div className="w-full h-full flex flex-col justify-between font-sans select-none text-white">
            {/* Top Brand */}
            <div>
                <div className="flex items-center gap-2.5 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-sm">
                        SF
                    </span>
                    <span className="text-xl font-bold tracking-tight">SkillForge</span>
                </div>
                <p className="text-blue-100 text-sm leading-relaxed max-w-sm">
                    Connecting capable candidates with forward-thinking employers through verified ability, not keywords.
                </p>
            </div>

            {/* Feature List */}
            <div className="space-y-4 my-auto py-8">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 space-y-4 shadow-lg">
                    <h3 className="text-xs uppercase font-semibold text-blue-200 tracking-wider">
                        Why SkillForge?
                    </h3>

                    <div className="space-y-3.5 text-sm">
                        <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                1
                            </span>
                            <div>
                                <strong className="font-semibold block text-white">Direct Skill Matching</strong>
                                <span className="text-blue-100 text-xs leading-relaxed block">
                                    Matches candidates to real jobs based on verified technical abilities.
                                </span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                2
                            </span>
                            <div>
                                <strong className="font-semibold block text-white">Fair &amp; Secure Assessments</strong>
                                <span className="text-blue-100 text-xs leading-relaxed block">
                                    Reliable online evaluations prove what you can actually build and solve.
                                </span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                3
                            </span>
                            <div>
                                <strong className="font-semibold block text-white">Tailored Learning Paths</strong>
                                <span className="text-blue-100 text-xs leading-relaxed block">
                                    Identifies missing skills and provides customized guides to level up quickly.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-white/10 rounded-xl p-3 border border-white/15">
                        <span className="text-blue-200 block mb-0.5">Verified Hires</span>
                        <strong className="text-lg text-white font-bold">12,400+</strong>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 border border-white/15">
                        <span className="text-blue-200 block mb-0.5">Avg. Match Rate</span>
                        <strong className="text-lg text-white font-bold">96.4%</strong>
                    </div>
                </div>
            </div>

            {/* Bottom Note */}
            <div className="text-xs text-blue-200">
                Encrypted with industry standard 256-bit security.
            </div>
        </div>
    );
};

export default LeftPanel;
