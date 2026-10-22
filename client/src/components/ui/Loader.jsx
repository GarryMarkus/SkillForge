import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Loader = ({ onFinished }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onFinished, 500); // Small delay after hitting 100%
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        return () => clearInterval(timer);
    }, [onFinished]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-[100] bg-light-canvas dark:bg-dark-canvas flex flex-col items-center justify-center p-6"
        >
            <div className="relative flex flex-col items-center gap-8 max-w-sm w-full">
                {/* Animated Logo */}
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="p-6 rounded-[2rem] bg-white dark:bg-dark-card border-4 border-light-border dark:border-gray-700 shadow-2xl"
                >
                    <Sparkles className="w-16 h-16 text-blue-500" />
                </motion.div>

                {/* Text and Percentage */}
                <div className="text-center space-y-2">
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-black tracking-tighter text-light-border dark:text-white"
                    >
                        SkillForge<span className="text-blue-500">.</span>
                    </motion.h1>
                    <p className="font-script text-2xl text-gray-400 dark:text-gray-500">
                        Verifying talent... {progress}%
                    </p>
                </div>

                {/* Custom Progress Bar */}
                <div className="w-full h-4 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden border-2 border-light-border dark:border-gray-700">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-blue-500"
                    />
                </div>

                {/* Floating Accents */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-200/30 rounded-full blur-2xl animate-pulse" />
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-200/30 rounded-full blur-2xl animate-pulse delay-700" />
                </div>
            </div>
        </motion.div>
    );
};

export default Loader;
