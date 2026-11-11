import React from 'react';
import { CheckCircle2, Gauge, Award, ArrowUpRight } from 'lucide-react';

const PersonalityResultCard = ({ result, onProceed }) => {
    const pace = result?.learning_level?.toLowerCase() || 'average';

    const paceDetails = {
        fast: {
            title: 'Accelerated Learning Pace',
            badge: 'Fast Pace',
            desc: 'You learn rapidly from concise patterns. SkillForge prioritizes compact architectural specs and advanced debugging scenarios.'
        },
        average: {
            title: 'Balanced Learning Pace',
            badge: 'Optimal Pace',
            desc: 'You balance concepts with hands-on practice. SkillForge pairs system walkthroughs with progressive coding checkpoints.'
        },
        slow: {
            title: 'Foundational Depth Pace',
            badge: 'In-Depth Pace',
            desc: 'You prefer first-principles clarity before scaling up. SkillForge focuses on step-by-step system breakdowns.'
        }
    };

    const activePace = paceDetails[pace] || paceDetails.average;
    const score = typeof result?.score === 'number' ? result.score : null;
    const scorePct = score !== null ? Math.min(100, Math.round((score / 28) * 100)) : 75;

    return (
        <div className="relative w-full max-w-3xl mx-auto space-y-6 font-mono select-none" id="PersonalityResultCard">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"
            />
            {/* Main Result Card */}
            <div className="relative bg-[#111318] rounded-md border border-white/[0.08] border-t-white/15 p-6 sm:p-8 space-y-5 text-[#ededed] shadow-2xl">
                <div className="border-b border-white/[0.06] pb-4 flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-sm bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <div>
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-[11px] font-mono bg-white/[0.04] text-zinc-200 border border-white/[0.08] mb-2">
                            Work Style Saved
                        </span>
                        <h1 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white">
                            Your Engineering Learning Profile
                        </h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-[#060709] rounded-sm border border-white/[0.08] p-4 space-y-2.5">
                        <div className="flex items-center justify-between text-[11px] text-[#737373] uppercase tracking-wider">
                            <span className="inline-flex items-center gap-1.5">
                                <Award className="w-3.5 h-3.5 text-zinc-300" strokeWidth={1.75} aria-hidden="true" />
                                <span>Style Score</span>
                            </span>
                            <span className="text-white font-semibold">{score ?? '--'} / 28</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#F5F5F5] transition-all duration-500"
                                style={{ width: `${scorePct}%` }}
                            />
                        </div>
                    </div>

                    <div className="bg-[#060709] rounded-sm border border-white/[0.08] p-4 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[11px] text-[#737373] uppercase tracking-wider">
                            <Gauge className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.75} aria-hidden="true" />
                            <span>Recommended Pace</span>
                        </div>
                        <div className="text-lg sm:text-xl text-white font-bold uppercase font-display">
                            {result?.learning_level || activePace.badge}
                        </div>
                    </div>
                </div>

                <div className="bg-[#060709] rounded-sm border border-white/[0.08] p-4 text-xs">
                    <h3 className="font-semibold text-xs uppercase tracking-wider text-white mb-1.5">
                        {activePace.title}
                    </h3>
                    <p className="text-xs text-[#888888] leading-relaxed">
                        {activePace.desc}
                    </p>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                    <span className="text-[#71717A]">
                        Study tracks updated automatically
                    </span>

                    <button
                        type="button"
                        onClick={onProceed}
                        className="inline-flex items-center gap-1.5 bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold px-6 py-2.5 rounded-sm text-xs font-mono transition-colors cursor-pointer"
                    >
                        <span>Back to Dashboard</span>
                        <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PersonalityResultCard;
