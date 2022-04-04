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

export const useBreadcrumbs: UseBreadcrumbs = (router, data, isQuery) =>
  useMemo(() => {
    const newPaths: Record<string, string> = getCrumbs(data);
    const paths = { ...defaultPath, ...newPaths };

    const crumblist = isQuery
      ? getCrumblistFromQuery(router, paths)
      : getCrumblistFromURL(router, paths);

    return [{ href: '/', text: 'Главная' }, ...crumblist];
  }, [router, data, isQuery]);
