import { useEffect, useState } from 'react';
import './Sidebar.scss';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Button from '../../shared/components/Button';
import clsx from 'clsx';
import { useAppSelector } from '@shared/hooks/redux.ts';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { isAuth } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    if (!isAuth) {
      return;
    }
  }, [isAuth]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section
      className={clsx('sidebar', {
        'sidebar--open': isOpen,
        'sidebar--closed': !isOpen,
      })}
      aria-label="sidebar"
    >
      <div className="sidebar__header">
        <div className="sidebar__header-left"></div>

        <div className="sidebar__header-right">
          <Button
            onClick={toggleSidebar}
            className="button button--toggle-sidebar"
            aria-label={isOpen ? 'Скрыть сайдбар' : 'Показать сайдбар'}
          >
            <span>
              {isOpen ? (
                <LeftOutlined className="arrow-icon" />
              ) : (
                <RightOutlined className="arrow-icon" />
              )}
            </span>
          </Button>
        </div>
      </div>
      <div
        className={clsx('sidebar__content', {
          'sidebar__content--visible': isOpen,
          'sidebar__content--hidden': !isOpen,
        })}
      ></div>
    </section>
  );
};

export default Sidebar;
