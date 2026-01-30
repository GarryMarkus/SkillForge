import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { User, FileText, Code, Link as LinkIcon, UploadCloud, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const StudentOnboarding = () => {
    const { user, tokens } = useAuthStore();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        full_name: '',
        bio: '',
        education: '',
        experience_level: 'Beginner',
        github_url: '',
        portfolio_links: '',
        skills: ''
    });
    const [resume, setResume] = useState(null);

    // Pre-fill if data exists (e.g. from signup wizard local state or previous fetch)
    useEffect(() => {
        // Fetch existing profile if updating
        const fetchProfile = async () => {
            if (!tokens?.access) return;
            try {
                const response = await fetch('http://localhost:8000/api/accounts/profile/', {
                    headers: { 'Authorization': `Bearer ${tokens.access}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setFormData({
                        full_name: data.full_name || '',
                        bio: data.bio || '',
                        education: data.education || '',
                        experience_level: data.experience_level || 'Beginner',
                        github_url: data.github_url || '',
                        portfolio_links: data.portfolio_links || '',
                        skills: data.skills || ''
                    });
                }
            } catch (error) { console.error(error); }
        };
        fetchProfile();
    }, [tokens]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Usage of FormData for file upload
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });
        if (resume) {
            data.append('resume', resume);
        }

        const url = 'http://localhost:8000/api/accounts/onboarding/';
        // Note: Onboarding is PUT. If we want PATCH for updates, we change method logic similar to Client
        const method = 'PUT';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${tokens.access}`
                },
                body: data
            });

            if (response.ok) {
                // Generate Partial Report is triggered by backend automatically
                navigate('/student/dashboard');
            } else {
                const err = await response.json();
                console.error("Onboarding failed", err);
                alert("Failed to save profile. Please check fields.");
            }
        } catch (error) {
            console.error("Error submitting form", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-light-canvas dark:bg-dark-canvas p-6 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-4xl w-full"
            >
                <header className="mb-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tighter text-black dark:text-white">
                        Welcome to the Forge, <span className="text-blue-500">{user?.name || 'Candidate'}</span>! ⚒️
                    </h1>
                    <p className="font-script text-xl text-gray-500">
                        Let's craft your digital identity.
                    </p>
                </header>

                <div className="bg-white dark:bg-dark-card border-4 border-black dark:border-gray-700 rounded-[3rem] p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-none">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Section 1: Identity */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Full Name"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                icon={User}
                                placeholder="John Doe"
                                required
                            />
                            <Input
                                label="Education"
                                name="education"
                                value={formData.education}
                                onChange={handleChange}
                                icon={FileText}
                                placeholder="B.Tech, BE, etc."
                                required
                            />
                        </div>

                        {/* Section 2: Skills & Bio */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 ml-1">Technical Skills (Comma separated)</label>
                            <div className="relative">
                                <Code className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                                <input
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:border-black dark:focus:border-white focus:ring-0 transition-all font-bold"
                                    placeholder="React, Python, Django, AWS..."
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 ml-1">Bio / Summary</label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:border-black dark:focus:border-white focus:ring-0 transition-all resize-none font-medium"
                                placeholder="Short description about yourself..."
                            />
                        </div>

                        {/* Section 3: Links & Resume */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="GitHub / Portfolio URL"
                                name="github_url"
                                value={formData.github_url}
                                onChange={handleChange}
                                icon={LinkIcon}
                                placeholder="https://github.com/..."
                            />

                            <div className="relative">
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 ml-1">Upload Resume (PDF)</label>
                                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors cursor-pointer group">
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                    <UploadCloud className="w-8 h-8 text-gray-400 group-hover:text-blue-500 mb-2" />
                                    <p className="text-sm font-bold text-gray-500 group-hover:text-blue-500">
                                        {resume ? resume.name : "Click to Upload Resume"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 flex justify-end">
                            <Button className="w-full md:w-auto px-12 py-4 text-lg flex items-center justify-center gap-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                                {isLoading ? 'Analyzing Profile...' : 'Create Student ID'}
                                {!isLoading && <ArrowRight />}
                            </Button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default StudentOnboarding;
