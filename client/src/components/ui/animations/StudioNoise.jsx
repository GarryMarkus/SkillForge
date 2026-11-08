import React, { useEffect, useRef } from 'react';

/**
 * StudioNoise
 * High-performance React Bits film grain / noise background component matching the "Studio" preset.
 * Preset: Studio (Contrast: 1, Dust: 0.1, Scratches: 0.25)
 *
 * Performance features:
 * - Offscreen 32-bit typed array generation for ultra-low CPU utilization.
 * - Throttled tick rate (~24-30fps) for authentic film grain cadence.
 * - IntersectionObserver: automatically pauses when out of viewport.
 * - document.visibilityState: automatically pauses when tab is hidden.
 */
const StudioNoise = ({
    contrast = 1.0,
    dust = 0.1,
    scratches = 0.25,
    opacity = 0.2,
    patternSize = 256,
    fps = 24,
    className = ''
}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        // Offscreen canvas for cached 256x256 noise tile
        const offscreen = document.createElement('canvas');
        offscreen.width = patternSize;
        offscreen.height = patternSize;
        const offCtx = offscreen.getContext('2d');
        if (!offCtx) return;

        const imgData = offCtx.createImageData(patternSize, patternSize);
        const buf32 = new Uint32Array(imgData.data.buffer);
        const numPixels = patternSize * patternSize;

        let animId = null;
        let lastTimestamp = 0;
        const interval = 1000 / Math.max(1, fps);

        let isIntersecting = true;
        let isTabVisible = !document.hidden;

        // Resize handler to match container resolution with DPR cap
        const handleResize = () => {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.floor(rect.width * dpr);
            canvas.height = Math.floor(rect.height * dpr);
        };

        const resizeObserver = new ResizeObserver(() => {
            handleResize();
        });
        resizeObserver.observe(canvas);
        handleResize();

        // Render single frame
        const renderFrame = () => {
            // 1. Generate noise texture in 32-bit buffer (endian-aware ABGR / ARGB)
            const alphaVal = Math.floor(255 * 0.18 * contrast);
            const dustProb = dust * 0.0008;

            for (let i = 0; i < numPixels; i++) {
                let lum = Math.floor(Math.random() * 255);
                // Apply contrast curve centered at 128
                if (contrast !== 1.0) {
                    lum = Math.min(255, Math.max(0, Math.floor((lum - 128) * contrast + 128)));
                }

                let a = alphaVal;
                // Occasional dust speckle
                if (Math.random() < dustProb) {
                    lum = 250;
                    a = Math.min(255, alphaVal * 3);
                }

                // 32-bit little-endian packing: (A << 24) | (B << 16) | (G << 8) | R
                buf32[i] = (a << 24) | (lum << 16) | (lum << 8) | lum;
            }

            offCtx.putImageData(imgData, 0, 0);

            // 2. Tile onto visible canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const pattern = ctx.createPattern(offscreen, 'repeat');
            if (pattern) {
                ctx.fillStyle = pattern;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            // 3. Render hairline scratches if enabled
            if (scratches > 0) {
                const count = Math.floor(scratches * 3);
                ctx.strokeStyle = `rgba(245, 245, 245, ${0.04 * scratches})`;
                ctx.lineWidth = 1;

                for (let s = 0; s < count; s++) {
                    const startX = Math.random() * canvas.width;
                    const startY = Math.random() * canvas.height;
                    const length = 15 + Math.random() * 45;
                    const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.4;

                    ctx.beginPath();
                    ctx.moveTo(startX, startY);
                    ctx.lineTo(startX + Math.cos(angle) * length, startY + Math.sin(angle) * length);
                    ctx.stroke();
                }
            }
        };

        // Animation loop with frame throttling and idle pause
        const loop = (timestamp) => {
            if (!isIntersecting || !isTabVisible) {
                animId = null;
                return;
            }

            const delta = timestamp - lastTimestamp;
            if (delta >= interval) {
                lastTimestamp = timestamp - (delta % interval);
                renderFrame();
            }

            animId = requestAnimationFrame(loop);
        };

        const startLoop = () => {
            if (!animId && isIntersecting && isTabVisible) {
                lastTimestamp = performance.now();
                animId = requestAnimationFrame(loop);
            }
        };

        const stopLoop = () => {
            if (animId) {
                cancelAnimationFrame(animId);
                animId = null;
            }
        };

        // IntersectionObserver to pause when off-screen
        const intersectionObserver = new IntersectionObserver(
            ([entry]) => {
                isIntersecting = entry.isIntersecting;
                if (isIntersecting) {
                    startLoop();
                } else {
                    stopLoop();
                }
            },
            { threshold: 0.05 }
        );
        intersectionObserver.observe(canvas);

        // Visibility change to pause on background tab
        const handleVisibilityChange = () => {
            isTabVisible = !document.hidden;
            if (isTabVisible) {
                startLoop();
            } else {
                stopLoop();
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Start initial loop
        startLoop();

        return () => {
            stopLoop();
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [contrast, dust, scratches, patternSize, fps]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 w-full h-full select-none mix-blend-screen ${className}`}
            style={{ opacity }}
        />
    );
};

export default StudioNoise;
