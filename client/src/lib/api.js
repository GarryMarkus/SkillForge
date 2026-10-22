/**
 * SkillForge Centralized API Client
 * Automatically attaches JWT Bearer credentials from localStorage,
 * resolves base URLs from environment variables, and manages token refresh.
 */

const BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api').replace(/\/+$/, '');

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

    let response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: requestBody,
        ...rest,
    });

    // 401 handling - attempt refresh if refresh token is available
    if (response.status === 401 && tokens?.refresh) {
        try {
            const refreshRes = await fetch(formatUrl('/accounts/login/'), { // or refresh endpoint if configured
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refresh: tokens.refresh }),
            });

            if (refreshRes.ok) {
                const refreshed = await refreshRes.json();
                if (refreshed.access) {
                    tokens.access = refreshed.access;
                    localStorage.setItem('tokens', JSON.stringify(tokens));
                    requestHeaders.Authorization = `Bearer ${tokens.access}`;
                    response = await fetch(url, {
                        method,
                        headers: requestHeaders,
                        body: requestBody,
                        ...rest,
                    });
                }
            }
        } catch (e) {
            console.warn('Silent token refresh failed:', e);
        }
    }

    return response;
}

export const api = {
    get: (path, options) => request('GET', path, options),
    post: (path, body, options = {}) => request('POST', path, { ...options, body }),
    put: (path, body, options = {}) => request('PUT', path, { ...options, body }),
    patch: (path, body, options = {}) => request('PATCH', path, { ...options, body }),
    delete: (path, options) => request('DELETE', path, options),
    request,
};

export default api;
