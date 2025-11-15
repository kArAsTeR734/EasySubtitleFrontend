import {Button} from "@mui/material";
import {CloseOutlined} from "@ant-design/icons";
import type {AuthForm} from "../types.ts";
import type {FC} from "react";
import RegistrationForm from "./RegistrationForm";
import AuthorizationHints from "../AuthorizationHints";
import '../AuthorizationModal.scss'

export const Registration:FC<AuthForm> = ({
      onClose,
      switchAuthMode,
      title
    }) => {
  return (
      <div className="auth">
        <Button
            onClick={() => onClose ? onClose() : ''}
            className="auth__close">
          <CloseOutlined/>
        </Button>
        <h1 className="auth__title h3">{title}</h1>
        <RegistrationForm onClose={onClose}/>
        <AuthorizationHints switchAuthMode={switchAuthMode}/>
      </div>
  );
};

