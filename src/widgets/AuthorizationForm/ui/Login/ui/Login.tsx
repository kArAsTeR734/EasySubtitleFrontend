import {Button} from "@mui/material";
import {CloseOutlined} from "@ant-design/icons";
import type {AuthForm} from "../../types.ts";
import type {FC} from "react";
import LoginForm from "./LoginForm";
import '../../AuthorizationModal.scss'
import AuthorizationHints from "../../AuthorizationHints";

export const Login:FC<AuthForm> = ({
   onClose,
   switchAuthMode,
   title
  }) => {
  return (
      <>
        <div className="auth">
          <Button
              onClick={() => onClose ? onClose() : ''}
              className="auth__close">
            <CloseOutlined/>
          </Button>
          <h1 className="auth__title h3">{title}</h1>
          <LoginForm onClose={onClose} switchAuthMode={switchAuthMode}/>
          <AuthorizationHints onClose={onClose} switchAuthMode={switchAuthMode}/>
        </div>
      </>
  );
};

