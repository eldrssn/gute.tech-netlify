import React, { FC } from 'react';

import { NavigationBreadcrumbs } from 'components/main/NavigationBreadcrumbs';
import { Catalog } from 'components/base/catalog/Catalog';

const CatalogPage: FC = () => (
  <>
    <NavigationBreadcrumbs />
    <Catalog />
  </>
);

export default CatalogPage;
