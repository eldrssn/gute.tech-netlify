import React from 'react';

import { Props } from './types';
import styles from './CategoryCard.module.css';

const CategoryCard: React.FC<Props> = (props) => (
  <div className={styles.categoryCard}>
    <span className={styles.categoryQuantity}>
      {props.quantity} деталей всего
    </span>
    <div className={styles.backgroundImage}></div>
    <div className={styles.categoryName}>{props.children}</div>
    <img
      className={styles.categoryImage}
      src={`/germanika/${props.image}.jpg`}
    ></img>
  </div>
);

export { CategoryCard };
