import React, { useMemo, useState } from 'react';
import {
    CheckCircle2,
    AlertCircle,
    BookOpen,
    Layers,
    ListChecks,
    Sparkles,
    ArrowUpRight,
    ChevronDown,
    ChevronUp,
} from '../ui/Icons';

const KIND_META = {
    strengths: {
        label: 'Strengths',
        dotClass: 'bg-emerald-400',
        badgeClass: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-300',
        borderClass: 'border-emerald-500/20',
        Icon: CheckCircle2,
        iconClass: 'text-emerald-400',
    },
    weaknesses: {
        label: 'Gaps',
        dotClass: 'bg-amber-400',
        badgeClass: 'bg-amber-500/10 border-amber-500/25 text-amber-300',
        borderClass: 'border-amber-500/20',
        Icon: AlertCircle,
        iconClass: 'text-amber-300',
    },
    suggestions: {
        label: 'Actions',
        dotClass: 'bg-white',
        badgeClass: 'bg-white/[0.06] border-white/15 text-zinc-200',
        borderClass: 'border-white/15',
        Icon: BookOpen,
        iconClass: 'text-zinc-200',
    },
    domains: {
        label: 'Domains',
        dotClass: 'bg-zinc-300',
        badgeClass: 'bg-white/[0.05] border-white/15 text-zinc-200',
        borderClass: 'border-white/[0.1]',
        Icon: Layers,
        iconClass: 'text-zinc-300',
    },
    general: {
        label: 'Notes',
        dotClass: 'bg-zinc-400',
        badgeClass: 'bg-white/[0.04] border-white/[0.1] text-zinc-300',
        borderClass: 'border-white/[0.08]',
        Icon: ListChecks,
        iconClass: 'text-zinc-400',
    },
};

export const FormattedInlineTokens = ({ text }) => {
    if (!text) return null;
    const raw = String(text);
    const tokens = raw.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);

    return (
        <>
            {tokens.map((tok, idx) => {
                if (!tok) return null;
                if (tok.startsWith('`') && tok.endsWith('`') && tok.length > 2) {
                    return (
                        <code
                            key={idx}
                            className="px-1.5 py-0.5 mx-0.5 rounded-sm bg-white/[0.06] border border-white/[0.1] text-zinc-100 font-mono text-[11px]"
                        >
                            {tok.slice(1, -1)}
                        </code>
                    );
                }
                if (tok.startsWith('**') && tok.endsWith('**') && tok.length > 4) {
                    return (
                        <strong key={idx} className="font-semibold text-white">
                            {tok.slice(2, -2)}
                        </strong>
                    );
                }
                return <React.Fragment key={idx}>{tok}</React.Fragment>;
            })}
        </>
    );
};

const clientFallbackParse = (rawText) => {
    const clean = String(rawText || '').replace(/\r\n/g, '\n').trim();
    if (!clean) {
        return { executive_summary: '', sections: [] };
    }
    const lines = clean
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l && !/^[-*_]{3,}$/.test(l));

    const sections = [];
    let current = null;
    let activeItem = null;
    const loose = [];

    const classify = (title) => {
        const low = title.toLowerCase();
        if (low.includes('strength')) return 'strengths';
        if (low.includes('weakness') || low.includes('gap')) return 'weaknesses';
        if (low.includes('suggest') || low.includes('recommend')) return 'suggestions';
        if (low.includes('domain')) return 'domains';
        return 'general';
    };

    const splitTitle = (str) => {
        const m = str.match(/^\*\*(.+?)\*\*\s*:?\s*(.*)$/);
        if (m) return [m[1].replace(/:$/, '').trim(), m[2].trim()];
        return ['', str];
    };

    for (const line of lines) {
        if (/^(Here's|Here is|As an expert)\b/i.test(line)) continue;
        const hMatch = line.match(/^#{1,6}\s+(.+)$/);
        if (hMatch) {
            const title = hMatch[1].replace(/[*`]/g, '').replace(/:$/, '').trim();
            current = { id: title.toLowerCase(), title, kind: classify(title), items: [] };
            sections.push(current);
            activeItem = null;
            continue;
        }
        const nMatch = line.match(/^\d+[.)]\s+(.+)$/);
        if (nMatch) {
            if (!current) {
                current = { id: 'findings', title: 'Key Findings', kind: 'general', items: [] };
                sections.push(current);
            }
            const [t, s] = splitTitle(nMatch[1]);
            activeItem = { title: t, summary: s, subitems: [] };
            current.items.push(activeItem);
            continue;
        }
        const bMatch = line.match(/^[*\-+•]\s+(.+)$/);
        if (bMatch) {
            if (!current) {
                current = { id: 'highlights', title: 'Highlights', kind: 'general', items: [] };
                sections.push(current);
            }
            const [l, s] = splitTitle(bMatch[1]);
            if (activeItem) {
                activeItem.subitems.push({ label: l, text: s });
            } else {
                current.items.push({ title: l, summary: s, subitems: [] });
            }
            continue;
        }
        if (!current) {
            loose.push(line);
        } else {
            current.items.push({ title: '', summary: line, subitems: [] });
        }
    }

    return {
        executive_summary: loose.join(' '),
        sections,
    };
};

const StructuredEvaluationView = ({
    title,
    subtitle,
    structured,
    rawText,
    emptyMessage = 'No AI review generated yet. Click Re-run AI Analysis to evaluate.',
    modeLabel,
    onPracticeTopic,
    defaultExpanded = true,
}) => {
    const resolved = useMemo(() => {
        if (structured && (structured.executive_summary || (structured.sections && structured.sections.length > 0))) {
            return structured;
        }
        return clientFallbackParse(rawText);
    }, [structured, rawText]);

    const sections = useMemo(() => resolved?.sections || [], [resolved]);
    const availableKinds = useMemo(() => {
        const seen = new Set();
        return sections
            .map((s) => s.kind || 'general')
            .filter((k) => {
                if (seen.has(k)) return false;
                seen.add(k);
                return true;
            });
    }, [sections]);

    const [activeKindFilter, setActiveKindFilter] = useState('all');
    const [collapsedSections, setCollapsedSections] = useState({});

    const visibleSections = useMemo(() => {
        if (activeKindFilter === 'all') return sections;
        return sections.filter((s) => (s.kind || 'general') === activeKindFilter);
    }, [sections, activeKindFilter]);

    const toggleSection = (secKey) => {
        setCollapsedSections((prev) => ({
            ...prev,
            [secKey]: prev[secKey] === undefined ? defaultExpanded : !prev[secKey],
        }));
    };

    const isEmpty = !resolved?.executive_summary && sections.length === 0;

    return (
        <div className="rounded-md bg-[#0D0F14] border border-white/[0.08] border-t-white/15 overflow-hidden flex flex-col">
            {/* Header Bar */}
            {(title || availableKinds.length > 1) && (
                <div className="px-5 py-4 bg-[#111318] border-b border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            {title && (
                                <h3 className="font-display font-bold text-sm sm:text-base text-white tracking-tight">
                                    {title}
                                </h3>
                            )}
                            {modeLabel && (
                                <span className="px-2 py-0.5 rounded-sm bg-white/[0.04] border border-white/[0.08] text-[10px] text-zinc-300">
                                    {modeLabel}
                                </span>
                            )}
                        </div>
                        {subtitle && (
                            <p className="text-[11px] text-[#888888] mt-0.5">{subtitle}</p>
                        )}
                    </div>

                    {availableKinds.length > 1 && (
                        <div className="flex flex-wrap items-center gap-1.5">
                            <button
                                type="button"
                                onClick={() => setActiveKindFilter('all')}
                                className={`px-2.5 py-1 rounded-sm text-[11px] border transition-colors cursor-pointer ${
                                    activeKindFilter === 'all'
                                        ? 'bg-white text-[#050505] border-white font-semibold'
                                        : 'bg-[#060709] border-white/[0.08] text-zinc-400 hover:text-white'
                                }`}
                            >
                                All ({sections.reduce((acc, s) => acc + (s.items?.length || 0), 0)})
                            </button>
                            {availableKinds.map((kind) => {
                                const meta = KIND_META[kind] || KIND_META.general;
                                return (
                                    <button
                                        key={kind}
                                        type="button"
                                        onClick={() => setActiveKindFilter(kind)}
                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[11px] border transition-colors cursor-pointer ${
                                            activeKindFilter === kind
                                                ? 'bg-white text-[#050505] border-white font-semibold'
                                                : 'bg-[#060709] border-white/[0.08] text-zinc-400 hover:text-white'
                                        }`}
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full ${activeKindFilter === kind ? 'bg-[#050505]' : meta.dotClass}`} />
                                        <span>{meta.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            <div className="p-5 sm:p-6 space-y-5">
                {isEmpty ? (
                    <div className="p-4 rounded-sm bg-[#060709] border border-white/[0.08] text-xs text-[#888888]">
                        {emptyMessage}
                    </div>
                ) : (
                    <>
                        {/* Crisp Executive Summary Callout */}
                        {resolved.executive_summary && (
                            <div className="p-4 rounded-sm bg-[#060709] border border-white/[0.08] border-l-2 border-l-white/40 flex items-start gap-3">
                                <Sparkles className="w-4 h-4 text-zinc-200 shrink-0 mt-0.5" />
                                <div className="space-y-1">
                                    <div className="text-[10px] uppercase tracking-wider text-[#71717A] font-semibold">
                                        Executive Summary
                                    </div>
                                    <p className="text-xs sm:text-[13px] text-zinc-200 leading-relaxed">
                                        <FormattedInlineTokens text={resolved.executive_summary} />
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Structured Evaluation Sections */}
                        <div className="space-y-4">
                            {visibleSections.map((sec, secIdx) => {
                                const meta = KIND_META[sec.kind] || KIND_META.general;
                                const SectionIcon = meta.Icon;
                                const secKey = `${sec.id || sec.title}-${secIdx}`;
                                const isCollapsed = collapsedSections[secKey] !== undefined
                                    ? collapsedSections[secKey]
                                    : !defaultExpanded;
                                const items = sec.items || [];
                                const canPractice = sec.kind === 'weaknesses' || sec.kind === 'suggestions';

                                return (
                                    <div
                                        key={secKey}
                                        className="rounded-sm bg-[#060709] border border-white/[0.08] overflow-hidden"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => toggleSection(secKey)}
                                            className="w-full px-4 py-3 bg-[#111318]/70 hover:bg-[#111318] border-b border-white/[0.06] flex items-center justify-between gap-3 text-left cursor-pointer transition-colors"
                                        >
                                            <div className="flex items-center gap-2.5 min-w-0">
                                                <SectionIcon className={`w-4 h-4 shrink-0 ${meta.iconClass}`} />
                                                <span className="text-xs font-semibold text-white truncate">
                                                    {sec.title}
                                                </span>
                                                <span className={`px-2 py-0.5 rounded-sm border text-[10px] ${meta.badgeClass}`}>
                                                    {items.length} {items.length === 1 ? 'point' : 'points'}
                                                </span>
                                            </div>
                                            {isCollapsed ? (
                                                <ChevronDown className="w-3.5 h-3.5 text-[#71717A] shrink-0" />
                                            ) : (
                                                <ChevronUp className="w-3.5 h-3.5 text-[#71717A] shrink-0" />
                                            )}
                                        </button>

                                        {!isCollapsed && (
                                            <div className="p-4 space-y-3">
                                                {items.map((item, idx) => {
                                                    const hasSubitems = Array.isArray(item.subitems) && item.subitems.length > 0;
                                                    const topicLabel = item.title || item.summary?.slice(0, 48);

                                                    return (
                                                        <div
                                                            key={idx}
                                                            className="p-3.5 rounded-sm bg-[#0D0F14] border border-white/[0.07] space-y-2.5"
                                                        >
                                                            <div className="flex items-start justify-between gap-3">
                                                                <div className="flex items-start gap-2.5 min-w-0">
                                                                    <span className="px-1.5 py-0.5 rounded-sm bg-white/[0.04] border border-white/[0.08] text-[10px] text-[#71717A] shrink-0 mt-0.5">
                                                                        {String(idx + 1).padStart(2, '0')}
                                                                    </span>
                                                                    <div className="space-y-1 min-w-0">
                                                                        {item.title && (
                                                                            <h4 className="text-xs sm:text-[13px] font-semibold text-white leading-snug">
                                                                                <FormattedInlineTokens text={item.title} />
                                                                            </h4>
                                                                        )}
                                                                        {item.summary && (
                                                                            <p className="text-xs text-zinc-300 leading-relaxed">
                                                                                <FormattedInlineTokens text={item.summary} />
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                {canPractice && onPracticeTopic && topicLabel && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => onPracticeTopic(topicLabel)}
                                                                        className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-sm bg-[#060709] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/25 text-[10px] text-zinc-300 hover:text-white shrink-0 transition-colors cursor-pointer"
                                                                    >
                                                                        <span>Practice</span>
                                                                        <ArrowUpRight className="w-3 h-3" />
                                                                    </button>
                                                                )}
                                                            </div>

                                                            {hasSubitems && (
                                                                <div
                                                                    className={`pl-2 sm:pl-7 pt-1 grid gap-2 ${
                                                                        item.subitems.length > 1 && item.subitems.every((sub) => sub.label)
                                                                            ? 'grid-cols-1 md:grid-cols-2'
                                                                            : 'grid-cols-1'
                                                                    }`}
                                                                >
                                                                    {item.subitems.map((sub, subIdx) => (
                                                                        <div
                                                                            key={subIdx}
                                                                            className="p-2.5 rounded-sm bg-[#060709] border border-white/[0.06] space-y-1"
                                                                        >
                                                                            {sub.label && (
                                                                                <div className="text-[11px] font-semibold text-zinc-100">
                                                                                    <FormattedInlineTokens text={sub.label} />
                                                                                </div>
                                                                            )}
                                                                            {sub.text && (
                                                                                <p className="text-[11px] text-zinc-300 leading-relaxed">
                                                                                    <FormattedInlineTokens text={sub.text} />
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default StructuredEvaluationView;
