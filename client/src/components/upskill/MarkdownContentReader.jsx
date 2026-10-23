import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownContentReader = ({ content = '' }) => {
    // If content is JSON string, parse it to extract markdown body
    let markdownText = content;
    try {
        if (typeof content === 'string' && (content.trim().startsWith('{') || content.trim().startsWith('['))) {
            const parsed = JSON.parse(content);
            markdownText = parsed.content || parsed.markdown || content;
        } else if (typeof content === 'object' && content !== null) {
            markdownText = content.content || content.markdown || '';
        }
    } catch {
        markdownText = content;
    }

    return (
        <article className="w-full border border-black/20 bg-surface-container-lowest font-mono select-text shadow-[4px_4px_0px_#0A0A0A]" id="MarkdownContentReader">
            {/* Console Reader Header Bar */}
            <div className="w-full bg-surface-container px-4 sm:px-6 py-3 border-b border-black/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-canvas-blueprint font-bold text-base">+</span>
                    <span className="text-xs sm:text-sm uppercase text-ink-primary tracking-tight font-bold">
                        [ SYNTHESIZED CURRICULUM DOCUMENT // MONOSPACE VIEWPORT ]
                    </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-on-surface-variant font-bold">
                    <span className="border border-black/15 px-2 py-0.5 bg-surface">
                        [ UTF-8 // GFM ]
                    </span>
                </div>
            </div>

            {/* Document Body */}
            <div className="p-6 sm:p-10 lg:p-12 prose max-w-none text-ink-primary font-mono">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({ ...props }) => (
                            <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink-primary mt-10 mb-5 pb-3 border-b-2 border-black/20 flex items-center gap-2" {...props}>
                                <span className="text-canvas-blueprint font-bold">[#]</span>
                                <span>{props.children}</span>
                            </h1>
                        ),
                        h2: ({ ...props }) => (
                            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink-primary mt-8 mb-4 pb-2 border-b border-black/15 flex items-center gap-2" {...props}>
                                <span className="bg-canvas-blueprint text-white px-2 py-0.5 text-xs font-bold font-mono">SEC</span>
                                <span>{props.children}</span>
                            </h2>
                        ),
                        h3: ({ ...props }) => (
                            <h3 className="text-base sm:text-lg font-bold uppercase tracking-tight text-canvas-blueprint mt-6 mb-3" {...props}>
                                // {props.children}
                            </h3>
                        ),
                        p: ({ ...props }) => (
                            <p className="my-4 text-base sm:text-lg font-mono text-ink-primary leading-relaxed" {...props} />
                        ),
                        ul: ({ ...props }) => (
                            <ul className="my-4 space-y-2 list-none pl-2" {...props} />
                        ),
                        ol: ({ ...props }) => (
                            <ol className="my-4 space-y-2 list-decimal list-inside pl-2 text-base sm:text-lg" {...props} />
                        ),
                        li: ({ children, ...props }) => (
                            <li className="flex items-start gap-3 text-base sm:text-lg text-ink-primary leading-relaxed" {...props}>
                                <span className="text-canvas-blueprint font-bold shrink-0 mt-0.5">■</span>
                                <span>{children}</span>
                            </li>
                        ),
                        code: ({ inline, className, children, ...props }) => {
                            if (inline) {
                                return (
                                    <code className="bg-surface-container px-2 py-0.5 border border-black/15 text-canvas-blueprint font-bold text-xs sm:text-sm font-mono" {...props}>
                                        {children}
                                    </code>
                                );
                            }
                            return (
                                <code className={`${className || ''} font-mono`} {...props}>
                                    {children}
                                </code>
                            );
                        },
                        pre: ({ children, ...props }) => (
                            <div className="my-6 border border-black/30 overflow-hidden shadow-[3px_3px_0px_#0A0A0A]">
                                <div className="bg-[#1C1B1B] text-white px-4 py-2 text-xs font-bold flex items-center justify-between border-b border-white/10 select-none">
                                    <span className="text-primary-fixed-dim font-bold">// TERMINAL CODE WORKSPACE</span>
                                    <span className="text-white/40 text-[10px]">READ-ONLY BUFFER</span>
                                </div>
                                <pre className="p-5 bg-[#0A0A0A] text-[#22C55E] overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed" {...props}>
                                    {children}
                                </pre>
                            </div>
                        ),
                        blockquote: ({ ...props }) => (
                            <blockquote className="my-6 p-5 border-l-4 border-canvas-blueprint bg-surface-container-low border-t border-r border-b border-black/10 text-sm sm:text-base italic text-on-surface-variant font-mono" {...props}>
                                <div className="text-xs font-bold uppercase text-canvas-blueprint not-italic mb-1.5">
                                    [ DIRECTIVE SPECIFICATION NOTE ]
                                </div>
                                {props.children}
                            </blockquote>
                        ),
                        strong: ({ ...props }) => (
                            <strong className="font-bold text-ink-primary underline decoration-canvas-blueprint/40" {...props} />
                        ),
                        a: ({ ...props }) => (
                            <a className="text-canvas-blueprint underline font-bold hover:bg-canvas-blueprint hover:text-white px-1 transition-none" target="_blank" rel="noopener noreferrer" {...props} />
                        ),
                        table: ({ ...props }) => (
                            <div className="my-6 overflow-x-auto border border-black/20">
                                <table className="w-full border-collapse text-left text-xs sm:text-sm font-mono" {...props} />
                            </div>
                        ),
                        thead: ({ ...props }) => (
                            <thead className="bg-surface-container border-b border-black/20 text-ink-primary font-bold uppercase text-xs" {...props} />
                        ),
                        th: ({ ...props }) => (
                            <th className="py-3 px-4 border-r border-black/15 font-bold" {...props} />
                        ),
                        td: ({ ...props }) => (
                            <td className="py-3 px-4 border-r border-b border-black/10 text-ink-primary" {...props} />
                        ),
                    }}
                >
                    {markdownText}
                </ReactMarkdown>
            </div>

            {/* Document Base Footer */}
            <div className="w-full bg-surface-container-low px-4 sm:px-6 py-2.5 border-t border-black/15 flex flex-wrap items-center justify-between text-xs text-on-surface-variant select-none">
                <div>DOCUMENT STATUS: INTEGRITY VERIFIED</div>
                <div className="flex items-center gap-2">
                    <span className="text-canvas-blueprint font-bold">[ 100% MONOSPACE VIEWPORT ]</span>
                </div>
            </div>
        </article>
    );
};

export default MarkdownContentReader;
