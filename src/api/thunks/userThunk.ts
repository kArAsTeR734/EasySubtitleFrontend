import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthorizationService } from '../services/AuthorizationService.ts';
import type {
  LoginRequestData,
  LoginReturnData,
  RegistrationRequestData,
  UserInfo,
} from '../types/api-types.ts';

const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'Произошла неизвестная ошибка';
};

// Thunk для получения информации о пользователе (если есть отдельный эндпоинт)
export const fetchUserInfo = createAsyncThunk<
  UserInfo,
  void,
  { rejectValue: string }
>('user/fetchUserInfo', async (_, { rejectWithValue }) => {
  try {
    const login = localStorage.getItem('user_login') || 'user';
    return {
      id: `user_${Date.now()}`,
      login,
    };
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

export const loginUser = createAsyncThunk<
  { tokens: LoginReturnData; login: string }, // Теперь передаем логин отдельно
  LoginRequestData,
  { rejectValue: string }
>('user/login', async (loginData, { rejectWithValue }) => {
  try {
    const response = await AuthorizationService.login(loginData);

    return {
      tokens: response,
      login: loginData.login,
    };
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

export const registerUser = createAsyncThunk<
  void,
  RegistrationRequestData,
  { rejectValue: string }
>('user/register', async (registerData, { rejectWithValue }) => {
  try {
    await AuthorizationService.register(registerData);
    return;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

// Thunk для выхода
export const logoutUser = createAsyncThunk('user/logout', async () => {
  AuthorizationService.logout();
  return;
});

export const refreshToken = createAsyncThunk<
  LoginReturnData,
  void,
  { rejectValue: string }
>('user/refreshToken', async (_, { rejectWithValue }) => {
  try {
    return await AuthorizationService.refresh();
  } catch (error) {
    AuthorizationService.logout();
    return rejectWithValue(handleApiError(error));
  }
});
