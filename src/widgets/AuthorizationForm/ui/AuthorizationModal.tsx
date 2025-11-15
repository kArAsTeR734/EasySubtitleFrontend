import Modal from "../../../shared/components/Modal";
import {type FC, useState} from "react";
import './AuthorizationModal.scss'
import type {AuthMode, AuthTitle} from "./types.ts";
import Login from "./Login";
import {Registration} from "./Registration/Registration.tsx";

interface AuthorizationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthorizationModal: FC<AuthorizationFormProps> = ({
    isOpen,
    onClose
  }) => {

  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [authTitle,setAuthTitle] = useState<AuthTitle>('Вход');

  const switchAuthModeToRegister = () => {
    setAuthMode('register');
    setAuthTitle('Регистрация')
  }

  const switchAuthModeToLogin = () => {
    setAuthMode('login');
    setAuthTitle('Вход')
  }

  return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="auth-form">
          {authMode === 'login'
              ? <Login switchAuthMode={switchAuthModeToRegister}
                       onClose={onClose}
                       title={authTitle}
              />
              : <Registration switchAuthMode={switchAuthModeToLogin}
                                  onClose={onClose}
                                  title = {authTitle}
              />
          }
        </div>
      </Modal>
  );
};

