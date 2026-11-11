import React, { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BookOpen, ListTree, Terminal, Copy, Check } from '../ui/Icons';

const extractTextFromChildren = (children) => {
    if (typeof children === 'string') return children;
    if (Array.isArray(children)) return children.map(extractTextFromChildren).join('');
    if (children && typeof children === 'object' && children.props?.children) {
        return extractTextFromChildren(children.props.children);
    }
    return '';
};

const toSlug = (text) =>
    String(text || '')
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');

const CodeBlockWithCopy = ({ children, ...props }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const raw = extractTextFromChildren(children);
        if (!raw) return;
        navigator.clipboard?.writeText(raw).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        }).catch(() => {});
    };

    return (
        <div className="my-4 rounded-sm border border-white/[0.08] overflow-hidden">
            <div className="bg-[#111318] text-[#888888] px-3.5 py-2 text-[11px] font-mono flex items-center justify-between select-none border-b border-white/[0.06]">
                <span className="inline-flex items-center gap-1.5 text-zinc-300">
                    <Terminal className="w-3.5 h-3.5 text-[#888888]" strokeWidth={1.75} aria-hidden="true" />
                    <span>Code Example</span>
                </span>
                <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 text-[11px] text-[#888888] hover:text-white transition-colors cursor-pointer"
                >
                    {copied ? (
                        <>
                            <Check className="w-3 h-3 text-emerald-400" strokeWidth={2} aria-hidden="true" />
                            <span className="text-emerald-400">Copied</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-3 h-3" strokeWidth={1.75} aria-hidden="true" />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>
            <pre className="p-4 bg-[#060709] text-[#ededed] overflow-x-auto text-xs font-mono leading-relaxed" {...props}>
                {children}
            </pre>
        </div>
    );
};

const MarkdownContentReader = ({ content = '' }) => {
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

    const sections = useMemo(() => {
        if (typeof markdownText !== 'string') return [];
        const lines = markdownText.split('\n');
        const found = [];
        for (const line of lines) {
            const match = line.match(/^#{1,2}\s+(.+)$/);
            if (match) {
                const title = match[1].replace(/[`*_]/g, '').trim();
                if (title && found.length < 7) {
                    found.push({ title, id: toSlug(title) });
                }
            }
        }
        return found;
    }, [markdownText]);

    const jumpToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 84;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <article className="w-full bg-[#0D0F14] rounded-md border border-white/[0.08] border-t-white/15 font-mono select-text" id="MarkdownContentReader">
            {/* Header Bar */}
            <div className="w-full bg-[#111318] px-5 sm:px-6 py-3.5 rounded-t-md border-b border-white/[0.06] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-zinc-300 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                        Study Guide
                    </h3>
                </div>
                <span className="text-[11px] font-mono text-zinc-300 bg-white/[0.04] border border-white/[0.08] px-2.5 py-0.5 rounded-sm">
                    Technical Spec
                </span>
            </div>

            {/* Quick Section Jump Strip */}
            {sections.length > 1 && (
                <div className="px-5 sm:px-6 py-3 bg-[#060709]/60 border-b border-white/[0.06] flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-[#71717A] mr-1">
                        <ListTree className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                        <span>Sections:</span>
                    </span>
                    {sections.map((sec) => (
                        <button
                            key={sec.id}
                            type="button"
                            onClick={() => jumpToSection(sec.id)}
                            className="px-2.5 py-1 rounded-sm bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 text-[11px] text-zinc-300 hover:text-white transition-colors cursor-pointer"
                        >
                            {sec.title}
                        </button>
                    ))}
                </div>
            )}

            {/* Document Body */}
            <div className="p-6 sm:p-8 text-[#a1a1aa] leading-relaxed font-mono text-xs sm:text-sm">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({ children, ...props }) => {
                            const id = toSlug(extractTextFromChildren(children));
                            return (
                                <h1
                                    id={id}
                                    className="text-lg sm:text-xl font-bold font-display tracking-tight text-white mt-6 first:mt-0 mb-3 pb-2 border-b border-white/[0.06]"
                                    {...props}
                                >
                                    {children}
                                </h1>
                            );
                        },
                        h2: ({ children, ...props }) => {
                            const id = toSlug(extractTextFromChildren(children));
                            return (
                                <h2
                                    id={id}
                                    className="text-base sm:text-lg font-bold font-display tracking-tight text-[#ededed] mt-7 mb-2.5 pb-1.5 border-b border-white/[0.06]"
                                    {...props}
                                >
                                    {children}
                                </h2>
                            );
                        },
                        h3: ({ ...props }) => (
                            <h3 className="text-sm sm:text-base font-semibold text-white mt-5 mb-2" {...props} />
                        ),
                        p: ({ ...props }) => (
                            <p className="my-3 text-xs sm:text-sm text-[#a1a1aa] leading-relaxed font-mono" {...props} />
                        ),
                        ul: ({ ...props }) => (
                            <ul className="my-3 space-y-1.5 list-disc list-inside pl-2 text-xs sm:text-sm text-[#a1a1aa] leading-relaxed" {...props} />
                        ),
                        ol: ({ ...props }) => (
                            <ol className="my-3 space-y-1.5 list-decimal list-inside pl-2 text-xs sm:text-sm text-[#a1a1aa] leading-relaxed" {...props} />
                        ),
                        li: ({ children, ...props }) => (
                            <li className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed" {...props}>
                                {children}
                            </li>
                        ),
                        code: ({ inline, className, children, ...props }) => {
                            if (inline) {
                                return (
                                    <code className="bg-white/[0.05] border border-white/[0.08] px-1.5 py-0.5 rounded-sm text-[#f5f5f5] font-mono text-xs" {...props}>
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
                            <CodeBlockWithCopy {...props}>{children}</CodeBlockWithCopy>
                        ),
                        blockquote: ({ ...props }) => (
                            <blockquote className="my-4 p-3.5 rounded-sm border-l-2 border-white/30 bg-[#060709] text-xs italic text-zinc-300" {...props} />
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
                            <td className="py-2.5 px-3.5 border-t border-white/[0.04] text-[#a1a1aa]" {...props} />
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
