import React from 'react';
import SpotlightCard from '../ui/animations/SpotlightCard';

const PersonaSplitSection = ({ onSelectCandidateRole, onSelectRecruiterRole }) => {
    return (
        <section className="w-full font-sans pb-16 mb-12" id="PersonaSplitSection">
            <div className="flex flex-col gap-10">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-cyanAccent bg-cyanAccent/10 border border-cyanAccent/30 px-3.5 py-1 rounded-full inline-block shadow-[0_0_12px_rgba(0,240,255,0.15)]">
                        Designed for Both Sides
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#F8FAFC] tracking-tight">
                        Built for Engineers and Hiring Teams
                    </h2>
                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
                        Whether you are proving your real capabilities or assembling elite engineering squads, SkillForge accelerates the path.
                    </p>
                </div>

                {/* 2-Column Split Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                    {/* For Candidates Card */}
                    <SpotlightCard
                        spotlightColor="rgba(0, 240, 255, 0.18)"
                        borderColor="rgba(0, 240, 255, 0.45)"
                        bgClassName="bg-[#0C0E14]/90"
                        className="p-8 sm:p-10 flex flex-col justify-between gap-8 border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
                    >
                        <div className="space-y-6">
                            <div className="space-y-2 border-b border-white/[0.08] pb-5">
                                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyanAccent">
                                    For Candidates &amp; Developers
                                </span>
                                <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                                    Showcase Your True Ability
                                </h3>
                                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                                    Never let an automated resume filter block your career again. Let your actual work do the talking.
                                </p>
                            </div>

                            <div className="space-y-3.5 text-sm text-slate-300 leading-relaxed font-sans">
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-emerald-400 text-[20px] shrink-0 mt-0.5">
                                        check_circle
                                    </span>
                                    <span>Receive an authenticated Skill Certificate you can share anywhere.</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-emerald-400 text-[20px] shrink-0 mt-0.5">
                                        check_circle
                                    </span>
                                    <span>Access personalized learning paths to target and master specific skill gaps.</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-emerald-400 text-[20px] shrink-0 mt-0.5">
                                        check_circle
                                    </span>
                                    <span>Connect directly with hiring managers seeking your exact tech stack.</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/[0.08]">
                            <button
                                onClick={onSelectCandidateRole}
                                className="w-full bg-gradient-to-r from-cyanAccent to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-display font-bold text-base py-3.5 px-6 rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_30px_rgba(0,240,255,0.45)] transition-all cursor-pointer flex items-center justify-center gap-2 group active:scale-[0.99]"
                            >
                                <span>Get Verified as a Developer</span>
                                <span className="material-symbols-outlined text-[18px] transform transition-transform group-hover:translate-x-1">
                                    arrow_forward
                                </span>
                            </button>
                        </div>
                    </SpotlightCard>

                    {/* For Employers Card */}
                    <SpotlightCard
                        spotlightColor="rgba(16, 185, 129, 0.18)"
                        borderColor="rgba(16, 185, 129, 0.45)"
                        bgClassName="bg-[#0C0E14]/90"
                        className="p-8 sm:p-10 flex flex-col justify-between gap-8 border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
                    >
                        <div className="space-y-6">
                            <div className="space-y-2 border-b border-white/[0.08] pb-5">
                                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                                    For Recruiters &amp; Engineering Leads
                                </span>
                                <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                                    Hire Proven Engineers Fast
                                </h3>
                                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                                    Cut through inflated resumes. Review pre-evaluated talent with verified code samples and proven ratings.
                                </p>
                            </div>

                            <div className="space-y-3.5 text-sm text-slate-300 leading-relaxed font-sans">
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-emerald-400 text-[20px] shrink-0 mt-0.5">
                                        check_circle
                                    </span>
                                    <span>Browse curated candidate profiles with clear technical competencies.</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-emerald-400 text-[20px] shrink-0 mt-0.5">
                                        check_circle
                                    </span>
                                    <span>Cut screening time by over 70% with standardized practical scores.</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-emerald-400 text-[20px] shrink-0 mt-0.5">
                                        check_circle
                                    </span>
                                    <span>Make confident offers backed by transparent behavioral rubrics.</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/[0.08]">
                            <button
                                onClick={onSelectRecruiterRole}
                                className="w-full bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/[0.12] hover:border-emerald-400/50 font-display font-bold text-base py-3.5 px-6 rounded-xl shadow-sm hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all cursor-pointer flex items-center justify-center gap-2 group active:scale-[0.99] backdrop-blur-md"
                            >
                                <span>Access Recruiter Deck</span>
                                <span className="material-symbols-outlined text-[18px] text-emerald-400 transform transition-transform group-hover:translate-x-1">
                                    arrow_forward
                                </span>
                            </button>
                        </div>
                    </SpotlightCard>
                </div>
            </div>
        </section>
    );
};

export default PersonaSplitSection;
