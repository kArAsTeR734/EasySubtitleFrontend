import './MenuList.scss'
import MenuItem from "../MenuItem";
import type {MenuListProps} from "../types.ts";

const MenuList = ({data}:MenuListProps) => {

  return (
      <div className="menu">
        <ul className="menu__list">
        {data.map((file) => <MenuItem key={file.id} text = {file.text}/>)}
        </ul>
      </div>
  );
};

export default MenuList;