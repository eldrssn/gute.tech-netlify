import React, { FC } from 'react';
import Link from 'next/link';

import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';

import { Props } from './types';

const LoginPopover: FC<Props> = ({ closePopover, setIsOpenModalLogOut }) => {
  const handleClickExit = () => {
    setIsOpenModalLogOut(true);
    closePopover();
  };

  return (
    <Container disableGutters sx={{ position: 'relative' }}>
      <Link href='/profile'>
        <a>
          <MenuItem onClick={closePopover}>Мой профиль</MenuItem>
        </a>
      </Link>

      <Link href='/profile/orders'>
        <a>
          <MenuItem onClick={closePopover} tabIndex={0}>
            История заказов
          </MenuItem>
        </a>
      </Link>

      <MenuItem tabIndex={0} onClick={handleClickExit}>
        Выйти
      </MenuItem>
    </Container>
  );
};

export { LoginPopover };
