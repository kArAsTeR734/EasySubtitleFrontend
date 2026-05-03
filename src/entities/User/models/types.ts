// User Types
export interface UserInfo {
  id: string;
  login: string;
}

//Auth Types
export interface RegistrationRequestInterface {
  login: string;
  password: string;
  password_confirmed: string;
}

export interface LoginReturnDataInterface {
  access_token: string;
}

export interface RefreshResult {
  access_token: string;
}

export type LoginRequestData = Omit<
  RegistrationRequestData,
  'password_confirmed'
>;

export type LoginReturnData = LoginReturnDataInterface;

export type RegistrationRequestData = RegistrationRequestInterface;

export type RefreshData = RefreshResult;
