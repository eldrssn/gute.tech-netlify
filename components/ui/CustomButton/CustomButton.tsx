import React from 'react';
import { Button } from '@mui/material';
import classnames from 'classnames/bind';

import { CustomButtonType } from './types';
import styles from './customButton.module.scss';

const cn = classnames.bind(styles);

const CustomButton: React.FC<CustomButtonType> = ({
  children,
  href,
  onClick,
  customStyles,
  disabled = false,
}) => (
  <Button
    className={cn(styles.button, customStyles)}
    href={href}
    onClick={onClick}
    disableRipple={true}
    disabled={disabled}
  >
    {children}
  </Button>
);

export { CustomButton };
