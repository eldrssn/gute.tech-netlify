import React, { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classnames from 'classnames/bind';
import MenuItem from '@mui/material/MenuItem';

import { MenuItemsProps } from '../types';
import { LOG_OUT } from '../constants';
import styles from '../AsideNavigation.module.scss';

const cn = classnames.bind(styles);

const MenuItems: FC<MenuItemsProps> = ({
  tabTittles,
  handleOpenModalLogOut,
}) => {
  const router = useRouter();

  return (
    <>
      {tabTittles.map(({ title, href, type }) => {
        if (href) {
          return (
            <Link href={href} key={title}>
              <a>
                <MenuItem
                  className={cn(styles.navItem, {
                    [styles.navItem_active]: href === router.pathname,
                  })}
                >
                  {title}
                </MenuItem>
              </a>
            </Link>
          );
        }

        if (type === LOG_OUT) {
          return (
            <MenuItem
              onClick={handleOpenModalLogOut}
              className={styles.navItem}
              key={title}
              tabIndex={0}
            >
              {title}
            </MenuItem>
          );
        }
      })}
    </>
  );
};

export { MenuItems };
