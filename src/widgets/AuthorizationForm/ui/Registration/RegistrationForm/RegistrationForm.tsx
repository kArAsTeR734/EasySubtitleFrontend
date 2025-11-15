import {Button, TextField} from "@mui/material";
import {type FC, useEffect} from "react";
import './RegistrationForm.scss'
import {type SubmitHandler} from "react-hook-form";
import type {AuthForm, RegistrationFormInput} from "../../types.ts";
import {confirmPasswordValidation, loginValidation, passwordValidation} from "../../../config/validationConfig.ts";
import useFetching from "../../../../../shared/hooks/useFetching.ts";
import type {
  RegistrationRequestData,
  RegistrationReturnData
} from "../../../../../api/types/api-types.ts";
import {AuthorizationService} from "../../../../../api/AuthorizationService.ts";
import {useFormValidationContext} from "../../../../../shared/hooks/useFormValidationContext.ts";

export const  RegistrationForm: FC<AuthForm> = ({
    onClose
   }) => {

  const {error:registerError,fetching:registerFetch,clearError}
      = useFetching<RegistrationReturnData,[RegistrationRequestData]>(AuthorizationService.authorizationRegister,{
    onSuccess: (data) => {
      console.log('Пользователь зарегистрирован:', data.login);
      console.log('Id пользователя: ', data.id);
      if (onClose) {
        onClose();
      }
    },
    onError: (error) => {
      console.error('Ошибка авторизации:', error);
    },
  })

  const {
    register,
    handleSubmit,
    shouldShowError,
    getErrorMessage,
    reset

  } = useFormValidationContext<RegistrationFormInput>();

  const onSubmit: SubmitHandler<RegistrationFormInput> = async (formData) => {
    console.log('Данные с формы отправленны');
    const registerData:RegistrationRequestData = {
      login:formData.login,
      password:formData.password,
      confirmPassword:formData.confirmPassword
    }
    try{
      await registerFetch(registerData);
    }
    finally {
      reset();
      console.log('Поля формы очищены');
    }
  }

  const closeModalHandler = () => {
    reset();
    onClose();
  }

  useEffect(() => {
    clearError();
  },[])

  if(registerError){
    return (
        <>
          <div className="error">
            <p>Возникла непредвиденная ошибка при обработке данных</p>
            <p className="error__message">{registerError}</p>
            <Button
                onClick={() => closeModalHandler()}
                className="button button--close">
              Закрыть
            </Button>
          </div>
        </>
    )
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

