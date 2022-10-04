import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Link from 'next/link';

import { Loader } from 'components/ui/Loader';
import {
  fetchCategoriesSubcategoriesList,
  fetchCategoriesSubcategoriesRead,
} from 'store/reducers/catalog/actions';
import { selectTransportId } from 'store/reducers/transport/selectors';
import {
  selectCategoriesSubcategoriesList,
  selectCategoriesSubcategoriesRead,
} from 'store/reducers/catalog/selectors';
import { makeAnArray, getIsProductInCategorySlug } from 'utility/helpers';
import { getLinkToCatalog } from 'utility/helpers/linkmakers';

import { getPathWithoutProductSlug } from './helpers';
import styles from './styles.module.scss';

const SubcategoriesList: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const transportId = useSelector(selectTransportId);

  const currentSelector = transportId
    ? selectCategoriesSubcategoriesRead
    : selectCategoriesSubcategoriesList;

  const { data: subcategories, isLoading } = useSelector(currentSelector);

  const { query, asPath } = router;
  const { categorySlug } = query;
  const categorySlugAnArray = makeAnArray(categorySlug);
  const lastCategorySlug = categorySlugAnArray[categorySlugAnArray.length - 1];

  const isTransportSearch = Boolean(transportId);
  const isProductInCategorySlug = getIsProductInCategorySlug(lastCategorySlug);
  const categorySlugOnProductPage =
    categorySlugAnArray[categorySlugAnArray.length - 2];

  useEffect(() => {
    const сategorySlug = isProductInCategorySlug
      ? categorySlugOnProductPage
      : lastCategorySlug;

    if (isTransportSearch) {
      dispatch(
        fetchCategoriesSubcategoriesRead({
          transportId,
          categorySlug: сategorySlug,
        }),
      );
    }
    if (!isTransportSearch) {
      dispatch(
        fetchCategoriesSubcategoriesList({
          categorySlug: сategorySlug,
        }),
      );
    }
  }, [
    isTransportSearch,
    transportId,
    categorySlugOnProductPage,
    dispatch,
    isProductInCategorySlug,
    lastCategorySlug,
  ]);

  const getLink = (categorySlug: string) => {
    if (isProductInCategorySlug) {
      const pathWithoutProductSlug = getPathWithoutProductSlug(asPath);

      return getLinkToCatalog({
        asPath: pathWithoutProductSlug,
        categorySlug,
        transportId,
      });
    }

    return getLinkToCatalog({ asPath, categorySlug, transportId });
  };

  return (
    <Box>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {subcategories.length > 0 ? (
            subcategories.map(({ title, slug: categorySlug }) => (
              <Link key={categorySlug} href={getLink(categorySlug)}>
                <a>
                  <Box className={styles.catalogItem}>{title}</Box>
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

export { SubcategoriesList };
