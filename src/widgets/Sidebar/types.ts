interface MenuListInterface{
  items:MenuItemInterface[],
}

interface MenuItemInterface{
  text:string,
}

export type MenuItemProps = MenuItemInterface;

export type MenuListProps = MenuListInterface;