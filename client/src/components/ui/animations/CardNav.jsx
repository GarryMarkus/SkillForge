import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CardNav - Executive enterprise expandable navigation bar.
 * Clean, lightweight navigation inspired by Linear and Vercel.
 * Provides smooth spring reveals for secondary modules without performance overhead or visual noise.
 */
const CardNav = ({
    cards = [],
    logo,
    cta,
    secondaryCta,
    telemetry,
    maxWidth = 1200,
    minHeight = 160,
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
            }}
        >
            {/* Top Navigation Bar Header */}
            <div className="relative rounded-xl bg-[#121318] border border-white/[0.08] shadow-lg px-4 sm:px-6 py-2.5 transition-colors">
                <div className="flex items-center justify-between gap-4">
                    {/* Left: Brand Logo & Telemetry */}
                    <div className="flex items-center gap-4 sm:gap-6">
                        {logo}
                        {telemetry && (
                            <div className="hidden lg:flex items-center">
                                {telemetry}
                            </div>
                        )}
                    </div>

                    {/* Right: Controls & Actions */}
                    <div className="flex items-center gap-2.5 sm:gap-3">
                        {secondaryCta && (
                            <div className="hidden sm:flex items-center">
                                {secondaryCta}
                            </div>
                        )}

                        {cta && (
                            <div>
                                {cta}
                            </div>
                        )}

                        {/* Menu Toggle Button */}
                        <button
                            type="button"
                            onClick={() => setIsOpen((prev) => !prev)}
                            className="group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/60 text-zinc-300 hover:text-white text-xs font-medium transition-colors cursor-pointer select-none"
                            aria-expanded={isOpen}
                            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        >
                            <div className="relative w-3.5 h-3.5 flex flex-col justify-center items-center gap-1">
                                <motion.span
                                    animate={isOpen ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="w-3.5 h-[1.5px] bg-zinc-300 group-hover:bg-white rounded-full block"
                                />
                                <motion.span
                                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                                    transition={{ duration: 0.15 }}
                                    className="w-3.5 h-[1.5px] bg-zinc-400 rounded-full block"
                                />
                                <motion.span
                                    animate={isOpen ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="w-3.5 h-[1.5px] bg-zinc-300 group-hover:bg-white rounded-full block"
                                />
                            </div>

                            {menuLabel && (
                                <span className="text-xs font-medium tracking-normal text-zinc-300 group-hover:text-white transition-colors">
                                    {isOpen ? 'Close' : 'Menu'}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Spring-Open Card Nav Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            className="pt-4 mt-3 border-t border-white/[0.08]"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                {cards.map((card, idx) => (
                                    <div
                                        key={card.title || idx}
                                        style={{ minHeight: `${minHeight}px` }}
                                        className="rounded-lg bg-[#181A22] border border-white/[0.06] p-4 flex flex-col justify-between hover:border-zinc-700 transition-colors group"
                                    >
                                        <div className="space-y-2.5">
                                            {/* Card Tag */}
                                            <div className="flex items-center justify-between border-b border-white/[0.05] pb-2">
                                                <span className="text-[11px] font-medium tracking-wide text-zinc-400 uppercase">
                                                    {card.tag || `Section 0${idx + 1}`}
                                                </span>
                                                {card.icon && (
                                                    <span className="material-symbols-outlined text-[16px] text-zinc-500 group-hover:text-zinc-300 transition-colors">
                                                        {card.icon}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Card Title & Description */}
                                            <div>
                                                <h4 className="font-semibold text-white text-sm tracking-tight">
                                                    {card.title}
                                                </h4>
                                                {card.description && (
                                                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                                                        {card.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Card Links List */}
                                        <div className="space-y-1 pt-2.5 border-t border-white/[0.05]">
                                            {card.links?.map((link, lIdx) => {
                                                const isExternal = typeof link.href === 'string' && link.href.startsWith('#');
                                                const content = (
                                                    <div className="flex items-center justify-between text-xs py-1 text-zinc-300 hover:text-white transition-colors group/link cursor-pointer">
                                                        <span className="font-medium flex items-center gap-1.5">
                                                            <span className="w-1 h-1 rounded-full bg-zinc-500 group-hover/link:bg-blue-400 transition-colors" />
                                                            {link.title}
                                                        </span>
                                                        <span className="material-symbols-outlined text-[14px] text-zinc-500 group-hover/link:text-zinc-300 transform transition-transform group-hover/link:translate-x-0.5">
                                                            chevron_right
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
                                    </div>
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
