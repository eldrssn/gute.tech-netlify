import React, { FC } from 'react';

import { ProductQuantityProps } from './types';
import styles from './productQuantity.module.scss';

const ProductQuantity: FC<ProductQuantityProps> = ({ quantity }) => (
  <div className={styles.quantity}>
    <p>{quantity} шт. на складе</p>
  </div>
);

export { ProductQuantity };
