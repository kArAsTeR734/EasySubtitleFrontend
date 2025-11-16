import {AuthorizationInstance} from "./config/api.config.ts";
import type {
  LoginRequestData,
  LoginReturnData,
  RegistrationRequestData,
  RegistrationReturnData
} from "./types/api-types.ts";

export class AuthorizationService {
  public static async authorizationLogin(loginData: LoginRequestData): Promise<LoginReturnData> {
    const response = await AuthorizationInstance.post('/api/v1/auth/login', loginData);

    localStorage.setItem('access_token', response.data.accessToken);
    localStorage.setItem('refresh_token', response.data.refreshToken);

    return response.data;
  }

  public static async authorizationRegister(registerData: RegistrationRequestData): Promise<RegistrationReturnData> {
    const response = await AuthorizationInstance.post('/api/v1/auth/sign-up', registerData);
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

  public static isTokenExpired(): boolean {
    const token = localStorage.getItem('access_token');
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  public static isLoggedIn(): boolean {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    return !!accessToken && !!refreshToken && !this.isTokenExpired();
  }

  public static logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}