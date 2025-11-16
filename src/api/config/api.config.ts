import axios from 'axios'

export const TranscriptionInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Accept': 'application/json',
  }
});
/*
TranscriptionInstance.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    }
);

TranscriptionInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Проверяем что есть refreshToken перед попыткой обновления
      const refreshToken = localStorage.getItem('refresh_token');

      if (error.response?.status === 401 && !originalRequest._retry && refreshToken) {
        originalRequest._retry = true;

        try {
          await AuthorizationService.refreshToken();
          console.log('Токен обновлен');

          originalRequest.headers.Authorization = localStorage.getItem('access_token');

          return TranscriptionInstance(originalRequest);
        } catch (refreshError) {
          console.log('Не удалось обновить токен, разлогиниваем');
          AuthorizationService.logout();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
);
*/

export const AuthorizationInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Accept': 'application/json',
  }
});