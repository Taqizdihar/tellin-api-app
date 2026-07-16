/**
 * API Endpoint Constants
 * Only path segments — prepended by Axios baseURL automatically.
 */
const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/me',
    SSO_REDIRECT: '/auth/sso/redirect',
    SSO_CALLBACK: '/auth/sso/callback',
  },
  USERS: {
    BASE: '/users',
    DETAIL: (id) => `/users/${id}`,
  },
  SETTINGS: {
    BASE: '/settings',
    DETAIL: (id) => `/settings/${id}`,
  },
  ARTICLES: {
    BASE: '/articles',
    DETAIL: (id) => `/articles/${id}`,
  },
  FORUMS: {
    BASE: '/forums',
    DETAIL: (id) => `/forums/${id}`,
  },
  PERMISSIONS: {
    BASE: '/permissions',
  },
  ROLES: {
    BASE: '/roles',
    DETAIL: (id) => `/roles/${id}`,
  },
};

export default ENDPOINTS;
