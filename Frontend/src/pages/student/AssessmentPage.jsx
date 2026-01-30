import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import ProctorWrapper from '../../components/assessment/ProctorWrapper';
import Button from '../../components/ui/Button';
import { CheckCircle, Clock } from 'lucide-react';

const AssessmentPage = () => {
    const { tokens } = useAuthStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [examStarted, setExamStarted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [sessionId, setSessionId] = useState(null);
    const [timeLeft, setTimeLeft] = useState(1800); // 30 mins

    useEffect(() => {
        // Mocking exam fetch or actual fetch
        // In real flow: 1. Fetch Exam List -> 2. Select Exam -> 3. Start Session
        // For demo: Auto-start the "General Assessment"
        const initExam = async () => {
            // Mock questions for demo if backend is empty
            setQuestions([
                { id: 1, text: "Which HTTP method is idempotent?", options: ["POST", "GET", "PATCH"], correct: "GET" },
                { id: 2, text: "What follows the 'virtual' keyword in C++?", options: ["function", "class", "destructor"], correct: "destructor" },
                // Add more or fetch from API
            ]);
            setLoading(false);
        };
        initExam();
    }, []);

    const startTest = async () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            await elem.requestFullscreen();
        }
        setExamStarted(true);
        // Call /api/proctor/start/ here
    };

    const handleAnswer = (option) => {
        setAnswers({ ...answers, [questions[currentQuestion].id]: option });
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(curr => curr + 1);
        } else {
            submitExam();
        }
    };

    const submitExam = async () => {
        // Call /api/proctor/end/
        navigate('/student/dashboard');
    };

    const handleDisqualify = (reason) => {
        alert("Disqualified: " + reason);
        navigate('/student/dashboard');
    };

    if (loading) return <div className="text-white bg-black h-screen flex items-center justify-center">Loading Assessment...</div>;

    if (!examStarted) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 text-center bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">
                <h1 className="text-6xl font-black mb-6 tracking-tighter">PHASE 1: <span className="text-orange-500">VERIFICATION</span></h1>
                <div className="max-w-2xl bg-gray-900/50 p-8 rounded-3xl border border-gray-800 backdrop-blur-xl mb-12 text-left space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2"><CheckCircle className="text-green-500" /> Proctoring Active</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-400">
                        <li>Camera monitoring enabled.</li>
                        <li>Fullscreen mode enforced.</li>
                        <li>Tab switching logs a violation (3 strikes = fail).</li>
                        <li>Copy/Paste functions disabled.</li>
                    </ul>
                </div>
                <Button onClick={startTest} className="px-12 py-5 text-2xl !bg-white !text-black hover:scale-105 transition-transform">
                    I Agree & Start Test
                </Button>
            </div>
        );
    }

    return (
        <ProctorWrapper onDisqualify={handleDisqualify} onWarning={(msg) => console.log(msg)}>
            <div className="container mx-auto px-4 py-8 h-screen flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center mb-12">
                    <div className="text-sm font-bold text-gray-500">
                        Question {currentQuestion + 1} / {questions.length}
                    </div>
                    <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full font-mono text-orange-500">
                        <Clock className="w-4 h-4" /> 29:45
                    </div>
                </div>

                {/* Question Area */}
                <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full">
                    <motion.h2
                        key={currentQuestion}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-3xl md:text-5xl font-bold mb-12 leading-tight"
                    >
                        {questions[currentQuestion].text}
                    </motion.h2>

                    <div className="grid grid-cols-1 gap-4">
                        {questions[currentQuestion].options.map((option, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(option)}
                                className={`p-6 text-left rounded-2xl border-2 transition-all text-xl font-medium ${answers[questions[currentQuestion].id] === option
                                        ? 'bg-orange-500 border-orange-500 text-black'
                                        : 'border-gray-700 hover:border-white hover:bg-gray-800'
                                    }`}
                            >
                                <span className="mr-4 opacity-50">{String.fromCharCode(65 + idx)}.</span>
                                {option}
                            </button>
                        ))}
                    </div>

                    <div className="mt-12 flex justify-end">
                        <Button onClick={nextQuestion} className="px-8 !bg-white !text-black">
                            {currentQuestion === questions.length - 1 ? 'Submit' : 'Next Question'}
                        </Button>
                    </div>
                </div>
            </div>
        </ProctorWrapper>
    );
};

export default AssessmentPage;
