import React, { FC } from 'react';
import classnames from 'classnames/bind';
import Box from '@mui/material/Box';

import { ButtonProps } from '../types';
import styles from '../checkboxGroup.module.scss';

const cn = classnames.bind(styles);

const Button: FC<ButtonProps> = ({ onClick, className, children }) => (
  <Box onClick={onClick} className={cn(styles.button, className)}>
    {children}
  </Box>
);

export { Button };
