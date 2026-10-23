/**
 * SkillForge Centralized API Client
 * Automatically attaches JWT Bearer credentials from localStorage,
 * resolves base URLs from environment variables, manages token refresh,
 * handles global session eviction on unauthorized (401) responses,
 * and recovers gracefully from network disconnects and offline states.
 */

const BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api').replace(/\/+$/, '');

class NetworkErrorResponse {
    constructor(message = 'Unable to connect to the SkillForge server. Please check your internet connection.') {
        this.ok = false;
        this.status = 0;
        this.statusText = 'Network Error';
        this._message = message;
    }

    async json() {
        return { error: this._message };
    }

    async text() {
        return this._message;
    }
}

function formatUrl(path) {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${BASE_URL}${cleanPath}`;
}

function getStoredTokens() {
    try {
        const raw = localStorage.getItem('tokens');
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function evictSession() {
    try {
        localStorage.removeItem('tokens');
        localStorage.removeItem('user');
    } catch {
        // ignore
    }

    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('skillforge:unauthorized'));
        if (window.location.pathname !== '/auth' && window.location.pathname !== '/login') {
            window.location.href = '/auth';
        }
    }
}

async function request(method, path, options = {}) {
    const { body, headers = {}, isFormData = false, ...rest } = options;
    const url = formatUrl(path);
    const tokens = getStoredTokens();

    const requestHeaders = {
        ...(tokens?.access ? { Authorization: `Bearer ${tokens.access}` } : {}),
        ...headers,
    };

    const isBodyFormData = isFormData || (typeof FormData !== 'undefined' && body instanceof FormData);

    if (!isBodyFormData && !requestHeaders['Content-Type'] && method !== 'GET') {
        requestHeaders['Content-Type'] = 'application/json';
    }

    let requestBody;
    if (body !== undefined && body !== null) {
        requestBody = isBodyFormData ? body : (typeof body === 'string' ? body : JSON.stringify(body));
    }

    let response;
    try {
        response = await fetch(url, {
            method,
            headers: requestHeaders,
            body: requestBody,
            ...rest,
        });
    } catch (networkErr) {
        console.warn(`[API] Network failure while fetching ${url}:`, networkErr);
        const msg = typeof navigator !== 'undefined' && navigator.onLine === false
            ? 'You appear to be offline. Please verify your internet connection.'
            : 'Unable to connect to the SkillForge server. Please check your internet connection or try again.';
        return new NetworkErrorResponse(msg);
    }

    // 401 handling - attempt silent token refresh if refresh token is available
    if (response.status === 401 && tokens?.refresh) {
        try {
            const refreshRes = await fetch(formatUrl('/accounts/token/refresh/'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refresh: tokens.refresh }),
            });

            if (refreshRes.ok) {
                const refreshed = await refreshRes.json();
                if (refreshed.access) {
                    tokens.access = refreshed.access;
                    if (refreshed.refresh) {
                        tokens.refresh = refreshed.refresh;
                    }
                    localStorage.setItem('tokens', JSON.stringify(tokens));

                    // Synchronize in-memory authStore state
                    try {
                        const { useAuthStore } = await import('../store/authStore');
                        if (useAuthStore?.getState()?.updateTokens) {
                            useAuthStore.getState().updateTokens(tokens);
                        }
                    } catch (storeErr) {
                        console.warn('[API] Could not sync authStore on token refresh:', storeErr);
                    }

                    requestHeaders.Authorization = `Bearer ${tokens.access}`;
                    try {
                        response = await fetch(url, {
                            method,
                            headers: requestHeaders,
                            body: requestBody,
                            ...rest,
                        });
                    } catch {
                        return new NetworkErrorResponse('Unable to connect to the server. Please check your internet connection.');
                    }
                }
            } else {
                // Refresh token invalid or expired
                evictSession();
            }
        } catch (e) {
            console.warn('[API] Silent token refresh failed:', e);
            evictSession();
        }
    } else if (response.status === 401 && !path.includes('/accounts/login/')) {
        // Unauthenticated and not a login attempt
        evictSession();
    }

    return response;
}

export const api = {
    get: (path, options) => request('GET', path, options),
    post: (path, body, options = {}) => request('POST', path, { ...options, body }),
    put: (path, body, options = {}) => request('PUT', path, { ...options, body }),
    patch: (path, body, options = {}) => request('PATCH', path, { ...options, body }),
    delete: (path, options) => request('DELETE', path, options),
    evictSession,
    request,
};

export default api;
