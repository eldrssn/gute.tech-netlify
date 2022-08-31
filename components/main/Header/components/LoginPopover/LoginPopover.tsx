import React, { FC } from 'react';

import { useRouter } from 'next/router';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';

import { Props } from './types';

const LoginPopover: FC<Props> = ({ closePopover, setIsOpenModalLogOut }) => {
  const router = useRouter();

  const handleClickMyProfile = () => {
    router.push('/profile');
    closePopover();
  };

  const handleClickExit = () => {
    setIsOpenModalLogOut(true);
    closePopover();
  };

  const handleClickOrdersHistory = () => {
    router.push('/profile/orders');
    closePopover();
  };

  return (
    <Container disableGutters sx={{ position: 'relative' }}>
      <MenuItem onClick={handleClickMyProfile} tabIndex={0}>
        Мой профиль
      </MenuItem>
      <MenuItem onClick={handleClickOrdersHistory} tabIndex={0}>
        История заказов
      </MenuItem>
      <MenuItem tabIndex={0}>Система лояльности</MenuItem>
      <MenuItem tabIndex={0}>Мой автомобиль</MenuItem>
      <MenuItem tabIndex={0} onClick={handleClickExit}>
        Выйти
      </MenuItem>
    </Container>
  );
};

export { LoginPopover };
