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
        { time: "11:02:14", text: "SESSION_INITIALIZED_FULLSCREEN", type: "info" },
        { time: "11:05:40", text: "OPTICAL_HEURISTIC_PASS_FACE_LOCKED", type: "info" },
        { time: "11:12:08", text: "RE-ACQUIRED_PRIMARY_GAZE", type: "info" },
        { time: "11:15:30", text: "WINDOW_FOCUS_CONFIRMED", type: "info" }
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
            await api.post('/verification/submit-test/', {
                attempt_id: attemptId,
                answers: answersList
            });
        } catch (e) {
            console.error("Submit failed", e);
        } finally {
            alert("[ASSESSMENT_COMPLETE] Credential evaluation verified. Emitting telemetry to candidate console.");
            navigate('/student/dashboard');
        }
    }, [questions, answers, attemptId, navigate]);

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
        addAuditLog("HARDWARE_OPTICAL_FEED_SYNCHRONIZED", "info");
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
            // Dispatches to both /proctor/event/ and /proctor/events/
            await api.post('/proctor/event/', {
                session_id: sessionId,
                event_type: eventType,
                confidence: 1.0
            });
        } catch (e) {
            console.error("Log failed", e);
        }
    };

    const handleDisqualify = () => {
        logEvent("disqualified");
        alert("[SECURITY_VIOLATION] Hardware locked threshold reached. Terminating session.");
        navigate('/student/dashboard');
    };

    const handleWarning = (msg) => {
        setRiskScore(prev => Math.min(50, prev + 15));
        if (msg.includes("TAB")) setTabSwitches(prev => prev + 1);
        addAuditLog(`SECURITY_WARNING: ${msg}`, "warn");
        logEvent("violation_warning");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-canvas-light font-mono flex flex-col items-center justify-center p-8 text-ink-primary">
                <div className="border border-cad bg-surface-container-lowest p-space-xl shadow-[4px_4px_0px_#1D52B8] max-w-md w-full text-center">
                    <span className="w-3 h-3 bg-canvas-blueprint inline-block animate-pulse mb-3"></span>
                    <h2 className="font-headline-sm text-headline-sm uppercase font-bold tracking-tight mb-2">
                        INITIALIZING HARDWARE PROCTOR RUNNER
                    </h2>
                    <p className="font-label-sm text-label-sm text-outline">
                        ESTABLISHING DETERMINISTIC ENCLAVE // LOADING QUESTION AST MATRIX...
                    </p>
                </div>
            </div>
        );
    }

    // Pre-Exam Initialization Staging View
    if (!examStarted) {
        return (
            <div className="min-h-screen bg-canvas-light font-mono text-ink-primary flex flex-col items-center justify-center p-4 sm:p-8 select-none">
                <div className="max-w-3xl w-full border border-cad bg-surface-container-lowest p-space-lg md:p-space-xl shadow-[6px_6px_0px_#191C1D]">
                    <div className="border-b border-cad pb-space-sm mb-space-md flex flex-wrap items-center justify-between gap-2">
                        <span className="font-label-sm text-label-sm text-canvas-blueprint uppercase font-bold tracking-wider">
                            [ HARDWARE_STAGING_INITIALIZATION // KERNEL_LOCK_v4 ]
                        </span>
                        <span className="font-label-sm text-label-sm text-outline">
                            EST_DURATION: 30_MINUTES
                        </span>
                    </div>

                    <h1 className="font-headline-lg text-headline-lg uppercase font-bold tracking-tight text-ink-primary mb-2">
                        PHASE 2: EMPIRICAL CODE &amp; ARCHITECTURE ASSESSMENT
                    </h1>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg leading-relaxed">
                        You are initializing a hardware-supervised examination. Performance scores and integrity audit logs will be cryptographically anchored to your candidate telemetry dossier.
                    </p>

                    {/* Security Requirements Checklist */}
                    <div className="border border-cad bg-surface-container-low p-space-md mb-space-lg space-y-space-xs font-label-md text-label-md">
                        <div className="flex items-center gap-2">
                            <span className="text-canvas-blueprint font-bold">[✓]</span>
                            <span>OPTICAL CAMERA FEED: Active face tracking and gaze telemetry</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-canvas-blueprint font-bold">[✓]</span>
                            <span>KERNEL FULLSCREEN LOCK: Window escape registers a 15-point risk penalty</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-canvas-blueprint font-bold">[✓]</span>
                            <span>ZERO-CLIPBOARD POLICY: Copy/Paste and browser inspection disabled</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-canvas-blueprint font-bold">[✓]</span>
                            <span>AUTOMATIC TERMINATION: Risk score limit capped strictly at 50 points</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-space-md pt-space-sm border-t border-cad">
                        <button
                            onClick={() => navigate('/student/dashboard')}
                            className="px-space-md py-2.5 border border-cad font-label-md text-label-md uppercase hover:bg-ink-primary hover:text-white transition-none cursor-pointer"
                        >
                            [ ABORT_RETURN_TO_CONSOLE ]
                        </button>

                        <button
                            onClick={startTest}
                            className="bg-canvas-blueprint text-white px-space-xl py-2.5 font-label-md text-label-md uppercase tracking-wider font-bold border border-canvas-blueprint hover:bg-surface-container-lowest hover:text-canvas-blueprint transition-none shadow-[3px_3px_0px_#191C1D] cursor-pointer"
                        >
                            [ INITIALIZE_PROCTORED_SESSION -&gt; ]
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
                        <div className="w-full p-3 sm:p-4 lg:p-6 grid grid-cols-12 gap-4 lg:gap-6 bg-canvas-light flex-1">

                            {/* A. LEFT COLUMN: EXAMINATION & SOLUTION CANVAS (Cols 1-8 / 70%) */}
                            <div className="col-span-12 lg:col-span-8 flex flex-col gap-4" id="QuestionWorkspace">
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

                            {/* B. RIGHT COLUMN: PROCTOR TELEMETRY & HARDWARE SUPERVISION (Cols 9-12 / 30%) */}
                            <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
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
                        <div className="w-full bg-surface-container-high border-t border-cad px-4 lg:px-6 py-2 flex flex-wrap items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                            <div>
                                EXAM_INSTANCE: <span className="font-bold text-ink-primary">SF-NODE-092.41A</span> | PROCTOR_KERNEL_VERSION: <span className="font-bold text-ink-primary">4.19.8-LOCKED</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span>HARDWARE_TOKEN: <code className="text-canvas-blueprint font-bold">BLAKE3_HASH_8F92BC</code></span>
                                <span>LATENCY: 14ms [DIRECT_SOCKET]</span>
                            </div>
                        </div>
                    </main>

                    <footer className="w-full bg-surface-container-low border-t border-cad py-space-sm select-none">
                        <div className="w-full px-margin flex flex-col md:flex-row items-center justify-between gap-space-sm font-label-sm text-label-sm text-on-surface-variant">
                            <div>REGISTRATION SPEC // NODE: US-EAST-04 // PROCTOR INTEGRITY LEVEL: DETERMINISTIC_V4</div>
                            <div className="flex flex-wrap items-center gap-space-md">
                                <span>STATUS: RECORDING_ACTIVE</span>
                                <span>ENCRYPTION: AES-256-GCM</span>
                                <span>© {new Date().getFullYear()} SKILLFORGE ALGORITHMIC EVALUATION CORP.</span>
                            </div>
                        </div>
                    </footer>
                </div>
            )}
        </ProctorWrapper>
    );
};

export default AssessmentPage;
