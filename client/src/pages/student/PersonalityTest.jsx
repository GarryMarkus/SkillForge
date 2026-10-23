import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import client from '../../api/client';
import PersonalityHeader from '../../components/personality/PersonalityHeader';
import PersonalityIntroCard from '../../components/personality/PersonalityIntroCard';
import PersonalityQuestionCard from '../../components/personality/PersonalityQuestionCard';
import PersonalityTelemetrySidebar from '../../components/personality/PersonalityTelemetrySidebar';
import PersonalityResultCard from '../../components/personality/PersonalityResultCard';

const PersonalityTest = () => {
    const { tokens } = useAuthStore();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [started, setStarted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [error, setError] = useState(null);

    // Track fullscreen status
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(Boolean(document.fullscreenElement));
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Fetch psychometric questions bank
    useEffect(() => {
        const fetchQuestions = async () => {
            if (!tokens?.access) return;
            try {
                const response = await client.get('/verification/personality/questions/');
                if (response.ok) {
                    const data = await response.json();
                    setQuestions(Array.isArray(data) ? data : []);
                } else {
                    setError('Failed to retrieve questions from the server.');
                }
            } catch (err) {
                console.error('Error fetching questions:', err);
                setError('A network error occurred while retrieving questions.');
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, [tokens]);

    const handleStart = async () => {
        try {
            if (document.documentElement.requestFullscreen) {
                await document.documentElement.requestFullscreen();
            }
        } catch (err) {
            console.warn('Fullscreen request bypassed:', err);
        }
        setStarted(true);
    };

    const handleAbort = () => {
        const confirmed = window.confirm(
            'Are you sure you want to leave? Your unsaved answers will be lost.'
        );
        if (confirmed) {
            if (document.fullscreenElement && document.exitFullscreen) {
                document.exitFullscreen().catch(() => {});
            }
            navigate('/student/dashboard');
        }
    };

    const handleOptionSelect = (qId, optionText) => {
        setAnswers(prev => ({
            ...prev,
            [String(qId)]: optionText
        }));
    };

    const handlePrev = () => {
        setCurrentIndex(prev => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1));
    };

    const handleJump = (index) => {
        if (index >= 0 && index < questions.length) {
            setCurrentIndex(index);
        }
    };

    const handleSubmit = async () => {
        const answeredCount = Object.keys(answers).length;
        if (questions.length > 0 && answeredCount < questions.length) {
            const confirmed = window.confirm(
                `You have answered ${answeredCount} of ${questions.length} questions. Do you want to submit anyway?`
            );
            if (!confirmed) return;
        }

        setIsSubmitting(true);
        try {
            const response = await client.post('/verification/personality/submit/', { answers });
            if (response.ok) {
                const data = await response.json();
                setResult(data);
                if (document.fullscreenElement && document.exitFullscreen) {
                    document.exitFullscreen().catch(() => {});
                }
            } else {
                alert('Failed to record assessment responses. Please try again.');
            }
        } catch (err) {
            console.error('Submission error:', err);
            alert('A network error occurred while submitting your answers.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FAFAFA] font-sans text-gray-900 flex items-center justify-center p-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm text-center max-w-sm w-full space-y-3">
                    <div className="w-8 h-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin mx-auto"></div>
                    <div className="font-semibold text-sm text-gray-900">
                        Loading Assessment
                    </div>
                    <div className="text-xs text-gray-500">
                        Preparing your questions...
                    </div>
                </div>
            </div>
        );
    }

    if (result) {
        return (
            <div className="min-h-screen bg-[#FAFAFA] font-sans text-gray-900 p-4 sm:p-8 flex items-center justify-center">
                <PersonalityResultCard
                    result={result}
                    onProceed={() => navigate('/student/dashboard')}
                />
            </div>
        );
    }

    if (!started) {
        return (
            <div className="min-h-screen bg-[#FAFAFA] font-sans text-gray-900 p-4 sm:p-8 flex items-center justify-center">
                <PersonalityIntroCard
                    onStart={handleStart}
                    onReturn={() => navigate('/student/dashboard')}
                />
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];
    const isLastQuestion = currentIndex === questions.length - 1;
    const canSubmit = Object.keys(answers).length > 0;

    return (
        <div className="min-h-screen bg-[#FAFAFA] font-sans text-gray-900 flex flex-col select-none">
            <PersonalityHeader
                currentIndex={currentIndex}
                totalQuestions={questions.length}
                isFullscreen={isFullscreen}
                onAbort={handleAbort}
            />

            <main className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
                {error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 text-xs font-medium">
                        {error}
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-6 items-start">
                    <div className="flex-1 w-full">
                        <PersonalityQuestionCard
                            question={currentQuestion}
                            questionIndex={currentIndex}
                            totalQuestions={questions.length}
                            selectedAnswer={currentQuestion ? answers[String(currentQuestion.id)] : ''}
                            onSelectOption={handleOptionSelect}
                            onPrev={handlePrev}
                            onNext={handleNext}
                            onSubmit={handleSubmit}
                            isLastQuestion={isLastQuestion}
                            canSubmit={canSubmit}
                            isSubmitting={isSubmitting}
                        />
                    </div>

                    <PersonalityTelemetrySidebar
                        questions={questions}
                        currentIndex={currentIndex}
                        answers={answers}
                        onJump={handleJump}
                        onSubmit={handleSubmit}
                        canSubmit={canSubmit}
                        isSubmitting={isSubmitting}
                    />
                </div>
            </main>
        </div>
    );
};

export default PersonalityTest;
