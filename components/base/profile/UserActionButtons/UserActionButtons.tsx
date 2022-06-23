import { Box } from '@mui/system';
import React from 'react';
import styles from './userActionButtons.module.scss';

const UserActionButtons = () => {
  return (
    <Box className={styles.container}>
      <Box className={styles.actionButton}>Изменить пароль</Box>
      {/* <Box className={styles.actionButton}>Удалить аккаунт</Box> */}
    </Box>
  );
};

export { UserActionButtons };
