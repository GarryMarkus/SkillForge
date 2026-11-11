import React from 'react';
import { ShieldCheck } from '../ui/Icons';
import BrandLogo from '../common/BrandLogo';

const LeftPanel = () => {
    return (
        <div className="w-full h-full flex flex-col justify-between font-mono select-none text-[#ededed]">
            {/* Top Brand */}
            <div>
                <div className="flex items-center gap-2.5 mb-3">
                    <BrandLogo className="w-7 h-7" />
                    <span className="text-lg font-display font-bold tracking-tight text-white">SkillForge</span>
                </div>
                <p className="text-[#888888] text-xs leading-relaxed max-w-sm">
                    Connecting engineers and engineering teams through empirical skill verification — not keywords or pedigree.
                </p>
            </div>

            {/* Feature List */}
            <div className="space-y-4 my-auto py-8">
                <div className="bg-[#0D0F14] rounded-md p-6 border border-white/[0.08] border-t-white/15 space-y-4">
                    <div className="text-[11px] uppercase tracking-wider text-[#8a8a8e] pb-2 border-b border-white/[0.06]">
                        Verification Criteria
                    </div>

                    <div className="space-y-4 text-xs">
                        <div className="flex items-start gap-3">
                            <span className="text-[#888888] shrink-0 mt-0.5 font-bold">
                                01
                            </span>
                            <div>
                                <strong className="font-semibold block text-[#f5f5f5]">Direct Competence Matching</strong>
                                <span className="text-[#737373] leading-relaxed block mt-0.5">
                                    Matches candidates to requisitions based on verified technical ability and real problem-solving.
                                </span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <span className="text-[#888888] shrink-0 mt-0.5 font-bold">
                                02
                            </span>
                            <div>
                                <strong className="font-semibold block text-[#f5f5f5]">Standardized Evaluations</strong>
                                <span className="text-[#737373] leading-relaxed block mt-0.5">
                                    Timed sandboxed scenarios evaluate what you can build and debug under realistic conditions.
                                </span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <span className="text-[#888888] shrink-0 mt-0.5 font-bold">
                                03
                            </span>
                            <div>
                                <strong className="font-semibold block text-[#f5f5f5]">Actionable Rubric Feedback</strong>
                                <span className="text-[#737373] leading-relaxed block mt-0.5">
                                    Transparent performance rubrics pinpoint specific technical growth areas and recommended curricula.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-[#111318] rounded-md p-4 border border-white/[0.08] border-t-white/15">
                        <span className="text-[#737373] block mb-1">Verified Placements</span>
                        <strong className="text-base text-white font-bold font-mono">12,400+</strong>
                    </div>
                    <div className="bg-[#111318] rounded-md p-4 border border-white/[0.08] border-t-white/15">
                        <span className="text-[#737373] block mb-1">Precision Match</span>
                        <strong className="text-base text-white font-bold font-mono">96.4%</strong>
                    </div>
                </div>
            </div>

            {/* Bottom Note */}
            <div className="text-[11px] text-[#71717A] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#71717A]" strokeWidth={1.5} aria-hidden="true" />
                <span>256-Bit Enterprise Security</span>
            </div>
        </div>
    );
};

export default LeftPanel;
