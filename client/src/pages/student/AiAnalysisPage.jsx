import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ScanSearch,
    FileCheck2,
    Github,
    RefreshCw,
    CheckCircle2,
    AlertTriangle,
    Clock,
    Star,
    ExternalLink,
    ArrowUpRight,
    ShieldCheck,
    BookOpen,
    Upload,
    Sparkles,
    Cpu,
    FileText,
    Code2,
    Database,
    Layers,
    Terminal,
    User,
    GraduationCap,
    Search,
    ListChecks,
    Copy,
    Check,
    ChevronDown,
    ChevronUp,
    GitFork,
    Link2,
    Globe,
    MapPin,
} from '../../components/ui/Icons';
import { useAuthStore } from '../../store/authStore';
import api, { extractApiErrorMessage } from '../../api/client';
import StudioNoise from '../../components/ui/animations/StudioNoise';
import StudentSidebar from '../../components/student/StudentSidebar';
import StudentHeader from '../../components/student/StudentHeader';
import StructuredEvaluationView from '../../components/student/StructuredEvaluationView';

const STATUS_BADGES = {
    analyzed_pdf: {
        label: 'PDF Parsed',
        className: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
    },
    analyzed_live: {
        label: 'Live GitHub',
        className: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
    },
    analyzed_fallback: {
        label: 'Fallback Sample',
        className: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    },
    profile_fallback: {
        label: 'Profile Only',
        className: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    },
    pending_scan: {
        label: 'Pending Scan',
        className: 'bg-white/[0.05] border-white/15 text-zinc-300',
    },
    missing: {
        label: 'Not Linked',
        className: 'bg-rose-500/10 border-rose-500/30 text-rose-300',
    },
};

const DOMAIN_ICONS = {
    languages: Code2,
    backend: Cpu,
    frontend: Layers,
    databases: Database,
    systems_devops: Terminal,
    cybersecurity: ShieldCheck,
    ai_algorithms: Sparkles,
};

const LEVEL_STYLES = {
    'Strong Signal': {
        badge: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
        bar: 'bg-emerald-400',
    },
    Verified: {
        badge: 'bg-white/[0.08] border-white/20 text-white',
        bar: 'bg-[#F5F5F5]',
    },
    Developing: {
        badge: 'bg-amber-500/10 border-amber-500/25 text-amber-300',
        bar: 'bg-amber-300/80',
    },
    'Not Evidenced': {
        badge: 'bg-white/[0.03] border-white/[0.08] text-[#71717A]',
        bar: 'bg-zinc-700',
    },
};

const LANGUAGE_SWATCHES = [
    'bg-zinc-100',
    'bg-emerald-400',
    'bg-zinc-400',
    'bg-amber-300',
    'bg-zinc-500',
    'bg-zinc-600',
];

const formatDateTime = (isoString) => {
    if (!isoString) return 'Not analyzed yet';
    try {
        return new Date(isoString).toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    } catch {
        return 'Recently updated';
    }
};

const formatShortDate = (isoString) => {
    if (!isoString) return '';
    try {
        return new Date(isoString).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
        });
    } catch {
        return '';
    }
};

const AiAnalysisPage = () => {
    const { logout, user } = useAuthStore();
    const navigate = useNavigate();
    const resumeFileInputRef = useRef(null);

    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [savingGithub, setSavingGithub] = useState(false);
    const [uploadingResume, setUploadingResume] = useState(false);
    const [githubInput, setGithubInput] = useState('');
    const [toastBanner, setToastBanner] = useState(null);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Navigation & interactive view controls
    const [activeTab, setActiveTab] = useState('overview'); // overview | resume | github | reviews
    const [domainFilter, setDomainFilter] = useState('all'); // all | evidenced
    const [reviewScope, setReviewScope] = useState('all'); // all | resume | github | summary
    const [repoSearch, setRepoSearch] = useState('');
    const [repoLangFilter, setRepoLangFilter] = useState('all');
    const [showFullResumeText, setShowFullResumeText] = useState(false);
    const [copiedResumeText, setCopiedResumeText] = useState(false);
    const [avatarFailed, setAvatarFailed] = useState(false);

    useEffect(() => {
        if (user && user.onboarding_stage < 2) {
            navigate('/student/onboarding');
        }
    }, [user, navigate]);

    const fetchAnalysis = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get('/verification/analysis/');
            if (res.ok) {
                const data = await res.json();
                setAnalysis(data);
                setGithubInput(data?.profile_inputs?.github_url || data?.github_source?.github_url || '');
                setAvatarFailed(false);
            } else {
                const err = await res.json().catch(() => ({}));
                setToastBanner({
                    type: 'error',
                    text: extractApiErrorMessage(err, 'Unable to load AI analysis audit.'),
                });
            }
        } catch (err) {
            console.error('Failed loading AI analysis:', err);
            setToastBanner({ type: 'error', text: 'Network error while loading AI analysis.' });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAnalysis();
    }, [fetchAnalysis]);

    const handleRefreshAnalysis = async () => {
        setRefreshing(true);
        try {
            const res = await api.post('/verification/analysis/refresh/', {});
            if (res.ok) {
                const data = await res.json();
                setAnalysis(data);
                setAvatarFailed(false);
                setToastBanner({
                    type: 'success',
                    text: 'AI analysis refreshed cleanly across all domains from your latest Resume PDF and GitHub.',
                });
            } else {
                const err = await res.json().catch(() => ({}));
                setToastBanner({
                    type: 'error',
                    text: extractApiErrorMessage(err, 'Could not refresh AI analysis.'),
                });
            }
        } catch (err) {
            console.error('Refresh analysis failed:', err);
            setToastBanner({ type: 'error', text: 'Network error while refreshing AI analysis.' });
        } finally {
            setRefreshing(false);
        }
    };

    const handleUpdateGithubAndScan = async (e) => {
        e.preventDefault();
        if (!githubInput.trim()) return;
        setSavingGithub(true);
        try {
            const patchRes = await api.patch('/accounts/profile/update/', {
                github_url: githubInput.trim(),
            });
            if (!patchRes.ok) {
                const err = await patchRes.json().catch(() => ({}));
                setToastBanner({
                    type: 'error',
                    text: extractApiErrorMessage(err, 'Please enter a valid GitHub URL (e.g. https://github.com/username).'),
                });
                return;
            }
            const refreshRes = await api.post('/verification/analysis/refresh/', {});
            if (refreshRes.ok) {
                const data = await refreshRes.json();
                setAnalysis(data);
                setAvatarFailed(false);
                setToastBanner({
                    type: 'success',
                    text: 'GitHub profile updated and repositories analyzed across domains.',
                });
            } else {
                await fetchAnalysis();
            }
        } catch (err) {
            console.error('GitHub update failed:', err);
            setToastBanner({ type: 'error', text: 'Network error updating GitHub URL.' });
        } finally {
            setSavingGithub(false);
        }
    };

    const handleQuickResumeUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadingResume(true);
        try {
            const formData = new FormData();
            formData.append('resume', file);
            const patchRes = await api.patch('/accounts/profile/update/', formData, { isFormData: true });
            if (!patchRes.ok) {
                const err = await patchRes.json().catch(() => ({}));
                setToastBanner({
                    type: 'error',
                    text: extractApiErrorMessage(err, 'Only genuine PDF resumes up to 5MB are supported.'),
                });
                return;
            }
            const refreshRes = await api.post('/verification/analysis/refresh/', {});
            if (refreshRes.ok) {
                const data = await refreshRes.json();
                setAnalysis(data);
                setToastBanner({
                    type: 'success',
                    text: `Parsed "${file.name}" and updated structured domain insights.`,
                });
            } else {
                await fetchAnalysis();
            }
        } catch (err) {
            console.error('Resume upload error:', err);
            setToastBanner({ type: 'error', text: 'Failed uploading resume PDF.' });
        } finally {
            setUploadingResume(false);
            if (resumeFileInputRef.current) {
                resumeFileInputRef.current.value = '';
            }
        }
    };

    const handleCopyFullText = () => {
        const text = resumeSource.full_text_preview || resumeSource.extracted_preview || '';
        if (!text) return;
        navigator.clipboard?.writeText(text).then(() => {
            setCopiedResumeText(true);
            setTimeout(() => setCopiedResumeText(false), 1800);
        }).catch(() => {});
    };

    const handlePracticeTopic = (topic) => {
        navigate(`/student/upskill?topic=${encodeURIComponent(topic)}`);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const profileInputs = useMemo(() => analysis?.profile_inputs || {}, [analysis]);
    const resumeSource = useMemo(() => analysis?.resume_source || {}, [analysis]);
    const githubSource = useMemo(() => analysis?.github_source || {}, [analysis]);
    const domainAssessments = useMemo(
        () => (Array.isArray(analysis?.domain_assessments) ? analysis.domain_assessments : []),
        [analysis]
    );
    const evidencedDomains = useMemo(
        () => domainAssessments.filter((d) => d.evidenced),
        [domainAssessments]
    );
    const visibleDomains = useMemo(
        () => (domainFilter === 'evidenced' ? evidencedDomains : domainAssessments),
        [domainFilter, domainAssessments, evidencedDomains]
    );

    const allRepos = useMemo(
        () => (Array.isArray(githubSource.repos) ? githubSource.repos : []),
        [githubSource]
    );
    const languageBreakdown = useMemo(
        () => (Array.isArray(githubSource.language_breakdown) ? githubSource.language_breakdown : []),
        [githubSource]
    );
    const filteredRepos = useMemo(() => {
        const q = repoSearch.trim().toLowerCase();
        return allRepos.filter((repo) => {
            if (repoLangFilter !== 'all' && (repo.language || 'Other') !== repoLangFilter) {
                return false;
            }
            if (!q) return true;
            const hay = `${repo.name || ''} ${repo.description || ''} ${(repo.topics || []).join(' ')}`.toLowerCase();
            return hay.includes(q);
        });
    }, [allRepos, repoLangFilter, repoSearch]);

    const candidateName =
        profileInputs.full_name ||
        user?.full_name ||
        user?.email?.split('@')[0] ||
        'Candidate';

    const assessmentDone = Boolean(analysis?.assessment_completed);
    const skillScore = Number(analysis?.skill_test_score || 0);
    const starRating = Number(analysis?.star_rating || 0);
    const finalData = analysis?.final_analysis || {};
    const finalStrengths = Array.isArray(finalData?.strengths) ? finalData.strengths : [];
    const finalWeaknesses = Array.isArray(finalData?.weaknesses) ? finalData.weaknesses : [];

    const resumeBadge = STATUS_BADGES[resumeSource.status || 'missing'] || STATUS_BADGES.missing;
    const githubBadge = STATUS_BADGES[githubSource.status || 'missing'] || STATUS_BADGES.missing;

    const resumeFullText = resumeSource.full_text_preview || resumeSource.extracted_preview || '';
    const resumeSections = Array.isArray(resumeSource.extracted_sections) ? resumeSource.extracted_sections : [];
    const resumeHighlights = Array.isArray(resumeSource.extracted_highlights) ? resumeSource.extracted_highlights : [];
    const resumeLinks = Array.isArray(resumeSource.extracted_links) ? resumeSource.extracted_links : [];
    const resumeDomainEntries = Object.entries(resumeSource.domain_skills || {});

    const portfolioLinksList = useMemo(() => {
        if (!profileInputs.portfolio_links) return [];
        return String(profileInputs.portfolio_links)
            .split(/[\n,]+/)
            .map((s) => s.trim())
            .filter(Boolean);
    }, [profileInputs.portfolio_links]);

    const DOMAIN_NAME_BY_ID = useMemo(() => {
        const map = {};
        domainAssessments.forEach((d) => {
            map[d.id] = d.name;
        });
        return map;
    }, [domainAssessments]);

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
                        <div className="flex flex-col gap-5 w-full max-w-[1400px] mx-auto">

                            {/* Inline Toast Banner */}
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

                            {/* Top Header Strip */}
                            <section className="rounded-md bg-[#0D0F14] border border-white/[0.08] border-t-white/15 p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                <div className="flex items-start gap-3.5">
                                    <div className="w-10 h-10 rounded-sm bg-[#111318] border border-white/15 flex items-center justify-center text-white shrink-0">
                                        <ScanSearch className="w-5 h-5" strokeWidth={1.75} />
                                    </div>
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h1 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
                                                AI Analysis &amp; Source Audit
                                            </h1>
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-white/[0.04] border border-white/[0.08] text-zinc-300 text-[11px]">
                                                <Clock className="w-3 h-3 text-[#888888]" />
                                                <span>{formatDateTime(analysis?.generated_at)}</span>
                                            </span>
                                            {domainAssessments.length > 0 && (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-[11px]">
                                                    <span>{evidencedDomains.length}/{domainAssessments.length} Domains Active</span>
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-[#888888] mt-1">
                                            Domain-organized evaluation and full inspection of every signal extracted from your Resume PDF, Profile, and GitHub repositories.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => navigate('/student/onboarding')}
                                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-[#121316] border border-white/10 hover:border-white/25 text-xs text-[#E4E4E7] hover:text-white transition-colors cursor-pointer"
                                    >
                                        <FileText className="w-3.5 h-3.5" />
                                        <span>Edit Profile Inputs</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleRefreshAnalysis}
                                        disabled={refreshing || loading}
                                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
                                    >
                                        <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                                        <span>{refreshing ? 'Analyzing Sources...' : 'Re-run AI Analysis'}</span>
                                    </button>
                                </div>
                            </section>

                            {/* 3-Source Interactive Pipeline Bar */}
                            <section className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('resume')}
                                    className={`p-4 rounded-md bg-[#0D0F14] border text-left flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                                        activeTab === 'resume' ? 'border-white/30 bg-[#111318]' : 'border-white/[0.08] hover:border-white/20'
                                    }`}
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-9 h-9 rounded-sm bg-[#060709] border border-white/[0.08] flex items-center justify-center shrink-0">
                                            <FileCheck2 className={`w-4 h-4 ${resumeSource.has_file ? 'text-emerald-400' : 'text-zinc-400'}`} />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-[10px] text-[#71717A] uppercase">01 &middot; Submitted Resume</div>
                                            <div className="text-xs font-semibold text-white truncate">
                                                {resumeSource.filename || 'Profile Summary'}
                                            </div>
                                            <div className="text-[11px] text-[#888888] truncate">
                                                {resumeSource.extracted_chars ? `${resumeSource.extracted_chars.toLocaleString()} chars` : 'No PDF chars'} &middot; {resumeSource.matched_skills?.length || 0} skills
                                            </div>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded-sm border text-[10px] shrink-0 ${resumeBadge.className}`}>
                                        {resumeBadge.label}
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setActiveTab('github')}
                                    className={`p-4 rounded-md bg-[#0D0F14] border text-left flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                                        activeTab === 'github' ? 'border-white/30 bg-[#111318]' : 'border-white/[0.08] hover:border-white/20'
                                    }`}
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-9 h-9 rounded-sm bg-[#060709] border border-white/[0.08] flex items-center justify-center shrink-0">
                                            <Github className={`w-4 h-4 ${githubSource.has_github ? 'text-emerald-400' : 'text-zinc-400'}`} />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-[10px] text-[#71717A] uppercase">02 &middot; GitHub Portfolio</div>
                                            <div className="text-xs font-semibold text-white truncate">
                                                {githubSource.username ? `@${githubSource.username}` : 'Not Linked'}
                                            </div>
                                            <div className="text-[11px] text-[#888888] truncate">
                                                {allRepos.length || githubSource.public_repos || 0} repos &middot; {githubSource.total_stars || 0} stars
                                            </div>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded-sm border text-[10px] shrink-0 ${githubBadge.className}`}>
                                        {githubBadge.label}
                                    </span>
                                </button>

                                <div className="p-4 rounded-md bg-[#0D0F14] border border-white/[0.08] flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-9 h-9 rounded-sm bg-[#060709] border border-white/[0.08] flex items-center justify-center shrink-0">
                                            <ShieldCheck className={`w-4 h-4 ${assessmentDone ? 'text-emerald-400' : 'text-amber-300'}`} />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-[10px] text-[#71717A] uppercase">03 &middot; Skill Verification</div>
                                            <div className="text-xs font-semibold text-white truncate">
                                                {assessmentDone ? `${Math.round(skillScore)}% Verified Score` : 'Assessment Pending'}
                                            </div>
                                            <div className="text-[11px] text-[#888888] truncate">
                                                {analysis?.latest_attempt?.category
                                                    ? `Tested: ${analysis.latest_attempt.category}`
                                                    : 'Cross-checks Resume & GitHub'}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => navigate('/student/assessment')}
                                        className="px-2.5 py-1 rounded-sm bg-[#121316] border border-white/15 hover:border-white/30 text-[11px] text-white cursor-pointer shrink-0"
                                    >
                                        {assessmentDone ? 'Retake' : 'Start Test'}
                                    </button>
                                </div>
                            </section>

                            {/* Primary Tab Navigation Bar */}
                            <nav
                                aria-label="AI Analysis View Switcher"
                                className="flex flex-wrap items-center justify-between gap-3 p-1.5 rounded-md bg-[#0D0F14] border border-white/[0.08]"
                            >
                                <div className="flex flex-wrap items-center gap-1.5">
                                    {[
                                        { id: 'overview', label: 'Overview & Domains', icon: Layers },
                                        { id: 'resume', label: 'Submitted Resume & Profile', icon: FileText },
                                        { id: 'github', label: `GitHub Repositories (${allRepos.length})`, icon: Github },
                                        { id: 'reviews', label: 'Detailed AI Reviews', icon: ListChecks },
                                    ].map((tab) => {
                                        const TabIcon = tab.icon;
                                        const isActive = activeTab === tab.id;
                                        return (
                                            <button
                                                key={tab.id}
                                                type="button"
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-sm text-xs transition-colors cursor-pointer ${
                                                    isActive
                                                        ? 'bg-[#F5F5F5] text-[#050505] font-semibold'
                                                        : 'text-[#a1a1aa] hover:text-white hover:bg-white/[0.04]'
                                                }`}
                                            >
                                                <TabIcon className="w-3.5 h-3.5" />
                                                <span>{tab.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => navigate('/student/jobs')}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#111318] border border-white/15 hover:border-white/30 text-[11px] text-white cursor-pointer"
                                >
                                    <span>View Matched Jobs</span>
                                    <ArrowUpRight className="w-3 h-3" />
                                </button>
                            </nav>

                            {loading ? (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                    <div className="h-72 rounded-md bg-[#0D0F14] border border-white/[0.08] animate-pulse" />
                                    <div className="h-72 rounded-md bg-[#0D0F14] border border-white/[0.08] animate-pulse" />
                                </div>
                            ) : (
                                <>
                                    {/* TAB 1: OVERVIEW & CROSS-DOMAIN MATRIX */}
                                    {activeTab === 'overview' && (
                                        <div className="space-y-6">
                                            {/* Cross-Domain Skill & Evidence Grid */}
                                            <section className="rounded-md bg-[#0D0F14] border border-white/[0.08] border-t-white/15 p-5 sm:p-6 space-y-5">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
                                                    <div>
                                                        <h2 className="font-display font-bold text-base sm:text-lg text-white tracking-tight">
                                                            Cross-Domain Capability Breakdown
                                                        </h2>
                                                        <p className="text-[11px] text-[#888888] mt-0.5">
                                                            Unified signal evaluation across programming languages, backend, GUI/frontend, databases, systems/Linux, cybersecurity, and AI/algorithms.
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center gap-1.5 shrink-0">
                                                        <button
                                                            type="button"
                                                            onClick={() => setDomainFilter('all')}
                                                            className={`px-2.5 py-1 rounded-sm text-[11px] border cursor-pointer ${
                                                                domainFilter === 'all'
                                                                    ? 'bg-white text-[#050505] border-white font-semibold'
                                                                    : 'bg-[#060709] border-white/[0.08] text-zinc-400 hover:text-white'
                                                            }`}
                                                        >
                                                            All Domains ({domainAssessments.length})
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setDomainFilter('evidenced')}
                                                            className={`px-2.5 py-1 rounded-sm text-[11px] border cursor-pointer ${
                                                                domainFilter === 'evidenced'
                                                                    ? 'bg-white text-[#050505] border-white font-semibold'
                                                                    : 'bg-[#060709] border-white/[0.08] text-zinc-400 hover:text-white'
                                                            }`}
                                                        >
                                                            Evidenced ({evidencedDomains.length})
                                                        </button>
                                                    </div>
                                                </div>

                                                {visibleDomains.length === 0 ? (
                                                    <div className="p-4 rounded-sm bg-[#060709] border border-white/[0.08] text-xs text-[#888888]">
                                                        Upload a Resume PDF or link your GitHub handle and click Re-run AI Analysis to populate domain signals.
                                                    </div>
                                                ) : (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                                        {visibleDomains.map((dom) => {
                                                            const DomIcon = DOMAIN_ICONS[dom.id] || Cpu;
                                                            const style = LEVEL_STYLES[dom.level] || LEVEL_STYLES['Not Evidenced'];
                                                            return (
                                                                <div
                                                                    key={dom.id}
                                                                    className="p-4 rounded-sm bg-[#060709] border border-white/[0.08] flex flex-col justify-between gap-3.5"
                                                                >
                                                                    <div className="space-y-3">
                                                                        <div className="flex items-start justify-between gap-2">
                                                                            <div className="flex items-center gap-2.5 min-w-0">
                                                                                <div className="w-8 h-8 rounded-sm bg-[#111318] border border-white/[0.08] flex items-center justify-center shrink-0">
                                                                                    <DomIcon className="w-4 h-4 text-zinc-200" />
                                                                                </div>
                                                                                <div className="min-w-0">
                                                                                    <h3 className="text-xs font-semibold text-white truncate">
                                                                                        {dom.name}
                                                                                    </h3>
                                                                                    <div className="text-[10px] text-[#71717A] mt-0.5">
                                                                                        {(dom.skills?.length || 0)} {(dom.skills?.length || 0) === 1 ? 'skill' : 'skills'} &middot; {(dom.repo_count || 0)} {(dom.repo_count || 0) === 1 ? 'repo' : 'repos'}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <span className={`px-2 py-0.5 rounded-sm border text-[10px] shrink-0 ${style.badge}`}>
                                                                                {dom.level}
                                                                            </span>
                                                                        </div>

                                                                        {/* Score Progress Bar */}
                                                                        <div className="space-y-1">
                                                                            <div className="flex items-center justify-between text-[10px]">
                                                                                <span className="text-[#71717A] uppercase">Domain Strength</span>
                                                                                <span className="text-zinc-200 font-semibold">{dom.score}/100</span>
                                                                            </div>
                                                                            <div className="w-full h-1.5 bg-[#0D0F14] border border-white/[0.06] overflow-hidden">
                                                                                <div
                                                                                    className={`h-full transition-all duration-500 ${style.bar}`}
                                                                                    style={{ width: `${dom.score}%` }}
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                        {/* Source Provenance Tags */}
                                                                        {Array.isArray(dom.sources) && dom.sources.length > 0 && (
                                                                            <div className="flex flex-wrap items-center gap-1">
                                                                                <span className="text-[10px] text-[#71717A] mr-1">Sources:</span>
                                                                                {dom.sources.map((src) => (
                                                                                    <span
                                                                                        key={src}
                                                                                        className="px-1.5 py-0.5 rounded-sm bg-white/[0.04] border border-white/[0.08] text-[10px] text-zinc-300"
                                                                                    >
                                                                                        {src}
                                                                                    </span>
                                                                                ))}
                                                                            </div>
                                                                        )}

                                                                        {/* Matched Skills */}
                                                                        {Array.isArray(dom.skills) && dom.skills.length > 0 && (
                                                                            <div className="flex flex-wrap gap-1.5">
                                                                                {dom.skills.slice(0, 7).map((sk) => (
                                                                                    <span
                                                                                        key={sk}
                                                                                        className="px-2 py-0.5 rounded-sm bg-[#111318] border border-white/[0.08] text-[11px] text-zinc-200"
                                                                                    >
                                                                                        {sk}
                                                                                    </span>
                                                                                ))}
                                                                                {dom.skills.length > 7 && (
                                                                                    <span className="px-2 py-0.5 rounded-sm bg-[#111318] border border-white/[0.06] text-[11px] text-[#71717A]">
                                                                                        +{dom.skills.length - 7}
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        )}

                                                                        <p className="text-[11px] text-[#888888] leading-relaxed">
                                                                            {dom.evidence}
                                                                        </p>
                                                                    </div>

                                                                    <div className="pt-2.5 border-t border-white/[0.05] flex items-center justify-between gap-2 text-[11px]">
                                                                        <span className="text-[#71717A] truncate">
                                                                            {dom.sample_repos?.length ? `Repos: ${dom.sample_repos.slice(0, 2).join(', ')}` : 'Upskill Focus'}
                                                                        </span>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => handlePracticeTopic(dom.recommended_topic || dom.name)}
                                                                            className="inline-flex items-center gap-1 text-zinc-300 hover:text-white shrink-0 cursor-pointer"
                                                                        >
                                                                            <span>Study</span>
                                                                            <ArrowUpRight className="w-3 h-3" />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </section>

                                            {/* Readiness Synthesis + Assessment Tie-In */}
                                            <StructuredEvaluationView
                                                title="Synthesized Readiness Summary"
                                                subtitle="Unified AI assessment combining Resume credentials, GitHub code proof, and Domain coverage"
                                                structured={analysis?.summary_structured}
                                                rawText={analysis?.partial_summary}
                                                onPracticeTopic={handlePracticeTopic}
                                                modeLabel="Multi-Source Synthesis"
                                            />

                                            {/* Quick Navigation Cards into Resume / GitHub / Full Structured AI Reviews */}
                                            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                <div className="p-5 rounded-md bg-[#0D0F14] border border-white/[0.08] flex flex-col justify-between gap-4">
                                                    <div className="space-y-3">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <div className="flex items-center gap-2 text-xs font-semibold text-white">
                                                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                                                <span>Verified Assessment Metrics</span>
                                                            </div>
                                                            {starRating > 0 && (
                                                                <span className="px-2 py-0.5 rounded-sm bg-white/[0.05] border border-white/[0.08] text-[11px] text-white">
                                                                    {starRating.toFixed(1)} / 5.0 Rating
                                                                </span>
                                                            )}
                                                        </div>

                                                        {finalStrengths.length > 0 ? (
                                                            <ul className="space-y-1.5 text-xs text-zinc-300">
                                                                {finalStrengths.map((item, idx) => (
                                                                    <li key={idx} className="flex items-start gap-2">
                                                                        <span className="text-emerald-400 mt-0.5">&bull;</span>
                                                                        <span>{item}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <p className="text-xs text-[#888888] leading-relaxed">
                                                                {assessmentDone
                                                                    ? 'Skill assessment completed and factored into your cross-domain profile.'
                                                                    : 'Take the adaptive Skill Assessment to cross-verify your Resume & GitHub domains with empirical metrics.'}
                                                            </p>
                                                        )}

                                                        {finalWeaknesses.length > 0 && (
                                                            <div className="pt-2 flex flex-wrap gap-1.5">
                                                                {finalWeaknesses.map((w, idx) => (
                                                                    <button
                                                                        key={idx}
                                                                        type="button"
                                                                        onClick={() => handlePracticeTopic(w)}
                                                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-[#060709] border border-white/[0.1] hover:border-white/25 text-[11px] text-zinc-200 cursor-pointer"
                                                                    >
                                                                        <BookOpen className="w-3 h-3 text-[#888888]" />
                                                                        <span>{w}</span>
                                                                        <ArrowUpRight className="w-3 h-3 text-[#71717A]" />
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setReviewScope('resume');
                                                                setActiveTab('reviews');
                                                            }}
                                                            className="text-zinc-300 hover:text-white inline-flex items-center gap-1 cursor-pointer"
                                                        >
                                                            <span>Read Full AI Reviews</span>
                                                            <ArrowUpRight className="w-3.5 h-3.5" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => navigate('/student/assessment')}
                                                            className="text-white hover:underline cursor-pointer"
                                                        >
                                                            {assessmentDone ? 'Retake Assessment' : 'Launch Assessment'} &rarr;
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Top Extracted Resume & Repo Highlights */}
                                                <div className="p-5 rounded-md bg-[#0D0F14] border border-white/[0.08] flex flex-col justify-between gap-4">
                                                    <div className="space-y-3">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <div className="flex items-center gap-2 text-xs font-semibold text-white">
                                                                <Sparkles className="w-4 h-4 text-zinc-200" />
                                                                <span>Key Signals Submitted</span>
                                                            </div>
                                                            <span className="text-[11px] text-[#71717A]">Resume + GitHub</span>
                                                        </div>

                                                        {resumeHighlights.length > 0 ? (
                                                            <div className="space-y-2">
                                                                {resumeHighlights.slice(0, 3).map((hl, i) => (
                                                                    <div
                                                                        key={i}
                                                                        className="p-2.5 rounded-sm bg-[#060709] border border-white/[0.06] text-[11px]"
                                                                    >
                                                                        <span className="text-[#71717A] uppercase text-[10px] block mb-0.5">
                                                                            {hl.category}
                                                                        </span>
                                                                        <span className="text-zinc-200 line-clamp-2">{hl.text}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <p className="text-xs text-[#888888]">
                                                                Inspect the full extracted PDF content and GitHub repositories via the tabs above.
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-xs">
                                                        <button
                                                            type="button"
                                                            onClick={() => setActiveTab('resume')}
                                                            className="text-zinc-300 hover:text-white inline-flex items-center gap-1 cursor-pointer"
                                                        >
                                                            <span>Inspect Resume PDF</span>
                                                            <ArrowUpRight className="w-3.5 h-3.5" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setActiveTab('github')}
                                                            className="text-zinc-300 hover:text-white inline-flex items-center gap-1 cursor-pointer"
                                                        >
                                                            <span>Browse {allRepos.length} GitHub Repos</span>
                                                            <ArrowUpRight className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    )}

                                    {/* TAB 2: EVERYTHING SUBMITTED VIA PROFILE & RESUME PDF */}
                                    {activeTab === 'resume' && (
                                        <div className="space-y-6">
                                            {/* Profile Inputs Submitted */}
                                            <section className="rounded-md bg-[#0D0F14] border border-white/[0.08] border-t-white/15 p-5 sm:p-6 space-y-5">
                                                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
                                                    <div className="flex items-center gap-2.5">
                                                        <User className="w-4 h-4 text-zinc-200" />
                                                        <div>
                                                            <h2 className="font-display font-bold text-base text-white">
                                                                Submitted Candidate Profile
                                                            </h2>
                                                            <p className="text-[11px] text-[#888888]">
                                                                Identity, background, and explicit skills saved on your SkillForge profile
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => navigate('/student/onboarding')}
                                                        className="px-3 py-1.5 rounded-sm bg-[#121316] border border-white/15 hover:border-white/30 text-[11px] text-white cursor-pointer"
                                                    >
                                                        Edit Profile
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                                                    <div className="p-3 rounded-sm bg-[#060709] border border-white/[0.08]">
                                                        <div className="text-[10px] text-[#71717A] uppercase">Full Name</div>
                                                        <div className="text-white font-semibold mt-0.5 truncate">
                                                            {profileInputs.full_name || 'Not set'}
                                                        </div>
                                                    </div>
                                                    <div className="p-3 rounded-sm bg-[#060709] border border-white/[0.08]">
                                                        <div className="text-[10px] text-[#71717A] uppercase flex items-center gap-1">
                                                            <GraduationCap className="w-3 h-3" />
                                                            <span>Education</span>
                                                        </div>
                                                        <div className="text-zinc-200 font-medium mt-0.5 truncate">
                                                            {profileInputs.education || 'Not set'}
                                                        </div>
                                                    </div>
                                                    <div className="p-3 rounded-sm bg-[#060709] border border-white/[0.08]">
                                                        <div className="text-[10px] text-[#71717A] uppercase">Experience Level</div>
                                                        <div className="text-zinc-200 font-medium mt-0.5 capitalize truncate">
                                                            {profileInputs.experience_level || 'Not set'}
                                                        </div>
                                                    </div>
                                                    <div className="p-3 rounded-sm bg-[#060709] border border-white/[0.08]">
                                                        <div className="text-[10px] text-[#71717A] uppercase flex items-center gap-1">
                                                            <MapPin className="w-3 h-3" />
                                                            <span>Location</span>
                                                        </div>
                                                        <div className="text-zinc-200 font-medium mt-0.5 truncate">
                                                            {profileInputs.location || 'Not set'}
                                                        </div>
                                                    </div>
                                                </div>

                                                {profileInputs.bio && (
                                                    <div className="p-3.5 rounded-sm bg-[#060709] border border-white/[0.08] space-y-1">
                                                        <div className="text-[10px] uppercase tracking-wider text-[#71717A]">
                                                            Submitted Bio / Summary
                                                        </div>
                                                        <p className="text-xs text-zinc-200 leading-relaxed">{profileInputs.bio}</p>
                                                    </div>
                                                )}

                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <div className="text-[11px] uppercase tracking-wider text-zinc-400">
                                                            Declared Profile Skills ({profileInputs.skills?.length || 0})
                                                        </div>
                                                        <div className="p-3 rounded-sm bg-[#060709] border border-white/[0.08] flex flex-wrap gap-1.5 min-h-[46px]">
                                                            {Array.isArray(profileInputs.skills) && profileInputs.skills.length > 0 ? (
                                                                profileInputs.skills.map((skill) => (
                                                                    <span
                                                                        key={skill}
                                                                        className="px-2 py-0.5 rounded-sm bg-white/[0.04] border border-white/[0.08] text-[11px] text-zinc-200"
                                                                    >
                                                                        {skill}
                                                                    </span>
                                                                ))
                                                            ) : (
                                                                <span className="text-xs text-[#71717A]">No explicit skills listed on profile.</span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <div className="text-[11px] uppercase tracking-wider text-zinc-400">
                                                            External Portfolio &amp; Linked URLs
                                                        </div>
                                                        <div className="p-3 rounded-sm bg-[#060709] border border-white/[0.08] flex flex-wrap gap-2 min-h-[46px] items-center">
                                                            {profileInputs.github_url && (
                                                                <a
                                                                    href={profileInputs.github_url}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-white/[0.04] border border-white/[0.1] hover:border-white/25 text-[11px] text-zinc-200 hover:text-white"
                                                                >
                                                                    <Github className="w-3 h-3" />
                                                                    <span>GitHub</span>
                                                                    <ExternalLink className="w-3 h-3 text-[#71717A]" />
                                                                </a>
                                                            )}
                                                            {portfolioLinksList.map((linkUrl, i) => (
                                                                <a
                                                                    key={i}
                                                                    href={linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-white/[0.04] border border-white/[0.1] hover:border-white/25 text-[11px] text-zinc-200 hover:text-white max-w-xs truncate"
                                                                >
                                                                    <Globe className="w-3 h-3 shrink-0" />
                                                                    <span className="truncate">{linkUrl}</span>
                                                                </a>
                                                            ))}
                                                            {!profileInputs.github_url && portfolioLinksList.length === 0 && (
                                                                <span className="text-xs text-[#71717A]">No external URLs saved.</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>

                                            {/* Resume PDF Extraction & Parsed Sections */}
                                            <section className="rounded-md bg-[#0D0F14] border border-white/[0.08] border-t-white/15 p-5 sm:p-6 space-y-5">
                                                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-sm bg-[#111318] border border-white/[0.08] flex items-center justify-center shrink-0">
                                                            <FileCheck2 className="w-4 h-4 text-white" />
                                                        </div>
                                                        <div>
                                                            <h2 className="font-display font-bold text-base text-white">
                                                                Submitted Resume PDF Inspection
                                                            </h2>
                                                            <p className="text-[11px] text-[#888888]">
                                                                {resumeSource.filename
                                                                    ? `${resumeSource.filename} (${Number(resumeSource.extracted_chars || 0).toLocaleString()} characters parsed)`
                                                                    : 'Upload a PDF resume to inspect parsed text and structured sections'}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <span className={`px-2.5 py-0.5 rounded-sm border text-[11px] ${resumeBadge.className}`}>
                                                            {resumeBadge.label}
                                                        </span>
                                                        <input
                                                            ref={resumeFileInputRef}
                                                            type="file"
                                                            accept=".pdf,application/pdf"
                                                            onChange={handleQuickResumeUpload}
                                                            className="hidden"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => resumeFileInputRef.current?.click()}
                                                            disabled={uploadingResume}
                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#121316] border border-white/15 hover:border-white/30 text-xs text-white transition-colors cursor-pointer disabled:opacity-50"
                                                        >
                                                            <Upload className="w-3.5 h-3.5" />
                                                            <span>{uploadingResume ? 'Parsing PDF...' : resumeSource.has_file ? 'Replace PDF' : 'Upload PDF'}</span>
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Links Parsed Directly From PDF */}
                                                {resumeLinks.length > 0 && (
                                                    <div className="space-y-1.5">
                                                        <div className="text-[11px] uppercase tracking-wider text-zinc-400">
                                                            Links Detected Inside PDF
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {resumeLinks.map((lnk, idx) => (
                                                                <a
                                                                    key={idx}
                                                                    href={lnk.url}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#060709] border border-white/[0.08] hover:border-white/25 text-[11px] text-zinc-200 hover:text-white"
                                                                >
                                                                    <Link2 className="w-3 h-3 text-[#888888]" />
                                                                    <span className="font-semibold">{lnk.label}:</span>
                                                                    <span className="text-zinc-400 max-w-[240px] truncate">{lnk.url}</span>
                                                                    <ExternalLink className="w-3 h-3 text-[#71717A]" />
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Technologies Grouped by Domain */}
                                                {resumeDomainEntries.length > 0 && (
                                                    <div className="space-y-2">
                                                        <div className="text-[11px] uppercase tracking-wider text-zinc-400">
                                                            Technologies Identified in Resume by Domain
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                            {resumeDomainEntries.map(([domId, skillsArr]) => (
                                                                <div
                                                                    key={domId}
                                                                    className="p-3 rounded-sm bg-[#060709] border border-white/[0.08] space-y-2"
                                                                >
                                                                    <div className="text-[11px] font-semibold text-white">
                                                                        {DOMAIN_NAME_BY_ID[domId] || domId}
                                                                    </div>
                                                                    <div className="flex flex-wrap gap-1.5">
                                                                        {(skillsArr || []).map((sk) => (
                                                                            <span
                                                                                key={sk}
                                                                                className="px-2 py-0.5 rounded-sm bg-white/[0.04] border border-white/[0.08] text-[11px] text-zinc-200"
                                                                            >
                                                                                {sk}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Parsed Resume Sections (Education / Experience / Projects / Patents) */}
                                                {resumeSections.length > 0 && (
                                                    <div className="space-y-2">
                                                        <div className="text-[11px] uppercase tracking-wider text-zinc-400">
                                                            Structured Content Read From PDF ({resumeSections.length} sections)
                                                        </div>
                                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
                                                            {resumeSections.map((sec, idx) => (
                                                                <div
                                                                    key={`${sec.title}-${idx}`}
                                                                    className="p-4 rounded-sm bg-[#060709] border border-white/[0.08] space-y-2"
                                                                >
                                                                    <div className="text-xs font-semibold text-white pb-1.5 border-b border-white/[0.06]">
                                                                        {sec.title}
                                                                    </div>
                                                                    <ul className="space-y-1.5 text-[11px] text-zinc-300 leading-relaxed">
                                                                        {(sec.lines || []).map((ln, lIdx) => (
                                                                            <li key={lIdx} className="flex items-start gap-2">
                                                                                <span className="text-[#71717A] mt-0.5">&bull;</span>
                                                                                <span>{ln.replace(/^-\s+/, '')}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Full Normalized Text Drawer */}
                                                <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                                        <span className="text-[11px] uppercase tracking-wider text-zinc-400">
                                                            Raw Normalized PDF Stream Sent to AI
                                                        </span>
                                                        <div className="flex items-center gap-2">
                                                            {resumeFullText && (
                                                                <button
                                                                    type="button"
                                                                    onClick={handleCopyFullText}
                                                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-[#060709] border border-white/[0.08] hover:border-white/25 text-[11px] text-zinc-300 hover:text-white cursor-pointer"
                                                                >
                                                                    {copiedResumeText ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                                                    <span>{copiedResumeText ? 'Copied' : 'Copy Text'}</span>
                                                                </button>
                                                            )}
                                                            {resumeFullText && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setShowFullResumeText((prev) => !prev)}
                                                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-[#121316] border border-white/15 hover:border-white/30 text-[11px] text-white cursor-pointer"
                                                                >
                                                                    {showFullResumeText ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                                                                    <span>{showFullResumeText ? 'Collapse Text' : 'Expand Full Extracted Text'}</span>
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {resumeFullText ? (
                                                        <div
                                                            className={`p-4 rounded-sm bg-[#060709] border border-white/[0.08] text-[11px] text-zinc-300 leading-relaxed whitespace-pre-wrap overflow-y-auto ${
                                                                showFullResumeText ? 'max-h-[520px]' : 'max-h-36'
                                                            }`}
                                                        >
                                                            {showFullResumeText ? resumeFullText : (resumeSource.extracted_preview || resumeFullText.slice(0, 450))}
                                                        </div>
                                                    ) : (
                                                        <div className="p-4 rounded-sm bg-[#060709] border border-white/[0.08] text-xs text-[#888888]">
                                                            No PDF resume uploaded yet. Upload a .pdf file above to inspect every extracted section.
                                                        </div>
                                                    )}
                                                </div>
                                            </section>

                                            {/* Structured AI Review specifically for Resume */}
                                            <StructuredEvaluationView
                                                title="AI Resume Evaluation"
                                                subtitle="Structured breakdown of strengths, gaps, and next steps from your submitted resume"
                                                structured={analysis?.resume_structured}
                                                rawText={analysis?.resume_analysis}
                                                onPracticeTopic={handlePracticeTopic}
                                                modeLabel={resumeSource.analysis_mode === 'gemini_ai' ? 'Gemini AI' : 'Structured Audit'}
                                            />
                                        </div>
                                    )}

                                    {/* TAB 3: EVERYTHING INSPECTED FROM GITHUB */}
                                    {activeTab === 'github' && (
                                        <div className="space-y-6">
                                            <section className="rounded-md bg-[#0D0F14] border border-white/[0.08] border-t-white/15 p-5 sm:p-6 space-y-5">
                                                {/* GitHub Account Header */}
                                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
                                                    <div className="flex items-start gap-3.5 min-w-0">
                                                        {githubSource.avatar_url && !avatarFailed ? (
                                                            <img
                                                                src={githubSource.avatar_url}
                                                                alt={githubSource.username || 'GitHub Avatar'}
                                                                onError={() => setAvatarFailed(true)}
                                                                className="w-12 h-12 rounded-sm border border-white/15 object-cover shrink-0"
                                                            />
                                                        ) : (
                                                            <div className="w-12 h-12 rounded-sm bg-[#111318] border border-white/[0.08] flex items-center justify-center shrink-0">
                                                                <Github className="w-5 h-5 text-white" />
                                                            </div>
                                                        )}

                                                        <div className="min-w-0">
                                                            <div className="flex flex-wrap items-center gap-2">
                                                                <h2 className="font-display font-bold text-base sm:text-lg text-white truncate">
                                                                    {githubSource.display_name || githubSource.username || 'GitHub Portfolio'}
                                                                </h2>
                                                                <span className={`px-2 py-0.5 rounded-sm border text-[10px] ${githubBadge.className}`}>
                                                                    {githubBadge.label}
                                                                </span>
                                                            </div>
                                                            {githubSource.username && (
                                                                <a
                                                                    href={githubSource.github_url || `https://github.com/${githubSource.username}`}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="text-xs text-zinc-300 hover:text-white inline-flex items-center gap-1 underline underline-offset-4 mt-0.5"
                                                                >
                                                                    <span>github.com/{githubSource.username}</span>
                                                                    <ExternalLink className="w-3 h-3" />
                                                                </a>
                                                            )}
                                                            {githubSource.bio && (
                                                                <p className="text-xs text-[#888888] mt-1">{githubSource.bio}</p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Stats Strip */}
                                                    <div className="grid grid-cols-4 gap-2.5 shrink-0">
                                                        <div className="px-3 py-2 rounded-sm bg-[#060709] border border-white/[0.08] text-center">
                                                            <div className="text-[10px] text-[#71717A] uppercase">Repos</div>
                                                            <div className="text-sm font-bold text-white mt-0.5">
                                                                {githubSource.public_repos || allRepos.length}
                                                            </div>
                                                        </div>
                                                        <div className="px-3 py-2 rounded-sm bg-[#060709] border border-white/[0.08] text-center">
                                                            <div className="text-[10px] text-[#71717A] uppercase">Stars</div>
                                                            <div className="text-sm font-bold text-white mt-0.5">
                                                                {githubSource.total_stars || 0}
                                                            </div>
                                                        </div>
                                                        <div className="px-3 py-2 rounded-sm bg-[#060709] border border-white/[0.08] text-center">
                                                            <div className="text-[10px] text-[#71717A] uppercase">Forks</div>
                                                            <div className="text-sm font-bold text-white mt-0.5">
                                                                {githubSource.total_forks || 0}
                                                            </div>
                                                        </div>
                                                        <div className="px-3 py-2 rounded-sm bg-[#060709] border border-white/[0.08] text-center">
                                                            <div className="text-[10px] text-[#71717A] uppercase">Followers</div>
                                                            <div className="text-sm font-bold text-white mt-0.5">
                                                                {githubSource.followers || 0}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {githubSource.is_mock && (
                                                    <div className="p-3 rounded-sm bg-amber-500/10 border border-amber-500/25 flex items-start gap-2.5 text-[11px] text-amber-200">
                                                        <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                                                        <div>
                                                            <div className="font-semibold">GitHub API Fallback Active</div>
                                                            <div className="text-amber-200/80 mt-0.5">
                                                                Live GitHub API could not return repositories ({githubSource.fallback_reason || 'rate-limited or handle not found'}), so SkillForge transparently evaluated safe fallback portfolio signals.
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Language Distribution Bar */}
                                                {languageBreakdown.length > 0 && (
                                                    <div className="p-4 rounded-sm bg-[#060709] border border-white/[0.08] space-y-3">
                                                        <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-zinc-400">
                                                            <span>Primary Language Distribution</span>
                                                            <span>{languageBreakdown.length} languages</span>
                                                        </div>
                                                        <div className="w-full h-2 rounded-sm bg-[#0D0F14] overflow-hidden flex gap-0.5">
                                                            {languageBreakdown.map((item, idx) => (
                                                                <div
                                                                    key={item.language}
                                                                    className={LANGUAGE_SWATCHES[idx % LANGUAGE_SWATCHES.length]}
                                                                    style={{ width: `${Math.max(4, item.percentage)}%` }}
                                                                    title={`${item.language}: ${item.percentage}% (${item.count} repos)`}
                                                                />
                                                            ))}
                                                        </div>
                                                        <div className="flex flex-wrap gap-3 text-[11px]">
                                                            {languageBreakdown.map((item, idx) => (
                                                                <button
                                                                    key={item.language}
                                                                    type="button"
                                                                    onClick={() =>
                                                                        setRepoLangFilter((prev) => (prev === item.language ? 'all' : item.language))
                                                                    }
                                                                    className={`inline-flex items-center gap-1.5 cursor-pointer transition-opacity ${
                                                                        repoLangFilter === item.language ? 'text-white font-semibold underline underline-offset-4' : 'text-zinc-300 hover:text-white'
                                                                    }`}
                                                                >
                                                                    <span className={`w-2 h-2 rounded-full ${LANGUAGE_SWATCHES[idx % LANGUAGE_SWATCHES.length]}`} />
                                                                    <span>{item.language}</span>
                                                                    <span className="text-[#71717A]">{item.percentage}% ({item.count})</span>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Search & Language Filter Toolbar */}
                                                {allRepos.length > 0 && (
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                                        <div className="relative flex-1 max-w-sm">
                                                            <Search className="w-3.5 h-3.5 text-[#71717A] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                                            <input
                                                                type="text"
                                                                value={repoSearch}
                                                                onChange={(e) => setRepoSearch(e.target.value)}
                                                                placeholder="Filter repositories by name, topic, or stack..."
                                                                className="w-full pl-9 pr-3 py-1.5 rounded-sm bg-[#060709] border border-white/[0.08] focus:border-white/25 focus:outline-none text-xs text-white placeholder-[#555555]"
                                                            />
                                                        </div>
                                                        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                                                            <button
                                                                type="button"
                                                                onClick={() => setRepoLangFilter('all')}
                                                                className={`px-2.5 py-1 rounded-sm border cursor-pointer ${
                                                                    repoLangFilter === 'all'
                                                                        ? 'bg-white text-[#050505] border-white font-semibold'
                                                                        : 'bg-[#060709] border-white/[0.08] text-zinc-400 hover:text-white'
                                                                }`}
                                                            >
                                                                All ({allRepos.length})
                                                            </button>
                                                            {(githubSource.detected_languages || []).slice(0, 6).map((lang) => (
                                                                <button
                                                                    key={lang}
                                                                    type="button"
                                                                    onClick={() => setRepoLangFilter(lang)}
                                                                    className={`px-2.5 py-1 rounded-sm border cursor-pointer ${
                                                                        repoLangFilter === lang
                                                                            ? 'bg-white text-[#050505] border-white font-semibold'
                                                                            : 'bg-[#060709] border-white/[0.08] text-zinc-400 hover:text-white'
                                                                    }`}
                                                                >
                                                                    {lang}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Repositories Grid */}
                                                {filteredRepos.length > 0 ? (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                                                        {filteredRepos.map((repo) => (
                                                            <div
                                                                key={repo.name}
                                                                className="p-4 rounded-sm bg-[#060709] border border-white/[0.08] hover:border-white/20 transition-colors flex flex-col justify-between gap-3"
                                                            >
                                                                <div className="space-y-1.5">
                                                                    <div className="flex items-start justify-between gap-2">
                                                                        <a
                                                                            href={repo.url || '#'}
                                                                            target="_blank"
                                                                            rel="noreferrer"
                                                                            className="text-xs sm:text-[13px] font-semibold text-white hover:underline inline-flex items-center gap-1.5 min-w-0"
                                                                        >
                                                                            <span className="truncate">{repo.name}</span>
                                                                            <ExternalLink className="w-3 h-3 text-[#71717A] shrink-0" />
                                                                        </a>
                                                                        <div className="flex items-center gap-2 text-[10px] text-[#888888] shrink-0">
                                                                            {repo.is_fork && (
                                                                                <span className="px-1.5 py-0.5 rounded-sm bg-white/[0.03] border border-white/[0.06] text-[#71717A]">
                                                                                    Fork
                                                                                </span>
                                                                            )}
                                                                            <span className="inline-flex items-center gap-0.5">
                                                                                <Star className="w-3 h-3 text-zinc-400" />
                                                                                <span>{repo.stars || 0}</span>
                                                                            </span>
                                                                            <span className="inline-flex items-center gap-0.5">
                                                                                <GitFork className="w-3 h-3 text-zinc-400" />
                                                                                <span>{repo.forks || 0}</span>
                                                                            </span>
                                                                        </div>
                                                                    </div>

                                                                    <p className="text-[11px] text-[#888888] leading-relaxed line-clamp-2">
                                                                        {repo.description || 'Public repository without description.'}
                                                                    </p>
                                                                </div>

                                                                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/[0.05] text-[10px]">
                                                                    <div className="flex flex-wrap items-center gap-1.5">
                                                                        {repo.language && (
                                                                            <span className="px-2 py-0.5 rounded-sm bg-white/[0.05] border border-white/[0.1] text-zinc-200">
                                                                                {repo.language}
                                                                            </span>
                                                                        )}
                                                                        {(repo.topics || []).slice(0, 3).map((tp) => (
                                                                            <span
                                                                                key={tp}
                                                                                className="px-1.5 py-0.5 rounded-sm bg-[#111318] border border-white/[0.06] text-[#888888]"
                                                                            >
                                                                                #{tp}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                    {repo.updated_at && (
                                                                        <span className="text-[#71717A]">
                                                                            {formatShortDate(repo.updated_at)}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="p-4 rounded-sm bg-[#060709] border border-white/[0.08] text-xs text-[#888888]">
                                                        {allRepos.length > 0
                                                            ? 'No repositories match that search or language filter.'
                                                            : 'No GitHub repositories loaded yet. Enter your GitHub profile URL below and click Save & Scan.'}
                                                    </div>
                                                )}

                                                {/* Inline GitHub URL Update & Scan */}
                                                <form
                                                    onSubmit={handleUpdateGithubAndScan}
                                                    className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row gap-2"
                                                >
                                                    <input
                                                        type="url"
                                                        value={githubInput}
                                                        onChange={(e) => setGithubInput(e.target.value)}
                                                        placeholder="https://github.com/your-handle"
                                                        className="flex-1 px-3 py-2 rounded-sm bg-[#060709] border border-white/[0.08] focus:border-white/25 focus:outline-none text-xs text-white placeholder-[#555555]"
                                                    />
                                                    <button
                                                        type="submit"
                                                        disabled={savingGithub}
                                                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-sm bg-[#121316] border border-white/15 hover:border-white/30 text-xs text-white transition-colors cursor-pointer disabled:opacity-50 shrink-0"
                                                    >
                                                        <Github className="w-3.5 h-3.5" />
                                                        <span>{savingGithub ? 'Scanning...' : 'Save & Scan GitHub'}</span>
                                                    </button>
                                                </form>
                                            </section>

                                            {/* Structured AI Review specifically for GitHub */}
                                            <StructuredEvaluationView
                                                title="AI Code Portfolio Evaluation"
                                                subtitle="Repository quality, tech stack breadth, and engineering strengths identified on GitHub"
                                                structured={analysis?.github_structured}
                                                rawText={analysis?.github_analysis}
                                                onPracticeTopic={handlePracticeTopic}
                                                modeLabel={githubSource.analysis_mode === 'gemini_ai' ? 'Gemini AI' : 'Structured Audit'}
                                            />
                                        </div>
                                    )}

                                    {/* TAB 4: DETAILED STRUCTURED AI REVIEWS */}
                                    {activeTab === 'reviews' && (
                                        <div className="space-y-5">
                                            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-md bg-[#0D0F14] border border-white/[0.08]">
                                                <div className="text-xs text-[#888888]">
                                                    All Gemini API evaluations parsed cleanly into Executive Takeaways, Strengths, Gaps, and Suggestions.
                                                </div>
                                                <div className="flex flex-wrap items-center gap-1.5">
                                                    {[
                                                        { id: 'all', label: 'All Reviews (3)' },
                                                        { id: 'summary', label: 'Synthesis' },
                                                        { id: 'resume', label: 'Resume AI' },
                                                        { id: 'github', label: 'GitHub AI' },
                                                    ].map((scope) => (
                                                        <button
                                                            key={scope.id}
                                                            type="button"
                                                            onClick={() => setReviewScope(scope.id)}
                                                            className={`px-2.5 py-1 rounded-sm text-[11px] border cursor-pointer ${
                                                                reviewScope === scope.id
                                                                    ? 'bg-white text-[#050505] border-white font-semibold'
                                                                    : 'bg-[#060709] border-white/[0.08] text-zinc-400 hover:text-white'
                                                            }`}
                                                        >
                                                            {scope.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {(reviewScope === 'all' || reviewScope === 'summary') && (
                                                <StructuredEvaluationView
                                                    title="Synthesized Candidate Readiness"
                                                    subtitle="How SkillForge merges Resume credentials and GitHub code proof"
                                                    structured={analysis?.summary_structured}
                                                    rawText={analysis?.partial_summary}
                                                    onPracticeTopic={handlePracticeTopic}
                                                    modeLabel="Combined Synthesis"
                                                />
                                            )}

                                            {(reviewScope === 'all' || reviewScope === 'resume') && (
                                                <StructuredEvaluationView
                                                    title="AI Resume Evaluation"
                                                    subtitle={resumeSource.filename ? `Source: ${resumeSource.filename}` : 'Source: Profile summary'}
                                                    structured={analysis?.resume_structured}
                                                    rawText={analysis?.resume_analysis}
                                                    onPracticeTopic={handlePracticeTopic}
                                                    modeLabel={resumeSource.analysis_mode === 'gemini_ai' ? 'Gemini AI' : 'Structured Audit'}
                                                />
                                            )}

                                            {(reviewScope === 'all' || reviewScope === 'github') && (
                                                <StructuredEvaluationView
                                                    title="AI GitHub Portfolio Evaluation"
                                                    subtitle={githubSource.username ? `Source: github.com/${githubSource.username}` : 'Source: GitHub repositories'}
                                                    structured={analysis?.github_structured}
                                                    rawText={analysis?.github_analysis}
                                                    onPracticeTopic={handlePracticeTopic}
                                                    modeLabel={githubSource.analysis_mode === 'gemini_ai' ? 'Gemini AI' : 'Structured Audit'}
                                                />
                                            )}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </main>

                    <footer className="w-full border-t border-white/[0.06] bg-[#060709] text-xs text-[#71717A] font-mono py-4 relative z-10">
                        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
                            <div>SkillForge Candidate Hub &copy; {new Date().getFullYear()}</div>
                            <div className="text-[11px]">Transparent AI Provenance &amp; Domain Audit</div>
                        </div>
                    </footer>
                </div>
            </div>
        </StudioNoise>
    );
};

export default AiAnalysisPage;
