import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/sections/Footer';

const ProtocolPage = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-[#ededed] font-mono flex flex-col selection:bg-white/20 selection:text-white">
            <Navbar />
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36">
                <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
                    Protocol &amp; Specifications
                </h1>
            </main>
            <Footer />
        </div>
    );
};

export default ProtocolPage;
