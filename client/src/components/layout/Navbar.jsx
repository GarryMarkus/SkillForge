import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import ThemeToggle from './ThemeToggle';
import { cn } from './Layout';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Features', href: '#' },
        { name: 'Pricing', href: '#' },
        { name: 'Success Stories', href: '#' },
        { name: 'About', href: '#' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-4",
                    scrolled ? "bg-light-canvas/80 dark:bg-dark-canvas/80 backdrop-blur-md border-b border-light-border/10 dark:border-white/10" : "bg-transparent"
                )}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer group">
                        <Sparkles className="w-8 h-8 text-light-border dark:text-white group-hover:rotate-12 transition-transform" />
                        <span className="text-3xl font-black tracking-tighter text-light-border dark:text-white">
                            SkillForge
                        </span>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="font-bold text-lg text-light-border/70 dark:text-white/70 hover:text-light-border dark:hover:text-white transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-orange-500 transition-all group-hover:w-full rounded-full" />
                            </a>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/auth" className="font-bold text-lg hover:underline decoration-wavy decoration-orange-500 underline-offset-4">
                            Sign In
                        </Link>
                        <Link to="/auth">
                            <Button variant="primary" className="px-8 !bg-blue-500 !text-white !border-black dark:!border-white hover:!bg-blue-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none">
                                Get Started
                            </Button>
                        </Link>
                        <ThemeToggle className="ml-2" />
                    </div>

                    {/* Mobile Hamburger */}
                    <div className="md:hidden flex items-center gap-4">
                        <ThemeToggle className="scale-75" />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="relative z-50 p-2"
                        >
                            <div className="flex flex-col gap-1.5 items-end justify-center w-8">
                                <motion.span
                                    animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                                    className="w-8 h-1 bg-black dark:bg-white rounded-full block origin-center"
                                />
                                <motion.span
                                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                                    className="w-6 h-1 bg-black dark:bg-white rounded-full block"
                                />
                                <motion.span
                                    animate={isOpen ? { rotate: -45, y: -8, width: "2rem" } : { rotate: 0, y: 0, width: "1rem" }}
                                    className="w-4 h-1 bg-black dark:bg-white rounded-full block origin-center"
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Unique Mobile Menu Overlay - "The Ink Spill" */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={{
                            open: {
                                clipPath: `circle(150% at calc(100% - 3rem) 3rem)`,
                                transition: { type: "spring", stiffness: 20, damping: 10 }
                            },
                            closed: {
                                clipPath: `circle(0% at calc(100% - 3rem) 3rem)`,
                                transition: { type: "spring", stiffness: 400, damping: 40 }
                            }
                        }}
                        className="fixed inset-0 z-40 bg-orange-500 dark:bg-purple-900 flex flex-col items-center justify-center"
                    >
                        <div className="flex flex-col gap-8 text-center">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    variants={{
                                        open: { y: 0, opacity: 1, transition: { delay: 0.2 + index * 0.1 } },
                                        closed: { y: 20, opacity: 0 }
                                    }}
                                    className="text-5xl font-black text-white hover:text-black dark:hover:text-blue-300 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </motion.a>
                            ))}

                            <motion.div
                                variants={{
                                    open: { y: 0, opacity: 1, transition: { delay: 0.6 } },
                                    closed: { y: 20, opacity: 0 }
                                }}
                                className="flex flex-col gap-4 mt-8"
                            >
                                <Link to="/auth" onClick={() => setIsOpen(false)}>
                                    <Button className="bg-white text-black border-black text-2xl py-4 px-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                                        Get Started
                                    </Button>
                                </Link>
                                <Link to="/auth" onClick={() => setIsOpen(false)} className="text-2xl font-bold text-white underline decoration-wavy">Sign In</Link>
                            </motion.div>
                        </div>

                        {/* Decorative Background Patterns in Menu */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
