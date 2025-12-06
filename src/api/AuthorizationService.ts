import {AuthorizationInstance} from "./config/api.config.ts";
import type {
  LoginRequestData,
  LoginReturnData,
  RegistrationRequestData,
} from "./types/api-types.ts";

export class AuthorizationService {
  public static async login(loginData: LoginRequestData): Promise<LoginReturnData> {
    const response = await AuthorizationInstance.post('/api/v1/auth/login', loginData,{withCredentials:true})
    return response.data;
  }

  public static async register(registerData: RegistrationRequestData): Promise<void> {
    const response = await AuthorizationInstance.post('/api/v1/auth/register', registerData);

    return response.data;
  }

  public static async refresh(): Promise<{ accessToken: string }> {
    const response = await AuthorizationInstance.post('/api/v1/auth/refresh');
    console.log('Current cookies:', document.cookie);
    console.log('Sending refresh request...');
    if (response.data.accessToken) {
      localStorage.setItem('access_token', response.data.accessToken);
    }

    return response.data;
  }

  public static async logout(): Promise<void> {
    const response = await AuthorizationInstance.post('/api/v1/auth/logout',
        {},
        {
          withCredentials:true,
          headers:{
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          }
        });
    localStorage.removeItem('access_token');

    return response.data;
  }
}