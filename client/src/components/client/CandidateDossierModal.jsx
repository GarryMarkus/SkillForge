import React from 'react';

const CandidateDossierModal = ({
    candidate,
    onClose,
    onIssueOffer
}) => {
    if (!candidate) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm select-none font-sans">
            <div className="bg-white rounded-2xl border border-gray-200 w-full max-w-2xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                {/* Header */}
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                    <div>
                        <h2 className="text-base font-bold text-gray-900">
                            Candidate Profile
                        </h2>
                        <p className="text-xs text-gray-500">
                            Reference ID: {candidate.candidate_ref || 'SF-REF'}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-200 text-sm font-semibold transition-colors cursor-pointer"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>

                {/* Body Content */}
                <div className="p-6 overflow-y-auto space-y-5 flex-1 text-gray-800 text-sm">
                    {/* Candidate Overview */}
                    <div className="p-5 bg-blue-50/50 rounded-xl border border-blue-100 flex flex-col gap-2">
                        <div className="flex justify-between items-baseline flex-wrap gap-2">
                            <span className="text-xl sm:text-2xl font-bold text-gray-900">
                                {candidate.candidate_name}
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">
                                {candidate.cosine_sim}% Match
                            </span>
                        </div>
                        <div className="text-sm font-medium text-gray-600">
                            {candidate.role_label} • {candidate.region}
                        </div>
                        <div className="text-xs text-gray-500">
                            Email: {candidate.email}
                        </div>
                    </div>

                    {/* Verified Assessment Results */}
                    <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
                        <div className="text-xs font-bold uppercase tracking-wide text-blue-700">
                            Proctored Assessment Results
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div className="bg-white p-3 rounded-lg border border-gray-200">
                                <span className="text-xs text-gray-500 block">Assessment Score</span>
                                <strong className="text-gray-900 text-base">{candidate.proctor_score}</strong>
                            </div>
                            <div className="bg-white p-3 rounded-lg border border-gray-200">
                                <span className="text-xs text-gray-500 block">Integrity Flags</span>
                                <strong className="text-gray-900 text-base">{candidate.proctor_flags}</strong>
                            </div>
                            <div className="bg-white p-3 rounded-lg border border-gray-200">
                                <span className="text-xs text-gray-500 block">Webcam Status</span>
                                <strong className="text-gray-900 text-base">{candidate.cam_status}</strong>
                            </div>
                            <div className="bg-white p-3 rounded-lg border border-gray-200">
                                <span className="text-xs text-gray-500 block">Candidate Rating</span>
                                <strong className="text-gray-900 text-base">{candidate.stars} ({candidate.rating_num})</strong>
                            </div>
                        </div>
                    </div>

                    {/* Verified Skills */}
                    <div className="p-5 bg-white rounded-xl border border-gray-200 space-y-3">
                        <div className="text-xs font-bold uppercase tracking-wide text-gray-600">
                            Verified Skills
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs">
                            {(candidate.tags || ["Python", "FastAPI", "Docker"]).map((t, idx) => (
                                <span
                                    key={idx}
                                    className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-md font-semibold"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
                        <button
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                            Close
                        </button>
                        <button
                            onClick={() => {
                                onIssueOffer(candidate);
                                onClose();
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm cursor-pointer"
                        >
                            Shortlist Candidate →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidateDossierModal;
