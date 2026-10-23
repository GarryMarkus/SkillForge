import React from 'react';

const HeroSection = ({ onStartAssessment, onPostRequisition }) => {
    return (
        <section className="w-full bg-white border border-gray-100 rounded-3xl font-sans p-8 sm:p-12 lg:p-16 relative overflow-hidden mb-16 shadow-sm" id="HeroSection">
            <div className="flex flex-col gap-10 lg:gap-14 relative z-10">
                {/* Top Badge Indicator */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs sm:text-sm font-semibold">
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                        <span>Empirical Skill Verification Platform</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-medium">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Evaluation Network Active
                    </span>
                </div>

                {/* Main Headline, Description & Highlight Card */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
                    {/* Left 8 Cols: Display Headline & Action Buttons */}
                    <div className="lg:col-span-7 flex flex-col justify-between gap-8">
                        <div className="space-y-5">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-950 tracking-tight leading-[1.12]">
                                Hire Verified Talent. <br />
                                <span className="text-blue-600">Prove Your Actual Skills.</span>
                            </h1>
                            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl leading-relaxed">
                                SkillForge replaces resume guesswork with objective, hands-on skill verification. Candidates showcase real problem-solving ability, and employers hire with complete confidence.
                            </p>
                        </div>

                        {/* Friendly Call to Action Block */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-4 sm:gap-6 pt-2">
                            <div className="flex-1 sm:flex-initial">
                                <button
                                    onClick={onStartAssessment}
                                    className="w-full sm:w-auto bg-blue-600 text-white font-semibold text-base py-4 px-8 rounded-xl hover:bg-blue-700 shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                                >
                                    <span>Start Free Assessment</span>
                                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                                </button>
                                <span className="text-xs text-gray-500 mt-2 block font-normal text-center sm:text-left">
                                    Takes 20 minutes. Free forever for candidates.
                                </span>
                            </div>

                            <div className="flex-1 sm:flex-initial">
                                <button
                                    onClick={onPostRequisition}
                                    className="w-full sm:w-auto bg-white text-gray-900 border border-gray-200 font-semibold text-base py-4 px-8 rounded-xl hover:bg-gray-50 shadow-sm hover:shadow transition-all cursor-pointer flex items-center justify-center gap-2"
                                >
                                    <span>Hire Verified Talent</span>
                                </button>
                                <span className="text-xs text-gray-500 mt-2 block font-normal text-center sm:text-left">
                                    Access pre-evaluated candidates without resume bias.
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right 5 Cols: Proof & Quality Highlights Card */}
                    <div className="lg:col-span-5 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 border border-blue-100 rounded-2xl p-7 sm:p-9 flex flex-col justify-between shadow-sm">
                        <div className="flex items-center justify-between border-b border-blue-100/80 pb-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                                Proof of Real Competence
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs">
                                Guaranteed
                            </span>
                        </div>

                        <div className="my-6">
                            <div className="text-4xl sm:text-5xl font-extrabold text-blue-600 tracking-tight">
                                100%
                            </div>
                            <div className="text-base font-bold text-gray-900 mt-1">
                                Verified Problem Solving
                            </div>
                            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                                Candidates are evaluated through practical development tasks and actual code review, eliminating resume embellishments.
                            </p>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-blue-100/80 text-sm text-gray-700">
                            <div className="flex items-center gap-2.5">
                                <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
                                <span>Real-world practical coding evaluations</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
                                <span>GitHub commit &amp; project history analysis</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
                                <span>Respectful, privacy-conscious proctoring</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
