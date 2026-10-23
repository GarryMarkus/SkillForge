import React from 'react';

const ProctorTelemetryPanel = ({
    faceDetected = true,
    riskScore = 5,
    tabSwitches = 0,
    audioSpikes = 0,
    headRotation = '1.4°',
    auditLogs = [],
    webcamNode = null
}) => {
    return (
        <div className="flex flex-col gap-5 font-sans select-none" id="ProctorTelemetryPanel">
            {/* Live Camera Box */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                        Camera &amp; Environment
                    </span>
                    <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${faceDetected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`}></span>
                        <span className="text-xs font-semibold text-gray-700">
                            {faceDetected ? 'Face Verified' : 'Adjusting...'}
                        </span>
                    </div>
                </div>

                {/* Viewport */}
                <div className="relative w-full aspect-video bg-gray-950 rounded-xl overflow-hidden flex items-center justify-center border border-gray-200">
                    {webcamNode && (
                        <div className="absolute inset-0 w-full h-full object-cover">
                            {webcamNode}
                        </div>
                    )}

                    {/* Subtle Gaze Overlay Box */}
                    <div className="relative w-28 h-36 border-2 border-emerald-400/80 rounded-xl flex flex-col justify-between p-2 z-10 pointer-events-none">
                        <span className="text-[10px] bg-emerald-500 text-white px-1.5 py-0.5 rounded font-semibold self-start">
                            Face Lock
                        </span>
                        <div className="text-[11px] text-right text-emerald-300 font-bold drop-shadow">
                            {faceDetected ? '98% Conf' : 'Searching'}
                        </div>
                    </div>
                </div>

                {/* Status Badges */}
                <div className="pt-1 space-y-1.5 text-xs text-gray-600">
                    <div className="flex justify-between">
                        <span>Webcam Feed:</span>
                        <span className="font-semibold text-emerald-600">Active (720p HD)</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Background Observers:</span>
                        <span className="font-semibold text-gray-900">None Detected</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Head Orientation:</span>
                        <span className="font-semibold text-gray-900">{headRotation || 'Aligned'}</span>
                    </div>
                </div>
            </div>

            {/* Session Integrity Score Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                        Session Integrity
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                        Nominal
                    </span>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-baseline text-xs">
                        <span className="text-gray-500">Integrity Risk Level:</span>
                        <span className="font-bold text-gray-900 text-sm">
                            {riskScore} / 50 Pts
                        </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div 
                            className={`h-full rounded-full transition-all ${riskScore > 25 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                            style={{ width: `${Math.min(100, (riskScore / 50) * 100)}%` }}
                        ></div>
                    </div>
                </div>

                {/* Mini Counters Grid */}
                <div className="pt-2 grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                        <div className="text-gray-500 text-[11px] font-medium">Tab Switches</div>
                        <div className="text-base font-bold text-gray-900">{tabSwitches}</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                        <div className="text-gray-500 text-[11px] font-medium">Audio Interrupts</div>
                        <div className="text-base font-bold text-gray-900">{audioSpikes}</div>
                    </div>
                </div>
            </div>

            {/* Realtime Event Stream */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2.5 text-xs">
                    <span className="font-bold text-gray-700 uppercase tracking-wider">Activity Log</span>
                    <span className="text-blue-600 font-medium">Live</span>
                </div>

                <div className="space-y-1.5 max-h-36 overflow-y-auto text-xs">
                    {auditLogs.length === 0 ? (
                        <div className="text-gray-400 py-2 text-center">No alerts recorded. Session clean.</div>
                    ) : (
                        auditLogs.map((log, i) => (
                            <div key={i} className="py-1 flex items-center justify-between text-gray-600 border-b border-gray-50">
                                <span className="text-[11px] text-gray-400">{log.time}</span>
                                <span className={log.type === 'warn' ? 'text-amber-600 font-semibold' : 'text-gray-700'}>
                                    {log.text}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProctorTelemetryPanel;
