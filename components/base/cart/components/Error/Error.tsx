import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
