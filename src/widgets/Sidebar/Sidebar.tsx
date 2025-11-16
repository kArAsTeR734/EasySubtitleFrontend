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
import {useAppDispatch} from "../../shared/hooks/redux.ts";
import {transcriptionSlice} from "../../app/store/reducers/TranscriptionSlice.ts";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [files,setFiles] = useState<FileData[]>([]);
  const {setUploadedFiles} = transcriptionSlice.actions;
  const dispatch = useAppDispatch();

  const { fetching: uploadFileFetching } = useFetching<SideBarTranscriptionList, [number, number]>(getAllTranscriptions, {
    onSuccess: (files) => {
      console.log('Файл загружен, ID:', files.data);
      setFiles(files.data);
      dispatch(setUploadedFiles(files.data));
    },
    onError: (error) => {
      console.error('Ошибка загрузки:', error);
    },
  });

  const getNewFiles = async (page = 1, pageSize = 30) => {
    await uploadFileFetching(page, pageSize);
  };

  useEffect(() => {
    getNewFiles();
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
      <section
          className={clsx('sidebar', {
            'sidebar--open': isOpen,
            'sidebar--closed': !isOpen
          })}
          aria-label="sidebar"
      >
        <div className="sidebar__header">
          <div className="sidebar__header-left">
            {isOpen && files.length > 0 && (
                <Button className="button button--add-material">
                  <span>Новый материал</span>
                  <PlusOutlined style={{ marginLeft: 7 }} />
                </Button>
            )}
          </div>

          <div className="sidebar__header-right">
            <Button
                onClick={toggleSidebar}
                className="button button--toggle-sidebar"
                aria-label={isOpen ? "Скрыть сайдбар" : "Показать сайдбар"}
            >
            <span>
              {isOpen ?
                  <LeftOutlined className="arrow-icon" /> :
                  <RightOutlined className="arrow-icon" />
              }
            </span>
            </Button>
          </div>
        </div>

        <div className={clsx('sidebar__content', {
          'sidebar__content--visible': isOpen,
          'sidebar__content--hidden': !isOpen
        })}>
            <MenuList data={files} />
        </div>
      </section>
  );
};

export default Sidebar;