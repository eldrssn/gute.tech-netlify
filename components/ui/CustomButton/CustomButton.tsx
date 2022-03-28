import React from 'react';
import { Button } from '@mui/material';
import classnames from 'classnames/bind';

import { CustomButtonType } from './types';
import styles from './customButton.module.css';

const cn = classnames.bind(styles);

export const CustomButton: React.FC<CustomButtonType> = ({
  children,
  href,
  onClick,
  customStyles,
}) => (
  <Button
    className={cn(styles.button, customStyles)}
    href={href}
    onClick={onClick}
    disableRipple={true}
  >
    {children}
  </Button>
);
