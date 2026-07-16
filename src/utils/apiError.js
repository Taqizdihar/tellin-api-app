/**
 * Converts an Axios error into a developer-friendly object.
 */
export function createApiError(error) {
  if (error.response) {
    return {
      status: error.response.status,
      message: error.response.data?.message || error.message,
      details: error.response.data?.errors || null,
      timestamp: new Date().toISOString(),
    };
  }

  if (error.request) {
    return {
      status: 0,
      message: 'No response received from server',
      details: null,
      timestamp: new Date().toISOString(),
    };
  }

  return {
    status: -1,
    message: error.message || 'Unknown error',
    details: null,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Extracts a human-readable message from an Axios error.
 */
export function extractErrorMessage(error) {
  if (error.response?.data?.message) return error.response.data.message;
  if (error.message) return error.message;
  return 'An unexpected error occurred';
}

/**
 * Checks if an HTTP status code indicates success.
 */
export function isSuccessStatus(status) {
  return status >= 200 && status < 300;
}
