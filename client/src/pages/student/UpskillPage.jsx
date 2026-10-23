import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import client from '../../api/client';

import UpskillHeader from '../../components/upskill/UpskillHeader';
import ModuleProgressBanner from '../../components/upskill/ModuleProgressBanner';
import MarkdownContentReader from '../../components/upskill/MarkdownContentReader';
import ModuleCompletionActions from '../../components/upskill/ModuleCompletionActions';

const UpskillPage = () => {
    const [searchParams] = useSearchParams();
    const queryModuleId = searchParams.get('id');

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

    const handleSelectModule = (mod) => {
        setCurrentModule(mod);
        setShowGenerator(false);
    };

    const handleGenerateNewModule = async (e) => {
        if (e) e.preventDefault();
        const trimmed = topicInput.trim();
        if (!trimmed) {
            setErrorMessage('Please specify a target engineering topic.');
            return;
        }

        setErrorMessage('');
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
                setErrorMessage(err.error || 'Failed to synthesize upskill module.');
            }
        } catch (err) {
            console.error('Error generating module', err);
            setErrorMessage('Network error during AI curriculum synthesis.');
        } finally {
            setIsGenerating(false);
        }
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
    const moduleRef = currentModule ? `CURR-${String(currentModule.id).padStart(2, '0')}` : 'CURR-01';

    return (
        <div className="bg-canvas-light text-ink-primary font-mono antialiased selection:bg-canvas-blueprint selection:text-white min-h-screen flex flex-col">
            {/* Top Minimalist Console Bar */}
            <UpskillHeader
                moduleRef={moduleRef}
                moduleTopic={currentModule?.topic || 'ORCHESTRATION'}
                isCompleted={isCompleted}
            />

            {/* Main Content Workspace */}
            <main className="w-full pt-20 sm:pt-24 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex-1 flex flex-col gap-6">
                {/* Generation Drawer / Control Strip */}
                {showGenerator && (
                    <section className="w-full border border-black/20 bg-surface-container-lowest p-5 sm:p-6 shadow-[4px_4px_0px_#1D52B8]">
                        <div className="flex items-center justify-between border-b border-black/15 pb-3 mb-4">
                            <div className="flex items-center gap-2 font-bold uppercase text-xs text-ink-primary">
                                <span className="text-canvas-blueprint font-bold">+</span>
                                <span>[ AI CURRICULUM SYNTHESIS ENGINE // TOPIC INPUT ]</span>
                            </div>
                            {modules.length > 0 && (
                                <button
                                    onClick={() => setShowGenerator(false)}
                                    className="px-2.5 py-1 border border-black/20 hover:bg-black hover:text-white text-xs uppercase font-bold"
                                >
                                    [ESC]
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleGenerateNewModule} className="flex flex-col md:flex-row gap-3 items-stretch">
                            <input
                                type="text"
                                value={topicInput}
                                onChange={(e) => setTopicInput(e.target.value)}
                                placeholder="Enter engineering topic: e.g. Docker Containerization, PostgreSQL Indexing, Concurrency..."
                                disabled={isGenerating}
                                className="flex-1 px-3.5 py-2.5 bg-surface border border-black/25 focus:border-canvas-blueprint focus:outline-none text-xs sm:text-sm font-mono"
                            />
                            <button
                                type="submit"
                                disabled={isGenerating}
                                className="bg-canvas-blueprint text-white px-6 py-2.5 font-bold uppercase text-xs sm:text-sm border border-canvas-blueprint hover:bg-primary-hover transition-none cursor-pointer whitespace-nowrap shadow-[2px_2px_0px_#0A0A0A] disabled:opacity-50"
                            >
                                {isGenerating ? '[ SYNTHESIZING... ]' : '[ + GENERATE CURRICULUM SPEC → ]'}
                            </button>
                        </form>

                        {errorMessage && (
                            <p className="mt-2 text-red-600 text-xs font-bold uppercase">
                                [FAULT] {errorMessage}
                            </p>
                        )}

                        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-on-surface-variant font-mono">
                            <span className="font-bold">RECOMMENDED DEFICIT TOPICS:</span>
                            {['Docker & Containers', 'PostgreSQL Query Optimization', 'FastAPI Concurrency', 'Redis In-Memory Caching'].map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => setTopicInput(s)}
                                    className="px-2.5 py-1 bg-surface border border-black/15 hover:border-black text-ink-primary uppercase text-xs"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </section>
                )}

                {/* Two-Column Engineering Layout */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left Rail: Curriculum History Index (3 Cols) */}
                    <aside className="lg:col-span-3 border border-black/20 bg-surface-container-lowest shadow-[4px_4px_0px_#0A0A0A] flex flex-col select-none">
                        <div className="w-full bg-surface-container px-4 py-3 border-b border-black/20 flex items-center justify-between">
                            <div className="flex items-center gap-1.5 font-bold uppercase text-xs text-ink-primary">
                                <span className="text-canvas-blueprint">+</span>
                                <span>MODULE INDEX ({modules.length})</span>
                            </div>
                            <button
                                onClick={() => setShowGenerator(prev => !prev)}
                                className="text-canvas-blueprint text-xs font-bold hover:underline uppercase"
                            >
                                [+ NEW]
                            </button>
                        </div>

                        <div className="divide-y divide-black/10 max-h-[600px] overflow-y-auto">
                            {modules.length === 0 ? (
                                <div className="p-4 text-center text-outline text-xs italic">
                                    NO GENERATED MODULES IN LOG.
                                </div>
                            ) : (
                                modules.map((mod, idx) => {
                                    const isSelected = currentModule?.id === mod.id;
                                    const isModCompleted = completedModuleIds.includes(mod.id);

                                    return (
                                        <button
                                            key={mod.id}
                                            onClick={() => handleSelectModule(mod)}
                                            className={`w-full text-left p-3.5 transition-none cursor-pointer flex flex-col gap-1 ${
                                                isSelected
                                                    ? 'bg-blue-50/70 border-l-4 border-l-canvas-blueprint'
                                                    : 'hover:bg-surface-container-low'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between gap-1 text-xs font-bold text-ink-primary">
                                                <span className="truncate">
                                                    #{String(idx + 1).padStart(2, '0')} {mod.topic?.toUpperCase()}
                                                </span>
                                                <span className={`text-[10px] px-1.5 py-0.5 border uppercase font-mono ${
                                                    isModCompleted
                                                        ? 'bg-blue-50 text-canvas-blueprint border-canvas-blueprint/40'
                                                        : 'bg-surface text-outline border-black/15'
                                                }`}>
                                                    {isModCompleted ? 'DONE' : 'ACTIVE'}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-[11px] text-on-surface-variant font-mono">
                                                <span>LVL: {mod.level?.toUpperCase() || 'MID'}</span>
                                                <span>{new Date(mod.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </aside>

                    {/* Right Column: Active Module Specification View (9 Cols) */}
                    <div className="lg:col-span-9 flex flex-col gap-6">
                        {isGenerating ? (
                            /* Loading Skeleton Wireframe */
                            <div className="w-full border-2 border-dashed border-canvas-blueprint bg-surface-container-lowest p-10 flex flex-col items-center justify-center text-center gap-4">
                                <div className="w-10 h-10 border-2 border-canvas-blueprint border-t-transparent animate-spin"></div>
                                <div className="flex flex-col gap-1">
                                    <span className="font-bold text-base uppercase text-canvas-blueprint">
                                        [ + SYNTHESIZING ADAPTIVE ENGINEERING CURRICULUM ]
                                    </span>
                                    <span className="text-xs text-on-surface-variant">
                                        CALIBRATING TAXONOMY // EXTRACTING SPECIFICATIONS // GENERATING CODE EXAMPLES
                                    </span>
                                </div>
                                <div className="border border-black/15 bg-surface px-4 py-1 text-xs font-bold text-ink-primary">
                                    TOPIC VECTOR: {topicInput.toUpperCase() || 'TECHNICAL SPEC'}
                                </div>
                            </div>
                        ) : loading ? (
                            <div className="w-full border border-black/20 bg-surface-container-lowest p-10 text-center text-outline text-xs">
                                <span className="font-bold">[ RETRIEVING MODULE STATE... ]</span>
                            </div>
                        ) : currentModule ? (
                            <>
                                {/* Module Progress Spec Banner */}
                                <ModuleProgressBanner
                                    topic={currentModule.topic}
                                    level={currentModule.level}
                                    isCompleted={isCompleted}
                                    estimatedTime={metadata.estimated_time || '15 MINUTES'}
                                    prerequisites={metadata.prerequisites || []}
                                    scoreBoost="+15%"
                                />

                                {/* Markdown Monospace Content Viewport */}
                                <MarkdownContentReader content={currentModule.content} />

                                {/* Bottom Completion & Re-Test Actions */}
                                <ModuleCompletionActions
                                    moduleId={currentModule.id}
                                    isCompleted={isCompleted}
                                    onProgressUpdated={fetchProgress}
                                    onGenerateNewClick={() => setShowGenerator(true)}
                                />
                            </>
                        ) : (
                            <div className="w-full border border-dashed border-black/25 bg-surface-container-lowest p-10 text-center flex flex-col items-center justify-center gap-3">
                                <span className="font-bold text-base uppercase text-ink-primary">
                                    [ NO CURRICULUM MODULE SELECTED ]
                                </span>
                                <p className="text-xs text-on-surface-variant max-w-md">
                                    Generate an adaptive learning module tailored to eliminate verification score deficits, or select a previous module from the index.
                                </p>
                                <button
                                    onClick={() => setShowGenerator(true)}
                                    className="mt-2 bg-canvas-blueprint text-white px-6 py-3 font-bold uppercase text-xs border border-canvas-blueprint hover:bg-primary-hover shadow-[2px_2px_0px_#0A0A0A] cursor-pointer"
                                >
                                    [ + LAUNCH AI CURRICULUM SYNTHESIS ]
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UpskillPage;
