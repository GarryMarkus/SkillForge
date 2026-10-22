import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
    return (
        <section className="py-24 px-4 w-full">
            <Card className="w-full max-w-5xl mx-auto bg-black text-white dark:bg-white dark:text-black py-20 px-6 text-center overflow-visible">
                <h2 className="text-4xl md:text-6xl font-black mb-6">
                    Ready to prove your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">worth?</span>
                </h2>
                <p className="text-xl text-gray-400 dark:text-gray-600 mb-10 max-w-2xl mx-auto">
                    Join 10,000+ developers getting verified and hired by top startups.
                    No degrees required. Just skills.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button variant="primary" className="w-full sm:w-auto text-lg py-4 px-10">
                        Join the Waitlist <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-30" />
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-yellow-500 rounded-full blur-[100px] opacity-30" />
                </div>
            </Card>
        </section>
    );
};

export default CTA;
