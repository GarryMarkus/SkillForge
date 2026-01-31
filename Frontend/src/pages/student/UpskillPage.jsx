import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../../components/layout/ThemeToggle';
import Button from '../../components/ui/Button';
import { ArrowLeft, Sparkles, BookOpen, Clock, Tag, Loader2, ChevronRight, GraduationCap, Zap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const UpskillPage = () => {
    const { user, tokens } = useAuthStore();
    const navigate = useNavigate();
    const [topic, setTopic] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [currentModule, setCurrentModule] = useState(null);
    const [modules, setModules] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchModules();
    }, []);

    const fetchModules = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/modules/upskill/modules/', {
                headers: { 'Authorization': `Bearer ${tokens?.access}` }
            });
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
            const res = await fetch('http://localhost:8000/api/modules/upskill/generate/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokens?.access}`
                },
                body: JSON.stringify({ topic: topic.trim() })
            });

            if (res.ok) {
                const data = await res.json();
                // Fetch the full module content
                const moduleRes = await fetch(`http://localhost:8000/api/modules/upskill/${data.module_id}/`, {
                    headers: { 'Authorization': `Bearer ${tokens?.access}` }
                });
                if (moduleRes.ok) {
                    const moduleData = await moduleRes.json();
                    setCurrentModule(moduleData);
                    fetchModules(); // Refresh list
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
            const res = await fetch(`http://localhost:8000/api/modules/upskill/${moduleId}/`, {
                headers: { 'Authorization': `Bearer ${tokens?.access}` }
            });
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

                    {/* Input Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white dark:bg-dark-card border-2 border-black dark:border-gray-700 rounded-[2.5rem] p-8 mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none"
                    >
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                                <input
                                    type="text"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && !isGenerating && handleGenerate()}
                                    placeholder="What do you want to learn? (e.g., React Hooks, Machine Learning, Docker)"
                                    className="w-full pl-14 pr-4 py-4 text-lg border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-transparent focus:border-purple-500 focus:outline-none transition-colors"
                                    disabled={isGenerating}
                                />
                            </div>
                            <Button
                                onClick={handleGenerate}
                                disabled={isGenerating}
                                className="!bg-gradient-to-r !from-purple-600 !to-pink-600 !text-white !border-none px-8 py-4 flex items-center gap-2 text-lg hover:opacity-90 disabled:opacity-50"
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
                            <p className="text-red-500 mt-4 text-center">{error}</p>
                        )}
                    </motion.div>

                    {/* Loading Animation */}
                    <AnimatePresence>
                        {isGenerating && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-[2.5rem] p-12 text-white text-center mb-8"
                            >
                                <div className="w-20 h-20 mx-auto mb-6 relative">
                                    <div className="absolute inset-0 rounded-full border-4 border-white/20" />
                                    <div className="absolute inset-0 rounded-full border-4 border-white border-t-transparent animate-spin" />
                                    <Sparkles className="absolute inset-0 m-auto w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">AI is crafting your module...</h3>
                                <p className="text-white/70">Analyzing your skill level and creating personalized content</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Module Content Display */}
                        <div className="lg:col-span-2">
                            {currentModule ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white dark:bg-dark-card border-2 border-black dark:border-gray-700 rounded-[2.5rem] p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-none"
                                >
                                    {/* Module Header */}
                                    <div className="flex items-start justify-between mb-6 pb-6 border-b-2 border-gray-100 dark:border-gray-800">
                                        <div>
                                            <h2 className="text-2xl md:text-3xl font-black mb-2">{currentModule.topic}</h2>
                                            <div className="flex items-center gap-3">
                                                {getLevelBadge(currentModule.level)}
                                                {parseContent(currentModule.content).metadata?.estimated_hours && (
                                                    <span className="flex items-center gap-1 text-sm text-gray-500">
                                                        <Clock className="w-4 h-4" />
                                                        {parseContent(currentModule.content).metadata.estimated_hours} hours
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <BookOpen className="w-10 h-10 text-purple-500" />
                                    </div>

                                    {/* Metadata */}
                                    {parseContent(currentModule.content).metadata && (
                                        <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl">
                                            {parseContent(currentModule.content).metadata.prerequisites?.length > 0 && (
                                                <div className="mb-3">
                                                    <p className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase mb-1">Prerequisites</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {parseContent(currentModule.content).metadata.prerequisites.map((p, i) => (
                                                            <span key={i} className="text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded-lg">{p}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {parseContent(currentModule.content).metadata.tags?.length > 0 && (
                                                <div>
                                                    <p className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase mb-1">Tags</p>
                                                    <div className="flex flex-wrap gap-2">
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
                                    <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-white">
                                        <ReactMarkdown>
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

                        {/* Module History Sidebar */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-black flex items-center gap-2">
                                <BookOpen className="w-5 h-5" /> My Learning Modules
                            </h3>
                            {modules.length === 0 ? (
                                <div className="bg-white dark:bg-dark-card border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 text-center">
                                    <p className="text-gray-500">No modules yet. Generate your first one!</p>
                                </div>
                            ) : (
                                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                                    {modules.map((mod) => (
                                        <motion.button
                                            key={mod.id}
                                            whileHover={{ x: 4 }}
                                            onClick={() => viewModule(mod.id)}
                                            className={`w-full text-left p-4 rounded-2xl border-2 transition-colors ${currentModule?.id === mod.id
                                                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                                                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-card hover:border-gray-300'}`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold truncate">{mod.topic}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        {getLevelBadge(mod.level)}
                                                        <span className="text-xs text-gray-400">
                                                            {new Date(mod.created_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                            </div>
                                        </motion.button>
                                    ))}
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
