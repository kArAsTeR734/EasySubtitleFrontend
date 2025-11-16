import type {FC} from "react";
import './AuthorizationHints.scss'
import type {AuthForm} from "../../types.ts";

export const AuthorizationHints:FC<AuthForm> = ({
     switchAuthMode,
     title
   }) => {

  const hintTitle = title === 'Вход' ? 'Зарегистрироваться' : 'Войти'
  const hint = title === 'Вход' ? 'Впервые здесь? ' : 'Уже есть аккаунт? '

  return (
      <div className="login__hints hints">
        <p className="hints__account-hint">
          {hint + "  "}
          <a href="#"
             onClick={() => switchAuthMode ? switchAuthMode() : ''}
             className="hints__account-link">
            {hintTitle}
          </a>
        </p>
      </div>
  );
};