import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { BookOpen, ShieldCheck, Banknote } from 'lucide-react';

const steps = [
    {
        icon: BookOpen,
        title: "Phase 1: Learn",
        description: "Master in-demand skills with expert-curated paths and real-world projects.",
        color: "bg-blue-100",
        textColor: "text-blue-600",
        badge: "Curated",
        badgeColor: "bg-blue-200"
    },
    {
        icon: ShieldCheck,
        title: "Phase 2: Verify",
        description: "Get your skills validated by AI and industry experts. Prove your worth.",
        color: "bg-green-100",
        textColor: "text-green-600",
        badge: "AI-Powered",
        badgeColor: "bg-green-200"
    },
    {
        icon: Banknote,
        title: "Phase 3: Earn",
        description: "Unlock exclusive job opportunities and get hired by top startups.",
        color: "bg-yellow-100",
        textColor: "text-yellow-600",
        badge: "High Pay",
        badgeColor: "bg-yellow-200"
    }
];

const LearnVerifyEarn = () => {
    return (
        <section className="py-24 px-4 w-full max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-5xl md:text-6xl font-black mb-6">
                    How it <span className="underline decoration-wavy decoration-orange-400">Works</span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    A simple three-step process to accelerate your career.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                    <Card key={index} className="p-8 flex flex-col items-center text-center overflow-visible group" delay={index * 0.1}>
                        <div className={`p-6 rounded-3xl ${step.color} mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                            <step.icon className={`w-12 h-12 ${step.textColor}`} />
                        </div>

                        <Badge color={step.badgeColor} className="absolute -top-4 right-8 rotate-3">
                            {step.badge}
                        </Badge>

                        <h3 className="text-3xl font-black mb-4">{step.title}</h3>
                        <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                            {step.description}
                        </p>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default LearnVerifyEarn;
