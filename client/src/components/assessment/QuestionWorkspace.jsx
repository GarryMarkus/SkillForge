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
        <div className="bg-[#121318] rounded-2xl border border-white/[0.08] p-6 sm:p-8 font-sans" id="QuestionWorkspace">
            {/* Question Header Information */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4 mb-5">
                <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
                    Section {questionIndex + 1} — {sectionTitle}
                </span>
                <div className="flex items-center gap-3 text-xs text-zinc-400 font-medium">
                    <span className="bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-md text-zinc-300 font-mono text-xs">
                        {weight}
                    </span>
                    <span className="text-zinc-600">·</span>
                    <span>{taxonomy}</span>
                </div>
            </div>

            {/* Problem Statement */}
            <div className="space-y-3 mb-6">
                <h1 className="text-xl sm:text-2xl text-white font-semibold tracking-tight leading-snug">
                    {title}
                </h1>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Clean Code Snippet Panel */}
            {codeSnippet && (
                <div className="mt-5 rounded-xl overflow-hidden border border-white/[0.08] bg-[#09090B] text-zinc-100" id="CodeSnippetBox">
                    <div className="bg-[#181A22] px-4 py-2 border-b border-white/[0.08] flex items-center justify-between text-xs text-zinc-400 font-medium">
                        <div className="flex items-center gap-2">
                            <span className="w-2 rounded-full h-2 bg-blue-500"></span>
                            <span>Code Reference (Python)</span>
                        </div>
                        <span className="text-zinc-500 text-xs">Read-Only</span>
                    </div>

                    <div className="p-4 sm:p-5 overflow-x-auto text-left leading-relaxed">
                        <pre className="font-mono text-xs sm:text-sm text-emerald-400 m-0 whitespace-pre">
                            {codeSnippet}
                        </pre>
                    </div>

                    <div className="bg-[#181A22]/60 px-4 py-1.5 border-t border-white/[0.06] flex items-center justify-between text-zinc-500 text-xs">
                        <span>Standard Runtime Environment</span>
                        <span>UTF-8</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionWorkspace;
