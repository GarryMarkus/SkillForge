import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../../api/client';

const ModuleCompletionActions = ({
    moduleId,
    isCompleted = false,
    onProgressUpdated,
    onGenerateNewClick
}) => {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);

    const handleMarkCompleteAndRetest = async () => {
        if (!moduleId) return;
        setSubmitting(true);
        try {
            const res = await client.post('/modules/upskill/progress/', { module_id: moduleId });
            if (res.ok) {
                if (onProgressUpdated) {
                    onProgressUpdated();
                }
                const launchRetest = window.confirm(
                    'Module marked as completed.\n\nProceed to technical evaluation to verify understanding?'
                );
                if (launchRetest) {
                    navigate('/student/assessment');
                }
            } else {
                const err = await res.json().catch(() => ({}));
                alert(`Error: ${err.error || 'Failed to update module progress.'}`);
            }
        } catch (e) {
            console.error('Error completing module', e);
            alert('A network error occurred while updating progress.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section
            className="w-full bg-[#111318] p-5 sm:p-6 rounded-md border border-white/[0.08] border-t-white/15 flex flex-wrap items-center justify-between gap-4 font-mono select-none"
            id="ModuleCompletionActions"
        >
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-xs">
                    <span className="text-[#71717A]">Status:</span>
                    <span className="px-2 py-0.5 rounded-sm font-mono text-xs bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
                        {isCompleted ? 'Completed' : 'In Progress'}
                    </span>
                </div>
                <div className="text-xs text-[#888888]">
                    Completion unlocks empirical assessment verification for this topic
                </div>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
                <button
                    onClick={onGenerateNewClick}
                    className="bg-[#121316] text-[#E4E4E7] hover:text-white border border-white/10 hover:border-white/20 text-xs font-mono px-4 py-2 rounded-sm transition-colors cursor-pointer"
                    type="button"
                >
                    <span>+ New Topic</span>
                </button>

                <button
                    onClick={handleMarkCompleteAndRetest}
                    disabled={submitting}
                    className="bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold text-xs font-mono px-5 py-2.5 rounded-sm transition-colors cursor-pointer disabled:opacity-50"
                    type="button"
                >
                    <span>
                        {submitting
                            ? 'Saving...'
                            : isCompleted
                            ? 'Take Assessment ↗'
                            : 'Mark Complete & Test ↗'}
                    </span>
                </button>
            </div>
        </section>
    );
};

export default ModuleCompletionActions;
