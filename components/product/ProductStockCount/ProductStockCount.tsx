import React, { FC } from 'react';

import { Props } from './types';
import styles from './productStockCount.module.css';

export const ProductStockCount: FC<Props> = ({ stockCount }) => (
  <div className={styles.stockCount}>
    <p>{stockCount} штук на складе</p>
  </div>
);
