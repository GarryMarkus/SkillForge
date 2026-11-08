import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CardNav - React Bits-style interactive expandable navigation bar.
 * A sleek top navigation bar that springs open into a row of interactive cards
 * with nested links, telemetry badges, and smooth spring physics.
 * Automatically dismisses on Escape key or route transitions.
 */
const CardNav = ({
    cards = [],
    logo,
    cta,
    secondaryCta,
    telemetry,
    maxWidth = 1200,
    minHeight = 180,
    accentColor = '#00F0FF',
    menuLabel = true,
    linkComponent: LinkComp = 'a',
    className = '',
    routeKey,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [prevRouteKey, setPrevRouteKey] = useState(routeKey);
    const navRef = useRef(null);

    // Sync state with route change during render without effect cascade
    if (routeKey !== prevRouteKey) {
        setPrevRouteKey(routeKey);
        setIsOpen(false);
    }

    // Close on Escape key press or click outside
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        const handleClickOutside = (e) => {
            if (navRef.current && !navRef.current.contains(e.target) && isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div
            ref={navRef}
            className={`w-full relative z-50 font-sans ${className}`}
            style={{
                maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
                '--cardnav-accent': accentColor,
            }}
        >
            {/* Top Navigation Bar Header */}
            <div className="relative rounded-2xl bg-[#07080B]/90 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.6)] px-4 sm:px-6 py-3 transition-all duration-300">
                <div className="flex items-center justify-between gap-4">
                    {/* Left: Brand Logo */}
                    <div className="flex items-center gap-4 sm:gap-6">
                        {logo}
                        {telemetry && (
                            <div className="hidden lg:flex items-center">
                                {telemetry}
                            </div>
                        )}
                    </div>

                    {/* Right: Controls & Actions */}
                    <div className="flex items-center gap-3 sm:gap-4">
                        {/* Secondary CTA (e.g., Dashboard or Sign In) */}
                        {secondaryCta && (
                            <div className="hidden sm:flex items-center">
                                {secondaryCta}
                            </div>
                        )}

                        {/* Primary Action Button (CTA) */}
                        {cta && (
                            <div>
                                {cta}
                            </div>
                        )}

                        {/* Menu Toggle Pill Button */}
                        <button
                            type="button"
                            onClick={() => setIsOpen((prev) => !prev)}
                            className="group relative inline-flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-cyanAccent/40 text-slate-200 hover:text-white transition-all cursor-pointer shadow-sm select-none"
                            aria-expanded={isOpen}
                            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        >
                            {/* Animated Icon (Hamburger to Close) */}
                            <div className="relative w-4 h-4 flex flex-col justify-center items-center gap-1">
                                <motion.span
                                    animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="w-3.5 h-[2px] bg-cyanAccent rounded-full block"
                                />
                                <motion.span
                                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                                    transition={{ duration: 0.15 }}
                                    className="w-3.5 h-[2px] bg-slate-300 rounded-full block"
                                />
                                <motion.span
                                    animate={isOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="w-3.5 h-[2px] bg-cyanAccent rounded-full block"
                                />
                            </div>

                            {/* Rolling Menu/Close Label */}
                            {menuLabel && (
                                <span className="text-xs font-mono font-semibold tracking-wider text-slate-300 group-hover:text-cyanAccent transition-colors">
                                    {isOpen ? 'CLOSE' : 'MENU'}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Spring-Open Card Nav Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -12, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.98 }}
                            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
                            className="pt-4 mt-3 border-t border-white/[0.08]"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {cards.map((card, idx) => (
                                    <motion.div
                                        key={card.title || idx}
                                        initial={{ opacity: 0, y: 14 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 8 }}
                                        transition={{
                                            duration: 0.25,
                                            delay: idx * 0.05,
                                            ease: 'easeOut',
                                        }}
                                        style={{ minHeight: `${minHeight}px` }}
                                        className="rounded-xl bg-[#0C0E14]/95 border border-white/[0.08] p-5 flex flex-col justify-between hover:border-cyanAccent/40 hover:bg-[#11141C] shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-all group"
                                    >
                                        <div className="space-y-3">
                                            {/* Card Tag & Icon */}
                                            <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
                                                <span className="text-[10px] font-mono font-bold tracking-wider text-cyanAccent uppercase">
                                                    {card.tag || `MODULE_0${idx + 1}`}
                                                </span>
                                                {card.icon && (
                                                    <span className="material-symbols-outlined text-[18px] text-cyanAccent/70 group-hover:text-cyanAccent transition-colors">
                                                        {card.icon}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Card Title & Description */}
                                            <div>
                                                <h4 className="font-display font-bold text-white text-base tracking-tight group-hover:text-cyanAccent transition-colors">
                                                    {card.title}
                                                </h4>
                                                {card.description && (
                                                    <p className="text-xs text-slate-400 mt-1 leading-relaxed font-sans">
                                                        {card.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Card Links List */}
                                        <div className="space-y-1.5 pt-3 border-t border-white/[0.06]">
                                            {card.links?.map((link, lIdx) => {
                                                const isExternal = typeof link.href === 'string' && link.href.startsWith('#');
                                                const content = (
                                                    <div className="flex items-center justify-between text-xs py-1 text-slate-300 hover:text-cyanAccent transition-colors group/link cursor-pointer">
                                                        <span className="font-medium flex items-center gap-1.5">
                                                            <span className="w-1 h-1 rounded-full bg-cyanAccent/50 group-hover/link:bg-cyanAccent transition-colors" />
                                                            {link.title}
                                                        </span>
                                                        <span className="material-symbols-outlined text-[14px] text-slate-500 group-hover/link:text-cyanAccent transform transition-transform group-hover/link:translate-x-1">
                                                            arrow_forward
                                                        </span>
                                                    </div>
                                                );

                                                if (link.onClick) {
                                                    return (
                                                        <button
                                                            key={lIdx}
                                                            type="button"
                                                            onClick={() => {
                                                                setIsOpen(false);
                                                                link.onClick();
                                                            }}
                                                            className="w-full text-left"
                                                        >
                                                            {content}
                                                        </button>
                                                    );
                                                }

                                                if (isExternal) {
                                                    return (
                                                        <a
                                                            key={lIdx}
                                                            href={link.href}
                                                            onClick={() => setIsOpen(false)}
                                                        >
                                                            {content}
                                                        </a>
                                                    );
                                                }

                                                return (
                                                    <LinkComp
                                                        key={lIdx}
                                                        to={link.href}
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        {content}
                                                    </LinkComp>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CardNav;
