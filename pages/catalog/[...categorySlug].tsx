import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { useWindowSize } from 'hooks/useWindowSize';

import { selectTransportId } from 'store/reducers/transport/selectors';
import {
  selectCategoriesTreeList,
  selectTransportReadCategories,
} from 'store/reducers/catalog/selectors';
import { CatalogPage } from 'components/base/catalog';
import { PageNotFound } from 'components/main/PageNotFound';
import HomePage from 'components/base/home';
import { NavigationBreadcrumbs } from 'components/main/NavigationBreadcrumbs';
import { SearchField } from 'components/main/Header/components/SearchField';
import {
  makeAnArray,
  getIsProductInCategorySlug,
  getCategory,
} from 'utility/helpers';
import { ProductPage } from 'components/base/product';
import { Loader } from 'components/ui/Loader';

const Catalog: FC = () => {
  const router = useRouter();

  const { isMobile } = useWindowSize();
  const transportId = useSelector(selectTransportId);

  const { categorySlug } = router.query;
  const categorySlugAnArray = makeAnArray(categorySlug);
  const lastCategorySlug = categorySlugAnArray[categorySlugAnArray.length - 1];

  const categoryTreeListSelector = transportId
    ? selectTransportReadCategories
    : selectCategoriesTreeList;
  const categoriesTreeList = useSelector(categoryTreeListSelector);
  const { data: categoriesTreeListData, isLoading } = categoriesTreeList;

  const isProductInCategorySlug = getIsProductInCategorySlug(lastCategorySlug);

  const category = getCategory({
    categoryTree: categoriesTreeListData,
    query: isProductInCategorySlug
      ? categorySlugAnArray.slice(0, -1)
      : categorySlugAnArray,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!category) {
    return <PageNotFound />;
  }

  if (isProductInCategorySlug) {
    return <ProductPage />;
  }

  const isProductFoundInCategory = transportId
    ? category.category_found > 0
    : category.category_total > 0;

  return (
    <>
      {isMobile && <SearchField />}
      <NavigationBreadcrumbs />
      {isProductFoundInCategory ? <CatalogPage /> : <HomePage isCatalog />}
    </>
  );
};

export default Catalog;
