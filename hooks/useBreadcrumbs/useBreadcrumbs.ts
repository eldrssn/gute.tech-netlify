import { useMemo } from 'react';

import {
  getCrumblistFromQuery,
  getCrumblistFromURL,
  getCrumbs,
} from './helpers';

import { UseBreadcrumbs } from './types';

const useBreadcrumbs = ({ router, data, isQuery, lastTitle }: UseBreadcrumbs) =>
  useMemo(() => {
    const paths = getCrumbs(data);

    const crumblist = isQuery
      ? getCrumblistFromQuery(router, paths)
      : getCrumblistFromURL(router, paths, lastTitle);

    return crumblist;
  }, [router, data, isQuery, lastTitle]);

export { useBreadcrumbs };
