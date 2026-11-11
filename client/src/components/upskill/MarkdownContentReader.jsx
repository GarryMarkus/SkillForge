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
        <article className="w-full bg-[#0D0F14] rounded-md border border-white/[0.08] border-t-white/15 font-mono select-text" id="MarkdownContentReader">
            {/* Header Bar */}
            <div className="w-full bg-[#111318] px-6 py-3.5 rounded-t-md border-b border-white/[0.06] flex items-center justify-between">
                <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                        Curriculum Guide
                    </h3>
                    <p className="text-xs text-[#888888] mt-0.5">
                        Technical specification &amp; architectural rationale
                    </p>
                </div>
                <span className="text-[11px] font-mono text-zinc-300 bg-white/[0.04] border border-white/[0.08] px-2.5 py-0.5 rounded-sm">
                    Interactive Spec
                </span>
            </div>

            {/* Document Body */}
            <div className="p-6 sm:p-9 text-[#8a8a8e] leading-relaxed font-mono text-xs sm:text-sm">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({ ...props }) => (
                            <h1 className="text-lg sm:text-xl font-bold font-display tracking-tight text-white mt-6 mb-3 pb-2 border-b border-white/[0.06]" {...props} />
                        ),
                        h2: ({ ...props }) => (
                            <h2 className="text-base sm:text-lg font-bold font-display tracking-tight text-[#ededed] mt-6 mb-2 pb-1 border-b border-white/[0.06]" {...props} />
                        ),
                        h3: ({ ...props }) => (
                            <h3 className="text-sm sm:text-base font-semibold text-white mt-5 mb-2" {...props} />
                        ),
                        p: ({ ...props }) => (
                            <p className="my-3 text-xs sm:text-sm text-[#8a8a8e] leading-relaxed font-mono" {...props} />
                        ),
                        ul: ({ ...props }) => (
                            <ul className="my-3 space-y-1.5 list-disc list-inside pl-2 text-xs sm:text-sm text-[#8a8a8e] leading-relaxed" {...props} />
                        ),
                        ol: ({ ...props }) => (
                            <ol className="my-3 space-y-1.5 list-decimal list-inside pl-2 text-xs sm:text-sm text-[#8a8a8e] leading-relaxed" {...props} />
                        ),
                        li: ({ children, ...props }) => (
                            <li className="text-xs sm:text-sm text-[#8a8a8e] leading-relaxed" {...props}>
                                {children}
                            </li>
                        ),
                        code: ({ inline, className, children, ...props }) => {
                            if (inline) {
                                return (
                                    <code className="bg-white/[0.04] border border-white/[0.08] px-1.5 py-0.5 rounded-sm text-[#f5f5f5] font-mono text-xs" {...props}>
                                        {children}
                                    </code>
                                );
                            }
                            return (
                                <code className={`${className || ''} font-mono text-xs text-[#ededed]`} {...props}>
                                    {children}
                                </code>
                            );
                        },
                        pre: ({ children, ...props }) => (
                            <div className="my-4 rounded-sm border border-white/[0.08] overflow-hidden">
                                <div className="bg-[#111318] text-[#888888] px-3.5 py-1.5 text-[11px] font-mono flex items-center justify-between select-none border-b border-white/[0.06]">
                                    <span>Code Implementation</span>
                                    <span className="text-[#71717A] text-[10px]">read-only</span>
                                </div>
                                <pre className="p-4 bg-[#060709] text-[#ededed] overflow-x-auto text-xs font-mono leading-relaxed" {...props}>
                                    {children}
                                </pre>
                            </div>
                        ),
                        blockquote: ({ ...props }) => (
                            <blockquote className="my-4 p-3 rounded-sm border-l-2 border-white/25 bg-[#060709] text-xs italic text-[#888888]" {...props} />
                        ),
                        strong: ({ ...props }) => (
                            <strong className="font-semibold text-[#f5f5f5]" {...props} />
                        ),
                        hr: ({ ...props }) => (
                            <hr className="my-6 border-white/[0.06]" {...props} />
                        ),
                        a: ({ ...props }) => (
                            <a
                                className="text-[#f5f5f5] underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white/70 transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                                {...props}
                            />
                        ),
                        table: ({ ...props }) => (
                            <div className="my-5 overflow-x-auto rounded-sm border border-white/[0.08]">
                                <table className="w-full text-left border-collapse text-xs font-mono" {...props} />
                            </div>
                        ),
                        thead: ({ ...props }) => (
                            <thead className="bg-[#111318] text-zinc-300 border-b border-white/[0.06]" {...props} />
                        ),
                        th: ({ ...props }) => (
                            <th className="py-2.5 px-3.5 font-semibold uppercase tracking-wider text-[11px]" {...props} />
                        ),
                        td: ({ ...props }) => (
                            <td className="py-2.5 px-3.5 border-t border-white/[0.04] text-[#8a8a8e]" {...props} />
                        ),
                    }}
                >
                    {markdownText}
                </ReactMarkdown>
            </div>
        </article>
    );
};

export default MarkdownContentReader;
