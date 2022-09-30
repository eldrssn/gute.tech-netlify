import React, { FC } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { useWindowSize } from 'hooks/useWindowSize';

import { TitleProps } from '../types';
import styles from '../catalogCard.module.scss';

const Title: FC<TitleProps> = ({ children }) => {
  const { isMobile } = useWindowSize();

  return isMobile ? (
    <Typography className={styles.cardTitle} gutterBottom component='h3'>
      {children}
    </Typography>
  ) : (
    <Tooltip title={children} placement='top'>
      <Typography className={styles.cardTitle} gutterBottom component='h3'>
        {children}
      </Typography>
    </Tooltip>
  );
};

export { Title };
