import {AuthorizationService} from "../AuthorizationService.ts";
import axios from "axios";
import {userSlice} from "../../app/store/reducers/UserSlice.ts";
import {store} from '../../main.tsx';

const { setAuth } = userSlice.actions;
export const authInstance = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});

export const apiInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    Accept: 'application/json',
  },
});

apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (!originalRequest) return Promise.reject(error);

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const data = await AuthorizationService.refresh(); // cookie передастся автоматически
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return apiInstance(originalRequest);
        } catch (refreshError) {
          AuthorizationService.logout();
          store.dispatch(setAuth(false));
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
);
