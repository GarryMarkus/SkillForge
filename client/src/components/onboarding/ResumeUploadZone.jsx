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
        <div className="w-full font-mono select-none" id="ResumeUploadZone">
            <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-mono text-[#888888]">
                    Resume Document
                </label>
                <span className="text-xs text-[#555555]">
                    PDF format · Max 5MB
                </span>
            </div>

            {/* Parsing Progress Animation */}
            {isParsing ? (
                <div className="w-full rounded-md border border-white/15 border-t-white/25 bg-[#111318] p-6 flex flex-col gap-4 font-mono">
                    <div className="flex items-center justify-between text-xs text-[#f5f5f5]">
                        <span>Parsing Document Structure</span>
                        <span className="text-[#888888] animate-pulse">processing...</span>
                    </div>

                    <div className="space-y-2 py-1 text-xs">
                        <div className={`flex items-center gap-2 ${parseStep >= 1 ? 'text-[#f5f5f5]' : 'text-[#555555]'}`}>
                            <span>{parseStep >= 1 ? '✓' : '○'}</span>
                            <span>Extract text token tree and header hierarchy</span>
                        </div>
                        <div className={`flex items-center gap-2 ${parseStep >= 2 ? 'text-[#f5f5f5]' : 'text-[#555555]'}`}>
                            <span>{parseStep >= 2 ? '✓' : '○'}</span>
                            <span>Derive verified technical competencies</span>
                        </div>
                        <div className={`flex items-center gap-2 ${parseStep >= 3 ? 'text-[#f5f5f5]' : 'text-[#555555]'}`}>
                            <span>{parseStep >= 3 ? '✓' : '○'}</span>
                            <span>Index benchmark baseline profile</span>
                        </div>
                    </div>

                    <div className="w-full bg-[#060709] border border-white/[0.08] h-1.5 rounded-none overflow-hidden">
                        <div
                            className="bg-[#F5F5F5] h-full transition-all duration-300"
                            style={{ width: `${(parseStep / 3) * 100}%` }}
                        />
                    </div>
                </div>
            ) : file ? (
                /* File Selected Inspection Box */
                <div className="w-full rounded-md border border-white/[0.08] border-t-white/15 bg-[#111318] p-4 flex flex-col gap-3 font-mono">
                    <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                        <div className="flex items-center gap-2.5 text-xs text-[#f5f5f5]">
                            <span className="w-6 h-6 rounded-sm bg-white/[0.04] border border-white/[0.08] text-zinc-300 flex items-center justify-center text-[10px]">
                                PDF
                            </span>
                            <span className="truncate max-w-xs">{file.name}</span>
                        </div>
                        <button
                            type="button"
                            onClick={onFileRemoved}
                            className="text-rose-400 hover:text-rose-300 text-xs font-mono cursor-pointer"
                        >
                            Remove
                        </button>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#737373]">
                        <span>Size: {formatBytes(file.size)}</span>
                        <span>Status: Ready for Parsing</span>
                    </div>
                </div>
            ) : (
                /* Drag and Drop Box */
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`w-full rounded-md border border-dashed transition-colors p-8 flex flex-col items-center justify-center text-center cursor-pointer font-mono ${
                        isDragging
                            ? 'border-white/40 bg-[#181B22]'
                            : 'border-white/15 bg-[#060709] hover:border-white/30 hover:bg-[#111318]'
                    }`}
                    onClick={() => document.getElementById('resume-file-input')?.click()}
                >
                    <input
                        id="resume-file-input"
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={handleInputChange}
                    />
                    <div className="w-9 h-9 rounded-sm bg-[#111318] border border-white/15 flex items-center justify-center text-[#888888] mb-3">
                        <span className="text-sm">↑</span>
                    </div>
                    <p className="text-xs text-[#f5f5f5] mb-1">
                        Drag and drop your PDF resume here, or <span className="underline text-white">browse</span>
                    </p>
                    <p className="text-[11px] text-[#71717A]">
                        Plain text parsing &bull; zero third-party leakage
                    </p>
                </div>
            )}
        </div>
    );
};

export default ResumeUploadZone;
