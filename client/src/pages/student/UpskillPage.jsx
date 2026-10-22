import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../../components/layout/ThemeToggle';
import Button from '../../components/ui/Button';
import { ArrowLeft, Sparkles, BookOpen, Clock, Tag, Loader2, ChevronRight, GraduationCap, Zap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import api from '../../lib/api';

const UpskillPage = () => {
    const navigate = useNavigate();
    const [topic, setTopic] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [currentModule, setCurrentModule] = useState(null);
    const [modules, setModules] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;
        const loadModules = async () => {
            try {
                const res = await api.get('/modules/upskill/modules/');
                if (res.ok && isMounted) {
                    setModules(await res.json());
                }
            } catch (e) { console.error(e); }
        };
        loadModules();
        return () => { isMounted = false; };
    }, []);

    const refreshModules = async () => {
        try {
            const res = await api.get('/modules/upskill/modules/');
            if (res.ok) {
                setModules(await res.json());
            }
        } catch (e) { console.error(e); }
    };

    const handleGenerate = async () => {
        if (!topic.trim()) {
            setError('Please enter a topic');
            return;
        }
        setError('');
        setIsGenerating(true);
        setCurrentModule(null);

        try {
            const res = await api.post('/modules/upskill/generate/', { topic: topic.trim() });

            if (res.ok) {
                const data = await res.json();
                // Fetch the full module content
                const moduleRes = await api.get(`/modules/upskill/${data.module_id}/`);
                if (moduleRes.ok) {
                    const moduleData = await moduleRes.json();
                    setCurrentModule(moduleData);
                    refreshModules(); // Refresh list
                    setTopic('');
                }
            } else {
                const err = await res.json();
                setError(err.error || 'Failed to generate module');
            }
        } catch (e) {
            console.error(e);
            setError('Something went wrong. Please try again.');
        }
        setIsGenerating(false);
    };

    const viewModule = async (moduleId) => {
        try {
            const res = await api.get(`/modules/upskill/${moduleId}/`);
            if (res.ok) {
                setCurrentModule(await res.json());
            }
        } catch (e) { console.error(e); }
    };

    const parseContent = (content) => {
        if (!content) return { markdown: '', metadata: null };
        try {
            // Try to parse as JSON first
            const parsed = typeof content === 'string' ? JSON.parse(content) : content;
            return {
                markdown: parsed.content || '',
                metadata: parsed.metadata || null
            };
        } catch {
            // If not JSON, return as plain markdown
            return { markdown: content, metadata: null };
        }
    };

    const getLevelBadge = (level) => {
        const colors = {
            slow: 'bg-green-100 text-green-700',
            average: 'bg-yellow-100 text-yellow-700',
            fast: 'bg-red-100 text-red-700'
        };
        const labels = {
            slow: 'Beginner',
            average: 'Intermediate',
            fast: 'Advanced'
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${colors[level] || 'bg-gray-100 text-gray-700'}`}>
                {labels[level] || level}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-light-canvas dark:bg-dark-canvas transition-colors duration-500 font-sans text-light-border dark:text-white">
            {/* Header */}
            <header className="p-6 md:p-12 pb-0 flex items-center justify-between">
                <button onClick={() => navigate('/student/dashboard')} className="flex items-center gap-2 text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-bold">Back to Dashboard</span>
                </button>
                <ThemeToggle />
            </header>

            {/* Main Content */}
            <div className="p-6 md:p-12 pt-8">
                <div className="max-w-6xl mx-auto">
                    {/* Welcome Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
                            <Sparkles className="w-4 h-4" />
                            AI-Powered Learning
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
                            Welcome to <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Upskilling</span>
                        </h1>
                        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                            Enter any topic and our AI will generate a personalized learning module tailored to your skill level.
                        </p>
                    </motion.div>

                    {/* Topic Input Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white dark:bg-dark-card border-4 border-black dark:border-gray-700 rounded-[2.5rem] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none mb-12"
                    >
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && !isGenerating && handleGenerate()}
                                    placeholder="What do you want to learn? (e.g., Docker, Redux Toolkit, WebSockets...)"
                                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-0 transition-all font-medium text-lg placeholder:text-gray-400"
                                    disabled={isGenerating}
                                />
                            </div>
                            <Button
                                onClick={handleGenerate}
                                disabled={isGenerating}
                                className="px-8 py-4 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Zap className="w-5 h-5" />
                                        Generate Module
                                    </>
                                )}
                            </Button>
                        </div>
                        {error && (
                            <p className="mt-3 text-red-500 text-sm font-semibold">{error}</p>
                        )}

                        {/* Quick Suggestions */}
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Try:</span>
                            {['Docker Basics', 'React Query', 'PostgreSQL Indexing', 'System Design', 'Git Workflow'].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setTopic(s)}
                                    className="text-xs px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors font-medium"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Content Area - Two Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar - Module History */}
                        <div className="lg:col-span-1 order-2 lg:order-1">
                            <div className="bg-white dark:bg-dark-card border-2 border-black dark:border-gray-700 rounded-[2rem] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-none">
                                <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-purple-500" />
                                    Your Modules ({modules.length})
                                </h3>

                                {modules.length === 0 ? (
                                    <p className="text-gray-400 text-sm py-4 text-center">
                                        No modules generated yet. Start learning above!
                                    </p>
                                ) : (
                                    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                                        {modules.map((m) => (
                                            <button
                                                key={m.id}
                                                onClick={() => viewModule(m.id)}
                                                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex flex-col gap-2 ${currentModule?.id === m.id
                                                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                                                    : 'border-gray-150 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                                                    }`}
                                            >
                                                <div className="flex items-start justify-between gap-2">
                                                    <span className="font-bold text-sm line-clamp-1">{m.topic}</span>
                                                    <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {getLevelBadge(m.learner_level)}
                                                    <span className="text-[10px] text-gray-400">
                                                        {new Date(m.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Main Content Area - Active Module */}
                        <div className="lg:col-span-3 order-1 lg:order-2">
                            {isGenerating ? (
                                <div className="bg-white dark:bg-dark-card border-4 border-black dark:border-gray-700 rounded-[2.5rem] p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none text-center">
                                    <div className="max-w-md mx-auto py-12">
                                        <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
                                        </div>
                                        <h3 className="text-2xl font-black mb-2">Generating Your Module...</h3>
                                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                                            Our AI is crafting a structured learning path with concepts, code examples, and practice exercises.
                                        </p>
                                        <div className="space-y-2 text-sm text-gray-400">
                                            <p className="animate-pulse">Analyzing topic: "{topic}"</p>
                                            <p className="animate-pulse delay-100">Structuring core concepts...</p>
                                            <p className="animate-pulse delay-200">Writing practical examples...</p>
                                        </div>
                                    </div>
                                </div>
                            ) : currentModule ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-white dark:bg-dark-card border-4 border-black dark:border-gray-700 rounded-[2.5rem] p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none"
                                >
                                    {/* Module Header */}
                                    <div className="border-b-2 border-gray-100 dark:border-gray-800 pb-6 mb-8">
                                        <div className="flex flex-wrap items-center gap-3 mb-4">
                                            <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-purple-600 text-white">
                                                {currentModule.topic}
                                            </span>
                                            {getLevelBadge(currentModule.learner_level)}
                                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                Generated {new Date(currentModule.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Metadata Cards if present */}
                                    {parseContent(currentModule.content).metadata && (
                                        <div className="mb-8 p-6 bg-purple-50 dark:bg-purple-950/20 border-2 border-purple-200 dark:border-purple-800 rounded-2xl">
                                            <h4 className="font-bold text-sm text-purple-700 dark:text-purple-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                                                <GraduationCap className="w-4 h-4" />
                                                Module Overview
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                {parseContent(currentModule.content).metadata.estimated_time && (
                                                    <div>
                                                        <span className="text-gray-500">Est. Time: </span>
                                                        <span className="font-bold">{parseContent(currentModule.content).metadata.estimated_time}</span>
                                                    </div>
                                                )}
                                                {parseContent(currentModule.content).metadata.prerequisites && (
                                                    <div>
                                                        <span className="text-gray-500">Prerequisites: </span>
                                                        <span className="font-bold">{parseContent(currentModule.content).metadata.prerequisites.join(', ')}</span>
                                                    </div>
                                                )}
                                            </div>
                                            {parseContent(currentModule.content).metadata.tags && (
                                                <div className="mt-3 flex items-center gap-2">
                                                    <span className="text-gray-500 text-xs">Tags:</span>
                                                    <div className="flex flex-wrap gap-1">
                                                        {parseContent(currentModule.content).metadata.tags.map((t, i) => (
                                                            <span key={i} className="flex items-center gap-1 text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded-lg">
                                                                <Tag className="w-3 h-3" /> {t}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Markdown Content */}
                                    <div className="module-content prose prose-lg dark:prose-invert max-w-none">
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                h1: ({ ...props }) => (
                                                    <h1 className="text-2xl font-black mt-8 mb-4 pb-3 border-b-2 border-purple-200 dark:border-purple-800 text-gray-900 dark:text-white" {...props} />
                                                ),
                                                h2: ({ ...props }) => (
                                                    <h2 className="text-xl font-bold mt-6 mb-3 text-purple-700 dark:text-purple-400 flex items-center gap-2" {...props}>
                                                        <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
                                                        {props.children}
                                                    </h2>
                                                ),
                                                h3: ({ ...props }) => (
                                                    <h3 className="text-lg font-bold mt-5 mb-2 text-gray-800 dark:text-gray-200" {...props} />
                                                ),
                                                p: ({ ...props }) => (
                                                    <p className="my-3 leading-relaxed text-gray-700 dark:text-gray-300" {...props} />
                                                ),
                                                ul: ({ ...props }) => (
                                                    <ul className="my-4 space-y-2 list-none" {...props} />
                                                ),
                                                ol: ({ ...props }) => (
                                                    <ol className="my-4 space-y-2 list-decimal list-inside" {...props} />
                                                ),
                                                li: ({ children, ...props }) => (
                                                    <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300" {...props}>
                                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0"></span>
                                                        <span>{children}</span>
                                                    </li>
                                                ),
                                                code: ({ inline, className, children, ...props }) => {
                                                    if (inline) {
                                                        return (
                                                            <code className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                                                                {children}
                                                            </code>
                                                        );
                                                    }
                                                    return (
                                                        <code className={className} {...props}>{children}</code>
                                                    );
                                                },
                                                pre: ({ ...props }) => (
                                                    <pre className="my-4 p-4 bg-gray-900 dark:bg-black rounded-xl overflow-x-auto text-sm text-gray-100 border border-gray-800" {...props} />
                                                ),
                                                blockquote: ({ ...props }) => (
                                                    <blockquote className="my-4 pl-4 py-2 border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 rounded-r-lg italic text-gray-600 dark:text-gray-400" {...props} />
                                                ),
                                                strong: ({ ...props }) => (
                                                    <strong className="font-bold text-gray-900 dark:text-white" {...props} />
                                                ),
                                                a: ({ ...props }) => (
                                                    <a className="text-purple-600 dark:text-purple-400 underline hover:text-purple-800 dark:hover:text-purple-300 transition-colors" target="_blank" rel="noopener noreferrer" {...props} />
                                                ),
                                                table: ({ ...props }) => (
                                                    <div className="my-4 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" {...props} />
                                                    </div>
                                                ),
                                                th: ({ ...props }) => (
                                                    <th className="px-4 py-3 bg-purple-50 dark:bg-purple-900/30 text-left text-sm font-bold text-gray-900 dark:text-white" {...props} />
                                                ),
                                                td: ({ ...props }) => (
                                                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800" {...props} />
                                                ),
                                            }}
                                        >
                                            {parseContent(currentModule.content).markdown}
                                        </ReactMarkdown>
                                    </div>
                                </motion.div>
                            ) : !isGenerating && (
                                <div className="bg-white dark:bg-dark-card border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-[2.5rem] p-12 text-center">
                                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-gray-400 mb-2">No module selected</h3>
                                    <p className="text-gray-400">Enter a topic above to generate a new learning module, or select from your history.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpskillPage;
