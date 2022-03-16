import React from 'react';

import Image from 'next/image';

import { Props } from './types';
import styles from './CategoryCard.module.css';

const CategoryCard: React.FC<Props> = (props) => (
  <div className={styles.categoryCard}>
    <span className={styles.categoryQuantity}>
      {props.quantity} деталей всего
    </span>
    <div className={styles.backgroundImage}></div>
    <div className={styles.categoryName}>{props.children}</div>
    <Image
      className={styles.categoryImage}
      src={`/germanika/${props.image}.jpg`}
      alt={props.name || 'category name'}
      layout='fill'
    />
  </div>
);

export { CategoryCard };
