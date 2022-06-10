import { useMemo } from 'react';

import {
  getCrumblistFromQuery,
  getCrumblistFromURL,
  getCrumbs,
} from './helpers';

import { UseBreadcrumbs } from './types';

const useBreadcrumbs = ({
  router,
  data,
  isQuery,
  lastTitle,
  transportId,
}: UseBreadcrumbs) =>
  useMemo(() => {
    const paths = getCrumbs(data);

    const crumblist = isQuery
      ? getCrumblistFromQuery(router, paths, transportId)
      : getCrumblistFromURL(router, paths, lastTitle, transportId);

    return crumblist;
  }, [router, data, isQuery, lastTitle, transportId]);

export { useBreadcrumbs };
