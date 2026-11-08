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
            setErrorMessage('Please specify an engineering topic.');
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
                setErrorMessage(err.error || 'Failed to generate curriculum module.');
            }
        } catch (err) {
            console.error('Error generating module', err);
            setErrorMessage('Network error while synthesizing curriculum.');
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
    const moduleRef = currentModule ? `Module #${currentModule.id}` : 'Module #1';

    return (
        <div className="bg-[#050505] text-[#ededed] font-mono antialiased min-h-screen flex flex-col">
            {/* Top Navigation */}
            <UpskillHeader
                moduleRef={moduleRef}
                moduleTopic={currentModule?.topic || 'Curriculum'}
                isCompleted={isCompleted}
            />

            {/* Main Content Workspace */}
            <main className="w-full pt-20 sm:pt-24 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex-1 flex flex-col gap-6 font-mono">
                {/* Generation Drawer */}
                {showGenerator && (
                    <section className="w-full rounded-md border border-white/10 bg-[#0b0b0c] p-6">
                        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
                            <div>
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                                    Generate Learning Module
                                </h3>
                                <p className="text-xs text-[#737373] mt-0.5">
                                    Enclave synthesizes targeted architectural walkthroughs for skill focus areas
                                </p>
                            </div>
                            {modules.length > 0 && (
                                <button
                                    onClick={() => setShowGenerator(false)}
                                    className="text-xs text-[#737373] hover:text-white font-mono cursor-pointer"
                                    aria-label="Close"
                                >
                                    Close ✕
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleGenerateNewModule} className="flex flex-col md:flex-row gap-3 items-stretch">
                            <input
                                type="text"
                                value={topicInput}
                                onChange={(e) => setTopicInput(e.target.value)}
                                placeholder="Topic: e.g. Docker Containerization, PostgreSQL Indexing, Concurrency..."
                                disabled={isGenerating}
                                className="flex-1 px-3.5 py-2 rounded-md bg-[#050505] border border-white/10 focus:border-white/30 focus:outline-none text-xs text-[#f5f5f5] placeholder-[#444444] transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={isGenerating}
                                className="bg-[#111113] hover:bg-[#1a1a1d] text-white border border-white/20 px-5 py-2 rounded-md text-xs font-mono transition-colors shadow-sm cursor-pointer whitespace-nowrap disabled:opacity-50"
                            >
                                {isGenerating ? 'Synthesizing...' : 'Generate Module ↗'}
                            </button>
                        </form>

                        {errorMessage && (
                            <p className="mt-2 text-rose-300 text-xs">
                                {errorMessage}
                            </p>
                        )}

                        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#737373]">
                            <span className="text-[#555555]">Curated topics:</span>
                            {['Docker & Containers', 'PostgreSQL Query Optimization', 'FastAPI Concurrency', 'Redis In-Memory Caching'].map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => setTopicInput(s)}
                                    className="px-2.5 py-1 rounded-sm bg-[#050505] hover:bg-[#111113] text-[#888888] hover:text-white border border-white/10 text-xs font-mono transition-colors cursor-pointer"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </section>
                )}

                {/* Two-Column Layout */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left Column: Modules List (3 Cols) */}
                    <aside className="lg:col-span-3 rounded-md border border-white/10 bg-[#0b0b0c] flex flex-col select-none overflow-hidden">
                        <div className="w-full bg-[#050505] px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
                            <span className="font-semibold text-xs uppercase tracking-wider text-white">
                                Modules ({modules.length})
                            </span>
                            <button
                                onClick={() => setShowGenerator(prev => !prev)}
                                className="text-xs font-mono text-[#888888] hover:text-white cursor-pointer"
                            >
                                + New
                            </button>
                        </div>

                        <div className="divide-y divide-white/[0.04] max-h-[600px] overflow-y-auto">
                            {modules.length === 0 ? (
                                <div className="p-5 text-center text-[#555555] text-xs">
                                    No guides indexed. Click + New to generate.
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
                                                    ? 'bg-[#111113] border-l-2 border-l-white'
                                                    : 'hover:bg-[#050505]'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between gap-1 text-xs text-white">
                                                <span className="truncate">
                                                    {String(idx + 1).padStart(2, '0')}. {mod.topic}
                                                </span>
                                                <span className="text-[10px] text-[#888888] font-mono">
                                                    {isModCompleted ? '✓' : '−'}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-[11px] text-[#555555]">
                                                <span>Level: {mod.level || 'Mid'}</span>
                                                <span>{new Date(mod.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </aside>

                    {/* Right Column: Active Module View (9 Cols) */}
                    <div className="lg:col-span-9 flex flex-col gap-6">
                        {isGenerating ? (
                            <div className="w-full rounded-md border border-dashed border-white/20 bg-[#0b0b0c] p-12 flex flex-col items-center justify-center text-center gap-4">
                                <div className="text-xs text-[#888888] animate-pulse">
                                    Synthesizing curriculum guide...
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-semibold text-sm text-white">
                                        Synthesizing Architectural Modules
                                    </h3>
                                    <p className="text-xs text-[#737373]">
                                        Assembling real-world scenarios, failure-mode analysis, and code specs...
                                    </p>
                                </div>
                                <div className="px-2.5 py-1 rounded-sm bg-[#050505] text-[#888888] border border-white/10 text-xs font-mono">
                                    Topic: {topicInput || 'Technical Guide'}
                                </div>
                            </div>
                        ) : loading ? (
                            <div className="w-full rounded-md border border-white/10 bg-[#0b0b0c] p-12 text-center text-[#555555] text-xs">
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
                                    onGenerateNewClick={() => setShowGenerator(true)}
                                />
                            </>
                        ) : (
                            <div className="w-full rounded-md border border-dashed border-white/15 bg-[#0b0b0c] p-12 text-center flex flex-col items-center justify-center gap-3">
                                <h3 className="font-semibold text-sm text-white">
                                    No Module Selected
                                </h3>
                                <p className="text-xs text-[#737373] max-w-sm leading-relaxed">
                                    Select a module from the catalog or generate a new topic tailored to your target skills.
                                </p>
                                <button
                                    onClick={() => setShowGenerator(true)}
                                    className="mt-2 bg-[#111113] hover:bg-[#1a1a1d] text-white border border-white/20 px-5 py-2 rounded-md text-xs font-mono transition-colors shadow-sm cursor-pointer"
                                >
                                    Generate New Guide
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
