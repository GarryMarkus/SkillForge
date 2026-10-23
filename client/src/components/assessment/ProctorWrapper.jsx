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

    // Explicitly release webcam hardware and media tracks on component unmount
    useEffect(() => {
        const webcamNodeCurrent = webcamRef.current;
        return () => {
            try {
                const videoEl = webcamNodeCurrent?.video;
                const stream = videoEl?.srcObject;
                if (stream && typeof stream.getTracks === 'function') {
                    stream.getTracks().forEach(track => {
                        try {
                            track.stop();
                        } catch {
                            // ignore track stop error
                        }
                    });
                }
            } catch (err) {
                console.warn('[ProctorWrapper] Error stopping media tracks:', err);
            }
            if (canvasRef.current) {
                canvasRef.current.width = 0;
                canvasRef.current.height = 0;
                canvasRef.current = null;
            }
        };
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
        if (!video || video.readyState !== 4 || video.videoWidth === 0 || video.videoHeight === 0) return;

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
            requestFS.call(elem).catch((err) => {
                console.warn('[ProctorWrapper] Fullscreen request bypassed:', err);
            });
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
            <div className="fixed inset-0 bg-gray-900/90 text-gray-900 flex flex-col items-center justify-center z-[100] font-sans p-6 text-center select-none backdrop-blur-sm">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-lg shadow-xl text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 mx-auto flex items-center justify-center">
                        <span className="material-symbols-outlined text-[28px]">warning</span>
                    </div>
                    <h1 className="text-xl font-bold text-gray-900">
                        Assessment Session Concluded
                    </h1>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        This session has ended because the maximum allowed security warnings (3 events) were reached. Your progress up to this point has been saved.
                    </p>
                    <button 
                        onClick={() => window.location.href = '/student/dashboard'} 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3 px-6 rounded-xl transition cursor-pointer"
                    >
                        Return to Dashboard
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
                <div className="fixed inset-0 bg-gray-900/80 z-[60] flex flex-col items-center justify-center p-6 text-center font-sans backdrop-blur-sm">
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-md shadow-xl text-center space-y-4">
                        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
                            <span className="material-symbols-outlined text-[28px]">fullscreen</span>
                        </div>
                        <h2 className="text-lg font-bold text-gray-900">
                            Full-Screen Mode Required
                        </h2>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            To ensure test integrity and prevent accidental interruptions, this assessment runs in full-screen mode. Please click below to resume.
                        </p>
                        <button
                            onClick={enterFullScreen}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3 px-6 rounded-xl transition cursor-pointer"
                        >
                            Resume Full-Screen Mode
                        </button>
                    </div>
                </div>
            )}

            {typeof children === 'function' ? children({ webcamNode, isArmed, warnings, isFullScreen }) : children}
        </div>
    );
};

export default ProctorWrapper;
