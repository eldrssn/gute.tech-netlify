import React, { FC } from 'react';

import { DefaultMenuItem } from './DefaultMenuItem';
import { ProfileMenuItem } from './ProfileMenuItem';

import { MenuTittles } from '../constants';
import { MenuItemProps } from '../types';

const MenuItem: FC<MenuItemProps> = ({ menuItem }) => {
  const Component = {
    [MenuTittles.HOME]: () => <DefaultMenuItem menuItem={menuItem} />,
    [MenuTittles.CATALOG]: () => <DefaultMenuItem menuItem={menuItem} />,
    [MenuTittles.CART]: () => <DefaultMenuItem menuItem={menuItem} />,
    [MenuTittles.PROFILE]: () => <ProfileMenuItem menuItem={menuItem} />,
  };

  return Component[menuItem.title]();
};

export { MenuItem };
