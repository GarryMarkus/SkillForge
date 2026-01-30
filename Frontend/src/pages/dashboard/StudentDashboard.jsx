import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import ThemeToggle from '../../components/layout/ThemeToggle';
import { LogOut, BookOpen, Target, Award, Play, ChevronRight, Briefcase } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
    const { logout, user, tokens } = useAuthStore();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);

    // Redirect to onboarding if not complete
    useEffect(() => {
        if (user && user.onboarding_stage < 2) {
            navigate('/student/onboarding');
        }
    }, [user, navigate]);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!tokens?.access) return;
            try {
                const response = await fetch('http://localhost:8000/api/accounts/profile/', {
                    headers: { 'Authorization': `Bearer ${tokens.access}` }
                });
                if (response.ok) {
                    setProfile(await response.json());
                }
            } catch (error) { console.error(error); }
        };
        fetchProfile();
    }, [tokens]);

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
                    <Button onClick={() => window.location.href = '/student/onboarding'} variant="secondary" className="!text-xs">
                        Update Profile
                    </Button>
                    <Button
                        onClick={logout}
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
                    {/* Assessment Call to Action */}
                    <div className="bg-gradient-to-br from-black to-gray-800 dark:from-gray-800 dark:to-black rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
                        <div className="relative z-10">
                            <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4 inline-block">
                                Recommended
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black mb-4">Skill Assessment Phase 1</h2>
                            <p className="text-gray-300 text-lg mb-8 max-w-md">
                                Verify your technical prowess. Proctored environment. 30 Minutes.
                            </p>
                            <Button
                                onClick={() => navigate('/student/assessment')}
                                className="!bg-white !text-black !border-none hover:scale-105 active:scale-95 text-lg px-8 shadow-xl"
                            >
                                Start Assessment <Play className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                        {/* Decor */}
                        <div className="absolute right-0 top-0 w-64 h-64 bg-orange-500 rounded-full blur-[100px] opacity-20" />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-dark-card border-2 border-black dark:border-gray-700 rounded-[2rem] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-none">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Target className="w-5 h-5" /></div>
                                <h3 className="font-bold">Skill Score</h3>
                            </div>
                            <p className="text-4xl font-black">{profile?.skill_score || 0}</p>
                            <p className="text-sm text-gray-500 mt-1">Top 5% of candidates</p>
                        </motion.div>

                        <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-dark-card border-2 border-black dark:border-gray-700 rounded-[2rem] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-none">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-green-100 rounded-lg text-green-600"><BookOpen className="w-5 h-5" /></div>
                                <h3 className="font-bold">Learning Path</h3>
                            </div>
                            <p className="text-xl font-bold line-clamp-1">{profile?.education || "Not started"}</p>
                            <button className="text-sm font-bold text-green-600 mt-2 flex items-center gap-1 hover:underline">
                                Continue Upskilling <ChevronRight className="w-4 h-4" />
                            </button>
                        </motion.div>
                    </div>
                </div>

                {/* Sidebar: Activity Board & Profile Analysis */}
                <div className="space-y-8">
                    {/* Partial Analysis Report */}
                    <div className="bg-orange-50 dark:bg-orange-900/10 border-2 border-orange-200 dark:border-orange-900/40 rounded-[2.5rem] p-8">
                        <h3 className="text-xl font-black text-orange-900 dark:text-orange-100 mb-4 flex items-center gap-2">
                            <Award className="w-6 h-6" /> Strength Analysis
                        </h3>
                        <div className="space-y-4">
                            {profile?.skills ? (
                                profile.skills.split(',').slice(0, 3).map((skill, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <span className="font-bold text-gray-700 dark:text-gray-300">{skill}</span>
                                        <div className="h-2 w-24 bg-white rounded-full overflow-hidden">
                                            <div className="h-full bg-orange-400 w-[70%]" />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">Complete assessments to unlock detailed analysis.</p>
                            )}
                        </div>
                    </div>

                    {/* Activity Board */}
                    <div className="bg-white dark:bg-dark-card border-2 border-light-border dark:border-gray-700 rounded-[2.5rem] p-8">
                        <h3 className="text-xl font-black mb-6">Activity Board</h3>
                        <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700">
                            <div className="relative pl-8">
                                <div className="absolute left-1 top-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-dark-card" />
                                <h4 className="font-bold">Profile Created</h4>
                                <p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
                            </div>
                            {user && user.onboarding_stage >= 2 && (
                                <div className="relative pl-8">
                                    <div className="absolute left-1 top-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white dark:border-dark-card" />
                                    <h4 className="font-bold">Resume Analyzed</h4>
                                    <p className="text-xs text-gray-500 text-green-600 font-bold">Completed</p>
                                </div>
                            )}
                            <div className="relative pl-8 opacity-50">
                                <div className="absolute left-1 top-1 w-4 h-4 bg-gray-300 rounded-full border-2 border-white dark:border-dark-card" />
                                <h4 className="font-bold">Assessment Phase 1</h4>
                                <p className="text-xs text-gray-500">Pending</p>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full mt-6 flex items-center justify-center gap-2">
                            <Briefcase className="w-4 h-4" /> Browse Jobs
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
