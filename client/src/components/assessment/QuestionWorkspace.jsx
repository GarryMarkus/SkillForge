import React from 'react';

const QuestionWorkspace = ({ question, questionIndex = 0 }) => {
    if (!question) return null;

    const sectionTitle = question.section || 'SYSTEM_CONCURRENCY_&_INDEXING';
    const weight = question.weight || '25 PTS';
    const taxonomy = question.taxonomy || 'SYNTHESIS';
    const title = question.title || question.question || question.text || 'SCENARIO SPECIFICATION';
    const description = question.description || 'Analyze the technical scenario below and identify the architecturally optimal resolution vector.';
    const codeSnippet = question.code_snippet;

    return (
        <div className="relative bg-surface-container-lowest border border-on-surface/20 p-5 shadow-[4px_4px_0px_#191C1D] font-mono select-none">
            {/* Corner Tick Crosshairs */}
            <span className="absolute -top-1.5 -left-1.5 font-label-sm text-label-sm text-ink-primary select-none font-bold">+</span>
            <span className="absolute -top-1.5 -right-1.5 font-label-sm text-label-sm text-ink-primary select-none font-bold">+</span>
            <span className="absolute -bottom-1.5 -left-1.5 font-label-sm text-label-sm text-ink-primary select-none font-bold">+</span>
            <span className="absolute -bottom-1.5 -right-1.5 font-label-sm text-label-sm text-ink-primary select-none font-bold">+</span>

            {/* Question Header Block */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-on-surface/15 pb-3">
                <span className="font-label-md text-label-md text-canvas-blueprint font-bold tracking-wider">
                    [ SECTION_{String(questionIndex + 1).padStart(2, '0')} // {sectionTitle} ]
                </span>
                <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
                    <span>WEIGHT: [ {weight} ]</span>
                    <span>//</span>
                    <span>COGNITIVE_TAXONOMY: {taxonomy}</span>
                </div>
            </div>

            {/* Problem Scenario Meta */}
            <div className="pt-4 pb-2">
                <h1 className="font-headline-sm text-headline-sm text-ink-primary uppercase tracking-tight font-bold">
                    {title}
                </h1>
                <p className="mt-2.5 font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Code Snippet Panel */}
            {codeSnippet && (
                <div className="mt-4 bg-[#0A0A0A] text-[#EDEEEF] border border-on-surface/40 p-0 font-body-sm text-body-sm shadow-[2px_2px_0px_#1D52B8]" id="CodeSnippetBox">
                    <div className="bg-[#191C1D] text-[#EDEEEF] px-3 py-1.5 border-b border-[#3F4141] flex items-center justify-between font-label-sm text-label-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-primary-fixed inline-block"></span>
                            <span>[TERMINAL // PYTHON_RUNTIME_ENV_3.11]</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-on-surface-variant">
                            <span className="px-1 border border-[#3F4141] text-[#EDEEEF]">[-]</span>
                            <span className="px-1 border border-[#3F4141] text-[#EDEEEF]">[□]</span>
                            <span className="px-1 border border-[#BA1A1A] text-[#BA1A1A]">[X]</span>
                        </div>
                    </div>
                    <div className="p-4 overflow-x-auto text-left leading-relaxed">
                        <pre className="font-mono text-body-md text-[#EDEEEF] m-0 whitespace-pre">
                            {codeSnippet}
                        </pre>
                    </div>
                    <div className="bg-[#141617] px-3 py-1 border-t border-[#3F4141] flex items-center justify-between text-[#737784] font-label-sm text-label-sm">
                        <span>AST_TOKEN_AUDIT: PARSED_CLEAN // STATIC_ANALYSIS_HASH: 0x9f4e22a</span>
                        <span className="text-primary-fixed-dim">[ENCODING: UTF-8]</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionWorkspace;
