import './MenuItem.css'
import {transcriptionSlice} from "../../../app/store/reducers/TranscriptionSlice.ts";
import {useAppDispatch, useAppSelector} from "../../../shared/hooks/redux.ts";
import type {FileData} from "../../../api/types/api-types.ts";
import clsx from "clsx";

interface MenuItemProps{
  file:FileData;
}

const MenuItem = ({file}:MenuItemProps) => {
  const {selectedFile} = useAppSelector(state => state.transcriptionReducer)
  const {setSelectedFile} = transcriptionSlice.actions;
  const dispatch = useAppDispatch();

  const isSelected = selectedFile?.id === file.id;

  const handleClickItem = () => {
    dispatch(setSelectedFile(file));
  }

  return (
      <li
          onClick={handleClickItem}
          className={clsx('menu__list-item',{
            'menu__list-item--selected':isSelected
          })}
      >
        <div className="menu-item__header">
          <span className="menu-item__name">{file.fileName}</span>
          <span className="menu-item__time">{file.uploadTime}</span>
        </div>
        <div className="menu-item__status">
          {file.text ? '✅ Готово' : '🔄 В обработке'}
        </div>
      </li>
  );
};

export default MenuItem;