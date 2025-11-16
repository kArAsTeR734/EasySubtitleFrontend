import {useEffect, useState} from "react";
import './Sidebar.scss'
import {LeftOutlined, PlusOutlined, RightOutlined} from '@ant-design/icons'
import type {SideBarTranscriptionList} from "./types.ts";
import MenuList from "./MenuList";
import Button from "../../shared/components/Button";
import clsx from "clsx";
import useFetching from "../../shared/hooks/useFetching.ts";
import {getAllTranscriptions} from "../../features/GetAllTranscriptions.ts";
import type {FileData} from "../../api/types/api-types.ts";
import {mockFileData} from "./data.ts";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [files,setFiles] = useState<FileData[]>([]);

  const {fetching: uploadFileFetching }
      = useFetching<SideBarTranscriptionList, [number,number]>(getAllTranscriptions, {
    onSuccess: (files) => {
      console.log('Файл загружен, ID:', files.data);
      setFiles(files.data);
    },
    onError: (error) => {
      console.error('Ошибка загрузки:', error);
    },
  });

  const getNewFiles = async(page = 1, pageSize = 0) => {
    await uploadFileFetching(page,pageSize);
  }

  useEffect(() => {
    getNewFiles();
  }, [files]);

  const mods = {
    'button--toggle-sidebar-opened':isOpen,
    'button--toggle-sidebar-closed':!isOpen,
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  }

  if(isOpen){
    return (
          <section
              className={clsx('sidebar')}
              aria-label="sidebar"
          >
            <div className="sidebar--inner">
              <div className="sidebar__actions">
                {!mockFileData &&
                <Button className="button button--add-material">
                  <span>Новый материал</span>
                  <PlusOutlined style={{marginLeft: 7}}/>
                </Button>}

                <Button
                    onClick={toggleSidebar}
                    className={clsx(mods)}
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
              <MenuList data={mockFileData}/>
            </div>
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