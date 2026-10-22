import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { useThemeStore } from '../../store/themeStore';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const Layout = ({ children }) => {
    const { theme } = useThemeStore();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    // Dynamic background based on theme
    const bgClass = theme === 'light' ? 'bg-light-canvas' : 'bg-dark-canvas';
    const textClass = theme === 'light' ? 'text-light-border' : 'text-gray-100';

    return (
        <div className={cn("min-h-screen transition-colors duration-500", bgClass, textClass)}>
            <main className="relative z-10 flex flex-col items-center w-full">
                {children}
            </main>
        </div>
    );
};

export default Layout;
