import React from 'react';
import Image from 'next/image';
import Router from 'next/router';

import { CATEGORY_QUERY } from 'constants/variables';
import { useRouterQuery } from 'hooks/useRouterQuery';

import { Props } from './types';
import styles from './CategoryCard.module.scss';

const CategoryCard: React.FC<Props> = (props) => {
  const routerQuery = useRouterQuery();

  const isInCategory = routerQuery.getQueryOption(CATEGORY_QUERY);

  const setQuery = () => routerQuery.setQueryOption(CATEGORY_QUERY, props.url);

  const goToUrl = () =>
    Router.push(`/catalog/[category]`, `/catalog/${props.url}`, {
      shallow: true,
    });

  const handleClick = isInCategory ? goToUrl : setQuery;

  return (
    <div className={styles.categoryCard} onClick={handleClick}>
      <span className={styles.categoryQuantity}>
        {props.quantity} деталей всего
      </span>
      <div className={styles.backgroundImage}></div>

      <div className={styles.categoryName}>{props.name}</div>
      <Image
        className={styles.categoryImage}
        src={`/germanika/${props.image}.jpg`}
        alt={props.name || 'category name'}
        layout='fill'
      />
    </div>
  );
};

export { CategoryCard };
