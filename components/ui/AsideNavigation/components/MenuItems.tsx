import { MenuItem } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import classnames from 'classnames/bind';

import styles from '../AsideNavigation.module.scss';

type MenuItemsProps = {
  tabTittles: {
    title: string;
    href: string;
  }[];
};

const cn = classnames.bind(styles);

const MenuItems: FC<MenuItemsProps> = ({ tabTittles }) => {
  const router = useRouter();

  return (
    <>
      {tabTittles.map(({ title, href }) => (
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
      ))}
    </>
  );
};

export { MenuItems };
