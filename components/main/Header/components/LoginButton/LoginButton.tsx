import { MenuItem } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import React from 'react';

import styles from './loginButton.module.scss';

const LoginButton = () => {
  return (
    <MenuItem className={styles.button}>
      <CardMedia
        component={'img'}
        height='40'
        image='/images/user-img2.jpg'
        alt='Фото пользователя'
        className={styles.image}
      />
    </MenuItem>
  );
};

export { LoginButton };
