/**
 * Explorer Service
 * Routes API Explorer requests through the existing Axios infrastructure.
 * Uses apiClient (with interceptors) for all requests.
 * This is the ONLY place the API Explorer touches Axios.
 */
import apiClient from '../../api/interceptors';

/**
 * Execute an arbitrary API request through the service layer.
 * @param {object} options
 * @param {string} options.method  - HTTP method (GET, POST, PUT, DELETE, PATCH)
 * @param {string} options.path    - Relative URL path
 * @param {object} [options.body]  - Request body (for POST/PUT/PATCH)
 * @param {object} [options.params]- Query parameters
 * @param {object} [options.headers]- Additional headers
 * @returns {Promise<{ data, status, headers, duration }>}
 */
export async function executeRequest({ method, path, body = null, params = {}, headers = {} }) {
  const start = performance.now();

  const config = {
    method: method.toLowerCase(),
    url: path,
    params,
    headers,
  };

  if (['post', 'put', 'patch'].includes(config.method) && body !== null) {
    config.data = body;
  }

  const response = await apiClient.request(config);
  const duration = Math.round(performance.now() - start);

  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    duration,
    size: JSON.stringify(response.data).length,
  };
}
