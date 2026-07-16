/**
 * API Configuration
 * Reads environment variables exposed by Vite.
 */
const apiConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api',
};

export default apiConfig;
