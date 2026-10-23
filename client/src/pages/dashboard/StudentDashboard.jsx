import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import api from '../../api/client';
import StudentSidebar from '../../components/student/StudentSidebar';
import StudentHeader from '../../components/student/StudentHeader';
import VerificationProfileBlock from '../../components/student/VerificationProfileBlock';
import ActionControlStrip from '../../components/student/ActionControlStrip';
import MatchedPositionsGrid from '../../components/student/MatchedPositionsGrid';
import UpskillTerminalCard from '../../components/student/UpskillTerminalCard';

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

    const candidateName = profile?.full_name || user?.full_name || user?.email?.split('@')[0] || 'ENGINEER_01';
    const verifiedBadge = recommendation?.stage === 'verified' ? 'EMITTED' : 'PENDING';

    return (
        <div className="bg-canvas-light font-mono text-ink-primary antialiased select-none min-h-screen">
            {/* LATERAL CAD NAVIGATION ASIDE */}
            <StudentSidebar sidebarCollapsed={sidebarCollapsed} />

            {/* MAIN CONTENT WRAPPER */}
            <div className={`transition-all duration-200 ${sidebarCollapsed ? 'md:pl-16' : 'md:pl-64'}`}>
                {/* APPLICATION HEADER (#AppHeader) */}
                <StudentHeader 
                    candidateName={candidateName}
                    onLogout={handleLogout}
                    sidebarCollapsed={sidebarCollapsed}
                    setSidebarCollapsed={setSidebarCollapsed}
                    verifiedBadge={verifiedBadge}
                />

                {/* PRIMARY TELEMETRY CONSOLE BODY */}
                <main className="w-full pt-28 min-h-[calc(100vh-2rem)] bg-canvas-light px-space-md py-space-md font-mono">
                    <div className="flex flex-col gap-space-lg w-full max-w-[1600px] mx-auto">

                        {/* SUB-NAV / CAD METADATA BAR (Secondary System Strip) */}
                        <div className="border border-cad bg-surface-container-low px-space-md py-2 flex flex-wrap items-center justify-between font-label-sm text-label-sm text-ink-primary gap-y-2">
                            <div className="flex flex-wrap items-center gap-x-space-md gap-y-1">
                                <span className="flex items-center gap-1">
                                    <span className="inline-block w-2 h-2 bg-canvas-blueprint"></span>
                                    TOKEN: <strong className="text-canvas-blueprint font-bold">SF-88219-X</strong>
                                </span>
                                <span className="text-outline">|</span>
                                <span>TRUST_INDEX: <strong className="text-ink-primary font-bold">98.4%</strong></span>
                                <span className="text-outline">|</span>
                                <span>VERIFIED_BADGE: <strong className="text-canvas-blueprint font-bold">{verifiedBadge}</strong></span>
                                <span className="text-outline">|</span>
                                <span>ENCRYPT: <strong className="text-ink-primary font-bold">HARDENED_BLAKE3</strong></span>
                            </div>
                            <div className="flex items-center gap-space-md text-on-surface-variant font-label-sm">
                                <span>SESSION_ELAPSED: 01:14:22</span>
                                <span className="text-outline">|</span>
                                <span className="text-canvas-blueprint font-bold">NODE_VERIFIED: ACTIVE</span>
                            </div>
                        </div>

                        {/* 02. CANDIDATE PROFILE & VERIFICATION SPEC PANEL */}
                        <VerificationProfileBlock 
                            profile={profile}
                            recommendation={recommendation}
                            candidateName={candidateName}
                        />

                        {/* 03. PRIMARY ACTION & DIAGNOSTIC LAUNCHER BAR */}
                        <ActionControlStrip 
                            onStartAssessment={() => navigate('/student/assessment')}
                            onReingestResume={() => navigate('/student/onboarding')}
                            onAccessLearning={() => navigate('/student/upskill')}
                        />

                        {/* 04. ALGORITHMICALLY MATCHED REQUISITIONS TABLE */}
                        <MatchedPositionsGrid 
                            jobs={jobs}
                            myApplications={myApplications}
                            filterMode={filterMode}
                            setFilterMode={setFilterMode}
                            onApply={handleApply}
                            applyingTo={applyingTo}
                        />

                        {/* 05. ACTIVE UPSKILLING MODULES TERMINAL */}
                        <UpskillTerminalCard 
                            onResumeCurriculum={() => navigate('/student/upskill')}
                        />

                        {/* CONTENT SYSTEM SPEC FOOTER STRIP */}
                        <div className="border border-cad bg-surface-container-low px-space-md py-2 flex flex-wrap items-center justify-between font-label-sm text-label-sm text-outline gap-y-2">
                            <div>
                                <span>TELEMETRY_REF: </span><span className="text-ink-primary font-bold">SF-NODE-092.41A</span>
                                <span className="mx-2">|</span>
                                <span>SPEC_COORDS: [X: +108.92 // Y: -44.18]</span>
                            </div>
                            <div>
                                <span>SKILLFORGE AUTONOMOUS TALENT VERIFICATION © 2026 // MIL-SPEC DRAFTING SYSTEM</span>
                            </div>
                        </div>

                    </div>
                </main>

                <footer className="w-full border-t border-cad bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant">
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
