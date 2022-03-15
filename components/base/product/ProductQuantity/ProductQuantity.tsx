import React, { FC } from 'react';

import { Props } from './types';
import styles from './productQuantity.module.css';

export const ProductQuantity: FC<Props> = ({ quantity }) => (
  <div className={styles.quantity}>
    <p>{quantity} штук на складе</p>
  </div>
);
