import { Button } from '@mui/material';
import { CloseOutlined } from '@ant-design/icons';
import type { AuthForm } from '../types.ts';
import { type FC, useEffect } from 'react';
import LoginForm from './LoginForm';
import '../AuthorizationModal.scss';
import AuthorizationHints from '../AuthorizationHints';
import { useFormValidation } from '@hooks/useFormValidation.ts';
import type { LoginFormInput } from './LoginForm/LoginForm.tsx';
import { FormProvider } from 'react-hook-form';

export const Login: FC<AuthForm> = ({ onClose, switchAuthMode, title, isOpen }) => {
  const formMethods = useFormValidation<LoginFormInput>({
    defaultValues: {
      login: '',
      password: '',
    },
  });

  useEffect(() => {
    if (!isOpen) {
      formMethods.reset();
    }
  }, [isOpen, formMethods.reset]);

  return (
    <>
      <div className="auth">
        <Button onClick={() => onClose()} className="auth__close">
          <CloseOutlined />
        </Button>
        <h1 className="auth__title h3">{title}</h1>
        <FormProvider {...formMethods}>
          <LoginForm onClose={onClose} />
        </FormProvider>

        <AuthorizationHints onClose={onClose} title={title} switchAuthMode={switchAuthMode} />
      </div>
    </>
  );
};
