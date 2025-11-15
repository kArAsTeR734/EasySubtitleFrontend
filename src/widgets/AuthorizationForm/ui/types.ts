export type AuthMode = 'register' | 'login'
export type AuthTitle= 'Вход' | 'Регистрация'

interface AuthFormInterface {
  onClose?: () => void,
  switchAuthMode?: () => void,
  title?:string
}

export interface RegistrationFormInput {
  login: string,
  password: string,
  confirmPassword: string
}

export type AuthForm = AuthFormInterface;