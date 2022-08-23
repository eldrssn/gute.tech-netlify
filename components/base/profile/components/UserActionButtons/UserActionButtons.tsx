import React, { useState } from 'react';
import { Box } from '@mui/system';

import { CustomButton } from 'components/ui/CustomButton';
import { ModalChangePassword } from 'components/main/ModalChangePassword';
import styles from './userActionButtons.module.scss';

const UserActionButtons = () => {
  const [isOpenModalChangePassword, setIsOpenModalChangePassword] =
    useState(false);

  const handleOpenModalChangePassword = () =>
    setIsOpenModalChangePassword(true);

  return (
    <>
      {isOpenModalChangePassword && (
        <ModalChangePassword
          isOpen={isOpenModalChangePassword}
          setIsOpen={setIsOpenModalChangePassword}
        />
      )}
      <Box className={styles.container}>
        <CustomButton
          customStyles={styles.button}
          onClick={handleOpenModalChangePassword}
        >
          Изменить пароль
        </CustomButton>
        {/* <Box className={styles.actionButton}>Удалить аккаунт</Box> */}
      </Box>
    </>
  );
};

export { UserActionButtons };
