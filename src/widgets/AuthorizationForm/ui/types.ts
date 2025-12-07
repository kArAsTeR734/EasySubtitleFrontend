export type AuthMode = 'Вход' | 'Регистрация';

interface AuthFormInterface {
  onClose: () => void;
  switchAuthMode?: () => void;
  title?: string;
  isOpen?: boolean;
}

export interface RegistrationFormInput {
  login: string;
  password: string;
  confirmPassword: string;
}

export type AuthForm = AuthFormInterface;
