import './Header.scss'
import clsx from 'clsx'
import {type FC, useState} from "react";
import Button from "../../shared/components/Button";
import Logo from "../../shared/components/Logo";
import AuthorizationForm from "../AuthorizationForm";

interface HeaderProps{
  isLoggedIn: boolean
}
// Переделать логику логина через Redux
const Header:FC<HeaderProps> = ({isLoggedIn}) => {

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

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
        {isLoggedIn &&
          <>
            <div className="header__actions">
              <Button
                onClick={() => setIsAuthModalOpen(true)}
                className="button button--login">
                <span>Войти</span>
              </Button>
            </div>
            <AuthorizationForm isOpen={isAuthModalOpen}
                               onClose={() => setIsAuthModalOpen(false)}
            />
          </>
        }

      </div>
    </header>
  )
}

export default Header;