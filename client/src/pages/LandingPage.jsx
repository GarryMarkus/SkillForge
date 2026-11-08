import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/sections/HeroSection';
import CapabilitiesGrid from '../components/sections/CapabilitiesGrid';
import BlueprintSpecSection from '../components/sections/BlueprintSpecSection';
import PersonaSplitSection from '../components/sections/PersonaSplitSection';
import Footer from '../components/sections/Footer';
import CadGridBackground from '../components/ui/animations/CadGridBackground';
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
        <div className="w-full bg-[#07080B] text-slate-100 font-sans min-h-screen selection:bg-cyan-500/20 selection:text-cyan-300 relative overflow-x-hidden">
            <CadGridBackground
                gridSize={36}
                gridColor="rgba(255, 255, 255, 0.035)"
                crosshairColor="rgba(255, 255, 255, 0.08)"
                spotlightColor="rgba(0, 240, 255, 0.12)"
                spotlightCrosshairColor="#00F0FF"
                spotlightRadius={220}
                className="min-h-screen flex flex-col justify-between"
            >
                <Navbar />

                <main className="w-full pt-8 sm:pt-12 min-h-[calc(100vh-64px)] relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
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
            </CadGridBackground>
        </div>
    );
};

export default LandingPage;
