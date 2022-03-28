import React, { FC } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import styles from './headerCity.module.css';

export const HeaderCity: FC = () => (
  <Container className={styles.cityWrapper}>
    <Box component='div'>
      <Typography className={styles.cityName}>Выберите город</Typography>
    </Box>
  </Container>
);
