import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import { ArrowRight, CheckCircle, BarChart3, Users, Activity } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative w-full max-w-7xl mx-auto pt-32 pb-32 flex flex-col items-center text-center px-4">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-10 left-[10%] w-64 h-64 bg-yellow-200/50 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-color animate-blob" />
                <div className="absolute top-10 right-[10%] w-64 h-64 bg-purple-200/50 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-color animate-blob animation-delay-2000" />
            </div>

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl px-4"
            >
                <Badge color="bg-green-200" rotate="rotate-2">Verified</Badge>
                <Badge color="bg-yellow-200" rotate="-rotate-3">Guaranteed</Badge>

                <h1 className="mt-6 text-6xl md:text-8xl font-black tracking-tight leading-[0.9]">
                    Transform into the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">top 1%</span> of talent.
                </h1>

                <p className="mt-8 text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    SkillForge bridges the gap between learning and earning through
                    <span className="font-bold text-light-border dark:text-white mx-1">AI-powered verification</span>
                    and startup-centric paths.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button variant="primary" className="w-full sm:w-auto text-xl py-4">
                        Start Verification <ArrowRight className="ml-2 w-6 h-6" />
                    </Button>
                    <Button variant="secondary" className="w-full sm:w-auto text-xl py-4">
                        View Paths
                    </Button>
                </div>
            </motion.div>

            {/* Hero Visual - Dashboard Mockup */}
            <div className="w-full mt-20 px-4">
                <Card className="w-full max-w-5xl mx-auto aspect-[16/9] bg-neutral-50 dark:bg-neutral-900 !rounded-[3rem] border-4 border-light-border dark:border-gray-700 shadow-2xl overflow-hidden relative group">

                    {/* Mockup Header */}
                    <div className="absolute top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-8 justify-between">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400" />
                            <div className="w-3 h-3 rounded-full bg-yellow-400" />
                            <div className="w-3 h-3 rounded-full bg-green-400" />
                        </div>
                        <div className="w-1/3 h-2 bg-gray-100 dark:bg-gray-700 rounded-full" />
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                <Activity className="w-4 h-4 text-blue-500" />
                            </div>
                        </div>
                    </div>

                    {/* Mockup Sidebar */}
                    <div className="absolute top-16 left-0 bottom-0 w-20 md:w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex flex-col p-6 gap-4">
                        <div className="h-4 w-32 bg-gray-100 dark:bg-gray-700 rounded mb-8" />
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-10 w-full rounded-xl bg-gray-50 dark:bg-gray-700/50 flex items-center px-4 gap-3">
                                <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-600" />
                                <div className="w-20 h-2 bg-gray-200 dark:bg-gray-600 rounded" />
                            </div>
                        ))}
                        <div className="mt-auto h-32 w-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-4">
                            <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 mb-2" />
                            <div className="w-16 h-2 bg-white/50 dark:bg-gray-700/50 rounded" />
                        </div>
                    </div>

                    {/* Mockup Main Content */}
                    <div className="absolute top-16 left-0 md:left-64 right-0 bottom-0 p-8 overflow-hidden bg-neutral-50 dark:bg-neutral-900">
                        <div className="mb-8 flex justify-between items-end">
                            <div>
                                <div className="w-48 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2" />
                                <div className="w-32 h-4 bg-gray-100 dark:bg-gray-800 rounded-lg" />
                            </div>
                            <div className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-bold">
                                Export Report
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Card 1 */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm col-span-2">
                                <div className="flex justify-between mb-8">
                                    <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                                        <BarChart3 className="w-5 h-5 text-orange-500" />
                                    </div>
                                    <span className="text-green-500 font-bold">+24%</span>
                                </div>
                                <div className="w-full h-32 flex items-end justify-between gap-2">
                                    {[40, 70, 45, 90, 60, 80, 55, 95].map((h, i) => (
                                        <div key={i} className="w-full bg-orange-500/10 dark:bg-orange-500/20 rounded-t-lg relative group">
                                            <div style={{ height: `${h}%` }} className="absolute bottom-0 left-0 right-0 bg-orange-500 rounded-t-lg opacity-80" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col justify-between">
                                <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center mb-4">
                                    <Users className="w-5 h-5 text-pink-500" />
                                </div>
                                <div>
                                    <div className="text-3xl font-black text-gray-800 dark:text-white mb-1">1,204</div>
                                    <div className="text-sm text-gray-400">Verified Peers</div>
                                </div>
                                <div className="flex -space-x-2 mt-4">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-600" />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row */}
                        <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                </div>
                                <div>
                                    <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
                                    <div className="w-20 h-3 bg-gray-100 dark:bg-gray-800 rounded" />
                                </div>
                            </div>
                            <div className="w-24 h-8 bg-black/5 dark:bg-white/10 rounded-full" />
                        </div>
                    </div>

                    {/* Overlay Prompt */}
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
                        <div className="bg-white dark:bg-gray-900 px-8 py-4 rounded-full shadow-2xl border border-gray-200 dark:border-gray-700 flex items-center gap-3 animate-bounce">
                            <CheckCircle className="w-6 h-6 text-green-500 fill-current" />
                            <span className="font-bold text-lg dark:text-white">Live Preview</span>
                        </div>
                    </div>

                </Card>
            </div>
        </section>
    );
};

export default Hero;
