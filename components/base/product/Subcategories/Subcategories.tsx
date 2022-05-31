import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';

import { selectCategoriesSubcategoriesList } from 'store/reducers/catalog/selectors';
import { Loader } from 'components/ui/Loader';
import { getLinkToCatalog } from 'utility/helpers/linkmakers';

import styles from './subcategories.module.scss';

const Subcategories = () => {
  const router = useRouter();
  const { data: subcategories, isLoading } = useSelector(
    selectCategoriesSubcategoriesList,
  );

  const { categorySlug } = router.query;

  return (
    <Box
      className={styles.mainContainer}
      sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {subcategories.length ? (
            subcategories.map(({ title, slug: subcategorySlug }) => {
              const linkToCatalog = getLinkToCatalog({
                categorySlug,
                subcategorySlug,
              });

              return (
                <Link key={subcategorySlug} href={linkToCatalog}>
                  <a>
                    <Box className={styles.catalogItem}>{title}</Box>
                  </a>
                </Link>
              );
            })
          ) : (
            <Box className={styles.catalogItem}>Нет доступных подкатегорий</Box>
          )}
        </>
      )}
    </Box>
  );
};

export { Subcategories };
