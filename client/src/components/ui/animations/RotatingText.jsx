import React, {
    forwardRef,
    useCallback,
    useEffect,
    useLayoutEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../lib/cn';

/**
 * RotatingText - React Bits text-rotation primitive.
 * Adapted for SkillForge with strict dark monochrome typography tokens.
 *
 * Invariants:
 * - Pure Courier Prime & Consolas typography.
 * - Smooth character or word-level staggered spring transitions.
 * - Synchronous measured width interpolation for fluid highlight badge resizing.
 * - Zero layout jitter, accessible sr-only text announcement.
 */
const RotatingText = forwardRef((
    {
        texts = [],
        transition = { type: 'spring', damping: 26, stiffness: 240 },
        initial = { y: '100%', opacity: 0 },
        animate = { y: 0, opacity: 1 },
        exit = { y: '-120%', opacity: 0 },
        animatePresenceMode = 'wait',
        animatePresenceInitial = false,
        rotationInterval = 2800,
        staggerDuration = 0.025,
        staggerFrom = 'first',
        loop = true,
        auto = true,
        splitBy = 'characters',
        highlight = false,
        highlightColor = '',
        onNext,
        mainClassName = '',
        splitLevelClassName = '',
        elementLevelClassName = '',
        ...rest
    },
    ref
) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const measureRef = useRef(null);
    const [currentWidth, setCurrentWidth] = useState('auto');

    const splitIntoChars = (text) => {
        if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
            const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
            return Array.from(segmenter.segment(text), (segment) => segment.segment);
        }
        return Array.from(text);
    };

    const elements = useMemo(() => {
        if (!texts || texts.length === 0) return [];
        const currentText = texts[currentTextIndex] || '';

        if (splitBy === 'characters') {
            const letters = splitIntoChars(currentText);
            return letters.map((letter, i) => ({
                char: letter === ' ' ? '\u00A0' : letter,
                index: i,
            }));
        }
        if (splitBy === 'words') {
            return currentText.split(' ').map((word, i) => ({
                char: word,
                index: i,
            }));
        }
        if (splitBy === 'lines') {
            return currentText.split('\n').map((line, i) => ({
                char: line,
                index: i,
            }));
        }
        return currentText.split(splitBy).map((part, i) => ({
            char: part,
            index: i,
        }));
    }, [texts, currentTextIndex, splitBy]);

    const getStaggerDelay = useCallback(
        (index, totalLength) => {
            if (staggerDuration === 0) return 0;
            if (typeof staggerFrom === 'number') {
                const distance = Math.abs(staggerFrom - index);
                return distance * staggerDuration;
            }
            if (staggerFrom === 'first') {
                return index * staggerDuration;
            }
            if (staggerFrom === 'last') {
                return (totalLength - 1 - index) * staggerDuration;
            }
            if (staggerFrom === 'center') {
                const center = Math.floor(totalLength / 2);
                return Math.abs(center - index) * staggerDuration;
            }
            if (staggerFrom === 'random') {
                const randomIndex = Math.floor(Math.random() * totalLength);
                return Math.abs(randomIndex - index) * staggerDuration;
            }
            return index * staggerDuration;
        },
        [staggerDuration, staggerFrom]
    );

    const next = useCallback(() => {
        setCurrentTextIndex((prevIndex) => {
            const nextIndex =
                prevIndex === texts.length - 1
                    ? loop
                        ? 0
                        : prevIndex
                    : prevIndex + 1;
            if (nextIndex !== prevIndex) {
                onNext?.(nextIndex);
            }
            return nextIndex;
        });
    }, [texts.length, loop, onNext]);

    const previous = useCallback(() => {
        setCurrentTextIndex((prevIndex) => {
            const nextIndex =
                prevIndex === 0
                    ? loop
                        ? texts.length - 1
                        : prevIndex
                    : prevIndex - 1;
            if (nextIndex !== prevIndex) {
                onNext?.(nextIndex);
            }
            return nextIndex;
        });
    }, [texts.length, loop, onNext]);

    const jumpTo = useCallback(
        (index) => {
            const validIndex = Math.max(0, Math.min(index, texts.length - 1));
            if (validIndex !== currentTextIndex) {
                setCurrentTextIndex(validIndex);
                onNext?.(validIndex);
            }
        },
        [texts.length, currentTextIndex, onNext]
    );

    const reset = useCallback(() => {
        if (currentTextIndex !== 0) {
            setCurrentTextIndex(0);
            onNext?.(0);
        }
    }, [currentTextIndex, onNext]);

    useImperativeHandle(
        ref,
        () => ({
            next,
            previous,
            jumpTo,
            reset,
        }),
        [next, previous, jumpTo, reset]
    );

    useEffect(() => {
        if (!auto || texts.length <= 1) return;
        const intervalId = setInterval(next, rotationInterval);
        return () => clearInterval(intervalId);
    }, [auto, rotationInterval, next, texts.length]);

    // Measure active word dimensions accurately for silky-smooth width transitions
    const updateWidth = useCallback(() => {
        if (measureRef.current) {
            const rect = measureRef.current.getBoundingClientRect();
            if (rect.width > 0) {
                setCurrentWidth(Math.ceil(rect.width));
            }
        }
    }, []);

    const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

    useIsomorphicLayoutEffect(() => {
        updateWidth();
    }, [currentTextIndex, texts, updateWidth]);

    useEffect(() => {
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, [updateWidth]);

    const isHighlightActive = Boolean(highlight && highlightColor);
    const highlightStyle = isHighlightActive ? { backgroundColor: highlightColor } : undefined;

    const widthTransition = {
        type: 'spring',
        damping: 26,
        stiffness: 220,
        mass: 0.8,
    };

    return (
        <>
            {/* Invisible measurement node with identical typography and padding */}
            <span
                ref={measureRef}
                aria-hidden="true"
                className={cn(
                    'pointer-events-none select-none invisible whitespace-nowrap font-display',
                    isHighlightActive && 'px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-sm',
                    mainClassName
                )}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    visibility: 'hidden',
                    whiteSpace: 'nowrap',
                }}
            >
                {texts[currentTextIndex]}
            </span>

            <motion.span
                layout
                animate={{ width: currentWidth }}
                transition={{
                    width: widthTransition,
                    layout: widthTransition,
                }}
                style={highlightStyle}
                className={cn(
                    'inline-flex items-center overflow-hidden font-display relative align-middle',
                    isHighlightActive && 'px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-sm text-[#050505] selection:bg-[#050505] selection:text-white',
                    mainClassName
                )}
                {...rest}
            >
                <span className="sr-only">{texts[currentTextIndex]}</span>
                <AnimatePresence
                    mode={animatePresenceMode}
                    initial={animatePresenceInitial}
                >
                    <motion.span
                        key={currentTextIndex}
                        className={cn(
                            'inline-flex items-center whitespace-nowrap relative justify-start w-full',
                            splitLevelClassName
                        )}
                        layout
                        aria-hidden="true"
                    >
                        {elements.map((el, index) => {
                            const delay = getStaggerDelay(index, elements.length);
                            return (
                                <motion.span
                                    key={index}
                                    initial={initial}
                                    animate={animate}
                                    exit={exit}
                                    transition={{
                                        ...transition,
                                        delay: transition?.delay ? transition.delay + delay : delay,
                                    }}
                                    className={cn('inline-block', elementLevelClassName)}
                                >
                                    {el.char}
                                </motion.span>
                            );
                        })}
                    </motion.span>
                </AnimatePresence>
            </motion.span>
        </>
    );
});

RotatingText.displayName = 'RotatingText';

export default RotatingText;
