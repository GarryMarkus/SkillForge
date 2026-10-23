import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * CounterTicker - Mechanical monospace odometer/number ticker.
 * Smoothly counts from 0 (or start) up to target value with zero layout shifting.
 */
const CounterTicker = ({
    value,
    duration = 1.4,
    prefix = '',
    suffix = '',
    decimals,
    className = '',
    trigger = 'view', // 'view' | 'mount'
    easing = 'easeOut', // 'easeOut' | 'linear'
}) => {
    // Parse value if passed as string like "96.4%" or "12ms"
    const parsedTarget = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9.-]/g, '')) || 0;
    
    // Auto-detect decimal places if not specified
    const inferredDecimals = decimals !== undefined 
        ? decimals 
        : (String(value).split('.')[1] || '').replace(/[^0-9]/g, '').length;

    const [currentVal, setCurrentVal] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const containerRef = useRef(null);
    const rafRef = useRef(null);

    const startTick = useCallback(() => {
        const startTime = performance.now();
        const durationMs = duration * 1000;
        const startValue = 0;
        const changeInValue = parsedTarget - startValue;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / durationMs, 1);

            let easedProgress = progress;
            if (easing === 'easeOut') {
                // Mechanical cubic ease out: 1 - (1 - p)^3
                easedProgress = 1 - Math.pow(1 - progress, 3);
            }

            const nextValue = startValue + changeInValue * easedProgress;
            setCurrentVal(nextValue);

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(animate);
            } else {
                setCurrentVal(parsedTarget);
                setHasAnimated(true);
            }
        };

        rafRef.current = requestAnimationFrame(animate);
    }, [duration, easing, parsedTarget]);

    useEffect(() => {
        if (trigger === 'mount') {
            startTick();
            return () => {
                if (rafRef.current) cancelAnimationFrame(rafRef.current);
            };
        }

        if (trigger === 'view') {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        startTick();
                    }
                },
                { threshold: 0.2 }
            );

            const el = containerRef.current;
            if (el) observer.observe(el);

            return () => {
                if (el) observer.unobserve(el);
                if (rafRef.current) cancelAnimationFrame(rafRef.current);
            };
        }

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [trigger, hasAnimated, startTick]);

    const formattedNumber = currentVal.toLocaleString('en-US', {
        minimumFractionDigits: inferredDecimals,
        maximumFractionDigits: inferredDecimals,
    });

    return (
        <span
            ref={containerRef}
            className={`font-mono inline-block tabular-nums select-none ${className}`}
        >
            {prefix}{formattedNumber}{suffix}
        </span>
    );
};

export default CounterTicker;
