import React, { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import Box from '@mui/material/Box';

import { selectTransportId } from 'store/reducers/transport/selectors';
import {
  selectCategoriesSubcategoriesList,
  selectCategoriesSubcategoriesRead,
} from 'store/reducers/catalog/selectors';
import { Loader } from 'components/ui/Loader';
import {
  getLinkToCatalog,
  getLinkToTransportCatalog,
} from 'utility/helpers/linkmakers';

import { Props } from './types';
import styles from './styles.module.scss';

const SubcategoriesList: FC<Props> = ({ isParentCategory }) => {
  const router = useRouter();
  const transportId = useSelector(selectTransportId);

  const currentSelector = transportId
    ? selectCategoriesSubcategoriesRead
    : selectCategoriesSubcategoriesList;

  const { data: subcategories, isLoading } = useSelector(currentSelector);

  const { categorySlug } = router.query;

  const isTransportSearch = transportId;

  return (
    <Box
      className={cn(styles.mainContainer, {
        [styles.mainContainerParentCategory]: isParentCategory,
      })}
      sx={{ display: { xs: isParentCategory ? 'block' : 'none', md: 'block' } }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {subcategories.length > 0 ? (
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

export { SubcategoriesList };
