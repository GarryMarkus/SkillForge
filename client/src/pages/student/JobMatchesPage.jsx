import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Briefcase,
    ShieldCheck,
    AlertTriangle,
    Search,
    SlidersHorizontal,
    DollarSign,
    Users,
    CheckCircle2,
    Lock,
    Award,
    ArrowUpRight,
    BookOpen,
    ScanSearch,
    FileText,
    Github,
    Sparkles,
    RefreshCw,
} from '../../components/ui/Icons';
import { useAuthStore } from '../../store/authStore';
import api from '../../api/client';
import StudioNoise from '../../components/ui/animations/StudioNoise';
import StudentSidebar from '../../components/student/StudentSidebar';
import StudentHeader from '../../components/student/StudentHeader';

const SAMPLE_PREVIEW_ROLES = [
    {
        id: 'preview-1',
        isPreview: true,
        title: 'Full-Stack Software Engineer',
        company_name: 'Sample Tech Partner',
        category: 'Web Development',
        budget_type: 'fixed',
        budget_amount: 5500,
        min_skill_score: 75,
        required_skills: ['Python', 'React', 'Django', 'PostgreSQL'],
        description: 'Build production APIs and reactive frontend interfaces for verified enterprise teams.',
    },
    {
        id: 'preview-2',
        isPreview: true,
        title: 'Backend API & Cloud Engineer',
        company_name: 'Sample Cloud Systems',
        category: 'Backend Systems',
        budget_type: 'hourly',
        budget_amount: 70,
        min_skill_score: 80,
        required_skills: ['Python', 'FastAPI', 'Docker', 'Redis'],
        description: 'Design resilient microservices, async queues, and database indexing strategies.',
    },
    {
        id: 'preview-3',
        isPreview: true,
        title: 'Frontend React Architect',
        company_name: 'Sample Product Studio',
        category: 'Web Development',
        budget_type: 'fixed',
        budget_amount: 4500,
        min_skill_score: 70,
        required_skills: ['React', 'JavaScript', 'TailwindCSS', 'Vite'],
        description: 'Craft high-speed accessible UI systems with clean client state and telemetry views.',
    },
];

const JobMatchesPage = () => {
    const { logout, user } = useAuthStore();
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [myApplications, setMyApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterMode, setFilterMode] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [applyingTo, setApplyingTo] = useState(null);
    const [toastBanner, setToastBanner] = useState(null);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (user && user.onboarding_stage < 2) {
            navigate('/student/onboarding');
        }
    }, [user, navigate]);

    const loadJobMatchesData = useCallback(async () => {
        setLoading(true);
        try {
            const [profRes, analRes, jobsRes, appsRes] = await Promise.allSettled([
                api.get('/accounts/profile/'),
                api.get('/verification/analysis/'),
                api.get('/project/jobs/'),
                api.get('/project/my-applications/'),
            ]);

            if (profRes.status === 'fulfilled' && profRes.value.ok) {
                setProfile(await profRes.value.json());
            }
            if (analRes.status === 'fulfilled' && analRes.value.ok) {
                setAnalysis(await analRes.value.json());
            }
            if (jobsRes.status === 'fulfilled' && jobsRes.value.ok) {
                const jobsData = await jobsRes.value.json();
                setJobs(Array.isArray(jobsData) ? jobsData : []);
            }
            if (appsRes.status === 'fulfilled' && appsRes.value.ok) {
                const appsData = await appsRes.value.json();
                setMyApplications(Array.isArray(appsData) ? appsData : []);
            }
        } catch (err) {
            console.error('Failed loading job matches:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadJobMatchesData();
    }, [loadJobMatchesData]);

    const handleApply = async (jobId) => {
        setApplyingTo(jobId);
        try {
            const res = await api.post('/project/apply/', { job_id: jobId });
            if (res.ok) {
                setMyApplications((prev) => [...prev, { job: jobId, status: 'pending' }]);
                setJobs((prev) =>
                    prev.map((j) =>
                        j.id === jobId
                            ? { ...j, already_applied: true, applicant_count: (j.applicant_count || 0) + 1 }
                            : j
                    )
                );
                setToastBanner({
                    type: 'success',
                    text: 'Application submitted. Your verified profile and AI report were shared with the recruiter.',
                });
            } else {
                const err = await res.json().catch(() => ({}));
                setToastBanner({
                    type: 'error',
                    text: err.error || 'Could not submit application right now.',
                });
            }
        } catch (err) {
            console.error('Application error:', err);
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

    // Determine assessment completion truthfully from backend analysis or job payload
    const skillScore = Number(
        analysis?.skill_test_score ?? jobs[0]?.student_skill_score ?? 0
    );
    const assessmentCompleted = Boolean(
        analysis?.assessment_completed ?? jobs[0]?.assessment_completed ?? skillScore > 0
    );

    const hasResume = Boolean(
        analysis?.profile_inputs?.has_resume_file ||
        analysis?.resume_source?.status === 'analyzed_pdf' ||
        profile?.resume
    );
    const hasGithub = Boolean(
        analysis?.github_source?.has_github ||
        profile?.github_url
    );

    // Derive candidate skill tokens for fallback preview cards if DB has 0 open jobs
    const candidateSkillTokens = new Set(
        [
            ...(analysis?.profile_inputs?.skills || []),
            ...(analysis?.resume_source?.matched_skills || []),
            ...(analysis?.github_source?.matched_skills || []),
            ...((profile?.skills || '').split(',').map((s) => s.trim()).filter(Boolean)),
        ].map((s) => s.toLowerCase())
    );

    const isSampleFallback = !loading && jobs.length === 0;
    const displaySourceJobs = isSampleFallback
        ? SAMPLE_PREVIEW_ROLES.map((sample) => {
              const matched = sample.required_skills.filter((s) =>
                  candidateSkillTokens.has(s.toLowerCase())
              );
              const missing = sample.required_skills.filter(
                  (s) => !candidateSkillTokens.has(s.toLowerCase())
              );
              const overlap = matched.length / sample.required_skills.length;
              return {
                  ...sample,
                  matched_skills: matched,
                  missing_skills: missing,
                  match: Math.round((overlap > 0 ? 45 + overlap * 50 : 35)),
                  eligible_to_apply: false,
                  applicant_count: 0,
              };
          })
        : jobs;

    const hasApplied = (job) =>
        Boolean(job.already_applied) ||
        myApplications.some((app) => app.job === job.id || app.job_id === job.id);

    const getAppStatus = (jobId) => {
        const found = myApplications.find((app) => app.job === jobId || app.job_id === jobId);
        return found?.status;
    };

    const filteredJobs = displaySourceJobs.filter((job) => {
        const matchScore = typeof job.match === 'number' ? Math.round(job.match) : 0;
        const applied = hasApplied(job);

        if (filterMode === 'ELIGIBLE' && !job.eligible_to_apply) return false;
        if (filterMode === 'MATCH_80' && matchScore < 80) return false;
        if (filterMode === 'APPLIED' && !applied) return false;

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            const haystack = `${job.title || ''} ${job.company_name || ''} ${job.skills_required || ''} ${(job.required_skills || []).join(' ')}`.toLowerCase();
            if (!haystack.includes(q)) return false;
        }
        return true;
    });

    const eligibleCount = displaySourceJobs.filter((j) => j.eligible_to_apply).length;

    return (
        <StudioNoise opacity={0.07}>
            <div className="font-mono text-[#ededed] antialiased min-h-screen flex flex-col">
                <StudentSidebar
                    sidebarCollapsed={sidebarCollapsed}
                    mobileOpen={mobileMenuOpen}
                    onCloseMobile={() => setMobileMenuOpen(false)}
                />

                <div className={`transition-all duration-200 flex-1 flex flex-col ${sidebarCollapsed ? 'md:pl-16' : 'md:pl-60'}`}>
                    <StudentHeader
                        candidateName={candidateName}
                        onLogout={handleLogout}
                        sidebarCollapsed={sidebarCollapsed}
                        setSidebarCollapsed={setSidebarCollapsed}
                        onOpenMobileMenu={() => setMobileMenuOpen(true)}
                    />

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
                                        className="text-current opacity-75 hover:opacity-100 cursor-pointer"
                                    >
                                        Dismiss
                                    </button>
                                </div>
                            )}

                            {/* Top Page Header Card */}
                            <section className="rounded-md bg-[#0D0F14] border border-white/[0.08] border-t-white/15 p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                <div className="flex items-start gap-3.5">
                                    <div className="w-10 h-10 rounded-sm bg-[#111318] border border-white/15 flex items-center justify-center text-white shrink-0">
                                        <Briefcase className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
                                    </div>
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2.5">
                                            <h1 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
                                                Job Matches
                                            </h1>
                                            {!loading && (
                                                assessmentCompleted ? (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px]">
                                                        <ShieldCheck className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                                                        <span>Verified Score: {Math.round(skillScore)}%</span>
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px]">
                                                        <AlertTriangle className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                                                        <span>Assessment Pending · Preview Mode</span>
                                                    </span>
                                                )
                                            )}
                                        </div>
                                        <p className="text-xs text-[#888888] mt-1">
                                            Roles ranked by resume keywords, GitHub code signals, and verified assessment eligibility.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-2.5">
                                    <button
                                        type="button"
                                        onClick={() => navigate('/student/analysis')}
                                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-[#121316] border border-white/10 hover:border-white/25 text-xs text-[#E4E4E7] hover:text-white transition-colors cursor-pointer"
                                    >
                                        <ScanSearch className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                                        <span>View AI Analysis</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => navigate('/student/assessment')}
                                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold text-xs transition-colors cursor-pointer"
                                    >
                                        <ShieldCheck className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                                        <span>{assessmentCompleted ? 'Retake Assessment' : 'Take Skill Assessment'}</span>
                                        <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                                    </button>
                                </div>
                            </section>

                            {/* Assessment Not Completed Fallback Banner */}
                            {!loading && !assessmentCompleted && (
                                <section className="rounded-md bg-[#111318] border border-amber-500/30 p-5 sm:p-6 space-y-4">
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-9 h-9 rounded-sm bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300 shrink-0 mt-0.5">
                                                <Lock className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                                            </div>
                                            <div className="space-y-1">
                                                <h2 className="font-display font-bold text-sm sm:text-base text-white">
                                                    Estimated Preview Matches — Complete Assessment to Unlock Full Eligibility
                                                </h2>
                                                <p className="text-xs text-[#A1A1AA] leading-relaxed max-w-3xl">
                                                    You have not completed a verified Skill Assessment yet. Below are estimated job matches computed from your Resume, GitHub profile, and listed skills. Complete the proctored assessment to earn a verified score and unlock 1-click applications for score-gated roles.
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => navigate('/student/assessment')}
                                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold text-xs transition-colors cursor-pointer shrink-0 self-start"
                                        >
                                            <span>Start Assessment Now</span>
                                            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Transparent Input Checklist */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/[0.06]">
                                        <button
                                            type="button"
                                            onClick={() => navigate('/student/onboarding')}
                                            className="p-3 rounded-sm bg-[#060709] border border-white/[0.08] hover:border-white/20 text-left flex items-center justify-between gap-2 cursor-pointer transition-colors"
                                        >
                                            <div className="flex items-center gap-2.5 min-w-0">
                                                <FileText className={`w-4 h-4 shrink-0 ${hasResume ? 'text-emerald-400' : 'text-amber-300'}`} strokeWidth={1.75} aria-hidden="true" />
                                                <div className="min-w-0">
                                                    <div className="text-[11px] font-semibold text-white truncate">
                                                        Resume PDF
                                                    </div>
                                                    <div className="text-[10px] text-[#888888] truncate">
                                                        {hasResume ? 'Parsed for matching' : 'Upload PDF for sharper matches'}
                                                    </div>
                                                </div>
                                            </div>
                                            <ArrowUpRight className="w-3.5 h-3.5 text-[#71717A] shrink-0" aria-hidden="true" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => navigate('/student/analysis')}
                                            className="p-3 rounded-sm bg-[#060709] border border-white/[0.08] hover:border-white/20 text-left flex items-center justify-between gap-2 cursor-pointer transition-colors"
                                        >
                                            <div className="flex items-center gap-2.5 min-w-0">
                                                <Github className={`w-4 h-4 shrink-0 ${hasGithub ? 'text-emerald-400' : 'text-amber-300'}`} strokeWidth={1.75} aria-hidden="true" />
                                                <div className="min-w-0">
                                                    <div className="text-[11px] font-semibold text-white truncate">
                                                        GitHub Repositories
                                                    </div>
                                                    <div className="text-[10px] text-[#888888] truncate">
                                                        {hasGithub ? 'Included in AI signals' : 'Link GitHub on AI Analysis'}
                                                    </div>
                                                </div>
                                            </div>
                                            <ArrowUpRight className="w-3.5 h-3.5 text-[#71717A] shrink-0" aria-hidden="true" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => navigate('/student/assessment')}
                                            className="p-3 rounded-sm bg-[#060709] border border-amber-500/30 hover:border-amber-400/50 text-left flex items-center justify-between gap-2 cursor-pointer transition-colors"
                                        >
                                            <div className="flex items-center gap-2.5 min-w-0">
                                                <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                                                <div className="min-w-0">
                                                    <div className="text-[11px] font-semibold text-white truncate">
                                                        Verified Skill Test
                                                    </div>
                                                    <div className="text-[10px] text-amber-300 truncate">
                                                        Pending · Click to take test
                                                    </div>
                                                </div>
                                            </div>
                                            <ArrowUpRight className="w-3.5 h-3.5 text-amber-300 shrink-0" aria-hidden="true" />
                                        </button>
                                    </div>
                                </section>
                            )}

                            {/* Filter & Search Toolbar */}
                            <section className="rounded-md bg-[#0D0F14] border border-white/[0.08] p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                                <div className="relative flex-1 max-w-md">
                                    <Search className="w-3.5 h-3.5 text-[#71717A] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.75} aria-hidden="true" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Filter roles by title, company, or skill..."
                                        className="w-full pl-9 pr-3.5 py-2 rounded-sm bg-[#060709] border border-white/[0.08] focus:border-white/25 focus:outline-none text-xs text-white placeholder-[#555555]"
                                    />
                                </div>

                                <div className="inline-flex flex-wrap items-center p-1 rounded-sm bg-[#060709] border border-white/[0.08] gap-1 text-xs">
                                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#71717A] mx-2 hidden sm:inline" strokeWidth={1.75} aria-hidden="true" />
                                    {[
                                        { id: 'ALL', label: `All (${displaySourceJobs.length})` },
                                        { id: 'ELIGIBLE', label: `Eligible (${eligibleCount})` },
                                        { id: 'MATCH_80', label: '80%+ Fit' },
                                        { id: 'APPLIED', label: `Applied (${myApplications.length})` },
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            onClick={() => setFilterMode(tab.id)}
                                            className={`px-3 py-1 rounded-sm font-mono cursor-pointer transition-colors ${
                                                filterMode === tab.id
                                                    ? 'bg-[#181B22] text-white border border-white/15 font-medium'
                                                    : 'text-[#888888] hover:text-white border border-transparent'
                                            }`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                            </section>

                            {/* Sample Preview Fallback Notice when DB has 0 Open Jobs */}
                            {isSampleFallback && (
                                <div className="rounded-sm bg-[#0D0F14] border border-white/[0.08] px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                                    <div className="flex items-center gap-2 text-zinc-300">
                                        <Sparkles className="w-4 h-4 text-zinc-400 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                                        <span>
                                            No active recruiter listings are open right now. Showing sample industry benchmarks calibrated to your skills so you can prepare targeted gaps.
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={loadJobMatchesData}
                                        className="inline-flex items-center gap-1.5 text-xs text-white hover:underline cursor-pointer"
                                    >
                                        <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
                                        <span>Refresh Roles</span>
                                    </button>
                                </div>
                            )}

                            {/* Loading Skeleton / Job Cards Grid */}
                            {loading ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {[1, 2, 3].map((n) => (
                                        <div key={n} className="p-5 rounded-md bg-[#0D0F14] border border-white/[0.08] h-64 animate-pulse" />
                                    ))}
                                </div>
                            ) : filteredJobs.length === 0 ? (
                                <div className="rounded-md bg-[#0D0F14] border border-white/[0.08] py-14 px-6 text-center space-y-3">
                                    <Briefcase className="w-7 h-7 text-[#555555] mx-auto" strokeWidth={1.5} aria-hidden="true" />
                                    <div className="text-sm font-semibold text-white">No positions match this filter</div>
                                    <p className="text-xs text-[#888888] max-w-md mx-auto">
                                        Try clearing the search query or switching back to &ldquo;All&rdquo; to inspect estimated matches and upskill gaps.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFilterMode('ALL');
                                            setSearchQuery('');
                                        }}
                                        className="px-4 py-2 rounded-sm bg-[#181B22] border border-white/15 text-xs text-white cursor-pointer hover:bg-[#222631]"
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {filteredJobs.map((job) => {
                                        const applied = hasApplied(job);
                                        const appStatus = getAppStatus(job.id);
                                        const matchScore = typeof job.match === 'number' ? Math.round(job.match) : 0;
                                        const isApplying = applyingTo === job.id;
                                        const matchedSkills = Array.isArray(job.matched_skills) ? job.matched_skills : [];
                                        const missingSkills = Array.isArray(job.missing_skills) ? job.missing_skills : [];
                                        const requiredSkills = Array.isArray(job.required_skills)
                                            ? job.required_skills
                                            : (job.skills_required || '').split(',').map((s) => s.trim()).filter(Boolean);
                                        const minReq = Number(job.min_skill_score || 0);
                                        const eligible = Boolean(job.eligible_to_apply);

                                        return (
                                            <article
                                                key={job.id}
                                                className="p-5 rounded-md bg-[#111318] border border-white/[0.08] border-t-white/15 hover:border-white/25 transition-colors flex flex-col justify-between gap-4"
                                            >
                                                <div className="space-y-3.5">
                                                    {/* Match Score + Budget Row */}
                                                    <div className="space-y-2">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-xs font-semibold bg-white/[0.05] text-white border border-white/[0.08]">
                                                                <span>{matchScore}% {assessmentCompleted ? 'Match' : 'Est. Fit'}</span>
                                                            </span>
                                                            <span className="inline-flex items-center gap-1 text-[11px] text-[#A1A1AA]">
                                                                <DollarSign className="w-3 h-3 text-[#71717A]" strokeWidth={1.75} aria-hidden="true" />
                                                                <span>
                                                                    {Number(job.budget_amount || 0).toLocaleString()}
                                                                    {job.budget_type === 'hourly' ? '/hr' : ' fixed'}
                                                                </span>
                                                            </span>
                                                        </div>
                                                        <div className="w-full h-1 bg-[#060709] border border-white/[0.06] overflow-hidden">
                                                            <div
                                                                className="h-full bg-[#F5F5F5] transition-all duration-500"
                                                                style={{ width: `${Math.max(4, Math.min(100, matchScore))}%` }}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Title & Company */}
                                                    <div>
                                                        <div className="flex items-center justify-between gap-2">
                                                            <h3 className="font-display font-bold text-white text-base tracking-tight truncate">
                                                                {job.title}
                                                            </h3>
                                                            {job.isPreview && (
                                                                <span className="px-1.5 py-0.5 rounded-sm text-[10px] bg-white/[0.04] border border-white/[0.08] text-[#888888] shrink-0">
                                                                    Sample
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center justify-between gap-2 text-xs text-[#888888] mt-0.5">
                                                            <span className="truncate">{job.company_name || 'Partner Team'}</span>
                                                            <span className="text-[11px] text-[#71717A] shrink-0">{job.category}</span>
                                                        </div>
                                                    </div>

                                                    {/* Short Description */}
                                                    <p className="text-xs text-[#A1A1AA] line-clamp-2 leading-relaxed">
                                                        {job.description}
                                                    </p>

                                                    {/* Eligibility Bar */}
                                                    <div className="px-3 py-2 rounded-sm bg-[#060709] border border-white/[0.06] flex items-center justify-between text-[11px]">
                                                        <span className="text-[#888888]">
                                                            Score Gate: <strong className="text-zinc-200">{minReq > 0 ? `${minReq}%` : 'Open'}</strong>
                                                        </span>
                                                        {eligible ? (
                                                            <span className="inline-flex items-center gap-1 text-emerald-400">
                                                                <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                                                                <span>Eligible</span>
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 text-amber-300">
                                                                <Lock className="w-3 h-3" aria-hidden="true" />
                                                                <span>{assessmentCompleted ? `Score ${Math.round(skillScore)}%` : 'Test Needed'}</span>
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Matched & Gap Skills */}
                                                    <div className="space-y-1.5">
                                                        <div className="flex flex-wrap gap-1.5">
                                                            {matchedSkills.map((skill) => (
                                                                <span
                                                                    key={`m-${skill}`}
                                                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[11px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/25"
                                                                >
                                                                    <CheckCircle2 className="w-2.5 h-2.5" aria-hidden="true" />
                                                                    <span>{skill}</span>
                                                                </span>
                                                            ))}
                                                            {missingSkills.map((skill) => (
                                                                <button
                                                                    key={`gap-${skill}`}
                                                                    type="button"
                                                                    onClick={() => navigate(`/student/upskill?topic=${encodeURIComponent(skill)}`)}
                                                                    title={`Missing skill — click to study ${skill} in Upskill Studio`}
                                                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[11px] bg-[#060709] hover:bg-[#181B22] text-[#A1A1AA] hover:text-white border border-white/[0.08] hover:border-white/25 transition-colors cursor-pointer"
                                                                >
                                                                    <BookOpen className="w-2.5 h-2.5" aria-hidden="true" />
                                                                    <span>{skill}</span>
                                                                </button>
                                                            ))}
                                                            {matchedSkills.length === 0 && missingSkills.length === 0 && requiredSkills.map((skill) => (
                                                                <span
                                                                    key={`req-${skill}`}
                                                                    className="px-2 py-0.5 rounded-sm text-[11px] bg-white/[0.04] text-zinc-300 border border-white/[0.08]"
                                                                >
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                        {missingSkills.length > 0 && (
                                                            <div className="text-[10px] text-[#71717A]">
                                                                Click any gray skill tag to launch an Upskill study guide.
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Card Action Footer */}
                                                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2 text-xs">
                                                    <span className="inline-flex items-center gap-1 text-[11px] text-[#71717A]">
                                                        <Users className="w-3 h-3" aria-hidden="true" />
                                                        <span>{job.applicant_count || 0} applied</span>
                                                    </span>

                                                    {job.isPreview ? (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                navigate(
                                                                    assessmentCompleted
                                                                        ? `/student/upskill?topic=${encodeURIComponent(job.required_skills[0] || job.title)}`
                                                                        : '/student/assessment'
                                                                )
                                                            }
                                                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-sm bg-[#121316] border border-white/15 hover:border-white/30 text-white text-xs transition-colors cursor-pointer"
                                                        >
                                                            <span>{assessmentCompleted ? 'Prepare Stack' : 'Take Assessment'}</span>
                                                            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                                                        </button>
                                                    ) : applied ? (
                                                        appStatus === 'accepted' ? (
                                                            <span className="inline-flex items-center gap-1 text-xs text-white px-2.5 py-1 rounded-sm bg-emerald-500/10 border border-emerald-500/30">
                                                                <Award className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                                                                <span>Accepted</span>
                                                            </span>
                                                        ) : appStatus === 'rejected' ? (
                                                            <span className="text-xs text-[#71717A] px-2.5 py-1 rounded-sm bg-[#060709] border border-white/[0.06]">
                                                                Closed
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 text-xs text-zinc-200 px-2.5 py-1 rounded-sm bg-white/[0.05] border border-white/[0.08]">
                                                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                                                                <span>Applied</span>
                                                            </span>
                                                        )
                                                    ) : eligible ? (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleApply(job.id)}
                                                            disabled={isApplying}
                                                            className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold rounded-sm text-xs transition-colors cursor-pointer disabled:opacity-50"
                                                        >
                                                            <span>{isApplying ? 'Submitting...' : 'Apply Now'}</span>
                                                            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                                                        </button>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            onClick={() => navigate('/student/assessment')}
                                                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-sm bg-[#060709] hover:bg-[#181B22] border border-amber-500/30 text-amber-200 text-xs transition-colors cursor-pointer"
                                                        >
                                                            <Lock className="w-3 h-3" aria-hidden="true" />
                                                            <span>{assessmentCompleted ? 'Improve Score' : 'Take Test to Apply'}</span>
                                                        </button>
                                                    )}
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>
                            )}

                        </div>
                    </main>

                    <footer className="w-full border-t border-white/[0.06] bg-[#060709] text-xs text-[#71717A] font-mono py-4 relative z-10">
                        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
                            <div>SkillForge Candidate Hub &copy; {new Date().getFullYear()}</div>
                            <div className="text-[11px]">Verified Skill &amp; Role Matching</div>
                        </div>
                    </footer>
                </div>
            </div>
        </StudioNoise>
    );
};

export default JobMatchesPage;
