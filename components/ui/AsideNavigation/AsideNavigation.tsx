import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames/bind';
import { Box, CardMedia, Divider, MenuItem } from '@mui/material';

import { useWindowSize } from 'hooks/useWindowSize';
import { selectUserProfile } from 'store/reducers/user/selectors';

import { MenuItems } from './components/MenuItems';
import { tabTittles } from './constants';

import styles from './AsideNavigation.module.scss';
import { ModalLogOut } from 'components/main/ModalLogOut';

const cn = classnames.bind(styles);

const AsideNavigation = () => {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const [isOpenModalLogOut, setIsOpenModalLogOut] = useState(false);
  const { isMobile } = useWindowSize();
  const { data: profile } = useSelector(selectUserProfile);

  const fullName =
    profile && `${profile.first_name || ''} ${profile.last_name || ''}`;

  const handleToggleMobileMenu = () => {
    setIsOpenMobileMenu((isOpen) => !isOpen);
  };

  const handleOpenModalLogOut = () => {
    setIsOpenModalLogOut(true);
  };

  return (
    <>
      <ModalLogOut
        isOpen={isOpenModalLogOut}
        setIsOpen={setIsOpenModalLogOut}
      />
      <Box className={styles.navContainer}>
        <CardMedia
          component={'img'}
          height='200'
          image='/images/user-img2.jpg'
          alt='Фото пользователя'
          className={styles.userImage}
        />
        <p className={styles.userName}>{fullName}</p>

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

            {isOpenMobileMenu && (
              <MenuItems
                tabTittles={tabTittles}
                handleOpenModalLogOut={handleOpenModalLogOut}
              />
            )}
          </>
        ) : (
          <MenuItems
            tabTittles={tabTittles}
            handleOpenModalLogOut={handleOpenModalLogOut}
          />
        )}
      </Box>
    </>
  );
};

export { AsideNavigation };
