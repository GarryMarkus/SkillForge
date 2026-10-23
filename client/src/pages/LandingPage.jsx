import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/sections/Navbar';
import SubNavBar from '../components/sections/SubNavBar';
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
        <div className="w-full bg-canvas-light text-ink-primary font-mono min-h-screen selection:bg-canvas-blueprint selection:text-white">
            <Navbar />

            <main className="w-full pt-[84px] bg-canvas-light min-h-[calc(100vh-48px)]">
                <div className="max-w-7xl mx-auto px-margin py-margin">
                    <div className="flex flex-col w-full">
                        {/* Secondary Coordinate Sub-Nav Rail */}
                        <SubNavBar />

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
