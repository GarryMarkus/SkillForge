import React, { useState } from 'react';

const ResumeUploadZone = ({
    file,
    onFileSelected,
    onFileRemoved,
    isParsing = false,
    parseStep = 1
}) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const dropped = e.dataTransfer.files[0];
            if (dropped.type === 'application/pdf' || dropped.name.endsWith('.pdf')) {
                onFileSelected(dropped);
            } else {
                alert('Please upload a PDF document (.pdf).');
            }
        }
    };

    const handleInputChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            onFileSelected(e.target.files[0]);
        }
    };

    const formatBytes = (bytes) => {
        if (!bytes) return '0 KB';
        const kb = (bytes / 1024).toFixed(1);
        return `${kb} KB`;
    };

    return (
        <div className="w-full font-sans select-none" id="ResumeUploadZone">
            <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-medium text-zinc-300">
                    Upload Resume
                </label>
                <span className="text-xs text-zinc-400">
                    PDF, max 5MB
                </span>
            </div>

            {/* Parsing Progress Animation */}
            {isParsing ? (
                <div className="w-full rounded-xl border border-blue-500/30 bg-blue-500/[0.04] p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between text-xs font-semibold text-blue-400">
                        <span>Analyzing Resume</span>
                        <span className="animate-pulse">Processing...</span>
                    </div>

                    <div className="space-y-2 py-1 text-xs">
                        <div className={`flex items-center gap-2 ${parseStep >= 1 ? 'text-blue-400 font-medium' : 'text-zinc-500'}`}>
                            <span>{parseStep >= 1 ? '✓' : '○'}</span>
                            <span>Parsing document content and structure</span>
                        </div>
                        <div className={`flex items-center gap-2 ${parseStep >= 2 ? 'text-blue-400 font-medium' : 'text-zinc-500'}`}>
                            <span>{parseStep >= 2 ? '✓' : '○'}</span>
                            <span>Extracting demonstrated technical competencies</span>
                        </div>
                        <div className={`flex items-center gap-2 ${parseStep >= 3 ? 'text-blue-400 font-medium' : 'text-zinc-500'}`}>
                            <span>{parseStep >= 3 ? '✓' : '○'}</span>
                            <span>Generating initial skill benchmark profile</span>
                        </div>
                    </div>

                    <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                        <div
                            className="bg-blue-500 h-full rounded-full transition-all duration-300"
                            style={{ width: `${(parseStep / 3) * 100}%` }}
                        />
                    </div>
                </div>
            ) : file ? (
                /* File Selected Inspection Box */
                <div className="w-full rounded-xl border border-white/[0.08] bg-[#181A22] p-5 flex flex-col gap-3">
                    <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                        <div className="flex items-center gap-2.5 font-medium text-sm text-white">
                            <span className="w-7 h-7 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-semibold">
                                PDF
                            </span>
                            <span className="truncate max-w-xs">{file.name}</span>
                        </div>
                        <button
                            type="button"
                            onClick={onFileRemoved}
                            className="text-rose-400 hover:text-rose-300 text-xs font-medium cursor-pointer"
                        >
                            Remove
                        </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-zinc-400 pt-1">
                        <div>
                            <span className="block text-zinc-400">File Size:</span>
                            <strong className="text-white font-medium">{formatBytes(file.size)}</strong>
                        </div>
                        <div>
                            <span className="block text-zinc-400">Format:</span>
                            <strong className="text-white font-medium">PDF Document</strong>
                        </div>
                        <div>
                            <span className="block text-zinc-400">Status:</span>
                            <strong className="text-emerald-400 font-medium">Ready for intake</strong>
                        </div>
                    </div>
                </div>
            ) : (
                /* Sleek Drag & Drop Zone */
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`w-full border-2 border-dashed rounded-xl p-8 sm:p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-colors relative ${
                        isDragging
                            ? 'border-blue-500 bg-blue-500/[0.04]'
                            : 'border-zinc-700/60 bg-zinc-900/40 hover:bg-zinc-900/70 hover:border-zinc-500'
                    }`}
                >
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleInputChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="w-10 h-10 rounded-lg bg-zinc-800 text-zinc-300 flex items-center justify-center text-lg mb-3 shadow-sm">
                        <span className="material-symbols-outlined text-[20px] text-zinc-400">
                            upload_file
                        </span>
                    </div>
                    <span className="font-medium text-sm text-white mb-1">
                        Drop your resume PDF here, or click to browse
                    </span>
                    <span className="text-xs text-zinc-400 max-w-sm leading-relaxed">
                        Strictly confidential. Automatically extracts skills and experience.
                    </span>
                </div>
            )}
        </div>
    );
};

export default ResumeUploadZone;
