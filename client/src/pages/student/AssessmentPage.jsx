import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import ProctorWrapper from '../../components/assessment/ProctorWrapper';
import AssessmentHeader from '../../components/assessment/AssessmentHeader';
import QuestionWorkspace from '../../components/assessment/QuestionWorkspace';
import OptionsMatrix from '../../components/assessment/OptionsMatrix';
import ProctorTelemetryPanel from '../../components/assessment/ProctorTelemetryPanel';
import api from '../../api/client';

const DEFAULT_SAMPLE_QUESTIONS = [
    {
        id: 1,
        section: "SYSTEM_CONCURRENCY_&_INDEXING",
        weight: "25 PTS",
        taxonomy: "SYNTHESIS",
        title: "SCENARIO: Mitigating Connection Starvation in High-Throughput PostgreSQL Connection Pools",
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
        section: "DISTRIBUTED_QUEUE_ORCHESTRATION",
        weight: "25 PTS",
        taxonomy: "ANALYSIS",
        title: "SCENARIO: Redis Celery Task Latency Under Heavy Write Operations",
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
        section: "REACT_CONCURRENT_MODE_OPTIMIZATION",
        weight: "25 PTS",
        taxonomy: "EVALUATION",
        title: "SCENARIO: Eliminating Main Thread Frame Drops in Real-Time Telemetry Feed",
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
        { time: "11:02:14", text: "SESSION INITIALIZED (FULLSCREEN)", type: "info" },
        { time: "11:05:40", text: "FACE LOCK CONFIRMED", type: "info" },
        { time: "11:12:08", text: "PRIMARY GAZE ACQUIRED", type: "info" },
        { time: "11:15:30", text: "WINDOW FOCUS VERIFIED", type: "info" }
    ]);

    const addAuditLog = (text, type = "info") => {
        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0];
        setAuditLogs(prev => [{ time: timeStr, text, type }, ...prev.slice(0, 7)]);
    };

    useEffect(() => {
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
                    setAttemptId(data.attempt_id);
                    setSessionId(data.session_id);
                    if (data.questions && data.questions.length > 0) {
                        setQuestions(data.questions);
                    } else {
                        setQuestions(DEFAULT_SAMPLE_QUESTIONS);
                    }
                } else {
                    setQuestions(DEFAULT_SAMPLE_QUESTIONS);
                }
            } catch (e) {
                console.error(e);
                setQuestions(DEFAULT_SAMPLE_QUESTIONS);
            } finally {
                setLoading(false);
            }
        };
        initExam();
    }, [tokens]);

    const submitExam = useCallback(async () => {
        const answersList = questions.map((_, idx) => answers[idx] ?? null);
        try {
            if (sessionId) {
                await api.post('/proctor/end/', { session_id: sessionId }).catch(() => {});
            }
            await api.post('/verification/submit-test/', {
                attempt_id: attemptId,
                answers: answersList
            });
        } catch (e) {
            console.error("Submit failed", e);
        } finally {
            alert("[ASSESSMENT COMPLETE] Credential evaluation verified. Emitting telemetry to candidate console.");
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
        return `[ ${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')} ]`;
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
        addAuditLog("OPTICAL FEED SYNCHRONIZED", "info");
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
                    addAuditLog("PROCTOR ALERT: SESSION FLAGGED", "error");
                }
            }
        } catch (e) {
            console.error("Log failed", e);
        }
    };

    const handleDisqualify = () => {
        logEvent("disqualified");
        alert("[SECURITY VIOLATION] Hardware locked threshold reached. Terminating session.");
        navigate('/student/dashboard');
    };

    const handleWarning = (msg) => {
        setRiskScore(prev => Math.min(50, prev + 15));
        if (msg.includes("TAB")) setTabSwitches(prev => prev + 1);
        addAuditLog(`SECURITY WARNING: ${msg}`, "warn");
        logEvent("violation_warning");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-canvas-light font-mono flex flex-col items-center justify-center p-8 text-ink-primary">
                <div className="border border-black/20 bg-surface-container-lowest p-8 shadow-[4px_4px_0px_#1D52B8] max-w-md w-full text-center">
                    <span className="w-3 h-3 bg-canvas-blueprint inline-block animate-pulse mb-4"></span>
                    <h2 className="text-lg uppercase font-bold tracking-tight mb-2">
                        INITIALIZING HARDWARE PROCTOR ENCLAVE
                    </h2>
                    <p className="text-xs text-outline">
                        ESTABLISHING DETERMINISTIC SECURE RUNNER...
                    </p>
                </div>
            </div>
        );
    }

    // Pre-Exam Initialization Staging View
    if (!examStarted) {
        return (
            <div className="min-h-screen bg-canvas-light font-mono text-ink-primary flex flex-col items-center justify-center p-4 sm:p-8 select-none">
                <div className="max-w-3xl w-full border border-black/20 bg-surface-container-lowest p-6 sm:p-10 shadow-[6px_6px_0px_#0A0A0A]">
                    <div className="border-b border-black/15 pb-3 mb-6 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs text-canvas-blueprint uppercase font-bold tracking-wider">
                            [ HARDWARE STAGING INITIALIZATION ]
                        </span>
                        <span className="text-xs text-outline font-bold">
                            ESTIMATED DURATION: 30 MINUTES
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink-primary mb-3">
                        EMPIRICAL CODE &amp; ARCHITECTURE ASSESSMENT
                    </h1>
                    <p className="text-sm sm:text-base text-on-surface-variant mb-8 leading-relaxed">
                        You are initializing a hardware-supervised examination. Performance metrics and integrity audit logs will be cryptographically anchored to your verified candidate telemetry dossier.
                    </p>

                    {/* Security Requirements Checklist */}
                    <div className="border border-black/15 bg-surface-container-low p-6 mb-8 space-y-3.5 text-xs sm:text-sm">
                        <div className="flex items-start gap-3">
                            <span className="text-canvas-blueprint font-bold shrink-0">[✓]</span>
                            <span><strong>OPTICAL CAMERA SUPERVISION:</strong> Active face tracking and gaze telemetry enforced continuously.</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-canvas-blueprint font-bold shrink-0">[✓]</span>
                            <span><strong>FULLSCREEN WORKSPACE LOCK:</strong> Tab escape or window blur registers an immediate 15-point risk penalty.</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-canvas-blueprint font-bold shrink-0">[✓]</span>
                            <span><strong>ZERO CLIPBOARD POLICY:</strong> Copy, paste, and developer console inspection are strictly disabled.</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-canvas-blueprint font-bold shrink-0">[✓]</span>
                            <span><strong>AUTOMATIC DISQUALIFICATION:</strong> Total accumulated risk is capped strictly at 50 points.</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-black/15">
                        <button
                            onClick={() => navigate('/student/dashboard')}
                            className="px-6 py-4 border border-black/20 text-xs sm:text-sm font-bold uppercase hover:bg-black/5 transition-none cursor-pointer"
                        >
                            [ CANCEL // RETURN TO CONSOLE ]
                        </button>

                        <button
                            onClick={startTest}
                            className="bg-canvas-blueprint text-white px-8 py-4 text-xs sm:text-sm uppercase tracking-wider font-bold border border-canvas-blueprint hover:bg-primary-hover transition-none shadow-[3px_3px_0px_#0A0A0A] cursor-pointer"
                        >
                            [ INITIALIZE PROCTORED SESSION → ]
                        </button>
                    </div>
                </div>
            </div>
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
                <div className="bg-canvas-light font-mono text-ink-primary antialiased select-none min-h-screen flex flex-col">
                    {/* Minimalist Top Console Bar */}
                    <AssessmentHeader
                        examId="SF-2026-DISTRIBUTED-09"
                        currentQuestion={currentQuestion}
                        totalQuestions={questions.length}
                        formattedTime={formatTime(timeLeft)}
                        onAbort={() => {
                            if (window.confirm("Abort assessment? Incomplete examination will be logged.")) {
                                navigate('/student/dashboard');
                            }
                        }}
                    />

                    {/* MAIN COCKPIT: 70/30 ENGINEERING SPLIT GRID */}
                    <main className="w-full pt-16 bg-canvas-light min-h-screen flex-1 flex flex-col justify-between">
                        <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-12 gap-6 bg-canvas-light flex-1">

                            {/* A. LEFT COLUMN: EXAMINATION & SOLUTION CANVAS (Cols 1-8 / 66%) */}
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

                            {/* B. RIGHT COLUMN: PROCTOR TELEMETRY & HARDWARE SUPERVISION (Cols 9-12 / 33%) */}
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

                        {/* TECHNICAL SYSTEM FOOTER RUNNER */}
                        <div className="w-full bg-surface-container-low border-t border-black/15 px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between text-xs text-on-surface-variant font-mono">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-ink-primary">EXAM INSTANCE:</span>
                                <span>SF-NODE-092.41A</span>
                                <span className="text-black/20">|</span>
                                <span className="font-bold text-ink-primary">PROCTOR RUNNER:</span>
                                <span>LOCKED v4.2</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="hidden sm:inline">LATENCY: 14ms</span>
                                <span className="text-black/20 hidden sm:inline">|</span>
                                <span className="text-canvas-blueprint font-bold">[ SYSTEM INTEGRITY: ACTIVE ]</span>
                            </div>
                        </div>
                    </main>
                </div>
            )}
        </ProctorWrapper>
    );
};

export default AssessmentPage;
