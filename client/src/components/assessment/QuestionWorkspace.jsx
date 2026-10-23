import React from 'react';

const QuestionWorkspace = ({ question, questionIndex = 0 }) => {
    if (!question) return null;

    const sectionTitle = question.section || 'SYSTEM CONCURRENCY & INDEXING';
    const weight = question.weight || '25 PTS';
    const taxonomy = question.taxonomy || 'SYNTHESIS';
    const title = question.title || question.question || question.text || 'SCENARIO SPECIFICATION';
    const description = question.description || 'Analyze the technical scenario below and identify the architecturally optimal resolution vector.';
    const codeSnippet = question.code_snippet;

    return (
        <div className="bg-surface-container-lowest border border-black/20 p-6 sm:p-8 shadow-[4px_4px_0px_#0A0A0A] font-mono select-none" id="QuestionWorkspace">
            {/* Question Header Coordinates */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/15 pb-4 mb-4">
                <span className="text-xs text-canvas-blueprint font-bold tracking-wider uppercase">
                    [ SECTION {String(questionIndex + 1).padStart(2, '0')} // {sectionTitle} ]
                </span>
                <div className="flex items-center gap-3 text-xs text-on-surface-variant font-bold">
                    <span className="bg-surface-container px-2 py-0.5 border border-black/15 text-ink-primary">
                        WEIGHT: {weight}
                    </span>
                    <span className="text-black/30">|</span>
                    <span className="text-outline uppercase">TAXONOMY: {taxonomy}</span>
                </div>
            </div>

            {/* Problem Statement */}
            <div className="space-y-3 mb-6">
                <h1 className="text-xl sm:text-2xl text-ink-primary uppercase font-bold tracking-tight leading-snug">
                    {title}
                </h1>
                <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Code Snippet Panel */}
            {codeSnippet && (
                <div className="mt-4 bg-[#0A0A0A] text-[#EDEEEF] border border-black/40 shadow-[3px_3px_0px_#1D52B8]" id="CodeSnippetBox">
                    <div className="bg-[#191C1D] text-[#EDEEEF] px-4 py-2 border-b border-[#3F4141] flex items-center justify-between text-xs font-bold">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-primary-fixed inline-block"></span>
                            <span>[ ARCHITECTURE IMPLEMENTATION // PYTHON RUNTIME ]</span>
                        </div>
                        <span className="text-white/60 font-mono text-[11px] uppercase">READ-ONLY BUFFER</span>
                    </div>

                    <div className="p-4 sm:p-5 overflow-x-auto text-left leading-relaxed">
                        <pre className="font-mono text-xs sm:text-sm text-[#EDEEEF] m-0 whitespace-pre">
                            {codeSnippet}
                        </pre>
                    </div>

                    <div className="bg-[#141617] px-4 py-1.5 border-t border-[#3F4141] flex items-center justify-between text-[#737784] text-xs">
                        <span>AST PARSED // SYNTAX CONFIRMED</span>
                        <span className="text-primary-fixed-dim">[ENCODING: UTF-8]</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionWorkspace;
