import React from 'react';
import { motion } from 'framer-motion';

const logos = [
    { name: 'Zomato', color: 'text-red-600' },
    { name: 'Swiggy', color: 'text-orange-500' },
    { name: 'Razorpay', color: 'text-blue-600' },
    { name: 'CRED', color: 'text-black dark:text-white' },
    { name: 'Groww', color: 'text-teal-600' },
    { name: 'IIT Delhi', color: 'text-gray-800 dark:text-gray-200' },
    { name: 'IIT Bombay', color: 'text-gray-800 dark:text-gray-200' },
    { name: 'Flipkart', color: 'text-blue-500' },
];

const TrustBar = () => {
    return (
        <section className="w-full py-12 overflow-hidden bg-white/50 dark:bg-black/20 backdrop-blur-sm border-y border-light-border/10 dark:border-white/5">
            <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
                <p className="font-script text-2xl text-gray-500 dark:text-gray-400 rotate-1">
                    Trusted by top startups & institutes
                </p>
            </div>

            <div className="relative flex w-full overflow-hidden mask-fade-sides">
                <motion.div
                    className="flex whitespace-nowrap gap-16"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20,
                    }}
                >
                    {[...logos, ...logos, ...logos].map((logo, index) => (
                        <div key={index} className="flex items-center justify-center min-w-[150px]">
                            <span className={`text-3xl font-black ${logo.color} opacity-80 hover:opacity-100 transition-opacity cursor-default`}>
                                {logo.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TrustBar;
