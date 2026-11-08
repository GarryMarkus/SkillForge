import React from 'react';
import SpotlightCard from '../ui/animations/SpotlightCard';
import BorderBeam from '../ui/animations/BorderBeam';
import DecryptedText from '../ui/animations/DecryptedText';
import ShinyText from '../ui/animations/ShinyText';

const HeroSection = ({ onStartAssessment, onPostRequisition }) => {
    return (
        <section
            className="w-full relative font-sans p-6 sm:p-10 lg:p-14 rounded-3xl bg-[#090B10]/95 border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.7)] backdrop-blur-2xl overflow-hidden mb-16"
            id="HeroSection"
        >
            {/* Ambient Radial Spotlight inside Section */}
            <div
                className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 bg-cyanAccent/10 rounded-full blur-[120px]"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px]"
                aria-hidden="true"
            />

            <div className="flex flex-col gap-10 lg:gap-12 relative z-10">
                {/* Top Blueprint Telemetry Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
                    {/* Super-Header Badge with DecryptedText */}
                    <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyanAccent/10 border border-cyanAccent/30 text-cyanAccent text-xs font-mono shadow-[0_0_15px_rgba(0,240,255,0.15)]">
                        <span className="w-2 h-2 rounded-full bg-cyanAccent shadow-[0_0_8px_#00F0FF] animate-pulse" />
                        <DecryptedText
                            text="EMPIRICAL TALENT PROTOCOL // ZERO RESUME BIAS"
                            speed={30}
                            animateOn="view"
                            className="font-semibold tracking-wider"
                        />
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-white/[0.03] border border-white/[0.06] px-3 py-1 rounded-full">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span>LATENCY: 14MS // NODE_US_EAST</span>
                    </div>
                </div>

                {/* Asymmetric Two-Column Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                    {/* Left Column (7 Cols): Architectural Pitch */}
                    <div className="lg:col-span-7 flex flex-col justify-between gap-8">
                        <div className="space-y-6">
                            <h1 className="text-4xl sm:text-5xl lg:text-[4.2rem] xl:text-[4.75rem] font-display font-extrabold text-[#F8FAFC] tracking-tight leading-[1.06]">
                                Hire Verified Talent.{' '}
                                <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-cyanAccent via-teal-300 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,240,255,0.3)]">
                                    Prove Your Actual Skills.
                                </span>
                            </h1>

                            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-sans">
                                SkillForge replaces resume inflation and hiring guesswork through sandboxed real-world engineering challenges, live tamper-evident telemetry, and mathematically verified competency scoring.
                            </p>
                        </div>

                        {/* Interactive Action CTAs */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-4 sm:gap-6 pt-2">
                            {/* Primary CTA: Launch Verification Assessment */}
                            <div className="flex-1 sm:flex-initial">
                                <div className="relative group rounded-xl">
                                    <button
                                        onClick={onStartAssessment}
                                        className="relative w-full sm:w-auto bg-gradient-to-r from-cyanAccent to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-display font-bold text-base py-4 px-8 rounded-xl shadow-[0_0_25px_rgba(0,240,255,0.35)] hover:shadow-[0_0_35px_rgba(0,240,255,0.55)] transition-all cursor-pointer flex items-center justify-center gap-3 active:scale-[0.98] overflow-hidden"
                                    >
                                        <BorderBeam
                                            size={30}
                                            duration={4}
                                            colorFrom="#FFFFFF"
                                            colorTo="#00F0FF"
                                            borderWidth={1.5}
                                            borderRadius={12}
                                        />
                                        <span className="relative z-10 tracking-tight">Launch Verification Assessment</span>
                                        <span className="material-symbols-outlined text-[20px] relative z-10 transform transition-transform group-hover:translate-x-1.5">
                                            arrow_forward
                                        </span>
                                    </button>
                                </div>
                                <span className="text-xs text-slate-400 mt-2.5 block font-mono text-center sm:text-left">
                                    20-minute adaptive challenge · Zero resume required
                                </span>
                            </div>

                            {/* Secondary CTA: Recruiter Command Deck */}
                            <div className="flex-1 sm:flex-initial">
                                <button
                                    onClick={onPostRequisition}
                                    className="w-full sm:w-auto bg-white/[0.03] hover:bg-white/[0.08] text-white border border-white/[0.12] hover:border-cyanAccent/50 font-display font-semibold text-base py-4 px-7 rounded-xl shadow-sm hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all cursor-pointer flex items-center justify-center gap-2.5 active:scale-[0.98] backdrop-blur-md"
                                >
                                    <span className="material-symbols-outlined text-cyanAccent text-[20px]">
                                        grid_view
                                    </span>
                                    <span>Recruiter Command Deck</span>
                                </button>
                                <span className="text-xs text-slate-400 mt-2.5 block font-mono text-center sm:text-left">
                                    Instant pre-evaluated candidate pipelines
                                </span>
                            </div>
                        </div>

                        {/* Micro-Telemetry Benchmark Bar */}
                        <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/[0.08] text-xs font-mono">
                            <div className="flex flex-col gap-0.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                                <span className="text-slate-500 uppercase tracking-wider text-[10px]">AVG TIME</span>
                                <span className="text-cyanAccent font-bold text-sm tracking-wide">20 MIN</span>
                            </div>
                            <div className="flex flex-col gap-0.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                                <span className="text-slate-500 uppercase tracking-wider text-[10px]">TAMPER RISK</span>
                                <span className="text-emerald-400 font-bold text-sm tracking-wide">&lt; 0.02%</span>
                            </div>
                            <div className="flex flex-col gap-0.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                                <span className="text-slate-500 uppercase tracking-wider text-[10px]">PRECISION</span>
                                <span className="text-cyanAccent font-bold text-sm tracking-wide">99.4% COSINE</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (5 Cols): The Holographic Candidate Dossier & Verification HUD */}
                    <div className="lg:col-span-5">
                        <SpotlightCard
                            spotlightColor="rgba(0, 240, 255, 0.2)"
                            borderColor="rgba(0, 240, 255, 0.45)"
                            bgClassName="bg-[#0C0E14]/90"
                            className="p-6 sm:p-8 border border-white/[0.1] shadow-[0_12px_48px_rgba(0,0,0,0.85)] relative"
                        >
                            {/* Traveling Perimeter Laser Beam */}
                            <BorderBeam
                                size={28}
                                duration={7}
                                colorFrom="#00F0FF"
                                colorTo="#10B981"
                                borderWidth={1.5}
                                borderRadius={16}
                            />

                            <div className="flex flex-col justify-between gap-6 relative z-10">
                                {/* Header Bar: Window Chrome & Live Tamper Status */}
                                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                                        <span className="text-[11px] font-mono text-slate-400 ml-2">
                                            VERIFIED_DOSSIER // UID: 8F29-ALX
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                                        <span className="relative flex h-1.5 w-1.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                        </span>
                                        <span>NOMINAL</span>
                                    </div>
                                </div>

                                {/* Big Metric Display with ShinyText Metallic Sweep */}
                                <div className="my-1">
                                    <div className="flex items-baseline justify-between">
                                        <ShinyText
                                            speed={3.5}
                                            className="font-display text-5xl sm:text-6xl font-extrabold tracking-tight"
                                            color="#FFFFFF"
                                            shineColor="#00F0FF"
                                        >
                                            100%
                                        </ShinyText>
                                        <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider text-cyanAccent bg-cyanAccent/10 border border-cyanAccent/30">
                                            PERCENTILE: 98.6TH
                                        </span>
                                    </div>
                                    <div className="text-sm font-mono font-bold text-slate-200 mt-1 uppercase tracking-wider">
                                        EMPIRICAL COMPETENCE SCORE
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-sans">
                                        Evaluated across 42 automated regression suites, runtime complexity profiling, and AST code integrity checks.
                                    </p>
                                </div>

                                {/* Interactive Verification Vectors */}
                                <div className="space-y-3.5 pt-4 border-t border-white/[0.08]">
                                    {/* Vector 1: Sandboxed Problem Solving */}
                                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="font-semibold text-slate-200 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-cyanAccent" />
                                                Sandboxed Problem Solving
                                            </span>
                                            <span className="font-mono text-emerald-400 font-bold">98/100</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-cyanAccent to-emerald-400 rounded-full"
                                                style={{ width: '98%' }}
                                            />
                                        </div>
                                    </div>

                                    {/* Vector 2: GitHub Commit Depth Analysis */}
                                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="font-semibold text-slate-200 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-cyanAccent" />
                                                GitHub Commit Depth Analysis
                                            </span>
                                            <span className="font-mono text-cyanAccent text-[11px]">482 Commits · 14 Repos</span>
                                        </div>
                                        {/* Activity Sparkline Dot Grid */}
                                        <div className="flex items-center justify-between gap-1 pt-1">
                                            {[3, 5, 8, 4, 7, 9, 6, 8, 10, 7, 9, 10, 8, 9, 10].map((h, i) => (
                                                <div
                                                    key={i}
                                                    className="flex-1 bg-cyanAccent/30 hover:bg-cyanAccent rounded-xs transition-colors"
                                                    style={{ height: `${h * 2}px` }}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Vector 3: Biometric & Canvas Proctoring */}
                                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-xs">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                            <span className="font-semibold text-slate-200">Biometric &amp; Canvas Proctoring</span>
                                        </div>
                                        <span className="px-2 py-0.5 rounded text-[10px] font-mono text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 font-semibold">
                                            0 Anomalies Detected
                                        </span>
                                    </div>
                                </div>

                                {/* Card Footer: Cryptographic SHA-256 Seal Stamp Badge */}
                                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-slate-400">
                                    <div className="flex items-center gap-1.5 text-cyanAccent">
                                        <span className="material-symbols-outlined text-[16px]">verified</span>
                                        <span className="font-semibold">SHA-256: 8F29C...6A71</span>
                                    </div>
                                    <span className="text-[10px] tracking-wider text-slate-500 uppercase">
                                        TAMPER-PROOF AUDIT HASH
                                    </span>
                                </div>
                            </div>
                        </SpotlightCard>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
