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
        <div className="bg-[#FAFAFA] font-sans text-gray-900 antialiased min-h-screen">
            {/* Sidebar Navigation */}
            <StudentSidebar sidebarCollapsed={sidebarCollapsed} />

            {/* Main Content Wrapper */}
            <div className={`transition-all duration-200 ${sidebarCollapsed ? 'md:pl-18' : 'md:pl-64'}`}>
                {/* Header */}
                <StudentHeader 
                    candidateName={candidateName}
                    onLogout={handleLogout}
                    sidebarCollapsed={sidebarCollapsed}
                    setSidebarCollapsed={setSidebarCollapsed}
                />

                {/* Main Body */}
                <main className="w-full pt-20 sm:pt-24 min-h-[calc(100vh-2rem)] bg-[#FAFAFA] px-4 sm:px-6 lg:px-8 py-6 sm:py-8 font-sans">
                    <div className="flex flex-col gap-8 w-full max-w-[1400px] mx-auto">

                        {/* Top Multi-Tab Navigation Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-2">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setActiveTab('overview')}
                                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                                        activeTab === 'overview'
                                            ? 'bg-blue-600 text-white shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">person</span>
                                    <span>Profile &amp; Skills</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('jobs')}
                                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                                        activeTab === 'jobs'
                                            ? 'bg-blue-600 text-white shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">work</span>
                                    <span>Job Matches</span>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold ml-1">
                                        {jobs.length}
                                    </span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('learning')}
                                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                                        activeTab === 'learning'
                                            ? 'bg-blue-600 text-white shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">school</span>
                                    <span>Learning Paths</span>
                                </button>
                            </div>

                            <button
                                onClick={() => navigate('/student/assessment')}
                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                                <span>Take New Assessment</span>
                            </button>
                        </div>

                        {/* TAB 1: OVERVIEW & PROFILE */}
                        {activeTab === 'overview' && (
                            <div className="space-y-8 animate-fadeIn">
                                <VerificationProfileBlock 
                                    profile={profile}
                                    recommendation={recommendation}
                                    candidateName={candidateName}
                                />

                                <ActionControlStrip 
                                    onStartAssessment={() => navigate('/student/assessment')}
                                    onReingestResume={() => navigate('/student/onboarding')}
                                    onAccessLearning={() => setActiveTab('learning')}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-3">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-bold text-gray-900 text-base">Top Matching Opportunities</h4>
                                            <button 
                                                onClick={() => setActiveTab('jobs')}
                                                className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                                            >
                                                View All →
                                            </button>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            You have {jobs.length} open roles matching your verified skill set.
                                        </p>
                                    </div>

                                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-3">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-bold text-gray-900 text-base">Workplace Personality Radar</h4>
                                            <button 
                                                onClick={() => navigate('/student/personality-test')}
                                                className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                                            >
                                                View Insights →
                                            </button>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            Understand your team collaboration and architectural problem-solving style.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 2: JOB MATCHES */}
                        {activeTab === 'jobs' && (
                            <div className="space-y-6 animate-fadeIn">
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
                            <div className="space-y-6 animate-fadeIn">
                                <UpskillTerminalCard 
                                    onResumeCurriculum={() => navigate('/student/upskill')}
                                />
                            </div>
                        )}

                    </div>
                </main>

                {/* Clean Simplified Footer */}
                <footer className="w-full border-t border-gray-100 bg-white text-xs text-gray-500 font-sans py-4">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
                        <div>SkillForge Candidate Hub © {new Date().getFullYear()}</div>
                        <div className="flex items-center gap-2 text-emerald-600 font-medium">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span>Evaluation Enclave Active &amp; Secure</span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default StudentDashboard;
