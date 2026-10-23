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
                    'Great job! Module marked as finished.\n\nWould you like to take a technical assessment to test your understanding?'
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
            alert('A network error occurred while updating your progress.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section
            className="w-full bg-white p-6 rounded-2xl border border-gray-200 flex flex-wrap items-center justify-between gap-4 font-sans select-none shadow-sm"
            id="ModuleCompletionActions"
        >
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-gray-500">Status:</span>
                    <span className={`px-2.5 py-0.5 rounded-full font-semibold text-xs ${
                        isCompleted
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                        {isCompleted ? 'Completed' : 'In Progress'}
                    </span>
                </div>
                <div className="text-xs text-gray-500">
                    Completing this module unlocks assessment verification for this skill
                </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
                <button
                    onClick={onGenerateNewClick}
                    className="bg-gray-100 text-gray-700 text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer flex items-center gap-1.5"
                    type="button"
                >
                    <span>+ New Topic</span>
                </button>

                <button
                    onClick={handleMarkCompleteAndRetest}
                    disabled={submitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors shadow-sm cursor-pointer flex items-center gap-2 disabled:opacity-50"
                    type="button"
                >
                    <span>
                        {submitting
                            ? 'Saving...'
                            : isCompleted
                            ? 'Take Assessment Now →'
                            : 'Mark Complete & Take Quiz →'}
                    </span>
                </button>
            </div>
        </section>
    );
};

export default ModuleCompletionActions;
