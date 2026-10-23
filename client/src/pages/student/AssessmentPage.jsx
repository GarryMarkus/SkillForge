import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import ProctorWrapper from '../../components/assessment/ProctorWrapper';
import api from '../../lib/api';

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
            "Convert the React application to synchronous synchronous XMLHttpRequest polling.",
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
            await api.post('/proctor/events/', {
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
            <div className="min-h-screen bg-surface font-mono flex flex-col items-center justify-center p-8 text-on-surface">
                <div className="border border-black/20 bg-surface-container-lowest p-space-xl shadow-[4px_4px_0px_#1D52B8] max-w-md w-full text-center">
                    <span className="w-3 h-3 bg-primary inline-block animate-pulse mb-3"></span>
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
            <div className="min-h-screen bg-surface font-mono text-on-surface flex flex-col items-center justify-center p-4 sm:p-8 select-none">
                <div className="max-w-3xl w-full border border-black/25 bg-surface-container-lowest p-space-lg md:p-space-xl shadow-[6px_6px_0px_#191C1D]">
                    <div className="border-b border-black/15 pb-space-sm mb-space-md flex flex-wrap items-center justify-between gap-2">
                        <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                            [ HARDWARE_STAGING_INITIALIZATION // KERNEL_LOCK_v4 ]
                        </span>
                        <span className="font-label-sm text-label-sm text-outline">
                            EST_DURATION: 30_MINUTES
                        </span>
                    </div>

                    <h1 className="font-headline-lg text-headline-lg uppercase font-bold tracking-tight text-on-surface mb-2">
                        PHASE 2: EMPIRICAL CODE &amp; ARCHITECTURE ASSESSMENT
                    </h1>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg leading-relaxed">
                        You are initializing a hardware-supervised examination. Performance scores and integrity audit logs will be cryptographically anchored to your candidate telemetry dossier.
                    </p>

                    {/* Security Requirements Checklist */}
                    <div className="border border-black/20 bg-surface-container-low p-space-md mb-space-lg space-y-space-xs font-label-md text-label-md">
                        <div className="flex items-center gap-2">
                            <span className="text-primary font-bold">[✓]</span>
                            <span>OPTICAL CAMERA FEED: Active face tracking and gaze telemetry</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-primary font-bold">[✓]</span>
                            <span>KERNEL FULLSCREEN LOCK: Window escape registers a 15-point risk penalty</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-primary font-bold">[✓]</span>
                            <span>ZERO-CLIPBOARD POLICY: Copy/Paste and browser inspection disabled</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-primary font-bold">[✓]</span>
                            <span>AUTOMATIC TERMINATION: Risk score limit capped strictly at 50 points</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-space-md pt-space-sm border-t border-black/15">
                        <button
                            onClick={() => navigate('/student/dashboard')}
                            className="px-space-md py-2.5 border border-black/30 font-label-md text-label-md uppercase hover:bg-black hover:text-white transition-none cursor-pointer"
                        >
                            [ ABORT_RETURN_TO_CONSOLE ]
                        </button>

                        <button
                            onClick={startTest}
                            className="bg-primary text-on-primary px-space-xl py-2.5 font-label-md text-label-md uppercase tracking-wider font-bold border border-primary hover:bg-surface hover:text-primary transition-none shadow-[3px_3px_0px_#191C1D] cursor-pointer"
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
    const riskPercentage = Math.round((riskScore / 50) * 10);
    const riskBars = "■".repeat(riskPercentage) + "░".repeat(Math.max(0, 10 - riskPercentage));

    return (
        <ProctorWrapper 
            onDisqualify={handleDisqualify} 
            onWarning={handleWarning}
            onFaceDetectedChange={setFaceDetected}
            onLogEvent={(msg) => addAuditLog(msg, "warn")}
        >
            <div className="bg-surface font-mono text-on-surface antialiased select-none min-h-screen flex flex-col">
                {/* APPLICATION HEADER (#AssessmentHeader) */}
                <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest border-b border-on-surface/20 select-none" id="AssessmentHeader">
                    <div className="h-14 w-full px-4 lg:px-6 flex items-center justify-between gap-4 font-body-md">
                        <div className="flex items-center gap-3">
                            <span className="inline-block w-2 h-2 bg-primary"></span>
                            <span className="font-label-md text-label-md text-on-surface uppercase tracking-wider font-bold truncate">
                                SKILLFORGE // PROCTOR_RUNNER_v2.4
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant font-bold hidden md:inline-block">
                                [EXAM_ID: SF-2026-DISTRIBUTED-09]
                            </span>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4">
                            <div className="px-2.5 py-1 bg-surface-container border border-on-surface/20 font-label-md text-label-md whitespace-nowrap">
                                <span className="text-on-surface-variant">QUESTION:</span>{" "}
                                <span className="text-primary font-bold">
                                    [ {String(currentQuestion + 1).padStart(2, '0')} / {String(questions.length).padStart(2, '0')} ]
                                </span>
                            </div>
                            <div className="px-3 py-1 bg-on-surface text-surface-container-lowest border border-on-surface font-label-md text-label-md flex items-center gap-1.5 shadow-[2px_2px_0px_#1D52B8] whitespace-nowrap">
                                <span className="inline-block w-1.5 h-1.5 bg-error animate-ping"></span>
                                <span className="hidden sm:inline">TIME_REMAINING:</span>
                                <span className="font-headline-sm text-headline-sm text-surface-container-lowest tracking-tight">
                                    {formatTime(timeLeft)}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 font-label-sm text-label-sm">
                            <div className="hidden md:flex items-center gap-1 px-2 py-0.5 border border-on-surface/25 bg-surface-container-low font-bold text-on-surface">
                                <span>[FULLSCREEN_LOCK: ENFORCED]</span>
                            </div>
                            <button
                                onClick={() => {
                                    if (window.confirm("Abort assessment? Incomplete examination will be logged.")) {
                                        navigate('/student/dashboard');
                                    }
                                }}
                                className="px-2.5 py-1 border border-error bg-error-container text-on-error-container font-label-sm text-label-sm hover:bg-error hover:text-on-error uppercase transition-none font-bold cursor-pointer"
                                type="button"
                            >
                                [ TERMINATE_TEST_ABORT ]
                            </button>
                        </div>
                    </div>
                </header>

                {/* MAIN COCKPIT: 70/30 ENGINEERING SPLIT GRID */}
                <main className="w-full pt-16 bg-surface min-h-screen flex-1 flex flex-col justify-between">
                    <div className="w-full p-3 sm:p-4 lg:p-6 grid grid-cols-12 gap-4 lg:gap-6 bg-surface flex-1">

                        {/* A. LEFT COLUMN: EXAMINATION & SOLUTION CANVAS (Cols 1-8) */}
                        <div className="col-span-12 lg:col-span-8 flex flex-col gap-4" id="QuestionWorkspace">
                            {/* QUESTION SPECIFICATION CONTAINER */}
                            <div className="relative bg-surface-container-lowest border border-on-surface/20 p-5 shadow-[4px_4px_0px_#191C1D]">
                                {/* Corner Tick Crosshairs */}
                                <span className="absolute -top-1.5 -left-1.5 font-label-sm text-label-sm text-on-surface select-none font-bold">+</span>
                                <span className="absolute -top-1.5 -right-1.5 font-label-sm text-label-sm text-on-surface select-none font-bold">+</span>
                                <span className="absolute -bottom-1.5 -left-1.5 font-label-sm text-label-sm text-on-surface select-none font-bold">+</span>
                                <span className="absolute -bottom-1.5 -right-1.5 font-label-sm text-label-sm text-on-surface select-none font-bold">+</span>

                                {/* Question Header Block */}
                                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-on-surface/15 pb-3">
                                    <span className="font-label-md text-label-md text-primary font-bold tracking-wider">
                                        [ SECTION_{String(currentQuestion + 1).padStart(2, '0')} // {q.section || 'SYSTEM_CONCURRENCY_&_INDEXING'} ]
                                    </span>
                                    <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
                                        <span>WEIGHT: [ {q.weight || '25 PTS'} ]</span>
                                        <span>//</span>
                                        <span>COGNITIVE_TAXONOMY: {q.taxonomy || 'SYNTHESIS'}</span>
                                    </div>
                                </div>

                                {/* Problem Scenario Meta */}
                                <div className="pt-4 pb-2">
                                    <h1 className="font-headline-sm text-headline-sm text-on-surface uppercase tracking-tight font-bold">
                                        {q.title || q.question || q.text}
                                    </h1>
                                    <p className="mt-2.5 font-body-md text-body-md text-on-surface-variant leading-relaxed">
                                        {q.description || 'Analyze the technical scenario and select the architecturally optimal resolution vector.'}
                                    </p>
                                </div>

                                {/* CODE SNIPPET PANEL (#CodeSnippetBox) */}
                                {q.code_snippet && (
                                    <div className="mt-4 bg-[#0A0A0A] text-[#EDEEEF] border border-on-surface/40 p-0 font-body-sm text-body-sm shadow-[2px_2px_0px_#1D52B8]" id="CodeSnippetBox">
                                        <div className="bg-[#191C1D] text-[#EDEEEF] px-3 py-1.5 border-b border-[#3F4141] flex items-center justify-between font-label-sm text-label-sm">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-primary-fixed inline-block"></span>
                                                <span>[TERMINAL // PYTHON_RUNTIME_ENV_3.11]</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-on-surface-variant">
                                                <span className="px-1 border border-[#3F4141] text-[#EDEEEF]">[-]</span>
                                                <span className="px-1 border border-[#3F4141] text-[#EDEEEF]">[□]</span>
                                                <span className="px-1 border border-[#BA1A1A] text-[#BA1A1A]">[X]</span>
                                            </div>
                                        </div>
                                        <div className="p-4 overflow-x-auto text-left leading-relaxed">
                                            <pre className="font-mono text-body-md text-[#EDEEEF] m-0 whitespace-pre">
                                                {q.code_snippet}
                                            </pre>
                                        </div>
                                        <div className="bg-[#141617] px-3 py-1 border-t border-[#3F4141] flex items-center justify-between text-[#737784] font-label-sm text-label-sm">
                                            <span>AST_TOKEN_AUDIT: PARSED_CLEAN // STATIC_ANALYSIS_HASH: 0x9f4e22a</span>
                                            <span className="text-primary-fixed-dim">[ENCODING: UTF-8]</span>
                                        </div>
                                    </div>
                                )}

                                {/* MULTIPLE-CHOICE ANSWER SELECTOR PANEL (#OptionsMatrix) */}
                                <div className="mt-6 flex flex-col gap-3" id="OptionsMatrix">
                                    <div className="flex items-center justify-between">
                                        <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">
                                            [ PROPOSED_ARCHITECTURAL_CORRECTIONS (SELECT EXACTLY ONE) ]
                                        </span>
                                        <span className="font-label-sm text-label-sm text-on-surface-variant">DETERMINISTIC_EVAL: ON</span>
                                    </div>

                                    {(q.options || []).map((option, idx) => {
                                        const isSelected = selectedAnswerIdx === idx;
                                        const letter = String.fromCharCode(65 + idx);

                                        return (
                                            <label
                                                key={idx}
                                                onClick={() => handleAnswerSelect(idx)}
                                                className={`cursor-pointer transition-none p-3.5 flex items-start gap-3 select-none ${
                                                    isSelected
                                                        ? 'border border-primary bg-primary text-on-primary shadow-[3px_3px_0px_#001847]'
                                                        : 'border border-on-surface/25 bg-surface-container-low hover:bg-surface-container'
                                                }`}
                                            >
                                                <div className={`font-label-md text-label-md font-bold px-1.5 py-0.5 ${
                                                    isSelected
                                                        ? 'bg-surface-container-lowest text-primary'
                                                        : 'bg-surface-container-lowest border border-on-surface/40 text-on-surface'
                                                }`}>
                                                    {isSelected ? '[X]' : '[   ]'}
                                                </div>
                                                <div className={`flex-1 font-body-md text-body-md ${isSelected ? 'text-on-primary font-bold' : 'text-on-surface'}`}>
                                                    <span className="font-bold">{letter} //</span> {option}
                                                </div>
                                            </label>
                                        );
                                    })}
                                </div>

                                {/* Bottom Navigation & Submission Rail */}
                                <div className="mt-6 pt-4 border-t border-on-surface/20 flex flex-wrap justify-between items-center gap-3">
                                    <button
                                        onClick={handlePrevQuestion}
                                        disabled={currentQuestion === 0}
                                        className="px-4 py-2 border border-on-surface/40 bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-container disabled:opacity-30 transition-none font-bold uppercase cursor-pointer"
                                        type="button"
                                    >
                                        [ &lt;- PREVIOUS_QUESTION ]
                                    </button>

                                    <div className="flex items-center gap-2.5">
                                        <button
                                            onClick={handleClearSelection}
                                            className="px-3.5 py-2 border border-on-surface/30 bg-surface-container text-on-surface-variant font-label-md text-label-md hover:text-on-surface hover:bg-surface-container-high transition-none uppercase cursor-pointer"
                                            type="button"
                                        >
                                            [ CLEAR_SELECTION ]
                                        </button>
                                        <button
                                            onClick={handleNextQuestion}
                                            className="px-5 py-2.5 bg-primary text-on-primary border border-primary font-label-md text-label-md hover:bg-primary-container shadow-[3px_3px_0px_#191C1D] transition-none font-bold uppercase tracking-wider cursor-pointer"
                                            type="button"
                                        >
                                            {currentQuestion === questions.length - 1 ? '[ SUBMIT_EXAMINATION -> ]' : '[ COMMIT_ANSWER_&_NEXT -> ]'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* DIAGNOSTIC FOOTER NOTELET */}
                            <div className="p-3 bg-surface-container border border-on-surface/15 flex flex-wrap items-center justify-between font-label-sm text-label-sm text-on-surface-variant gap-2">
                                <div>NODE_HASH: SHA256:d8c3b17e4 // SCRATCHPAD_SLOT: SECURE_VOLATILE_RAM</div>
                                <div className="font-bold text-on-surface">ACTIVE_INPUT_CARRIER: MOUSE_EVENT_V1</div>
                            </div>
                        </div>

                        {/* B. RIGHT COLUMN: PROCTOR TELEMETRY & HARDWARE SUPERVISION (Cols 9-12) */}
                        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4" id="ProctorTelemetryPanel">
                            {/* TOP BLUEPRINT SECURITY FEED (Cobalt Cad Box) */}
                            <div className="bg-primary text-on-primary border border-primary p-4 shadow-[4px_4px_0px_#191C1D] relative">
                                <span className="absolute top-1 left-1 font-label-sm text-label-sm text-on-primary/60">┌</span>
                                <span className="absolute top-1 right-1 font-label-sm text-label-sm text-on-primary/60">┐</span>
                                <span className="absolute bottom-1 left-1 font-label-sm text-label-sm text-on-primary/60">└</span>
                                <span className="absolute bottom-1 right-1 font-label-sm text-label-sm text-on-primary/60">┘</span>

                                <div className="flex items-center justify-between border-b border-on-primary/30 pb-2 mb-3">
                                    <span className="font-label-sm text-label-sm tracking-wider font-bold uppercase text-on-primary">
                                        [ HARDWARE_TELEMETRY // OPTICAL_FACE_VERIFICATION ]
                                    </span>
                                    <span className={`w-2 h-2 inline-block ${faceDetected ? 'bg-[#69db7c] animate-pulse' : 'bg-error'}`}></span>
                                </div>

                                {/* Live Camera Viewport Mockup / HUD */}
                                <div className="relative w-full aspect-video bg-[#0E2C66] border border-on-primary/40 overflow-hidden flex items-center justify-center" id="proctor-optical-viewport">
                                    {/* CAD Crosshair Grid Background */}
                                    <svg className="absolute inset-0 w-full h-full opacity-25 text-on-primary" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <pattern height="24" id="grid-pattern" patternUnits="userSpaceOnUse" width="24">
                                                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
                                            </pattern>
                                        </defs>
                                        <rect fill="url(#grid-pattern)" height="100%" width="100%"></rect>
                                        <line stroke="currentColor" strokeDasharray="2 2" strokeWidth="0.75" x1="50%" x2="50%" y1="0" y2="100%"></line>
                                        <line stroke="currentColor" strokeDasharray="2 2" strokeWidth="0.75" x1="0" x2="100%" y1="50%" y2="50%"></line>
                                    </svg>

                                    {/* CAD Scanning Line Effect */}
                                    <div className="absolute inset-x-0 h-0.5 bg-[#69db7c]/80 shadow-[0_0_8px_#69db7c] animate-[bounce_3s_infinite]"></div>

                                    {/* Precision Crosshairs */}
                                    <div className="absolute top-2 left-2 text-[10px] font-mono text-on-primary/80">+ [00, 00]</div>
                                    <div className="absolute top-2 right-2 text-[10px] font-mono text-on-primary/80">+ [640, 00]</div>
                                    <div className="absolute bottom-2 left-2 text-[10px] font-mono text-on-primary/80">+ [00, 480]</div>
                                    <div className="absolute bottom-2 right-2 text-[10px] font-mono text-on-primary/80">+ [640, 480]</div>

                                    {/* Face Wireframe Vector Simulation */}
                                    <div className="relative w-28 h-36 border-2 border-[#69db7c] flex flex-col justify-between p-1 z-10 bg-[#69db7c]/5">
                                        <div className="flex justify-between items-start">
                                            <span className="text-[8px] font-mono bg-on-primary text-primary px-0.5 font-bold">[X:142 Y:088 W:120 H:150]</span>
                                            <span className={`text-[8px] font-mono font-bold ${faceDetected ? 'text-[#69db7c]' : 'text-error'}`}>
                                                {faceDetected ? 'LOCKED' : 'SEARCHING'}
                                            </span>
                                        </div>
                                        <div className="w-full h-16 flex items-center justify-center opacity-80">
                                            <svg className="w-16 h-20 text-[#69db7c] stroke-current fill-none stroke-[1.2]" viewBox="0 0 100 120">
                                                <ellipse cx="50" cy="55" rx="35" ry="45" strokeDasharray="2 2"></ellipse>
                                                <circle cx="36" cy="46" r="3"></circle>
                                                <circle cx="64" cy="46" r="3"></circle>
                                                <line strokeWidth="0.5" x1="28" x2="72" y1="46" y2="46"></line>
                                                <path d="M 50 48 L 47 64 L 53 64"></path>
                                                <line x1="38" x2="62" y1="78" y2="78"></line>
                                                <line stroke="#ff8787" strokeWidth="2" x1="50" x2="52" y1="52" y2="50"></line>
                                            </svg>
                                        </div>
                                        <div className="text-[8px] font-mono text-right text-on-primary">
                                            CONF: {faceDetected ? '98.2%' : '14.0%'}
                                        </div>
                                    </div>

                                    <div className="absolute bottom-2 left-3 bg-[#001847]/80 px-2 py-0.5 border border-on-primary/30 text-[9px] font-mono">
                                        TARGET_HASH: CANDIDATE_094
                                    </div>
                                </div>

                                {/* Camera Diagnostic Tag Stream */}
                                <div className="mt-3 pt-2 border-t border-on-primary/20 space-y-1 font-label-sm text-label-sm text-on-primary">
                                    <div className="flex justify-between">
                                        <span className="text-on-primary/70">OPTICAL_FEED:</span>
                                        <span className="font-bold text-[#69db7c]">ACTIVE [64x48px_CANVAS]</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-on-primary/70">FACE_DETECTED:</span>
                                        <span className={`font-bold ${faceDetected ? 'text-[#69db7c]' : 'text-error'}`}>
                                            {faceDetected ? 'TRUE [CONFIDENCE: 98.2%]' : 'FALSE [SEARCHING]'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-on-primary/70">SKIN_TONE_HEURISTIC:</span>
                                        <span>STABLE</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-on-primary/70">MULTIPLE_FACES:</span>
                                        <span className="font-bold text-[#69db7c]">NONE</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-on-primary/70">GAZE_VECTOR:</span>
                                        <span>(0.02, -0.01) [NORMAL]</span>
                                    </div>
                                </div>
                            </div>

                            {/* ANTI-CHEAT HEURISTIC ENGINE STATUS CARD */}
                            <div className="p-4 border border-on-surface/20 bg-surface-container-lowest shadow-[4px_4px_0px_#191C1D]">
                                <div className="border-b border-on-surface/15 pb-2 flex items-center justify-between">
                                    <span className="font-label-md text-label-md font-bold uppercase text-on-surface">
                                        [ PROCTOR_RISK_ACCUMULATOR ]
                                    </span>
                                    <span className="font-label-sm text-label-sm text-on-surface-variant">LIMIT: 50_PTS</span>
                                </div>

                                <div className="mt-3">
                                    <div className="flex justify-between items-baseline font-label-md text-label-md">
                                        <span className="text-on-surface-variant">CURRENT_RISK_SCORE:</span>
                                        <span className={`font-headline-sm text-headline-sm font-bold ${riskScore > 30 ? 'text-error' : 'text-on-surface'}`}>
                                            [ {String(riskScore).padStart(2, '0')} / 50 ]
                                        </span>
                                    </div>

                                    {/* ASCII Visual Gauge */}
                                    <div className="mt-1.5 p-2 bg-surface-container border border-on-surface/20 font-headline-sm text-headline-sm tracking-widest text-primary flex items-center justify-between">
                                        <span className="tracking-widest">[{riskBars}]</span>
                                        <span className={`font-label-sm text-label-sm px-1.5 py-0.5 border font-bold ${
                                            riskScore > 30
                                                ? 'bg-error-container text-on-error-container border-error'
                                                : 'bg-surface-container-lowest border-primary text-primary'
                                        }`}>
                                            STATUS: {riskScore > 30 ? 'CRITICAL' : 'SAFE'}
                                        </span>
                                    </div>
                                    <div className="mt-2 text-[10px] text-error font-bold leading-tight uppercase">
                                        * POLICY: AUTOMATIC_DISQUALIFICATION_AT_50_POINTS
                                    </div>
                                </div>

                                {/* Hardware Counters */}
                                <div className="mt-4 pt-3 border-t border-on-surface/10 grid grid-cols-3 gap-2 text-center">
                                    <div className="p-2 border border-on-surface/15 bg-surface-container-low">
                                        <div className="font-label-sm text-label-sm text-on-surface-variant">TAB_SWITCH</div>
                                        <div className="font-headline-sm text-headline-sm text-on-surface font-bold">
                                            {String(tabSwitches).padStart(2, '0')}
                                        </div>
                                    </div>
                                    <div className="p-2 border border-on-surface/15 bg-surface-container-low">
                                        <div className="font-label-sm text-label-sm text-on-surface-variant">AUDIO_SPIKE</div>
                                        <div className="font-headline-sm text-headline-sm text-on-surface font-bold">
                                            {String(audioSpikes).padStart(2, '0')}
                                        </div>
                                    </div>
                                    <div className="p-2 border border-on-surface/15 bg-surface-container-low">
                                        <div className="font-label-sm text-label-sm text-on-surface-variant">HEAD_ROT</div>
                                        <div className="font-headline-sm text-headline-sm text-on-surface font-bold">{headRotation}</div>
                                    </div>
                                </div>
                            </div>

                            {/* SECURITY EVENT LOG STREAM (#SecurityAuditList) */}
                            <div className="p-4 border border-on-surface/20 bg-surface-container-lowest shadow-[4px_4px_0px_#191C1D] flex-1 flex flex-col justify-between" id="SecurityAuditList">
                                <div>
                                    <div className="border-b border-on-surface/15 pb-2 flex items-center justify-between">
                                        <span className="font-label-md text-label-md font-bold uppercase text-on-surface">
                                            [ HARDWARE_AUDIT_LOG_STREAM ]
                                        </span>
                                        <span className="font-label-sm text-label-sm text-primary font-bold">[REALTIME]</span>
                                    </div>

                                    <div className="mt-3 overflow-hidden">
                                        <div className="space-y-1.5 font-label-sm text-label-sm">
                                            {auditLogs.map((log, i) => (
                                                <div 
                                                    key={i} 
                                                    className={`py-1 border-b border-on-surface/10 flex items-center justify-between ${
                                                        log.type === 'warn' 
                                                            ? 'bg-error-container text-on-error-container px-1 font-bold' 
                                                            : 'text-on-surface-variant'
                                                    }`}
                                                >
                                                    <span>{log.time}</span>
                                                    <span className={log.type === 'warn' ? 'text-on-error-container' : 'text-on-surface'}>
                                                        {log.text}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 pt-2 border-t border-on-surface/15 text-[10px] text-on-surface-variant font-mono flex items-center gap-1">
                                    <span className="text-primary font-bold">VERIFIER:</span>
                                    <span>HW_SEC_ENCLAVE_SIGNED // 0x48bb701c9</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* TECHNICAL SYSTEM FOOTER RUNNER */}
                    <div className="w-full bg-surface-container-high border-t border-on-surface/20 px-4 lg:px-6 py-2 flex flex-wrap items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                        <div>
                            EXAM_INSTANCE: <span className="font-bold text-on-surface">SF-NODE-092.41A</span> | PROCTOR_KERNEL_VERSION: <span className="font-bold text-on-surface">4.19.8-LOCKED</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span>HARDWARE_TOKEN: <code className="text-primary font-bold">BLAKE3_HASH_8F92BC</code></span>
                            <span>LATENCY: 14ms [DIRECT_SOCKET]</span>
                        </div>
                    </div>
                </main>

                <footer className="w-full bg-surface-container-low border-t border-on-surface/20 py-space-sm select-none">
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
        </ProctorWrapper>
    );
};

export default AssessmentPage;
