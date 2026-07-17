import apiClient from '../../config/api';

export const verificationService = {
  async testEndpoint(method, path) {
    const startTime = performance.now();
    try {
      const response = await apiClient({
        method: method || 'GET',
        url: path,
      });
      const endTime = performance.now();
      return {
        status: response.status,
        statusText: response.statusText,
        executionTime: Math.round(endTime - startTime),
      };
    } catch (error) {
      const endTime = performance.now();
      return {
        status: error.response?.status || 500,
        statusText: error.response?.statusText || error.message,
        executionTime: Math.round(endTime - startTime),
      };
    }
  }
};
