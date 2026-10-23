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
                alert('[FORMAT ERROR] Only PDF documents (.pdf) are accepted for deterministic verification.');
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
                <label className="block text-xs uppercase font-bold text-outline">
                    RESUME PDF INGESTION ZONE *
                </label>
                <span className="text-xs text-on-surface-variant font-bold">
                    SPEC: PDF 1.7+ // MAX 15MB
                </span>
            </div>

            {/* Parsing Progress Animation */}
            {isParsing ? (
                <div className="w-full border border-canvas-blueprint bg-surface-container-lowest p-6 flex flex-col gap-3 shadow-[4px_4px_0px_#1D52B8]">
                    <div className="flex items-center justify-between border-b border-black/15 pb-2.5 text-xs font-bold text-canvas-blueprint uppercase">
                        <span>[ CELERY ASYNC PIPELINE: ACTIVE ]</span>
                        <span className="animate-pulse">PARSING RESUME...</span>
                    </div>

                    <div className="space-y-2 py-1 text-xs font-bold">
                        <div className={`flex items-center gap-2 ${parseStep >= 1 ? 'text-canvas-blueprint' : 'text-outline'}`}>
                            <span>{parseStep >= 1 ? '●' : '○'}</span>
                            <span>[01. PARSING PDF TEXT STREAMS // AST NORMALIZATION]</span>
                        </div>
                        <div className={`flex items-center gap-2 ${parseStep >= 2 ? 'text-canvas-blueprint' : 'text-outline'}`}>
                            <span>{parseStep >= 2 ? '●' : '○'}</span>
                            <span>[02. EXTRACTING NER SKILL TOKENS]</span>
                        </div>
                        <div className={`flex items-center gap-2 ${parseStep >= 3 ? 'text-canvas-blueprint' : 'text-outline'}`}>
                            <span>{parseStep >= 3 ? '●' : '○'}</span>
                            <span>[03. VECTORIZING TF-IDF EMBEDDINGS]</span>
                        </div>
                    </div>

                    <div className="w-full bg-surface-container h-2 border border-black/20 overflow-hidden mt-1">
                        <div
                            className="bg-canvas-blueprint h-full transition-all duration-300"
                            style={{ width: `${(parseStep / 3) * 100}%` }}
                        />
                    </div>
                </div>
            ) : file ? (
                /* Metadata Inspection Box */
                <div className="w-full border border-black/20 bg-surface-container-lowest p-5 flex flex-col gap-3 shadow-[3px_3px_0px_#0A0A0A]">
                    <div className="flex items-center justify-between border-b border-black/10 pb-2.5">
                        <div className="flex items-center gap-2 font-bold text-xs uppercase text-ink-primary">
                            <span className="text-canvas-blueprint font-bold">+</span>
                            <span>[ ATTACHED DOSSIER: {file.name} ]</span>
                        </div>
                        <button
                            type="button"
                            onClick={onFileRemoved}
                            className="text-red-600 text-xs font-bold uppercase hover:underline cursor-pointer"
                        >
                            [ DISCARD FILE ]
                        </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-on-surface-variant pt-1 font-mono">
                        <div>
                            <span className="block text-[11px] uppercase font-bold text-outline">FILE SIZE:</span>
                            <strong className="text-ink-primary">{formatBytes(file.size)}</strong>
                        </div>
                        <div>
                            <span className="block text-[11px] uppercase font-bold text-outline">DOCUMENT TYPE:</span>
                            <strong className="text-ink-primary">{file.type || 'application/pdf'}</strong>
                        </div>
                        <div>
                            <span className="block text-[11px] uppercase font-bold text-outline">INTEGRITY:</span>
                            <strong className="text-canvas-blueprint font-bold">PARSED READY</strong>
                        </div>
                    </div>
                </div>
            ) : (
                /* Interactive Drop Area */
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`w-full border-2 border-dashed p-10 sm:p-14 flex flex-col items-center justify-center text-center cursor-pointer transition-none relative ${
                        isDragging
                            ? 'border-canvas-blueprint bg-blue-50/50'
                            : 'border-black/30 bg-surface hover:bg-surface-container-low hover:border-black/50'
                    }`}
                >
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleInputChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="w-12 h-12 bg-surface-container border border-black/15 flex items-center justify-center text-canvas-blueprint text-xl font-bold mb-3">
                        PDF
                    </div>
                    <span className="font-bold text-sm sm:text-base uppercase text-ink-primary mb-1.5">
                        [ CLICK TO SELECT OR DRAG RESUME PDF HERE ]
                    </span>
                    <span className="text-xs text-on-surface-variant max-w-md leading-relaxed font-mono">
                        Deterministic parsing extracts skill tokens, experience timestamps, and primes your candidate vector dossier.
                    </span>
                </div>
            )}
        </div>
    );
};

export default ResumeUploadZone;
