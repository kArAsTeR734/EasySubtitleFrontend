import axios from 'axios';
import { userSlice } from '@app/store/reducers/UserSlice.ts';
import { store } from '../../main.tsx';
import { AuthorizationService } from '@/api/services/AuthorizationService.ts';

let isRefreshing = false;
export const TranscriptionInstance = axios.create({
  baseURL: 'http://0.0.0.0:8080',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  },
});

TranscriptionInstance.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
  return config;
});

TranscriptionInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { setAuth } = userSlice.actions;

    if (error.response?.status === 401 && !originalRequest._retry && !isRefreshing) {
      isRefreshing = true;
      originalRequest._retry = true;

      try {
        await AuthorizationService.refresh();
        store.dispatch(setAuth(true));
        console.log('Токен обновлен');
        originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
        return TranscriptionInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export const AuthorizationInstance = axios.create({
  baseURL: 'http://0.0.0.0:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
AuthorizationInstance.defaults.headers.common['X-Requested-With'] = null;
