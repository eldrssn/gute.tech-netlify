/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';

import { selectTransportId } from 'store/reducers/transport/selectors';
import {
  getLinkToCatalog,
  getLinkToParentCategory,
} from 'utility/helpers/linkmakers';

import { CategoryCardProps } from './types';
import styles from './CategoryCard.module.scss';

const CategoryCard: React.FC<CategoryCardProps> = ({
  item,
  isSmallBox,
  lazy,
}) => {
  const router = useRouter();

  const { title, image, slug, found, total } = item;

  const transportId = useSelector(selectTransportId);

  const { query, asPath } = router;
  const { categorySlug } = query;

  const isTransportSearch = transportId;

  const linkToParentCategory = getLinkToParentCategory({
    categorySlug: slug,
    transportId,
  });

  const getLink = () =>
    categorySlug
      ? getLinkToCatalog({ asPath, categorySlug: slug, transportId })
      : linkToParentCategory;

  return (
    <Link href={getLink()} prefetch={false}>
      <a className={styles.categoryCard} tabIndex={0}>
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
        <div className={styles.background}></div>

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

        <Image
          className={styles.categoryImage}
          src={image || '/images/no-image.jpeg'}
          alt={title || 'category name'}
          layout='fill'
          loading={lazy}
        />
      </a>
    </Link>
  );
};

export { CategoryCard };
