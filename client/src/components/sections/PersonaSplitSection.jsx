import React from 'react';
import SpotlightCard from '../ui/animations/SpotlightCard';

const PersonaSplitSection = ({ onSelectCandidateRole, onSelectRecruiterRole }) => {
    return (
        <section className="w-full font-mono pb-12 mb-10 select-none" id="PersonaSplitSection">
            <div className="flex flex-col gap-8">
                {/* Section Header */}
                <div className="max-w-2xl space-y-2">
                    <span className="text-xs text-[#737373] font-mono uppercase tracking-wider block">
                        Designed for Both Sides
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                        Built for Engineers and Hiring Teams
                    </h2>
                    <p className="text-xs sm:text-sm text-[#8a8a8e] leading-relaxed">
                        Whether demonstrating technical capabilities or assembling an engineering team, SkillForge streamlines the path.
                    </p>
                </div>

                {/* 2-Column Split Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* For Candidates Card */}
                    <SpotlightCard
                        bgClassName="bg-[#0e0e11]"
                        className="p-6 sm:p-8 rounded-md border border-white/[0.08] flex flex-col justify-between gap-6"
                    >
                        <div className="space-y-4 relative z-10">
                            <div className="space-y-1.5 border-b border-white/[0.06] pb-3">
                                <span className="text-xs text-[#737373] font-mono uppercase tracking-wider block">
                                    For Candidates
                                </span>
                                <h3 className="text-lg font-bold font-display text-white tracking-tight">
                                    Showcase Your True Ability
                                </h3>
                                <p className="text-xs text-[#8a8a8e] leading-relaxed">
                                    Never let an automated resume keyword filter block your career. Let verified problem solving do the talking.
                                </p>
                            </div>

                            <div className="space-y-2.5 text-xs text-[#8a8a8e] font-mono">
                                <div className="flex items-start gap-2">
                                    <span className="text-[#555555] select-none">-</span>
                                    <span>Receive an authenticated technical credential you can share anywhere.</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-[#555555] select-none">-</span>
                                    <span>Access personalized modules to master specific technical gaps.</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-[#555555] select-none">-</span>
                                    <span>Connect directly with engineering managers seeking your exact tech stack.</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/[0.06] relative z-10">
                            <button
                                type="button"
                                onClick={onSelectCandidateRole}
                                className="w-full inline-flex items-center justify-center gap-2 border border-white/15 bg-[#121215] text-[#f5f5f5] hover:bg-[#1a1a1e] hover:border-white/25 py-2.5 rounded-sm text-xs font-mono transition-colors cursor-pointer shadow-sm"
                            >
                                <span>Create Candidate Profile</span>
                                <span className="text-[#888888]">↗</span>
                            </button>
                        </div>
                    </SpotlightCard>

                    {/* For Employers Card */}
                    <SpotlightCard
                        bgClassName="bg-[#0e0e11]"
                        className="p-6 sm:p-8 rounded-md border border-white/[0.08] flex flex-col justify-between gap-6"
                    >
                        <div className="space-y-4 relative z-10">
                            <div className="space-y-1.5 border-b border-white/[0.06] pb-3">
                                <span className="text-xs text-[#737373] font-mono uppercase tracking-wider block">
                                    For Hiring Teams
                                </span>
                                <h3 className="text-lg font-bold font-display text-white tracking-tight">
                                    Hire with Empirical Confidence
                                </h3>
                                <p className="text-xs text-[#8a8a8e] leading-relaxed">
                                    Eliminate resume inflation and screening fatigue. Meet candidates who have demonstrated verified skill competence.
                                </p>
                            </div>

                            <div className="space-y-2.5 text-xs text-[#8a8a8e] font-mono">
                                <div className="flex items-start gap-2">
                                    <span className="text-[#555555] select-none">-</span>
                                    <span>Define technical standards and automated evaluation benchmarks.</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-[#555555] select-none">-</span>
                                    <span>Review comprehensive candidate dossiers with code AST and proctor audit.</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-[#555555] select-none">-</span>
                                    <span>Cut screening time by 60% and fast-track to final cultural fit rounds.</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/[0.06] relative z-10">
                            <button
                                type="button"
                                onClick={onSelectRecruiterRole}
                                className="w-full inline-flex items-center justify-center gap-2 border border-white/15 bg-[#121215] text-[#f5f5f5] hover:bg-[#1a1a1e] hover:border-white/25 py-2.5 rounded-sm text-xs font-mono transition-colors cursor-pointer shadow-sm"
                            >
                                <span>Create Employer Account</span>
                                <span className="text-[#888888]">↗</span>
                            </button>
                        </div>
                    </SpotlightCard>
                </div>
            </div>
        </section>
    );
};

export default PersonaSplitSection;
