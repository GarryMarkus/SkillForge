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
                    '[CURRICULUM COMPLETED] Module marked as finished!\n\nDo you want to proceed to the Proctored Hardware Assessment Console to re-test and update your telemetry score?'
                );
                if (launchRetest) {
                    navigate('/student/assessment');
                }
            } else {
                const err = await res.json().catch(() => ({}));
                alert(`[ERROR] ${err.error || 'Failed to update module progress.'}`);
            }
        } catch (e) {
            console.error('Error completing module', e);
            alert('[ERROR] Network error while recording module progress.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section
            className="w-full bg-surface-container-low px-4 sm:px-6 py-4 border border-black/20 flex flex-wrap items-center justify-between gap-4 font-mono select-none"
            id="ModuleCompletionActions"
        >
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-xs font-bold">
                    <span className="text-canvas-blueprint font-bold">+ DISPATCH STATUS:</span>
                    <span className={`px-2 py-0.5 border font-bold uppercase text-[11px] ${
                        isCompleted
                            ? 'bg-blue-50 border-canvas-blueprint text-canvas-blueprint'
                            : 'bg-surface border-black/15 text-outline'
                    }`}>
                        {isCompleted ? 'CURRICULUM COMPLETED' : 'IN PROGRESS // PENDING COMPLETION'}
                    </span>
                </div>
                <div className="text-xs text-on-surface-variant font-mono">
                    COMPLETION RESOLVES SKILL GAP AND UNLOCKS HARDWARE ASSESSMENT RE-TEST
                </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
                <button
                    onClick={onGenerateNewClick}
                    className="bg-surface-container-lowest text-ink-primary text-xs sm:text-sm font-bold px-5 py-3.5 border border-black/25 hover:bg-surface-container hover:border-black/40 uppercase transition-none cursor-pointer flex items-center gap-1.5"
                    type="button"
                >
                    <span>[ + GENERATE NEW CURRICULUM ]</span>
                </button>

                <button
                    onClick={handleMarkCompleteAndRetest}
                    disabled={submitting}
                    className="bg-canvas-blueprint text-white text-xs sm:text-sm font-bold px-6 py-3.5 border border-canvas-blueprint hover:bg-primary-hover uppercase transition-none cursor-pointer flex items-center gap-2 shadow-[3px_3px_0px_#0A0A0A] disabled:opacity-50"
                    type="button"
                >
                    <span>
                        {submitting
                            ? '[ RECORDING PROGRESS... ]'
                            : isCompleted
                            ? '[ RE-TEST ASSESSMENT CONSOLE → ]'
                            : '[ MARK COMPLETED & RE-TEST → ]'}
                    </span>
                </button>
            </div>
        </section>
    );
};

export default ModuleCompletionActions;
