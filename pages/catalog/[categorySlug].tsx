import React, { FC } from 'react';
import { useRouter } from 'next/router';

import { Category } from 'components/base/catalog/components/Category';
import { NavigationBreadcrumbs } from 'components/main/NavigationBreadcrumbs';

const CatalogPage: FC = () => {
  const router = useRouter();
  const { categorySlug } = router.query;

  return (
    <>
      <NavigationBreadcrumbs />
      <Category categorySlug={categorySlug} />
    </>
  );
};

export default CatalogPage;
