import { useState, useEffect, useRef, useCallback } from 'react';
import client from '../api/client';

/**
 * Custom React hook for tracking asynchronous Celery task status.
 * Polls /api/verification/tasks/<taskId>/status/ at a designated interval
 * until the task transitions to 'SUCCESS' or 'FAILURE'.
 *
 * @param {string|null} taskId - Celery UUID task identifier to track
 * @param {Object} options - Configuration options
 * @param {number} [options.interval=1500] - Polling interval in milliseconds
 * @param {number} [options.maxRetries=40] - Maximum poll attempts before timeout (~60s)
 * @param {boolean} [options.enabled=true] - Whether polling is actively enabled
 * @param {Function} [options.onComplete] - Callback invoked when task status is 'SUCCESS'
 * @param {Function} [options.onError] - Callback invoked when task status is 'FAILURE' or timed out
 * @returns {Object} { status, result, error, isLoading, isSuccess, isError, attempts, cancel, refetch }
 */
export const useTaskStatus = (taskId, options = {}) => {
    const {
        interval = 1500,
        maxRetries = 40,
        enabled = true,
        onComplete,
        onError
    } = options;

    const [status, setStatus] = useState(() => (taskId && enabled ? 'PENDING' : 'IDLE'));
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [attempts, setAttempts] = useState(0);

    const timerRef = useRef(null);
    const attemptsRef = useRef(0);
    const isFinishedRef = useRef(false);
    const pollRef = useRef(null);

    // Callbacks stored in refs to avoid restarting polling on closure changes
    const onCompleteRef = useRef(onComplete);
    const onErrorRef = useRef(onError);
    useEffect(() => {
        onCompleteRef.current = onComplete;
        onErrorRef.current = onError;
    }, [onComplete, onError]);

    const stopPolling = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        isFinishedRef.current = true;
    }, []);

    const poll = useCallback(async () => {
        if (!taskId || isFinishedRef.current) return;

        attemptsRef.current += 1;
        setAttempts(attemptsRef.current);

        try {
            const response = await client.get(`/verification/tasks/${taskId}/status/`);
            if (response.ok) {
                const data = await response.json();
                const taskStatus = data.status || 'PENDING';
                setStatus(taskStatus);

                if (taskStatus === 'SUCCESS') {
                    setResult(data.result);
                    stopPolling();
                    if (onCompleteRef.current) {
                        onCompleteRef.current(data.result);
                    }
                    return;
                }

                if (taskStatus === 'FAILURE' || taskStatus === 'REVOKED') {
                    const errMsg = data.error || 'Asynchronous task execution failed.';
                    setError(errMsg);
                    setStatus('FAILURE');
                    stopPolling();
                    if (onErrorRef.current) {
                        onErrorRef.current(errMsg);
                    }
                    return;
                }
            } else if (response.status === 404) {
                // Task record not yet registered in Celery backend; continue polling
                setStatus('PENDING');
            } else {
                const errMsg = `Received HTTP ${response.status} querying task status.`;
                setError(errMsg);
                setStatus('FAILURE');
                stopPolling();
                if (onErrorRef.current) {
                    onErrorRef.current(errMsg);
                }
                return;
            }
        } catch (err) {
            console.warn('[useTaskStatus] Network error while polling task status:', err);
        }

        // Check if maximum retry limit reached
        if (attemptsRef.current >= maxRetries) {
            const timeoutMsg = `Task status polling timed out after ${maxRetries} attempts.`;
            setError(timeoutMsg);
            setStatus('FAILURE');
            stopPolling();
            if (onErrorRef.current) {
                onErrorRef.current(timeoutMsg);
            }
            return;
        }

        // Schedule next poll iteration using pollRef
        if (!isFinishedRef.current) {
            timerRef.current = setTimeout(() => {
                if (pollRef.current) {
                    pollRef.current();
                }
            }, interval);
        }
    }, [taskId, maxRetries, interval, stopPolling]);

    // Keep pollRef updated
    useEffect(() => {
        pollRef.current = poll;
    }, [poll]);

    // Initialize or restart polling when taskId or enabled condition changes
    useEffect(() => {
        if (taskId && enabled) {
            isFinishedRef.current = false;
            attemptsRef.current = 0;

            // Trigger poll asynchronously
            timerRef.current = setTimeout(() => {
                poll();
            }, 0);
        } else {
            stopPolling();
        }

        return () => {
            stopPolling();
        };
    }, [taskId, enabled, poll, stopPolling]);

    const refetch = useCallback(() => {
        stopPolling();
        isFinishedRef.current = false;
        attemptsRef.current = 0;
        setAttempts(0);
        setStatus('PENDING');
        setResult(null);
        setError(null);
        poll();
    }, [poll, stopPolling]);

    return {
        status,
        result,
        error,
        isLoading: status === 'PENDING' || status === 'STARTED',
        isSuccess: status === 'SUCCESS',
        isError: status === 'FAILURE',
        attempts,
        cancel: stopPolling,
        refetch
    };
};

export default useTaskStatus;
