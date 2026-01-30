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
    const [attemptId, setAttemptId] = useState(null);
    const [timeLeft, setTimeLeft] = useState(1800); // 30 mins

    useEffect(() => {
        const initExam = async () => {
            if (!tokens?.access) return;
            try {
                const response = await fetch('http://localhost:8000/api/verification/generate-test/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tokens.access}`
                    },
                    body: JSON.stringify({ category_id: 1 })
                });

                if (response.ok) {
                    const data = await response.json();
                    setAttemptId(data.attempt_id);
                    setSessionId(data.session_id); // Capture session_id for proctoring logs
                    if (data.questions && data.questions.length > 0) {
                        setQuestions(data.questions);
                    } else {
                        console.warn("Backend returned 0 questions.");
                    }
                } else {
                    console.error("Failed to generate test");
                }
            } catch (e) { console.error(e); }
            finally { setLoading(false); }
        };
        initExam();
    }, [tokens]);

    // Timer Logic
    useEffect(() => {
        if (!examStarted || timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    submitExam();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [examStarted, timeLeft]);

    const formatTime = (secs) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const startTest = async () => {
        // Enforce Fullscreen
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            try {
                await elem.requestFullscreen();
            } catch (err) {
                console.error("Fullscreen blocked", err);
                alert("Please allow Fullscreen to continue.");
                return;
            }
        }
        setExamStarted(true);
    };

    const handleAnswer = (option) => {
        setAnswers(prev => ({ ...prev, [currentQuestion]: option }));
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(curr => curr + 1);
        } else {
            submitExam();
        }
    };

    const submitExam = async () => {
        // Transform answers map to ordered list
        const answersList = questions.map((_, idx) => answers[idx] || null);

        try {
            await fetch('http://localhost:8000/api/verification/submit-test/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokens?.access}`
                },
                body: JSON.stringify({
                    attempt_id: attemptId,
                    answers: answersList
                })
            });
            navigate('/student/dashboard');
        } catch (e) {
            console.error("Submit failed", e);
            navigate('/student/dashboard');
        }
    };

    // Log Proctor Events to Backend
    const logEvent = async (eventType) => {
        if (!sessionId) return;
        try {
            await fetch('http://localhost:8000/api/proctor/events/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokens?.access}`
                },
                body: JSON.stringify({
                    session_id: sessionId,
                    event_type: eventType,
                    confidence: 1.0
                })
            });
        } catch (e) { console.error("Log failed", e); }
    };

    const handleDisqualify = () => {
        logEvent("disqualified");
        alert("Disqualified due to security violations.");
        navigate('/student/dashboard');
    };

    const handleWarning = (msg) => {
        console.warn("Warning:", msg);
        logEvent("violation_warning"); // Generic warning log
    };

    if (loading) return <div className="text-white bg-black h-screen flex items-center justify-center">Loading Assessment...</div>;

    if (!examStarted) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 text-center bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">
                <h1 className="text-6xl font-black mb-6 tracking-tighter">PHASE 2: <span className="text-orange-500">SKILL CHECK</span></h1>
                <div className="max-w-2xl bg-gray-900/50 p-8 rounded-3xl border border-gray-800 backdrop-blur-xl mb-12 text-left space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2"><CheckCircle className="text-green-500" /> Proctoring Active</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-400">
                        <li>Camera monitoring enabled.</li>
                        <li>Fullscreen mode enforced.</li>
                        <li>Tab switching / Minimizing logs a violation (3 strikes = fail).</li>
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
        <ProctorWrapper onDisqualify={handleDisqualify} onWarning={handleWarning}>
            <div className="container mx-auto px-4 py-8 h-screen flex flex-col">
                <div className="flex justify-between items-center mb-12">
                    <div className="text-sm font-bold text-gray-500">
                        Question {currentQuestion + 1} / {questions.length}
                    </div>
                    <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full font-mono text-orange-500">
                        <Clock className="w-4 h-4" /> {formatTime(timeLeft)}
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full">
                    {questions.length > 0 && questions[currentQuestion] && (
                        <>
                            <motion.h2
                                key={currentQuestion}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-3xl md:text-5xl font-bold mb-12 leading-tight"
                            >
                                {questions[currentQuestion].question || questions[currentQuestion].text}
                            </motion.h2>

                            <div className="grid grid-cols-1 gap-4">
                                {(questions[currentQuestion].options || []).map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswer(option)}
                                        className={`p-6 text-left rounded-2xl border-2 transition-all text-xl font-medium ${answers[currentQuestion] === option
                                                ? 'bg-orange-500 border-orange-500 text-black'
                                                : 'border-gray-700 hover:border-white hover:bg-gray-800'
                                            }`}
                                    >
                                        <span className="mr-4 opacity-50">{String.fromCharCode(65 + idx)}.</span>
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
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
