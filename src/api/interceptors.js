import { getAccessToken } from '../utils/tokenStorage';
import { logInfo, logWarning, logError } from '../utils/logger';
import apiClient from './axios';

/**
 * Axios Interceptors
 * Attach token to requests, log response errors.
 */

// ── Request Interceptor ──────────────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    logInfo(`→ ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    logError('Request interceptor error', error);
    return Promise.reject(error);
  }
);

// ── Response Interceptor ─────────────────────────────────
apiClient.interceptors.response.use(
  (response) => {
    logInfo(`← ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      logWarning('401 Unauthorized — token may be expired or invalid.');
      // ponytail: redirect to login or trigger token refresh when auth is implemented
    }

    if (status === 403) {
      logWarning('403 Forbidden — insufficient permissions.');
    }

    if (status === 500) {
      logError('500 Internal Server Error — backend issue.', error.response?.data);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
