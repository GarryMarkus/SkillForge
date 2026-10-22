import React, { useEffect, useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { AlertTriangle, Eye, AlertOctagon, UserX } from 'lucide-react';

const ProctorWrapper = ({ children, onDisqualify, onWarning }) => {
    const [warnings, setWarnings] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(true);
    const [isArmed, setIsArmed] = useState(false);
    const [noFaceWarning, setNoFaceWarning] = useState(false);
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const noFaceCountRef = useRef(0);
    const lastFaceCheckRef = useRef(Date.now());

    // Arm the system after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => setIsArmed(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    // Face detection using simple brightness/motion detection
    const checkForFace = useCallback(() => {
        if (!webcamRef.current || !isArmed) return;

        const video = webcamRef.current.video;
        if (!video || video.readyState !== 4) return;

        // Create canvas if not exists
        if (!canvasRef.current) {
            canvasRef.current = document.createElement('canvas');
        }
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        canvas.width = 64;  // Low resolution for performance
        canvas.height = 48;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Calculate average brightness and variance in center region
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

        const avgBrightness = totalBrightness / pixelCount;

        // Check for skin-tone-like colors in center (very simplified)
        let skinTonePixels = 0;
        for (let y = Math.max(0, centerY - regionSize); y < Math.min(canvas.height, centerY + regionSize); y++) {
            for (let x = Math.max(0, centerX - regionSize); x < Math.min(canvas.width, centerX + regionSize); x++) {
                const idx = (y * canvas.width + x) * 4;
                const r = data[idx], g = data[idx + 1], b = data[idx + 2];
                // Simple skin tone detection (works for various skin tones)
                if (r > 60 && g > 40 && b > 20 && r > g && r > b && Math.abs(r - g) > 15) {
                    skinTonePixels++;
                }
            }
        }

        const skinToneRatio = skinTonePixels / pixelCount;

        // If too dark or no skin-tone detected, might be no face
        const isFaceDetected = avgBrightness > 30 && skinToneRatio > 0.05;

        if (!isFaceDetected) {
            noFaceCountRef.current++;
            if (noFaceCountRef.current >= 5) { // 5 consecutive checks (~5 seconds)
                setNoFaceWarning(true);
                if (noFaceCountRef.current === 5) {
                    onWarning?.("No face detected - please stay visible to camera");
                }
            }
        } else {
            noFaceCountRef.current = 0;
            setNoFaceWarning(false);
        }
    }, [isArmed, onWarning]);

    // Run face detection every second
    useEffect(() => {
        if (!isArmed) return;
        const interval = setInterval(checkForFace, 1000);
        return () => clearInterval(interval);
    }, [isArmed, checkForFace]);

    // 1. Enforce Fullscreen
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
                triggerWarning("Exited Fullscreen");
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
    }, [isArmed]);

    // 2. Tab Switching & Focus Loss Detection
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden && isArmed) {
                triggerWarning("Tab switch detected!");
            }
        };

        const handleBlur = () => {
            if (isArmed && document.activeElement !== document.body) {
                triggerWarning("Window focus lost (Alt-Tab/Minimize)!");
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("blur", handleBlur);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("blur", handleBlur);
        };
    }, [isArmed]);

    const triggerWarning = (reason) => {
        setWarnings(prev => {
            const newCount = prev + 1;
            onWarning?.(`${reason} (${newCount}/3)`);
            if (newCount >= 3) {
                onDisqualify?.("Security violation limit reached.");
            }
            return newCount;
        });
    };

    // 3. Disable Copy/Paste
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

    if (warnings >= 3) {
        return (
            <div className="fixed inset-0 bg-red-900 text-white flex flex-col items-center justify-center z-[100]">
                <AlertOctagon className="w-24 h-24 mb-4" />
                <h1 className="text-4xl font-black mb-2">DISQUALIFIED</h1>
                <p className="text-xl">Multiple security violations detected.</p>
                <button onClick={() => window.location.href = '/student/dashboard'} className="mt-8 bg-white text-red-900 px-6 py-2 rounded-full font-bold">Return to Dashboard</button>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-gray-900 text-white select-none">
            {/* Webcam Overlay */}
            <div className={`fixed bottom-4 right-4 w-48 h-36 bg-black rounded-xl overflow-hidden shadow-2xl z-50 border-2 ${noFaceWarning ? 'border-yellow-500 animate-pulse' : 'border-red-500'} pointer-events-none`}>
                <Webcam
                    ref={webcamRef}
                    audio={false}
                    className="w-full h-full object-cover"
                    screenshotFormat="image/jpeg"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                    <Eye className="w-3 h-3" /> REC
                </div>
                {/* No Face Warning Badge */}
                {noFaceWarning && (
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-center gap-1 bg-yellow-500 text-black text-[10px] font-bold px-2 py-1 rounded-full">
                        <UserX className="w-3 h-3" /> NO FACE DETECTED
                    </div>
                )}
            </div>

            {/* Warning Banner */}
            {warnings > 0 && (
                <div className="fixed top-0 left-0 right-0 bg-red-600 p-2 text-center font-bold text-sm animate-pulse z-50">
                    WARNING: Security protocols breached! ({warnings}/3)
                </div>
            )}

            {/* No Face Warning Banner */}
            {noFaceWarning && warnings < 3 && (
                <div className="fixed top-10 left-0 right-0 bg-yellow-500 text-black p-2 text-center font-bold text-sm z-50">
                    ⚠️ No face detected! Please stay visible to the camera.
                </div>
            )}

            {/* Fullscreen Re-entry blocker */}
            {!isFullScreen && isArmed && (
                <div className="fixed inset-0 bg-black/95 z-[60] flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm">
                    <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
                    <h2 className="text-2xl font-bold mb-4">Fullscreen Required</h2>
                    <p className="mb-6 max-w-md">You exited fullscreen mode. This is recorded as a violation. Please return immediately to continue.</p>
                    <button
                        onClick={enterFullScreen}
                        className="bg-white text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform"
                    >
                        Return to Test
                    </button>
                </div>
            )}

            {children}
        </div>
    );
};

export default ProctorWrapper;
