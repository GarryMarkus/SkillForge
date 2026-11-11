import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
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
        summary: 'Namespace isolation, multi-stage builds, and image layer optimization.',
    },
    {
        topic: 'PostgreSQL Query Optimization',
        domain: 'Databases',
        summary: 'B-tree and GIN index selection, query execution plans, and lock mitigation.',
    },
    {
        topic: 'FastAPI Concurrency',
        domain: 'Backend Systems',
        summary: 'ASGI event loop saturation, worker offloading, and async connection pooling.',
    },
    {
        topic: 'Redis In-Memory Caching',
        domain: 'Distributed State',
        summary: 'Eviction strategies, cache stampede prevention, and key expiration invariants.',
    },
];

const UpskillPage = () => {
    const [searchParams] = useSearchParams();
    const queryModuleId = searchParams.get('id');
    const topicInputRef = useRef(null);

    const [modules, setModules] = useState([]);
    const [currentModule, setCurrentModule] = useState(null);
    const [completedModuleIds, setCompletedModuleIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const [topicInput, setTopicInput] = useState('');
    const [showGenerator, setShowGenerator] = useState(false);
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
            setErrorMessage('Please specify an engineering topic.');
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
                setErrorMessage(err.error || 'Failed to generate curriculum module.');
            }
        } catch (err) {
            console.error('Error generating module', err);
            setErrorMessage('Network error while synthesizing curriculum.');
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
        : `${modules.length} ${modules.length === 1 ? 'Module' : 'Modules'} Indexed`;
    const headerStatus = currentModule
        ? (isCompleted ? 'Completed' : 'In Progress')
        : isGenerating
        ? 'Synthesizing'
        : 'Ready';

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
                <main className="w-full max-w-7xl mx-auto pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex-1 flex flex-col gap-6 sm:gap-8 font-mono relative z-10">
                    {/* Workspace Title Strip */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.06] pb-6">
                        <div className="space-y-1.5">
                            <span className="text-xs font-mono uppercase tracking-widest text-[#8a8a8e] block">
                                Empirical Skill Synthesis
                            </span>
                            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                                Upskill Studio
                            </h1>
                            <p className="text-xs sm:text-sm text-[#888888] max-w-2xl leading-relaxed">
                                Generate structured technical walkthroughs, failure-mode analyses, and implementation specifications tailored to target competencies.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 flex-wrap shrink-0">
                            <span className="px-3 py-1.5 rounded-sm bg-[#0D0F14] border border-white/[0.08] text-xs font-mono text-[#888888]">
                                <span className="text-white font-semibold">{completedModuleIds.length}</span> / {modules.length} Completed
                            </span>
                            {!showGenerator && (
                                <button
                                    type="button"
                                    onClick={openAndFocusGenerator}
                                    className="bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold px-4 py-1.5 rounded-sm text-xs font-mono transition-colors cursor-pointer"
                                >
                                    + New Module
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Generation Drawer */}
                    {showGenerator && (
                        <div className="relative w-full">
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-4 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"
                            />
                            <section className="relative w-full rounded-md border border-white/[0.08] border-t-white/15 bg-[#111318] p-6 sm:p-7 shadow-2xl">
                                <div className="flex items-start justify-between gap-4 border-b border-white/[0.06] pb-4 mb-5">
                                    <div>
                                        <h2 className="text-xs font-semibold uppercase tracking-wider text-white">
                                            Generate Learning Module
                                        </h2>
                                        <p className="text-xs text-[#888888] mt-1">
                                            SkillForge Learning Engine synthesizes architectural walkthroughs and code specifications on demand.
                                        </p>
                                    </div>
                                    {modules.length > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => setShowGenerator(false)}
                                            className="text-xs text-[#888888] hover:text-white font-mono cursor-pointer shrink-0 transition-colors"
                                            aria-label="Close"
                                        >
                                            Close ✕
                                        </button>
                                    )}
                                </div>

                                <form onSubmit={handleGenerateNewModule} className="flex flex-col md:flex-row gap-3 items-stretch">
                                    <input
                                        ref={topicInputRef}
                                        type="text"
                                        value={topicInput}
                                        onChange={(e) => setTopicInput(e.target.value)}
                                        placeholder="Topic: e.g. Docker Containerization, PostgreSQL Indexing, Concurrency..."
                                        disabled={isGenerating}
                                        className="flex-1 px-3.5 py-2.5 rounded-sm bg-[#060709] border border-white/[0.08] focus:border-white/25 focus:outline-none text-xs text-[#f5f5f5] placeholder-[#555555] transition-colors"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isGenerating}
                                        className="bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold px-5 py-2.5 rounded-sm text-xs font-mono transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
                                    >
                                        {isGenerating ? 'Synthesizing...' : 'Generate Module ↗'}
                                    </button>
                                </form>

                                {errorMessage && (
                                    <p className="mt-3 text-rose-300 text-xs bg-rose-500/10 border border-rose-500/25 rounded-sm px-3 py-2">
                                        {errorMessage}
                                    </p>
                                )}

                                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                                    <span className="text-[#71717A]">Curated topics:</span>
                                    {STARTER_TRACKS.map((track) => (
                                        <button
                                            key={track.topic}
                                            type="button"
                                            disabled={isGenerating}
                                            onClick={() => {
                                                setTopicInput(track.topic);
                                                setErrorMessage('');
                                                topicInputRef.current?.focus();
                                            }}
                                            className={`px-2.5 py-1 rounded-sm border text-xs font-mono transition-colors cursor-pointer disabled:opacity-50 ${
                                                topicInput === track.topic
                                                    ? 'bg-[#181B22] text-white border-white/25'
                                                    : 'bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white border-white/[0.08] hover:border-white/20'
                                            }`}
                                        >
                                            {track.topic}
                                        </button>
                                    ))}
                                </div>
                            </section>
                        </div>
                    )}

                    {/* Two-Column Layout */}
                    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Left Column: Modules List (3 Cols) */}
                        <aside className="lg:col-span-3 rounded-md border border-white/[0.08] border-t-white/15 bg-[#0D0F14] flex flex-col select-none overflow-hidden">
                            <div className="w-full bg-[#111318] px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
                                <span className="font-semibold text-xs uppercase tracking-wider text-white">
                                    Modules ({modules.length})
                                </span>
                                <button
                                    type="button"
                                    onClick={() => (showGenerator ? setShowGenerator(false) : openAndFocusGenerator())}
                                    className="text-xs font-mono text-[#888888] hover:text-white cursor-pointer transition-colors"
                                >
                                    {showGenerator && modules.length > 0 ? 'Hide' : '+ New'}
                                </button>
                            </div>

                            <div className="divide-y divide-white/[0.06] max-h-[560px] overflow-y-auto">
                                {modules.length === 0 ? (
                                    <div className="p-6 text-center space-y-2">
                                        <div className="text-xs font-medium text-zinc-300">
                                            Catalog Empty
                                        </div>
                                        <p className="text-[11px] text-[#71717A] leading-relaxed">
                                            Enter any technical topic above or pick a starter track to synthesize your first guide.
                                        </p>
                                    </div>
                                ) : (
                                    modules.map((mod, idx) => {
                                        const isSelected = currentModule?.id === mod.id;
                                        const isModCompleted = completedModuleIds.includes(mod.id);

                                        return (
                                            <button
                                                key={mod.id}
                                                onClick={() => handleSelectModule(mod)}
                                                className={`w-full text-left p-3.5 transition-colors cursor-pointer flex flex-col gap-1 font-mono ${
                                                    isSelected
                                                        ? 'bg-[#181B22] border-l-2 border-l-white'
                                                        : 'hover:bg-white/[0.02]'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between gap-1 text-xs text-white">
                                                    <span className="truncate font-medium">
                                                        {String(idx + 1).padStart(2, '0')}. {mod.topic}
                                                    </span>
                                                    <span className="text-[10px] text-[#888888] font-mono">
                                                        {isModCompleted ? '✓' : '−'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between text-[11px] text-[#71717A]">
                                                    <span>Level: {mod.level || 'Mid'}</span>
                                                    <span>{new Date(mod.created_at).toLocaleDateString()}</span>
                                                </div>
                                            </button>
                                        );
                                    })
                                )}
                            </div>

                            <div className="px-4 py-2.5 bg-[#060709]/60 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#71717A]">
                                <span>Completed</span>
                                <span className="text-zinc-300 font-semibold">
                                    {completedModuleIds.length} / {modules.length}
                                </span>
                            </div>
                        </aside>

                        {/* Right Column: Active Module View (9 Cols) */}
                        <div className="lg:col-span-9 flex flex-col gap-6">
                            {isGenerating ? (
                                <div className="w-full rounded-md border border-dashed border-white/20 bg-[#0D0F14] p-12 flex flex-col items-center justify-center text-center gap-4">
                                    <div className="text-xs text-[#888888] animate-pulse">
                                        Synthesizing curriculum guide...
                                    </div>
                                    <div className="space-y-1.5">
                                        <h3 className="font-bold font-display text-lg text-white">
                                            Synthesizing Architectural Modules
                                        </h3>
                                        <p className="text-xs text-[#888888] max-w-md mx-auto leading-relaxed">
                                            Assembling real-world engineering scenarios, failure-mode analysis, and implementation specifications...
                                        </p>
                                    </div>
                                    <div className="px-2.5 py-1 rounded-sm bg-white/[0.04] text-zinc-300 border border-white/[0.08] text-xs font-mono">
                                        Topic: {topicInput || 'Technical Guide'}
                                    </div>
                                </div>
                            ) : loading ? (
                                <div className="w-full rounded-md border border-white/[0.08] border-t-white/15 bg-[#0D0F14] p-12 text-center text-[#71717A] text-xs">
                                    Loading curriculum modules...
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
                                <section className="w-full rounded-md border border-white/[0.08] border-t-white/15 bg-[#0D0F14] p-6 sm:p-7 space-y-5">
                                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
                                        <div>
                                            <span className="text-[11px] uppercase tracking-wider text-[#8a8a8e] block mb-1">
                                                Quick-Start Blueprints
                                            </span>
                                            <h3 className="font-bold font-display text-base sm:text-lg text-white">
                                                Recommended Engineering Tracks
                                            </h3>
                                        </div>
                                        {!showGenerator && (
                                            <button
                                                type="button"
                                                onClick={openAndFocusGenerator}
                                                className="bg-[#121316] text-[#E4E4E7] hover:text-white border border-white/10 hover:border-white/20 px-3.5 py-1.5 rounded-sm text-xs font-mono transition-colors cursor-pointer"
                                            >
                                                Custom Topic ↗
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {STARTER_TRACKS.map((track) => (
                                            <div
                                                key={track.topic}
                                                className="p-4 sm:p-5 rounded-sm bg-[#060709] border border-white/[0.08] hover:border-white/20 transition-colors flex flex-col justify-between gap-4"
                                            >
                                                <div className="space-y-2">
                                                    <span className="inline-block px-2 py-0.5 rounded-sm bg-white/[0.04] border border-white/[0.08] text-[11px] text-zinc-300 font-mono">
                                                        {track.domain}
                                                    </span>
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
                                                    className="self-start inline-flex items-center gap-1.5 text-xs font-mono text-[#f5f5f5] hover:text-white hover:underline underline-offset-4 transition-colors cursor-pointer disabled:opacity-50"
                                                >
                                                    <span>Synthesize Guide</span>
                                                    <span aria-hidden="true">↗</span>
                                                </button>
                                            </div>
                                        ))}
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
