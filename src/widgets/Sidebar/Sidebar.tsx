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

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [files,setFiles] = useState<FileData[]>([]);

  const { fetching: uploadFileFetching } = useFetching<SideBarTranscriptionList, [number, number]>(getAllTranscriptions, {
    onSuccess: (response) => {
      console.log('📦 ПОЛНЫЙ RESPONSE:', response);
      console.log('🔍 Структура response:', {
        data: response.data,
        total: response.total,
      });

      if (response.data && Array.isArray(response.data)) {
        console.log('✅ Data является массивом, длина:', response.data.length);

        const transformedFiles: FileData[] = response.data.map((file, index) => {
          console.log(`📄 Файл ${index}:`, file);
          return {
            ...file,
            id: String(file.id)
          };
        });

        console.log('🔄 Преобразованные файлы:', transformedFiles);
        setFiles(transformedFiles);
      } else {
        console.error('❌ Data не массив или отсутствует:', response.data);
      }
    },
    onError: (error) => {
      console.error('💥 Ошибка загрузки:', error);
    },
  });

  const getNewFiles = async (page = 1, pageSize = 30) => {
    await uploadFileFetching(page, pageSize);
    console.log('Запрос получил данные');
  };

  useEffect(() => {
    getNewFiles();
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  console.log('Длина массива с данными',files.length);
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
            {isOpen && !getNewFiles && (
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