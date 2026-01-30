import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Button from '../../components/ui/Button';
import { Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import ProctorWrapper from '../../components/assessment/ProctorWrapper';

const PersonalityTest = () => {
    const { tokens } = useAuthStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [started, setStarted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    // Fix for mismatched API keys
    // Backend sends 'question' but frontend used 'text'. 
    // Backend also sends options as Dict {"Option Text": Value}.
    // We need to render the key ("Option Text") and send it back as the answer.

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/verification/personality/questions/', {
                    headers: { 'Authorization': `Bearer ${tokens?.access}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setQuestions(data);
                }
            } catch (error) { console.error("Failed", error); }
            finally { setLoading(false); }
        };
        fetchQuestions();
    }, [tokens]);

    const startTest = async () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            try { await elem.requestFullscreen(); } catch (e) { }
        }
        setStarted(true);
    };

    const handleOptionSelect = (qId, value) => {
        setAnswers(prev => ({ ...prev, [qId]: value }));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/verification/personality/submit/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokens?.access}`
                },
                body: JSON.stringify({ answers })
            });
            if (response.ok) navigate('/student/dashboard');
            else alert("Submission failed.");
        } catch (error) { console.error(error); }
    };

    if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

    if (!started) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 text-center bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">
                <h1 className="text-6xl font-black mb-6 tracking-tighter">PHASE 1: <span className="text-purple-500">ARCHETYPE</span></h1>
                <div className="max-w-2xl bg-gray-900/50 p-8 rounded-3xl border border-gray-800 backdrop-blur-xl mb-12 text-left space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2"><CheckCircle className="text-green-500" /> Environment Check</h3>
                    <p className="text-gray-400">
                        This test analyzes your personality traits. To ensure focus:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-400">
                        <li>Fullscreen mode will be active.</li>
                        <li>Please complete in one sitting.</li>
                    </ul>
                </div>
                <Button onClick={startTest} className="px-12 py-5 text-2xl !bg-white !text-black hover:scale-105 transition-transform">
                    Start Analysis
                </Button>
            </div>
        );
    }

    return (
        <ProctorWrapper onDisqualify={() => { }} onWarning={() => { }}>
            <div className="min-h-screen bg-light-canvas dark:bg-dark-canvas p-6 md:p-12">
                <header className="mb-12 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
                        Personality Archetype <Sparkles className="w-8 h-8 inline text-purple-500" />
                    </h1>
                </header>

                <div className="max-w-4xl mx-auto space-y-8">
                    {questions.map((q, idx) => (
                        <motion.div
                            key={q.id || idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-dark-card border-2 border-black dark:border-gray-700 rounded-[2rem] p-8"
                        >
                            <h3 className="text-xl font-bold mb-6">{q.text}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {(q.options ? Object.entries(q.options) : ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']).map((opt, i) => {
                                    const val = Array.isArray(opt) ? opt[0] : (i + 1);
                                    const label = Array.isArray(opt) ? opt[0] : opt;
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => handleOptionSelect(q.id || idx + 1, val)}
                                            className={`p-4 rounded-xl border-2 font-bold transition-all text-left ${(answers[q.id || idx + 1] === val)
                                                ? 'bg-purple-100 border-purple-500 text-purple-700'
                                                : 'border-gray-200 hover:border-black'
                                                }`}
                                        >
                                            {label}
                                        </button>
                                    )
                                })}
                            </div>
                        </motion.div>
                    ))}
                    <div className="flex justify-end pt-8 pb-24">
                        <Button onClick={handleSubmit} className="px-12 py-4 text-xl shadow-xl">
                            Submit Analysis <ArrowRight className="ml-2" />
                        </Button>
                    </div>
                </div>
            </div>
        </ProctorWrapper>
    );
};

export default PersonalityTest;
