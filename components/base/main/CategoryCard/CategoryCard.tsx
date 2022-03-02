import React from 'react';
import styles from './CategoryCard.module.css';
import { Props } from './types';

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
