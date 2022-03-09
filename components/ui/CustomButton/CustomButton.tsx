import React from 'react';
import { Button } from '@mui/material';

import { CustomButtonType } from './types';
import styles from './customButton.module.css';

export const CustomButton: React.FC<CustomButtonType> = ({
  children,
  href,
  onClick,
}) => (
  <Button className={styles.button} href={href} onClick={onClick}>
    {children}
  </Button>
);
