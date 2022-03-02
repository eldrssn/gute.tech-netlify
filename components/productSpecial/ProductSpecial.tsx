import React from 'react';
import { Link } from '@mui/material';
import styles from './productSpecial.module.css';

export const ProductSpecial = () => {
  return (
    <div className={styles.productSpecialWrapper}>
      <Link
        className={[styles.productSpecialItem, styles.helpIcon].join(' ')}
        href='#'
      >
        Помочь с выбором
      </Link>
      <Link
        className={[styles.productSpecialItem, styles.specialIcon].join(' ')}
        href='#'
      >
        Спецпредложение
      </Link>
    </div>
  );
};
