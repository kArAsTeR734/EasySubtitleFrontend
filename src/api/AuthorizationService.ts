import {authInstance} from "./config/api.config.ts";
import type {
  LoginRequestData,
  LoginReturnData,
  RegistrationRequestData,
} from "./types/api-types.ts";

export class AuthorizationService {
  public static async login(loginData: LoginRequestData): Promise<LoginReturnData> {
    const response = await authInstance.post('/api/v1/auth/login',
        loginData,
        {withCredentials:true});

    return response.data;
  }

  public static async register(registerData: RegistrationRequestData): Promise<void> {
    const response = await authInstance.post('/api/v1/auth/register', registerData);

    return response.data;
  }

  public static async refresh(): Promise<{ accessToken: string }> {
    const response = await authInstance.get('/api/v1/auth/refresh', {
      withCredentials: true,
    });

    if (response.data.accessToken) {
      localStorage.setItem('access_token', response.data.accessToken);
    }

    return response.data; // { accessToken: string }
  }

  public static logout(): void {
    localStorage.removeItem('access_token');
  }
}