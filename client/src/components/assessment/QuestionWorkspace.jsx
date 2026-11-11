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
        <div className="bg-[#0D0F14] rounded-md border border-white/[0.08] border-t-white/15 p-6 sm:p-7 font-mono select-none" id="QuestionWorkspace">
            {/* Question Header Information */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-5">
                <span className="text-xs text-[#8a8a8e] font-semibold uppercase tracking-wider">
                    Section {questionIndex + 1} &bull; {sectionTitle}
                </span>
                <div className="flex items-center gap-2 text-xs text-[#737373]">
                    <span className="bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded-sm text-zinc-300 font-mono text-xs">
                        {weight}
                    </span>
                    <span className="text-[#555555]">&bull;</span>
                    <span>{taxonomy}</span>
                </div>
            </div>

            {/* Problem Statement */}
            <div className="space-y-3 mb-6">
                <h1 className="text-lg sm:text-xl text-white font-bold font-display tracking-tight leading-snug">
                    {title}
                </h1>
                <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Clean Code Snippet Panel */}
            {codeSnippet && (
                <div className="mt-5 rounded-sm overflow-hidden border border-white/[0.08] bg-[#060709] text-[#ededed]" id="CodeSnippetBox">
                    <div className="bg-[#111318] px-4 py-2 border-b border-white/[0.06] flex items-center justify-between text-xs text-[#888888] font-mono">
                        <div className="flex items-center gap-2">
                            <span>Python Reference</span>
                        </div>
                        <span className="text-[#71717A] text-xs">read-only</span>
                    </div>

                    <div className="p-4 sm:p-5 overflow-x-auto text-left leading-relaxed">
                        <pre className="font-mono text-xs text-[#ededed] m-0 whitespace-pre">
                            {codeSnippet}
                        </pre>
                    </div>

                    <div className="bg-[#111318] px-4 py-1.5 border-t border-white/[0.06] flex items-center justify-between text-[#71717A] text-xs">
                        <span>Environment: Standard Sandbox</span>
                        <span>UTF-8</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionWorkspace;
