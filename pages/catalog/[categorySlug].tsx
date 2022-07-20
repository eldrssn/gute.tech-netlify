import React, { FC } from 'react';
import { useRouter } from 'next/router';

import { useWindowSize } from 'hooks/useWindowSize';

import { Category } from 'components/base/catalog/components/Category';
import { NavigationBreadcrumbs } from 'components/main/NavigationBreadcrumbs';
import { SearchField } from 'components/main/Header/components/SearchField';

const CatalogPage: FC = () => {
  const router = useRouter();
  const { categorySlug } = router.query;
  const { isMobile } = useWindowSize();

  return (
    <>
      {isMobile && <SearchField />}
      <NavigationBreadcrumbs />
      <Category categorySlug={categorySlug} />
    </>
  );
};

export default CatalogPage;
