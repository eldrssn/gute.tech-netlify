import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box } from '@mui/material';

import { ModalLogIn } from 'components/main/ModalLogIn';
import {
  selectIsAuthorized,
  selectLoadingAuthorized,
} from 'store/reducers/authentication/selectors';

import { MenuItemProps } from '../types';
import styles from '../mobileMenu.module.scss';

const cn = classnames.bind(styles);

const ProfileMenuItem: FC<MenuItemProps> = ({ menuItem, router }) => {
  const [isOpenModalLogIn, setIsOpenModalLogIn] = useState(false);
  const isAuthorized = useSelector(selectIsAuthorized);
  const loadingAuthorized = useSelector(selectLoadingAuthorized);

  const { title, href, icon } = menuItem;

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
        <FontAwesomeIcon icon={icon} className={styles.menuItem_icon} />
        <span className={styles.menuItem_title}>{title}</span>
      </Box>
    </>
  );
};

export { ProfileMenuItem };
