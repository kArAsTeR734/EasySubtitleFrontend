import './MenuItem.css'

interface MenuItemProps{
  text:string | null
}

const MenuItem = ({text}:MenuItemProps) => {
  return (
      <div>
        <li className="menu__list-item">
          <span>{text}</span>
        </li>
      </div>
  );
};

export default MenuItem;