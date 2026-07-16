/**
 * Authentication Service
 * All auth-related API calls. Reuses apiClient (with interceptors) and ENDPOINTS.
 */
import apiClient from '../../api/interceptors';
import ENDPOINTS from '../../config/endpoints';

export function login(credentials) {
  return apiClient.post(ENDPOINTS.AUTH.LOGIN, credentials);
}

export function logout() {
  return apiClient.post(ENDPOINTS.AUTH.LOGOUT);
}

export function getProfile() {
  return apiClient.get(ENDPOINTS.AUTH.PROFILE);
}

export function refreshToken() {
  return apiClient.post(ENDPOINTS.AUTH.REFRESH);
}

export function ssoRedirect() {
  return apiClient.get(ENDPOINTS.AUTH.SSO_REDIRECT);
}

export function ssoCallback(params) {
  return apiClient.get(ENDPOINTS.AUTH.SSO_CALLBACK, { params });
}
