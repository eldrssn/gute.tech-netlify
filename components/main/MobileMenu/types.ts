import { IconProps } from 'types';

import { MenuTittles } from './constants';

type MenuItemProps = {
  menuItem: {
    title: MenuTittles;
    href: string;
    icon: React.FC<IconProps>;
  };
};

export type { MenuItemProps };
