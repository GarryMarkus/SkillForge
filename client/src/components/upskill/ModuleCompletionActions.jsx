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
            className="w-full bg-[#0b0b0c] p-5 sm:p-6 rounded-md border border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono select-none"
            id="ModuleCompletionActions"
        >
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-xs">
                    <span className="text-[#555555]">Status:</span>
                    <span className="px-2 py-0.5 rounded-sm font-mono text-xs bg-[#050505] text-[#888888] border border-white/10">
                        {isCompleted ? '[completed]' : '[in progress]'}
                    </span>
                </div>
                <div className="text-xs text-[#737373]">
                    Completion unlocks empirical assessment verification for this topic
                </div>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
                <button
                    onClick={onGenerateNewClick}
                    className="bg-[#050505] hover:bg-[#111113] text-[#888888] hover:text-white border border-white/10 text-xs font-mono px-4 py-2 rounded-md transition-colors cursor-pointer"
                    type="button"
                >
                    <span>[+ New Topic]</span>
                </button>

                <button
                    onClick={handleMarkCompleteAndRetest}
                    disabled={submitting}
                    className="bg-[#111113] hover:bg-[#1a1a1d] text-white border border-white/20 text-xs font-mono px-5 py-2 rounded-md transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                    type="button"
                >
                    <span>
                        {submitting
                            ? 'Saving...'
                            : isCompleted
                            ? '[ Take Assessment ↗ ]'
                            : '[ Mark Complete & Test ↗ ]'}
                    </span>
                </button>
            </div>
        </section>
    );
};

export default ModuleCompletionActions;
