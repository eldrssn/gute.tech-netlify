import React, { FC } from 'react';
import Box from '@mui/material/Box';

import { RubleIcon } from 'components/ui/RubleIcon';

import styles from './productPrice.module.scss';

const ProductPrice: FC = ({ children }) => (
  <Box sx={{ marginTop: { xs: '20px', md: '10px' } }}>
    <p className={styles.priceWrapper}>
      <span className={styles.priceLabel}>Цена</span>
      {children}
      <RubleIcon className={styles.icon_ruble} />
    </p>
  </Box>
);

export { ProductPrice };
