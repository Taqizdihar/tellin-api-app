/**
 * Common API helper utilities.
 */

/**
 * Builds a query string from an object, filtering out null/undefined values.
 * Example: { page: 1, search: 'test' } → '?page=1&search=test'
 */
export function buildQueryParams(params = {}) {
  const filtered = Object.entries(params).filter(
    ([, value]) => value !== null && value !== undefined && value !== ''
  );
  if (filtered.length === 0) return '';
  return '?' + new URLSearchParams(filtered).toString();
}

/**
 * Wraps an API call and normalizes the response.
 * Returns { data, status, success } on success.
 * Returns { error, status, success } on failure.
 */
export async function formatApiResponse(apiCall) {
  try {
    const response = await apiCall;
    return {
      data: response.data,
      status: response.status,
      success: true,
    };
  } catch (error) {
    return {
      error: error.response?.data || { message: error.message },
      status: error.response?.status || 0,
      success: false,
    };
  }
}
