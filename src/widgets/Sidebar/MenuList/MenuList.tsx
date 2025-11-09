import './MenuList.scss'
import type {MenuListProps} from "../types.ts";
import MenuItem from "../MenuItem";

const MenuList = ({items}:MenuListProps) => {
  return (
      <div className="menu">
        <ul className="menu__list">
        {items.map((item) => <MenuItem key={item.text} text = {item.text}/>)}
        </ul>
      </div>
  );
};

export default MenuList;