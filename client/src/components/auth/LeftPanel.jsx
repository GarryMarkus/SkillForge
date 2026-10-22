import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Trophy, Target } from 'lucide-react';

const LeftPanel = () => {
    return (
        <>
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-purple-600/30 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-blue-600/30 rounded-full blur-[120px] animate-pulse delay-1000" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-3xl font-black text-white tracking-tighter">SkillForge</span>
                </div>
            </div>

            <div className="relative z-10 flex flex-col gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-5xl font-bold text-white leading-tight mb-4">
                        Transform Your Skills, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            Transform Your Career.
                        </span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-md">
                        Join thousands of students and companies bridging the gap between learning and earning.
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {[
                        { icon: Zap, text: "AI-Powered Personalization", color: "text-yellow-400" },
                        { icon: Target, text: "Learn 40% Faster", color: "text-red-400" },
                        { icon: Trophy, text: "60% Job Placement Rate", color: "text-green-400" },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + (i * 0.1) }}
                            className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm"
                        >
                            <item.icon className={`w-6 h-6 ${item.color}`} />
                            <span className="text-white font-medium">{item.text}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="relative z-10 w-full">
                <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
                    <span>© 2026 SkillForge Inc.</span>
                    <span>v2.0.1</span>
                </div>
            </div>
        </>
    );
};

export default LeftPanel;
