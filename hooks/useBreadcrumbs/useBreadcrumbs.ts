import { useMemo } from 'react';

import {
  getCrumblistFromQuery,
  getCrumblistFromURL,
  getCrumbs,
} from './helpers';

import { UseBreadcrumbs } from './types';

const defaultPath: Record<string, string> = {
  catalog: 'Каталог',
};

export const useBreadcrumbs = ({
  router,
  data,
  isQuery,
  lastTitle,
}: UseBreadcrumbs) =>
  useMemo(() => {
    const newPaths = getCrumbs(data);
    const paths = { ...defaultPath, ...newPaths };

    const crumblist = isQuery
      ? getCrumblistFromQuery(router, paths)
      : getCrumblistFromURL(router, paths, lastTitle);

    return [{ href: '/', text: 'Главная' }, ...crumblist];
  }, [router, data, isQuery, lastTitle]);
