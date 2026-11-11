import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    Sparkles,
    BookOpen,
    CheckCircle2,
    Circle,
    Plus,
    X,
    Search,
    ArrowUpRight,
    Box,
    Database,
    Zap,
    Layers,
    Clock,
    Loader2,
    FolderOpen,
    Award,
} from '../../components/ui/Icons';
import client from '../../api/client';
import StudioNoise from '../../components/ui/animations/StudioNoise';
import UpskillHeader from '../../components/upskill/UpskillHeader';
import ModuleProgressBanner from '../../components/upskill/ModuleProgressBanner';
import MarkdownContentReader from '../../components/upskill/MarkdownContentReader';
import ModuleCompletionActions from '../../components/upskill/ModuleCompletionActions';

const STARTER_TRACKS = [
    {
        topic: 'Docker & Containers',
        domain: 'Infrastructure',
        duration: '15 min',
        summary: 'Namespace isolation, multi-stage builds, and lean image layers.',
        icon: Box,
    },
    {
        topic: 'PostgreSQL Query Optimization',
        domain: 'Databases',
        duration: '18 min',
        summary: 'B-tree & GIN index selection, EXPLAIN plans, and lock mitigation.',
        icon: Database,
    },
    {
        topic: 'FastAPI Concurrency',
        domain: 'Backend Systems',
        duration: '15 min',
        summary: 'ASGI event loops, threadpool offloading, and async connection pools.',
        icon: Zap,
    },
    {
        topic: 'Redis In-Memory Caching',
        domain: 'Distributed State',
        duration: '12 min',
        summary: 'Eviction policies, stampede prevention, and key TTL invariants.',
        icon: Layers,
    },
];

const UpskillPage = () => {
    const [searchParams] = useSearchParams();
    const queryModuleId = searchParams.get('id');
    const queryTopic = searchParams.get('topic');
    const topicInputRef = useRef(null);

    const [modules, setModules] = useState([]);
    const [currentModule, setCurrentModule] = useState(null);
    const [completedModuleIds, setCompletedModuleIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const [topicInput, setTopicInput] = useState(queryTopic || '');
    const [showGenerator, setShowGenerator] = useState(Boolean(queryTopic));
    const [catalogSearch, setCatalogSearch] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch student's module progress records
    const fetchProgress = useCallback(async () => {
        try {
            const res = await client.get('/modules/upskill/progress/');
            if (res.ok) {
                const data = await res.json();
                if (data.completed_module_ids) {
                    setCompletedModuleIds(data.completed_module_ids);
                }
            }
        } catch (e) {
            console.error('Failed to fetch module progress', e);
        }
    }, []);

    // Fetch all user modules
    const fetchModules = useCallback(async () => {
        setLoading(true);
        try {
            const res = await client.get('/modules/upskill/modules/');
            if (res.ok) {
                const data = await res.json();
                const list = Array.isArray(data) ? data : [];
                setModules(list);

                if (list.length > 0) {
                    const target = queryModuleId
                        ? list.find(m => String(m.id) === String(queryModuleId)) || list[0]
                        : list[0];
                    setCurrentModule(target);
                } else {
                    setShowGenerator(true);
                }
            }
        } catch (e) {
            console.error('Failed to fetch upskill modules', e);
        } finally {
            setLoading(false);
        }
    }, [queryModuleId]);

    useEffect(() => {
        fetchModules();
        fetchProgress();
    }, [fetchModules, fetchProgress]);

    useEffect(() => {
        if (queryTopic) {
            setTopicInput(queryTopic);
            setShowGenerator(true);
            setErrorMessage('');
            setTimeout(() => {
                topicInputRef.current?.focus();
            }, 80);
        }
    }, [queryTopic]);

    const openAndFocusGenerator = useCallback(() => {
        setShowGenerator(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            topicInputRef.current?.focus();
        }, 60);
    }, []);

    const handleSelectModule = (mod) => {
        setCurrentModule(mod);
        setShowGenerator(false);
    };

    const synthesizeTopic = async (rawTopic) => {
        const trimmed = (rawTopic || '').trim();
        if (!trimmed) {
            setErrorMessage('Please enter an engineering topic.');
            topicInputRef.current?.focus();
            return;
        }

        setErrorMessage('');
        setTopicInput(trimmed);
        setIsGenerating(true);

        try {
            const res = await client.post('/modules/upskill/generate/', { topic: trimmed });
            if (res.ok) {
                const data = await res.json();
                const modRes = await client.get(`/modules/upskill/${data.module_id}/`);
                if (modRes.ok) {
                    const fullMod = await modRes.json();
                    setModules(prev => [fullMod, ...prev.filter(m => m.id !== fullMod.id)]);
                    setCurrentModule(fullMod);
                    setShowGenerator(false);
                    setTopicInput('');
                }
            } else {
                const err = await res.json().catch(() => ({}));
                setErrorMessage(err.error || 'Failed to generate learning module.');
            }
        } catch (err) {
            console.error('Error generating module', err);
            setErrorMessage('Network error while creating your guide.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleGenerateNewModule = async (e) => {
        if (e) e.preventDefault();
        await synthesizeTopic(topicInput);
    };

    const parseMetadata = (mod) => {
        if (!mod || !mod.content) return {};
        try {
            if (typeof mod.content === 'string' && (mod.content.trim().startsWith('{') || mod.content.trim().startsWith('['))) {
                const parsed = JSON.parse(mod.content);
                return parsed.metadata || mod.ai_metadata || {};
            }
        } catch {
            return mod.ai_metadata || {};
        }
        return mod.ai_metadata || {};
    };

    const metadata = parseMetadata(currentModule);
    const isCompleted = currentModule ? completedModuleIds.includes(currentModule.id) : false;
    const moduleRef = currentModule ? `Module #${currentModule.id}` : 'Learning Studio';
    const headerTopic = currentModule
        ? currentModule.topic
        : `${modules.length} ${modules.length === 1 ? 'Guide' : 'Guides'} Saved`;
    const headerStatus = currentModule
        ? (isCompleted ? 'Completed' : 'In Progress')
        : isGenerating
        ? 'Generating'
        : 'Ready';

    const filteredModules = modules.filter((mod) =>
        !catalogSearch.trim() ||
        mod.topic.toLowerCase().includes(catalogSearch.trim().toLowerCase()) ||
        (mod.level || '').toLowerCase().includes(catalogSearch.trim().toLowerCase())
    );
    const completionPct = modules.length > 0
        ? Math.round((completedModuleIds.length / modules.length) * 100)
        : 0;

    return (
        <StudioNoise opacity={0.07}>
            <div className="text-[#ededed] font-mono antialiased min-h-screen flex flex-col">
                {/* Top Navigation */}
                <UpskillHeader
                    moduleRef={moduleRef}
                    moduleTopic={headerTopic}
                    isCompleted={isCompleted}
                    statusLabel={headerStatus}
                />

                {/* Main Content Workspace (explicit pt clears h-14 fixed navbar without p-* shorthand collisions) */}
                <main className="w-full max-w-7xl mx-auto pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex-1 flex flex-col gap-6 font-mono relative z-10">
                    {/* Workspace Title & 3-Step Visual Guide */}
                    <section className="rounded-md border border-white/[0.08] border-t-white/15 bg-[#0D0F14] p-5 sm:p-6 space-y-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3.5">
                                <div className="w-10 h-10 rounded-sm bg-[#111318] border border-white/15 flex items-center justify-center shrink-0">
                                    <BookOpen className="w-5 h-5 text-white" strokeWidth={1.75} aria-hidden="true" />
                                </div>
                                <div>
                                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#8a8a8e] block">
                                        Learning Studio
                                    </span>
                                    <h1 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                                        Upskill Paths &amp; Study Guides
                                    </h1>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 flex-wrap shrink-0">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#060709] border border-white/[0.08] text-xs font-mono text-[#888888]">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.75} aria-hidden="true" />
                                    <span className="text-white font-semibold">{completedModuleIds.length}</span>
                                    <span>/ {modules.length} Done</span>
                                </span>
                                {!showGenerator && (
                                    <button
                                        type="button"
                                        onClick={openAndFocusGenerator}
                                        className="inline-flex items-center gap-1.5 bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold px-4 py-1.5 rounded-sm text-xs font-mono transition-colors cursor-pointer"
                                    >
                                        <Plus className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                                        <span>New Guide</span>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Visual 3-Step Flow */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/[0.06]">
                            <button
                                type="button"
                                onClick={openAndFocusGenerator}
                                className="flex items-center gap-3 p-3 rounded-sm bg-[#060709] border border-white/[0.06] hover:border-white/15 text-left transition-colors cursor-pointer"
                            >
                                <span className="w-7 h-7 rounded-sm bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                                    <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={1.75} aria-hidden="true" />
                                </span>
                                <div className="min-w-0">
                                    <div className="text-xs font-semibold text-white">1. Choose Topic</div>
                                    <div className="text-[11px] text-[#71717A] truncate">Pick a starter track or type any skill</div>
                                </div>
                            </button>
                            <div className="flex items-center gap-3 p-3 rounded-sm bg-[#060709] border border-white/[0.06]">
                                <span className="w-7 h-7 rounded-sm bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                                    <BookOpen className="w-3.5 h-3.5 text-zinc-300" strokeWidth={1.75} aria-hidden="true" />
                                </span>
                                <div className="min-w-0">
                                    <div className="text-xs font-semibold text-white">2. Study Visual Spec</div>
                                    <div className="text-[11px] text-[#71717A] truncate">Jump sections &amp; copy code examples</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-sm bg-[#060709] border border-white/[0.06]">
                                <span className="w-7 h-7 rounded-sm bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                                    <Award className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.75} aria-hidden="true" />
                                </span>
                                <div className="min-w-0">
                                    <div className="text-xs font-semibold text-white">3. Mark &amp; Verify</div>
                                    <div className="text-[11px] text-[#71717A] truncate">Track progress then boost exam score</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Generation Drawer */}
                    {showGenerator && (
                        <div className="relative w-full">
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-4 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"
                            />
                            <section className="relative w-full rounded-md border border-white/[0.08] border-t-white/15 bg-[#111318] p-5 sm:p-6 shadow-2xl space-y-4">
                                <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-3.5">
                                    <div className="flex items-center gap-2.5">
                                        <Sparkles className="w-4 h-4 text-white shrink-0" strokeWidth={1.75} aria-hidden="true" />
                                        <div>
                                            <h2 className="text-xs font-semibold uppercase tracking-wider text-white">
                                                Create Study Guide
                                            </h2>
                                            <p className="text-[11px] text-[#888888] mt-0.5">
                                                Enter any engineering topic for an actionable walkthrough and code examples.
                                            </p>
                                        </div>
                                    </div>
                                    {modules.length > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => setShowGenerator(false)}
                                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm border border-white/[0.08] text-xs text-[#888888] hover:text-white hover:border-white/20 font-mono cursor-pointer shrink-0 transition-colors"
                                            aria-label="Close generator"
                                        >
                                            <X className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                                            <span>Hide</span>
                                        </button>
                                    )}
                                </div>

                                <form onSubmit={handleGenerateNewModule} className="flex flex-col sm:flex-row gap-3 items-stretch">
                                    <div className="relative flex-1">
                                        <input
                                            ref={topicInputRef}
                                            type="text"
                                            value={topicInput}
                                            onChange={(e) => setTopicInput(e.target.value)}
                                            placeholder="e.g. Docker Containerization, PostgreSQL Indexing, FastAPI Concurrency..."
                                            disabled={isGenerating}
                                            className="w-full px-3.5 pr-9 py-2.5 rounded-sm bg-[#060709] border border-white/[0.08] focus:border-white/25 focus:outline-none text-xs text-[#f5f5f5] placeholder-[#555555] transition-colors"
                                        />
                                        {topicInput && !isGenerating && (
                                            <button
                                                type="button"
                                                onClick={() => setTopicInput('')}
                                                aria-label="Clear topic"
                                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-white cursor-pointer"
                                            >
                                                <X className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                                            </button>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isGenerating}
                                        className="inline-flex items-center justify-center gap-1.5 bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold px-5 py-2.5 rounded-sm text-xs font-mono transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
                                    >
                                        {isGenerating ? (
                                            <>
                                                <Loader2 className="w-3.5 h-3.5 animate-spin" strokeWidth={2} aria-hidden="true" />
                                                <span>Creating Guide...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Generate Guide</span>
                                                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                                            </>
                                        )}
                                    </button>
                                </form>

                                {errorMessage && (
                                    <p className="text-rose-300 text-xs bg-rose-500/10 border border-rose-500/25 rounded-sm px-3 py-2">
                                        {errorMessage}
                                    </p>
                                )}

                                {currentModule && (
                                    <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
                                        <span className="text-[#71717A] text-[11px]">Quick picks:</span>
                                        {STARTER_TRACKS.map((track) => {
                                            const TrackIcon = track.icon;
                                            return (
                                                <button
                                                    key={track.topic}
                                                    type="button"
                                                    disabled={isGenerating}
                                                    onClick={() => {
                                                        setTopicInput(track.topic);
                                                        setErrorMessage('');
                                                        topicInputRef.current?.focus();
                                                    }}
                                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border text-xs font-mono transition-colors cursor-pointer disabled:opacity-50 ${
                                                        topicInput === track.topic
                                                            ? 'bg-[#181B22] text-white border-white/25'
                                                            : 'bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white border-white/[0.08] hover:border-white/20'
                                                    }`}
                                                >
                                                    <TrackIcon className="w-3 h-3 text-[#888888]" strokeWidth={1.75} aria-hidden="true" />
                                                    <span>{track.topic}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </section>
                        </div>
                    )}

                    {/* Two-Column Layout */}
                    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Left Column: Modules Catalog */}
                        <aside className="lg:col-span-4 xl:col-span-3 rounded-md border border-white/[0.08] border-t-white/15 bg-[#0D0F14] flex flex-col select-none overflow-hidden">
                            <div className="w-full bg-[#111318] px-4 py-3 border-b border-white/[0.06] flex items-center justify-between gap-2">
                                <span className="inline-flex items-center gap-2 font-semibold text-xs uppercase tracking-wider text-white">
                                    <FolderOpen className="w-3.5 h-3.5 text-zinc-300" strokeWidth={1.75} aria-hidden="true" />
                                    <span>Your Guides ({modules.length})</span>
                                </span>
                                <button
                                    type="button"
                                    onClick={() => (showGenerator && modules.length > 0 ? setShowGenerator(false) : openAndFocusGenerator())}
                                    className="inline-flex items-center gap-1 text-xs font-mono text-[#888888] hover:text-white cursor-pointer transition-colors"
                                >
                                    {showGenerator && modules.length > 0 ? (
                                        <>
                                            <X className="w-3 h-3" strokeWidth={1.75} aria-hidden="true" />
                                            <span>Hide</span>
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="w-3 h-3" strokeWidth={1.75} aria-hidden="true" />
                                            <span>New</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {modules.length > 2 && (
                                <div className="p-2.5 border-b border-white/[0.06] bg-[#060709]/50">
                                    <div className="relative">
                                        <Search className="w-3.5 h-3.5 text-[#71717A] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.75} aria-hidden="true" />
                                        <input
                                            type="text"
                                            value={catalogSearch}
                                            onChange={(e) => setCatalogSearch(e.target.value)}
                                            placeholder="Filter guides..."
                                            className="w-full pl-8 pr-2.5 py-1.5 rounded-sm bg-[#060709] border border-white/[0.08] focus:border-white/20 focus:outline-none text-xs text-white placeholder-[#555555]"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="divide-y divide-white/[0.06] max-h-[500px] overflow-y-auto">
                                {filteredModules.length === 0 ? (
                                    <div className="p-6 text-center space-y-2">
                                        <BookOpen className="w-5 h-5 text-[#71717A] mx-auto" strokeWidth={1.5} aria-hidden="true" />
                                        <div className="text-xs font-medium text-zinc-300">
                                            {modules.length === 0 ? 'No Guides Yet' : 'No Matching Guides'}
                                        </div>
                                        <p className="text-[11px] text-[#71717A] leading-relaxed">
                                            {modules.length === 0
                                                ? 'Pick a starter track or enter any topic above.'
                                                : 'Try clearing the filter text.'}
                                        </p>
                                    </div>
                                ) : (
                                    filteredModules.map((mod, idx) => {
                                        const isSelected = currentModule?.id === mod.id;
                                        const isModCompleted = completedModuleIds.includes(mod.id);

                                        return (
                                            <button
                                                key={mod.id}
                                                onClick={() => handleSelectModule(mod)}
                                                className={`w-full text-left p-3.5 transition-colors cursor-pointer flex items-start gap-2.5 font-mono ${
                                                    isSelected
                                                        ? 'bg-[#181B22] border-l-2 border-l-white'
                                                        : 'hover:bg-white/[0.02]'
                                                }`}
                                            >
                                                {isModCompleted ? (
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" strokeWidth={2} aria-hidden="true" />
                                                ) : (
                                                    <Circle className="w-3.5 h-3.5 text-[#555555] shrink-0 mt-0.5" strokeWidth={1.75} aria-hidden="true" />
                                                )}
                                                <div className="min-w-0 flex-1 space-y-1">
                                                    <div className="text-xs text-white font-medium truncate">
                                                        {String(idx + 1).padStart(2, '0')}. {mod.topic}
                                                    </div>
                                                    <div className="flex items-center justify-between text-[11px] text-[#71717A]">
                                                        <span>{mod.level || 'Mid'}</span>
                                                        <span>{new Date(mod.created_at).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })
                                )}
                            </div>

                            <div className="p-4 bg-[#060709]/60 border-t border-white/[0.06] space-y-2">
                                <div className="flex items-center justify-between text-[11px] text-[#71717A]">
                                    <span>Track Progress</span>
                                    <span className="text-zinc-300 font-semibold">
                                        {completedModuleIds.length}/{modules.length} ({completionPct}%)
                                    </span>
                                </div>
                                <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-500 ${
                                            completionPct === 100 && modules.length > 0 ? 'bg-emerald-400' : 'bg-[#F5F5F5]'
                                        }`}
                                        style={{ width: `${completionPct}%` }}
                                    />
                                </div>
                            </div>
                        </aside>

                        {/* Right Column: Active Module View / Starter Tracks */}
                        <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-6">
                            {isGenerating ? (
                                <div className="w-full rounded-md border border-dashed border-white/20 bg-[#0D0F14] p-10 sm:p-12 flex flex-col items-center justify-center text-center gap-4">
                                    <div className="w-11 h-11 rounded-sm bg-[#111318] border border-white/15 flex items-center justify-center">
                                        <Loader2 className="w-5 h-5 text-white animate-spin" strokeWidth={1.75} aria-hidden="true" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <h3 className="font-bold font-display text-lg text-white">
                                            Building Your Study Guide
                                        </h3>
                                        <p className="text-xs text-[#888888] max-w-md mx-auto leading-relaxed">
                                            Creating architectural walkthroughs, common pitfalls, and hands-on examples...
                                        </p>
                                    </div>
                                    <div className="px-3 py-1 rounded-sm bg-white/[0.04] text-zinc-300 border border-white/[0.08] text-xs font-mono">
                                        Topic: {topicInput || 'Technical Guide'}
                                    </div>
                                </div>
                            ) : loading ? (
                                <div className="w-full rounded-md border border-white/[0.08] border-t-white/15 bg-[#0D0F14] p-12 text-center text-[#71717A] text-xs">
                                    Loading study guides...
                                </div>
                            ) : currentModule ? (
                                <>
                                    {/* Module Progress Banner */}
                                    <ModuleProgressBanner
                                        topic={currentModule.topic}
                                        level={currentModule.level}
                                        isCompleted={isCompleted}
                                        estimatedTime={metadata.estimated_time || '15 minutes'}
                                        prerequisites={metadata.prerequisites || []}
                                        scoreBoost="+15%"
                                    />

                                    {/* Markdown Content Reader */}
                                    <MarkdownContentReader content={currentModule.content} />

                                    {/* Bottom Completion Actions */}
                                    <ModuleCompletionActions
                                        moduleId={currentModule.id}
                                        isCompleted={isCompleted}
                                        onProgressUpdated={fetchProgress}
                                        onGenerateNewClick={openAndFocusGenerator}
                                    />
                                </>
                            ) : (
                                <section className="w-full rounded-md border border-white/[0.08] border-t-white/15 bg-[#0D0F14] p-5 sm:p-6 space-y-5">
                                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
                                        <div>
                                            <span className="text-[11px] uppercase tracking-wider text-[#8a8a8e] block mb-1">
                                                Quick Start
                                            </span>
                                            <h3 className="font-bold font-display text-base sm:text-lg text-white">
                                                Recommended Engineering Tracks
                                            </h3>
                                        </div>
                                        {!showGenerator && (
                                            <button
                                                type="button"
                                                onClick={openAndFocusGenerator}
                                                className="inline-flex items-center gap-1.5 bg-[#121316] text-[#E4E4E7] hover:text-white border border-white/10 hover:border-white/20 px-3.5 py-1.5 rounded-sm text-xs font-mono transition-colors cursor-pointer"
                                            >
                                                <Plus className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                                                <span>Custom Topic</span>
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {STARTER_TRACKS.map((track) => {
                                            const TrackIcon = track.icon;
                                            return (
                                                <div
                                                    key={track.topic}
                                                    className="p-4 sm:p-5 rounded-sm bg-[#060709] border border-white/[0.08] hover:border-white/20 transition-colors flex flex-col justify-between gap-4"
                                                >
                                                    <div className="space-y-2.5">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <div className="inline-flex items-center gap-2">
                                                                <span className="w-7 h-7 rounded-sm bg-[#111318] border border-white/[0.08] flex items-center justify-center shrink-0">
                                                                    <TrackIcon className="w-3.5 h-3.5 text-zinc-200" strokeWidth={1.75} aria-hidden="true" />
                                                                </span>
                                                                <span className="px-2 py-0.5 rounded-sm bg-white/[0.04] border border-white/[0.08] text-[11px] text-zinc-300 font-mono">
                                                                    {track.domain}
                                                                </span>
                                                            </div>
                                                            <span className="inline-flex items-center gap-1 text-[11px] text-[#71717A]">
                                                                <Clock className="w-3 h-3" strokeWidth={1.75} aria-hidden="true" />
                                                                <span>{track.duration}</span>
                                                            </span>
                                                        </div>
                                                        <h4 className="font-display font-bold text-sm text-white">
                                                            {track.topic}
                                                        </h4>
                                                        <p className="text-xs text-[#888888] leading-relaxed">
                                                            {track.summary}
                                                        </p>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        disabled={isGenerating}
                                                        onClick={() => synthesizeTopic(track.topic)}
                                                        className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#121316] hover:bg-[#181B22] border border-white/10 hover:border-white/25 text-xs font-mono text-[#f5f5f5] hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                                                    >
                                                        <span>Start Guide</span>
                                                        <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </StudioNoise>
    );
};

export default UpskillPage;
