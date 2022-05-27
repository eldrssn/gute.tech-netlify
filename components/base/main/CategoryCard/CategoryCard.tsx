import React from 'react';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';

import { QueryUrl } from 'constants/variables';
import { useRouterQuery } from 'hooks/useRouterQuery';

import { CategoryCardProps } from './types';
import styles from './CategoryCard.module.scss';

const CategoryCard: React.FC<CategoryCardProps> = ({
  item,
  isTransportSearch,
}) => {
  const router = useRouter();

  const { title, image, slug, found, total } = item;

  const routerQuery = useRouterQuery();

  const isInCategory = routerQuery.getQueryOption(QueryUrl.CATEGORY_QUERY);

  const transportQuery = routerQuery.getQueryOption(QueryUrl.TRANSPORT_QUERY);

  const setQuery = () =>
    routerQuery.setQueryOption(QueryUrl.CATEGORY_QUERY, slug);

  const isTransportQuery =
    Array.isArray(transportQuery) && transportQuery.length > 0;

  const getTransportSlug = () => {
    if (isTransportQuery) {
      const transportQueryFormatted = transportQuery.map(
        (query) => `${QueryUrl.TRANSPORT_QUERY}=${query}`,
      );
      return transportQueryFormatted.join('&');
    }
  };

  const goToUrl = () =>
    router.push(`/catalog/${slug}?page=1&order=byPopularDown`, undefined, {
      shallow: true,
    });

  const goToFiltersUrl = () => {
    router.push(
      `/catalog/${slug}?${getTransportSlug()}&page=1&order=byPopularDown`,
      undefined,
      { shallow: true },
    );
  };

  const handleClick = () => {
    if (isTransportQuery && isInCategory) {
      goToFiltersUrl();
      return;
    }

    if (isInCategory) {
      goToUrl();
      return;
    }

    setQuery();
  };

  return (
    <div className={styles.categoryCard} onClick={handleClick}>
      <Box
        className={styles.categoryQuantity_container}
        sx={{ display: { xs: 'flex', sm: 'block' } }}
      >
        {isTransportSearch && (
          <span className={styles.categoryQuantity_found}>
            {found} деталей для вашего авто
          </span>
        )}
        <span className={styles.categoryQuantity}>{total} деталей всего</span>
      </Box>
      <div className={styles.backgroundImage}></div>

      <Typography
        component='h4'
        className={styles.categoryName}
        sx={{ top: { xs: '60px', sm: '50px' } }}
      >
        {title}
      </Typography>
      <CardMedia
        component='img'
        className={styles.categoryImage}
        src={image || `/germanika/deflectors.jpg`}
        alt={title || 'category name'}
      />
    </div>
  );
};

export { CategoryCard };
