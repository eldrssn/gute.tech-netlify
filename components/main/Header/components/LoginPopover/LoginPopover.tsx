import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';

import { logOut } from 'store/reducers/authentication/exceptionAction';

import { Props } from './types';

const LoginPopover: FC<Props> = ({ closePopover }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClickMyProfile = () => {
    router.push('/profile');
    closePopover();
  };

  const handleClickExit = () => {
    dispatch(logOut());
    closePopover();
  };

  const handleClickOrdersHistory = () => {
    router.push('/profile/orders');
    closePopover();
  };

  return (
    <Container disableGutters sx={{ position: 'relative' }}>
      <MenuItem onClick={handleClickMyProfile}>Мой профиль</MenuItem>
      <MenuItem onClick={handleClickOrdersHistory}>История заказов</MenuItem>
      <MenuItem>Система лояльности</MenuItem>
      <MenuItem>Мой автомобиль</MenuItem>
      <MenuItem onClick={handleClickExit}>Выйти</MenuItem>
    </Container>
  );
};

export { LoginPopover };
