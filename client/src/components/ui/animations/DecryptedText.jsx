import React, { useState, useEffect, useRef, useCallback } from 'react';

const DEFAULT_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_/#+=-';

/**
 * DecryptedText - High-performance monospace terminal text scrambler.
 * Cycles unrevealed characters at high speed before locking in the target string.
 */
const DecryptedText = ({
    text = '',
    speed = 30,
    maxIterations = 8,
    characters = DEFAULT_CHARS,
    className = '',
    parentClassName = '',
    encryptedClassName = 'text-primary-container font-bold opacity-75',
    animateOn = 'view', // 'view' | 'mount' | 'hover'
    revealDirection = 'start', // 'start' | 'end' | 'center'
    onComplete,
}) => {
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const containerRef = useRef(null);
    const intervalRef = useRef(null);

    const startScramble = useCallback(() => {
        if (!text) return;
        setIsScrambling(true);

        const length = text.length;
        let iteration = 0;
        const totalIterations = length * maxIterations;

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            iteration++;

            const revealedIndices = new Set();
            const revealCount = Math.floor((iteration / totalIterations) * length);

            if (revealDirection === 'start') {
                for (let i = 0; i < revealCount; i++) revealedIndices.add(i);
            } else if (revealDirection === 'end') {
                for (let i = length - 1; i >= length - revealCount; i--) revealedIndices.add(i);
            } else {
                // center outward
                const mid = Math.floor(length / 2);
                for (let i = 0; i < revealCount; i++) {
                    const offset = Math.floor((i + 1) / 2) * (i % 2 === 0 ? 1 : -1);
                    const idx = mid + offset;
                    if (idx >= 0 && idx < length) revealedIndices.add(idx);
                }
            }

            const scrambled = text
                .split('')
                .map((char, index) => {
                    if (char === ' ' || char === '\n') return char;
                    if (revealedIndices.has(index) || iteration >= totalIterations) {
                        return char;
                    }
                    return characters[Math.floor(Math.random() * characters.length)];
                })
                .join('');

            setDisplayText(scrambled);

            if (iteration >= totalIterations) {
                clearInterval(intervalRef.current);
                setIsScrambling(false);
                setHasAnimated(true);
                setDisplayText(text);
                if (onComplete) onComplete();
            }
        }, speed);
    }, [text, speed, maxIterations, characters, revealDirection, onComplete]);

    // IntersectionObserver for 'view' trigger
    useEffect(() => {
        if (animateOn === 'mount') {
            startScramble();
            return () => {
                if (intervalRef.current) clearInterval(intervalRef.current);
            };
        }

        if (animateOn === 'view') {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        startScramble();
                        observer.disconnect();
                    }
                },
                { threshold: 0.15 }
            );

            const el = containerRef.current;
            if (el) observer.observe(el);

            return () => {
                observer.disconnect();
                if (intervalRef.current) clearInterval(intervalRef.current);
            };
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [animateOn, hasAnimated, startScramble]);

    // Handle text change
    useEffect(() => {
        setDisplayText(text);
    }, [text]);

    const handleMouseEnter = () => {
        if (animateOn === 'hover' && !isScrambling) {
            startScramble();
        }
    };

    return (
        <span
            ref={containerRef}
            onMouseEnter={handleMouseEnter}
            className={`font-mono inline-block ${parentClassName}`}
        >
            <span className={`${className} ${isScrambling ? encryptedClassName : ''}`}>
                {displayText}
            </span>
        </span>
    );
};

export default DecryptedText;
