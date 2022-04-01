import React, { FC, Fragment } from 'react';
import Divider from '@mui/material/Divider';

import { Category } from 'components/base/catalog/Category';
import { NavigationBreadcrumbs } from 'components/main/NavigationBreadcrumbs';
import { catalogData } from 'mock/catalogData';

const CatalogMain: FC = () => (
  <>
    <NavigationBreadcrumbs />

    {catalogData.map((category) => (
      <Fragment key={category.id}>
        <Category url={category.url} />
        <Divider sx={{ paddingTop: '20px' }} />
      </Fragment>
    ))}
  </>
);

export default CatalogMain;
