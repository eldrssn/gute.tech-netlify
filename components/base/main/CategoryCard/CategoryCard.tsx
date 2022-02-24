import React from 'react';
import styles from './CategoryCard.module.css';

type Props = {
  name?: string;
  quantity?: number | string;
  image?: string;
};

const CategoryCard: React.FC<Props> = (props) => {
  return (
    <div className={styles['categoryCard']}>
      <span className={styles['categoryQuantity']}>{props.quantity} деталей всего</span>
      <div className={styles['backgroundImage']}></div>
      <div className={styles['categoryName']}>{props.children}</div>
      <img className={styles['categoryImage']} src={`/germanika/${props.image}.jpg`}></img>
    </div>
  );
};

export { CategoryCard };
