import React, { useEffect, useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

const ProctorWrapper = ({ 
    children, 
    onDisqualify, 
    onWarning, 
    onFaceDetectedChange,
    onLogEvent,
    showStandaloneWebcam = false 
}) => {
    const [warnings, setWarnings] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(true);
    const [isArmed, setIsArmed] = useState(false);
    const [, setNoFaceWarning] = useState(false);
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const noFaceCountRef = useRef(0);

    // Arm after 2 seconds
    useEffect(() => {
        const timer = setTimeout(() => setIsArmed(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    const triggerWarning = useCallback((reason) => {
        setWarnings(prev => {
            const newCount = prev + 1;
            onWarning?.(`${reason} (${newCount}/3)`);
            onLogEvent?.(`WARNING: ${reason.toUpperCase()} (+15 PTS)`);
            if (newCount >= 3) {
                onLogEvent?.(`DISQUALIFICATION: SECURITY_THRESHOLD_BREACHED`);
                onDisqualify?.("Security violation limit reached.");
            }
            return newCount;
        });
    }, [onWarning, onDisqualify, onLogEvent]);

    // Face detection using simple brightness & skin-tone heuristics on low-res canvas
    const checkForFace = useCallback(() => {
        if (!webcamRef.current || !isArmed) return;

        const video = webcamRef.current.video;
        if (!video || video.readyState !== 4) return;

        if (!canvasRef.current) {
            canvasRef.current = document.createElement('canvas');
        }
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        canvas.width = 64;
        canvas.height = 48;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        let totalBrightness = 0;
        let pixelCount = 0;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const regionSize = 20;

        for (let y = Math.max(0, centerY - regionSize); y < Math.min(canvas.height, centerY + regionSize); y++) {
            for (let x = Math.max(0, centerX - regionSize); x < Math.min(canvas.width, centerX + regionSize); x++) {
                const idx = (y * canvas.width + x) * 4;
                const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
                totalBrightness += brightness;
                pixelCount++;
            }
        }

        const avgBrightness = totalBrightness / Math.max(1, pixelCount);

        let skinTonePixels = 0;
        for (let y = Math.max(0, centerY - regionSize); y < Math.min(canvas.height, centerY + regionSize); y++) {
            for (let x = Math.max(0, centerX - regionSize); x < Math.min(canvas.width, centerX + regionSize); x++) {
                const idx = (y * canvas.width + x) * 4;
                const r = data[idx], g = data[idx + 1], b = data[idx + 2];
                if (r > 60 && g > 40 && b > 20 && r > g && r > b && Math.abs(r - g) > 15) {
                    skinTonePixels++;
                }
            }
        }

        const skinToneRatio = skinTonePixels / Math.max(1, pixelCount);
        const isFaceDetected = avgBrightness > 25 && skinToneRatio > 0.04;
        onFaceDetectedChange?.(isFaceDetected);

        if (!isFaceDetected) {
            noFaceCountRef.current++;
            if (noFaceCountRef.current >= 4) {
                setNoFaceWarning(true);
                if (noFaceCountRef.current === 4) {
                    triggerWarning("OPTICAL_GAZE_LOST_NO_FACE");
                }
            }
        } else {
            if (noFaceCountRef.current >= 4) {
                onLogEvent?.("RE-ACQUIRED_PRIMARY_GAZE");
            }
            noFaceCountRef.current = 0;
            setNoFaceWarning(false);
        }
    }, [isArmed, triggerWarning, onFaceDetectedChange, onLogEvent]);

    useEffect(() => {
        if (!isArmed) return;
        const interval = setInterval(checkForFace, 1200);
        return () => clearInterval(interval);
    }, [isArmed, checkForFace]);

    // Enforce Fullscreen
    const enterFullScreen = () => {
        const elem = document.documentElement;
        const requestFS = elem.requestFullscreen || elem.webkitRequestFullscreen || elem.mozRequestFullScreen || elem.msRequestFullscreen;
        if (requestFS) {
            requestFS.call(elem).catch((err) => console.log(err));
        }
    };

    useEffect(() => {
        const handleFullScreenChange = () => {
            const isFS = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
            if (!isFS && isArmed) {
                setIsFullScreen(false);
                triggerWarning("FULLSCREEN_KERNEL_LOCK_EXITED");
            } else {
                setIsFullScreen(true);
            }
        };

        document.addEventListener('fullscreenchange', handleFullScreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
        document.addEventListener('mozfullscreenchange', handleFullScreenChange);
        document.addEventListener('MSFullscreenChange', handleFullScreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullScreenChange);
            document.removeEventListener('MSFullscreenChange', handleFullScreenChange);
        };
    }, [isArmed, triggerWarning]);

    // Tab Switching & Focus Loss Detection
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden && isArmed) {
                triggerWarning("TAB_SWITCH_ACTIVE_WINDOW_LOST");
            }
        };

        const handleBlur = () => {
            if (isArmed && document.activeElement !== document.body) {
                triggerWarning("WINDOW_BLUR_OR_MINIMIZE");
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("blur", handleBlur);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("blur", handleBlur);
        };
    }, [isArmed, triggerWarning]);

    // Disable Right-Click / Copy / Paste
    useEffect(() => {
        const preventDefault = (e) => e.preventDefault();
        document.addEventListener('contextmenu', preventDefault);
        document.addEventListener('copy', preventDefault);
        document.addEventListener('paste', preventDefault);
        document.addEventListener('cut', preventDefault);

        return () => {
            document.removeEventListener('contextmenu', preventDefault);
            document.removeEventListener('copy', preventDefault);
            document.removeEventListener('paste', preventDefault);
            document.removeEventListener('cut', preventDefault);
        };
    }, []);

    const webcamNode = (
        <Webcam
            ref={webcamRef}
            audio={false}
            className="w-full h-full object-cover"
            screenshotFormat="image/jpeg"
        />
    );

    if (warnings >= 3) {
        return (
            <div className="fixed inset-0 bg-[#BA1A1A] text-white flex flex-col items-center justify-center z-[100] font-mono p-6 text-center select-none">
                <div className="border-4 border-white p-space-xl max-w-lg bg-black text-white shadow-[8px_8px_0px_#FFFFFF]">
                    <div className="font-label-sm text-label-sm text-[#FFDAD6] uppercase tracking-widest mb-2 font-bold">
                        [ CRITICAL_HARDWARE_EXCEPTION ]
                    </div>
                    <h1 className="font-headline-xl text-headline-xl uppercase font-bold mb-4">
                        SESSION_DISQUALIFIED
                    </h1>
                    <p className="font-body-md text-body-md text-[#FFDAD6] mb-6">
                        Exceeded maximum permitted proctor risk threshold (3 security breach events logged to tamper-evident ledger).
                    </p>
                    <button 
                        onClick={() => window.location.href = '/student/dashboard'} 
                        className="bg-white text-black px-space-xl py-3 font-label-md text-label-md uppercase font-bold hover:bg-[#FFDAD6] transition-none cursor-pointer"
                    >
                        [ RETURN_TO_CANDIDATE_CONSOLE ]
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-canvas-light text-ink-primary font-mono select-none">
            {/* Standalone webcam if requested */}
            {showStandaloneWebcam && (
                <div className="fixed bottom-4 right-4 w-48 h-36 bg-black border-2 border-primary z-50 pointer-events-none">
                    {webcamNode}
                </div>
            )}

            {/* Fullscreen Re-entry blocker */}
            {!isFullScreen && isArmed && (
                <div className="fixed inset-0 bg-black/95 z-[60] flex flex-col items-center justify-center p-8 text-center text-white font-mono backdrop-blur-sm">
                    <div className="border border-white/40 bg-surface-container-lowest text-on-surface p-space-xl max-w-md shadow-[6px_6px_0px_#1D52B8]">
                        <span className="font-label-sm text-label-sm text-error uppercase font-bold tracking-widest block mb-2">
                            [ VIOLATION_FLAG: WINDOW_ESCAPED ]
                        </span>
                        <h2 className="font-headline-sm text-headline-sm uppercase font-bold mb-3">
                            FULLSCREEN KERNEL LOCK REQUIRED
                        </h2>
                        <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                            Exiting fullscreen registers a multi-sensor telemetry penalty. Re-engage window lock immediately to prevent session termination.
                        </p>
                        <button
                            onClick={enterFullScreen}
                            className="bg-primary text-on-primary px-space-xl py-3 font-label-md text-label-md uppercase font-bold border border-primary hover:bg-on-primary hover:text-primary transition-none cursor-pointer"
                        >
                            [ RE-ENGAGE_FULLSCREEN_LOCK ]
                        </button>
                    </div>
                </div>
            )}

            {typeof children === 'function' ? children({ webcamNode, isArmed, warnings, isFullScreen }) : children}
        </div>
    );
};

export default ProctorWrapper;
