import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
import './CardNav.css';

/**
 * CardNav - SkillForge Expandable Navigation System
 * Adapted from React Bits CardNav with strict dark monochrome tokens.
 *
 * Invariants:
 * - Pure monochrome styling (#050505 canvas, #0e0e11 panel, #121215 cards).
 * - Typography: Courier Prime bold headings, Consolas monospace links and metadata.
 * - Zero artificial slashes, zero bracket wrappers.
 */
const CardNav = ({
    cards = [],
    logo,
    cta,
    secondaryCta,
    telemetry,
    maxWidth = 1200,
    menuLabel = true,
    linkComponent: LinkComp = 'a',
    cardEffect = 'rise',
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

    const cardVariants = {
        hidden: { opacity: 0, y: cardEffect === 'rise' ? 14 : 0 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.04,
                duration: 0.22,
                ease: [0.16, 1, 0.3, 1],
            },
        }),
    };

    return (
        <nav
            ref={navRef}
            className={`card-nav ${className}`}
            style={{
                maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
            }}
            aria-label="Primary Navigation"
        >
            {/* Top Navigation Bar Header */}
            <div className="card-nav__bar">
                {/* Left: Brand Identity & Telemetry */}
                <div className="card-nav__left">
                    {logo && <div className="card-nav__logo">{logo}</div>}
                    {telemetry && <div className="hidden lg:flex items-center">{telemetry}</div>}
                </div>

                {/* Right: Controls & Actions */}
                <div className="card-nav__right">
                    {secondaryCta && <div className="hidden sm:flex items-center">{secondaryCta}</div>}
                    {cta && <div>{cta}</div>}

                    {/* Menu Toggle Button with morph animation and locked width */}
                    <button
                        type="button"
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="card-nav__menu"
                        aria-expanded={isOpen}
                        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                    >
                        {/* Hamburger to Cross Morph Icon */}
                        <span className="relative w-3.5 h-3.5 flex flex-col justify-center items-center gap-[3px] overflow-hidden" aria-hidden="true">
                            <motion.span
                                animate={isOpen ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                                className="w-3.5 h-[1.5px] bg-[#f5f5f5] rounded-full block origin-center"
                            />
                            <motion.span
                                animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                                transition={{ duration: 0.15 }}
                                className="w-3.5 h-[1.5px] bg-[#f5f5f5] rounded-full block origin-center"
                            />
                            <motion.span
                                animate={isOpen ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                                className="w-3.5 h-[1.5px] bg-[#f5f5f5] rounded-full block origin-center"
                            />
                        </span>
                        {menuLabel && (
                            <span className="w-9 text-left font-mono text-xs select-none">
                                {isOpen ? 'Close' : 'Menu'}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Expandable Navigation Cards Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.99 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.99 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="card-nav__panel"
                    >
                        <div className="card-nav__cards">
                            {cards.map((card, idx) => (
                                <motion.div
                                    key={card.label || card.title || idx}
                                    custom={idx}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="card-nav__card"
                                >
                                    <div className="card-nav__card-header">
                                        {card.href ? (
                                            <LinkComp
                                                to={card.href}
                                                href={card.href}
                                                className="card-nav__label hover:text-white transition-colors flex items-center justify-between"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <span>{card.label || card.title}</span>
                                                <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} strokeWidth={1.5} className="opacity-60" />
                                            </LinkComp>
                                        ) : (
                                            <h3 className="card-nav__label">
                                                {card.label || card.title}
                                            </h3>
                                        )}
                                        {card.description && (
                                            <p className="card-nav__description">
                                                {card.description}
                                            </p>
                                        )}
                                    </div>

                                    {card.links && card.links.length > 0 && (
                                        <div className="card-nav__links">
                                            {card.links.map((link, linkIdx) => (
                                                <LinkComp
                                                    key={link.label || linkIdx}
                                                    to={link.href || link.to}
                                                    href={link.href}
                                                    className="card-nav__link"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    <span>{link.label}</span>
                                                    <span className="card-nav__link-icon">
                                                        <HugeiconsIcon
                                                            icon={ArrowUpRight01Icon}
                                                            size={14}
                                                            strokeWidth={1.5}
                                                        />
                                                    </span>
                                                </LinkComp>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default CardNav;
