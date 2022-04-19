import React from 'react';
import { Box, Typography } from '@mui/material';

import styles from './catalogTitle.module.scss';

export const CatalogTitle: React.FC = () => (
  <Box>
    <Typography component='h2' className={styles.title}>
      Catalog Title
    </Typography>
  </Box>
);
