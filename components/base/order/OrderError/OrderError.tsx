import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';

import styles from './styles.module.scss';

const OrderError: FC = () => {
  return (
    <Box className={styles.mainContent}>
      <Box className={styles.errorBox}>
        <Typography>Произошла ошибка</Typography>
      </Box>
    </Box>
  );
};

export { OrderError };
