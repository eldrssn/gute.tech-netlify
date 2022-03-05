import React, { FC } from 'react';
import { Box, Link } from '@mui/material';

import styles from './productSpecial.module.css';

export const ProductSpecial: FC = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', lg: 'row' },
      order: { xs: -1, sm: 0 },
    }}
    className={styles.productSpecialWrapper}
  >
    <Link
      className={[styles.productSpecialItem, styles.helpIcon].join(' ')}
      href='#'
    >
      Помочь с выбором
    </Link>
    <Link
      className={[styles.productSpecialItem, styles.specialIcon].join(' ')}
      href='#'
    >
      Спецпредложение
    </Link>
  </Box>
);
