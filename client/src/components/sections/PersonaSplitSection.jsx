import React from 'react';

const PersonaSplitSection = ({ onSelectCandidateRole, onSelectRecruiterRole }) => {
    return (
        <section className="w-full font-sans pb-16 mb-12" id="PersonaSplitSection">
            <div className="flex flex-col gap-8">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
                        Designed for Both Sides
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
                        Built for Job Seekers and Hiring Teams
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                        Whether you are showcasing your skills or looking for dependable talent, SkillForge provides a fast, transparent experience.
                    </p>
                </div>

                {/* 2-Column Split Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                    {/* For Candidates Card */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-8 sm:p-10 flex flex-col justify-between gap-8 shadow-sm hover:shadow-md transition-shadow">
                        <div className="space-y-6">
                            <div className="space-y-2 border-b border-gray-100 pb-5">
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                                    For Candidates &amp; Developers
                                </span>
                                <h3 className="text-2xl font-bold text-gray-950 tracking-tight">
                                    Showcase Your True Ability
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Never let an automated resume filter block your career again. Let your actual work do the talking.
                                </p>
                            </div>

                            <div className="space-y-3.5 text-sm sm:text-base text-gray-700 leading-relaxed">
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-emerald-600 text-[20px] shrink-0 mt-0.5">
                                        check_circle
                                    </span>
                                    <span>Receive an authenticated Skill Certificate you can share anywhere.</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-emerald-600 text-[20px] shrink-0 mt-0.5">
                                        check_circle
                                    </span>
                                    <span>Access personalized learning paths to target and master specific skill gaps.</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-emerald-600 text-[20px] shrink-0 mt-0.5">
                                        check_circle
                                    </span>
                                    <span>Fast-track directly to final interview rounds with premier tech companies.</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <button
                                onClick={onSelectCandidateRole}
                                className="w-full inline-flex items-center justify-center font-semibold text-base bg-blue-600 text-white rounded-xl py-4 px-6 hover:bg-blue-700 shadow-sm transition-all cursor-pointer gap-2"
                            >
                                <span>Create Candidate Profile</span>
                                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </button>
                        </div>
                    </div>

                    {/* For Employers Card */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-8 sm:p-10 flex flex-col justify-between gap-8 shadow-sm hover:shadow-md transition-shadow">
                        <div className="space-y-6">
                            <div className="space-y-2 border-b border-gray-100 pb-5">
                                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                                    For Hiring Teams &amp; Leaders
                                </span>
                                <h3 className="text-2xl font-bold text-gray-950 tracking-tight">
                                    Hire Pre-Evaluated Engineers
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Skip initial technical phone screens. Access pre-screened talent with verified proof of work.
                                </p>
                            </div>

                            <div className="space-y-3.5 text-sm sm:text-base text-gray-700 leading-relaxed">
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-emerald-600 text-[20px] shrink-0 mt-0.5">
                                        check_circle
                                    </span>
                                    <span>Ranked applicant shortlists filtered by objective problem-solving benchmarks.</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-emerald-600 text-[20px] shrink-0 mt-0.5">
                                        check_circle
                                    </span>
                                    <span>Comprehensive integrity audits with full proctoring compliance.</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-emerald-600 text-[20px] shrink-0 mt-0.5">
                                        check_circle
                                    </span>
                                    <span>Save over 30 engineering hours per hire and cut time-to-offer in half.</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <button
                                onClick={onSelectRecruiterRole}
                                className="w-full inline-flex items-center justify-center font-semibold text-base bg-gray-900 text-white rounded-xl py-4 px-6 hover:bg-black shadow-sm transition-all cursor-pointer gap-2"
                            >
                                <span>Start Hiring Talent</span>
                                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PersonaSplitSection;
