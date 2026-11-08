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
            setErrorMessage('Please enter a topic you want to learn.');
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
                setErrorMessage(err.error || 'Failed to generate learning module.');
            }
        } catch (err) {
            console.error('Error generating module', err);
            setErrorMessage('Network error while generating curriculum.');
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
    const moduleRef = currentModule ? `Module ${currentModule.id}` : 'Module 1';

    return (
        <div className="bg-[#09090B] text-zinc-100 font-sans antialiased min-h-screen flex flex-col">
            {/* Top Navigation */}
            <UpskillHeader
                moduleRef={moduleRef}
                moduleTopic={currentModule?.topic || 'Curriculum'}
                isCompleted={isCompleted}
            />

            {/* Main Content Workspace */}
            <main className="w-full pt-20 sm:pt-24 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex-1 flex flex-col gap-6">
                {/* Generation Drawer */}
                {showGenerator && (
                    <section className="w-full rounded-2xl border border-white/[0.08] bg-[#121318] p-6 shadow-sm">
                        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
                            <div>
                                <h3 className="text-sm font-semibold text-white">
                                    Generate New Learning Guide
                                </h3>
                                <p className="text-xs text-zinc-400">
                                    Our evaluation enclave creates an interactive guide tailored to your skill gaps
                                </p>
                            </div>
                            {modules.length > 0 && (
                                <button
                                    onClick={() => setShowGenerator(false)}
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.06] text-sm font-semibold transition-colors"
                                    aria-label="Close"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleGenerateNewModule} className="flex flex-col md:flex-row gap-3 items-stretch">
                            <input
                                type="text"
                                value={topicInput}
                                onChange={(e) => setTopicInput(e.target.value)}
                                placeholder="Enter topic: e.g. Docker Containerization, PostgreSQL Indexing, Concurrency..."
                                disabled={isGenerating}
                                className="flex-1 px-4 py-2.5 rounded-xl bg-[#181A22] border border-white/[0.08] focus:border-blue-500 focus:outline-none text-sm text-white placeholder:text-zinc-500 transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={isGenerating}
                                className="bg-white hover:bg-zinc-200 text-zinc-950 px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm cursor-pointer whitespace-nowrap disabled:opacity-50"
                            >
                                {isGenerating ? 'Generating Guide...' : '+ Generate Guide →'}
                            </button>
                        </form>

                        {errorMessage && (
                            <p className="mt-2 text-rose-400 text-xs font-medium">
                                {errorMessage}
                            </p>
                        )}

                        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                            <span className="font-medium text-zinc-300">Recommended Topics:</span>
                            {['Docker & Containers', 'PostgreSQL Query Optimization', 'FastAPI Concurrency', 'Redis In-Memory Caching'].map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => setTopicInput(s)}
                                    className="px-3 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 border border-white/[0.08] text-xs font-medium transition-colors cursor-pointer"
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
                    <aside className="lg:col-span-3 rounded-2xl border border-white/[0.08] bg-[#121318] shadow-sm flex flex-col select-none overflow-hidden">
                        <div className="w-full bg-[#181A22] px-4 py-3.5 border-b border-white/[0.08] flex items-center justify-between">
                            <span className="font-semibold text-xs text-white">
                                My Modules ({modules.length})
                            </span>
                            <button
                                onClick={() => setShowGenerator(prev => !prev)}
                                className="text-blue-400 text-xs font-semibold hover:text-blue-300"
                            >
                                + New
                            </button>
                        </div>

                        <div className="divide-y divide-white/[0.04] max-h-[600px] overflow-y-auto">
                            {modules.length === 0 ? (
                                <div className="p-5 text-center text-zinc-500 text-xs">
                                    No guides generated yet. Click "+ New" to create one.
                                </div>
                            ) : (
                                modules.map((mod, idx) => {
                                    const isSelected = currentModule?.id === mod.id;
                                    const isModCompleted = completedModuleIds.includes(mod.id);

                                    return (
                                        <button
                                            key={mod.id}
                                            onClick={() => handleSelectModule(mod)}
                                            className={`w-full text-left p-4 transition-colors cursor-pointer flex flex-col gap-1.5 ${
                                                isSelected
                                                    ? 'bg-white/[0.04] border-l-2 border-l-blue-500'
                                                    : 'hover:bg-white/[0.02]'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between gap-1 text-xs font-medium text-white">
                                                <span className="truncate">
                                                    {idx + 1}. {mod.topic}
                                                </span>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                                                    isModCompleted
                                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                        : 'bg-white/[0.04] text-zinc-400 border border-white/[0.08]'
                                                }`}>
                                                    {isModCompleted ? 'Done' : 'Active'}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-[11px] text-zinc-400">
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
                            <div className="w-full rounded-2xl border border-dashed border-blue-500/30 bg-[#121318] p-12 flex flex-col items-center justify-center text-center gap-4">
                                <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                <div className="space-y-1">
                                    <h3 className="font-semibold text-base text-white">
                                        Synthesizing Curriculum Guide
                                    </h3>
                                    <p className="text-xs text-zinc-400">
                                        Assembling real-world architectural scenarios, edge-case analysis, and code specs...
                                    </p>
                                </div>
                                <div className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-medium">
                                    Topic: {topicInput || 'Technical Guide'}
                                </div>
                            </div>
                        ) : loading ? (
                            <div className="w-full rounded-2xl border border-white/[0.08] bg-[#121318] p-12 text-center text-zinc-500 text-sm">
                                Loading learning modules...
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
                            <div className="w-full rounded-2xl border border-dashed border-white/[0.1] bg-[#121318] p-12 text-center flex flex-col items-center justify-center gap-3">
                                <h3 className="font-semibold text-base text-white">
                                    No Learning Guide Selected
                                </h3>
                                <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
                                    Select a guide from the sidebar or generate a new topic tailored to your target skills.
                                </p>
                                <button
                                    onClick={() => setShowGenerator(true)}
                                    className="mt-2 bg-white hover:bg-zinc-200 text-zinc-950 px-6 py-2.5 rounded-xl font-semibold text-xs transition-colors shadow-sm cursor-pointer"
                                >
                                    + Generate New Guide
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
