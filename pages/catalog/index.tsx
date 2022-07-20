import React, { FC, Fragment } from 'react';
import { useSelector } from 'react-redux';
import Divider from '@mui/material/Divider';

import { useWindowSize } from 'hooks/useWindowSize';
import { selectCategoriesTreeList } from 'store/reducers/catalog/selectors';

import { Category } from 'components/base/catalog/components/Category';
import { NavigationBreadcrumbs } from 'components/main/NavigationBreadcrumbs';
import { SearchField } from 'components/main/Header/components/SearchField';

const CatalogMain: FC = () => {
  const { data: categoriesTree } = useSelector(selectCategoriesTreeList);
  const { isMobile } = useWindowSize();

  return (
    <>
      {isMobile && <SearchField />}
      <NavigationBreadcrumbs />

      {categoriesTree?.map((category) => (
        <Fragment key={category.slug}>
          <Category categorySlug={category.slug} />
          <Divider sx={{ paddingTop: '20px' }} />
        </Fragment>
      ))}
    </>
  );
};

export default CatalogMain;
