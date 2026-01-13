import { api } from '../config/api.config.ts';
import type { UserInfo } from '../types/api-types.ts';

export class UserService {
  public static async getUserInfo(): Promise<UserInfo> {
    const response = await api.get('/api/v1/auth/me');
    return response.data;
  }
}
