import {AuthorizationInstance} from "./config/api.config.ts";
import type {
  LoginRequestData,
  LoginReturnData,
  RegistrationRequestData,
} from "./types/api-types.ts";

export class AuthorizationService {
  public static async login(loginData: LoginRequestData): Promise<LoginReturnData> {
    const response = await AuthorizationInstance.post('/api/v1/auth/login', loginData);

    localStorage.setItem('access_token', response.data.accessToken);
    localStorage.setItem('refresh_token', response.data.refreshToken);

    return response.data;
  }

  public static async register(registerData: RegistrationRequestData): Promise<void> {
    const response = await AuthorizationInstance.post('/api/v1/auth/register', registerData);

    return response.data;
  }

  public static async refreshToken(): Promise<LoginReturnData> {
    const refreshToken = localStorage.getItem('refresh_token');

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await AuthorizationInstance.post('/api/v1/auth/refresh', {
      refreshToken
    });

    localStorage.setItem('access_token', response.data.accessToken);
    localStorage.setItem('refresh_token', response.data.refreshToken);

    return response.data;
  }

  public static logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}