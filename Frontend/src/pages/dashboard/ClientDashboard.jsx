import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import ThemeToggle from '../../components/layout/ThemeToggle';
import { LogOut, Users, Briefcase, Plus, MapPin, DollarSign, Target, X, Mail, Github, Linkedin } from 'lucide-react';
import Button from '../../components/ui/Button';
import JobPostModal from '../../components/client/JobPostModal';
import { useNavigate } from 'react-router-dom';

const ClientDashboard = () => {
    const { logout, user, tokens } = useAuthStore();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [isApplicantModalOpen, setIsApplicantModalOpen] = useState(false);

    const fetchProfile = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/accounts/profile/', {
                headers: { 'Authorization': `Bearer ${tokens?.access}` }
            });
            if (response.ok) setProfile(await response.json());
        } catch (e) { console.error(e); }
    };

    const fetchJobs = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/project/my-jobs/', {
                headers: { 'Authorization': `Bearer ${tokens?.access}` }
            });
            if (response.ok) {
                const data = await response.json();
                setJobs(data);
            }
        } catch (error) {
            console.error('Failed to fetch jobs', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (tokens?.access) {
            fetchJobs();
            fetchProfile();
        }
    }, [tokens]);

    const handleJobCreated = (newJob) => {
        setJobs([newJob, ...jobs]);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const viewApplicants = async (job) => {
        setSelectedJob(job);
        try {
            const response = await fetch(`http://localhost:8000/api/project/applicants/${job.id}/`, {
                headers: { 'Authorization': `Bearer ${tokens?.access}` }
            });
            if (response.ok) {
                setApplicants(await response.json());
            }
        } catch (e) { console.error(e); }
        setIsApplicantModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-light-canvas dark:bg-dark-canvas transition-colors duration-500 p-6 md:p-12 font-sans text-light-border dark:text-white">
            {/* Header */}
            <header className="flex items-center justify-between mb-12">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tighter">
                        Welcome, {user?.name || 'Recruiter'}! 🚀
                    </h1>
                    <p className="font-script text-xl text-gray-500 dark:text-gray-400">
                        Find your next unicorn employee today.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="!bg-orange-500 !text-white !border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:!bg-orange-600 flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" /> Post Project
                    </Button>
                    <div className="h-8 w-px bg-gray-300 dark:bg-gray-700 mx-2" />
                    <ThemeToggle />
                    <Button
                        onClick={handleLogout}
                        variant="secondary"
                        className="!px-3 !py-2 !text-xs flex items-center gap-2"
                    >
                        <LogOut className="w-4 h-4" />
                    </Button>
                </div>
            </header>

            <JobPostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onJobCreated={handleJobCreated}
            />

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Stat Card - Job Posts */}
                <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-dark-card border-2 border-light-border dark:border-gray-700 rounded-[3rem] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none"
                >
                    <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-2xl flex items-center justify-center mb-4 text-pink-500">
                        <Briefcase className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Job Posts</h3>
                    <p className="text-4xl font-black text-black dark:text-white">{jobs.length}</p>
                    <p className="text-sm text-gray-400 mt-2 font-mono">
                        {jobs.filter(j => j.status === 'open').length} active campaigns
                    </p>
                </motion.div>

                {/* Profile Card */}
                <div className="bg-white dark:bg-dark-card border-2 border-light-border dark:border-gray-700 rounded-[3rem] p-8 h-fit lg:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-black">Company Profile</h3>
                        <Button onClick={() => navigate('/client/onboarding')} variant="secondary" className="!text-xs !py-1">Edit</Button>
                    </div>
                    {profile ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase">Company</label>
                                <p className="font-bold text-lg">{profile.company_name}</p>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase">Industry</label>
                                <p className="font-medium">{profile.industry}</p>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase">Location</label>
                                <p className="font-medium flex items-center gap-1"><MapPin className="w-4 h-4" /> {profile.address || 'Remote'}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-400 italic">Loading profile...</p>
                    )}
                </div>

                {/* Main Content Area - Job List */}
                <div className="md:col-span-2 lg:col-span-3">
                    <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                        Active Postings <span className="text-sm font-normal bg-black text-white px-2 py-1 rounded-full">{jobs.length}</span>
                    </h2>

                    {jobs.length === 0 ? (
                        <div className="bg-white dark:bg-dark-card border-2 border-light-border dark:border-gray-700 rounded-[3rem] p-12 flex flex-col items-center justify-center text-center border-dashed min-h-[300px]">
                            <Briefcase className="w-16 h-16 text-gray-300 mb-4" />
                            <p className="font-bold text-xl mb-2 text-black dark:text-white">The Forge is cold.</p>
                            <p className="font-script text-gray-500 text-lg">Post your first project to start hiring!</p>
                            <Button
                                onClick={() => setIsModalOpen(true)}
                                variant="outline"
                                className="mt-6"
                            >
                                Ignite the Forge
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <AnimatePresence>
                                {jobs.map((job) => (
                                    <motion.div
                                        key={job.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white dark:bg-dark-card border-2 border-black dark:border-gray-700 rounded-[2rem] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-none relative group hover:-translate-y-1 transition-transform"
                                    >
                                        <div className="absolute top-4 right-4 rotate-12 bg-yellow-300 text-black text-xs font-bold px-2 py-1 shadow-sm font-script">
                                            Job Authenticity Verified
                                        </div>

                                        <div className="flex justify-between items-start mb-4 mt-2">
                                            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                                {job.category}
                                            </span>
                                            <span className="text-sm font-bold text-gray-400">
                                                {new Date(job.created_at).toLocaleDateString()}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold mb-2 line-clamp-1">{job.title}</h3>
                                        <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10">
                                            {job.description}
                                        </p>

                                        <div className="flex items-center gap-4 text-sm font-medium text-gray-600 dark:text-gray-300 mb-6">
                                            <span className="flex items-center gap-1">
                                                <DollarSign className="w-4 h-4" />
                                                {job.budget_type === 'fixed' ? `$${job.budget_amount}` : `$${job.budget_amount}/hr`}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Target className="w-4 h-4 text-orange-500" />
                                                {job.min_skill_score}+ Score
                                            </span>
                                        </div>

                                        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <Users className="w-5 h-5 text-gray-400" />
                                                <span className="font-bold">{job.applicant_count || 0}</span>
                                                <span className="text-sm text-gray-500">applicants</span>
                                            </div>
                                            <button
                                                onClick={() => viewApplicants(job)}
                                                className="text-sm font-bold text-blue-600 hover:underline decoration-wavy"
                                            >
                                                View Applicants
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>

            {/* Applicants Modal */}
            <AnimatePresence>
                {isApplicantModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setIsApplicantModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white dark:bg-dark-card rounded-[2rem] p-8 max-w-3xl w-full max-h-[80vh] overflow-y-auto border-2 border-black dark:border-gray-700"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-black">Applicants</h2>
                                    <p className="text-gray-500">{selectedJob?.title}</p>
                                </div>
                                <button onClick={() => setIsApplicantModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {applicants.length === 0 ? (
                                <div className="text-center py-12">
                                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500">No applicants yet. Share this job to attract talent!</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {applicants.map((applicant, idx) => (
                                        <div key={idx} className="border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:border-black dark:hover:border-white transition-colors">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg font-bold">{applicant.name || 'Anonymous'}</h3>
                                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                                        <Mail className="w-4 h-4" /> {applicant.email}
                                                    </p>
                                                </div>
                                                <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                                    {applicant.experience_level || 'Entry'}
                                                </span>
                                            </div>
                                            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <label className="text-xs font-bold text-gray-400 uppercase">Education</label>
                                                    <p>{applicant.education || 'Not specified'}</p>
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-gray-400 uppercase">Skills</label>
                                                    <p className="line-clamp-1">{applicant.skills || 'Not specified'}</p>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex gap-3">
                                                {applicant.github_url && (
                                                    <a href={applicant.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-gray-600 hover:text-black">
                                                        <Github className="w-4 h-4" /> GitHub
                                                    </a>
                                                )}
                                                {applicant.linkedin_url && (
                                                    <a href={applicant.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800">
                                                        <Linkedin className="w-4 h-4" /> LinkedIn
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ClientDashboard;
