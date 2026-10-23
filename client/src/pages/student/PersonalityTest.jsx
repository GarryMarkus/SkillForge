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
                    setError('Failed to retrieve psychometric questions from server.');
                }
            } catch (err) {
                console.error('Error fetching questions:', err);
                setError('Network fault occurred while retrieving diagnostic telemetry.');
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
            '[SYSTEM_WARNING] Aborting psychometric diagnostic will discard unsaved responses. Return to dashboard?'
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
                `[PARTIAL_EVALUATION] You have answered ${answeredCount} of ${questions.length} questions. Submit anyway?`
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
                alert('[SUBMISSION_ERROR] Failed to record personality test telemetry.');
            }
        } catch (err) {
            console.error('Submission error:', err);
            alert('[NETWORK_FAULT] Failed to transmit psychometric answers.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-surface font-mono flex items-center justify-center p-4">
                <div className="border border-black/20 bg-surface-container-lowest p-6 shadow-[4px_4px_0px_#191C1D] text-center max-w-md w-full">
                    <div className="text-primary-container font-bold text-label-sm uppercase mb-2">
                        [ SYSTEM_LOADING // INITIALIZING_DIAGNOSTIC_NODE ]
                    </div>
                    <div className="text-body-sm text-on-surface-variant">
                        Retrieving psychometric question bank...
                    </div>
                </div>
            </div>
        );
    }

    if (result) {
        return (
            <div className="min-h-screen bg-surface font-mono text-on-surface p-4 md:p-8 flex items-center justify-center">
                <PersonalityResultCard
                    result={result}
                    onProceed={() => navigate('/student/dashboard')}
                />
            </div>
        );
    }

    if (!started) {
        return (
            <div className="min-h-screen bg-surface font-mono text-on-surface p-4 md:p-8 flex items-center justify-center">
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
        <div className="min-h-screen bg-surface font-mono text-on-surface flex flex-col">
            <PersonalityHeader
                currentIndex={currentIndex}
                totalQuestions={questions.length}
                isFullscreen={isFullscreen}
                onAbort={handleAbort}
            />

            <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
                {error && (
                    <div className="mb-space-md border border-red-500 bg-red-50 p-space-md text-red-700 text-body-sm">
                        <span className="font-bold">[TELEMETRY_ERROR]:</span> {error}
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-space-lg items-start">
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
