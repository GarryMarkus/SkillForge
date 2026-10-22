import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import ThemeToggle from '../../components/layout/ThemeToggle';
import { LogOut, BookOpen, Target, Award, Play, ChevronRight, Briefcase, User, Star, X, MapPin, DollarSign, Send, CheckCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
    const { logout, user, tokens } = useAuthStore();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [recommendation, setRecommendation] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [myApplications, setMyApplications] = useState([]);
    const [isJobModalOpen, setIsJobModalOpen] = useState(false);
    const [applyingTo, setApplyingTo] = useState(null);

    useEffect(() => {
        if (user && user.onboarding_stage < 2) {
            navigate('/student/onboarding');
        }
    }, [user, navigate]);

    useEffect(() => {
        const fetchData = async () => {
            if (!tokens?.access) return;
            // Fetch Profile
            try {
                const res = await fetch('http://localhost:8000/api/accounts/profile/', {
                    headers: { 'Authorization': `Bearer ${tokens.access}` }
                });
                if (res.ok) setProfile(await res.json());
            } catch (e) { console.error(e); }

            // Fetch Recommendation
            try {
                const res = await fetch('http://localhost:8000/api/verification/recommendation/', {
                    headers: { 'Authorization': `Bearer ${tokens.access}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    // Parse the nested recommendation JSON if it exists
                    if (data.status === 'ready' && data.recommendation) {
                        try {
                            // recommendation might be a JSON string or already an object
                            const recData = typeof data.recommendation === 'string'
                                ? JSON.parse(data.recommendation)
                                : data.recommendation;
                            setRecommendation({
                                status: 'ready',
                                star_rating: recData.star_rating,
                                strengths: recData.strengths,
                                weaknesses: recData.weaknesses,
                                recommended_tags: recData.recommended_tags,
                                personality_score: data.personality_score,
                                skill_score: data.skill_score,
                                stage: data.stage
                            });
                        } catch (parseErr) {
                            console.error('Failed to parse recommendation:', parseErr);
                            setRecommendation(data);
                        }
                    } else {
                        setRecommendation(data);
                    }
                }
            } catch (e) { console.error(e); }

            // Fetch My Applications
            try {
                const res = await fetch('http://localhost:8000/api/project/my-applications/', {
                    headers: { 'Authorization': `Bearer ${tokens.access}` }
                });
                if (res.ok) setMyApplications(await res.json());
            } catch (e) { console.error(e); }
        };
        fetchData();
    }, [tokens]);

    const fetchJobs = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/project/jobs/', {
                headers: { 'Authorization': `Bearer ${tokens.access}` }
            });
            if (res.ok) setJobs(await res.json());
        } catch (e) { console.error(e); }
    };

    const openBrowseJobs = () => {
        fetchJobs();
        setIsJobModalOpen(true);
    };

    const handleApply = async (jobId) => {
        setApplyingTo(jobId);
        try {
            const res = await fetch('http://localhost:8000/api/project/apply/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokens.access}`
                },
                body: JSON.stringify({ job_id: jobId })
            });
            if (res.ok) {
                alert('Application submitted!');
                setMyApplications(prev => [...prev, { job: jobId, status: 'pending' }]);
                fetchJobs(); // Refresh to update counts
            } else {
                const err = await res.json();
                alert(err.error || 'Failed to apply');
            }
        } catch (e) { console.error(e); }
        setApplyingTo(null);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const hasApplied = (jobId) => myApplications.some(app => app.job === jobId);

    return (
        <div className="min-h-screen bg-light-canvas dark:bg-dark-canvas transition-colors duration-500 p-6 md:p-12 font-sans text-light-border dark:text-white">
            <header className="flex items-center justify-between mb-12">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tighter">
                        Hello, {user?.name?.split(" ")[0]}! 👋
                    </h1>
                    <p className="font-script text-xl text-gray-500 dark:text-gray-400">
                        Ready to forge your path today?
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <Button
                        onClick={handleLogout}
                        variant="secondary"
                        className="!px-3 !py-2 !text-xs flex items-center gap-2"
                    >
                        <LogOut className="w-4 h-4" />
                    </Button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Action Area */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Profile Card */}
                    <div className="bg-white dark:bg-dark-card border-2 border-black dark:border-gray-700 rounded-[3rem] p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-none relative">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-black flex items-center gap-2"><User className="fill-current" /> My Identification</h3>
                            <Button onClick={() => navigate('/student/onboarding')} variant="secondary" className="!text-xs !py-1">Update ID</Button>
                        </div>
                        {profile ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase">Education</label>
                                    <p className="font-bold text-lg">{profile.education}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase">Role</label>
                                    <p className="font-bold text-lg">{profile.experience_level || 'Aspirant'}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Bio</label>
                                    <p className="font-medium text-gray-600 dark:text-gray-300">{profile.bio}</p>
                                </div>
                            </div>
                        ) : (
                            <p className="italic text-gray-400">Loading profile data...</p>
                        )}
                    </div>

                    {/* Phase Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-purple-900 to-black rounded-[2.5rem] p-6 text-white relative overflow-hidden shadow-2xl transition-transform hover:scale-[1.01]">
                            <div className="relative z-10 flex flex-col items-start h-full justify-between">
                                <div>
                                    <span className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3 inline-block">Phase 1</span>
                                    <h2 className="text-2xl font-black mb-2">Personality</h2>
                                    <p className="text-gray-300 mb-4 text-sm">Discover your persona.</p>
                                </div>
                                <Button onClick={() => navigate('/student/personality-test')} className="!bg-white !text-black !border-none hover:scale-105 active:scale-95 px-4 shadow-xl flex items-center gap-2 w-full justify-center text-sm">
                                    Start <Play className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="absolute right-0 top-0 w-32 h-32 bg-purple-500 rounded-full blur-[60px] opacity-20" />
                        </div>

                        <div className="bg-gradient-to-br from-black to-gray-800 dark:from-gray-800 dark:to-black rounded-[2.5rem] p-6 text-white relative overflow-hidden shadow-2xl transition-transform hover:scale-[1.01]">
                            <div className="relative z-10 flex flex-col items-start h-full justify-between">
                                <div>
                                    <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3 inline-block">Phase 2</span>
                                    <h2 className="text-2xl font-black mb-2">Skill Check</h2>
                                    <p className="text-gray-300 mb-4 text-sm">Verify your prowess.</p>
                                </div>
                                <Button onClick={() => navigate('/student/assessment')} className="!bg-orange-500 !text-white !border-none hover:scale-105 active:scale-95 px-4 shadow-xl flex items-center gap-2 w-full justify-center text-sm">
                                    Start <Play className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="absolute right-0 top-0 w-32 h-32 bg-orange-500 rounded-full blur-[60px] opacity-20" />
                        </div>

                        <div className="bg-gradient-to-br from-pink-600 to-purple-700 rounded-[2.5rem] p-6 text-white relative overflow-hidden shadow-2xl transition-transform hover:scale-[1.01]">
                            <div className="relative z-10 flex flex-col items-start h-full justify-between">
                                <div>
                                    <span className="bg-pink-400 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3 inline-block">Phase 3</span>
                                    <h2 className="text-2xl font-black mb-2">Upskill</h2>
                                    <p className="text-gray-300 mb-4 text-sm">AI-powered learning.</p>
                                </div>
                                <Button onClick={() => navigate('/student/upskill')} className="!bg-white !text-pink-600 !border-none hover:scale-105 active:scale-95 px-4 shadow-xl flex items-center gap-2 w-full justify-center text-sm">
                                    Learn <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="absolute right-0 top-0 w-32 h-32 bg-pink-400 rounded-full blur-[60px] opacity-20" />
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-dark-card border-2 border-black dark:border-gray-700 rounded-[2rem] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-none">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Target className="w-5 h-5" /></div>
                                <h3 className="font-bold">Skill Score</h3>
                            </div>
                            <p className="text-4xl font-black">{recommendation?.skill_score || profile?.skill_score || 0}</p>
                            <p className="text-sm text-gray-500 mt-1">Your verified score</p>
                        </motion.div>

                        <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-dark-card border-2 border-black dark:border-gray-700 rounded-[2rem] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-none">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-green-100 rounded-lg text-green-600"><BookOpen className="w-5 h-5" /></div>
                                <h3 className="font-bold">Applications</h3>
                            </div>
                            <p className="text-4xl font-black">{myApplications.length}</p>
                            <p className="text-sm text-gray-500 mt-1">Jobs applied to</p>
                        </motion.div>
                    </div>
                </div>

                {/* Sidebar: Recommendation & Browse Jobs */}
                <div className="space-y-8">
                    {/* AI Recommendation Card */}
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                        <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                            <Award className="w-6 h-6" /> AI Recommendation
                        </h3>
                        {recommendation?.status === 'ready' ? (
                            <div className="space-y-4">
                                {/* Star Rating */}
                                <div className="flex items-center gap-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-5 h-5 ${i < Math.round(recommendation.star_rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-white/30'}`} />
                                    ))}
                                    <span className="text-sm ml-2">{recommendation.star_rating?.toFixed(1) || '0.0'}/5</span>
                                </div>

                                {/* Stage Badge */}
                                <div className="flex items-center gap-2">
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${recommendation.stage === 'verified' ? 'bg-green-500' : 'bg-orange-400'}`}>
                                        {recommendation.stage === 'verified' ? '✓ Verified' : 'Needs Improvement'}
                                    </span>
                                </div>

                                {/* Scores */}
                                <div className="grid grid-cols-2 gap-3 text-center">
                                    <div className="bg-white/10 rounded-xl p-3">
                                        <p className="text-2xl font-black">{recommendation.personality_score || 0}</p>
                                        <p className="text-xs text-white/70">Personality</p>
                                    </div>
                                    <div className="bg-white/10 rounded-xl p-3">
                                        <p className="text-2xl font-black">{recommendation.skill_score?.toFixed(1) || '0.0'}%</p>
                                        <p className="text-xs text-white/70">Skill Test</p>
                                    </div>
                                </div>

                                {/* Strengths */}
                                {recommendation.strengths && recommendation.strengths.length > 0 && (
                                    <div>
                                        <p className="text-xs font-bold uppercase text-white/70 mb-1">Strengths</p>
                                        <ul className="text-xs space-y-1 max-h-20 overflow-y-auto">
                                            {(Array.isArray(recommendation.strengths) ? recommendation.strengths.slice(0, 3) : [recommendation.strengths]).map((s, i) => (
                                                <li key={i} className="flex items-start gap-1"><span className="text-green-300">✓</span> {s}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Weaknesses */}
                                {recommendation.weaknesses && recommendation.weaknesses.length > 0 && (
                                    <div>
                                        <p className="text-xs font-bold uppercase text-white/70 mb-1">Areas to Improve</p>
                                        <ul className="text-xs space-y-1 max-h-20 overflow-y-auto">
                                            {(Array.isArray(recommendation.weaknesses) ? recommendation.weaknesses.slice(0, 2) : [recommendation.weaknesses]).map((w, i) => (
                                                <li key={i} className="flex items-start gap-1"><span className="text-orange-300">!</span> {w}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Recommended Tags */}
                                {recommendation.recommended_tags && recommendation.recommended_tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {(Array.isArray(recommendation.recommended_tags) ? recommendation.recommended_tags : []).map((tag, i) => (
                                            <span key={i} className="bg-white/20 px-2 py-1 rounded-full text-xs font-bold">{tag}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p className="text-sm text-white/80">{recommendation?.message || 'Complete Phase 2 Skill Test to unlock your personalized AI recommendation.'}</p>
                        )}
                        <div className="absolute right-0 bottom-0 w-32 h-32 bg-white rounded-full blur-[60px] opacity-10" />
                    </div>

                    {/* My Applications */}
                    <div className="bg-white dark:bg-dark-card border-2 border-light-border dark:border-gray-700 rounded-[2.5rem] p-8">
                        <h3 className="text-xl font-black mb-4 flex items-center gap-2"><Briefcase className="w-5 h-5" /> My Applications</h3>
                        {myApplications.length > 0 ? (
                            <div className="space-y-3 max-h-48 overflow-y-auto">
                                {myApplications.map((app, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                        <div>
                                            <p className="font-bold text-sm">{app.job_title || `Job #${app.job}`}</p>
                                            <p className="text-xs text-gray-500">{app.company_name || 'Company'}</p>
                                        </div>
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : app.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {app.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">No applications yet. Browse jobs to apply!</p>
                        )}
                        <Button onClick={openBrowseJobs} className="w-full mt-6 flex items-center justify-center gap-2 !bg-black !text-white dark:!bg-white dark:!text-black">
                            <Briefcase className="w-4 h-4" /> Browse Jobs
                        </Button>
                    </div>
                </div>
            </div>

            {/* Browse Jobs Modal */}
            <AnimatePresence>
                {isJobModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setIsJobModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white dark:bg-dark-card rounded-[2rem] p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto border-2 border-black dark:border-gray-700"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-3xl font-black">Browse Jobs</h2>
                                <button onClick={() => setIsJobModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {jobs.length === 0 ? (
                                <p className="text-center text-gray-500 py-12">No open jobs at the moment. Check back later!</p>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {jobs.map(job => (
                                        <div key={job.id} className="border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:border-black dark:hover:border-white transition-colors">
                                            <div className="flex justify-between items-start mb-3">
                                                <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{job.category}</span>
                                                <span className="text-xs text-gray-500">{job.company_name}</span>
                                            </div>
                                            <h3 className="text-lg font-bold mb-2">{job.title}</h3>
                                            <p className="text-sm text-gray-500 line-clamp-2 mb-4">{job.description}</p>
                                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                                                <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> ${job.budget_amount}</span>
                                                <span className="flex items-center gap-1"><Target className="w-4 h-4 text-orange-500" /> {job.min_skill_score}+ Score</span>
                                            </div>
                                            {hasApplied(job.id) ? (
                                                <Button disabled className="w-full !bg-green-100 !text-green-700 !border-green-300 flex items-center justify-center gap-2">
                                                    <CheckCircle className="w-4 h-4" /> Applied
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={() => handleApply(job.id)}
                                                    disabled={applyingTo === job.id}
                                                    className="w-full flex items-center justify-center gap-2"
                                                >
                                                    {applyingTo === job.id ? 'Applying...' : <><Send className="w-4 h-4" /> Apply Now</>}
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default StudentDashboard;
