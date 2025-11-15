import Modal from "../../../shared/components/Modal";
import {type FC, useEffect, useState} from "react";
import './AuthorizationModal.scss'
import type {AuthMode} from "./types.ts";
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

  const [authMode,setAuthMode] = useState<AuthMode>('Вход');

  const switchAuthModeToRegister = () => {
    setAuthMode('Регистрация');
  }

  const switchAuthModeToLogin = () => {
    setAuthMode('Вход');
  }

  useEffect(() => {
    if (!isOpen) {
      setAuthMode('Вход');
    }
  }, [isOpen]);

  return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="auth-form">
          {authMode === 'Вход'
              ? <Login switchAuthMode={switchAuthModeToRegister}
                       onClose={onClose}
                       title={authMode}
                       isOpen={isOpen}
              />
              : <Registration switchAuthMode={switchAuthModeToLogin}
                                  onClose={onClose}
                                  title = {authMode}
                                  isOpen={isOpen}
              />
          }
        </div>
      </Modal>
  );
};

