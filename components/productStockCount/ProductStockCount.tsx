import React from 'react';
import styles from './productStockCount.module.css';
import { ProductStockCountType } from './types';

export const ProductStockCount: React.FC<ProductStockCountType> = ({
  stockCount,
}) => {
  return (
    <div className={styles.stockCount}>
      <p>{stockCount} штук на складе</p>
    </div>
  );
};
