import React, { FC, Fragment } from 'react';
import { useSelector } from 'react-redux';
import Divider from '@mui/material/Divider';

import { selectCategoriesTreeList } from 'store/reducers/catalog/selectors';

import { Category } from 'components/base/catalog/Category';
import { NavigationBreadcrumbs } from 'components/main/NavigationBreadcrumbs';

const CatalogMain: FC = () => {
  const categoriesTree = useSelector(selectCategoriesTreeList);

  return (
    <>
      <NavigationBreadcrumbs />

      {categoriesTree?.map((category) => (
        <Fragment key={category.slug}>
          <Category slug={category.slug} />
          <Divider sx={{ paddingTop: '20px' }} />
        </Fragment>
      ))}
    </>
  );
};

export default CatalogMain;
