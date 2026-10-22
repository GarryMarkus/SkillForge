import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const SuccessState = () => {
    const navigate = useNavigate();
    const [count, setCount] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCount((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center py-10 text-center">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mb-6 shadow-xl shadow-green-500/30"
            >
                <Check className="w-12 h-12 text-white stroke-[3]" />
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-black text-black dark:text-white mb-2"
            >
                Welcome to SkillForge!
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-500 text-lg mb-8 max-w-sm"
            >
                Your account has been created successfully. Let's start transforming your career.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
            >
                <Button onClick={() => navigate('/')} className="px-8 py-3 flex items-center gap-2">
                    Start Your Journey <ArrowRight className="w-4 h-4" />
                </Button>
                <p className="text-sm text-gray-400">
                    Redirecting in {count}s...
                </p>
            </motion.div>
        </div>
    );
};

export default SuccessState;
