import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classnames from 'classnames/bind';
import { Box, CardMedia, Divider, MenuItem } from '@mui/material';

import { selectUserProfile } from 'store/reducers/user/selectors';

import styles from './AsideNavigation.module.scss';

const cn = classnames.bind(styles);

const tabTittles = [
  { title: 'Главная страница', href: '/' },
  { title: 'Изменить профиль', href: '/profile' },
  { title: 'История заказов', href: '/profile/orders' },
];
const AsideNavigation = () => {
  const router = useRouter();
  const { data } = useSelector(selectUserProfile);

  const fillName = data && `${data.first_name} ${data.last_name}`;

  return (
    <Box className={styles.navContainer}>
      <CardMedia
        component={'img'}
        height='200'
        image='/images/user-img2.jpg'
        alt='Фото пользователя'
        className={styles.userImage}
      />
      <p className={styles.userName}>{fillName}</p>

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
