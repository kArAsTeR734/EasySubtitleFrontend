// User Types
export interface UserInfo {
  id: string,
  username: string,
}

//Auth Types
export interface RegistrationRequestInterface {
  login: string;
  password: string;
  passwordConfirmed: string;
}

export interface LoginReturnDataInterface {
  accessToken: string;
}

export interface RefreshResult{
  accessToken: string;
}

export type LoginRequestData = Omit<RegistrationRequestData, 'passwordConfirmed'>;

export type LoginReturnData = LoginReturnDataInterface;

export type RegistrationRequestData = RegistrationRequestInterface;

export type RefreshData = RefreshResult;