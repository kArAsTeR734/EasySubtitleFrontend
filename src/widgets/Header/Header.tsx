import './Header.scss'
import clsx from 'clsx'
import Button from "../../shared/components/Button";
import Logo from "../../shared/components/Logo";
import AuthorizationForm from "../AuthorizationForm";
import {useAppDispatch, useAppSelector} from "../../shared/hooks/redux.ts";
import {modalSlice} from "../../app/store/reducers/ModalSlice.ts";
import UserProfile from "../../shared/components/UserProfile/ui/UserProfile.tsx";
import {useAuth} from "../../shared/hooks/useTokenCheck.ts";

const Header = () => {

  const {isOpen} = useAppSelector(state => state.modalReducer);
  const {onClose} = modalSlice.actions
  const dispatch = useAppDispatch();
  const { isLoggedIn, logout } = useAuth();

  const menuItems = [
    {
      label: 'Главная',
      href: '/',
      active:true
    },
    {
      label: 'Инструкция',
      href: '#instructions',
      active: false
    },
  ]

  return (
    <header className="header" data-js-overlay-menu="">
      <div className="header__inner container">
          <Logo className="header__logo"/>
          <nav className="header__menu">
            <ul className="header__menu-list">
              {menuItems.map(({ label, href,active }, index) => (
                <li className="header__menu-item" key={index}>
                  <a
                    className={clsx(
                      'header__menu-link',
                            active ? 'is-active' : ''
                    )}
                    href={href}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="header__actions">
            {isLoggedIn ? (
                <>
                  <UserProfile/>
                  <Button onClick={logout}>Выйти</Button>
                </>
            ) : (
                <Button onClick={() => dispatch(onClose(true))}>
                  Войти
                </Button>
            )}
          </div>
          <AuthorizationForm isOpen={isOpen}
                             onClose={() => dispatch(onClose(false))}
          />

      </div>
    </header>
  )
}

export default Header;