import { useMemo } from 'react';

import { getCrumblistFromURL, getCrumbs } from './helpers';

import { UseBreadcrumbs } from './types';

const useBreadcrumbs = ({
  router,
  data,
  lastTitle,
  transportId,
  isAddDefaultPaths,
}: UseBreadcrumbs) =>
  useMemo(() => {
    const paths = getCrumbs(data);

    const crumblist = getCrumblistFromURL({
      router,
      paths,
      lastTitle,
      transportId,
      isAddDefaultPaths,
    });

    return crumblist;
  }, [router, data, lastTitle, transportId, isAddDefaultPaths]);

export { useBreadcrumbs };
