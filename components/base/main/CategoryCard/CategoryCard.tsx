import React from 'react';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';

import { QueryUrl } from 'constants/variables';
import { useRouterQuery } from 'hooks/useRouterQuery';
import {
  getLinkToCatalog,
  getLinkToTransportCatalog,
} from 'utility/helpers/linkmakers';

import { CategoryCardProps } from './types';
import styles from './CategoryCard.module.scss';

const CategoryCard: React.FC<CategoryCardProps> = ({ item, isSmallBox }) => {
  const router = useRouter();

  const { title, image, slug, found, total } = item;

  const routerQuery = useRouterQuery();

  const categorySlug = routerQuery.getQueryOption(QueryUrl.CATEGORY_QUERY);

  const transportQuery = routerQuery.getQueryOption(QueryUrl.TRANSPORT_QUERY);
  const transportId = routerQuery.getQueryOption(QueryUrl.TRANSPORT_ID);

  const setQuery = () =>
    routerQuery.setQueryOption(QueryUrl.CATEGORY_QUERY, slug);

  const isTransportSearch = transportQuery && transportId;

  const linkToTransportCatalog = getLinkToTransportCatalog({
    categorySlug,
    subcategorySlug: slug,
    transportQuery,
    transportId,
  });

  const linkToCatalog = getLinkToCatalog({
    categorySlug,
    subcategorySlug: slug,
  });

  const handleClick = () => {
    if (categorySlug) {
      router.push(isTransportSearch ? linkToTransportCatalog : linkToCatalog);
      return;
    }
    setQuery();
  };

  return (
    <div className={styles.categoryCard} onClick={handleClick}>
      <Box
        className={styles.categoryQuantity_container}
        sx={{
          display: {
            xs: 'flex',
            sm: 'block',
            lg: isSmallBox && isTransportSearch ? 'flex' : 'block',
          },
        }}
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
        sx={{
          top: {
            xs: isTransportSearch ? '70px' : '40px',
            sm: '50px',
            lg: isSmallBox && isTransportSearch ? '70px' : '40px',
          },
        }}
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
