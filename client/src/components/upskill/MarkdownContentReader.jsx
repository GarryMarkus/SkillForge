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
        <article className="w-full bg-white rounded-2xl border border-gray-200 font-sans select-text shadow-sm" id="MarkdownContentReader">
            {/* Header Bar */}
            <div className="w-full bg-gray-50 px-6 py-4 rounded-t-2xl border-b border-gray-200 flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                        Learning Guide
                    </h3>
                    <p className="text-xs text-gray-500">
                        Read through the material and complete the code examples
                    </p>
                </div>
                <span className="text-xs font-medium text-gray-500 bg-white border border-gray-200 px-2.5 py-1 rounded-full">
                    Interactive Guide
                </span>
            </div>

            {/* Document Body */}
            <div className="p-6 sm:p-10 lg:p-12 text-gray-800 leading-relaxed font-sans text-base">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({ ...props }) => (
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-8 mb-4 pb-3 border-b border-gray-100" {...props} />
                        ),
                        h2: ({ ...props }) => (
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 mt-8 mb-3 pb-2 border-b border-gray-100" {...props} />
                        ),
                        h3: ({ ...props }) => (
                            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-blue-700 mt-6 mb-2" {...props} />
                        ),
                        p: ({ ...props }) => (
                            <p className="my-4 text-base sm:text-lg text-gray-700 leading-relaxed" {...props} />
                        ),
                        ul: ({ ...props }) => (
                            <ul className="my-4 space-y-2 list-disc list-inside pl-2 text-base text-gray-700 leading-relaxed" {...props} />
                        ),
                        ol: ({ ...props }) => (
                            <ol className="my-4 space-y-2 list-decimal list-inside pl-2 text-base text-gray-700 leading-relaxed" {...props} />
                        ),
                        li: ({ children, ...props }) => (
                            <li className="text-base text-gray-700 leading-relaxed" {...props}>
                                {children}
                            </li>
                        ),
                        code: ({ inline, className, children, ...props }) => {
                            if (inline) {
                                return (
                                    <code className="bg-gray-100 px-2 py-0.5 rounded text-blue-700 font-mono text-sm font-medium" {...props}>
                                        {children}
                                    </code>
                                );
                            }
                            return (
                                <code className={`${className || ''} font-mono text-sm`} {...props}>
                                    {children}
                                </code>
                            );
                        },
                        pre: ({ children, ...props }) => (
                            <div className="my-6 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                                <div className="bg-gray-800 text-gray-300 px-4 py-2 text-xs font-medium flex items-center justify-between select-none">
                                    <span>Code Example</span>
                                    <span className="text-gray-400 text-[11px]">Read-only</span>
                                </div>
                                <pre className="p-5 bg-gray-900 text-emerald-400 overflow-x-auto text-sm font-mono leading-relaxed" {...props}>
                                    {children}
                                </pre>
                            </div>
                        ),
                        blockquote: ({ ...props }) => (
                            <blockquote className="my-6 p-4 rounded-xl border-l-4 border-blue-600 bg-blue-50/50 text-base italic text-gray-700" {...props} />
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
