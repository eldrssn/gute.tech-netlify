import React, { FC } from 'react';
import { useRouter as useNextRouter } from 'next/router';

import { Category } from 'components/base/catalog/Category';
import { NavigationBreadcrumbs } from 'components/main/NavigationBreadcrumbs';
import { Catalog } from 'components/base/catalog/Catalog';

import { catalogData } from 'mock/catalogData';

const CatalogPage: FC = () => {
  const router = useNextRouter();

  const url = router.query.name;
  const category = catalogData.find((item) => item.url === url);

  return (
    <>
      <NavigationBreadcrumbs />
      {category ? <Category url={url} /> : <Catalog />}
    </>
  );
};

export default CatalogPage;
