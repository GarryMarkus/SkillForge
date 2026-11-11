import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Plus, ArrowUpRight, Sparkles } from '../ui/Icons';
import client from '../../api/client';

const ModuleCompletionActions = ({
    moduleId,
    isCompleted = false,
    onProgressUpdated,
    onGenerateNewClick
}) => {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [justCompleted, setJustCompleted] = useState(false);
    const [statusError, setStatusError] = useState('');

    const handleMarkCompleteAndRetest = async () => {
        if (!moduleId) return;
        if (isCompleted) {
            navigate('/student/assessment');
            return;
        }
        setSubmitting(true);
        setStatusError('');
        try {
            const res = await client.post('/modules/upskill/progress/', { module_id: moduleId });
            if (res.ok) {
                if (onProgressUpdated) {
                    onProgressUpdated();
                }
                setJustCompleted(true);
            } else {
                const err = await res.json().catch(() => ({}));
                setStatusError(err.error || 'Could not update module completion.');
            }
        } catch (e) {
            console.error('Error completing module', e);
            setStatusError('Network error while saving progress.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section
            className="w-full bg-[#111318] p-5 sm:p-6 rounded-md border border-white/[0.08] border-t-white/15 space-y-4 font-mono select-none"
            id="ModuleCompletionActions"
        >
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-sm border flex items-center justify-center shrink-0 ${
                        isCompleted || justCompleted
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                            : 'bg-[#060709] border-white/[0.08] text-zinc-300'
                    }`}>
                        <CheckCircle2 className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <div>
                        <div className="text-xs font-semibold text-white">
                            {isCompleted || justCompleted ? 'Guide Completed' : 'Ready to Complete?'}
                        </div>
                        <div className="text-[11px] text-[#888888] mt-0.5">
                            {isCompleted || justCompleted
                                ? 'Test your knowledge in a 20-minute assessment'
                                : 'Mark done to track progress and verify skills'}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                    <button
                        onClick={onGenerateNewClick}
                        className="inline-flex items-center gap-1.5 bg-[#121316] text-[#E4E4E7] hover:text-white border border-white/10 hover:border-white/20 text-xs font-mono px-4 py-2 rounded-sm transition-colors cursor-pointer"
                        type="button"
                    >
                        <Plus className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                        <span>New Topic</span>
                    </button>

                    <button
                        onClick={handleMarkCompleteAndRetest}
                        disabled={submitting}
                        className="inline-flex items-center gap-1.5 bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold text-xs font-mono px-5 py-2.5 rounded-sm transition-colors cursor-pointer disabled:opacity-50"
                        type="button"
                    >
                        <span>
                            {submitting
                                ? 'Saving...'
                                : isCompleted || justCompleted
                                ? 'Take Assessment'
                                : 'Mark Complete'}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                    </button>
                </div>
            </div>

            {justCompleted && (
                <div className="p-3.5 rounded-sm bg-emerald-500/10 border border-emerald-500/25 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="inline-flex items-center gap-2 text-emerald-300">
                        <Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                        <span>Progress saved! Take an assessment now to boost your verified score.</span>
                    </span>
                    <button
                        type="button"
                        onClick={() => navigate('/student/assessment')}
                        className="text-white font-semibold underline underline-offset-4 cursor-pointer"
                    >
                        Launch Assessment &rarr;
                    </button>
                </div>
            )}

            {statusError && (
                <div className="p-3 rounded-sm bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs">
                    {statusError}
                </div>
            )}
        </section>
    );
};

export default ModuleCompletionActions;
