import axios, { type InternalAxiosRequestConfig } from 'axios';
import { AuthorizationService } from '../services/AuthorizationService.ts';

export const api = axios.create({
  baseURL: import.meta.env.VITE_GATEWAY_ADDR,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const apiFiles = axios.create({
  baseURL: import.meta.env.VITE_GATEWAY_ADDR,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_GATEWAY_ADDR,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

export const logoutApi = axios.create({
  baseURL: import.meta.env.VITE_GATEWAY_ADDR,
  withCredentials: true
});

async function setToken(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig<any>> {
  config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
  return config;
}

api.interceptors.request.use(setToken);
apiFiles.interceptors.request.use(setToken);
logoutApi.interceptors.request.use(setToken);

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
  }
);
logoutApi.interceptors.response.use(
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
  }
);
