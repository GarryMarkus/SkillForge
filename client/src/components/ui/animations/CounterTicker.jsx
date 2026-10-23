import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * CounterTicker - Mechanical monospace odometer/number ticker.
 * Smoothly counts from start up to target value with zero layout shifting.
 * Supports real-time dynamic value updates.
 */
const CounterTicker = ({
    value,
    duration = 1.2,
    prefix = '',
    suffix = '',
    decimals,
    className = '',
    trigger = 'view', // 'view' | 'mount'
    easing = 'easeOut', // 'easeOut' | 'linear'
}) => {
    // Parse value if passed as string like "96.4%" or "12ms"
    const parsedTarget = typeof value === 'number' 
        ? value 
        : parseFloat(String(value).replace(/[^0-9.-]/g, '')) || 0;
    
    // Auto-detect decimal places if not specified
    const inferredDecimals = decimals !== undefined 
        ? decimals 
        : (String(value).split('.')[1] || '').replace(/[^0-9]/g, '').length;

    const [currentVal, setCurrentVal] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const currentValRef = useRef(0);
    const prevTargetRef = useRef(parsedTarget);
    const containerRef = useRef(null);
    const rafRef = useRef(null);

    const startTick = useCallback((fromValue, toValue, customDuration) => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);

        const startTime = performance.now();
        const durationMs = (customDuration || duration) * 1000;
        const changeInValue = toValue - fromValue;

        if (changeInValue === 0) {
            rafRef.current = requestAnimationFrame(() => {
                setCurrentVal(toValue);
                currentValRef.current = toValue;
                setHasAnimated(true);
            });
            return;
        }

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / durationMs, 1);

            let easedProgress = progress;
            if (easing === 'easeOut') {
                // Mechanical cubic ease out: 1 - (1 - p)^3
                easedProgress = 1 - Math.pow(1 - progress, 3);
            }

            const nextValue = fromValue + changeInValue * easedProgress;
            setCurrentVal(nextValue);
            currentValRef.current = nextValue;

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(animate);
            } else {
                setCurrentVal(toValue);
                currentValRef.current = toValue;
                setHasAnimated(true);
            }
        };

        rafRef.current = requestAnimationFrame(animate);
    }, [duration, easing]);

    // Initial trigger
    useEffect(() => {
        if (trigger === 'mount') {
            startTick(0, parsedTarget, duration);
            return () => {
                if (rafRef.current) cancelAnimationFrame(rafRef.current);
            };
        }

        if (trigger === 'view') {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        startTick(0, parsedTarget, duration);
                        observer.disconnect();
                    }
                },
                { threshold: 0.15 }
            );

            const el = containerRef.current;
            if (el) observer.observe(el);

            return () => {
                observer.disconnect();
                if (rafRef.current) cancelAnimationFrame(rafRef.current);
            };
        }

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [trigger, hasAnimated, parsedTarget, duration, startTick]);

    // Handle dynamic updates to `parsedTarget`
    useEffect(() => {
        if (hasAnimated && parsedTarget !== prevTargetRef.current) {
            startTick(currentValRef.current, parsedTarget, Math.min(duration, 0.8));
            prevTargetRef.current = parsedTarget;
        }
    }, [parsedTarget, hasAnimated, duration, startTick]);

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
