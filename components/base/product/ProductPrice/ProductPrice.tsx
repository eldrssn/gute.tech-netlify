import React, { FC } from 'react';
import { Box } from '@mui/material';

import styles from './productPrice.module.css';

export const ProductPrice: FC = ({ children }) => (
  <Box sx={{ marginTop: { xs: '20px', md: '10px' } }}>
    <p className={styles.priceWrapper}>
      <span className={styles.priceLabel}>Цена</span>
      {children} ₽
    </p>
  </Box>
);
