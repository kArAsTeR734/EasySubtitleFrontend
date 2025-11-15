import {Button, TextField} from "@mui/material";
import {type FC} from "react";
import './RegistrationForm.scss'
import {type SubmitHandler} from "react-hook-form";
import type {AuthForm, RegistrationFormInput} from "../../../types.ts";
import {useFormValidation} from "../../../../../../shared/hooks/useFormValidation.ts";
import {confirmPasswordValidation, loginValidation, passwordValidation} from "../../../../config/validationConfig.ts";

export const RegistrationForm: FC<AuthForm> = ({
    onClose
   }) => {

  const {
    register,
    handleSubmit,
    shouldShowError,
    getErrorMessage,
    reset

  } = useFormValidation<RegistrationFormInput>({
    defaultValues:{
      login:"",
      password:"",
      confirmPassword:""
    }
  });

  const onSubmit: SubmitHandler<RegistrationFormInput> = (data) => {
    console.log(data);
    if (onClose) {
      onClose();
    }
    reset();
  }

  return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}
              action="#"
              className="register-form">
          <TextField {...register("login", loginValidation)}
                     size="small"
                     placeholder="example123"
                     label="Login"
                     error={shouldShowError("login")}
                     helperText={shouldShowError("login") ? getErrorMessage("login") : ''}
                     type="text"
                     fullWidth
          />
          <TextField
              {...register("password",passwordValidation)}
              size="small"
              error={shouldShowError("password")}
              helperText={shouldShowError("password") ? getErrorMessage("password") : ''}
              placeholder="*****"
              label="Password"
              type="password"
              fullWidth
          />
          <TextField
              {...register("confirmPassword",confirmPasswordValidation)}
              size="small"
              error={shouldShowError("confirmPassword")}
              helperText={shouldShowError("confirmPassword") ? getErrorMessage("confirmPassword") : ''}
              placeholder="*****"
              label="Confirm Password"
              type="password"
              fullWidth
          />
          <Button
              type="submit"
              className="button button--registration"
          >
            Зарегистрироваться
          </Button>
        </form>
      </>
  );
};

