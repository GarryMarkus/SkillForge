import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-surface text-on-surface font-mono selection:bg-primary-container selection:text-on-primary">
            <main className="relative z-10 flex flex-col items-center w-full min-h-screen">
                {children}
            </main>
        </div>
    );
};

export default Layout;
