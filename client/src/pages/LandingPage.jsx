import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/sections/HeroSection';
import CapabilitiesGrid from '../components/sections/CapabilitiesGrid';
import BlueprintSpecSection from '../components/sections/BlueprintSpecSection';
import PersonaSplitSection from '../components/sections/PersonaSplitSection';
import Footer from '../components/sections/Footer';
import { useAuthStore } from '../store/authStore';

const LandingPage = () => {
    const { isAuthenticated, user, setRole } = useAuthStore();
    const navigate = useNavigate();

    const handleStartAssessment = () => {
        if (isAuthenticated) {
            navigate('/student/assessment');
        } else {
            setRole('student');
            navigate('/auth');
        }
    };

    const handleRecruiterAction = () => {
        if (isAuthenticated && user?.role === 'client') {
            navigate('/client/dashboard');
        } else {
            setRole('client');
            navigate('/auth');
        }
    };

    const handleCandidateOnboard = () => {
        setRole('student');
        navigate('/auth');
    };

    const handleRecruiterOnboard = () => {
        setRole('client');
        navigate('/auth');
    };

    return (
        <div className="w-full bg-[#050505] text-[#ededed] font-mono min-h-screen selection:bg-white/20 selection:text-white relative overflow-x-hidden flex flex-col justify-between">
            <Navbar />

            <main className="w-full pt-8 sm:pt-12 flex-1 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <div className="flex flex-col w-full">
                        {/* Empirical Skill Verification Hero Section */}
                        <HeroSection
                            onStartAssessment={handleStartAssessment}
                            onPostRequisition={handleRecruiterAction}
                        />

                        {/* Three Pillars Capabilities Grid */}
                        <CapabilitiesGrid />

                        {/* Engineering Blueprint Specification & Comparison */}
                        <BlueprintSpecSection />

                        {/* Dual Persona Workflow Segmentation */}
                        <PersonaSplitSection
                            onSelectCandidateRole={handleCandidateOnboard}
                            onSelectRecruiterRole={handleRecruiterOnboard}
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default LandingPage;
