import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';

import { selectCategoriesSubcategoriesList } from 'store/reducers/catalog/selectors';
import { Loader } from 'components/ui/Loader';

import styles from './subcategories.module.scss';

const Subcategories = () => {
  const { data, isLoading } = useSelector(selectCategoriesSubcategoriesList);

  return (
    <Box
      className={styles.mainContainer}
      sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {data.length ? (
            data.map((category) => (
              <Link
                key={category.slug}
                href={`/catalog/${category.slug}?page=1&order=byPopularDown`}
              >
                <a>
                  <Box className={styles.catalogItem}>{category.title}</Box>
                </a>
              </Link>
            ))
          ) : (
            <Box className={styles.catalogItem}>Нет доступных подкатегорий</Box>
          )}
        </>
      )}
    </Box>
  );
};

export { Subcategories };
