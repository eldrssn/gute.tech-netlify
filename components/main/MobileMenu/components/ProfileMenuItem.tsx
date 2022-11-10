import React, { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import classnames from 'classnames/bind';
import Box from '@mui/material/Box';

import { ModalLogIn } from 'components/main/ModalLogIn';
import {
  selectIsAuthorized,
  selectLoadingAuthorized,
} from 'store/reducers/authentication/selectors';

import { MenuItemProps } from '../types';
import styles from '../mobileMenu.module.scss';

const cn = classnames.bind(styles);

const ProfileMenuItem: FC<MenuItemProps> = ({ menuItem }) => {
  const router = useRouter();

  const [isOpenModalLogIn, setIsOpenModalLogIn] = useState(false);
  const isAuthorized = useSelector(selectIsAuthorized);
  const loadingAuthorized = useSelector(selectLoadingAuthorized);

  const { title, href, icon: Icon } = menuItem;

  const handleClickProfile = () => {
    if (loadingAuthorized) {
      return null;
    }

    if (!isAuthorized) {
      setIsOpenModalLogIn(true);
      return;
    }

    router.push(href);
  };

  const isActive = router.pathname.includes(href);

  return (
    <>
      <ModalLogIn isOpen={isOpenModalLogIn} setIsOpen={setIsOpenModalLogIn} />

      <Box
        className={cn(styles.menuItem, {
          [styles.menuItem_active]: isActive,
        })}
        onClick={handleClickProfile}
      >
        <Icon className={styles.menuItem_icon} />
        <span className={styles.menuItem_title}>{title}</span>
      </Box>
    </>
  );
};

export { ProfileMenuItem };
