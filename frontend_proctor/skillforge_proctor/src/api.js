/**
 * SkillForge Proctor - API Service
 * 
 * Centralized API configuration and service functions for the proctoring application.
 * Handles authentication, exam management, and event tracking with proper error handling.
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const API_CONFIG = {
  // Base URL - can be overridden by environment variable
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api',
  
  // API Endpoints
  ENDPOINTS: {
    // Authentication
    LOGIN: '/auth/login/',
    LOGOUT: '/auth/logout/',
    REFRESH: '/auth/refresh/',
    
    // Exam Management
    EXAM_LIST: '/list/',
    EXAM_DETAIL: '/exam/:id/',
    EXAM_START: '/start/',
    EXAM_SUBMIT: '/submit/',
    
    // Proctoring Events
    EVENT_CREATE: '/event/',
    EVENT_LIST: '/events/:sessionId/',
    
    // Session Management
    SESSION_STATUS: '/session/:id/status/',
    SESSION_END: '/session/:id/end/',
  },
  
  // Request timeout (in milliseconds)
  TIMEOUT: 30000,
  
  // Retry configuration
  RETRY: {
    maxAttempts: 3,
    delay: 1000, // Initial delay in ms
    backoffMultiplier: 2 // Exponential backoff
  }
};

// ============================================================================
// TOKEN MANAGEMENT
// ============================================================================

class TokenManager {
  constructor() {
    this.accessToken = null;
    this.refreshToken = null;
  }

  setTokens(access, refresh = null) {
    this.accessToken = access;
    if (refresh) {
      this.refreshToken = refresh;
      // Store refresh token in localStorage for persistence
      localStorage.setItem('skillforge_refresh_token', refresh);
    }
  }

  getAccessToken() {
    return this.accessToken;
  }

  getRefreshToken() {
    return this.refreshToken || localStorage.getItem('skillforge_refresh_token');
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('skillforge_refresh_token');
  }

  hasValidToken() {
    return !!this.accessToken;
  }
}

const tokenManager = new TokenManager();

// ============================================================================
// HTTP CLIENT
// ============================================================================

class HTTPClient {
  constructor(config) {
    this.baseURL = config.BASE_URL;
    this.timeout = config.TIMEOUT;
    this.retryConfig = config.RETRY;
  }

  /**
   * Build full URL from endpoint
   */
  buildURL(endpoint, params = {}) {
    let url = `${this.baseURL}${endpoint}`;
    
    // Replace path parameters (e.g., :id)
    Object.keys(params).forEach(key => {
      url = url.replace(`:${key}`, params[key]);
    });
    
    return url;
  }

  /**
   * Get default headers
   */
  getHeaders(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (includeAuth && tokenManager.hasValidToken()) {
      headers['Authorization'] = `Bearer ${tokenManager.getAccessToken()}`;
    }

    return headers;
  }

  /**
   * Handle response
   */
  async handleResponse(response) {
    // Check if response is ok
    if (!response.ok) {
      const error = await this.parseError(response);
      throw error;
    }

    // Parse JSON response
    try {
      const data = await response.json();
      return data;
    } catch (e) {
      // If response is not JSON, return text
      const text = await response.text();
      return { data: text };
    }
  }

  /**
   * Parse error response
   */
  async parseError(response) {
    let errorMessage = 'An error occurred';
    let errorDetails = null;

    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.detail || errorMessage;
      errorDetails = errorData;
    } catch (e) {
      errorMessage = response.statusText || errorMessage;
    }

    const error = new Error(errorMessage);
    error.status = response.status;
    error.details = errorDetails;
    
    return error;
  }

  /**
   * Retry logic with exponential backoff
   */
  async withRetry(fn, attempt = 1) {
    try {
      return await fn();
    } catch (error) {
      // Don't retry on client errors (4xx) or if max attempts reached
      if (
        error.status >= 400 && error.status < 500 ||
        attempt >= this.retryConfig.maxAttempts
      ) {
        throw error;
      }

      // Calculate delay with exponential backoff
      const delay = this.retryConfig.delay * Math.pow(this.retryConfig.backoffMultiplier, attempt - 1);
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Retry
      return this.withRetry(fn, attempt + 1);
    }
  }

  /**
   * Make HTTP request with timeout
   */
  async request(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      return await this.handleResponse(response);
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      
      throw error;
    }
  }

  /**
   * GET request
   */
  async get(endpoint, params = {}, options = {}) {
    const url = this.buildURL(endpoint, params);
    
    return this.withRetry(() => 
      this.request(url, {
        method: 'GET',
        headers: this.getHeaders(options.includeAuth !== false),
        ...options
      })
    );
  }

  /**
   * POST request
   */
  async post(endpoint, data = {}, params = {}, options = {}) {
    const url = this.buildURL(endpoint, params);
    
    return this.withRetry(() => 
      this.request(url, {
        method: 'POST',
        headers: this.getHeaders(options.includeAuth !== false),
        body: JSON.stringify(data),
        ...options
      })
    );
  }

  /**
   * PUT request
   */
  async put(endpoint, data = {}, params = {}, options = {}) {
    const url = this.buildURL(endpoint, params);
    
    return this.withRetry(() => 
      this.request(url, {
        method: 'PUT',
        headers: this.getHeaders(options.includeAuth !== false),
        body: JSON.stringify(data),
        ...options
      })
    );
  }

  /**
   * DELETE request
   */
  async delete(endpoint, params = {}, options = {}) {
    const url = this.buildURL(endpoint, params);
    
    return this.withRetry(() => 
      this.request(url, {
        method: 'DELETE',
        headers: this.getHeaders(options.includeAuth !== false),
        ...options
      })
    );
  }

  /**
   * PATCH request
   */
  async patch(endpoint, data = {}, params = {}, options = {}) {
    const url = this.buildURL(endpoint, params);
    
    return this.withRetry(() => 
      this.request(url, {
        method: 'PATCH',
        headers: this.getHeaders(options.includeAuth !== false),
        body: JSON.stringify(data),
        ...options
      })
    );
  }
}

const httpClient = new HTTPClient(API_CONFIG);

// ============================================================================
// API SERVICE - AUTHENTICATION
// ============================================================================

export const AuthAPI = {
  /**
   * Login user
   * @param {string} username - User's username
   * @param {string} password - User's password
   * @returns {Promise<{success: boolean, data?: object, error?: string}>}
   */
  async login(username, password) {
    try {
      const response = await httpClient.post(
        API_CONFIG.ENDPOINTS.LOGIN,
        { username, password },
        {},
        { includeAuth: false }
      );

      // Extract tokens (support multiple response formats)
      const accessToken = response.access || response.tokens?.access || response.accessToken;
      const refreshToken = response.refresh || response.tokens?.refresh || response.refreshToken;

      if (!accessToken) {
        throw new Error('No access token received');
      }

      // Store tokens
      tokenManager.setTokens(accessToken, refreshToken);

      return {
        success: true,
        data: {
          token: accessToken,
          user: response.user || null
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Login failed'
      };
    }
  },

  /**
   * Logout user
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  async logout() {
    try {
      await httpClient.post(API_CONFIG.ENDPOINTS.LOGOUT);
      tokenManager.clearTokens();
      
      return { success: true };
    } catch (error) {
      // Clear tokens even if request fails
      tokenManager.clearTokens();
      
      return {
        success: false,
        error: error.message || 'Logout failed'
      };
    }
  },

  /**
   * Refresh access token
   * @returns {Promise<{success: boolean, data?: object, error?: string}>}
   */
  async refreshToken() {
    try {
      const refreshToken = tokenManager.getRefreshToken();
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await httpClient.post(
        API_CONFIG.ENDPOINTS.REFRESH,
        { refresh: refreshToken },
        {},
        { includeAuth: false }
      );

      const newAccessToken = response.access || response.accessToken;

      if (!newAccessToken) {
        throw new Error('No access token received');
      }

      tokenManager.setTokens(newAccessToken);

      return {
        success: true,
        data: { token: newAccessToken }
      };
    } catch (error) {
      tokenManager.clearTokens();
      
      return {
        success: false,
        error: error.message || 'Token refresh failed'
      };
    }
  },

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    return tokenManager.hasValidToken();
  },

  /**
   * Get current access token
   * @returns {string|null}
   */
  getToken() {
    return tokenManager.getAccessToken();
  }
};

// ============================================================================
// API SERVICE - EXAM MANAGEMENT
// ============================================================================

export const ExamAPI = {
  /**
   * Get list of available exams
   * @returns {Promise<{success: boolean, data?: array, error?: string}>}
   */
  async getExamList() {
    try {
      const response = await httpClient.get(API_CONFIG.ENDPOINTS.EXAM_LIST);
      
      // Ensure response is an array
      const exams = Array.isArray(response) ? response : response.exams || [];

      return {
        success: true,
        data: exams
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to fetch exams'
      };
    }
  },

  /**
   * Get exam details
   * @param {string|number} examId - Exam ID
   * @returns {Promise<{success: boolean, data?: object, error?: string}>}
   */
  async getExamDetail(examId) {
    try {
      const response = await httpClient.get(
        API_CONFIG.ENDPOINTS.EXAM_DETAIL,
        { id: examId }
      );

      return {
        success: true,
        data: response
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to fetch exam details'
      };
    }
  },

  /**
   * Start an exam
   * @param {string|number} examId - Exam ID
   * @returns {Promise<{success: boolean, data?: object, error?: string}>}
   */
  async startExam(examId) {
    try {
      const response = await httpClient.post(
        API_CONFIG.ENDPOINTS.EXAM_START,
        { exam_id: examId }
      );

      const sessionId = response.session_id || response.sessionId || response.id;

      if (!sessionId) {
        throw new Error('No session ID received');
      }

      return {
        success: true,
        data: {
          sessionId: sessionId,
          exam: response.exam || null,
          startTime: response.start_time || new Date().toISOString()
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to start exam'
      };
    }
  },

  /**
   * Submit exam
   * @param {string} sessionId - Session ID
   * @param {object} answers - Exam answers
   * @returns {Promise<{success: boolean, data?: object, error?: string}>}
   */
  async submitExam(sessionId, answers = {}) {
    try {
      const response = await httpClient.post(
        API_CONFIG.ENDPOINTS.EXAM_SUBMIT,
        {
          session_id: sessionId,
          answers: answers
        }
      );

      return {
        success: true,
        data: response
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to submit exam'
      };
    }
  }
};

// ============================================================================
// API SERVICE - PROCTORING EVENTS
// ============================================================================

export const ProctorAPI = {
  /**
   * Send proctoring event
   * @param {string} sessionId - Session ID
   * @param {string} eventType - Event type (e.g., 'TAB_SWITCH', 'NO_FACE')
   * @param {number} confidence - Confidence level (0-1)
   * @param {object} metadata - Additional event metadata
   * @returns {Promise<{success: boolean, data?: object, error?: string}>}
   */
  async sendEvent(sessionId, eventType, confidence = 1.0, metadata = {}) {
    try {
      const response = await httpClient.post(
        API_CONFIG.ENDPOINTS.EVENT_CREATE,
        {
          session_id: sessionId,
          event_type: eventType,
          confidence: confidence,
          timestamp: new Date().toISOString(),
          metadata: metadata
        }
      );

      return {
        success: true,
        data: {
          risk: response.risk || 0,
          eventId: response.id || response.event_id || null,
          message: response.message || null
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to send event'
      };
    }
  },

  /**
   * Get event history for a session
   * @param {string} sessionId - Session ID
   * @returns {Promise<{success: boolean, data?: array, error?: string}>}
   */
  async getEventHistory(sessionId) {
    try {
      const response = await httpClient.get(
        API_CONFIG.ENDPOINTS.EVENT_LIST,
        { sessionId }
      );

      const events = Array.isArray(response) ? response : response.events || [];

      return {
        success: true,
        data: events
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to fetch event history'
      };
    }
  },

  /**
   * Batch send multiple events
   * @param {string} sessionId - Session ID
   * @param {array} events - Array of events to send
   * @returns {Promise<{success: boolean, data?: object, error?: string}>}
   */
  async sendBatchEvents(sessionId, events) {
    try {
      // Send events in parallel
      const promises = events.map(event =>
        this.sendEvent(sessionId, event.type, event.confidence, event.metadata)
      );

      const results = await Promise.allSettled(promises);

      const successful = results.filter(r => r.status === 'fulfilled' && r.value.success);
      const failed = results.filter(r => r.status === 'rejected' || !r.value.success);

      return {
        success: failed.length === 0,
        data: {
          total: events.length,
          successful: successful.length,
          failed: failed.length,
          results: results
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to send batch events'
      };
    }
  }
};

// ============================================================================
// API SERVICE - SESSION MANAGEMENT
// ============================================================================

export const SessionAPI = {
  /**
   * Get session status
   * @param {string} sessionId - Session ID
   * @returns {Promise<{success: boolean, data?: object, error?: string}>}
   */
  async getStatus(sessionId) {
    try {
      const response = await httpClient.get(
        API_CONFIG.ENDPOINTS.SESSION_STATUS,
        { id: sessionId }
      );

      return {
        success: true,
        data: response
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to fetch session status'
      };
    }
  },

  /**
   * End session
   * @param {string} sessionId - Session ID
   * @returns {Promise<{success: boolean, data?: object, error?: string}>}
   */
  async endSession(sessionId) {
    try {
      const response = await httpClient.post(
        API_CONFIG.ENDPOINTS.SESSION_END,
        {},
        { id: sessionId }
      );

      return {
        success: true,
        data: response
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to end session'
      };
    }
  }
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Check API health
 * @returns {Promise<boolean>}
 */
export async function checkAPIHealth() {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    return response.ok;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
}

/**
 * Configure API base URL
 * @param {string} url - New base URL
 */
export function configureAPI(url) {
  API_CONFIG.BASE_URL = url;
}

/**
 * Get current API configuration
 * @returns {object}
 */
export function getAPIConfig() {
  return { ...API_CONFIG };
}

// ============================================================================
// ERROR HANDLER UTILITY
// ============================================================================

export class APIError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.details = details;
  }

  isClientError() {
    return this.status >= 400 && this.status < 500;
  }

  isServerError() {
    return this.status >= 500;
  }

  isAuthError() {
    return this.status === 401 || this.status === 403;
  }

  isNotFound() {
    return this.status === 404;
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  Auth: AuthAPI,
  Exam: ExamAPI,
  Proctor: ProctorAPI,
  Session: SessionAPI,
  checkHealth: checkAPIHealth,
  configure: configureAPI,
  getConfig: getAPIConfig
};

// Export HTTP client for advanced use cases
export { httpClient, tokenManager };
