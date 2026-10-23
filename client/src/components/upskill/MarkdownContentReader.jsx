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
        <article className="w-full border border-black/20 bg-surface-container-lowest font-mono select-text" id="MarkdownContentReader">
            {/* Console Reader Header Bar */}
            <div className="w-full bg-surface-container px-space-md py-space-xs border-b border-black/20 flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                    <span className="text-primary-container font-bold">+</span>
                    <span className="font-headline-sm text-headline-sm uppercase text-on-surface tracking-tight font-bold">
                        [ SYNTHESIZED_CURRICULUM_DOCUMENT // MONOSPACE_VIEWPORT ]
                    </span>
                </div>
                <div className="flex items-center gap-space-sm text-label-sm font-label-sm text-on-surface-variant">
                    <span className="border border-black/15 px-space-xs bg-surface font-bold">
                        [ENC: UTF-8 // GFM]
                    </span>
                    <span className="hidden md:inline">SPEC_RENDER: CAD_DOC_01</span>
                </div>
            </div>

            {/* Document Body */}
            <div className="p-space-lg md:p-space-xl prose max-w-none text-on-surface">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({ ...props }) => (
                            <h1 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-on-surface mt-8 mb-4 pb-2 border-b-2 border-black/20 flex items-center gap-2" {...props}>
                                <span className="text-primary-container font-bold">[#]</span>
                                <span>{props.children}</span>
                            </h1>
                        ),
                        h2: ({ ...props }) => (
                            <h2 className="text-lg md:text-xl font-bold uppercase tracking-tight text-on-surface mt-6 mb-3 pb-1 border-b border-black/15 flex items-center gap-2" {...props}>
                                <span className="bg-primary-container text-white px-1 py-0.5 text-xs font-bold font-mono">SEC</span>
                                <span>{props.children}</span>
                            </h2>
                        ),
                        h3: ({ ...props }) => (
                            <h3 className="text-sm md:text-base font-bold uppercase tracking-tight text-primary-container mt-5 mb-2" {...props}>
                                // {props.children}
                            </h3>
                        ),
                        p: ({ ...props }) => (
                            <p className="my-3 text-body-md font-mono text-on-surface leading-relaxed" {...props} />
                        ),
                        ul: ({ ...props }) => (
                            <ul className="my-3 space-y-1.5 list-none pl-2" {...props} />
                        ),
                        ol: ({ ...props }) => (
                            <ol className="my-3 space-y-1.5 list-decimal list-inside pl-2 text-body-md" {...props} />
                        ),
                        li: ({ children, ...props }) => (
                            <li className="flex items-start gap-2 text-body-md text-on-surface" {...props}>
                                <span className="text-primary-container font-bold shrink-0">■</span>
                                <span>{children}</span>
                            </li>
                        ),
                        code: ({ inline, className, children, ...props }) => {
                            if (inline) {
                                return (
                                    <code className="bg-surface-container px-1.5 py-0.5 border border-black/15 text-primary-container font-bold text-xs font-mono" {...props}>
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
                            <div className="my-4 border border-black/30 overflow-hidden shadow-[2px_2px_0px_#191C1D]">
                                <div className="bg-[#1C1B1B] text-white px-3 py-1 text-label-sm font-label-sm flex items-center justify-between border-b border-white/10 select-none">
                                    <span className="text-primary-fixed-dim font-bold">// TERMINAL_CODE_WORKSPACE</span>
                                    <span className="text-white/40 text-[9px]">INTERPRETER: ACTIVE</span>
                                </div>
                                <pre className="p-4 bg-[#0A0A0A] text-[#22C55E] overflow-x-auto text-xs md:text-sm font-mono leading-relaxed" {...props}>
                                    {children}
                                </pre>
                            </div>
                        ),
                        blockquote: ({ ...props }) => (
                            <blockquote className="my-4 p-space-md border-l-4 border-primary-container bg-surface-container-low border-t border-r border-b border-black/10 text-body-sm italic text-on-surface-variant font-mono" {...props}>
                                <div className="text-label-sm font-label-sm uppercase font-bold text-primary-container not-italic mb-1">
                                    [ DIRECTIVE_SPECIFICATION_NOTE ]
                                </div>
                                {props.children}
                            </blockquote>
                        ),
                        strong: ({ ...props }) => (
                            <strong className="font-bold text-on-surface text-primary-container underline decoration-primary-container/40" {...props} />
                        ),
                        a: ({ ...props }) => (
                            <a className="text-primary-container underline font-bold hover:bg-primary-container hover:text-white px-0.5 transition-none" target="_blank" rel="noopener noreferrer" {...props} />
                        ),
                        table: ({ ...props }) => (
                            <div className="my-4 overflow-x-auto border border-black/20">
                                <table className="w-full border-collapse text-left text-body-sm font-mono" {...props} />
                            </div>
                        ),
                        thead: ({ ...props }) => (
                            <thead className="bg-surface-container border-b border-black/20 text-on-surface font-bold uppercase text-label-md" {...props} />
                        ),
                        th: ({ ...props }) => (
                            <th className="p-space-sm border-r border-black/15 font-bold" {...props} />
                        ),
                        td: ({ ...props }) => (
                            <td className="p-space-sm border-r border-b border-black/10 text-on-surface" {...props} />
                        ),
                    }}
                >
                    {markdownText}
                </ReactMarkdown>
            </div>

            {/* Document Base Footer */}
            <div className="w-full bg-surface-container-low px-space-md py-space-xs border-t border-black/15 flex flex-wrap items-center justify-between text-label-sm font-label-sm text-secondary select-none">
                <div>DOCUMENT_STATUS: INTEGRITY_VERIFIED // FORMAT: COMMONMARK_L2</div>
                <div className="flex items-center gap-2">
                    <span>SECURITY_HASH: BLAKE3:0x89e1a..</span>
                    <span className="text-black/30">|</span>
                    <span className="text-primary-container font-bold">100%_MONO</span>
                </div>
            </div>
        </article>
    );
};

export default MarkdownContentReader;
