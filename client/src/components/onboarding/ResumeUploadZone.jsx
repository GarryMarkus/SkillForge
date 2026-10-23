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
                <label className="block text-xs font-semibold text-gray-700">
                    Upload Resume (PDF)
                </label>
                <span className="text-xs text-gray-400">
                    Max size: 15 MB
                </span>
            </div>

            {/* Parsing Progress Animation */}
            {isParsing ? (
                <div className="w-full rounded-2xl border border-blue-200 bg-blue-50/50 p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between text-xs font-semibold text-blue-700">
                        <span>Analyzing Resume</span>
                        <span className="animate-pulse">Processing...</span>
                    </div>

                    <div className="space-y-2 py-1 text-xs">
                        <div className={`flex items-center gap-2 ${parseStep >= 1 ? 'text-blue-700 font-medium' : 'text-gray-400'}`}>
                            <span>{parseStep >= 1 ? '✓' : '○'}</span>
                            <span>Reading resume text and structure</span>
                        </div>
                        <div className={`flex items-center gap-2 ${parseStep >= 2 ? 'text-blue-700 font-medium' : 'text-gray-400'}`}>
                            <span>{parseStep >= 2 ? '✓' : '○'}</span>
                            <span>Identifying key technical skills</span>
                        </div>
                        <div className={`flex items-center gap-2 ${parseStep >= 3 ? 'text-blue-700 font-medium' : 'text-gray-400'}`}>
                            <span>{parseStep >= 3 ? '✓' : '○'}</span>
                            <span>Creating your verified skill profile</span>
                        </div>
                    </div>

                    <div className="w-full bg-blue-100 h-2 rounded-full overflow-hidden">
                        <div
                            className="bg-blue-600 h-full rounded-full transition-all duration-300"
                            style={{ width: `${(parseStep / 3) * 100}%` }}
                        />
                    </div>
                </div>
            ) : file ? (
                /* Metadata Inspection Box */
                <div className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 p-5 flex flex-col gap-3">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                        <div className="flex items-center gap-2 font-medium text-sm text-gray-900">
                            <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                                PDF
                            </span>
                            <span>{file.name}</span>
                        </div>
                        <button
                            type="button"
                            onClick={onFileRemoved}
                            className="text-red-600 text-xs font-semibold hover:underline cursor-pointer"
                        >
                            Remove File
                        </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-gray-600 pt-1">
                        <div>
                            <span className="block text-gray-400">File Size:</span>
                            <strong className="text-gray-900 font-semibold">{formatBytes(file.size)}</strong>
                        </div>
                        <div>
                            <span className="block text-gray-400">Type:</span>
                            <strong className="text-gray-900 font-semibold">PDF Document</strong>
                        </div>
                        <div>
                            <span className="block text-gray-400">Status:</span>
                            <strong className="text-green-600 font-semibold">Ready to upload</strong>
                        </div>
                    </div>
                </div>
            ) : (
                /* Interactive Drop Area */
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`w-full border-2 border-dashed rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-colors relative ${
                        isDragging
                            ? 'border-blue-600 bg-blue-50/50'
                            : 'border-gray-200 bg-gray-50/50 hover:bg-gray-100/50 hover:border-gray-300'
                    }`}
                >
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleInputChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold mb-3 shadow-sm">
                        📄
                    </div>
                    <span className="font-semibold text-sm sm:text-base text-gray-900 mb-1">
                        Drop your resume PDF here, or click to browse
                    </span>
                    <span className="text-xs text-gray-500 max-w-sm leading-relaxed">
                        We automatically parse your skills and experience to save you time.
                    </span>
                </div>
            )}
        </div>
    );
};

export default ResumeUploadZone;
