import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ShieldCheck,
    FileCheck2,
    Github,
    Star,
    Sparkles,
    CheckCircle2,
    ArrowUpRight,
    BookOpen,
    BrainCircuit,
    ScanSearch,
} from '../ui/Icons';
import { CounterTicker } from '../ui/animations';

const ScoreRing = ({ score = 0 }) => {
    const safeScore = Math.max(0, Math.min(100, Math.round(Number(score) || 0)));
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (safeScore / 100) * circumference;

    return (
        <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
            <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="6"
                />
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="#F5F5F5"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className="transition-all duration-700"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-display font-bold text-white leading-none">
                    <CounterTicker value={safeScore} duration={1.1} />
                </span>
                <span className="text-[10px] text-[#71717A] uppercase tracking-wider mt-1">
                    / 100 Score
                </span>
            </div>
        </div>
    );
};

const VerificationProfileBlock = ({ profile, recommendation, candidateName }) => {
    const navigate = useNavigate();

    const roleArchetype = profile?.experience_level
        ? `${profile.experience_level} Software Engineer`
        : 'Software Engineer';
    const isVerifiedReady = recommendation?.status === 'ready';
    const skillScore = Number(
        recommendation?.skill_score ?? (profile?.rating && Number(profile.rating) > 0 ? profile.rating : 0)
    );
    const personalityScore = Number(recommendation?.personality_score ?? 0);
    const starRating = Number(recommendation?.star_rating ?? profile?.rating ?? 0);
    const strengths = isVerifiedReady && recommendation?.strengths?.length
        ? recommendation.strengths
        : (profile?.skills || '').split(',').map((s) => s.trim()).filter(Boolean).slice(0, 4);
    const weaknesses = recommendation?.weaknesses?.length
        ? recommendation.weaknesses
        : ['System Design', 'Distributed Caching'];
    const hasResume = Boolean(profile?.resume || profile?.resume_text);
    const hasGithub = Boolean(profile?.github_url);

    return (
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-4 font-mono" id="VerificationProfileBlock">
            {/* Left Card: Visual Score & Profile Breakdown */}
            <div className="xl:col-span-7 bg-[#0D0F14] rounded-md border border-white/[0.08] border-t-white/15 p-5 sm:p-6 flex flex-col justify-between gap-5">
                {/* Identity Row */}
                <div className="flex items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-sm bg-[#111318] border border-white/15 text-[#f5f5f5] font-display font-bold flex items-center justify-center text-base shrink-0">
                            {candidateName.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-base font-bold font-display text-white tracking-tight truncate">
                                {candidateName}
                            </h2>
                            <p className="text-xs text-[#888888] capitalize truncate">{roleArchetype}</p>
                        </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-white/[0.04] border border-white/[0.08] text-zinc-200 text-[11px] shrink-0">
                        <ShieldCheck className={`w-3.5 h-3.5 ${isVerifiedReady ? 'text-emerald-400' : 'text-amber-300'}`} strokeWidth={1.75} aria-hidden="true" />
                        <span>{isVerifiedReady ? 'Verified Profile' : 'Assessment Pending'}</span>
                    </span>
                </div>

                {/* Visual Score Gauge + Metric Bars */}
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <ScoreRing score={skillScore} />

                    <div className="flex-1 w-full space-y-3.5">
                        {/* Technical Bar */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                                <span className="inline-flex items-center gap-1.5 text-zinc-300">
                                    <ShieldCheck className="w-3.5 h-3.5 text-[#888888]" strokeWidth={1.75} aria-hidden="true" />
                                    <span>Technical Evaluation</span>
                                </span>
                                <span className="text-white font-semibold">{Math.round(skillScore)}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-[#060709] border border-white/[0.08] overflow-hidden rounded-none">
                                <div
                                    className="h-full bg-[#F5F5F5] transition-all duration-700"
                                    style={{ width: `${Math.min(100, Math.round(skillScore))}%` }}
                                />
                            </div>
                        </div>

                        {/* Workplace Fit Bar */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                                <span className="inline-flex items-center gap-1.5 text-zinc-300">
                                    <BrainCircuit className="w-3.5 h-3.5 text-[#888888]" strokeWidth={1.75} aria-hidden="true" />
                                    <span>Work Style Calibration</span>
                                </span>
                                <span className="text-white font-semibold">{Math.round(personalityScore)}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-[#060709] border border-white/[0.08] overflow-hidden rounded-none">
                                <div
                                    className="h-full bg-zinc-400 transition-all duration-700"
                                    style={{ width: `${Math.min(100, Math.round(personalityScore))}%` }}
                                />
                            </div>
                        </div>

                        {/* Star Rating */}
                        <div className="flex items-center justify-between pt-1 text-xs">
                            <span className="inline-flex items-center gap-1.5 text-[#888888]">
                                <Star className="w-3.5 h-3.5 text-white fill-white/80" strokeWidth={1.5} aria-hidden="true" />
                                <span>Peer Benchmark</span>
                            </span>
                            <span className="font-display font-bold text-white">
                                <CounterTicker value={Number(starRating)} decimals={1} duration={1} />{' '}
                                <span className="text-[#71717A] font-mono font-normal text-[11px]">/ 5.0</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Compact Clickable Artifact Chips */}
                <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            type="button"
                            onClick={() => navigate('/student/analysis')}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#060709] border border-white/[0.08] hover:border-white/25 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                        >
                            <FileCheck2 className={`w-3.5 h-3.5 ${hasResume ? 'text-emerald-400' : 'text-[#71717A]'}`} strokeWidth={1.75} aria-hidden="true" />
                            <span>{hasResume ? 'Resume Analyzed' : 'Upload Resume'}</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate('/student/analysis')}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#060709] border border-white/[0.08] hover:border-white/25 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                        >
                            <Github className={`w-3.5 h-3.5 ${hasGithub ? 'text-emerald-400' : 'text-[#71717A]'}`} strokeWidth={1.75} aria-hidden="true" />
                            <span>{hasGithub ? 'GitHub Scanned' : 'Add GitHub'}</span>
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate('/student/analysis')}
                        className="inline-flex items-center gap-1 text-[11px] text-white hover:underline underline-offset-4 cursor-pointer"
                    >
                        <ScanSearch className="w-3.5 h-3.5 text-zinc-300" strokeWidth={1.75} aria-hidden="true" />
                        <span>AI Source Audit</span>
                        <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                    </button>
                </div>
            </div>

            {/* Right Card: Actionable Skill Snapshot */}
            <div className="xl:col-span-5 relative bg-[#111318] text-[#ededed] rounded-md border border-white/[0.08] border-t-white/15 p-5 sm:p-6 flex flex-col justify-between gap-5">
                <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.06]">
                        <span className="font-semibold text-xs uppercase tracking-wider text-white">
                            Skill Snapshot
                        </span>
                        <span className="text-[11px] text-[#71717A]">Click a gap to learn</span>
                    </div>

                    {/* Strengths */}
                    <div>
                        <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 uppercase tracking-wider mb-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.75} aria-hidden="true" />
                            <span>Verified Strengths</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {strengths.map((str, i) => (
                                <span
                                    key={i}
                                    className="px-2.5 py-1 rounded-sm bg-white/[0.04] text-zinc-200 text-xs font-mono border border-white/[0.08]"
                                >
                                    {str}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Interactive Focus Areas */}
                    <div>
                        <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 uppercase tracking-wider mb-2">
                            <Sparkles className="w-3.5 h-3.5 text-zinc-300" strokeWidth={1.75} aria-hidden="true" />
                            <span>Recommended Focus Areas</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {weaknesses.map((w, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => navigate(`/student/upskill?topic=${encodeURIComponent(w)}`)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#060709] hover:bg-[#181B22] text-zinc-200 hover:text-white text-xs font-mono border border-white/[0.10] hover:border-white/25 transition-colors cursor-pointer group"
                                    title={`Open Upskill guide for ${w}`}
                                >
                                    <BookOpen className="w-3.5 h-3.5 text-[#888888] group-hover:text-white" strokeWidth={1.75} aria-hidden="true" />
                                    <span>{w}</span>
                                    <ArrowUpRight className="w-3 h-3 text-[#71717A] group-hover:text-white" strokeWidth={1.75} aria-hidden="true" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                    <span className="text-[#71717A]">Upskill Studio</span>
                    <button
                        type="button"
                        onClick={() => navigate('/student/upskill')}
                        className="inline-flex items-center gap-1 text-white hover:underline underline-offset-4 font-medium cursor-pointer"
                    >
                        <span>Start Learning</span>
                        <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default VerificationProfileBlock;
