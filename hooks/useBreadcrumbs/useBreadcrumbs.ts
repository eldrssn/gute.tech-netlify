import { useMemo } from 'react';
import { NextRouter } from 'next/router';

import { getCrumbs } from './helpers';
import { CatalogChild } from 'types/catalog';

const defaultPath: Record<string, string> = {
  catalog: 'Каталог',
};

export const useBreadcrumbs = (router: NextRouter, data?: CatalogChild[]) =>
  useMemo(() => {
    const newPaths: Record<string, string> = getCrumbs(data);
    const paths = { ...defaultPath, ...newPaths };
    const [asPathWithoutQuery] = router.asPath.split('?');
    const asPathNestedRoutes = asPathWithoutQuery
      .split('/')
      .filter((slug) => slug.length > 0);

    const crumblist = asPathNestedRoutes.map((subpath, index) => {
      const href = '/' + asPathNestedRoutes.slice(0, index + 1).join('/');
      const text = paths[subpath];

      return { href, text };
    });

    return [{ href: '/', text: 'Главная' }, ...crumblist];
  }, [router.asPath, data]);
