import React, { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import colors from 'styles/_export.module.scss';

import { LoaderProps } from './types';
import styles from './loader.module.scss';

const loaderDefaultColor = colors.blue;

const Loader: FC<LoaderProps> = ({ size = 50, color = loaderDefaultColor }) => (
  <Box className={styles.loader}>
    <CircularProgress
      size={size}
      color={'inherit'}
      sx={{
        '& .MuiCircularProgress-svg': {
          color,
        },
      }}
    />
  </Box>
);

export { Loader };
