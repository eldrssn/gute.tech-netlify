import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Loader } from 'components/ui/Loader';

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

const Catalog: FC = () => {
  const router = useRouter();

  const { categorySlug } = router.query;

  const { isMobile } = useWindowSize();
  const transportId = useSelector(selectTransportId);

  const categoryTreeListSelector = transportId
    ? selectTransportReadCategories
    : selectCategoriesTreeList;
  const categoriesTreeList = useSelector(categoryTreeListSelector);

  const { data: categoriesTreeListData, isLoading } = categoriesTreeList;
  const category = categoriesTreeListData.find(
    (category) => category.slug === categorySlug,
  );

  if (isLoading) {
    return <Loader />;
  }

  if (!category) {
    return <PageNotFound />;
  }

  const isProductFoundInCategory = transportId
    ? category.category_found > 0
    : category.category_total > 0;

  return (
    <>
      {isMobile && <SearchField />}
      <NavigationBreadcrumbs />
      {isProductFoundInCategory ? (
        <CatalogPage isParentCategory />
      ) : (
        <HomePage isParentCategory />
      )}
    </>
  );
};

export default Catalog;
