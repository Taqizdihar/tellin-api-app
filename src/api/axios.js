import axios from 'axios';
import apiConfig from '../config/api';
import { REQUEST } from '../config/constants';

/**
 * Reusable Axios instance.
 * Interceptors are registered in src/api/interceptors.js
 */
const apiClient = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: REQUEST.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default apiClient;
