import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useRouter as useNextRouter } from 'next/router';

import { Category } from 'components/base/catalog/Category';
import { NavigationBreadcrumbs } from 'components/main/NavigationBreadcrumbs';
import { Catalog } from 'components/base/catalog/Catalog';

import { selectCategoriesTreeList } from 'store/reducers/catalog/selectors';

const CatalogPage: FC = () => {
  const router = useNextRouter();

  const slug = router.query.name;
  const categoriesTree = useSelector(selectCategoriesTreeList);

  const category = categoriesTree.find((item) => item.slug === slug);

  return (
    <>
      <NavigationBreadcrumbs />
      {category ? <Category slug={slug} /> : <Catalog />}
    </>
  );
};

export default CatalogPage;
