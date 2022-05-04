import React from 'react';
import Image from 'next/image';
import Router from 'next/router';

import { QueryUrl } from 'constants/variables';
import { useRouterQuery } from 'hooks/useRouterQuery';

import { Props } from './types';
import { imageLoader } from './helpers';
import styles from './CategoryCard.module.scss';

const CategoryCard: React.FC<Props> = ({ item }) => {
  const { title, image, slug } = item;

  const quantity = 10;

  const routerQuery = useRouterQuery();

  const isInCategory = routerQuery.getQueryOption(QueryUrl.CATEGORY_QUERY);

  const setQuery = () =>
    routerQuery.setQueryOption(QueryUrl.CATEGORY_QUERY, slug);

  const goToUrl = () =>
    Router.push(`/catalog/${slug}?page=1&order=byPopularDown`, undefined, {
      shallow: true,
    });

  const handleClick = isInCategory ? goToUrl : setQuery;

  return (
    <div className={styles.categoryCard} onClick={handleClick}>
      <span className={styles.categoryQuantity}>{quantity} деталей всего</span>
      <div className={styles.backgroundImage}></div>

      <div className={styles.categoryName}>{title}</div>
      <Image
        loader={imageLoader}
        className={styles.categoryImage}
        src={image || `/germanika/deflectors.jpg`}
        alt={title || 'category name'}
        layout='fill'
        priority
      />
    </div>
  );
};

export { CategoryCard };
