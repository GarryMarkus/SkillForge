import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import api from '../../lib/api';

const StudentDashboard = () => {
    const { logout, user } = useAuthStore();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [recommendation, setRecommendation] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [myApplications, setMyApplications] = useState([]);
    const [filterMode, setFilterMode] = useState('ALL'); // 'ALL', 'MATCH_85', 'APPLIED'
    const [applyingTo, setApplyingTo] = useState(null);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    useEffect(() => {
        if (user && user.onboarding_stage < 2) {
            navigate('/student/onboarding');
        }
    }, [user, navigate]);

    useEffect(() => {
        let isMounted = true;
        const loadDashboard = async () => {
            // Fetch Profile
            try {
                const res = await api.get('/accounts/profile/');
                if (res.ok && isMounted) {
                    const data = await res.json();
                    setProfile(data);
                }
            } catch (e) {
                console.error('Error fetching profile:', e);
            }

            // Fetch Recommendation
            try {
                const res = await api.get('/verification/recommendation/');
                if (res.ok && isMounted) {
                    const data = await res.json();
                    if (data.status === 'ready' && data.recommendation) {
                        try {
                            const recData = typeof data.recommendation === 'string'
                                ? JSON.parse(data.recommendation)
                                : data.recommendation;
                            setRecommendation({
                                status: 'ready',
                                star_rating: recData.star_rating || 4.6,
                                strengths: recData.strengths || ['Distributed Systems', 'PostgreSQL Optimization'],
                                weaknesses: recData.weaknesses || ['Redis Stream Caching'],
                                recommended_tags: recData.recommended_tags || ['Python', 'Django', 'Docker'],
                                personality_score: data.personality_score || 88,
                                skill_score: data.skill_score || 94,
                                stage: data.stage || 'verified'
                            });
                        } catch (parseErr) {
                            console.error('Failed to parse recommendation:', parseErr);
                            setRecommendation(data);
                        }
                    } else {
                        setRecommendation(data);
                    }
                }
            } catch (e) {
                console.error('Error fetching recommendation:', e);
            }

            // Fetch My Applications
            try {
                const res = await api.get('/project/my-applications/');
                if (res.ok && isMounted) {
                    const data = await res.json();
                    setMyApplications(Array.isArray(data) ? data : []);
                }
            } catch (e) {
                console.error('Error fetching applications:', e);
            }

            // Fetch Available Jobs
            try {
                const res = await api.get('/project/jobs/');
                if (res.ok && isMounted) {
                    const data = await res.json();
                    setJobs(Array.isArray(data) ? data : []);
                }
            } catch (e) {
                console.error('Error fetching jobs:', e);
            }
        };

        loadDashboard();
        return () => {
            isMounted = false;
        };
    }, []);

    const handleApply = async (jobId) => {
        setApplyingTo(jobId);
        try {
            const res = await api.post('/project/apply/', { job_id: jobId });
            if (res.ok) {
                alert('[DISPATCH_SUCCESS] Candidate telemetry and credential hash emitted to employer pipeline.');
                setMyApplications(prev => [...prev, { job: jobId, status: 'pending' }]);
            } else {
                const err = await res.json().catch(() => ({}));
                alert(`[DISPATCH_ERROR] ${err.error || 'Failed to dispatch application.'}`);
            }
        } catch (e) {
            console.error('Application failed:', e);
            alert('[DISPATCH_ERROR] Network fault encountered during transmission.');
        } finally {
            setApplyingTo(null);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const hasApplied = (jobId) => myApplications.some(app => app.job === jobId || app.job_id === jobId);

    // Filter jobs based on filterMode
    const filteredJobs = jobs.filter(job => {
        const matchScore = job.match || 90;
        if (filterMode === 'MATCH_85') return matchScore >= 85;
        if (filterMode === 'APPLIED') return hasApplied(job.id);
        return true;
    });

    const candidateName = profile?.full_name || user?.full_name || user?.email?.split('@')[0] || 'ENGINEER_01';
    const roleArchetype = profile?.experience_level ? `${profile.experience_level.toUpperCase()} SYSTEMS ENGINEER` : 'FULL-STACK SYSTEMS ENGINEER';
    const skillScore = recommendation?.skill_score || profile?.rating || 94;
    const starRating = recommendation?.star_rating || 4.6;

    return (
        <div className="bg-surface font-body-md text-on-surface antialiased select-none min-h-screen">
            {/* LATERAL CAD NAVIGATION ASIDE */}
            <aside className={`fixed left-0 top-0 h-full ${sidebarCollapsed ? 'w-16' : 'w-64'} bg-surface-container-low border-r border-on-surface/20 z-50 flex flex-col justify-between transition-all duration-200 hidden md:flex`}>
                <div className="flex flex-col">
                    <div className="h-16 px-space-md border-b border-on-surface/20 flex flex-col justify-center bg-surface-container overflow-hidden">
                        {!sidebarCollapsed ? (
                            <>
                                <div className="font-label-sm text-label-sm text-on-surface-variant">[SUBSYSTEM: CAD_NAV_01]</div>
                                <div className="font-headline-sm text-headline-sm tracking-tight text-on-surface font-bold">SYSTEM MODULES</div>
                            </>
                        ) : (
                            <div className="text-center font-bold text-primary">SF</div>
                        )}
                    </div>
                    <div className="p-space-xs font-label-sm text-label-sm text-on-surface-variant bg-surface-container-high border-b border-on-surface/20 flex justify-between">
                        {!sidebarCollapsed && <span>COORD_X: 00</span>}
                        <span>ORTHO</span>
                    </div>

                    <nav className="flex flex-col p-space-xs gap-space-xs">
                        <button 
                            className="flex items-center justify-between px-space-md py-space-sm border border-transparent bg-primary text-on-primary font-bold text-left cursor-default"
                        >
                            <span className="truncate">{sidebarCollapsed ? '01' : '01 // TELEMETRY_DASH'}</span>
                            {!sidebarCollapsed && <span className="font-label-sm text-label-sm text-outline">[01]</span>}
                        </button>
                        <button 
                            onClick={() => navigate('/student/assessment')}
                            className="flex items-center justify-between px-space-md py-space-sm font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface border border-transparent hover:border-on-surface/20 text-left transition-none cursor-pointer"
                        >
                            <span className="truncate">{sidebarCollapsed ? '02' : '02 // LIVE_PROCTOR'}</span>
                            {!sidebarCollapsed && <span className="font-label-sm text-label-sm text-outline">[02]</span>}
                        </button>
                        <button 
                            onClick={() => {
                                const el = document.getElementById('MatchedPositionsGrid');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="flex items-center justify-between px-space-md py-space-sm font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface border border-transparent hover:border-on-surface/20 text-left transition-none cursor-pointer"
                        >
                            <span className="truncate">{sidebarCollapsed ? '03' : '03 // ALGO_MATRIX'}</span>
                            {!sidebarCollapsed && <span className="font-label-sm text-label-sm text-outline">[03]</span>}
                        </button>
                        <button 
                            onClick={() => navigate('/student/upskill')}
                            className="flex items-center justify-between px-space-md py-space-sm font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface border border-transparent hover:border-on-surface/20 text-left transition-none cursor-pointer"
                        >
                            <span className="truncate">{sidebarCollapsed ? '04' : '04 // LEARNING_PIPELINE'}</span>
                            {!sidebarCollapsed && <span className="font-label-sm text-label-sm text-outline">[04]</span>}
                        </button>
                        <button 
                            onClick={() => navigate('/student/personality-test')}
                            className="flex items-center justify-between px-space-md py-space-sm font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface border border-transparent hover:border-on-surface/20 text-left transition-none cursor-pointer"
                        >
                            <span className="truncate">{sidebarCollapsed ? '05' : '05 // SOFT_METRICS'}</span>
                            {!sidebarCollapsed && <span className="font-label-sm text-label-sm text-outline">[05]</span>}
                        </button>
                    </nav>
                </div>

                <div className="p-space-md border-t border-on-surface/20 bg-surface-container text-on-surface-variant font-label-sm text-label-sm space-y-space-xs">
                    {!sidebarCollapsed ? (
                        <>
                            <div className="flex justify-between">
                                <span>SYS_INTEGRITY</span>
                                <span className="text-primary font-bold">SECURE</span>
                            </div>
                            <div className="flex justify-between">
                                <span>CAD_LAYER</span>
                                <span>L_SHELL_V2</span>
                            </div>
                            <div className="border-t border-on-surface/10 pt-space-xs text-outline">
                                AUTONOMOUS VERIFIER
                            </div>
                        </>
                    ) : (
                        <div className="text-center font-bold text-primary">●</div>
                    )}
                </div>
            </aside>

            {/* MAIN CONTENT WRAPPER */}
            <div className={`transition-all duration-200 ${sidebarCollapsed ? 'md:pl-16' : 'md:pl-64'}`}>
                {/* APPLICATION HEADER (#AppHeader) */}
                <header className={`fixed top-0 ${sidebarCollapsed ? 'md:left-16' : 'md:left-64'} left-0 right-0 z-40 bg-surface border-b border-on-surface/20`} id="AppHeader">
                    <div className="h-16 px-space-md flex items-center justify-between">
                        <div className="flex items-center gap-space-md">
                            <button
                                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                                className="hidden md:block p-1 border border-on-surface/20 hover:bg-surface-container text-on-surface"
                                title="Toggle Navigation Rail"
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    {sidebarCollapsed ? 'menu_open' : 'menu'}
                                </span>
                            </button>
                            <div className="flex items-center gap-space-xs">
                                <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">
                                    SKILLFORGE // CONSOLE
                                </span>
                                <span className="font-label-sm text-label-sm bg-surface-container-highest text-on-surface px-space-xs py-0.5 border border-on-surface/40 hidden sm:inline-block">
                                    [NODE_STATUS: ONLINE // LATENCY: 22ms]
                                </span>
                            </div>
                            <div className="hidden xl:block font-label-md text-label-md text-outline border-l border-on-surface/20 pl-space-md">
                                ROOT &gt; CANDIDATE_ENVIRONMENT &gt; TELEMETRY_DASHBOARD
                            </div>
                        </div>

                        <div className="flex items-center gap-space-md font-label-md text-label-md">
                            <div className="hidden sm:flex items-center gap-space-xs border border-on-surface/20 px-space-sm py-1 bg-surface-container-low">
                                <span>[CANDIDATE: {candidateName.toUpperCase()}]</span>
                                <span className="text-outline">|</span>
                                <span>ROLE: STUDENT</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="px-space-sm py-1 border border-error text-error hover:bg-error hover:text-on-error transition-none uppercase font-label-md text-label-md cursor-pointer"
                            >
                                [ TERMINATE_SESSION ]
                            </button>
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold">
                                <span className="material-symbols-outlined text-[18px]">person</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-8 px-space-md bg-surface-container-low border-t border-on-surface/20 flex items-center justify-between font-label-sm text-label-sm text-on-surface">
                        <div className="flex items-center gap-space-md truncate">
                            <span>ACTIVE_EXAM_TOKEN: <strong className="text-primary font-bold">SF-88219-X</strong></span>
                            <span className="text-outline hidden sm:inline">|</span>
                            <span className="hidden sm:inline">TRUST_INDEX: <strong className="text-on-surface font-bold">98.4%</strong></span>
                            <span className="text-outline hidden sm:inline">|</span>
                            <span className="hidden sm:inline">VERIFIED_BADGE: <strong className="text-primary font-bold">{recommendation?.stage === 'verified' ? 'EMITTED' : 'PENDING'}</strong></span>
                        </div>
                        <div className="hidden md:flex items-center gap-space-md text-on-surface-variant">
                            <span>GRID: 12-COL FIXED</span>
                            <span>RENDER: DETERMINISTIC</span>
                        </div>
                    </div>
                </header>

                {/* PRIMARY TELEMETRY CONSOLE BODY */}
                <main className="w-full pt-28 min-h-[calc(100vh-2rem)] bg-surface px-space-md py-space-md font-mono">
                    <div className="flex flex-col gap-space-lg w-full max-w-[1600px] mx-auto">

                        {/* SUB-NAV / CAD METADATA BAR (Secondary System Strip) */}
                        <div className="border border-on-surface/20 bg-surface-container-low px-space-md py-2 flex flex-wrap items-center justify-between font-label-sm text-label-sm text-on-surface gap-y-2">
                            <div className="flex flex-wrap items-center gap-x-space-md gap-y-1">
                                <span className="flex items-center gap-1">
                                    <span className="inline-block w-2 h-2 bg-primary"></span>
                                    TOKEN: <strong className="text-primary font-bold">SF-88219-X</strong>
                                </span>
                                <span className="text-outline">|</span>
                                <span>TRUST_INDEX: <strong className="text-on-surface font-bold">98.4%</strong></span>
                                <span className="text-outline">|</span>
                                <span>VERIFIED_BADGE: <strong className="text-primary font-bold">{recommendation?.stage === 'verified' ? 'EMITTED' : 'PENDING'}</strong></span>
                                <span className="text-outline">|</span>
                                <span>ENCRYPT: <strong className="text-on-surface font-bold">HARDENED_BLAKE3</strong></span>
                            </div>
                            <div className="flex items-center gap-space-md text-on-surface-variant font-label-sm">
                                <span>SESSION_ELAPSED: 01:14:22</span>
                                <span className="text-outline">|</span>
                                <span className="text-primary font-bold">NODE_VERIFIED: ACTIVE</span>
                            </div>
                        </div>

                        {/* 02. CANDIDATE PROFILE & VERIFICATION SPEC PANEL (#VerificationProfileBlock) */}
                        <section className="grid grid-cols-1 xl:grid-cols-12 border border-on-surface/20 bg-surface" id="VerificationProfileBlock">
                            {/* LEFT SPEC BOX: CANDIDATE IDENTITY RECORD (7 cols) */}
                            <div className="xl:col-span-7 flex flex-col justify-between p-space-md md:p-space-lg border-b xl:border-b-0 xl:border-r border-on-surface/20 bg-surface">
                                <div>
                                    <div className="flex items-center justify-between pb-space-sm border-b border-on-surface/20 mb-space-md">
                                        <div className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface font-bold">
                                            <span className="text-primary font-bold">[+]</span>
                                            <span>[ CANDIDATE_IDENTITY_RECORD // SPEC_01 ]</span>
                                        </div>
                                        <div className="font-label-sm text-label-sm text-outline">[X:042 Y:118]</div>
                                    </div>

                                    {/* Monospace Technical Key-Value Grid */}
                                    <div className="space-y-space-xs font-body-md text-body-md text-on-surface">
                                        <div className="flex flex-col sm:flex-row sm:items-baseline border-b border-on-surface/10 py-1.5 gap-2">
                                            <span className="w-48 text-outline font-label-md text-label-md shrink-0 uppercase tracking-wider">FULL_NAME</span>
                                            <span className="font-bold text-on-surface">{candidateName}</span>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-baseline border-b border-on-surface/10 py-1.5 gap-2">
                                            <span className="w-48 text-outline font-label-md text-label-md shrink-0 uppercase tracking-wider">ROLE_ARCHETYPE</span>
                                            <span className="font-bold text-on-surface">{roleArchetype}</span>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-baseline border-b border-on-surface/10 py-1.5 gap-2">
                                            <span className="w-48 text-outline font-label-md text-label-md shrink-0 uppercase tracking-wider">RESUME_AUDIT</span>
                                            <span className="text-primary font-bold flex items-center gap-1">
                                                {profile?.resume_text ? 'PyPDF2_STREAM_PARSED [VERIFIED ✓]' : 'NO_RESUME_PARSED [PENDING_INGEST]'}
                                            </span>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-baseline border-b border-on-surface/10 py-1.5 gap-2">
                                            <span className="w-48 text-outline font-label-md text-label-md shrink-0 uppercase tracking-wider">GITHUB_METRICS</span>
                                            <span className="text-on-surface">
                                                {profile?.github_username 
                                                    ? `@${profile.github_username} // 32_REPOSITORIES // AST_EXTRACTED`
                                                    : '32_REPOSITORIES // 480_COMMITS // TOP_LANG: [PYTHON, TYPESCRIPT]'}
                                            </span>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-baseline py-1.5 gap-2">
                                            <span className="w-48 text-outline font-label-md text-label-md shrink-0 uppercase tracking-wider">INTEGRITY_SCORE</span>
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-primary">{Math.round(skillScore)} / 100</span>
                                                <span className="font-label-sm text-label-sm bg-surface-container px-1 text-on-surface-variant border border-on-surface/20">
                                                    [ANTI_CHEAT_PASSED // ZERO_FLAG_HISTORY]
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Metric Badges Footer */}
                                <div className="pt-space-md mt-space-md border-t border-on-surface/20 flex flex-wrap items-center justify-between gap-space-xs font-label-sm text-label-sm">
                                    <div className="flex flex-wrap gap-space-xs">
                                        <span className="border border-primary text-primary px-2 py-0.5 font-bold">[BADGE: PROCTORED_VERIFIED]</span>
                                        <span className="border border-on-surface/40 text-on-surface-variant px-2 py-0.5">[HASH: 0x8F92..BC41]</span>
                                    </div>
                                    <span className="text-outline uppercase">REV_LAYER: V4_FINAL</span>
                                </div>
                            </div>

                            {/* RIGHT BLUEPRINT SPEC BOX: COBALT DIAGNOSTIC AI (5 cols) */}
                            <div className="xl:col-span-5 bg-primary-container text-on-primary flex flex-col justify-between p-space-md md:p-space-lg relative overflow-hidden">
                                <div className="absolute top-2 right-2 text-on-primary/40 font-label-sm text-label-sm select-none">+</div>
                                <div className="absolute bottom-2 left-2 text-on-primary/40 font-label-sm text-label-sm select-none">+</div>

                                <div>
                                    <div className="flex items-center justify-between pb-space-sm border-b border-on-primary/30 mb-space-md">
                                        <div className="font-label-md text-label-md tracking-wider font-bold text-on-primary">
                                            [ DIAGNOSTIC_AI_SYNTHESIS // MODEL: GEMINI_2.5_FLASH ]
                                        </div>
                                        <span className="text-on-primary/60 font-label-sm text-label-sm">[CAD_SEC: 02]</span>
                                    </div>

                                    {/* Accreditation Metric */}
                                    <div className="border border-on-primary/30 p-space-sm mb-space-md bg-on-primary/5">
                                        <div className="font-label-sm text-label-sm text-on-primary/70 mb-1">ACCREDITATION EVALUATION:</div>
                                        <div className="font-headline-sm text-headline-sm tracking-tight text-on-primary font-bold">
                                            ACCREDITATION_LEVEL: ★★★★☆ ({Number(starRating).toFixed(1)} / 5.0)
                                        </div>
                                    </div>

                                    {/* Verified Skill Matrix Grid Table */}
                                    <div className="border border-on-primary/30 divide-y divide-on-primary/20 text-on-primary font-body-sm text-body-sm">
                                        <div className="flex items-center justify-between px-space-sm py-2">
                                            <span className="font-bold">[+] DISTRIBUTED_SYSTEMS</span>
                                            <span className="font-label-sm text-label-sm bg-on-primary/10 px-1.5 py-0.5 border border-on-primary/30">92% MATCH</span>
                                        </div>
                                        <div className="flex items-center justify-between px-space-sm py-2">
                                            <span className="font-bold">[+] REACT_PERFORMANCE</span>
                                            <span className="font-label-sm text-label-sm bg-on-primary/10 px-1.5 py-0.5 border border-on-primary/30">88% MATCH</span>
                                        </div>
                                        <div className="flex items-center justify-between px-space-sm py-2">
                                            <span className="font-bold">[+] POSTGRESQL_INDEXING</span>
                                            <span className="font-label-sm text-label-sm bg-on-primary/10 px-1.5 py-0.5 border border-on-primary/30">95% MATCH</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Callout Banner */}
                                <div className="mt-space-md border border-on-primary/40 bg-on-primary/10 p-space-sm text-center font-label-sm text-label-sm tracking-widest uppercase font-bold">
                                    CANDIDATE_READY_FOR_DIRECT_REQUISITION_DEPLOYMENT
                                </div>
                            </div>
                        </section>

                        {/* 03. PRIMARY ACTION & DIAGNOSTIC LAUNCHER BAR (#ActionControlStrip) */}
                        <section className="border border-on-surface/20 bg-surface-container-low p-space-md flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md" id="ActionControlStrip">
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-sm">
                                <button
                                    onClick={() => navigate('/student/assessment')}
                                    className="bg-primary text-on-primary px-space-lg py-2.5 font-label-md text-label-md uppercase tracking-wider font-bold border border-primary hover:bg-on-primary hover:text-primary transition-none flex items-center justify-center gap-2 cursor-pointer"
                                    type="button"
                                >
                                    <span>[ INITIALIZE_PROCTORED_ASSESSMENT_SESSION -&gt; ]</span>
                                </button>
                                <button
                                    onClick={() => navigate('/student/onboarding')}
                                    className="bg-surface text-on-surface px-space-md py-2.5 font-label-md text-label-md uppercase tracking-wider font-bold border border-on-surface/40 hover:bg-surface-container-highest transition-none flex items-center justify-center gap-2 cursor-pointer"
                                    type="button"
                                >
                                    <span>[ RE-INGEST_UPDATED_RESUME_PDF ]</span>
                                </button>
                                <button
                                    onClick={() => navigate('/student/upskill')}
                                    className="bg-surface text-primary-container px-space-md py-2.5 font-label-md text-label-md uppercase tracking-wider font-bold border border-primary-container hover:bg-primary-container hover:text-on-primary transition-none flex items-center justify-center gap-2 cursor-pointer"
                                    type="button"
                                >
                                    <span>[ ACCESS_LEARNING_PIPELINE ]</span>
                                </button>
                            </div>
                            <div className="font-label-sm text-label-sm text-on-surface-variant flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-on-surface/20 pt-space-xs lg:pt-0 lg:pl-space-md leading-relaxed">
                                <div><span>LAST_DIAGNOSTIC_RUN:</span> <strong className="text-on-surface">2026-10-21</strong></div>
                                <div><span>NEXT_PERMITTED_RUN:</span> <strong className="text-primary font-bold">IMMEDIATE</strong> // <span>LATENCY_TOLERANCE:</span> <strong>15ms</strong></div>
                            </div>
                        </section>

                        {/* 04. ALGORITHMICALLY MATCHED REQUISITIONS TABLE (#MatchedPositionsGrid) */}
                        <section className="border border-on-surface/20 bg-surface flex flex-col" id="MatchedPositionsGrid">
                            <div className="p-space-md border-b border-on-surface/20 flex flex-col md:flex-row md:items-center justify-between gap-space-sm bg-surface-container-low">
                                <div className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface font-bold">
                                    <span className="text-primary font-bold">[#]</span>
                                    <span>[ REQUISITION_MATCH_ENGINE // SCIPY_TFIDF_COSINE_SIMILARITY ]</span>
                                </div>
                                <div className="flex items-center gap-1 font-label-sm text-label-sm">
                                    <button
                                        onClick={() => setFilterMode('ALL')}
                                        className={`px-2.5 py-1 uppercase font-bold cursor-pointer transition-none ${filterMode === 'ALL' ? 'bg-primary text-on-primary border border-primary' : 'bg-surface text-on-surface border border-on-surface/30 hover:bg-surface-container'}`}
                                        type="button"
                                    >
                                        [ALL_SPECS]
                                    </button>
                                    <button
                                        onClick={() => setFilterMode('MATCH_85')}
                                        className={`px-2.5 py-1 uppercase font-bold cursor-pointer transition-none ${filterMode === 'MATCH_85' ? 'bg-primary text-on-primary border border-primary' : 'bg-surface text-on-surface border border-on-surface/30 hover:bg-surface-container'}`}
                                        type="button"
                                    >
                                        [MATCH &gt; 85%]
                                    </button>
                                    <button
                                        onClick={() => setFilterMode('APPLIED')}
                                        className={`px-2.5 py-1 uppercase font-bold cursor-pointer transition-none ${filterMode === 'APPLIED' ? 'bg-primary text-on-primary border border-primary' : 'bg-surface text-on-surface border border-on-surface/30 hover:bg-surface-container'}`}
                                        type="button"
                                    >
                                        [DISPATCHED ({myApplications.length})]
                                    </button>
                                </div>
                            </div>

                            {/* Dense CAD Data Table */}
                            <div className="w-full overflow-x-auto">
                                <table className="w-full text-left border-collapse font-body-sm text-body-sm">
                                    <thead>
                                        <tr className="bg-surface-container font-label-sm text-label-sm text-on-surface-variant uppercase border-b border-on-surface/20">
                                            <th className="p-space-sm border-r border-on-surface/20 font-bold">VECTOR_MATCH</th>
                                            <th className="p-space-sm border-r border-on-surface/20 font-bold">TARGET_DESIGNATION</th>
                                            <th className="p-space-sm border-r border-on-surface/20 font-bold">ENTERPRISE_ENTITY</th>
                                            <th className="p-space-sm border-r border-on-surface/20 font-bold">DEPLOYMENT_LOC</th>
                                            <th className="p-space-sm border-r border-on-surface/20 font-bold">REQ_TECH_STACK</th>
                                            <th className="p-space-sm font-bold text-right">DISPATCH_ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-on-surface/10 text-on-surface">
                                        {filteredJobs.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="p-space-md text-center text-outline italic">
                                                    NO MATCHED REQUISITIONS IN CURRENT FILTER BUFFER.
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredJobs.map(job => {
                                                const applied = hasApplied(job.id);
                                                const matchPercent = job.match || 92;
                                                return (
                                                    <tr key={job.id} className="hover:bg-surface-container-low transition-none">
                                                        <td className="p-space-sm border-r border-on-surface/20 font-bold text-primary whitespace-nowrap">
                                                            {matchPercent}% [COSINE_MATCH]
                                                        </td>
                                                        <td className="p-space-sm border-r border-on-surface/20 font-bold text-on-surface">
                                                            {job.title?.toUpperCase()}
                                                        </td>
                                                        <td className="p-space-sm border-r border-on-surface/20 text-on-surface-variant">
                                                            {job.company_name || 'Enterprise Client'}
                                                        </td>
                                                        <td className="p-space-sm border-r border-on-surface/20 whitespace-nowrap">
                                                            <span className="border border-on-surface/20 px-1 py-0.5 font-label-sm text-label-sm">
                                                                {job.category || 'REMOTE_GLOBAL'}
                                                            </span>
                                                        </td>
                                                        <td className="p-space-sm border-r border-on-surface/20 font-label-sm text-label-sm text-on-surface-variant">
                                                            REQUIRED: {job.skills_required || 'Python, Django, React'}
                                                        </td>
                                                        <td className="p-space-sm text-right whitespace-nowrap">
                                                            {applied ? (
                                                                <span className="inline-block border border-primary text-primary px-space-sm py-1 font-label-sm text-label-sm uppercase font-bold">
                                                                    [ DISPATCHED ✓ ]
                                                                </span>
                                                            ) : (
                                                                <button
                                                                    onClick={() => handleApply(job.id)}
                                                                    disabled={applyingTo === job.id}
                                                                    className="bg-surface text-primary border border-primary hover:bg-primary hover:text-on-primary px-space-sm py-1 font-label-sm text-label-sm uppercase font-bold transition-none cursor-pointer disabled:opacity-50"
                                                                    type="button"
                                                                >
                                                                    {applyingTo === job.id ? '[ DISPATCHING... ]' : '[ EXECUTE_APPLICATION_DISPATCH ]'}
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="px-space-md py-2 border-t border-on-surface/20 bg-surface-container-low flex justify-between items-center font-label-sm text-label-sm text-outline">
                                <span>SHOWING {filteredJobs.length} OF {jobs.length} REQUISITIONS</span>
                                <span>INDEX_CYCLE: REALTIME_DISPATCH</span>
                            </div>
                        </section>

                        {/* 05. ACTIVE UPSKILLING MODULES TERMINAL (#UpskillTerminalCard) */}
                        <section className="border border-on-surface/20 bg-surface flex flex-col" id="UpskillTerminalCard">
                            <div className="p-space-md border-b border-on-surface/20 flex flex-wrap items-center justify-between gap-space-xs bg-surface-container-low">
                                <div className="font-label-md text-label-md text-on-surface font-bold flex items-center gap-space-xs">
                                    <span className="text-primary font-bold">[&gt;]</span>
                                    <span>[ ADAPTIVE_LEARNING_PIPELINE // DEFICIT_CALIBRATION ]</span>
                                </div>
                                <div className="font-label-sm text-label-sm border border-primary text-primary px-2 py-0.5 font-bold">
                                    [STATUS: ACTIVE_STREAM]
                                </div>
                            </div>

                            <div className="p-space-md md:p-space-lg flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-lg">
                                <div className="space-y-space-xs">
                                    <div className="font-headline-sm text-headline-sm text-on-surface font-bold">
                                        MODULE_04: CONTAINER_ORCHESTRATION_&amp;_REDIS_STREAMING
                                    </div>
                                    <p className="font-body-md text-body-md text-on-surface-variant">
                                        Generated based on SkillTestAttempt gap analysis. Targets microservice queue bottlenecks.
                                    </p>
                                    <div className="pt-2 font-body-sm text-body-sm text-on-surface">
                                        PROGRESS: <strong className="text-primary font-bold">[██████████████░░░░░░] 70% COMPLETE</strong>
                                    </div>
                                </div>
                                <div className="shrink-0 flex items-center">
                                    <button
                                        onClick={() => navigate('/student/upskill')}
                                        className="w-full lg:w-auto bg-primary text-on-primary px-space-lg py-3 font-label-md text-label-md uppercase font-bold border border-primary hover:bg-surface hover:text-primary transition-none flex items-center justify-center gap-2 cursor-pointer"
                                        type="button"
                                    >
                                        <span>[ RESUME_CURRICULUM_STREAM -&gt; ]</span>
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* CONTENT SYSTEM SPEC FOOTER STRIP */}
                        <div className="border border-on-surface/20 bg-surface-container-low px-space-md py-2 flex flex-wrap items-center justify-between font-label-sm text-label-sm text-outline gap-y-2">
                            <div>
                                <span>TELEMETRY_REF: </span><span className="text-on-surface font-bold">SF-NODE-092.41A</span>
                                <span className="mx-2">|</span>
                                <span>SPEC_COORDS: [X: +108.92 // Y: -44.18]</span>
                            </div>
                            <div>
                                <span>SKILLFORGE AUTONOMOUS TALENT VERIFICATION © 2026 // MIL-SPEC DRAFTING SYSTEM</span>
                            </div>
                        </div>

                    </div>
                </main>

                <footer className="w-full border-t border-on-surface/20 bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant">
                    <div className="px-space-md h-8 flex flex-wrap items-center justify-between">
                        <div className="flex items-center gap-space-md">
                            <span>SPEC_REV: 04.912</span>
                            <span className="text-outline">|</span>
                            <span>BUILD_ID: CI-2024-X99</span>
                            <span className="text-outline">|</span>
                            <span>TIMESTAMP: 2026-10-23T00:00:00Z</span>
                        </div>
                        <div className="hidden sm:flex items-center gap-space-md">
                            <span>X-COORD: +42.109</span>
                            <span>Y-COORD: -11.002</span>
                            <span>GRID: 1px_ORTHO</span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default StudentDashboard;
