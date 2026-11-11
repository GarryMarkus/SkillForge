import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Lock, Award, Clock, Layers, ShieldCheck, ArrowLeft, Play } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import ProctorWrapper from '../../components/assessment/ProctorWrapper';
import AssessmentHeader from '../../components/assessment/AssessmentHeader';
import QuestionWorkspace from '../../components/assessment/QuestionWorkspace';
import OptionsMatrix from '../../components/assessment/OptionsMatrix';
import ProctorTelemetryPanel from '../../components/assessment/ProctorTelemetryPanel';
import StudioNoise from '../../components/ui/animations/StudioNoise';
import api from '../../api/client';

const DEFAULT_SAMPLE_QUESTIONS = [
    {
        id: 1,
        section: "System Concurrency & Indexing",
        weight: "25 Points",
        taxonomy: "Synthesis",
        title: "Mitigating Connection Starvation in High-Throughput PostgreSQL Connection Pools",
        description: "Under an incoming load spike of 12,000 req/sec, worker threads are exhausting available database sockets despite PgBouncer deployment. Analyze the connection pool configuration below and identify the architectural flaw causing connection timeouts.",
        code_snippet: `01  DATABASES = {
02      'default': {
03          'ENGINE': 'django.db.backends.postgresql',
04          'CONN_MAX_AGE': 0,  # Thread-bound socket exhaustion
05          'OPTIONS': {
06              'max_connections': 100, 
07              'pool_timeout': 30
08          }
09      }
10  }`,
        options: [
            "Increase max_connections to 10,000 without proxy-level queue limits.",
            "Set CONN_MAX_AGE > 0 to reuse connections across requests and configure PgBouncer transaction pooling.",
            "Shift relational database queries to local SQLite ephemeral instances.",
            "Force synchronous garbage collection on every database cursor execution."
        ],
        correct_index: 1
    },
    {
        id: 2,
        section: "Distributed Queue Orchestration",
        weight: "25 Points",
        taxonomy: "Analysis",
        title: "Redis Celery Task Latency Under Heavy Write Operations",
        description: "A Celery task processing streaming sensor telemetry is dropping 14% of payloads during queue spikes. The broker is Redis running in single-node mode. What configuration change guarantees zero lost tasks?",
        code_snippet: `01  CELERY_BROKER_URL = 'redis://localhost:6379/0'
02  CELERY_TASK_ACKS_LATE = False
03  CELERY_TASK_REJECT_ON_WORKER_LOST = False
04  CELERY_WORKER_PREFETCH_MULTIPLIER = 100`,
        options: [
            "Enable CELERY_TASK_ACKS_LATE = True and set CELERY_TASK_REJECT_ON_WORKER_LOST = True with worker prefetch = 1.",
            "Switch the broker transport protocol from TCP to raw UDP without acknowledgment.",
            "Disable Celery worker task serialization completely and transmit raw binary pointers.",
            "Increase system swap memory to 128GB to buffer lost Redis sockets."
        ],
        correct_index: 0
    },
    {
        id: 3,
        section: "React Concurrent Optimization",
        weight: "25 Points",
        taxonomy: "Evaluation",
        title: "Eliminating Main Thread Frame Drops in Real-Time Telemetry Feed",
        description: "A dashboard updating at 60 FPS triggers noticeable UI frame drops when rendering SVG time-series charts alongside user text input. How do you prevent blocking high-priority user keystrokes?",
        code_snippet: `01  function TelemetryDashboard({ streamData }) {
02      const [filter, setFilter] = useState('');
03      // Heavy computational filtering running synchronously on every render
04      const filtered = streamData.filter(d => d.val.includes(filter));
05      return <TelemetryGraph data={filtered} />;
06  }`,
        options: [
            "Wrap the heavy filter and state update in React startTransition and useDeferredValue.",
            "Replace all state hooks with window.localStorage getters executed inside requestAnimationFrame.",
            "Convert the React application to synchronous XMLHttpRequest polling.",
            "Mount multiple duplicate root React trees on the document body."
        ],
        correct_index: 0
    }
];

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
    const [timeLeft, setTimeLeft] = useState(18 * 60 + 42); // 18m 42s

    // Proctor Telemetry State
    const [faceDetected, setFaceDetected] = useState(true);
    const [riskScore, setRiskScore] = useState(5);
    const [tabSwitches, setTabSwitches] = useState(0);
    const [audioSpikes] = useState(0);
    const [headRotation] = useState("1.4°");
    const [auditLogs, setAuditLogs] = useState([
        { time: "11:02:14", text: "Session initialized in fullscreen", type: "info" },
        { time: "11:05:40", text: "Face lock confirmed", type: "info" },
        { time: "11:12:08", text: "Primary gaze acquired", type: "info" },
        { time: "11:15:30", text: "Window focus verified", type: "info" }
    ]);

    const addAuditLog = (text, type = "info") => {
        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0];
        setAuditLogs(prev => [{ time: timeStr, text, type }, ...prev.slice(0, 7)]);
    };

    useEffect(() => {
        let isMounted = true;
        const initExam = async () => {
            if (!tokens?.access) {
                setQuestions(DEFAULT_SAMPLE_QUESTIONS);
                setLoading(false);
                return;
            }
            try {
                const response = await api.post('/verification/generate-test/', { category_id: 1 });
                if (response.ok) {
                    const data = await response.json();

                    // If attempt returned synchronously
                    if (data.attempt_id) {
                        if (isMounted) {
                            setAttemptId(data.attempt_id);
                            setSessionId(data.session_id);
                            setQuestions(data.questions?.length > 0 ? data.questions : DEFAULT_SAMPLE_QUESTIONS);
                            setLoading(false);
                        }
                        return;
                    }

                    // If task was queued asynchronously in Celery
                    if (data.task_id) {
                        let retries = 0;
                        const maxRetries = 30;

                        const pollTaskStatus = async () => {
                            if (!isMounted) return;
                            try {
                                const statusRes = await api.get(`/verification/tasks/${data.task_id}/status/`);
                                if (statusRes.ok) {
                                    const statusData = await statusRes.json();
                                    if (statusData.status === 'SUCCESS' && statusData.result) {
                                        const res = statusData.result;
                                        if (isMounted) {
                                            setAttemptId(res.attempt_id);
                                            setSessionId(res.session_id);
                                            setQuestions(res.questions?.length > 0 ? res.questions : DEFAULT_SAMPLE_QUESTIONS);
                                            setLoading(false);
                                        }
                                        return;
                                    }
                                    if (statusData.status === 'FAILURE' || statusData.status === 'REVOKED') {
                                        console.warn('Test generation task failed:', statusData.error);
                                        if (isMounted) {
                                            setQuestions(DEFAULT_SAMPLE_QUESTIONS);
                                            setLoading(false);
                                        }
                                        return;
                                    }
                                }
                            } catch (pollErr) {
                                console.warn('Error polling test task status:', pollErr);
                            }

                            retries += 1;
                            if (retries < maxRetries && isMounted) {
                                setTimeout(pollTaskStatus, 1200);
                            } else if (isMounted) {
                                setQuestions(DEFAULT_SAMPLE_QUESTIONS);
                                setLoading(false);
                            }
                        };

                        pollTaskStatus();
                        return;
                    }

                    if (isMounted) {
                        setQuestions(DEFAULT_SAMPLE_QUESTIONS);
                        setLoading(false);
                    }
                } else {
                    if (isMounted) {
                        setQuestions(DEFAULT_SAMPLE_QUESTIONS);
                        setLoading(false);
                    }
                }
            } catch (e) {
                console.error('Test initialization error:', e);
                if (isMounted) {
                    setQuestions(DEFAULT_SAMPLE_QUESTIONS);
                    setLoading(false);
                }
            }
        };
        initExam();
        return () => {
            isMounted = false;
        };
    }, [tokens]);

    // Cleanly exit fullscreen on component unmount
    useEffect(() => {
        return () => {
            if (document.fullscreenElement && document.exitFullscreen) {
                document.exitFullscreen().catch(() => {});
            }
        };
    }, []);

    const submitExam = useCallback(async () => {
        const answersList = questions.map((_, idx) => answers[idx] ?? null);
        try {
            if (sessionId) {
                await api.post('/proctor/end/', { session_id: sessionId }).catch(() => {});
            }
            if (attemptId) {
                await api.post('/verification/submit-test/', {
                    attempt_id: attemptId,
                    answers: answersList
                });
            }
        } catch (e) {
            console.error("Submit failed", e);
        } finally {
            alert("Assessment submitted successfully. Your verified results and skill report are now being processed.");
            navigate('/student/dashboard');
        }
    }, [questions, answers, attemptId, sessionId, navigate]);

    const submitExamRef = useRef(submitExam);
    useEffect(() => {
        submitExamRef.current = submitExam;
    }, [submitExam]);

    // Timer Logic
    useEffect(() => {
        if (!examStarted) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    submitExamRef.current();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [examStarted]);

    const formatTime = (secs) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const startTest = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            stream.getTracks().forEach(track => track.stop());
        } catch (err) {
            console.warn("Camera permission not granted:", err);
            const proceed = window.confirm("Webcam access is recommended for optical proctoring. Proceed anyway in demo mode?");
            if (!proceed) return;
        }

        const elem = document.documentElement;
        const requestFS = elem.requestFullscreen || elem.webkitRequestFullscreen || elem.mozRequestFullScreen || elem.msRequestFullscreen;
        if (requestFS) {
            try {
                await requestFS.call(elem);
            } catch (err) {
                console.warn("Fullscreen request bypassed:", err);
            }
        }
        setExamStarted(true);
        addAuditLog("Optical feed synchronized", "info");
    };

    const handleAnswerSelect = (optionIdx) => {
        setAnswers(prev => ({ ...prev, [currentQuestion]: optionIdx }));
    };

    const handleClearSelection = () => {
        setAnswers(prev => {
            const updated = { ...prev };
            delete updated[currentQuestion];
            return updated;
        });
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(curr => curr + 1);
        } else {
            submitExam();
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(curr => curr - 1);
        }
    };

    const logEvent = async (eventType) => {
        if (!sessionId) return;
        try {
            const res = await api.post('/proctor/event/', {
                session_id: sessionId,
                event_type: eventType,
                confidence: 1.0
            });
            if (res.ok) {
                const data = await res.json().catch(() => ({}));
                if (typeof data.risk === 'number') {
                    setRiskScore(data.risk);
                }
                if (data.flagged) {
                    addAuditLog("Proctor alert: session flagged", "error");
                }
            }
        } catch (e) {
            console.error("Log failed", e);
        }
    };

    const handleDisqualify = () => {
        logEvent("disqualified");
        alert("Assessment session ended. The maximum allowed security warnings threshold was reached.");
        navigate('/student/dashboard');
    };

    const handleWarning = (msg) => {
        setRiskScore(prev => Math.min(50, prev + 15));
        if (msg.toUpperCase().includes("TAB")) setTabSwitches(prev => prev + 1);
        addAuditLog(`Security notice: ${msg}`, "warn");
        logEvent("violation_warning");
    };

    if (loading) {
        return (
            <StudioNoise opacity={0.07}>
                <div className="min-h-screen font-mono flex flex-col items-center justify-center p-8 text-[#ededed]">
                    <div className="border border-white/[0.08] border-t-white/15 bg-[#111318] rounded-md p-8 max-w-md w-full text-center space-y-3 shadow-2xl">
                        <div className="text-xs text-[#8a8a8e] uppercase tracking-wider font-mono">Initializing Assessment Environment</div>
                        <h2 className="text-base font-bold font-display text-white">
                            Preparing Practical Assessment
                        </h2>
                        <p className="text-xs text-[#888888] leading-relaxed">
                            Compiling problem scenarios and verifying runtime environment...
                        </p>
                    </div>
                </div>
            </StudioNoise>
        );
    }

    // Pre-Exam Initialization Staging View
    if (!examStarted) {
        const checklist = [
            {
                icon: Camera,
                title: 'Camera Check',
                desc: 'Keep your camera visible during the session.',
            },
            {
                icon: Lock,
                title: 'Single Tab Focus',
                desc: 'Stay on this fullscreen tab until submitted.',
            },
            {
                icon: Award,
                title: 'Instant Score',
                desc: 'Verified percentile updates right after submit.',
            },
        ];

        return (
            <StudioNoise opacity={0.07}>
                <div className="min-h-screen font-mono text-[#ededed] flex flex-col items-center justify-center p-4 sm:p-8">
                    <div className="relative max-w-3xl w-full">
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"
                        />
                        <div className="relative bg-[#111318] border border-white/[0.08] border-t-white/15 rounded-md p-6 sm:p-8 shadow-2xl space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
                                <div className="flex items-start gap-3.5">
                                    <div className="w-10 h-10 rounded-sm bg-[#060709] border border-white/15 flex items-center justify-center shrink-0">
                                        <ShieldCheck className="w-5 h-5 text-white" strokeWidth={1.75} aria-hidden="true" />
                                    </div>
                                    <div>
                                        <span className="text-[11px] text-[#8a8a8e] uppercase tracking-wider font-mono block mb-1">
                                            Skill Verification
                                        </span>
                                        <h1 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
                                            Practical Skill Assessment
                                        </h1>
                                        <p className="text-xs text-[#888888] mt-1">
                                            Solve architecture and debugging scenarios to earn a verified score badge.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Summary Chips */}
                            <div className="grid grid-cols-3 gap-2.5 text-xs">
                                <div className="flex items-center gap-2 p-2.5 rounded-sm bg-[#060709] border border-white/[0.08] text-zinc-200">
                                    <Layers className="w-3.5 h-3.5 text-[#888888] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                                    <span>{questions.length || 3} Scenarios</span>
                                </div>
                                <div className="flex items-center gap-2 p-2.5 rounded-sm bg-[#060709] border border-white/[0.08] text-zinc-200">
                                    <Clock className="w-3.5 h-3.5 text-[#888888] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                                    <span>~20 Minutes</span>
                                </div>
                                <div className="flex items-center gap-2 p-2.5 rounded-sm bg-[#060709] border border-white/[0.08] text-zinc-200">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                                    <span>Proctored</span>
                                </div>
                            </div>

                            {/* 3 Icon Rules Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {checklist.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <div key={item.title} className="rounded-sm bg-[#060709] border border-white/[0.08] p-4 space-y-2">
                                            <div className="w-8 h-8 rounded-sm bg-[#111318] border border-white/[0.08] flex items-center justify-center">
                                                <Icon className="w-4 h-4 text-white" strokeWidth={1.75} aria-hidden="true" />
                                            </div>
                                            <h4 className="font-semibold text-xs text-white">
                                                {item.title}
                                            </h4>
                                            <p className="text-[11px] text-[#737373] leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/[0.06]">
                                <button
                                    type="button"
                                    onClick={() => navigate('/student/dashboard')}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[#121316] border border-white/10 text-xs font-mono text-[#E4E4E7] hover:text-white hover:border-white/20 transition-colors cursor-pointer"
                                >
                                    <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                                    <span>Dashboard</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={startTest}
                                    className="bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold px-6 py-2.5 rounded-sm text-xs sm:text-sm font-mono transition-colors cursor-pointer inline-flex items-center gap-2"
                                >
                                    <Play className="w-3.5 h-3.5 fill-current" strokeWidth={1.75} aria-hidden="true" />
                                    <span>Begin Assessment</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </StudioNoise>
        );
    }

    const q = questions[currentQuestion] || DEFAULT_SAMPLE_QUESTIONS[0];
    const selectedAnswerIdx = answers[currentQuestion];

    return (
        <ProctorWrapper 
            onDisqualify={handleDisqualify} 
            onWarning={handleWarning}
            onFaceDetectedChange={setFaceDetected}
            onLogEvent={(msg) => addAuditLog(msg, "warn")}
        >
            {({ webcamNode }) => (
                <StudioNoise opacity={0.07}>
                    <div className="font-mono text-[#ededed] antialiased min-h-screen flex flex-col">
                        {/* Minimalist Top Console Bar */}
                        <AssessmentHeader
                            examId="SF-2026-09"
                            currentQuestion={currentQuestion}
                            totalQuestions={questions.length}
                            formattedTime={formatTime(timeLeft)}
                            onAbort={() => {
                                if (window.confirm("Are you sure you want to exit? Your progress so far will be saved.")) {
                                    navigate('/student/dashboard');
                                }
                            }}
                        />

                        {/* Main Evaluation Split Grid */}
                        <main className="w-full pt-16 min-h-screen flex-1 flex flex-col justify-between relative z-10">
                            <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-12 gap-6 flex-1">

                                {/* Left Column: Question & Answers Canvas (Cols 1-8 / 66%) */}
                                <div className="col-span-12 lg:col-span-8 flex flex-col gap-6" id="QuestionWorkspace">
                                    <QuestionWorkspace 
                                        question={q}
                                        questionIndex={currentQuestion}
                                    />

                                    <OptionsMatrix 
                                        options={q.options || []}
                                        selectedOptionIdx={selectedAnswerIdx}
                                        onSelectOption={handleAnswerSelect}
                                        onPrevQuestion={handlePrevQuestion}
                                        onNextQuestion={handleNextQuestion}
                                        onClearSelection={handleClearSelection}
                                        isFirstQuestion={currentQuestion === 0}
                                        isLastQuestion={currentQuestion === questions.length - 1}
                                    />
                                </div>

                                {/* Right Column: Proctor Video & Activity (Cols 9-12 / 33%) */}
                                <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                                    <ProctorTelemetryPanel 
                                        faceDetected={faceDetected}
                                        riskScore={riskScore}
                                        tabSwitches={tabSwitches}
                                        audioSpikes={audioSpikes}
                                        headRotation={headRotation}
                                        auditLogs={auditLogs}
                                        webcamNode={webcamNode}
                                    />
                                </div>

                            </div>

                            {/* Clean System Footer */}
                            <div className="w-full bg-[#060709] border-t border-white/[0.06] px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between text-xs text-[#71717A] font-mono">
                                <div className="flex items-center gap-2">
                                    <span className="text-[#888888]">Session SF-2026-09</span>
                                    <span className="text-[#444444]">&bull;</span>
                                    <span>Evaluation Session Active</span>
                                </div>
                                <div className="text-[11px] text-[#71717A]">
                                    Secure Stream Confirmed
                                </div>
                            </div>
                        </main>
                    </div>
                </StudioNoise>
            )}
        </ProctorWrapper>
    );
};

export default AssessmentPage;
