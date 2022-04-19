import React, { FC } from 'react';

import { CatalogTitle } from 'components/base/catalog/CatalogTitle';
import { CatalogMain } from 'components/base/catalog/CatalogMain';

export const Catalog: FC = () => (
  <>
    <CatalogTitle />
    <CatalogMain />
  </>
);
