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
                    // If route has specific id, find it; otherwise pick first
                    const target = queryModuleId
                        ? list.find(m => String(m.id) === String(queryModuleId)) || list[0]
                        : list[0];
                    setCurrentModule(target);
                } else {
                    // Show generator if no modules yet
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
                // Fetch full module details
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

    // Parse metadata from module content if present
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
        <div className="bg-background text-on-surface font-mono antialiased selection:bg-primary-container selection:text-on-primary min-h-screen flex flex-col">
            {/* Top Minimalist Console Bar */}
            <UpskillHeader
                moduleRef={moduleRef}
                moduleTopic={currentModule?.topic || 'ORCHESTRATION'}
                isCompleted={isCompleted}
            />

            {/* Main Content Workspace */}
            <main className="w-full pt-28 pb-16 px-margin flex-1 flex flex-col gap-space-lg">
                {/* Generation Drawer / Control Strip */}
                {showGenerator && (
                    <section className="w-full border border-black/20 bg-surface-container-lowest p-space-md shadow-[4px_4px_0px_#1D52B8]">
                        <div className="flex items-center justify-between border-b border-black/15 pb-space-xs mb-space-md">
                            <div className="flex items-center gap-2 font-bold uppercase text-label-md text-on-surface">
                                <span className="text-primary-container font-bold">+</span>
                                <span>[ AI_CURRICULUM_SYNTHESIS_ENGINE // TOPIC_INPUT ]</span>
                            </div>
                            {modules.length > 0 && (
                                <button
                                    onClick={() => setShowGenerator(false)}
                                    className="px-2 py-0.5 border border-black/20 hover:bg-black hover:text-white text-label-sm uppercase font-bold"
                                >
                                    [ESC]
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleGenerateNewModule} className="flex flex-col md:flex-row gap-space-sm items-stretch">
                            <input
                                type="text"
                                value={topicInput}
                                onChange={(e) => setTopicInput(e.target.value)}
                                placeholder="Enter engineering topic: e.g. Docker Containerization, PostgreSQL Indexing, Concurrency..."
                                disabled={isGenerating}
                                className="flex-1 px-3 py-2 bg-surface border border-black/25 focus:border-primary focus:outline-none text-body-md font-mono"
                            />
                            <button
                                type="submit"
                                disabled={isGenerating}
                                className="bg-primary-container text-on-primary px-space-lg py-2 font-bold uppercase text-label-md border border-primary-container hover:bg-primary transition-none cursor-pointer whitespace-nowrap shadow-[2px_2px_0px_#191C1D] disabled:opacity-50"
                            >
                                {isGenerating ? '[ SYNTHESIZING_CURRICULUM... ]' : '[ + GENERATE_CURRICULUM_SPEC -> ]'}
                            </button>
                        </form>

                        {errorMessage && (
                            <p className="mt-2 text-error text-label-sm font-bold uppercase">
                                [FAULT] {errorMessage}
                            </p>
                        )}

                        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-label-sm text-secondary">
                            <span className="font-bold">RECOMMENDED_DEFICIT_TOPICS:</span>
                            {['Docker & Containers', 'PostgreSQL Query Optimization', 'FastAPI Concurrency', 'Redis In-Memory Caching'].map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => setTopicInput(s)}
                                    className="px-2 py-0.5 bg-surface border border-black/15 hover:border-black text-on-surface uppercase text-label-sm"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </section>
                )}

                {/* Two-Column Asymmetrical CAD Workspace */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
                    {/* Left Rail: Curriculum History Index (3 Cols) */}
                    <aside className="lg:col-span-3 border border-black/20 bg-surface-container-lowest flex flex-col select-none">
                        <div className="w-full bg-surface-container px-space-md py-space-xs border-b border-black/20 flex items-center justify-between">
                            <div className="flex items-center gap-1.5 font-bold uppercase text-label-sm text-on-surface">
                                <span className="text-primary-container">+</span>
                                <span>MODULE_INDEX ({modules.length})</span>
                            </div>
                            <button
                                onClick={() => setShowGenerator(prev => !prev)}
                                className="text-primary-container text-label-sm font-bold hover:underline uppercase"
                            >
                                [+ NEW]
                            </button>
                        </div>

                        <div className="divide-y divide-black/10 max-h-[600px] overflow-y-auto">
                            {modules.length === 0 ? (
                                <div className="p-space-md text-center text-outline text-label-sm italic">
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
                                            className={`w-full text-left p-space-sm transition-none cursor-pointer flex flex-col gap-1 ${
                                                isSelected
                                                    ? 'bg-primary-fixed/25 border-l-4 border-l-primary-container'
                                                    : 'hover:bg-surface-container-low'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between gap-1 text-label-sm font-bold text-on-surface">
                                                <span className="truncate">
                                                    #{String(idx + 1).padStart(2, '0')} {mod.topic?.toUpperCase()}
                                                </span>
                                                <span className={`text-[9px] px-1 py-0.2 border uppercase ${
                                                    isModCompleted
                                                        ? 'bg-primary-fixed/50 text-primary-container border-primary-container/40'
                                                        : 'bg-surface text-secondary border-black/15'
                                                }`}>
                                                    {isModCompleted ? 'DONE' : 'ACTIVE'}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-[10px] text-secondary">
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
                    <div className="lg:col-span-9 flex flex-col gap-space-lg">
                        {isGenerating ? (
                            /* Loading Skeleton Wireframe */
                            <div className="w-full border-2 border-dashed border-primary-container bg-surface-container-lowest p-space-xl flex flex-col items-center justify-center text-center gap-space-md">
                                <div className="w-12 h-12 border-2 border-primary-container border-t-transparent animate-spin"></div>
                                <div className="flex flex-col gap-1">
                                    <span className="font-bold text-headline-sm uppercase text-primary-container">
                                        [ + SYNTHESIZING_ADAPTIVE_ENGINEERING_CURRICULUM ]
                                    </span>
                                    <span className="text-body-sm text-secondary">
                                        CALIBRATING TAXONOMY // EXTRACTING IEEE SPECIFICATIONS // GENERATING CODE EXAMPLES
                                    </span>
                                </div>
                                <div className="border border-black/15 bg-surface px-space-md py-space-xs text-label-sm font-bold text-on-surface">
                                    TOPIC_VECTOR: {topicInput.toUpperCase() || 'TECHNICAL_SPEC'}
                                </div>
                            </div>
                        ) : loading ? (
                            /* Wireframe Loading State */
                            <div className="w-full border border-black/20 bg-surface-container-lowest p-space-xl text-center text-secondary">
                                <span className="font-bold">[ BUFFER_READ: RETRIEVING_MODULE_STATE... ]</span>
                            </div>
                        ) : currentModule ? (
                            <>
                                {/* Module Progress Spec Banner */}
                                <ModuleProgressBanner
                                    topic={currentModule.topic}
                                    level={currentModule.level}
                                    isCompleted={isCompleted}
                                    estimatedTime={metadata.estimated_time || '15_MINUTES'}
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
                            /* Empty State Wireframe */
                            <div className="w-full border border-dashed border-black/25 bg-surface-container-lowest p-space-xl text-center flex flex-col items-center justify-center gap-space-sm">
                                <span className="font-bold text-headline-sm uppercase text-on-surface">
                                    [ NO_CURRICULUM_MODULE_SELECTED ]
                                </span>
                                <p className="text-body-sm text-secondary max-w-md">
                                    Generate an adaptive learning module tailored to eliminate verification score deficits, or select a previous module from the index.
                                </p>
                                <button
                                    onClick={() => setShowGenerator(true)}
                                    className="mt-2 bg-primary-container text-on-primary px-space-lg py-2 font-bold uppercase text-label-md border border-primary-container hover:bg-primary shadow-[2px_2px_0px_#191C1D] cursor-pointer"
                                >
                                    [ + LAUNCH_AI_CURRICULUM_SYNTHESIS ]
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
