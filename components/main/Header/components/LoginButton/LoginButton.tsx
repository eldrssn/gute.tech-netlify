import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CardMedia from '@mui/material/CardMedia';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';

import {
  selectIsAuthorized,
  selectLoadingAuthorized,
} from 'store/reducers/authentication/selectors';
import { ModalLogIn } from 'components/main/ModalLogIn';
import { ModalLogOut } from 'components/main/ModalLogOut';

import { LoginPopover } from '../LoginPopover';
import styles from './loginButton.module.scss';

const LoginButton = () => {
  const [isOpenModalLogIn, setIsOpenModalLogIn] = useState(false);
  const [isOpenModalLogOut, setIsOpenModalLogOut] = useState(false);

  const isAuthorized = useSelector(selectIsAuthorized);
  const loadingAuthorized = useSelector(selectLoadingAuthorized);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (loadingAuthorized) {
      return null;
    }

    if (!isAuthorized) {
      setIsOpenModalLogIn(true);
      return;
    }

    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <MenuItem className={styles.button} onClick={handleClick} tabIndex={0}>
        <CardMedia
          component={'img'}
          height='32'
          image={
            isAuthorized ? '/images/user-img2.jpg' : '/images/user-img.jpeg'
          }
          alt='Фото пользователя'
          className={styles.image}
        />
      </MenuItem>

      <Popover
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
        <LoginPopover
          closePopover={handleClose}
          setIsOpenModalLogOut={setIsOpenModalLogOut}
        />
      </Popover>

      <ModalLogOut
        isOpen={isOpenModalLogOut}
        setIsOpen={setIsOpenModalLogOut}
      />
      <ModalLogIn isOpen={isOpenModalLogIn} setIsOpen={setIsOpenModalLogIn} />
    </>
  );
};

export { LoginButton };
