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
        <div className="w-full bg-[#FAFAFA] text-gray-900 font-sans min-h-screen selection:bg-blue-100 selection:text-blue-900">
            <Navbar />

            <main className="w-full pt-20 sm:pt-24 bg-[#FAFAFA] min-h-[calc(100vh-48px)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                    <div className="flex flex-col w-full">
                        {/* Empirical Skill Verification Hero Section */}
                        <HeroSection 
                            onStartAssessment={handleStartAssessment} 
                            onPostRequisition={handleRecruiterAction} 
                        />

                        {/* Architectural Pillars Capabilities Grid */}
                        <CapabilitiesGrid />

                        {/* Full-Bleed CAD Engineering Blueprint Specification */}
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
