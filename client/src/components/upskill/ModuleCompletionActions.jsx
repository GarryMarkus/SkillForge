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
                // Prompt user to launch verification re-test
                const launchRetest = window.confirm(
                    '[CURRICULUM_COMPLETED] Module marked as finished!\n\nDo you want to proceed to the Proctored Hardware Assessment Console to re-test and update your telemetry score?'
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
            className="w-full bg-surface-container-low px-margin py-space-md border border-black/20 flex flex-wrap items-center justify-between gap-space-md font-mono select-none"
            id="ModuleCompletionActions"
        >
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-label-md font-label-md">
                    <span className="text-primary-container font-bold">+ DISPATCH_STATUS:</span>
                    <span className={`px-space-xs py-0.5 border font-bold uppercase text-label-sm font-label-sm ${
                        isCompleted
                            ? 'bg-primary-fixed/40 border-primary-container text-primary-container'
                            : 'bg-surface border-black/15 text-secondary'
                    }`}>
                        {isCompleted ? 'CURRICULUM_COMPLETED' : 'AWAITING_STUDENT_SIGN-OFF'}
                    </span>
                </div>
                <div className="text-label-sm font-label-sm text-secondary">
                    UPON_COMPLETION: VALIDATES SKILL DEFICIT RESOLUTION &amp; ENABLES ASSESSMENT RE-TEST
                </div>
            </div>

            <div className="flex items-center gap-space-sm flex-wrap">
                <button
                    onClick={onGenerateNewClick}
                    className="bg-surface-container-lowest text-on-surface font-label-md text-label-md px-space-md py-space-xs border border-black/20 hover:bg-surface-container hover:border-black/40 uppercase transition-none cursor-pointer flex items-center gap-1 font-bold"
                    type="button"
                >
                    <span>[ + GENERATE_NEW_CURRICULUM ]</span>
                </button>

                <button
                    onClick={handleMarkCompleteAndRetest}
                    disabled={submitting}
                    className="bg-primary-container text-on-primary font-label-md text-label-md px-space-md py-space-xs border border-primary-container hover:bg-primary uppercase transition-none cursor-pointer flex items-center gap-2 font-bold shadow-[2px_2px_0px_#191C1D] disabled:opacity-50"
                    type="button"
                >
                    <span>
                        {submitting
                            ? '[ RECORDING_PROGRESS... ]'
                            : isCompleted
                            ? '[ RE-TEST_ASSESSMENT_CONSOLE -> ]'
                            : '[ MARK_MODULE_COMPLETED_&_RE-TEST -> ]'}
                    </span>
                </button>
            </div>
        </section>
    );
};

export default ModuleCompletionActions;
