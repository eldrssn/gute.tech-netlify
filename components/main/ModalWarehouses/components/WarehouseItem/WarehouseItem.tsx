import React, { FC } from 'react';

import { WarehouseProps } from './types';
import styles from './warehouseItem.module.scss';

const WarehouseItem: FC<WarehouseProps> = ({ warehouse }) => {
  const { title, address, city, quantity } = warehouse;

  return (
    <article className={styles.warehouseBox}>
      <p className={styles.title}>{title}</p>
      <p className={styles.address}>
        г. {city}, {address}
      </p>

      <p className={styles.quantity}>Количество: {quantity} шт.</p>
    </article>
  );
};

export { WarehouseItem };
