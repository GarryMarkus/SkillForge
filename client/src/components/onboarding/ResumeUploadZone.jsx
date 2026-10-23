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
                alert('[FORMAT_ERROR] Only PDF documents (.pdf) are accepted for deterministic verification.');
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
            <div className="flex items-center justify-between mb-1.5">
                <label className="block text-label-sm uppercase font-bold text-outline">
                    RESUME_PDF_INGESTION_ZONE *
                </label>
                <span className="text-[10px] text-secondary font-bold">
                    SPEC: PDF_1.7+ // MAX: 15MB
                </span>
            </div>

            {/* Parsing Wireframe Progress Animation */}
            {isParsing ? (
                <div className="w-full border-2 border-primary-container bg-surface-container-lowest p-space-md flex flex-col gap-space-sm shadow-[3px_3px_0px_#1D52B8]">
                    <div className="flex items-center justify-between border-b border-black/15 pb-2 text-label-sm font-bold text-primary-container uppercase">
                        <span>[+] CELERY_ASYNC_PIPELINE: ACTIVE</span>
                        <span className="animate-pulse">PARSING_TELEMETRY...</span>
                    </div>

                    <div className="space-y-1.5 py-1 text-label-sm font-bold">
                        <div className={`flex items-center gap-2 ${parseStep >= 1 ? 'text-primary-container' : 'text-secondary'}`}>
                            <span>{parseStep >= 1 ? '●' : '○'}</span>
                            <span>[01. PARSING_PDF_AST // EXTRACTING_TEXT_STREAMS]</span>
                        </div>
                        <div className={`flex items-center gap-2 ${parseStep >= 2 ? 'text-primary-container' : 'text-secondary'}`}>
                            <span>{parseStep >= 2 ? '●' : '○'}</span>
                            <span>[02. EXTRACTING_NER_SKILLS // SCIKIT_TOKENIZER]</span>
                        </div>
                        <div className={`flex items-center gap-2 ${parseStep >= 3 ? 'text-primary-container' : 'text-secondary'}`}>
                            <span>{parseStep >= 3 ? '●' : '○'}</span>
                            <span>[03. VECTORIZING_TFIDF // PROFILING_TAXONOMY]</span>
                        </div>
                    </div>

                    <div className="w-full bg-surface-container h-1.5 border border-black/20 overflow-hidden">
                        <div
                            className="bg-primary-container h-full transition-all duration-300"
                            style={{ width: `${(parseStep / 3) * 100}%` }}
                        />
                    </div>
                </div>
            ) : file ? (
                /* Metadata Inspection Box */
                <div className="w-full border border-black/30 bg-surface-container-lowest p-space-md flex flex-col gap-2 shadow-[2px_2px_0px_#191C1D]">
                    <div className="flex items-center justify-between border-b border-black/10 pb-1.5">
                        <div className="flex items-center gap-2 font-bold text-label-md uppercase text-on-surface">
                            <span className="text-primary-container font-bold">+</span>
                            <span>[ ATTACHED_DOSSIER: {file.name} ]</span>
                        </div>
                        <button
                            type="button"
                            onClick={onFileRemoved}
                            className="text-error text-label-sm font-bold uppercase hover:underline cursor-pointer"
                        >
                            [DISCARD_FILE]
                        </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-label-sm text-secondary pt-1">
                        <div>
                            <span className="block text-[9px] uppercase font-bold text-outline">FILE_SIZE:</span>
                            <strong className="text-on-surface">{formatBytes(file.size)}</strong>
                        </div>
                        <div>
                            <span className="block text-[9px] uppercase font-bold text-outline">MIME_TYPE:</span>
                            <strong className="text-on-surface">{file.type || 'application/pdf'}</strong>
                        </div>
                        <div>
                            <span className="block text-[9px] uppercase font-bold text-outline">HASH_STATUS:</span>
                            <strong className="text-primary-container">VERIFIED_READ</strong>
                        </div>
                    </div>
                </div>
            ) : (
                /* Interactive Drop Area */
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`w-full border-2 border-dashed p-space-lg flex flex-col items-center justify-center text-center cursor-pointer transition-none relative ${
                        isDragging
                            ? 'border-primary-container bg-primary-fixed/20'
                            : 'border-black/30 bg-surface hover:bg-surface-container-low'
                    }`}
                >
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleInputChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <span className="material-symbols-outlined text-[32px] text-primary-container mb-1">
                        upload_file
                    </span>
                    <span className="font-bold text-label-md uppercase text-on-surface mb-0.5">
                        [ DRAG_&amp;_DROP_RESUME_PDF_OR_BROWSE ]
                    </span>
                    <span className="text-body-sm text-secondary max-w-sm">
                        Deterministic parsing parses text streams, extracts skill tokens, and primes your telemetry index.
                    </span>
                </div>
            )}
        </div>
    );
};

export default ResumeUploadZone;
