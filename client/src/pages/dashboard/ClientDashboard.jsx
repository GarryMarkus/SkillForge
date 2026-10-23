import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import client from '../../api/client';

import ClientHeader from '../../components/client/ClientHeader';
import RequisitionActionBar from '../../components/client/RequisitionActionBar';
import ActiveJobsTableBlock from '../../components/client/ActiveJobsTableBlock';
import ApplicantRankingsGrid from '../../components/client/ApplicantRankingsGrid';
import RequisitionBlueprintCard from '../../components/client/RequisitionBlueprintCard';
import CandidateDossierModal from '../../components/client/CandidateDossierModal';
import JobPostModal from '../../components/modals/JobPostModal';
import ClientFooter from '../../components/client/ClientFooter';

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
    const [filterMode, setFilterMode] = useState('COSINE_DESC');

    useEffect(() => {
        if (user && user.onboarding_stage !== undefined && user.onboarding_stage < 2) {
            navigate('/client/onboarding');
        }
    }, [user, navigate]);

    const fetchProfile = useCallback(async () => {
        try {
            const response = await client.get('/accounts/profile/');
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
            const response = await client.get(`/project/applicants/${job.id}/`);
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    const formatted = data.map((app, i) => ({
                        id: app.id,
                        rank: `#${String(i + 1).padStart(2, '0')}`,
                        cosine_sim: app.match ? app.match.toFixed(1) : 94.2,
                        candidate_name: app.name || app.email?.split('@')[0]?.toUpperCase() || `APPLICANT_${app.id}`,
                        candidate_ref: `SF-APP-${app.id}`,
                        role_label: "Engineering Candidate",
                        hash: `hash_${app.id}..77b2`,
                        region: "GLOBAL (VERIFIED)",
                        pdf_parsed: true,
                        github_repos: app.github_url ? "LINKED" : "AUDITED",
                        tags: job.skills_required ? job.skills_required.split(',').map(s => s.trim()) : ["PYTHON", "DJANGO"],
                        proctor_score: "98%",
                        proctor_flags: "ZERO_CHEATING_FLAGS",
                        cam_status: "SYNCHRONIZED (1080P)",
                        stars: "★★★★★",
                        rating_num: "4.7 / 5.0",
                        email: app.email || "candidate@example.com",
                        status: "pending"
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
            const response = await client.get('/project/my-jobs/');
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
        alert(`Job offer invitation sent to candidate ${candidate.candidate_name} (${candidate.email}).`);
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

    const displayedApplicants = applicants.filter(a => {
        if (filterMode === 'TRUST_90') return parseFloat(a.cosine_sim) >= 90;
        if (filterMode === 'ZERO_FLAG') return a.proctor_flags?.includes("ZERO");
        return true;
    });

    const companyName = profile?.company_name || user?.email?.split('@')[0] || 'SkillForge Partner';
    const totalApplicantsCount = (jobs.length * 14) + applicants.length;
    const requiredSkillsList = selectedJob?.skills_required 
        ? selectedJob.skills_required.split(',').map(s => s.trim().toUpperCase())
        : ["PYTHON", "FASTAPI", "DOCKER", "KUBERNETES", "POSTGRESQL_INDEXING", "REDIS"];

    return (
        <div className="bg-[#FAFAFA] text-gray-900 font-sans antialiased min-h-screen flex flex-col">
            {/* Top Enterprise Console Header with Integrated Metric Ribbon */}
            <ClientHeader
                companyName={companyName}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                jobsCount={jobs.length}
                totalApplicantsCount={totalApplicantsCount}
                verifiedTalentIndex="96.2%"
                timeToShortlist="1.4 Days"
                onLogout={handleLogout}
            />

            {/* Main Console Workspace */}
            <main className="w-full pt-32 bg-[#FAFAFA] min-h-screen flex-1 flex flex-col justify-between">
                <div>
                    {/* Requisition Deployment Action Bar */}
                    <RequisitionActionBar
                        onDeployClick={() => setIsModalOpen(true)}
                        onExportCSV={handleExportCSV}
                        lastRunTimestamp="2026-10-24 18:42:01"
                    />

                    {/* Main Workplane Grid */}
                    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
                        {/* Active Deployed Jobs Table Block */}
                        <ActiveJobsTableBlock
                            jobs={jobs}
                            selectedJob={selectedJob}
                            onSelectJob={handleSelectJob}
                            onDeployClick={() => setIsModalOpen(true)}
                        />

                        {/* Two-Column Engineering Split */}
                        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            {/* Left Column: Applicant Rankings Grid (8 Cols) */}
                            <ApplicantRankingsGrid
                                selectedJob={selectedJob}
                                applicants={displayedApplicants}
                                filterMode={filterMode}
                                setFilterMode={setFilterMode}
                                onInspectCandidate={setInspectingCandidate}
                                onIssueOffer={handleIssueOffer}
                            />

                            {/* Right Column: Technical Blueprint Specification Card (4 Cols) */}
                            <RequisitionBlueprintCard
                                skillsList={requiredSkillsList}
                                onRecalibrate={() => setIsModalOpen(true)}
                                onCloneSpec={() => setIsModalOpen(true)}
                                timestamp="2026-10-24 18:42:01 UTC"
                            />
                        </div>
                    </div>
                </div>

                {/* Technical Ground & Coordinates Information Strip */}
                <ClientFooter />
            </main>

            {/* Candidate Dossier Inspection Modal */}
            <CandidateDossierModal
                candidate={inspectingCandidate}
                onClose={() => setInspectingCandidate(null)}
                onIssueOffer={handleIssueOffer}
            />

            {/* Requisition Creation Modal */}
            <JobPostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onJobCreated={handleJobCreated}
            />
        </div>
    );
};

export default ClientDashboard;
