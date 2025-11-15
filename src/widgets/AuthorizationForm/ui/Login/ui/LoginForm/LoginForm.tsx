import {Button, TextField} from "@mui/material";
import './LoginForm.scss'
import type {AuthForm} from "../../../types.ts";
import type {LoginRequestData, LoginReturnData} from "../../../../../../api/types/api-types.ts";
import type {SubmitHandler} from "react-hook-form";
import {useFormValidation} from "../../../../../../shared/hooks/useFormValidation.ts";
import type {FC} from "react";
import useFetching from "../../../../../../shared/hooks/useFetching.ts";
import {AuthorizationService} from "../../../../../../api/AuthorizationService.ts";
import {loginValidation, passwordValidation} from "../../../../config/validationConfig.ts";

interface LoginFormInput {
  login: string,
  password: string,
}

export const LoginForm:FC<AuthForm> = ({
    onClose,
   }) => {

  const {fetching:loginFetch} = useFetching<LoginReturnData,[LoginRequestData]>(AuthorizationService.authorizationLogin,{
    onSuccess: (data) => {
      console.log('Токены получены:', data);
      localStorage.setItem('access_token', data.accessToken);
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

  } = useFormValidation<LoginFormInput>({
    defaultValues:{
      login:"",
      password:"",
    }
  });

  const onSubmit: SubmitHandler<LoginFormInput> = async (formData) => {
    const loginData:LoginRequestData = {
      login:formData.login,
      password:formData.password
    }
    await loginFetch(loginData);
    reset();
  }

  return (
      <>
        <form action="#" onSubmit={handleSubmit(onSubmit)} className="login-form">
          <TextField {...register("login",loginValidation)}
                     error={shouldShowError("login")}
                     helperText={shouldShowError("login") ? getErrorMessage("login") : ""}
                     size="small"
                     placeholder="example123"
                     label="Login"
                     type="text"
                     fullWidth
          />
          <TextField
              {...register("password",passwordValidation)}
              error={shouldShowError("password")}
              helperText={shouldShowError("password") ? getErrorMessage("password") : ""}
              size="small"
              placeholder="*****"
              label="Password"
              type="password"
              fullWidth
          />
          <Button
              type="submit"
              className="button button--login"
          >
            Войти
          </Button>
        </form>

      </>

  );
};

