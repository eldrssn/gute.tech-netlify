type MenuItemsProps = {
  tabTittles: {
    title: string;
    href?: string;
    type?: string;
  }[];
  handleOpenModalLogOut: () => void;
};

export type { MenuItemsProps };
