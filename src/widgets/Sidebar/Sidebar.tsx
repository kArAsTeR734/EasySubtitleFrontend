import {useState} from "react";
import './Sidebar.scss'
import {LeftOutlined, PlusOutlined, RightOutlined} from '@ant-design/icons'
import type {MenuItemProps} from "./types.ts";
import MenuList from "./MenuList";
import Button from "../../shared/components/Button";
import clsx from "clsx";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const items: MenuItemProps[] = [
    { text: 'Материал 1' },
    { text: 'Материал 2' },
    { text: 'Материал 3' }
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  }

  if(isOpen){
    return (
        <section
            className={clsx('sidebar')}
            aria-label="sidebar"
        >
          {isOpen && (
              <div className="sidebar--inner">
                <div className="sidebar__actions">
                  <Button className="button button--add-material">
                    <span>Новый материал</span>
                    <PlusOutlined style={{marginLeft: 7}}/>
                  </Button>
                  <Button
                      onClick={toggleSidebar}
                      className="button button--toggle-sidebar"
                      aria-label={isOpen ? "Скрыть сайдбар" : "Показать сайдбар"}
                  >
                      <span>
                        {isOpen ?
                            <LeftOutlined className="arrow-icon"/> :
                            <RightOutlined className="arrow-icon"/>
                        }
                      </span>
                  </Button>
                </div>
                <MenuList items={items}/>

              </div>
          )}
        </section>
    );
  }

  return (
      <div className="sidebar__actions-closed">
        <Button
            onClick={toggleSidebar}
            className="button button--toggle-sidebar"
            aria-label={isOpen ? "Скрыть сайдбар" : "Показать сайдбар"}
        >
          <span>
            {isOpen ?
                <LeftOutlined className="arrow-icon"/> :
                <RightOutlined className="arrow-icon"/>
            }
          </span>
        </Button>
      </div>
  );

};

export default Sidebar;