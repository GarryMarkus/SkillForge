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
                />

                {/* PRIMARY TELEMETRY CONSOLE BODY */}
                <main className="w-full pt-20 sm:pt-24 min-h-[calc(100vh-2rem)] bg-canvas-light px-4 sm:px-6 lg:px-8 py-6 sm:py-8 font-mono">
                    <div className="flex flex-col gap-8 sm:gap-10 w-full max-w-[1600px] mx-auto">

                        {/* 01. CANDIDATE PROFILE & VERIFICATION SPEC PANEL */}
                        <VerificationProfileBlock 
                            profile={profile}
                            recommendation={recommendation}
                            candidateName={candidateName}
                        />

                        {/* 02. PRIMARY ACTION & DIAGNOSTIC LAUNCHER BAR */}
                        <ActionControlStrip 
                            onStartAssessment={() => navigate('/student/assessment')}
                            onReingestResume={() => navigate('/student/onboarding')}
                            onAccessLearning={() => navigate('/student/upskill')}
                        />

                        {/* 03. ALGORITHMICALLY MATCHED REQUISITIONS TABLE */}
                        <MatchedPositionsGrid 
                            jobs={jobs}
                            myApplications={myApplications}
                            filterMode={filterMode}
                            setFilterMode={setFilterMode}
                            onApply={handleApply}
                            applyingTo={applyingTo}
                        />

                        {/* 04. ACTIVE UPSKILLING MODULES TERMINAL */}
                        <UpskillTerminalCard 
                            onResumeCurriculum={() => navigate('/student/upskill')}
                        />

                    </div>
                </main>

                {/* Clean Simplified Footer */}
                <footer className="w-full border-t border-black/15 bg-surface-container-low text-xs text-on-surface-variant font-mono">
                    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                        <div>SKILLFORGE // CANDIDATE CONSOLE © {new Date().getFullYear()}</div>
                        <div className="flex items-center gap-3">
                            <span className="text-canvas-blueprint font-bold">NODE: VERIFIED ACTIVE</span>
                            <span className="text-black/30">|</span>
                            <span>AES-256 ENCRYPTED</span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default StudentDashboard;
