import { authApi, logoutApi } from '../config/api.config.ts';
import type {
  LoginRequestData,
  LoginReturnData,
  RefreshData,
  RegistrationRequestData
} from '@/entities/User/models/types.ts';

export class AuthorizationService {
  public static async login(
    loginData: LoginRequestData
  ): Promise<LoginReturnData> {
    const response = await authApi.post('auth/login', loginData);

    return response.data;
  }

  public static async register(
    registerData: RegistrationRequestData
  ): Promise<void> {
    return await authApi.post('auth/register', registerData);
  }

  public static async refresh(): Promise<RefreshData> {
    const response = await authApi.post<RefreshData>('auth/refresh');

    return response.data;
  }

  public static async logout(): Promise<void> {
    return await logoutApi.post('auth/logout');
  }
}
