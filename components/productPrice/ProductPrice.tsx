import React from 'react';
import styles from './productPrice.module.css';

export const ProductPrice: React.FC = ({ children }) => {
  return (
    <p className={styles.priceWrapper}>
      <span className={styles.priceLabel}>Цена</span>
      {children} ₽
    </p>
  );
};
