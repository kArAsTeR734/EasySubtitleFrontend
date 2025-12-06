import {AuthorizationInstance} from "./config/api.config.ts";
import type {
  LoginRequestData,
  LoginReturnData,
  RegistrationRequestData,
} from "./types/api-types.ts";

export class AuthorizationService {
  public static async login(loginData: LoginRequestData): Promise<LoginReturnData> {
    const response = await AuthorizationInstance.post('/api/v1/auth/login', loginData);

    return response.data;
  }

  public static async register(registerData: RegistrationRequestData): Promise<void> {
    const response = await AuthorizationInstance.post('/api/v1/auth/register', registerData);

    return response.data;
  }

  public static async refresh(): Promise<LoginReturnData> {

    const response = await AuthorizationInstance.post('/api/v1/auth/refresh', {
    });

    localStorage.setItem('access_token', response.data.accessToken);

    return response.data;
  }

  public static logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}