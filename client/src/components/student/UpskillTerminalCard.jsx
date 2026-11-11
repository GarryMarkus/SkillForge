import React from 'react';
import {
    BookOpen,
    CheckCircle2,
    Clock,
    Sparkles,
    ArrowUpRight,
    Layers,
    Plus,
} from 'lucide-react';

const DEFAULT_FOCUS_TOPICS = ['Docker & Containers', 'PostgreSQL Indexing', 'FastAPI Concurrency'];

const UpskillTerminalCard = ({
    modules = [],
    completedModuleIds = [],
    recommendedTopics = [],
    onOpenModule,
    onCreateTopic,
    onResumeCurriculum,
}) => {
    const completedCount = completedModuleIds.length;
    const totalCount = modules.length;
    const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    const topics = (recommendedTopics && recommendedTopics.length > 0 ? recommendedTopics : DEFAULT_FOCUS_TOPICS).slice(0, 4);

    return (
        <section
            className="bg-[#0D0F14] rounded-md border border-white/[0.08] border-t-white/15 flex flex-col font-mono select-none overflow-hidden"
            id="UpskillTerminalCard"
        >
            {/* Header Bar */}
            <div className="p-5 sm:p-6 border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-4 bg-[#111318]">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-sm bg-[#060709] border border-white/[0.08] flex items-center justify-center text-white shrink-0">
                        <BookOpen className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <div>
                        <h3 className="text-sm font-display font-bold text-white tracking-tight">
                            Learning Paths &amp; Study Guides
                        </h3>
                        <p className="text-xs text-[#888888] mt-0.5">
                            3-step flow: Pick a topic · Study spec · Verify on assessment
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onResumeCurriculum}
                    className="inline-flex items-center gap-1.5 bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold px-4 py-2 rounded-sm text-xs font-mono transition-colors cursor-pointer"
                >
                    <span>Open Learning Studio</span>
                    <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                </button>
            </div>

            <div className="p-5 sm:p-6 space-y-6">
                {/* Visual Progress Bar Summary */}
                <div className="p-4 rounded-sm bg-[#060709] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="text-xs font-semibold text-white">Curriculum Completion</div>
                        <div className="text-[11px] text-[#888888]">
                            {totalCount > 0
                                ? `${completedCount} of ${totalCount} guides completed`
                                : 'No guides generated yet — pick a starter topic below'}
                        </div>
                    </div>

                    <div className="w-full sm:w-64 space-y-1.5">
                        <div className="flex justify-between text-[11px]">
                            <span className="text-[#71717A]">Overall Progress</span>
                            <span className="text-white font-semibold">{pct}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#111318] border border-white/[0.08] overflow-hidden">
                            <div
                                className="h-full bg-[#F5F5F5] transition-all duration-500"
                                style={{ width: `${pct}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Saved Modules Grid (if user has modules) */}
                {modules.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-zinc-400">
                            <Layers className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                            <span>Your Saved Guides ({modules.length})</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                            {modules.slice(0, 6).map((mod) => {
                                const done = completedModuleIds.includes(mod.id);
                                return (
                                    <button
                                        key={mod.id}
                                        type="button"
                                        onClick={() => (onOpenModule ? onOpenModule(mod.id) : onResumeCurriculum())}
                                        className="group p-4 rounded-md bg-[#111318] border border-white/[0.08] hover:border-white/25 text-left transition-colors cursor-pointer flex flex-col justify-between gap-3"
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <span className="text-xs font-display font-bold text-white line-clamp-2">
                                                {mod.topic}
                                            </span>
                                            {done ? (
                                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                                            ) : (
                                                <Clock className="w-4 h-4 text-[#71717A] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between text-[11px] text-[#888888] pt-2 border-t border-white/[0.06]">
                                            <span>{done ? 'Completed' : 'In Progress'}</span>
                                            <span className="inline-flex items-center gap-1 text-zinc-300 group-hover:text-white">
                                                <span>Open</span>
                                                <ArrowUpRight className="w-3 h-3" strokeWidth={1.75} aria-hidden="true" />
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Quick-Start Recommended Focus Topics */}
                <div className="space-y-3">
                    <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-zinc-400">
                        <Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                        <span>Recommended Focus Topics</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {topics.map((topic) => (
                            <button
                                key={topic}
                                type="button"
                                onClick={() => (onCreateTopic ? onCreateTopic(topic) : onResumeCurriculum())}
                                className="group p-3.5 rounded-sm bg-[#060709] border border-white/[0.08] hover:border-white/25 text-left transition-colors cursor-pointer flex items-center justify-between gap-2"
                            >
                                <span className="text-xs text-zinc-200 group-hover:text-white truncate">
                                    {topic}
                                </span>
                                <Plus className="w-3.5 h-3.5 text-[#71717A] group-hover:text-white shrink-0" strokeWidth={1.75} aria-hidden="true" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UpskillTerminalCard;
