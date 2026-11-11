import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import api from '../../api/client';
import StudioNoise from '../../components/ui/animations/StudioNoise';
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
    const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'jobs', 'learning'

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
                                strengths: recData.strengths || ['System Architecture', 'Database Optimization'],
                                weaknesses: recData.weaknesses || ['In-Memory Caching'],
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
                alert('Application submitted successfully! Your verified profile has been forwarded to the employer.');
                setMyApplications(prev => [...prev, { job: jobId, status: 'pending' }]);
            } else {
                const err = await res.json().catch(() => ({}));
                alert(err.error || 'Failed to submit application. Please try again.');
            }
        } catch (e) {
            console.error('Application failed:', e);
            alert('A network error occurred. Please check your connection and try again.');
        } finally {
            setApplyingTo(null);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const candidateName = profile?.full_name || user?.full_name || user?.email?.split('@')[0] || 'Candidate';

    return (
        <StudioNoise opacity={0.07}>
            <div className="font-mono text-[#ededed] antialiased min-h-screen flex flex-col">
                {/* Sidebar Navigation */}
                <StudentSidebar sidebarCollapsed={sidebarCollapsed} />

                {/* Main Content Wrapper */}
                <div className={`transition-all duration-200 flex-1 flex flex-col ${sidebarCollapsed ? 'md:pl-16' : 'md:pl-60'}`}>
                    {/* Header */}
                    <StudentHeader 
                        candidateName={candidateName}
                        onLogout={handleLogout}
                        sidebarCollapsed={sidebarCollapsed}
                        setSidebarCollapsed={setSidebarCollapsed}
                    />

                    {/* Main Body */}
                    <main className="w-full pt-20 sm:pt-24 flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 font-mono relative z-10">
                        <div className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto">

                            {/* Top Multi-Tab Navigation Bar */}
                            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
                                <div className="inline-flex items-center gap-1.5 p-1 rounded-sm bg-[#0D0F14] border border-white/[0.08]">
                                    <button
                                        onClick={() => setActiveTab('overview')}
                                        className={`px-3.5 py-1.5 rounded-sm text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 ${
                                            activeTab === 'overview'
                                                ? 'bg-[#181B22] text-white border border-white/15 font-medium'
                                                : 'text-[#888888] hover:text-white border border-transparent'
                                        }`}
                                    >
                                        <span>Overview</span>
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('jobs')}
                                        className={`px-3.5 py-1.5 rounded-sm text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 ${
                                            activeTab === 'jobs'
                                                ? 'bg-[#181B22] text-white border border-white/15 font-medium'
                                                : 'text-[#888888] hover:text-white border border-transparent'
                                        }`}
                                    >
                                        <span>Matched Requisitions</span>
                                        <span className="text-[10px] px-1.5 py-0.2 rounded-sm bg-white/[0.04] border border-white/[0.08] text-zinc-300 font-mono ml-0.5">
                                            {jobs.length}
                                        </span>
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('learning')}
                                        className={`px-3.5 py-1.5 rounded-sm text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 ${
                                            activeTab === 'learning'
                                                ? 'bg-[#181B22] text-white border border-white/15 font-medium'
                                                : 'text-[#888888] hover:text-white border border-transparent'
                                        }`}
                                    >
                                        <span>Learning Curriculum</span>
                                    </button>
                                </div>

                                <button
                                    onClick={() => navigate('/student/assessment')}
                                    className="px-4 py-2 bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold rounded-sm text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5"
                                >
                                    <span>Start Assessment</span>
                                    <span aria-hidden="true">↗</span>
                                </button>
                            </div>

                            {/* TAB 1: OVERVIEW & PROFILE */}
                            {activeTab === 'overview' && (
                                <div className="space-y-6">
                                    <VerificationProfileBlock 
                                        profile={profile}
                                        recommendation={recommendation}
                                        candidateName={candidateName}
                                        onViewFullMetrics={() => navigate('/student/assessment')}
                                    />

                                    <ActionControlStrip 
                                        onStartAssessment={() => navigate('/student/assessment')}
                                        onReingestResume={() => navigate('/student/onboarding')}
                                        onAccessLearning={() => setActiveTab('learning')}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-[#0D0F14] rounded-md border border-white/[0.08] border-t-white/15 p-5 space-y-2 hover:border-white/20 transition-colors">
                                            <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
                                                <h4 className="font-semibold text-white text-xs uppercase tracking-wider">Matched Requisitions</h4>
                                                <button 
                                                    onClick={() => setActiveTab('jobs')}
                                                    className="text-xs font-mono text-[#888888] hover:text-white hover:underline underline-offset-4 cursor-pointer"
                                                >
                                                    View all ({jobs.length}) &rarr;
                                                </button>
                                            </div>
                                            <p className="text-xs text-[#888888] leading-relaxed pt-1">
                                                {jobs.length} open roles currently aligned with your verified competence profile.
                                            </p>
                                        </div>

                                        <div className="bg-[#0D0F14] rounded-md border border-white/[0.08] border-t-white/15 p-5 space-y-2 hover:border-white/20 transition-colors">
                                            <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
                                                <h4 className="font-semibold text-white text-xs uppercase tracking-wider">Engineering Archetype</h4>
                                                <button 
                                                    onClick={() => navigate('/student/personality-test')}
                                                    className="text-xs font-mono text-[#888888] hover:text-white hover:underline underline-offset-4 cursor-pointer"
                                                >
                                                    Profile insights &rarr;
                                                </button>
                                            </div>
                                            <p className="text-xs text-[#888888] leading-relaxed pt-1">
                                                Algorithmic analysis of systems thinking, code review style, and collaboration heuristics.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TAB 2: JOB MATCHES */}
                            {activeTab === 'jobs' && (
                                <div className="space-y-6">
                                    <MatchedPositionsGrid 
                                        jobs={jobs}
                                        myApplications={myApplications}
                                        filterMode={filterMode}
                                        setFilterMode={setFilterMode}
                                        onApply={handleApply}
                                        applyingTo={applyingTo}
                                    />
                                </div>
                            )}

                            {/* TAB 3: LEARNING & UPSKILLING */}
                            {activeTab === 'learning' && (
                                <div className="space-y-6">
                                    <UpskillTerminalCard 
                                        onResumeCurriculum={() => navigate('/student/upskill')}
                                    />
                                </div>
                            )}

                        </div>
                    </main>

                    {/* Clean Simplified Footer */}
                    <footer className="w-full border-t border-white/[0.06] bg-[#060709] text-xs text-[#71717A] font-mono py-4 relative z-10">
                        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
                            <div>SkillForge Candidate Hub &copy; {new Date().getFullYear()}</div>
                            <div className="text-[11px] text-[#71717A]">
                                Verification Protocol Active
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </StudioNoise>
    );
};

export default StudentDashboard;
