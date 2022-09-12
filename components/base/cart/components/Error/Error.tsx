import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

import styles from '../../styles.module.scss';

const Error: React.FC = () => {
  return (
    <Box className={styles.errorBox}>
      <Typography className={styles.errorTitle}>
        Что-то пошло не так.
      </Typography>
      <Typography className={styles.errorText}>
        Попробуйте обновить страницу.
      </Typography>
    </Box>
  );
};

export { Error };
