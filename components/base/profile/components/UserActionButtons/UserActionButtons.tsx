import React, { useState } from 'react';
import { Box } from '@mui/system';

import { ModalChangePassword } from 'components/main/ModalChangePassword';
import styles from './userActionButtons.module.scss';

const UserActionButtons = () => {
  const [isOpenModalChangePassword, setIsOpenModalChangePassword] =
    useState(false);

  const handleOpenModalChangePassword = () =>
    setIsOpenModalChangePassword(true);
  
  return (
    <>
      <ModalChangePassword
        isOpen={isOpenModalChangePassword}
        setIsOpen={setIsOpenModalChangePassword}
      />
      <Box className={styles.container}>
        <Box
          className={styles.actionButton}
          onClick={handleOpenModalChangePassword}
        >
          Изменить пароль
        </Box>
        {/* <Box className={styles.actionButton}>Удалить аккаунт</Box> */}
      </Box>
    </>
  );
};

export { UserActionButtons };
