import {Button} from "@mui/material";
import {CloseOutlined} from "@ant-design/icons";
import type {AuthForm, RegistrationFormInput} from "../types.ts";
import {type FC, useEffect} from "react";
import RegistrationForm from "./RegistrationForm";
import AuthorizationHints from "../AuthorizationHints";
import '../AuthorizationModal.scss'
import {useFormValidation} from "../../../../shared/hooks/useFormValidation.ts";
import {FormProvider} from "react-hook-form";

export const Registration:FC<AuthForm> = ({
      onClose,
      switchAuthMode,
      title,
      isOpen
    }) => {

  const formMethods = useFormValidation<RegistrationFormInput>({
    defaultValues: {
      login: "",
      password: "",
      confirmPassword:""
    }
  });

  useEffect(() => {
    if (!isOpen) {
      formMethods.reset();
    }
  }, [isOpen, formMethods.reset]);

  return (
      <div className="auth">
        <Button
            onClick={() => onClose()}
            className="auth__close">
          <CloseOutlined/>
        </Button>
        <h1 className="auth__title h3">{title}</h1>
        <FormProvider {...formMethods}>
          <RegistrationForm onClose={onClose} switchAuthMode={switchAuthMode}/>
        </FormProvider>
        <AuthorizationHints onClose={onClose}
                            title={title}
                            switchAuthMode={switchAuthMode}/>
      </div>
  );
};

