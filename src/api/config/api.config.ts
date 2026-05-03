import axios from 'axios';
import { AuthorizationService } from '../services/AuthorizationService.ts';

export const api = axios.create({
  baseURL: '/api/v1/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  },
});

export const apiFiles = axios.create({
  baseURL: import.meta.env.VITE_GATEWAY_ADDR,
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  },
});

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_GATEWAY_ADDR,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('auth/refresh')
    ) {
      originalRequest._retry = true;
      try {
        const response = await AuthorizationService.refresh();

        localStorage.setItem('access_token', response.access_token);

        originalRequest.headers.Authorization = `Bearer ${response.access_token}`;

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
