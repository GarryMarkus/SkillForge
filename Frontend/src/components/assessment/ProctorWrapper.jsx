import React, { useEffect, useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { AlertTriangle, Eye } from 'lucide-react';

const ProctorWrapper = ({ children, onDisqualify, onWarning }) => {
    const [warnings, setWarnings] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(true);
    const containerRef = useRef(null);

    // 1. Enforce Fullscreen
    const enterFullScreen = () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen().catch((err) => console.log(err));
        }
    };

    useEffect(() => {
        // Initial Fullscreen request
        // Note: Browsers block programmatic fullscreen without user interaction. 
        // We usually trigger this on a "Start" button click in the parent.

        const handleFullScreenChange = () => {
            if (!document.fullscreenElement) {
                setIsFullScreen(false);
                setWarnings(prev => prev + 1);
                onWarning("Exited Fullscreen");
            } else {
                setIsFullScreen(true);
            }
        };

        document.addEventListener('fullscreenchange', handleFullScreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
    }, [onWarning]);

    // 2. Tab Switching Detection
    useEffect(() => {
        let switchCount = 0;
        const handleVisibilityChange = () => {
            if (document.hidden) {
                switchCount++;
                setWarnings(prev => prev + 1);
                onWarning(`Tab switch detected! (${switchCount}/3)`);

                if (switchCount >= 3) {
                    onDisqualify("Excessive tab switching.");
                }
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, [onDisqualify, onWarning]);

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
                <AlertTriangle className="w-24 h-24 mb-4" />
                <h1 className="text-4xl font-black mb-2">DISQUALIFIED</h1>
                <p className="text-xl">Security violations detected.</p>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-gray-900 text-white select-none">
            {/* Webcam Overlay */}
            <div className="fixed bottom-4 right-4 w-48 h-36 bg-black rounded-xl overflow-hidden shadow-2xl z-50 border-2 border-red-500">
                <Webcam
                    audio={false}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                    <Eye className="w-3 h-3" /> REC
                </div>
            </div>

            {/* Warning Banner */}
            {warnings > 0 && (
                <div className="fixed top-0 left-0 right-0 bg-red-600 p-2 text-center font-bold text-sm animate-pulse z-50">
                    WARNING: Security protocols breached! ({warnings}/3)
                </div>
            )}

            {!isFullScreen && (
                <div className="fixed inset-0 bg-black/90 z-[60] flex flex-col items-center justify-center p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">Fullscreen Required</h2>
                    <p className="mb-6">Please return to fullscreen to continue validation.</p>
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
