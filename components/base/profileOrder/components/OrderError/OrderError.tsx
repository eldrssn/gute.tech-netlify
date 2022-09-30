import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
