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
    return response.data;
  }

  public static async authorizationRegister(registerData:RegistrationRequestData):Promise<RegistrationReturnData>{
    const response = await AuthorizationInstance.post('/api/v1/auth/sign-up',registerData);
    return response.data;
  }
}