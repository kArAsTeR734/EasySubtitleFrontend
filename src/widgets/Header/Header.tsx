import './Header.scss';
import clsx from 'clsx';
import Button from '../../shared/components/Button';
import Logo from '../../shared/components/Logo';
import AuthorizationForm from '../AuthorizationForm';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux.ts';
import { modalSlice } from '@app/store/reducers/ModalSlice.ts';
import UserProfile from '../../shared/components/UserProfile/ui/UserProfile.tsx';
import { useAuth } from '@/features/User/useAuth.ts';
import { useLogout } from '@/features/Logout/useLogout.ts';
import { Link } from 'react-router-dom';

const Header = () => {
  const { activeModal } = useAppSelector((state) => state.modalReducer);
  const { user } = useAuth();
  const { openModal, closeModal } = modalSlice.actions;
  const dispatch = useAppDispatch();
  const logoutMutate = useLogout();

  const menuItems = [
    {
      label: 'Документация',
      href: '/',
      active: true
    },
    {
      label: 'PINN задачи',
      href: '/tasks',
      active: false
    }
  ];

  const logout = () => {
    console.log('logout');
    logoutMutate.mutate();
  };

  const isAuthOpen = activeModal === 'auth';

  return (
    <header className="header" data-js-overlay-menu="">
      <div className="header__inner container">
        <Logo className="header__logo" />
        <nav className="header__menu">
          <ul className="header__menu-list">
            {menuItems.map(({ label, href, active }, index) => (
              <li className="header__menu-item" key={index}>
                <Link
                  className={clsx(
                    'header__menu-link',
                    active ? 'is-active' : ''
                  )}
                  to={href}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header__actions">
          {user ? (
            <>
              <UserProfile />
              <Button onClick={logout}>Выйти</Button>
            </>
          ) : (
            <Button onClick={() => dispatch(openModal('auth'))}>Войти</Button>
          )}
        </div>
        <AuthorizationForm
          isOpen={isAuthOpen}
          onClose={() => dispatch(closeModal())}
        />
      </div>
    </header>
  );
};

export default Header;
