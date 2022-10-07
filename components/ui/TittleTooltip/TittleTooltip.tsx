import React, { FC } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { useWindowSize } from 'hooks/useWindowSize';

import { TittleProps } from './types';

const Tittle: FC<TittleProps> = ({ children, className, placement }) => {
  const { isMobile } = useWindowSize();

  return isMobile ? (
    <Typography className={className} gutterBottom component='h3'>
      {children}
    </Typography>
  ) : (
    <Tooltip title={children || 'title'} placement={placement}>
      <Typography className={className} gutterBottom component='h3'>
        {children}
      </Typography>
    </Tooltip>
  );
};

export { Tittle };
