import './MenuItem.css'

interface MenuItemProps{
  title:string | null
}

const MenuItem = ({title}:MenuItemProps) => {
  return (
      <div>
        <li className="menu__list-item">
          <span>{title}</span>
        </li>
      </div>
  );
};

export default MenuItem;