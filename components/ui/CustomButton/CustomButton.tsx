import React from 'react';
import Button from '@mui/material/Button';
import classnames from 'classnames/bind';

import { CustomButtonType } from './types';
import styles from './customButton.module.scss';

const cn = classnames.bind(styles);

const CustomButton: React.FC<CustomButtonType> = ({
  children,
  href,
  onClick,
  customStyles,
  id,
  form,
  disabled = false,
  type = 'button',
}) => (
  <Button
    id={id}
    className={cn(styles.button, customStyles)}
    href={href}
    onClick={onClick}
    disableRipple={true}
    disabled={disabled}
    type={type}
    form={form}
  >
    {children}
  </Button>
);

export { CustomButton };
