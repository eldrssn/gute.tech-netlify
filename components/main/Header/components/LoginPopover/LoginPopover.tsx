import React, { FC } from 'react';
import Link from 'next/link';

import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';

import { Props } from './types';
import styles from './loginPopover.module.scss';

const LoginPopover: FC<Props> = ({ closePopover, setIsOpenModalLogOut }) => {
  const handleClickExit = () => {
    setIsOpenModalLogOut(true);
    closePopover();
  };

  return (
    <Container disableGutters sx={{ position: 'relative' }}>
      <Link href='/profile'>
        <a className={styles.item_box}>
          <MenuItem onClick={closePopover} className={styles.item}>
            Мой профиль
          </MenuItem>
        </a>
      </Link>

      <Link href='/profile/orders'>
        <a className={styles.item_box}>
          <MenuItem className={styles.item} onClick={closePopover}>
            История заказов
          </MenuItem>
        </a>
      </Link>

      <MenuItem
        tabIndex={0}
        onClick={handleClickExit}
        className={styles.menuItem}
      >
        Выйти
      </MenuItem>
    </Container>
  );
};

export { LoginPopover };
