import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import cn from 'classnames';

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
import { Props } from './types';
import styles from './styles.module.scss';

const SubcategoriesList: FC<Props> = ({ isCatalog }) => {
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

  useEffect(() => {
    const getCategorySlugOnProductPage = () =>
      categorySlugAnArray[categorySlugAnArray.length - 2];

    const сategorySlug = isProductInCategorySlug
      ? getCategorySlugOnProductPage()
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
    categorySlugAnArray,
    dispatch,
    isProductInCategorySlug,
    lastCategorySlug,
  ]);

  const handleClick = (categorySlug: string) => {
    if (isProductInCategorySlug) {
      const pathWithoutProductSlug = getPathWithoutProductSlug(asPath);

      return router.push(`${pathWithoutProductSlug}/${categorySlug}`);
    }

    return router.push(getLinkToCatalog({ asPath, categorySlug, transportId }));
  };

  return (
    <Box
      className={cn(styles.mainContainer, {
        [styles.mainContainerParentCategory]: isCatalog,
      })}
      sx={{
        display: { xs: isCatalog ? 'block' : 'none', md: 'block' },
      }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {subcategories.length > 0 ? (
            subcategories.map(({ title, slug: categorySlug }) => {
              return (
                <a key={categorySlug} onClick={() => handleClick(categorySlug)}>
                  <Box className={styles.catalogItem}>{title}</Box>
                </a>
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
