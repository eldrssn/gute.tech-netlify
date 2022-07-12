import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames/bind';
import { Box, CardMedia, Divider, MenuItem } from '@mui/material';

import { useWindowSize } from 'hooks/useWindowSize';
import { selectUserProfile } from 'store/reducers/user/selectors';

import { MenuItems } from './components/MenuItems';
import { tabTittles } from './constants';

import styles from './AsideNavigation.module.scss';

const cn = classnames.bind(styles);

const AsideNavigation = () => {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const { isMobile } = useWindowSize();
  const { data } = useSelector(selectUserProfile);

  const fillName = data && `${data.first_name} ${data.last_name}`;

  const handleToggleMobileMenu = () => {
    setIsOpenMobileMenu((isOpen) => !isOpen);
  };

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

      {isMobile ? (
        <>
          <MenuItem
            className={cn(styles.navItem, styles.navMobileMenu, {
              [styles.up]: isOpenMobileMenu,
            })}
            onClick={handleToggleMobileMenu}
          >
            Меню
          </MenuItem>

          {isOpenMobileMenu && <MenuItems tabTittles={tabTittles} />}
        </>
      ) : (
        <MenuItems tabTittles={tabTittles} />
      )}
    </Box>
  );
};

export { AsideNavigation };
