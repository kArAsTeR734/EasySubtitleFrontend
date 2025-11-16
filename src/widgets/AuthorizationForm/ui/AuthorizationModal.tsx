import Modal from "../../../shared/components/Modal";
import {type FC, useEffect} from "react";
import './AuthorizationModal.scss'
import Login from "./Login";
import {Registration} from "./Registration/Registration.tsx";
import {modalSlice} from "../../../app/store/reducers/ModalSlice.ts";
import {useAppDispatch, useAppSelector} from "../../../shared/hooks/redux.ts";

interface AuthorizationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthorizationModal: FC<AuthorizationFormProps> = ({
    isOpen,
    onClose
  }) => {

  const {title} = useAppSelector(state => state.modalReducer)
  const {switchAuthMode} = modalSlice.actions;
  const dispatch = useAppDispatch();

  const switchAuthModeToRegister = () => {
    dispatch(switchAuthMode('Регистрация'));
  }

  const switchAuthModeToLogin = () => {
    dispatch(switchAuthMode('Вход'));
  }

  useEffect(() => {
    if (!isOpen) {
      dispatch(switchAuthMode('Вход'));
    }
  }, [isOpen]);

  return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="auth-form">
          {title === 'Вход'
              ? <Login switchAuthMode={switchAuthModeToRegister}
                       onClose={onClose}
                       title={title}
                       isOpen={isOpen}
              />
              : <Registration switchAuthMode={switchAuthModeToLogin}
                                  onClose={onClose}
                                  title = {title}
                                  isOpen={isOpen}
              />
          }
        </div>
      </Modal>
  );
};

