import React from 'react';

const HeroSection = ({ onStartAssessment, onPostRequisition }) => {
    return (
        <section
            className="w-full relative font-mono p-6 sm:p-10 lg:p-12 rounded-md bg-[#0b0b0c] border border-white/10 mb-12 select-none"
            id="HeroSection"
        >
            <div className="flex flex-col gap-8 relative z-10">
                {/* Super-header / Kicker */}
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                    <span className="text-xs text-[#888888] font-display uppercase tracking-widest">
                        Empirical Skill Verification Protocol
                    </span>
                    <span className="text-xs text-[#555555] font-mono hidden sm:inline-block">
                        Status: Active
                    </span>
                </div>

                {/* Two-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left Column (7 Cols): Headline, Subtitle, Actions */}
                    <div className="lg:col-span-7 flex flex-col justify-between gap-6">
                        <div className="space-y-4">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight leading-[1.15]">
                                <span className="block text-[#f5f5f5]">SkillForge</span>
                                <span className="block text-[#737373]">Verifies Competence</span>
                            </h1>

                            <p className="text-sm sm:text-base text-[#888888] max-w-xl leading-relaxed">
                                Objective technical evaluation without resume inflation. Direct code analysis, sandboxed execution, and verified skill dossiers.
                            </p>
                        </div>

                        {/* Action Bar */}
                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <button
                                onClick={onStartAssessment}
                                className="inline-flex items-center gap-1.5 bg-[#111113] hover:bg-[#1a1a1d] text-[#f5f5f5] border border-white/10 px-4 py-2.5 text-xs sm:text-sm rounded-md transition-colors cursor-pointer"
                            >
                                <span>Start Free Assessment</span>
                                <span className="text-[#888888]">↗</span>
                            </button>

                            <button
                                onClick={onPostRequisition}
                                className="inline-flex items-center gap-1.5 bg-transparent hover:bg-white/[0.04] text-[#cccccc] hover:text-white border border-white/10 px-4 py-2.5 text-xs sm:text-sm rounded-md transition-colors cursor-pointer"
                            >
                                <span>Hire Verified Talent</span>
                                <span className="text-[#888888]">↗</span>
                            </button>

                            <a
                                href="#CapabilitiesRow"
                                className="inline-flex items-center gap-1.5 text-xs text-[#888888] hover:text-white px-3 py-2 transition-colors cursor-pointer"
                            >
                                <span>Protocol Spec</span>
                                <span className="text-[#666666]">↗</span>
                            </a>
                        </div>

                        {/* Clean Benchmark Indicators */}
                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/[0.06] text-xs">
                            <div className="flex flex-col gap-1">
                                <span className="text-[#555555]">Evaluation</span>
                                <span className="text-[#ededed] font-bold">20 Minutes</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[#555555]">Anti-Tamper</span>
                                <span className="text-[#ededed] font-bold">Verified</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[#555555]">Model</span>
                                <span className="text-[#ededed] font-bold">Semantic</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (5 Cols): Restrained Technical Index Card */}
                    <div className="lg:col-span-5">
                        <div className="rounded-md bg-[#050505] border border-white/10 p-6 space-y-5">
                            {/* Card Header */}
                            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-xs">
                                <span className="font-display font-bold text-white">
                                    Candidate Dossier · ID 8F29-ALX
                                </span>
                                <span className="text-[#555555]">
                                    Verified Clean
                                </span>
                            </div>

                            {/* Candidate Identity */}
                            <div>
                                <div className="text-sm font-bold text-[#f5f5f5]">
                                    Alex Rivera
                                </div>
                                <div className="text-xs text-[#737373]">
                                    Systems &amp; Backend Engineering
                                </div>
                            </div>

                            {/* Typographic Metrics */}
                            <div className="space-y-2 py-2 border-y border-white/[0.06] text-xs text-[#888888]">
                                <div className="flex justify-between items-center">
                                    <span>Problem Solving:</span>
                                    <span className="text-white font-bold">100th Percentile</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Competence Score:</span>
                                    <span className="text-white font-bold">98 / 100</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Proctor Integrity:</span>
                                    <span className="text-white font-bold">Verified Clean</span>
                                </div>
                            </div>

                            {/* Verified Competencies List */}
                            <div className="space-y-2">
                                <div className="text-[11px] text-[#555555] uppercase tracking-wider">
                                    Verified Competencies:
                                </div>
                                <div className="flex flex-wrap gap-1.5 text-xs text-[#cccccc]">
                                    <span className="px-2 py-0.5 border border-white/10 rounded-sm">Python</span>
                                    <span className="px-2 py-0.5 border border-white/10 rounded-sm">FastAPI</span>
                                    <span className="px-2 py-0.5 border border-white/10 rounded-sm">PostgreSQL</span>
                                    <span className="px-2 py-0.5 border border-white/10 rounded-sm">Docker</span>
                                </div>
                            </div>

                            {/* Timestamp */}
                            <div className="text-[11px] text-[#555555] pt-1">
                                Authenticated by SkillForge Verification Protocol
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
