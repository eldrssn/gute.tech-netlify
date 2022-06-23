import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';

const LoginPopover = () => (
  <Container disableGutters sx={{ position: 'relative' }}>
    <MenuItem>Мой профиль</MenuItem>
    <MenuItem>История заказов</MenuItem>
    <MenuItem>Система лояльности</MenuItem>
    <MenuItem>Мой автомобиль</MenuItem>
    <MenuItem>Изменить профиль</MenuItem>
    <MenuItem>Выйти</MenuItem>
  </Container>
);

export { LoginPopover };
