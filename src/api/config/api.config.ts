import axios from "axios";
import {userSlice} from "../../app/store/reducers/UserSlice.ts";
import {store} from '../../main.tsx'

import {AuthorizationService} from "../AuthorizationService.ts";

let isRefreshing = false;
export const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    },
  });

api.interceptors.request.use(
    async (config) => {
      config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
      return config;
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const {setAuth} = userSlice.actions;

      if (error.response?.status === 401 && !originalRequest._retry && !isRefreshing) {
        isRefreshing = true;
        originalRequest._retry = true;

        try {
          await AuthorizationService.refresh();
          store.dispatch(setAuth(true));
          originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
          return api(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
);

export const authApi = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials:true
});

authApi.defaults.headers.common['X-Requested-With'] = null;