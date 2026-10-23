import React from 'react';

const QuestionWorkspace = ({ question, questionIndex = 0 }) => {
    if (!question) return null;

    const sectionTitle = question.section || 'System Architecture & Problem Solving';
    const weight = question.weight || '25 Points';
    const taxonomy = question.taxonomy || 'Practical Application';
    const title = question.title || question.question || question.text || 'Technical Scenario';
    const description = question.description || 'Review the scenario below and select the most appropriate solution based on standard engineering best practices.';
    const codeSnippet = question.code_snippet;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm font-sans" id="QuestionWorkspace">
            {/* Question Header Information */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4 mb-5">
                <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">
                    Section {questionIndex + 1} — {sectionTitle}
                </span>
                <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                    <span className="bg-gray-100 px-2.5 py-1 rounded-md text-gray-700 font-semibold">
                        {weight}
                    </span>
                    <span className="text-gray-300">·</span>
                    <span>{taxonomy}</span>
                </div>
            </div>

            {/* Problem Statement */}
            <div className="space-y-3 mb-6">
                <h1 className="text-xl sm:text-2xl text-gray-900 font-bold tracking-tight leading-snug">
                    {title}
                </h1>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Clean Code Snippet Panel */}
            {codeSnippet && (
                <div className="mt-5 rounded-xl overflow-hidden border border-gray-200 bg-gray-900 text-gray-100" id="CodeSnippetBox">
                    <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center justify-between text-xs text-gray-300 font-medium">
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                            <span>Code Reference (Python)</span>
                        </div>
                        <span className="text-gray-400 text-xs">Read-Only</span>
                    </div>

                    <div className="p-4 sm:p-5 overflow-x-auto text-left leading-relaxed">
                        <pre className="font-mono text-xs sm:text-sm text-emerald-300 m-0 whitespace-pre">
                            {codeSnippet}
                        </pre>
                    </div>

                    <div className="bg-gray-800/60 px-4 py-1.5 border-t border-gray-700 flex items-center justify-between text-gray-400 text-xs">
                        <span>Standard Runtime Environment</span>
                        <span>UTF-8</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionWorkspace;
