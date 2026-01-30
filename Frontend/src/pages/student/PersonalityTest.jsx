import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Button from '../../components/ui/Button';
import { Sparkles, ArrowRight } from 'lucide-react';

const PersonalityTest = () => {
    const { tokens } = useAuthStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/verification/personality/questions/', {
                    headers: { 'Authorization': `Bearer ${tokens?.access}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setQuestions(data); // Assuming array of {id, text, options?}
                }
            } catch (error) {
                console.error("Failed to load questions", error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, [tokens]);

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

            if (response.ok) {
                navigate('/student/dashboard');
            } else {
                alert("Submission failed.");
            }
        } catch (error) {
            console.error("Error submitting", error);
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-light-canvas dark:bg-dark-canvas p-6 md:p-12">
            <header className="mb-12 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
                    Personality Archetype <Sparkles className="w-8 h-8 inline text-purple-500" />
                </h1>
                <p className="font-script text-xl text-gray-500">
                    Let's understand how you work best.
                </p>
            </header>

            <div className="max-w-4xl mx-auto space-y-8">
                {questions.map((q, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white dark:bg-dark-card border-2 border-black dark:border-gray-700 rounded-[2rem] p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-none"
                    >
                        <h3 className="text-xl font-bold mb-6">{q.text}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Assuming options are part of the question or standard Likert. 
                                Adjusting based on common API patterns or manual options if API returns raw text.
                                If API doesn't send options, we default to Agree/Disagree scales. 
                            */}
                            {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleOptionSelect(q.id || idx, i + 1)} // sending 1-5 score
                                    className={`p-4 rounded-xl border-2 font-bold transition-all text-left ${answers[q.id || idx] === (i + 1)
                                            ? 'bg-purple-100 border-purple-500 text-purple-700'
                                            : 'border-gray-200 hover:border-black'
                                        }`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                ))}

                <div className="flex justify-end pt-8">
                    <Button onClick={handleSubmit} className="px-12 py-4 text-xl shadow-xl">
                        Submit Analysis <ArrowRight className="ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PersonalityTest;
