import { Button, TextField } from '@mui/material';
import './LoginForm.scss';
import type { AuthForm } from '../../types.ts';
import type { LoginRequestData } from '@/api/types/api-types.ts';
import type { SubmitHandler } from 'react-hook-form';
import { type FC } from 'react';
import {
  loginValidation,
  passwordValidation,
} from '../../../config/validationConfig.ts';
import { useFormValidationContext } from '@shared/hooks/useFormValidationContext.ts';
import { userSlice } from '@app/store/reducers/UserSlice.ts';
import { useAppDispatch } from '@shared/hooks/redux.ts';
import { useLogin } from '@/features/Login/useLogin.ts';

export interface LoginFormInput {
  login: string;
  password: string;
}

export const LoginForm: FC<AuthForm> = ({ onClose }) => {
  const { setAuth } = userSlice.actions;
  const dispatch = useAppDispatch();

  const { mutateAsync: loginFetch, error, reset: clearError } = useLogin();

  const { register, handleSubmit, reset, shouldShowError, getErrorMessage } =
    useFormValidationContext<LoginFormInput>();

  const onSubmit: SubmitHandler<LoginFormInput> = async (formData) => {
    const loginData: LoginRequestData = {
      login: formData.login,
      password: formData.password,
    };

    const data = await loginFetch(loginData);
    localStorage.setItem('access_token', data.accessToken ?? '');
    window.location.reload();
    dispatch(setAuth(true));
    onClose();
    reset();
  };

  const closeErrorWindowHandler = () => {
    clearError();
    onClose();
    reset();
  };
  if (error) {
    return (
      <>
        <div className="error">
          <p>Возникла непредвиденная ошибка при обработке данных</p>
          <p className="error__message">{error.message}</p>
          <Button
            onClick={() => closeErrorWindowHandler()}
            className="button button--close"
          >
            Закрыть
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <form action="#" onSubmit={handleSubmit(onSubmit)} className="login-form">
        <TextField
          {...register('login', loginValidation)}
          error={shouldShowError('login')}
          helperText={shouldShowError('login') ? getErrorMessage('login') : ''}
          size="small"
          placeholder="example123"
          label="Логин"
          type="text"
          fullWidth
        />
        <TextField
          {...register('password', passwordValidation)}
          error={shouldShowError('password')}
          helperText={
            shouldShowError('password') ? getErrorMessage('password') : ''
          }
          size="small"
          placeholder="*****"
          label="Пароль"
          type="password"
          fullWidth
        />
        <Button type="submit" className="button button--login">
          Войти
        </Button>
      </form>
    </>
  );
};
