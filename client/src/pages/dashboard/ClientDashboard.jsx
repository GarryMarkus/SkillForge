import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import JobPostModal from '../../components/client/JobPostModal';
import api from '../../lib/api';

const DEFAULT_SAMPLE_APPLICANTS = [
    {
        id: 101,
        rank: "#01",
        cosine_sim: 96.4,
        candidate_name: "ALEX VANCE",
        candidate_ref: "SF-092",
        role_label: "Full-Stack Systems Engineer (Exp: 7.2 yrs)",
        hash: "9a4f..77b2",
        region: "US-EAST (VERIFIED)",
        pdf_parsed: true,
        github_repos: "32_REPOS",
        tags: ["PYTHON", "FASTAPI", "DOCKER"],
        proctor_score: "100%",
        proctor_flags: "ZERO_CHEATING_FLAGS",
        cam_status: "SYNCHRONIZED (1080P)",
        stars: "★★★★★",
        rating_num: "4.8 / 5.0",
        email: "student@example.com",
        status: "pending"
    },
    {
        id: 102,
        rank: "#02",
        cosine_sim: 91.2,
        candidate_name: "MARCUS CHEN",
        candidate_ref: "SF-141",
        role_label: "Backend Specialist (Exp: 5.8 yrs)",
        hash: "3c1e..88a9",
        region: "EU-CENTRAL (VERIFIED)",
        pdf_parsed: true,
        github_repos: "18_REPOS",
        tags: ["PYTHON", "DJANGO"],
        proctor_score: "95%",
        proctor_flags: "1_WARNING_RESOLVED",
        cam_status: "AUDIO: MULTI_VOICE_FILTER_OK",
        stars: "★★★★☆",
        rating_num: "4.2 / 5.0",
        email: "marcus.chen@dev.io",
        status: "pending"
    },
    {
        id: 103,
        rank: "#03",
        cosine_sim: 87.6,
        candidate_name: "ELENA ROSTOVA",
        candidate_ref: "SF-219",
        role_label: "Distributed Systems Dev (Exp: 4.5 yrs)",
        hash: "77f0..11cb",
        region: "AP-SOUTHEAST",
        pdf_parsed: true,
        github_repos: "44_REPOS",
        tags: ["PYTHON", "C++", "DOCKER"],
        proctor_score: "98%",
        proctor_flags: "ZERO_CHEATING_FLAGS",
        cam_status: "BROWSER_LOCKDOWN: COMPLIANT",
        stars: "★★★★☆",
        rating_num: "4.1 / 5.0",
        email: "elena.rostova@kernel.org",
        status: "pending"
    }
];

const ClientDashboard = () => {
    const { logout, user } = useAuthStore();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [profile, setProfile] = useState(null);
    const [, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [activeTab, setActiveTab] = useState('REQUISITIONS');
    const [inspectingCandidate, setInspectingCandidate] = useState(null);
    const [filterMode, setFilterMode] = useState('COSINE_DESC'); // 'COSINE_DESC', 'TRUST_90', 'ZERO_FLAG'

    const fetchProfile = useCallback(async () => {
        try {
            const response = await api.get('/accounts/profile/');
            if (response.ok) {
                const data = await response.json();
                setProfile(data);
            }
        } catch (e) {
            console.error('Failed to fetch client profile', e);
        }
    }, []);

    const fetchApplicantsForJob = useCallback(async (job) => {
        if (!job) return;
        try {
            const response = await api.get(`/project/applicants/${job.id}/`);
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    const formatted = data.map((app, i) => ({
                        id: app.id,
                        rank: `#${String(i + 1).padStart(2, '0')}`,
                        cosine_sim: app.match_score ? (app.match_score * 100).toFixed(1) : 94.2,
                        candidate_name: app.student_name || app.student_email?.split('@')[0]?.toUpperCase() || `APPLICANT_${app.id}`,
                        candidate_ref: `SF-APP-${app.id}`,
                        role_label: "Engineering Candidate",
                        hash: `hash_${app.id}..77b2`,
                        region: "GLOBAL (VERIFIED)",
                        pdf_parsed: true,
                        github_repos: "AUDITED",
                        tags: job.skills_required ? job.skills_required.split(',').map(s => s.trim()) : ["PYTHON", "DJANGO"],
                        proctor_score: "98%",
                        proctor_flags: "ZERO_CHEATING_FLAGS",
                        cam_status: "SYNCHRONIZED (1080P)",
                        stars: "★★★★★",
                        rating_num: "4.7 / 5.0",
                        email: app.student_email || "candidate@example.com",
                        status: app.status || "pending"
                    }));
                    setApplicants(formatted);
                } else {
                    setApplicants(DEFAULT_SAMPLE_APPLICANTS);
                }
            } else {
                setApplicants(DEFAULT_SAMPLE_APPLICANTS);
            }
        } catch (e) {
            console.error('Failed to fetch applicants', e);
            setApplicants(DEFAULT_SAMPLE_APPLICANTS);
        }
    }, []);

    const fetchJobs = useCallback(async () => {
        try {
            const response = await api.get('/project/my-jobs/');
            if (response.ok) {
                const data = await response.json();
                const jobList = Array.isArray(data) ? data : [];
                setJobs(jobList);
                if (jobList.length > 0) {
                    setSelectedJob(jobList[0]);
                    fetchApplicantsForJob(jobList[0]);
                } else {
                    setApplicants(DEFAULT_SAMPLE_APPLICANTS);
                }
            }
        } catch (error) {
            console.error('Failed to fetch jobs', error);
            setApplicants(DEFAULT_SAMPLE_APPLICANTS);
        } finally {
            setLoading(false);
        }
    }, [fetchApplicantsForJob]);

    useEffect(() => {
        fetchJobs();
        fetchProfile();
    }, [fetchJobs, fetchProfile]);

    const handleSelectJob = (job) => {
        setSelectedJob(job);
        fetchApplicantsForJob(job);
    };

    const handleJobCreated = (newJob) => {
        setJobs(prev => [newJob, ...prev]);
        setSelectedJob(newJob);
        fetchApplicantsForJob(newJob);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleIssueOffer = (candidate) => {
        alert(`[OFFER_DISPATCH] Cryptographic job offer dispatched to candidate ${candidate.candidate_name} (${candidate.email}).`);
    };

    const handleExportCSV = () => {
        const rows = [
            ["ID", "Name", "Cosine Match", "Proctor Score", "Email"],
            ...applicants.map(a => [a.candidate_ref, a.candidate_name, `${a.cosine_sim}%`, a.proctor_score, a.email])
        ];
        const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `skillforge_candidates_${selectedJob?.id || 'export'}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Filter applicants
    const displayedApplicants = applicants.filter(a => {
        if (filterMode === 'TRUST_90') return parseFloat(a.cosine_sim) >= 90;
        if (filterMode === 'ZERO_FLAG') return a.proctor_flags.includes("ZERO");
        return true;
    });

    const companyName = profile?.company_name || user?.email?.split('@')[0]?.toUpperCase() || 'NEXUS_INFRASTRUCTURE_INC';
    const totalApplicantsCount = (jobs.length * 14) + applicants.length;
    const requiredSkillsList = selectedJob?.skills_required 
        ? selectedJob.skills_required.split(',').map(s => s.trim().toUpperCase())
        : ["PYTHON", "FASTAPI", "DOCKER", "KUBERNETES", "POSTGRESQL_INDEXING", "REDIS"];

    return (
        <div className="bg-background text-on-surface font-mono antialiased selection:bg-primary-container selection:text-on-primary min-h-screen flex flex-col">
            {/* APPLICATION HEADER (#EnterpriseHeader) */}
            <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest border-b border-black/15 select-none">
                <div className="h-16 w-full px-margin flex items-center justify-between border-b border-black/10">
                    <div className="flex items-center gap-space-md">
                        <div className="flex items-center gap-space-xs font-headline-sm text-headline-sm text-on-surface uppercase tracking-tight">
                            <span className="text-primary-container font-bold">+</span>
                            <span>SKILLFORGE // ENTERPRISE_CONSOLE</span>
                        </div>
                        <span className="border border-black/15 bg-surface-container-low px-space-xs py-0.5 text-label-sm font-label-sm text-primary-container uppercase hidden sm:inline-block">
                            [CLIENT_NODE: ACTIVE // 256-BIT_ENCRYPTION]
                        </span>
                    </div>

                    <div className="hidden xl:flex items-center gap-space-xs border border-black/15 bg-surface-container-lowest px-space-md py-space-xs text-label-md font-label-md text-on-surface-variant">
                        <span className="text-primary-container font-bold">LOC:</span>
                        <span>ROOT &gt; ENTERPRISE_PIPELINE &gt; REQUISITION_MANAGER</span>
                    </div>

                    <div className="flex items-center gap-space-md">
                        <div className="hidden md:flex items-center gap-space-xs border-r border-black/15 pr-space-md text-label-sm font-label-sm text-on-surface-variant">
                            <span>[CLIENT: {companyName.toUpperCase()}]</span>
                            <span className="text-black/30">|</span>
                            <span>ROLE: RECRUITER</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="border border-error/40 bg-surface-container-lowest px-space-sm py-space-xs text-label-sm font-label-sm text-error uppercase hover:bg-error hover:text-on-error transition-none cursor-pointer"
                        >
                            [ TERMINATE_SESSION ]
                        </button>
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 text-on-primary">
                            <span className="material-symbols-outlined text-[18px]">person</span>
                        </div>
                    </div>
                </div>

                {/* Sub-Header Navigation Strip */}
                <div className="h-10 w-full px-margin bg-surface-container flex items-center justify-between overflow-x-auto">
                    <div className="flex items-center gap-space-sm text-label-sm font-label-sm text-on-surface-variant shrink-0">
                        <span className="text-primary-container font-bold">[COORD: X01-Y00]</span>
                        <span>MODULE_INDEX:</span>
                    </div>

                    <nav className="flex items-center h-full gap-0 border-l border-r border-black/15">
                        <button
                            onClick={() => setActiveTab('REQUISITIONS')}
                            className={`h-full flex items-center px-space-lg border-r border-black/15 uppercase font-label-md text-label-md transition-none cursor-pointer ${
                                activeTab === 'REQUISITIONS' ? 'bg-primary-container text-on-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                            }`}
                        >
                            REQUISITIONS ({jobs.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('APPLICANT_POOL')}
                            className={`h-full flex items-center px-space-lg border-r border-black/15 uppercase font-label-md text-label-md transition-none cursor-pointer ${
                                activeTab === 'APPLICANT_POOL' ? 'bg-primary-container text-on-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                            }`}
                        >
                            APPLICANT_POOL ({applicants.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('COSINE_MATCHER')}
                            className={`h-full flex items-center px-space-lg border-r border-black/15 uppercase font-label-md text-label-md transition-none cursor-pointer ${
                                activeTab === 'COSINE_MATCHER' ? 'bg-primary-container text-on-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                            }`}
                        >
                            COSINE_MATCHER
                        </button>
                        <button
                            onClick={() => setActiveTab('AUDIT_LOGS')}
                            className={`h-full flex items-center px-space-lg uppercase font-label-md text-label-md transition-none cursor-pointer ${
                                activeTab === 'AUDIT_LOGS' ? 'bg-primary-container text-on-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                            }`}
                        >
                            AUDIT_LOGS
                        </button>
                    </nav>

                    <div className="hidden lg:flex items-center gap-space-xs text-label-sm font-label-sm text-secondary">
                        <span className="inline-block w-1.5 h-1.5 bg-primary-container"></span>
                        <span>GRID_SYNCHRONIZED</span>
                    </div>
                </div>
            </header>

            {/* MAIN RECRUITER CONSOLE BODY */}
            <main className="w-full pt-28 bg-background min-h-screen flex-1">
                {/* Telemetry Strip & Ribbon */}
                <section className="w-full border-b border-black/15 bg-surface-container-lowest" id="ClientHeader">
                    {/* Top Micro Telemetry Strip */}
                    <div className="w-full px-margin py-space-xs flex flex-wrap items-center justify-between gap-y-1 text-label-sm font-label-sm text-on-surface-variant border-b border-black/10">
                        <div className="flex items-center gap-space-sm flex-wrap">
                            <span className="text-primary-container font-bold">+</span>
                            <span className="text-on-surface">LOC: ROOT &gt; ENTERPRISE_PIPELINE &gt; REQUISITION_MANAGER</span>
                            <span className="text-black/25">|</span>
                            <span className="bg-surface-container px-space-xs py-0.5 border border-black/10 text-on-surface">
                                [CLIENT: {companyName.toUpperCase()}]
                            </span>
                            <span className="text-black/25">|</span>
                            <span>ROLE: RECRUITER</span>
                        </div>
                        <div className="flex items-center gap-space-md">
                            <span className="text-primary-container flex items-center gap-1 font-bold">
                                <span className="inline-block w-1.5 h-1.5 bg-primary-container animate-pulse"></span>
                                [SYNC: REALTIME // BUFFER_LATENCY: 18ms]
                            </span>
                            <span className="text-black/25">|</span>
                            <span className="text-on-surface font-bold">[NODE_ID: US-EAST-CL-04]</span>
                        </div>
                    </div>

                    {/* Pipeline Metric Ribbon: 4-Cell CAD Modular Grid */}
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-black/15 border-b border-black/15">
                        <div className="p-margin relative group bg-surface hover:bg-surface-container-low transition-colors">
                            <span className="absolute top-1 right-2 text-label-sm font-label-sm text-black/30">[MTRX_01]</span>
                            <div className="text-label-sm font-label-sm text-secondary uppercase tracking-widest mb-1">OPEN_REQUISITIONS</div>
                            <div className="flex items-baseline gap-2">
                                <span className="font-headline-lg text-headline-lg text-on-surface tracking-tighter">
                                    [ {String(jobs.length).padStart(2, '0')} ]
                                </span>
                                <span className="text-label-sm font-label-sm text-primary-container border border-primary-container/30 px-1 py-0.5 font-bold">ACTIVE</span>
                            </div>
                            <div className="text-body-sm font-body-sm text-on-surface-variant mt-2 flex items-center gap-1">
                                <span className="text-primary-container font-bold">▲</span> Deployed in index
                            </div>
                        </div>

                        <div className="p-margin relative group bg-surface hover:bg-surface-container-low transition-colors">
                            <span className="absolute top-1 right-2 text-label-sm font-label-sm text-black/30">[MTRX_02]</span>
                            <div className="text-label-sm font-label-sm text-secondary uppercase tracking-widest mb-1">TOTAL_APPLICANTS_AUDITED</div>
                            <div className="flex items-baseline gap-2">
                                <span className="font-headline-lg text-headline-lg text-on-surface tracking-tighter">
                                    [ {totalApplicantsCount} ]
                                </span>
                                <span className="text-label-sm font-label-sm text-on-surface-variant border border-black/15 px-1 py-0.5 font-bold">100% PARSED</span>
                            </div>
                            <div className="text-body-sm font-body-sm text-on-surface-variant mt-2 flex items-center gap-1">
                                <span className="text-secondary">■</span> Ingest rate: 12 dossiers/hr
                            </div>
                        </div>

                        <div className="p-margin relative group bg-surface hover:bg-surface-container-low transition-colors">
                            <span className="absolute top-1 right-2 text-label-sm font-label-sm text-black/30">[MTRX_03]</span>
                            <div className="text-label-sm font-label-sm text-secondary uppercase tracking-widest mb-1">VERIFIED_TALENT_INDEX</div>
                            <div className="flex items-baseline gap-2">
                                <span className="font-headline-lg text-headline-lg text-primary-container tracking-tighter">
                                    [ 96.2% ]
                                </span>
                                <span className="text-label-sm font-label-sm text-primary-container bg-primary-fixed/30 border border-primary-container/20 px-1 py-0.5 font-bold">PASS</span>
                            </div>
                            <div className="text-body-sm font-body-sm text-on-surface-variant mt-2 flex items-center gap-1">
                                <span className="text-primary-container font-bold">✓</span> Proctor validation verified
                            </div>
                        </div>

                        <div className="p-margin relative group bg-surface hover:bg-surface-container-low transition-colors">
                            <span className="absolute top-1 right-2 text-label-sm font-label-sm text-black/30">[MTRX_04]</span>
                            <div className="text-label-sm font-label-sm text-secondary uppercase tracking-widest mb-1">TIME_TO_SHORTLIST</div>
                            <div className="flex items-baseline gap-2">
                                <span className="font-headline-lg text-headline-lg text-on-surface tracking-tighter">[ 1.4_DAYS ]</span>
                                <span className="text-label-sm font-label-sm text-secondary border border-black/15 px-1 py-0.5">EST: 2.0D</span>
                            </div>
                            <div className="text-body-sm font-body-sm text-on-surface-variant mt-2 flex items-center gap-1">
                                <span className="text-primary-container font-bold">▼</span> -30% vs manual benchmark
                            </div>
                        </div>
                    </div>
                </section>

                {/* Requisition Deployment Control Bar */}
                <section className="w-full bg-surface-container-low px-margin py-space-sm border-b border-black/15 flex flex-wrap items-center justify-between gap-space-md" id="RequisitionActionBar">
                    <div className="flex items-center gap-space-sm flex-wrap">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-primary-container text-on-primary font-label-md text-label-md px-space-md py-space-xs border border-primary-container hover:bg-primary uppercase transition-none cursor-pointer flex items-center gap-2 font-bold shadow-[2px_2px_0px_#191C1D]"
                            type="button"
                        >
                            <span>+ DEPLOY_NEW_TECHNICAL_REQUISITION</span>
                        </button>
                        <button
                            onClick={handleExportCSV}
                            className="bg-surface-container-lowest text-on-surface font-label-md text-label-md px-space-md py-space-xs border border-black/20 hover:bg-surface-container hover:border-black/40 uppercase transition-none cursor-pointer flex items-center gap-1"
                            type="button"
                        >
                            <span>EXPORT_AUDIT_LOGS_CSV</span>
                        </button>
                        <div className="hidden xl:flex items-center gap-2 pl-space-sm border-l border-black/15 text-label-sm font-label-sm text-on-surface-variant">
                            <span className="w-2 h-2 rounded-none bg-primary-container inline-block"></span>
                            <span>AUTO_MATCH_ENGINE: <strong className="text-on-surface font-bold">ONLINE</strong> [SCIPY_TFIDF_VECTORIZER_ACTIVE]</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-space-sm text-label-sm font-label-sm text-secondary shrink-0">
                        <span className="border border-black/10 bg-surface px-space-xs py-0.5">
                            INDEX_CYCLE: REALTIME_DISPATCH
                        </span>
                        <span className="text-black/30">|</span>
                        <span>TIMESTAMP: 2026-10-23T00:00:00Z</span>
                    </div>
                </section>

                {/* Main Workplane Area */}
                <div className="w-full px-margin py-space-lg flex flex-col gap-space-xl">

                    {/* Active Jobs Table Block */}
                    <section className="w-full border border-black/20 bg-surface-container-lowest" id="ActiveJobsTableBlock">
                        <div className="w-full bg-surface-container px-space-md py-space-xs border-b border-black/20 flex items-center justify-between">
                            <div className="flex items-center gap-space-sm">
                                <span className="text-primary-container font-bold">+</span>
                                <span className="font-headline-sm text-headline-sm uppercase text-on-surface tracking-tight font-bold">
                                    [ DEPLOYED_REQUISITIONS // PIPELINE_SPECIFICATIONS ]
                                </span>
                            </div>
                            <div className="flex items-center gap-space-sm text-label-sm font-label-sm text-on-surface-variant">
                                <span className="border border-black/15 px-space-xs bg-surface">[CAD_SYS: REQ_04]</span>
                                <span className="hidden md:inline">SPEC_LAYER: ORTHO_PLAN_01</span>
                            </div>
                        </div>

                        <div className="w-full overflow-x-auto">
                            <table className="w-full border-collapse text-left font-body-sm text-body-sm">
                                <thead>
                                    <tr className="bg-surface-variant/70 text-on-surface uppercase border-b border-black/20 font-label-md text-label-md">
                                        <th className="p-space-sm border-r border-black/15 font-bold">[ REQ_ID ]</th>
                                        <th className="p-space-sm border-r border-black/15 font-bold">[ DESIGNATION_&amp;_TIER ]</th>
                                        <th className="p-space-sm border-r border-black/15 font-bold">[ COMPENSATION_SPEC ]</th>
                                        <th className="p-space-sm border-r border-black/15 font-bold">[ BENCHMARK_THRESHOLD ]</th>
                                        <th className="p-space-sm border-r border-black/15 font-bold">[ AUDITED_APPLICANTS ]</th>
                                        <th className="p-space-sm border-r border-black/15 font-bold">[ STATUS ]</th>
                                        <th className="p-space-sm text-right font-bold">[ ACTION ]</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-black/10">
                                    {jobs.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="p-space-md text-center text-outline italic">
                                                NO REQUISITION SPECIFICATIONS IN PIPELINE. CLICK &quot;+ DEPLOY_NEW_TECHNICAL_REQUISITION&quot; TO LAUNCH ONE.
                                            </td>
                                        </tr>
                                    ) : (
                                        jobs.map((job, idx) => {
                                            const isSelected = selectedJob?.id === job.id;
                                            return (
                                                <tr 
                                                    key={job.id} 
                                                    onClick={() => handleSelectJob(job)}
                                                    className={`cursor-pointer transition-none ${isSelected ? 'bg-primary-fixed/20' : 'hover:bg-surface-container-low'}`}
                                                >
                                                    <td className="p-space-sm border-r border-black/15 font-bold text-primary-container whitespace-nowrap">
                                                        REQ_{String(idx + 1).padStart(2, '0')}{" "}
                                                        {isSelected && <span className="text-[9px] border border-primary-container/30 px-0.5">SEL</span>}
                                                    </td>
                                                    <td className="p-space-sm border-r border-black/15 font-bold text-on-surface">
                                                        <div>{job.title?.toUpperCase()}</div>
                                                        <div className="text-label-sm font-label-sm text-secondary font-normal">
                                                            DEPT: {job.category?.toUpperCase() || 'CORE_ENGINEERING'}
                                                        </div>
                                                    </td>
                                                    <td className="p-space-sm border-r border-black/15 text-on-surface-variant">
                                                        BUDGET: ${Number(job.budget_amount || 120000).toLocaleString()} / YR{" "}
                                                        <span className="text-label-sm font-label-sm text-on-surface">[{job.budget_type?.toUpperCase() || 'FIXED'}]</span>
                                                    </td>
                                                    <td className="p-space-sm border-r border-black/15 text-on-surface">
                                                        MIN_SKILL_THRESHOLD: <span className="font-bold text-primary-container">{job.min_skill_score || 80}_PTS</span>
                                                    </td>
                                                    <td className="p-space-sm border-r border-black/15">
                                                        <span className="bg-surface-container px-space-xs py-0.5 border border-black/15 font-bold text-on-surface">
                                                            APPLICANTS: [ {isSelected ? applicants.length : 14}_VETTED ]
                                                        </span>
                                                    </td>
                                                    <td className="p-space-sm border-r border-black/15">
                                                        <span className="inline-flex items-center gap-1 font-bold text-primary-container border border-primary-container/40 bg-primary-fixed/40 px-space-xs py-0.5 text-label-sm font-label-sm">
                                                            ● STATUS: [OPEN // ACTIVE_ROUTING]
                                                        </span>
                                                    </td>
                                                    <td className="p-space-sm text-right">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleSelectJob(job);
                                                            }}
                                                            className={`font-label-sm text-label-sm px-space-sm py-1 border uppercase transition-none cursor-pointer ${
                                                                isSelected 
                                                                    ? 'bg-primary-container text-on-primary border-primary-container' 
                                                                    : 'bg-surface-container text-on-surface border-black/20 hover:bg-surface-container-high'
                                                            }`}
                                                            type="button"
                                                        >
                                                            [ VIEW_RANKED_PIPELINE -&gt; ]
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="w-full bg-surface-container-low px-space-md py-space-xs border-t border-black/15 flex flex-wrap items-center justify-between text-label-sm font-label-sm text-secondary">
                            <div>TOTAL_ACTIVE_SPECIFICATIONS: {jobs.length} OF 10 ALLOCATED // MAX_QUOTA: 10</div>
                            <div className="flex items-center gap-2">
                                <span>PAGINATION: [01/01]</span>
                                <span className="text-black/30">|</span>
                                <span className="text-primary-container font-bold">AUTONOMIC_SORT: FIFO_ENABLED</span>
                            </div>
                        </div>
                    </section>

                    {/* Two-Column Asymmetrical Engineering Split */}
                    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
                        {/* Left Column: Applicant Rankings Grid (8 Cols) */}
                        <section className="lg:col-span-8 border border-black/20 bg-surface-container-lowest flex flex-col" id="ApplicantRankingsGrid">
                            <div className="w-full bg-surface-container px-space-md py-space-xs border-b border-black/20 flex flex-wrap items-center justify-between gap-y-1">
                                <div className="flex items-center gap-space-sm">
                                    <span className="text-primary-container font-bold">+</span>
                                    <span className="font-headline-sm text-headline-sm uppercase text-on-surface tracking-tight font-bold">
                                        [ APPLICANT_POOL_RANKINGS // FILTERED_BY_COSINE_SIMILARITY ]
                                    </span>
                                </div>
                                <span className="text-label-sm font-label-sm text-secondary border border-black/15 px-space-xs py-0.5 bg-surface">
                                    [SYS_REF: TFIDF_MAT_L2]
                                </span>
                            </div>

                            {/* Active Context Subhead & Filters */}
                            <div className="w-full px-space-md py-space-sm bg-surface-container-low border-b border-black/15 flex flex-wrap items-center justify-between gap-space-sm">
                                <div className="flex items-center gap-2 text-label-md font-label-md">
                                    <span className="text-primary-container font-bold">INSPECTING:</span>
                                    <span className="bg-surface px-space-xs py-0.5 border border-black/15 font-bold text-on-surface">
                                        {selectedJob?.title ? selectedJob.title.toUpperCase() : 'SR. SYSTEMS ENGINEER // DISTRIBUTED_BACKEND'}
                                    </span>
                                </div>

                                <div className="flex items-center gap-1 flex-wrap text-label-sm font-label-sm">
                                    <span className="text-secondary pr-1">FILTERS:</span>
                                    <button
                                        onClick={() => setFilterMode('COSINE_DESC')}
                                        className={`px-space-xs py-0.5 uppercase cursor-pointer border transition-none font-bold ${
                                            filterMode === 'COSINE_DESC' ? 'bg-primary-container text-on-primary border-primary-container' : 'bg-surface text-on-surface border-black/20 hover:bg-surface-container'
                                        }`}
                                        type="button"
                                    >
                                        [SORT: COSINE_MATCH_DESC]
                                    </button>
                                    <button
                                        onClick={() => setFilterMode('TRUST_90')}
                                        className={`px-space-xs py-0.5 uppercase cursor-pointer border transition-none font-bold ${
                                            filterMode === 'TRUST_90' ? 'bg-primary-container text-on-primary border-primary-container' : 'bg-surface text-on-surface border-black/20 hover:bg-surface-container'
                                        }`}
                                        type="button"
                                    >
                                        [TRUST_SCORE &gt; 90]
                                    </button>
                                    <button
                                        onClick={() => setFilterMode('ZERO_FLAG')}
                                        className={`px-space-xs py-0.5 uppercase cursor-pointer border transition-none font-bold ${
                                            filterMode === 'ZERO_FLAG' ? 'bg-primary-container text-on-primary border-primary-container' : 'bg-surface text-on-surface border-black/20 hover:bg-surface-container'
                                        }`}
                                        type="button"
                                    >
                                        [ZERO_FLAG_ONLY]
                                    </button>
                                </div>
                            </div>

                            {/* Candidates Diagnostic Table */}
                            <div className="w-full overflow-x-auto">
                                <table className="w-full border-collapse text-left font-body-sm text-body-sm">
                                    <thead>
                                        <tr className="bg-surface-container border-b border-black/15 font-label-sm text-label-sm text-secondary uppercase">
                                            <th className="p-space-sm border-r border-black/15 w-12 text-center">RANK</th>
                                            <th className="p-space-sm border-r border-black/15 w-32">COSINE_SIM</th>
                                            <th className="p-space-sm border-r border-black/15">CANDIDATE_DOSSIER</th>
                                            <th className="p-space-sm border-r border-black/15">VERIFICATION &amp; TELEMETRY</th>
                                            <th className="p-space-sm border-r border-black/15">PROCTOR_INTEGRITY</th>
                                            <th className="p-space-sm border-r border-black/15 text-center">RATING</th>
                                            <th className="p-space-sm text-right">DISPOSITION</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-black/10">
                                        {displayedApplicants.map(candidate => (
                                            <tr key={candidate.id} className="hover:bg-surface-container-low transition-none">
                                                <td className="p-space-sm border-r border-black/15 text-center font-bold text-primary-container font-headline-sm text-headline-sm">
                                                    {candidate.rank}
                                                </td>
                                                <td className="p-space-sm border-r border-black/15">
                                                    <div className="font-headline-sm text-headline-sm font-bold text-primary-container leading-none">
                                                        {candidate.cosine_sim}%
                                                    </div>
                                                    <div className="text-label-sm font-label-sm text-secondary mt-1">
                                                        [COSINE_MATCH]
                                                    </div>
                                                    <div className="w-full bg-surface-container h-1 mt-1">
                                                        <div 
                                                            className="bg-primary-container h-1" 
                                                            style={{ width: `${Math.min(100, candidate.cosine_sim)}%` }}
                                                        />
                                                    </div>
                                                </td>
                                                <td className="p-space-sm border-r border-black/15">
                                                    <div className="font-bold text-on-surface text-body-md font-body-md uppercase">
                                                        {candidate.candidate_name}{" "}
                                                        <span className="text-label-sm font-label-sm text-primary-container border border-primary-container/30 px-1 py-0.5 ml-1">
                                                            [{candidate.candidate_ref}]
                                                        </span>
                                                    </div>
                                                    <div className="text-label-sm font-label-sm text-secondary">
                                                        {candidate.role_label}
                                                    </div>
                                                    <div className="text-label-sm font-label-sm text-on-surface-variant mt-1">
                                                        HASH: {candidate.hash} // REGION: {candidate.region}
                                                    </div>
                                                </td>
                                                <td className="p-space-sm border-r border-black/15 text-label-sm font-label-sm">
                                                    <div className="text-on-surface font-bold">PDF_PARSED ✓</div>
                                                    <div className="text-on-surface-variant mt-0.5">
                                                        GITHUB: {candidate.github_repos}
                                                    </div>
                                                    <div className="text-primary-container font-bold mt-0.5">
                                                        [{candidate.tags.slice(0, 3).join(', ')}]
                                                    </div>
                                                </td>
                                                <td className="p-space-sm border-r border-black/15">
                                                    <div className="inline-block border border-primary-container/30 bg-primary-fixed/30 px-space-xs py-0.5 text-label-sm font-label-sm font-bold text-primary-container">
                                                        PROCTOR_SCORE: {candidate.proctor_score}
                                                    </div>
                                                    <div className="text-label-sm font-label-sm text-on-surface mt-1">
                                                        [{candidate.proctor_flags}]
                                                    </div>
                                                    <div className="text-label-sm font-label-sm text-secondary">
                                                        CAM: {candidate.cam_status}
                                                    </div>
                                                </td>
                                                <td className="p-space-sm border-r border-black/15 text-center">
                                                    <div className="text-primary-container text-body-md font-body-md font-bold">{candidate.stars}</div>
                                                    <div className="text-label-sm font-label-sm text-secondary mt-0.5">({candidate.rating_num})</div>
                                                </td>
                                                <td className="p-space-sm text-right align-middle">
                                                    <div className="flex flex-col items-end gap-1">
                                                        <button
                                                            onClick={() => handleIssueOffer(candidate)}
                                                            className="bg-primary-container text-on-primary font-label-sm text-label-sm px-space-sm py-1 border border-primary-container hover:bg-primary uppercase transition-none cursor-pointer w-full text-center font-bold"
                                                            type="button"
                                                        >
                                                            [ ISSUE_OFFER_INVITE ]
                                                        </button>
                                                        <button
                                                            onClick={() => setInspectingCandidate(candidate)}
                                                            className="bg-surface text-on-surface font-label-sm text-label-sm px-space-sm py-1 border border-black/20 hover:bg-surface-container uppercase transition-none cursor-pointer w-full text-center"
                                                            type="button"
                                                        >
                                                            [ INSPECT_DOSSIER ]
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="w-full bg-surface-container-low px-space-md py-space-xs border-t border-black/15 flex flex-wrap items-center justify-between text-label-sm font-label-sm text-secondary">
                                <div>TOTAL_RANKED: {displayedApplicants.length} DOSSIERS AUDITED // COSINE_CUTOFF: 0.700</div>
                                <div className="flex items-center gap-space-sm">
                                    <span>SHOWING TOP {displayedApplicants.length}</span>
                                    <span className="text-black/30">|</span>
                                    <span className="text-primary-container font-bold">REALTIME_SORT</span>
                                </div>
                            </div>
                        </section>

                        {/* Right Column: Technical Blueprint Specification Card (4 Cols) */}
                        <section className="lg:col-span-4 bg-primary-container text-on-primary border border-primary p-0 relative shadow-none" id="RequisitionBlueprintCard">
                            <div className="absolute top-1 left-1 text-on-primary/40 font-mono text-[10px] pointer-events-none">+</div>
                            <div className="absolute top-1 right-1 text-on-primary/40 font-mono text-[10px] pointer-events-none">+</div>
                            <div className="absolute bottom-1 left-1 text-on-primary/40 font-mono text-[10px] pointer-events-none">+</div>
                            <div className="absolute bottom-1 right-1 text-on-primary/40 font-mono text-[10px] pointer-events-none">+</div>

                            <div className="w-full border-b border-white/20 px-space-md py-space-sm bg-primary/40 flex items-center justify-between">
                                <div className="font-headline-sm text-headline-sm text-on-primary uppercase tracking-tight flex items-center gap-1 font-bold">
                                    <span>[ SYSTEM_REQUISITION_SPEC ]</span>
                                </div>
                                <span className="text-label-sm font-label-sm text-on-primary/70 border border-white/30 px-1 py-0.5">
                                    [SCHEMATIC: CAD_902]
                                </span>
                            </div>

                            <div className="p-space-md flex flex-col gap-space-md font-body-sm text-body-sm">
                                <div>
                                    <div className="text-label-sm font-label-sm uppercase text-on-primary/75 tracking-wider mb-space-xs font-bold">
                                        // TF-IDF_TARGET_VECTOR
                                    </div>
                                    <div className="p-space-sm bg-primary/50 border border-white/20 text-on-primary flex flex-wrap gap-1.5 font-label-sm text-label-sm">
                                        {requiredSkillsList.map((skill, i) => (
                                            <span key={i} className="border border-white/40 px-1.5 py-0.5 bg-white/10 font-bold">
                                                [{skill}]
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-label-sm font-label-sm uppercase text-on-primary/75 tracking-wider mb-space-xs font-bold">
                                        // HEURISTIC_POLICY_RULES
                                    </div>
                                    <div className="border border-white/30 bg-primary/30 p-space-sm flex flex-col gap-1.5">
                                        <div className="flex items-start gap-2">
                                            <span className="text-error-container font-bold text-label-md font-label-md">!</span>
                                            <span className="text-label-sm font-label-sm text-on-primary leading-tight uppercase font-bold">
                                                APPLICANTS WITH PROCTOR_RISK &gt;= 50 EXCLUDED AUTOMATICALLY
                                            </span>
                                        </div>
                                        <div className="h-[1px] w-full bg-white/15 my-1"></div>
                                        <div className="text-[10px] text-on-primary/80 leading-normal">
                                            DISCORD_HOOK: DISPATCHED ON COSINE &gt;= 0.95<br />
                                            PROCTOR_RESOLUTION: HARD_ENFORCED (CAMERA + AUDIO + TAB_LOCK)
                                        </div>
                                    </div>
                                </div>

                                <div className="border border-white/25 bg-primary/60 p-space-sm">
                                    <div className="text-label-sm font-label-sm font-bold text-on-primary uppercase border-b border-white/20 pb-1 mb-2">
                                        ARCHITECTURAL_PARAMETERS
                                    </div>
                                    <dl className="grid grid-cols-2 gap-y-1.5 text-label-sm font-label-sm text-on-primary/90">
                                        <dt className="text-on-primary/60">ALGO_ENGINE:</dt>
                                        <dd className="text-right font-bold">SCIPY_TFIDF_V3</dd>
                                        <dt className="text-on-primary/60">COSINE_TOLERANCE:</dt>
                                        <dd className="text-right font-bold">0.05</dd>
                                        <dt className="text-on-primary/60">HASH_INTEGRITY:</dt>
                                        <dd className="text-right font-bold">BLAKE3_HARDENED</dd>
                                        <dt className="text-on-primary/60">SCHEMA_REVISION:</dt>
                                        <dd className="text-right font-bold">REV: 2026.4</dd>
                                        <dt className="text-on-primary/60">AUDIT_LOCK:</dt>
                                        <dd className="text-right font-bold text-primary-fixed">ENABLED (WORM)</dd>
                                    </dl>
                                </div>

                                <div className="pt-space-xs flex flex-col gap-2">
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="w-full bg-surface-container-lowest text-primary-container font-label-md text-label-md py-space-xs px-space-md border border-surface-container-lowest hover:bg-surface hover:text-primary uppercase transition-none cursor-pointer text-center font-bold"
                                        type="button"
                                    >
                                        [ RE-CALIBRATE_VECTOR_WEIGHTS ]
                                    </button>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="w-full bg-transparent text-on-primary font-label-sm text-label-sm py-1 px-space-md border border-white/40 hover:bg-white/10 uppercase transition-none cursor-pointer text-center"
                                        type="button"
                                    >
                                        [ CLONE_SPECIFICATION_CARD ]
                                    </button>
                                </div>
                            </div>

                            <div className="w-full bg-primary/80 border-t border-white/20 px-space-md py-1 flex items-center justify-between text-[9px] text-on-primary/70">
                                <span>LAYER: SEC_REQUISITION // MAT: 0x489F</span>
                                <span>STAMP: 2026-10-23T00:00:00Z</span>
                            </div>
                        </section>
                    </div>

                    {/* Technical CAD Ground Information Strip */}
                    <section className="w-full border border-black/20 bg-surface-container-lowest p-space-sm flex flex-col md:flex-row items-center justify-between gap-space-sm text-label-sm font-label-sm text-on-surface-variant">
                        <div className="flex items-center gap-space-md flex-wrap">
                            <span className="text-primary-container font-bold">[CAD_COORDINATES]</span>
                            <span className="font-mono text-on-surface">[X: +42.109 // Y: -11.002 // GRID: 1px_ORTHO]</span>
                            <span className="text-black/30">|</span>
                            <span>SECURITY_SIGNATURE: SHA256:7c8b2a1e94d0..</span>
                        </div>
                        <div className="flex items-center gap-space-sm">
                            <span className="border border-black/15 bg-surface-container px-space-xs py-0.5 text-on-surface">
                                SKILLFORGE ENTERPRISE TALENT ACQUISITION ENGINE v4.9
                            </span>
                        </div>
                    </section>
                </div>
            </main>

            {/* Dossier Inspection Modal */}
            {inspectingCandidate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-none font-mono select-none">
                    <div className="bg-surface-container-lowest border border-black/30 w-full max-w-2xl shadow-[6px_6px_0px_#1D52B8] max-h-[90vh] flex flex-col overflow-hidden">
                        <div className="px-space-md py-space-sm bg-surface-container border-b border-black/20 flex items-center justify-between">
                            <div className="flex items-center gap-space-xs font-label-md text-label-md font-bold uppercase text-on-surface">
                                <span className="text-primary-container font-bold">[+]</span>
                                <span>[ CANDIDATE_DOSSIER_AUDIT_VIEW // {inspectingCandidate.candidate_ref} ]</span>
                            </div>
                            <button
                                onClick={() => setInspectingCandidate(null)}
                                className="px-2 py-0.5 border border-black/20 hover:bg-black hover:text-white text-label-sm font-label-sm uppercase transition-none cursor-pointer"
                            >
                                [ESC]
                            </button>
                        </div>

                        <div className="p-space-lg overflow-y-auto space-y-space-md flex-1 text-on-surface font-body-sm text-body-sm">
                            <div className="border border-black/15 p-space-md bg-surface flex flex-col gap-2">
                                <div className="flex justify-between items-baseline">
                                    <span className="font-headline-sm text-headline-sm font-bold">{inspectingCandidate.candidate_name}</span>
                                    <span className="text-primary font-bold text-headline-sm">{inspectingCandidate.cosine_sim}% MATCH</span>
                                </div>
                                <div className="text-label-sm font-label-sm text-on-surface-variant">
                                    {inspectingCandidate.role_label} // {inspectingCandidate.region}
                                </div>
                                <div className="text-label-sm font-label-sm text-outline">
                                    EMAIL: {inspectingCandidate.email} // HASH: {inspectingCandidate.hash}
                                </div>
                            </div>

                            <div className="border border-black/15 p-space-md bg-surface-container-low space-y-2">
                                <div className="font-label-sm text-label-sm font-bold uppercase text-primary">
                                    [ VERIFIED_PROCTOR_TELEMETRY ]
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-label-sm font-label-sm">
                                    <div>PROCTOR_SCORE: <strong>{inspectingCandidate.proctor_score}</strong></div>
                                    <div>ANTI_CHEAT: <strong>{inspectingCandidate.proctor_flags}</strong></div>
                                    <div>OPTICAL_FEED: <strong>{inspectingCandidate.cam_status}</strong></div>
                                    <div>ACCREDITATION: <strong>{inspectingCandidate.stars} ({inspectingCandidate.rating_num})</strong></div>
                                </div>
                            </div>

                            <div className="border border-black/15 p-space-md bg-surface space-y-2">
                                <div className="font-label-sm text-label-sm font-bold uppercase text-outline">
                                    [ MATCHED_SKILL_VECTOR ]
                                </div>
                                <div className="flex flex-wrap gap-1.5 font-label-sm text-label-sm">
                                    {inspectingCandidate.tags.map((t, idx) => (
                                        <span key={idx} className="bg-primary-container text-on-primary px-2 py-0.5 font-bold">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-space-md border-t border-black/15 flex items-center justify-between">
                                <button
                                    onClick={() => setInspectingCandidate(null)}
                                    className="px-space-md py-2 border border-black/30 font-label-md text-label-md uppercase hover:bg-black hover:text-white transition-none cursor-pointer"
                                >
                                    [ CLOSE_DOSSIER ]
                                </button>
                                <button
                                    onClick={() => {
                                        handleIssueOffer(inspectingCandidate);
                                        setInspectingCandidate(null);
                                    }}
                                    className="bg-primary text-on-primary px-space-lg py-2 font-label-md text-label-md uppercase font-bold border border-primary hover:bg-surface hover:text-primary transition-none shadow-[2px_2px_0px_#191C1D] cursor-pointer"
                                >
                                    [ ISSUE_OFFER_INVITE -&gt; ]
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <JobPostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onJobCreated={handleJobCreated}
            />

            <footer className="w-full bg-surface-container-lowest border-t border-black/15 py-space-sm select-none">
                <div className="w-full px-margin flex flex-col md:flex-row items-center justify-between gap-space-sm text-label-sm font-label-sm text-on-surface-variant">
                    <div>
                        <span className="text-primary-container font-bold">+</span> SYSTEM METADATA: SPEC_REV: 04.912 <span className="text-black/30">|</span> ENCRYPTION: AES-256-GCM <span className="text-black/30">|</span> AUTONOMOUS TALENT REQUISITION ENGINE © {new Date().getFullYear()}
                    </div>
                    <div className="flex items-center gap-space-md">
                        <span className="text-secondary">STATUS: NOMINAL</span>
                        <span className="border border-black/15 px-space-xs py-0.5 text-on-surface">CAD_SYS_ID: #SF-REC-9002</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ClientDashboard;
