import React from 'react';
import Card from '../ui/Card';
import { motion } from 'framer-motion';

const testimonials = [
    {
        text: "Placed at Zomato as SDE-1. The verification process changed everything.",
        metric: "18 LPA Package",
        user: "Rahul S.",
        color: "bg-red-100 dark:bg-red-900/30",
        textColor: "text-red-700 dark:text-red-300"
    },
    {
        text: "My Skill CIBIL score got me shortlisted before I even applied.",
        metric: "Score: 890",
        user: "Ananya M.",
        color: "bg-blue-100 dark:bg-blue-900/30",
        textColor: "text-blue-700 dark:text-blue-300"
    },
    {
        text: "Startup-centric paths are way better than generic DSA courses.",
        metric: "Frontend Lead",
        user: "Vikram K.",
        color: "bg-yellow-100 dark:bg-yellow-900/30",
        textColor: "text-yellow-700 dark:text-yellow-300"
    },
    {
        text: "From Tier-3 college to a funded startup. SkillForge works.",
        metric: "12 LPA + ESOPs",
        user: "Sujith R.",
        color: "bg-green-100 dark:bg-green-900/30",
        textColor: "text-green-700 dark:text-green-300"
    },
    {
        text: "The mentorship is brutal but exactly what you need.",
        metric: "Product Designer",
        user: "Meera P.",
        color: "bg-purple-100 dark:bg-purple-900/30",
        textColor: "text-purple-700 dark:text-purple-300"
    },
    {
        text: "Finally, a platform that values skills over college degrees.",
        metric: "Backend Dev",
        user: "Arjun N.",
        color: "bg-orange-100 dark:bg-orange-900/30",
        textColor: "text-orange-700 dark:text-orange-300"
    }
];

const Testimonials = () => {
    return (
        <section className="py-24 px-4 w-full max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-5xl md:text-6xl font-black mb-6">
                    Wall of <span className="text-red-500">Love</span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    Real stories from real developers.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((t, index) => (
                    <Card key={index} className="!rounded-[2rem] p-6 hover:shadow-2xl transition-shadow" delay={index * 0.1}>
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${t.color} ${t.textColor}`}>
                            {t.metric}
                        </div>
                        <p className="text-lg font-medium leading-relaxed mb-6">
                            "{t.text}"
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                            <span className="font-bold">{t.user}</span>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
