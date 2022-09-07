import React, { FC } from 'react';
import classnames from 'classnames/bind';
import Box from '@mui/material/Box';

import { FiltersButtonProps } from './types';
import styles from './filtersButton.module.scss';

const cn = classnames.bind(styles);

const FiltersButton: FC<FiltersButtonProps> = ({
  onClick,
  className,
  children,
}) => (
  <Box onClick={onClick} className={cn(styles.button, className)}>
    {children}
  </Box>
);

export { FiltersButton };
