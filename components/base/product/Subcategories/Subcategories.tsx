import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';

import { selectTransportId } from 'store/reducers/transport/selectors';
import { selectCategoriesSubcategoriesList } from 'store/reducers/catalog/selectors';
import { Loader } from 'components/ui/Loader';
import {
  getLinkToCatalog,
  getLinkToTransportCatalog,
} from 'utility/helpers/linkmakers';

import styles from './subcategories.module.scss';

const Subcategories = () => {
  const router = useRouter();
  const { data: subcategories, isLoading } = useSelector(
    selectCategoriesSubcategoriesList,
  );

  const { categorySlug } = router.query;
  const transportId = useSelector(selectTransportId);

  const isTransportSearch = transportId;

  return (
    <Box
      className={styles.mainContainer}
      sx={{ display: { xs: 'none', md: 'block' } }}
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

              const linkToTransportCatalog = getLinkToTransportCatalog({
                categorySlug,
                subcategorySlug,
                transportId,
              });

              const link = isTransportSearch
                ? linkToTransportCatalog
                : linkToCatalog;

              return (
                <Link key={subcategorySlug} href={link}>
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
