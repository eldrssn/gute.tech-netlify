import React from 'react';
import { Button } from '@mui/material';
import styles from './customButton.module.css';

type CustomButtonType = {
  href?: string;
  onClick?: () => void;
};

export const CustomButton: React.FC<CustomButtonType> = ({
  children,
  href,
  onClick,
}) => {
  return (
    <Button className={styles.button} href={href} onClick={onClick}>
      {children}
    </Button>
  );
};
