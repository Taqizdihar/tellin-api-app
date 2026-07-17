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
  if (!navigator.onLine) return 'You are offline. Please check your internet connection.';
  
  if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
    return 'Request timed out. The server took too long to respond.';
  }

  if (error.message === 'Network Error') {
    return 'Network Error: Connection refused or server is unreachable.';
  }

  if (error.response) {
    const status = error.response.status;
    const serverMessage = error.response.data?.message;

    switch (status) {
      case 401: return serverMessage || 'Unauthorized. Please log in again.';
      case 403: return serverMessage || 'Forbidden. You do not have permission to perform this action.';
      case 404: return serverMessage || 'Not Found. The requested resource does not exist.';
      case 422: return serverMessage || 'Unprocessable Entity. Please check the submitted data.';
      case 429: return serverMessage || 'Too Many Requests. Please slow down and try again later.';
      case 500: return serverMessage || 'Internal Server Error. Please try again later.';
      case 502: return 'Bad Gateway. The server received an invalid response.';
      case 503: return 'Service Unavailable. The server is temporarily down for maintenance.';
      case 504: return 'Gateway Timeout. The server is taking too long to respond.';
      default: return serverMessage || `Error ${status}: An unexpected error occurred.`;
    }
  }

  return error.message || 'An unexpected error occurred';
}

/**
 * Checks if an HTTP status code indicates success.
 */
export function isSuccessStatus(status) {
  return status >= 200 && status < 300;
}
