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
        <div className="bg-[#050505] font-mono text-[#ededed] antialiased min-h-screen">
            {/* Sidebar Navigation */}
            <StudentSidebar sidebarCollapsed={sidebarCollapsed} />

            {/* Main Content Wrapper */}
            <div className={`transition-all duration-200 ${sidebarCollapsed ? 'md:pl-16' : 'md:pl-60'}`}>
                {/* Header */}
                <StudentHeader 
                    candidateName={candidateName}
                    onLogout={handleLogout}
                    sidebarCollapsed={sidebarCollapsed}
                    setSidebarCollapsed={setSidebarCollapsed}
                />

                {/* Main Body */}
                <main className="w-full pt-20 sm:pt-24 min-h-[calc(100vh-2rem)] bg-[#050505] px-4 sm:px-6 lg:px-8 py-6 sm:py-8 font-mono">
                    <div className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto">

                        {/* Top Multi-Tab Navigation Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setActiveTab('overview')}
                                    className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                                        activeTab === 'overview'
                                            ? 'bg-[#111113] text-white border border-white/20 shadow-sm'
                                            : 'text-[#737373] hover:text-white hover:border-white/10 border border-transparent'
                                    }`}
                                >
                                    <span>[01: Overview]</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('jobs')}
                                    className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                                        activeTab === 'jobs'
                                            ? 'bg-[#111113] text-white border border-white/20 shadow-sm'
                                            : 'text-[#737373] hover:text-white hover:border-white/10 border border-transparent'
                                    }`}
                                >
                                    <span>[02: Matched Requisitions]</span>
                                    <span className="text-[10px] px-1.5 py-0.2 rounded-sm bg-[#050505] border border-white/10 text-[#888888] font-mono ml-0.5">
                                        {jobs.length}
                                    </span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('learning')}
                                    className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                                        activeTab === 'learning'
                                            ? 'bg-[#111113] text-white border border-white/20 shadow-sm'
                                            : 'text-[#737373] hover:text-white hover:border-white/10 border border-transparent'
                                    }`}
                                >
                                    <span>[03: Learning Curriculum]</span>
                                </button>
                            </div>

                            <button
                                onClick={() => navigate('/student/assessment')}
                                className="px-3.5 py-1.5 bg-[#111113] hover:bg-[#1a1a1d] text-white border border-white/20 rounded-md text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5"
                            >
                                <span>[ + Start Assessment ↗ ]</span>
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
                                    <div className="bg-[#0b0b0c] rounded-md border border-white/10 p-5 space-y-2">
                                        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                                            <h4 className="font-semibold text-white text-xs uppercase tracking-wider">[ Matched Requisitions ]</h4>
                                            <button 
                                                onClick={() => setActiveTab('jobs')}
                                                className="text-xs font-mono text-[#888888] hover:text-white cursor-pointer"
                                            >
                                                view all ({jobs.length}) &rarr;
                                            </button>
                                        </div>
                                        <p className="text-xs text-[#737373] leading-relaxed">
                                            {jobs.length} open roles currently aligned with your verified competence profile.
                                        </p>
                                    </div>

                                    <div className="bg-[#0b0b0c] rounded-md border border-white/10 p-5 space-y-2">
                                        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                                            <h4 className="font-semibold text-white text-xs uppercase tracking-wider">[ Engineering Archetype ]</h4>
                                            <button 
                                                onClick={() => navigate('/student/personality-test')}
                                                className="text-xs font-mono text-[#888888] hover:text-white cursor-pointer"
                                            >
                                                profile insights &rarr;
                                            </button>
                                        </div>
                                        <p className="text-xs text-[#737373] leading-relaxed">
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
                <footer className="w-full border-t border-white/[0.06] bg-[#050505] text-xs text-[#555555] font-mono py-4">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
                        <div>SkillForge Candidate Hub &copy; {new Date().getFullYear()}</div>
                        <div className="text-[11px] text-[#737373]">
                            [verification enclave: active]
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default StudentDashboard;
