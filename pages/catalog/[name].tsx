import React, { FC } from 'react';
import { useRouter as useNextRouter } from 'next/router';

import { Category } from 'components/base/catalog/Category';
import { NavigationBreadcrumbs } from 'components/main/NavigationBreadcrumbs';

const Catalog: FC = () => {
  const router = useNextRouter();

  const url = router.query.name;

  return (
    <>
      <NavigationBreadcrumbs />
      <Category url={url} />
    </>
  );
};

export default Catalog;
