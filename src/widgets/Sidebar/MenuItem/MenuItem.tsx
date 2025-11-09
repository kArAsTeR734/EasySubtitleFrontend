import './MenuItem.css'

interface MenuItemProps{
  text:string
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