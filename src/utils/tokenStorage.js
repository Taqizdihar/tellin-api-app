import { STORAGE_KEYS } from '../config/constants';

/**
 * Token Storage Utilities
 * Wraps localStorage for auth token management.
 */

export function saveAccessToken(token) {
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
}

export function getAccessToken() {
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
}

export function removeAccessToken() {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
}

export function saveRefreshToken(token) {
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
}

export function getRefreshToken() {
  return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
}

export function removeRefreshToken() {
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
}

export function clearSession() {
  removeAccessToken();
  removeRefreshToken();
  localStorage.removeItem(STORAGE_KEYS.USER);
}
