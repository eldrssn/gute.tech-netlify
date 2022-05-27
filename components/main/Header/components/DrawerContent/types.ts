type DrawerContentProps = {
  closeMainDrawer: () => void;
  setIsFocusSearchField: (isFocusSearchField: boolean) => void;
};

enum DrawerContentKeys {
  CATALOG = 'catalog',
  SEARCH = 'search',
}

export type { DrawerContentProps };
export { DrawerContentKeys };
