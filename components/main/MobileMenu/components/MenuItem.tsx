import React, { FC } from 'react';

import { DefaultMenuItem } from './DefaultMenuItem';
import { ProfileMenuItem } from './ProfileMenuItem';

import { MenuTittles } from '../constants';
import { MenuItemProps } from '../types';

const MenuItem: FC<MenuItemProps> = ({ menuItem, router }) => {
  const Component = {
    [MenuTittles.HOME]: () => (
      <DefaultMenuItem menuItem={menuItem} router={router} />
    ),
    [MenuTittles.CATALOG]: () => (
      <DefaultMenuItem menuItem={menuItem} router={router} />
    ),
    [MenuTittles.CART]: () => (
      <DefaultMenuItem menuItem={menuItem} router={router} />
    ),
    [MenuTittles.PROFILE]: () => (
      <ProfileMenuItem menuItem={menuItem} router={router} />
    ),
  };

  return Component[menuItem.title]();
};

export { MenuItem };
