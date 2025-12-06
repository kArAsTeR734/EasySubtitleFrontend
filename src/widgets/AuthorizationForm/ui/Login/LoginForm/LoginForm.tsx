import {Button, TextField} from "@mui/material";
import './LoginForm.scss'
import type {AuthForm} from "../../types.ts";
import type {LoginRequestData, LoginReturnData} from "../../../../../api/types/api-types.ts";
import type {SubmitHandler} from "react-hook-form";
import {type FC} from "react";
import useFetching from "../../../../../shared/hooks/useFetching.ts";
import {AuthorizationService} from "../../../../../api/AuthorizationService.ts";
import {loginValidation, passwordValidation} from "../../../config/validationConfig.ts";
import {useFormValidationContext} from "../../../../../shared/hooks/useFormValidationContext.ts";
import {userSlice} from "../../../../../app/store/reducers/UserSlice.ts";
import {useAppDispatch} from "../../../../../shared/hooks/redux.ts";

export interface LoginFormInput {
  login: string,
  password: string,
}

export const LoginForm:FC<AuthForm> = ({
    onClose,
   }) => {

  const {setIsAuthenticated}= userSlice.actions;
  const dispatch = useAppDispatch();

  const {error:loginError,fetching:loginFetch,clearError} = useFetching<LoginReturnData,[LoginRequestData]>(AuthorizationService.login,{
    onSuccess: (data) => {
      console.log('Токены получены:', data);
      localStorage.setItem('access_token', data.accessToken);
      localStorage.setItem('refresh_token', data.refreshToken);
      dispatch(setIsAuthenticated(true));
      onClose();
    },
    onError: (error) => {
      console.error('Ошибка авторизации:', error);
    },
  })

  const {
    register,
    handleSubmit,
    reset,
    shouldShowError,
    getErrorMessage
  } = useFormValidationContext<LoginFormInput>();

  const onSubmit: SubmitHandler<LoginFormInput> = async (formData) => {
    const loginData:LoginRequestData = {
      login:formData.login,
      password:formData.password
    }
    try{
      await loginFetch(loginData);
    }
    finally {
      reset();
      console.log('Поля формы очищены');
    }
  }

  const closeErrorWindowHandler = () => {
    clearError();
    onClose();
  }
  if(loginError){
    return (
        <>
          <div className="error">
            <p>Возникла непредвиденная ошибка при обработке данных</p>
            <p className="error__message">{loginError}</p>
            <Button
                onClick={() => closeErrorWindowHandler()}
                className="button button--close">
              Закрыть
            </Button>
          </div>
        </>
    )
  }

  return (
      <>
        <form action="#" onSubmit={handleSubmit(onSubmit)} className="login-form">
          <TextField {...register("login",loginValidation)}
                     error={shouldShowError("login")}
                     helperText={shouldShowError("login") ? getErrorMessage("login") : ""}
                     size="small"
                     placeholder="example123"
                     label="Логин"
                     type="text"
                     fullWidth
          />
          <TextField
              {...register("password",passwordValidation)}
              error={shouldShowError("password")}
              helperText={shouldShowError("password") ? getErrorMessage("password") : ""}
              size="small"
              placeholder="*****"
              label="Пароль"
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

