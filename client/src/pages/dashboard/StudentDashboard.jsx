import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Briefcase,
    BookOpen,
    Play,
    CheckCircle2,
    ChevronRight,
    FileText,
    ShieldCheck,
    BrainCircuit,
} from 'lucide-react';
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
    const location = useLocation();
    const [profile, setProfile] = useState(null);
    const [recommendation, setRecommendation] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [myApplications, setMyApplications] = useState([]);
    const [upskillModules, setUpskillModules] = useState([]);
    const [completedModuleIds, setCompletedModuleIds] = useState([]);
    const [filterMode, setFilterMode] = useState('ALL');
    const [applyingTo, setApplyingTo] = useState(null);
    const [toastBanner, setToastBanner] = useState(null);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const resolveTabFromHash = (hash) => {
        if (hash === '#jobs') return 'jobs';
        if (hash === '#learning') return 'learning';
        return 'overview';
    };

    const [activeTab, setActiveTab] = useState(() => resolveTabFromHash(location.hash));

    useEffect(() => {
        setActiveTab(resolveTabFromHash(location.hash));
    }, [location.hash]);

    const handleSelectTab = (tab) => {
        setActiveTab(tab);
        const hash = tab === 'overview' ? '' : `#${tab}`;
        if (location.hash !== hash) {
            navigate(`/student/dashboard${hash}`, { replace: true });
        }
    };

    useEffect(() => {
        if (user && user.onboarding_stage < 2) {
            navigate('/student/onboarding');
        }
    }, [user, navigate]);

    useEffect(() => {
        let isMounted = true;
        const loadDashboard = async () => {
            try {
                const res = await api.get('/accounts/profile/');
                if (res.ok && isMounted) {
                    const data = await res.json();
                    setProfile(data);
                }
            } catch (e) {
                console.error('Error fetching profile:', e);
            }

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

            try {
                const res = await api.get('/project/my-applications/');
                if (res.ok && isMounted) {
                    const data = await res.json();
                    setMyApplications(Array.isArray(data) ? data : []);
                }
            } catch (e) {
                console.error('Error fetching applications:', e);
            }

            try {
                const res = await api.get('/project/jobs/');
                if (res.ok && isMounted) {
                    const data = await res.json();
                    setJobs(Array.isArray(data) ? data : []);
                }
            } catch (e) {
                console.error('Error fetching jobs:', e);
            }

            try {
                const [modRes, progRes] = await Promise.all([
                    api.get('/modules/upskill/modules/'),
                    api.get('/modules/upskill/progress/'),
                ]);
                if (modRes.ok && isMounted) {
                    const modData = await modRes.json();
                    setUpskillModules(Array.isArray(modData) ? modData : []);
                }
                if (progRes.ok && isMounted) {
                    const progData = await progRes.json();
                    if (Array.isArray(progData.completed_module_ids)) {
                        setCompletedModuleIds(progData.completed_module_ids);
                    }
                }
            } catch (e) {
                console.error('Error fetching learning modules:', e);
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
                setMyApplications(prev => [...prev, { job: jobId, status: 'pending' }]);
                setToastBanner({ type: 'success', text: 'Application submitted. Your verified profile was sent to the team.' });
            } else {
                const err = await res.json().catch(() => ({}));
                setToastBanner({ type: 'error', text: err.error || 'Could not submit application. Please try again.' });
            }
        } catch (e) {
            console.error('Application failed:', e);
            setToastBanner({ type: 'error', text: 'Network error while submitting application.' });
        } finally {
            setApplyingTo(null);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const candidateName = profile?.full_name || user?.full_name || user?.email?.split('@')[0] || 'Candidate';
    const hasProfile = Boolean(profile?.skills || profile?.resume || profile?.resume_text);
    const hasSkillTest = Boolean(
        (recommendation?.skill_score && Number(recommendation.skill_score) > 0) ||
        (profile?.rating && Number(profile.rating) > 0)
    );
    const hasWorkStyle = Boolean(recommendation?.personality_score && Number(recommendation.personality_score) > 0);
    const hasUpskillOrApplied = completedModuleIds.length > 0 || myApplications.length > 0;

    const journeySteps = [
        { label: 'Profile & Resume', done: hasProfile, icon: FileText, onClick: () => navigate('/student/onboarding') },
        { label: 'Skill Assessment', done: hasSkillTest, icon: ShieldCheck, onClick: () => navigate('/student/assessment') },
        { label: 'Work Style', done: hasWorkStyle, icon: BrainCircuit, onClick: () => navigate('/student/personality-test') },
        { label: 'Learn & Apply', done: hasUpskillOrApplied, icon: Briefcase, onClick: () => navigate('/student/jobs') },
    ];

    return (
        <StudioNoise opacity={0.07}>
            <div className="font-mono text-[#ededed] antialiased min-h-screen flex flex-col">
                {/* Sidebar Navigation */}
                <StudentSidebar
                    sidebarCollapsed={sidebarCollapsed}
                    mobileOpen={mobileMenuOpen}
                    onCloseMobile={() => setMobileMenuOpen(false)}
                />

                {/* Main Content Wrapper */}
                <div className={`transition-all duration-200 flex-1 flex flex-col ${sidebarCollapsed ? 'md:pl-16' : 'md:pl-60'}`}>
                    {/* Header */}
                    <StudentHeader
                        candidateName={candidateName}
                        onLogout={handleLogout}
                        sidebarCollapsed={sidebarCollapsed}
                        setSidebarCollapsed={setSidebarCollapsed}
                        onOpenMobileMenu={() => setMobileMenuOpen(true)}
                    />

                    {/* Main Body */}
                    <main className="w-full pt-24 pb-12 flex-1 px-4 sm:px-6 lg:px-8 font-mono relative z-10">
                        <div className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto">

                            {/* Inline Toast Notice */}
                            {toastBanner && (
                                <div
                                    className={`px-4 py-3 rounded-sm border text-xs flex items-center justify-between gap-3 ${
                                        toastBanner.type === 'success'
                                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                                            : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                                    }`}
                                >
                                    <span>{toastBanner.text}</span>
                                    <button
                                        type="button"
                                        onClick={() => setToastBanner(null)}
                                        className="text-current opacity-70 hover:opacity-100 cursor-pointer"
                                    >
                                        Dismiss
                                    </button>
                                </div>
                            )}

                            {/* Clean Tab Navigation + Primary Action */}
                            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
                                <div className="inline-flex items-center gap-1 p-1 rounded-sm bg-[#0D0F14] border border-white/[0.08] overflow-x-auto max-w-full">
                                    <button
                                        type="button"
                                        onClick={() => handleSelectTab('overview')}
                                        className={`px-3.5 py-1.5 rounded-sm text-xs font-mono transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                                            activeTab === 'overview'
                                                ? 'bg-[#181B22] text-white border border-white/15 font-medium'
                                                : 'text-[#888888] hover:text-white border border-transparent'
                                        }`}
                                    >
                                        <LayoutDashboard className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                                        <span>Overview</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleSelectTab('jobs')}
                                        className={`px-3.5 py-1.5 rounded-sm text-xs font-mono transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                                            activeTab === 'jobs'
                                                ? 'bg-[#181B22] text-white border border-white/15 font-medium'
                                                : 'text-[#888888] hover:text-white border border-transparent'
                                        }`}
                                    >
                                        <Briefcase className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                                        <span>Matched Jobs</span>
                                        <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-white/[0.06] border border-white/[0.08] text-zinc-200 font-mono">
                                            {jobs.length}
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleSelectTab('learning')}
                                        className={`px-3.5 py-1.5 rounded-sm text-xs font-mono transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                                            activeTab === 'learning'
                                                ? 'bg-[#181B22] text-white border border-white/15 font-medium'
                                                : 'text-[#888888] hover:text-white border border-transparent'
                                        }`}
                                    >
                                        <BookOpen className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                                        <span>Learning Paths</span>
                                        {upskillModules.length > 0 && (
                                            <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-white/[0.06] border border-white/[0.08] text-zinc-200 font-mono">
                                                {upskillModules.length}
                                            </span>
                                        )}
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => navigate('/student/assessment')}
                                    className="px-4 py-2 bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold rounded-sm text-xs font-mono transition-colors cursor-pointer inline-flex items-center gap-1.5"
                                >
                                    <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                                    <span>Start Assessment</span>
                                </button>
                            </div>

                            {/* TAB 1: OVERVIEW */}
                            {activeTab === 'overview' && (
                                <div className="space-y-6">
                                    {/* Visual 4-Step Verification Path */}
                                    <div className="rounded-md bg-[#0D0F14] border border-white/[0.08] border-t-white/15 p-4 sm:p-5">
                                        <div className="flex items-center justify-between mb-3 text-xs">
                                            <span className="font-semibold text-white uppercase tracking-wider text-[11px]">
                                                Your Verification Journey
                                            </span>
                                            <span className="text-[11px] text-[#71717A]">
                                                Click any step to update
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                                            {journeySteps.map((step, i) => {
                                                const StepIcon = step.icon;
                                                return (
                                                    <button
                                                        key={step.label}
                                                        type="button"
                                                        onClick={step.onClick}
                                                        className={`p-3 rounded-sm border text-left transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                                                            step.done
                                                                ? 'bg-[#060709] border-white/[0.08] hover:border-white/20'
                                                                : 'bg-[#111318] border-white/15 hover:border-white/30'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-2.5 min-w-0">
                                                            <div
                                                                className={`w-7 h-7 rounded-sm flex items-center justify-center shrink-0 border ${
                                                                    step.done
                                                                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                                                        : 'bg-white/[0.04] border-white/15 text-zinc-300'
                                                                }`}
                                                            >
                                                                {step.done ? (
                                                                    <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                                                                ) : (
                                                                    <StepIcon className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                                                                )}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <div className="text-[10px] text-[#71717A] uppercase">
                                                                    Step {i + 1}
                                                                </div>
                                                                <div className="text-xs font-medium text-white truncate">
                                                                    {step.label}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <ChevronRight className="w-3.5 h-3.5 text-[#71717A] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Visual Quick-Action Cards */}
                                    <ActionControlStrip
                                        onStartAssessment={() => navigate('/student/assessment')}
                                        onAccessLearning={() => navigate('/student/upskill')}
                                        onViewJobs={() => navigate('/student/jobs')}
                                        onOpenPersonality={() => navigate('/student/personality-test')}
                                        jobsCount={jobs.length}
                                        modulesCount={upskillModules.length}
                                    />

                                    {/* Visual Profile Gauge + Skill Snapshot */}
                                    <VerificationProfileBlock
                                        profile={profile}
                                        recommendation={recommendation}
                                        candidateName={candidateName}
                                    />
                                </div>
                            )}

                            {/* TAB 2: JOB MATCHES */}
                            {activeTab === 'jobs' && (
                                <MatchedPositionsGrid
                                    jobs={jobs}
                                    myApplications={myApplications}
                                    filterMode={filterMode}
                                    setFilterMode={setFilterMode}
                                    onApply={handleApply}
                                    applyingTo={applyingTo}
                                    assessmentCompleted={hasSkillTest}
                                />
                            )}

                            {/* TAB 3: LEARNING & CURRICULUM */}
                            {activeTab === 'learning' && (
                                <UpskillTerminalCard
                                    modules={upskillModules}
                                    completedModuleIds={completedModuleIds}
                                    recommendedTopics={recommendation?.weaknesses || []}
                                    onOpenModule={(id) => navigate(`/student/upskill?id=${id}`)}
                                    onCreateTopic={(topic) => navigate(`/student/upskill?topic=${encodeURIComponent(topic)}`)}
                                    onResumeCurriculum={() => navigate('/student/upskill')}
                                />
                            )}

                        </div>
                    </main>

                    {/* Simplified Footer */}
                    <footer className="w-full border-t border-white/[0.06] bg-[#060709] text-xs text-[#71717A] font-mono py-4 relative z-10">
                        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
                            <div>SkillForge Candidate Hub &copy; {new Date().getFullYear()}</div>
                            <div className="text-[11px] text-[#71717A]">
                                Empirical Skill Verification
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </StudioNoise>
    );
};

export default StudentDashboard;
