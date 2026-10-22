import React, { useState } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { motion } from 'framer-motion';

const Gauge = ({ score }) => {
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 1000) * circumference;

    return (
        <div className="relative flex items-center justify-center w-64 h-64">
            {/* Background Track */}
            <svg className="w-full h-full transform -rotate-90">
                <circle
                    cx="128"
                    cy="128"
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="20"
                    className="text-gray-200 dark:text-gray-700"
                />
                {/* Progress Arc */}
                <motion.circle
                    cx="128"
                    cy="128"
                    r={radius}
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="20"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    whileInView={{ strokeDashoffset: offset }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#fca5a5" />
                        <stop offset="50%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Score Text */}
            <div className="absolute flex flex-col items-center">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-6xl font-black text-gray-800 dark:text-white"
                >
                    {score}
                </motion.span>
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Skill Score</span>
            </div>
        </div>
    );
};

const SkillCIBIL = () => {
    return (
        <section className="py-24 w-full bg-light-card/50 dark:bg-dark-card/30">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">

                {/* Text Content */}
                <div className="flex-1 space-y-8 text-center md:text-left">
                    <Badge color="bg-purple-200">New Standard</Badge>
                    <h2 className="text-5xl md:text-6xl font-black leading-tight">
                        The <span className="text-purple-600">Skill CIBIL</span> Score.
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Stop relying on static resumes. Your Skill CIBIL Score is a living, breathing proof of your capabilities.
                        Verified by AI, backed by code, and trusted by employers.
                    </p>
                    <ul className="space-y-4 text-lg font-medium text-gray-700 dark:text-gray-200">
                        <li className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</span>
                            Real-time performance tracking
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</span>
                            Benchmarked against top 1% talent
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</span>
                            Direct pass to interview rounds
                        </li>
                    </ul>
                    <Button variant="primary">Check Your Score</Button>
                </div>

                {/* Visual */}
                <div className="flex-1 flex justify-center">
                    <Card className="p-10 flex flex-col items-center bg-white dark:bg-black border-4 border-light-border dark:border-gray-600 !rounded-[3rem]">
                        <div className="mb-6">
                            <Gauge score={850} />
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-black">Top 1% Talent</h3>
                            <p className="text-gray-500">Google L4 Equivalent</p>
                        </div>
                    </Card>
                </div>

            </div>
        </section>
    );
};

export default SkillCIBIL;
