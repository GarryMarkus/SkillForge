import React, { useState, useEffect, useCallback, useRef } from 'react';
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
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import api, { extractApiErrorMessage } from '../../api/client';
import StudioNoise from '../../components/ui/animations/StudioNoise';
import StudentSidebar from '../../components/student/StudentSidebar';
import StudentHeader from '../../components/student/StudentHeader';

const STATUS_BADGES = {
    analyzed_pdf: {
        label: 'PDF Text Parsed',
        className: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
    },
    analyzed_live: {
        label: 'Live GitHub API',
        className: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
    },
    analyzed_fallback: {
        label: 'Fallback Sample Used',
        className: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    },
    profile_fallback: {
        label: 'Profile Summary Only',
        className: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    },
    pending_scan: {
        label: 'Pending AI Scan',
        className: 'bg-white/[0.05] border-white/15 text-zinc-300',
    },
    missing: {
        label: 'Not Connected',
        className: 'bg-rose-500/10 border-rose-500/30 text-rose-300',
    },
};

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
                setToastBanner({
                    type: 'success',
                    text: 'AI analysis refreshed from your latest Resume PDF and GitHub repositories.',
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
                setToastBanner({
                    type: 'success',
                    text: 'GitHub profile saved and repositories scanned cleanly.',
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
                    text: `Parsed "${file.name}" and updated your AI resume analysis.`,
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

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const candidateName =
        analysis?.profile_inputs?.full_name ||
        user?.full_name ||
        user?.email?.split('@')[0] ||
        'Candidate';

    const resumeSource = analysis?.resume_source || {};
    const githubSource = analysis?.github_source || {};
    const assessmentDone = Boolean(analysis?.assessment_completed);
    const skillScore = Number(analysis?.skill_test_score || 0);
    const starRating = Number(analysis?.star_rating || 0);
    const finalData = analysis?.final_analysis || {};
    const finalStrengths = Array.isArray(finalData?.strengths) ? finalData.strengths : [];
    const finalWeaknesses = Array.isArray(finalData?.weaknesses) ? finalData.weaknesses : [];

    const resumeBadge = STATUS_BADGES[resumeSource.status || 'missing'] || STATUS_BADGES.missing;
    const githubBadge = STATUS_BADGES[githubSource.status || 'missing'] || STATUS_BADGES.missing;

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
                                        <ScanSearch className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
                                    </div>
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2.5">
                                            <h1 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
                                                AI Analysis &amp; Source Audit
                                            </h1>
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-white/[0.04] border border-white/[0.08] text-zinc-300 text-[11px]">
                                                <Clock className="w-3 h-3 text-[#888888]" aria-hidden="true" />
                                                <span>{formatDateTime(analysis?.generated_at)}</span>
                                            </span>
                                        </div>
                                        <p className="text-xs text-[#888888] mt-1">
                                            Full transparency into the Resume PDF text and GitHub repositories evaluated by SkillForge AI.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-2.5">
                                    <button
                                        type="button"
                                        onClick={() => navigate('/student/onboarding')}
                                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-[#121316] border border-white/10 hover:border-white/25 text-xs text-[#E4E4E7] hover:text-white transition-colors cursor-pointer"
                                    >
                                        <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                                        <span>Edit Profile Inputs</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleRefreshAnalysis}
                                        disabled={refreshing || loading}
                                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
                                    >
                                        <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} strokeWidth={2} aria-hidden="true" />
                                        <span>{refreshing ? 'Analyzing Sources...' : 'Re-run AI Analysis'}</span>
                                    </button>
                                </div>
                            </section>

                            {/* 3-Step Transparency Pipeline Overview */}
                            <section className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                                <div className="p-4 rounded-md bg-[#0D0F14] border border-white/[0.08] flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-9 h-9 rounded-sm bg-[#060709] border border-white/[0.08] flex items-center justify-center shrink-0">
                                            <FileCheck2 className={`w-4 h-4 ${resumeSource.has_file ? 'text-emerald-400' : 'text-zinc-400'}`} aria-hidden="true" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-[10px] text-[#71717A] uppercase">Source 01 · Resume</div>
                                            <div className="text-xs font-semibold text-white truncate">
                                                {resumeSource.filename || (resumeSource.matched_skills?.length ? 'Profile Skills Active' : 'No Resume Uploaded')}
                                            </div>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded-sm border text-[10px] shrink-0 ${resumeBadge.className}`}>
                                        {resumeBadge.label}
                                    </span>
                                </div>

                                <div className="p-4 rounded-md bg-[#0D0F14] border border-white/[0.08] flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-9 h-9 rounded-sm bg-[#060709] border border-white/[0.08] flex items-center justify-center shrink-0">
                                            <Github className={`w-4 h-4 ${githubSource.has_github ? 'text-emerald-400' : 'text-zinc-400'}`} aria-hidden="true" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-[10px] text-[#71717A] uppercase">Source 02 · GitHub</div>
                                            <div className="text-xs font-semibold text-white truncate">
                                                {githubSource.username ? `@${githubSource.username} (${githubSource.repos?.length || githubSource.public_repos || 0} repos)` : 'Not Linked'}
                                            </div>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded-sm border text-[10px] shrink-0 ${githubBadge.className}`}>
                                        {githubBadge.label}
                                    </span>
                                </div>

                                <div className="p-4 rounded-md bg-[#0D0F14] border border-white/[0.08] flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-9 h-9 rounded-sm bg-[#060709] border border-white/[0.08] flex items-center justify-center shrink-0">
                                            <ShieldCheck className={`w-4 h-4 ${assessmentDone ? 'text-emerald-400' : 'text-amber-300'}`} aria-hidden="true" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-[10px] text-[#71717A] uppercase">Stage 03 · Verification</div>
                                            <div className="text-xs font-semibold text-white truncate">
                                                {assessmentDone ? `${Math.round(skillScore)}% Skill Score` : 'Assessment Pending'}
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

                            {loading ? (
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                                    <div className="h-96 rounded-md bg-[#0D0F14] border border-white/[0.08] animate-pulse" />
                                    <div className="h-96 rounded-md bg-[#0D0F14] border border-white/[0.08] animate-pulse" />
                                </div>
                            ) : (
                                <>
                                    {/* Two-Column Source Provenance Grid */}
                                    <section className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                                        {/* CARD A: RESUME PDF TRANSPARENCY */}
                                        <div className="rounded-md bg-[#0D0F14] border border-white/[0.08] border-t-white/15 p-5 sm:p-6 flex flex-col justify-between gap-5">
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-sm bg-[#111318] border border-white/[0.08] flex items-center justify-center">
                                                            <FileCheck2 className="w-4 h-4 text-white" aria-hidden="true" />
                                                        </div>
                                                        <div>
                                                            <h2 className="font-display font-bold text-base text-white">
                                                                Resume PDF Evidence
                                                            </h2>
                                                            <p className="text-[11px] text-[#888888]">
                                                                {resumeSource.filename
                                                                    ? `${resumeSource.filename} (${resumeSource.extracted_chars || 0} chars extracted)`
                                                                    : 'Upload a PDF resume for full text inspection'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span className={`px-2.5 py-0.5 rounded-sm border text-[11px] ${resumeBadge.className}`}>
                                                        {resumeBadge.label}
                                                    </span>
                                                </div>

                                                {/* Quick Extracted Telemetry Stats */}
                                                <div className="grid grid-cols-3 gap-2.5 text-xs">
                                                    <div className="p-2.5 rounded-sm bg-[#060709] border border-white/[0.06]">
                                                        <div className="text-[10px] text-[#71717A] uppercase">PDF Status</div>
                                                        <div className="text-zinc-200 font-semibold mt-0.5">
                                                            {resumeSource.has_file ? 'Uploaded' : 'None'}
                                                        </div>
                                                    </div>
                                                    <div className="p-2.5 rounded-sm bg-[#060709] border border-white/[0.06]">
                                                        <div className="text-[10px] text-[#71717A] uppercase">Chars Read</div>
                                                        <div className="text-zinc-200 font-semibold mt-0.5">
                                                            {Number(resumeSource.extracted_chars || 0).toLocaleString()}
                                                        </div>
                                                    </div>
                                                    <div className="p-2.5 rounded-sm bg-[#060709] border border-white/[0.06]">
                                                        <div className="text-[10px] text-[#71717A] uppercase">Analyzer</div>
                                                        <div className="text-zinc-200 font-semibold mt-0.5 truncate">
                                                            {resumeSource.analysis_mode === 'gemini_ai'
                                                                ? 'Gemini AI'
                                                                : resumeSource.analysis_mode === 'fallback_heuristic'
                                                                ? 'Fallback Mode'
                                                                : 'Stored'}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Extracted Snippet Box */}
                                                <div className="space-y-1.5">
                                                    <div className="text-[11px] uppercase tracking-wider text-zinc-400">
                                                        Extracted Text Read by AI
                                                    </div>
                                                    {resumeSource.extracted_preview ? (
                                                        <div className="p-3 rounded-sm bg-[#060709] border border-white/[0.08] text-[11px] text-zinc-300 leading-relaxed max-h-36 overflow-y-auto whitespace-pre-wrap">
                                                            &ldquo;{resumeSource.extracted_preview}&rdquo;
                                                        </div>
                                                    ) : (
                                                        <div className="p-3 rounded-sm bg-[#060709] border border-white/[0.08] text-[11px] text-[#888888] leading-relaxed">
                                                            {resumeSource.has_file
                                                                ? 'Resume PDF is stored. Click "Re-run AI Analysis" above to inspect its parsed text snippet.'
                                                                : 'No PDF resume is attached yet — currently using your profile bio and skill tags for estimation.'}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Skills Extracted From Resume / Profile */}
                                                {Array.isArray(resumeSource.matched_skills) && resumeSource.matched_skills.length > 0 && (
                                                    <div className="space-y-1.5">
                                                        <div className="text-[11px] uppercase tracking-wider text-zinc-400">
                                                            Detected Resume Skills
                                                        </div>
                                                        <div className="flex flex-wrap gap-1.5">
                                                            {resumeSource.matched_skills.map((skill) => (
                                                                <span
                                                                    key={skill}
                                                                    className="px-2 py-0.5 rounded-sm bg-white/[0.04] border border-white/[0.08] text-[11px] text-zinc-200"
                                                                >
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* AI Review Output */}
                                                <div className="space-y-1.5">
                                                    <div className="text-[11px] uppercase tracking-wider text-zinc-400">
                                                        AI Resume Evaluation
                                                    </div>
                                                    <div className="p-3.5 rounded-sm bg-[#111318] border border-white/[0.08] text-xs text-zinc-200 leading-relaxed whitespace-pre-line">
                                                        {analysis?.resume_analysis || 'No AI resume review generated yet. Click "Re-run AI Analysis" to evaluate.'}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Quick PDF Upload Trigger */}
                                            <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
                                                <input
                                                    ref={resumeFileInputRef}
                                                    type="file"
                                                    accept=".pdf,application/pdf"
                                                    onChange={handleQuickResumeUpload}
                                                    className="hidden"
                                                />
                                                <span className="text-[11px] text-[#71717A]">
                                                    Supports genuine .pdf up to 5MB
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => resumeFileInputRef.current?.click()}
                                                    disabled={uploadingResume}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#121316] border border-white/15 hover:border-white/30 text-xs text-white transition-colors cursor-pointer disabled:opacity-50"
                                                >
                                                    <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                                                    <span>{uploadingResume ? 'Parsing PDF...' : resumeSource.has_file ? 'Replace PDF & Scan' : 'Upload PDF & Scan'}</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* CARD B: GITHUB REPOSITORY TRANSPARENCY */}
                                        <div className="rounded-md bg-[#0D0F14] border border-white/[0.08] border-t-white/15 p-5 sm:p-6 flex flex-col justify-between gap-5">
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
                                                    <div className="flex items-center gap-3 min-w-0">
                                                        <div className="w-9 h-9 rounded-sm bg-[#111318] border border-white/[0.08] flex items-center justify-center shrink-0">
                                                            <Code2 className="w-4 h-4 text-white" aria-hidden="true" />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <h2 className="font-display font-bold text-base text-white">
                                                                GitHub Repository Audit
                                                            </h2>
                                                            <p className="text-[11px] text-[#888888] truncate">
                                                                {githubSource.username ? (
                                                                    <a
                                                                        href={githubSource.github_url || `https://github.com/${githubSource.username}`}
                                                                        target="_blank"
                                                                        rel="noreferrer"
                                                                        className="inline-flex items-center gap-1 hover:text-white underline underline-offset-2"
                                                                    >
                                                                        <span>github.com/{githubSource.username}</span>
                                                                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                                                                    </a>
                                                                ) : (
                                                                    'Link your GitHub handle to scan public repos'
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span className={`px-2.5 py-0.5 rounded-sm border text-[11px] shrink-0 ${githubBadge.className}`}>
                                                        {githubBadge.label}
                                                    </span>
                                                </div>

                                                {/* Honest Notice when GitHub API fell back to mock */}
                                                {githubSource.is_mock && (
                                                    <div className="p-3 rounded-sm bg-amber-500/10 border border-amber-500/25 flex items-start gap-2.5 text-[11px] text-amber-200">
                                                        <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" aria-hidden="true" />
                                                        <div>
                                                            <div className="font-semibold">GitHub API Fallback Active</div>
                                                            <div className="text-amber-200/80 mt-0.5">
                                                                Live GitHub API could not return repositories ({githubSource.fallback_reason || 'rate-limited or handle not found'}), so SkillForge transparently evaluated safe fallback portfolio signals.
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Languages Detected */}
                                                {Array.isArray(githubSource.detected_languages) && githubSource.detected_languages.length > 0 && (
                                                    <div className="space-y-1.5">
                                                        <div className="text-[11px] uppercase tracking-wider text-zinc-400">
                                                            Languages Observed Across Repos
                                                        </div>
                                                        <div className="flex flex-wrap gap-1.5">
                                                            {githubSource.detected_languages.map((lang) => (
                                                                <span
                                                                    key={lang}
                                                                    className="px-2 py-0.5 rounded-sm bg-white/[0.05] border border-white/[0.1] text-[11px] text-white"
                                                                >
                                                                    {lang}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Inspected Repositories List */}
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-zinc-400">
                                                        <span>Inspected Repositories</span>
                                                        <span>{githubSource.repos?.length || 0} shown</span>
                                                    </div>

                                                    {Array.isArray(githubSource.repos) && githubSource.repos.length > 0 ? (
                                                        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                                                            {githubSource.repos.map((repo) => (
                                                                <div
                                                                    key={repo.name}
                                                                    className="p-3 rounded-sm bg-[#060709] border border-white/[0.08] flex flex-col gap-1"
                                                                >
                                                                    <div className="flex items-center justify-between gap-2">
                                                                        <a
                                                                            href={repo.url || '#'}
                                                                            target="_blank"
                                                                            rel="noreferrer"
                                                                            className="text-xs font-semibold text-white hover:underline inline-flex items-center gap-1 truncate"
                                                                        >
                                                                            <span className="truncate">{repo.name}</span>
                                                                            <ExternalLink className="w-3 h-3 text-[#71717A] shrink-0" aria-hidden="true" />
                                                                        </a>
                                                                        <div className="flex items-center gap-2 text-[10px] text-[#888888] shrink-0">
                                                                            {repo.language && (
                                                                                <span className="px-1.5 py-0.5 rounded-sm bg-white/[0.04] border border-white/[0.08] text-zinc-300">
                                                                                    {repo.language}
                                                                                </span>
                                                                            )}
                                                                            <span className="inline-flex items-center gap-0.5">
                                                                                <Star className="w-3 h-3 text-zinc-400" aria-hidden="true" />
                                                                                <span>{repo.stars || 0}</span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    {repo.description && (
                                                                        <p className="text-[11px] text-[#888888] line-clamp-2">
                                                                            {repo.description}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="p-3 rounded-sm bg-[#060709] border border-white/[0.08] text-[11px] text-[#888888]">
                                                            {githubSource.has_github
                                                                ? 'GitHub URL is linked — click "Re-run AI Analysis" above or update below to inspect public repositories.'
                                                                : 'No GitHub URL connected yet. Add your GitHub profile below to scan your code repositories.'}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* AI GitHub Review Output */}
                                                <div className="space-y-1.5">
                                                    <div className="text-[11px] uppercase tracking-wider text-zinc-400">
                                                        AI Code Portfolio Evaluation
                                                    </div>
                                                    <div className="p-3.5 rounded-sm bg-[#111318] border border-white/[0.08] text-xs text-zinc-200 leading-relaxed whitespace-pre-line">
                                                        {analysis?.github_analysis || 'No GitHub review generated yet.'}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Quick Inline GitHub URL Update & Scan */}
                                            <form
                                                onSubmit={handleUpdateGithubAndScan}
                                                className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row gap-2"
                                            >
                                                <input
                                                    type="url"
                                                    value={githubInput}
                                                    onChange={(e) => setGithubInput(e.target.value)}
                                                    placeholder="https://github.com/your-handle"
                                                    className="flex-1 px-3 py-1.5 rounded-sm bg-[#060709] border border-white/[0.08] focus:border-white/25 focus:outline-none text-xs text-white placeholder-[#555555]"
                                                />
                                                <button
                                                    type="submit"
                                                    disabled={savingGithub}
                                                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-[#121316] border border-white/15 hover:border-white/30 text-xs text-white transition-colors cursor-pointer disabled:opacity-50 shrink-0"
                                                >
                                                    <Github className="w-3.5 h-3.5" aria-hidden="true" />
                                                    <span>{savingGithub ? 'Scanning...' : 'Save & Scan GitHub'}</span>
                                                </button>
                                            </form>
                                        </div>
                                    </section>

                                    {/* Combined AI Synthesis + Skill Test Audit */}
                                    <section className="rounded-md bg-[#111318] border border-white/[0.08] border-t-white/15 p-5 sm:p-6 space-y-5">
                                        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-sm bg-[#060709] border border-white/[0.08] flex items-center justify-center">
                                                    <Cpu className="w-4 h-4 text-white" aria-hidden="true" />
                                                </div>
                                                <div>
                                                    <h2 className="font-display font-bold text-base text-white">
                                                        Synthesized Readiness &amp; Assessment Tie-In
                                                    </h2>
                                                    <p className="text-[11px] text-[#888888]">
                                                        How SkillForge combines Resume + GitHub signals with your verified test performance
                                                    </p>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => navigate('/student/jobs')}
                                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold text-xs transition-colors cursor-pointer"
                                            >
                                                <span>View Matched Jobs</span>
                                                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                                            </button>
                                        </div>

                                        {analysis?.partial_summary && (
                                            <div className="p-4 rounded-sm bg-[#060709] border border-white/[0.08] text-xs text-zinc-200 leading-relaxed whitespace-pre-line">
                                                {analysis.partial_summary}
                                            </div>
                                        )}

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                            {/* Verified Strengths */}
                                            <div className="p-4 rounded-sm bg-[#0D0F14] border border-white/[0.08] space-y-2.5">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="inline-flex items-center gap-1.5 font-semibold text-white">
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                                                        <span>Verified Strengths</span>
                                                    </span>
                                                    {starRating > 0 && (
                                                        <span className="text-[11px] text-zinc-300">
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
                                                    <p className="text-xs text-[#888888]">
                                                        {assessmentDone
                                                            ? 'Assessment score recorded. Re-run final synthesis via your next assessment attempt.'
                                                            : 'Complete the practical Skill Assessment so AI can cross-verify your Resume & GitHub claims with empirical test metrics.'}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Focus Areas -> Click to Upskill */}
                                            <div className="p-4 rounded-sm bg-[#0D0F14] border border-white/[0.08] space-y-2.5">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="inline-flex items-center gap-1.5 font-semibold text-white">
                                                        <Sparkles className="w-4 h-4 text-zinc-300" aria-hidden="true" />
                                                        <span>Growth Focus Areas</span>
                                                    </span>
                                                    <span className="text-[11px] text-[#71717A]">Click to study</span>
                                                </div>

                                                {finalWeaknesses.length > 0 ? (
                                                    <div className="flex flex-wrap gap-2">
                                                        {finalWeaknesses.map((w, idx) => (
                                                            <button
                                                                key={idx}
                                                                type="button"
                                                                onClick={() => navigate(`/student/upskill?topic=${encodeURIComponent(w)}`)}
                                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#060709] hover:bg-[#181B22] border border-white/[0.1] hover:border-white/25 text-xs text-zinc-200 hover:text-white cursor-pointer transition-colors"
                                                            >
                                                                <BookOpen className="w-3.5 h-3.5 text-[#888888]" aria-hidden="true" />
                                                                <span>{w}</span>
                                                                <ArrowUpRight className="w-3 h-3 text-[#71717A]" aria-hidden="true" />
                                                            </button>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#888888]">
                                                        <span>Take an adaptive skill test to pinpoint targeted learning modules.</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => navigate('/student/assessment')}
                                                            className="text-white hover:underline cursor-pointer"
                                                        >
                                                            Launch Assessment &rarr;
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </section>
                                </>
                            )}

                        </div>
                    </main>

                    <footer className="w-full border-t border-white/[0.06] bg-[#060709] text-xs text-[#71717A] font-mono py-4 relative z-10">
                        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
                            <div>SkillForge Candidate Hub &copy; {new Date().getFullYear()}</div>
                            <div className="text-[11px]">Transparent AI Provenance &amp; Audit</div>
                        </div>
                    </footer>
                </div>
            </div>
        </StudioNoise>
    );
};

export default AiAnalysisPage;
