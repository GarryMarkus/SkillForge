import React from 'react';

const PersonaSplitSection = ({ onSelectCandidateRole, onSelectRecruiterRole }) => {
    return (
        <section className="w-full font-sans pb-12 mb-10" id="PersonaSplitSection">
            <div className="flex flex-col gap-8">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto space-y-2">
                    <span className="text-xs uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full inline-block font-medium">
                        Designed for Both Sides
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight">
                        Built for Engineers and Hiring Teams
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                        Whether you are demonstrating your technical capabilities or assembling an engineering team, SkillForge streamlines the path.
                    </p>
                </div>

                {/* 2-Column Split Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {/* For Candidates Card */}
                    <div className="p-7 sm:p-8 rounded-xl bg-[#121318] border border-white/[0.08] flex flex-col justify-between gap-6 shadow-sm">
                        <div className="space-y-5">
                            <div className="space-y-1.5 border-b border-white/[0.06] pb-4">
                                <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                                    For Candidates &amp; Engineers
                                </span>
                                <h3 className="text-xl font-bold text-white tracking-tight">
                                    Showcase Your True Ability
                                </h3>
                                <p className="text-sm text-zinc-400 leading-relaxed">
                                    Never let an automated resume filter block your career again. Let your actual code and problem-solving do the talking.
                                </p>
                            </div>

                            <div className="space-y-3 text-sm text-zinc-300 leading-relaxed">
                                <div className="flex items-start gap-2.5">
                                    <span className="material-symbols-outlined text-emerald-400 text-[18px] shrink-0 mt-0.5">
                                        check_circle
                                    </span>
                                    <span>Receive an authenticated technical skill credential you can share anywhere.</span>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <span className="material-symbols-outlined text-emerald-400 text-[18px] shrink-0 mt-0.5">
                                        check_circle
                                    </span>
                                    <span>Access personalized learning paths to target and master specific technical gaps.</span>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <span className="material-symbols-outlined text-emerald-400 text-[18px] shrink-0 mt-0.5">
                                        check_circle
                                    </span>
                                    <span>Connect directly with engineering managers seeking your exact tech stack.</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/[0.06]">
                            <button
                                onClick={onSelectCandidateRole}
                                className="w-full bg-white text-zinc-950 hover:bg-zinc-100 font-semibold text-sm py-3 px-5 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2 group active:scale-[0.99]"
                            >
                                <span>Get Verified as a Developer</span>
                                <span className="material-symbols-outlined text-[16px] transform transition-transform group-hover:translate-x-1">
                                    arrow_forward
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* For Employers Card */}
                    <div className="p-7 sm:p-8 rounded-xl bg-[#121318] border border-white/[0.08] flex flex-col justify-between gap-6 shadow-sm">
                        <div className="space-y-5">
                            <div className="space-y-1.5 border-b border-white/[0.06] pb-4">
                                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                                    For Recruiters &amp; Engineering Leads
                                </span>
                                <h3 className="text-xl font-bold text-white tracking-tight">
                                    Hire Proven Engineers Fast
                                </h3>
                                <p className="text-sm text-zinc-400 leading-relaxed">
                                    Cut through inflated resumes. Review pre-evaluated talent with verified code samples and proven ratings.
                                </p>
                            </div>

                            <div className="space-y-3 text-sm text-zinc-300 leading-relaxed">
                                <div className="flex items-start gap-2.5">
                                    <span className="material-symbols-outlined text-emerald-400 text-[18px] shrink-0 mt-0.5">
                                        check_circle
                                    </span>
                                    <span>Browse curated candidate profiles with clear technical competencies.</span>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <span className="material-symbols-outlined text-emerald-400 text-[18px] shrink-0 mt-0.5">
                                        check_circle
                                    </span>
                                    <span>Cut initial screening time by over 70% with standardized practical scores.</span>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <span className="material-symbols-outlined text-emerald-400 text-[18px] shrink-0 mt-0.5">
                                        check_circle
                                    </span>
                                    <span>Make confident offers backed by transparent engineering rubrics.</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/[0.06]">
                            <button
                                onClick={onSelectRecruiterRole}
                                className="w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700/80 font-semibold text-sm py-3 px-5 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 group active:scale-[0.99]"
                            >
                                <span>Access Recruiter Deck</span>
                                <span className="material-symbols-outlined text-[16px] text-zinc-400 group-hover:text-white transform transition-transform group-hover:translate-x-1">
                                    arrow_forward
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PersonaSplitSection;
