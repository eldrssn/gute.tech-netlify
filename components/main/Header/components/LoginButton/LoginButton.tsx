import React from 'react';
import CardMedia from '@mui/material/CardMedia';
import MenuItem from '@mui/material/MenuItem';
// import Popover from '@mui/material/Popover';

import styles from './loginButton.module.scss';
// import { LoginPopover } from '../LoginPopover';

const LoginButton = () => {
  // FIXME: закомментил логику, потом добавлю сюда корректно выпадающее меню
  // чтобы не было никаких конфликтов

  // const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const open = Boolean(anchorEl);
  // const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <MenuItem
        className={styles.button}
        // onClick={handleClick}
      >
        <CardMedia
          component={'img'}
          height='32'
          image='/images/user-img2.jpg'
          alt='Фото пользователя'
          className={styles.image}
        />
      </MenuItem>

      {/* <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <LoginPopover />
      </Popover>
      */}
    </>
  );
};

export { LoginButton };
