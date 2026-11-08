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
            <div className="fixed inset-0 bg-black/80 text-white flex flex-col items-center justify-center z-[100] font-sans p-6 text-center select-none backdrop-blur-sm">
                <div className="bg-[#121318] border border-white/[0.08] rounded-2xl p-8 max-w-lg shadow-2xl text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 mx-auto flex items-center justify-center">
                        <span className="material-symbols-outlined text-[28px]">warning</span>
                    </div>
                    <h1 className="text-xl font-semibold text-white">
                        Assessment Session Concluded
                    </h1>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                        This session has ended because the maximum allowed security warnings (3 events) were reached. Your progress up to this point has been saved.
                    </p>
                    <button 
                        onClick={() => window.location.href = '/student/dashboard'} 
                        className="w-full bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-sm py-3 px-6 rounded-xl transition cursor-pointer"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-[#050505] text-[#ededed] font-mono select-none">
            {/* Standalone webcam if requested */}
            {showStandaloneWebcam && (
                <div className="fixed bottom-4 right-4 w-48 h-36 bg-black border border-white/20 rounded-md overflow-hidden z-50 pointer-events-none">
                    {webcamNode}
                </div>
            )}

            {/* Fullscreen Re-entry blocker */}
            {!isFullScreen && isArmed && (
                <div className="fixed inset-0 bg-black/80 z-[60] flex flex-col items-center justify-center p-6 text-center font-mono backdrop-blur-sm">
                    <div className="bg-[#0b0b0c] border border-white/10 rounded-md p-8 max-w-md shadow-2xl text-center space-y-4">
                        <div className="w-10 h-10 rounded-sm bg-[#111113] text-[#ededed] border border-white/20 mx-auto flex items-center justify-center font-mono text-xs font-bold">
                            [FS]
                        </div>
                        <h2 className="text-base font-semibold text-white font-mono uppercase tracking-wider">
                            Full-Screen Lock Required
                        </h2>
                        <p className="text-xs text-[#737373] leading-relaxed">
                            To ensure test integrity and prevent accidental window focus loss, this assessment runs under strict full-screen enclosure.
                        </p>
                        <button
                            onClick={enterFullScreen}
                            className="w-full bg-[#111113] hover:bg-[#1a1a1d] text-white border border-white/20 font-mono text-xs py-2.5 px-5 rounded-md transition cursor-pointer"
                        >
                            [ Resume Full-Screen Enclosure ]
                        </button>
                    </div>
                </div>
            )}

            {typeof children === 'function' ? children({ webcamNode, isArmed, warnings, isFullScreen }) : children}
        </div>
    );
};

export default ProctorWrapper;
