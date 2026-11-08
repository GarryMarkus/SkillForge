import React from 'react';

const PersonaSplitSection = ({ onSelectCandidateRole, onSelectRecruiterRole }) => {
    return (
        <section className="w-full font-mono pb-12 mb-10 select-none" id="PersonaSplitSection">
            <div className="flex flex-col gap-8">
                {/* Section Header */}
                <div className="max-w-2xl space-y-2">
                    <span className="text-xs text-[#888888] font-display uppercase tracking-wider block">
                        Designed for Both Sides
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                        Built for Engineers and Hiring Teams
                    </h2>
                    <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
                        Whether demonstrating technical capabilities or assembling an engineering team, SkillForge streamlines the path.
                    </p>
                </div>

                {/* 2-Column Split Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* For Candidates Card */}
                    <div className="p-6 sm:p-8 rounded-md bg-[#0b0b0c] border border-white/10 flex flex-col justify-between gap-6">
                        <div className="space-y-4">
                            <div className="space-y-1.5 border-b border-white/[0.06] pb-3">
                                <span className="text-xs text-[#888888] uppercase tracking-wider">
                                    [Candidates]
                                </span>
                                <h3 className="text-lg font-bold text-white tracking-tight">
                                    Showcase Your True Ability
                                </h3>
                                <p className="text-xs text-[#888888] leading-relaxed">
                                    Never let an automated resume keyword filter block your career. Let verified problem solving do the talking.
                                </p>
                            </div>

                            <div className="space-y-2.5 text-xs text-[#cccccc]">
                                <div className="flex items-start gap-2">
                                    <span className="text-[#666666] select-none">-</span>
                                    <span>Receive an authenticated technical credential you can share anywhere.</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-[#666666] select-none">-</span>
                                    <span>Access personalized modules to master specific technical gaps.</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-[#666666] select-none">-</span>
                                    <span>Connect directly with engineering managers seeking your exact tech stack.</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/[0.06]">
                            <button
                                onClick={onSelectCandidateRole}
                                className="w-full inline-flex items-center justify-center gap-1.5 bg-[#111113] hover:bg-[#1a1a1d] text-[#f5f5f5] border border-white/10 py-2.5 rounded-md text-xs font-semibold transition-colors cursor-pointer"
                            >
                                <span>Create Candidate Profile</span>
                                <span className="text-[#888888]">↗</span>
                            </button>
                        </div>
                    </div>

                    {/* For Employers Card */}
                    <div className="p-6 sm:p-8 rounded-md bg-[#0b0b0c] border border-white/10 flex flex-col justify-between gap-6">
                        <div className="space-y-4">
                            <div className="space-y-1.5 border-b border-white/[0.06] pb-3">
                                <span className="text-xs text-[#888888] uppercase tracking-wider">
                                    [Hiring Teams]
                                </span>
                                <h3 className="text-lg font-bold text-white tracking-tight">
                                    Hire with Empirical Confidence
                                </h3>
                                <p className="text-xs text-[#888888] leading-relaxed">
                                    Eliminate resume inflation and screening fatigue. Meet candidates who have demonstrated verified skill competence.
                                </p>
                            </div>

                            <div className="space-y-2.5 text-xs text-[#cccccc]">
                                <div className="flex items-start gap-2">
                                    <span className="text-[#666666] select-none">-</span>
                                    <span>Define technical standards and automated evaluation benchmarks.</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-[#666666] select-none">-</span>
                                    <span>Review comprehensive candidate dossiers with code AST and proctor audit.</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-[#666666] select-none">-</span>
                                    <span>Cut screening time by 60% and fast-track to final cultural fit rounds.</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/[0.06]">
                            <button
                                onClick={onSelectRecruiterRole}
                                className="w-full inline-flex items-center justify-center gap-1.5 bg-[#111113] hover:bg-[#1a1a1d] text-[#f5f5f5] border border-white/10 py-2.5 rounded-md text-xs font-semibold transition-colors cursor-pointer"
                            >
                                <span>Create Employer Account</span>
                                <span className="text-[#888888]">↗</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PersonaSplitSection;
