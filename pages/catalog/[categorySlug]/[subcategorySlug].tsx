import React, { FC } from 'react';

import { NavigationBreadcrumbs } from 'components/main/NavigationBreadcrumbs';
import { CatalogPage } from 'components/base/catalog';

const Catalog: FC = () => (
  <>
    <NavigationBreadcrumbs />
    <CatalogPage />
  </>
);

export default Catalog;
