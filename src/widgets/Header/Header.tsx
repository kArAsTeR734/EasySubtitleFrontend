import './Header.scss'
import clsx from 'clsx'
import type {FC} from "react";
import Button from "../../shared/components/Button";
import Logo from "../../shared/components/Logo";

interface HeaderProps{
  isLoggedIn: boolean
}

const Header:FC<HeaderProps> = (props) => {
  const { isLoggedIn } = props

  const menuItems = [
    {
      label: 'Главная',
      href: '/',
    },
    {
      label: 'Инструкция',
      href: '/about',
    },
  ]

  return (
    <header className="header" data-js-overlay-menu="">
      <div className="header__inner container">
          <Logo className="header__logo"/>
          <nav className="header__menu">
            <ul className="header__menu-list">
              {menuItems.map(({ label, href }, index) => (
                <li className="header__menu-item" key={index}>
                  <a
                    className={clsx(
                      'header__menu-link',
                              'is-active'
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
          <div className="header__actions">
            <Button className="button button--login">
              <span>Войти</span>
            </Button>
          </div>
        }

      </div>
    </header>
  )
}

export default Header;