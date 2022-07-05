import React from 'react';
import { Box, CardMedia, Divider, MenuItem } from '@mui/material';
import Link from 'next/link';
import styles from './AsideNavigation.module.scss';
import classnames from 'classnames/bind';
import { useRouter } from 'next/router';

const cn = classnames.bind(styles);

const tabTittles = [
  { title: 'Главная страница', href: '/' },
  { title: 'Изменить профиль', href: '/profile' },
  { title: 'История заказов', href: '/profile/orders' },
];
const AsideNavigation = () => {
  const router = useRouter();

  return (
    <Box className={styles.navContainer}>
      <CardMedia
        component={'img'}
        height='200'
        image='/images/user-img2.jpg'
        alt='Фото пользователя'
        className={styles.userImage}
      />
      <p className={styles.userName}>Ипполит Виссарионович</p>

      <Divider className={styles.divider} />
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
    </Box>
  );
};

export { AsideNavigation };
