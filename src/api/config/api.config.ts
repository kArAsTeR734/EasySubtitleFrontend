import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { AuthorizationService } from '../services/AuthorizationService.ts';

export const api = axios.create({
  baseURL: import.meta.env.VITE_GATEWAY_ADDR,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiFiles = axios.create({
  baseURL: import.meta.env.VITE_GATEWAY_ADDR,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_GATEWAY_ADDR,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const logoutApi = axios.create({
  baseURL: import.meta.env.VITE_GATEWAY_ADDR,
  withCredentials: true,
});

async function setToken(
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig<any>> {
  config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
  return config;
}

interface RefreshConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

function refreshOnRejected(
  axios: AxiosInstance,
): (error: AxiosError) => Promise<AxiosResponse> {
  return async (error: AxiosError) => {
    const originalRequest = error.config as RefreshConfig;
    const status = error.response?.status;
    const isAuthRefresh = originalRequest?.url?.includes('auth/refresh');

    if (status !== 401 || originalRequest._retry || isAuthRefresh) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    try {
      const { access_token } = await AuthorizationService.refresh();

      localStorage.setItem('access_token', access_token);
      originalRequest.headers.Authorization = `Bearer ${access_token}`;

      return axios(originalRequest);
    } catch (refreshError) {
      localStorage.removeItem('access_token');
      return Promise.reject(refreshError);
    }
  };
}

api.interceptors.request.use(setToken);
apiFiles.interceptors.request.use(setToken);
logoutApi.interceptors.request.use(setToken);

api.interceptors.response.use((response) => response, refreshOnRejected(api));
apiFiles.interceptors.response.use(
  (response) => response,
  refreshOnRejected(apiFiles),
);
logoutApi.interceptors.response.use(
  (response) => response,
  refreshOnRejected(logoutApi),
);
