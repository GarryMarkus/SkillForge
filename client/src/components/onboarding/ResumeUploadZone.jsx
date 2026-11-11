import React, { useState } from 'react';
import { UploadCloud, FileText, Trash2, CheckCircle2, Circle, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';

const ResumeUploadZone = ({
    file,
    onFileSelected,
    onFileRemoved,
    isParsing = false,
    parseStep = 1
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [fileError, setFileError] = useState('');

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
        setFileError('');
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const dropped = e.dataTransfer.files[0];
            if (dropped.type === 'application/pdf' || dropped.name.toLowerCase().endsWith('.pdf')) {
                onFileSelected(dropped);
            } else {
                setFileError('Only PDF documents (.pdf) are supported.');
            }
        }
    };

    const handleInputChange = (e) => {
        setFileError('');
        if (e.target.files && e.target.files.length > 0) {
            const chosen = e.target.files[0];
            if (chosen.type === 'application/pdf' || chosen.name.toLowerCase().endsWith('.pdf')) {
                onFileSelected(chosen);
            } else {
                setFileError('Only PDF documents (.pdf) are supported.');
            }
        }
    };

    const formatBytes = (bytes) => {
        if (!bytes) return '0 KB';
        const kb = (bytes / 1024).toFixed(1);
        return `${kb} KB`;
    };

    return (
        <div className="w-full font-mono select-none space-y-2" id="ResumeUploadZone">
            <div className="flex items-center justify-between">
                <label className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300">
                    <FileText className="w-3.5 h-3.5 text-[#888888]" strokeWidth={1.75} aria-hidden="true" />
                    <span>Resume PDF (Optional)</span>
                </label>
                <span className="text-[11px] text-[#71717A]">
                    PDF &bull; Max 5MB
                </span>
            </div>

            {fileError && (
                <div className="flex items-center gap-2 p-2.5 rounded-sm bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                    <span>{fileError}</span>
                </div>
            )}

            {/* Parsing Progress Animation */}
            {isParsing ? (
                <div className="w-full rounded-md border border-white/15 border-t-white/25 bg-[#111318] p-5 flex flex-col gap-3.5 font-mono">
                    <div className="flex items-center justify-between text-xs text-[#f5f5f5]">
                        <span className="inline-flex items-center gap-2 font-semibold">
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-white" strokeWidth={2} aria-hidden="true" />
                            <span>Scanning Resume</span>
                        </span>
                        <span className="text-[11px] text-[#888888]">Step {parseStep} of 3</span>
                    </div>

                    <div className="space-y-2 py-0.5 text-xs">
                        {[
                            { step: 1, label: 'Reading document layout & sections' },
                            { step: 2, label: 'Identifying technical skills' },
                            { step: 3, label: 'Updating skill preview tags' },
                        ].map((item) => {
                            const done = parseStep >= item.step;
                            const StepIcon = done ? CheckCircle2 : Circle;
                            return (
                                <div key={item.step} className={`flex items-center gap-2 ${done ? 'text-[#f5f5f5]' : 'text-[#555555]'}`}>
                                    <StepIcon
                                        className={`w-3.5 h-3.5 shrink-0 ${done ? 'text-emerald-400' : 'text-[#555555]'}`}
                                        strokeWidth={1.75}
                                        aria-hidden="true"
                                    />
                                    <span>{item.label}</span>
                                </div>
                            );
                        })}
                    </div>

                    <div className="w-full bg-[#060709] border border-white/[0.08] h-1.5 rounded-full overflow-hidden">
                        <div
                            className="bg-[#F5F5F5] h-full transition-all duration-300"
                            style={{ width: `${(parseStep / 3) * 100}%` }}
                        />
                    </div>
                </div>
            ) : file ? (
                /* File Selected Inspection Box */
                <div className="w-full rounded-md border border-white/[0.08] border-t-white/15 bg-[#111318] p-4 flex items-center justify-between gap-3 font-mono">
                    <div className="flex items-center gap-3 min-w-0">
                        <span className="w-9 h-9 rounded-sm bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                            <div className="text-xs text-white font-semibold truncate">{file.name}</div>
                            <div className="text-[11px] text-[#71717A] mt-0.5">
                                {formatBytes(file.size)} &bull; Ready to save
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onFileRemoved}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-[#060709] border border-white/[0.08] hover:border-rose-500/35 text-rose-400 hover:text-rose-300 text-xs font-mono cursor-pointer transition-colors shrink-0"
                    >
                        <Trash2 className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                        <span>Remove</span>
                    </button>
                </div>
            ) : (
                /* Drag and Drop Box */
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`w-full rounded-md border border-dashed transition-colors p-7 flex flex-col items-center justify-center text-center cursor-pointer font-mono ${
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
                    <div className="w-10 h-10 rounded-sm bg-[#111318] border border-white/15 flex items-center justify-center text-zinc-200 mb-3">
                        <UploadCloud className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <p className="text-xs text-[#f5f5f5] mb-1">
                        Drop your PDF resume here, or <span className="underline text-white">choose file</span>
                    </p>
                    <p className="inline-flex items-center gap-1.5 text-[11px] text-[#71717A]">
                        <ShieldCheck className="w-3 h-3 text-zinc-400" strokeWidth={1.75} aria-hidden="true" />
                        <span>Auto-extracts skills cleanly without external sharing</span>
                    </p>
                </div>
            )}
        </div>
    );
};

export default ResumeUploadZone;
