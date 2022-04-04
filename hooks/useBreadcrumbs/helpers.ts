import { CatalogChild } from 'types/catalog';
import { GetCrumbs } from './types';

export const getCrumbs = (catalogData?: CatalogChild[]) => {
  if (!catalogData) {
    return {};
  }

  return catalogData.reduce(
    (crumbs, item) => ({ ...crumbs, [item.url]: item.name }),
    {},
  );
};

export const getCrumblistFromQuery: GetCrumbs = (router, paths) => {
  const queryEntries = Object.entries(router.query);

  const crumblist = queryEntries.map(([key, subpath]) => {
    const href = '?' + [key, subpath].join('=');
    const text =
      typeof subpath === 'string'
        ? paths[subpath]
        : subpath?.map((path) => paths[path]).join(' ');

    return { href, text };
  });

  return crumblist;
};

export const getCrumblistFromURL: GetCrumbs = (router, paths) => {
  const [asPathWithoutQuery] = router.asPath.split('?');
  const asPathNestedRoutes = asPathWithoutQuery
    .split('/')
    .filter((slug) => slug.length > 0);

  const crumblist = asPathNestedRoutes.map((subpath, index) => {
    const href = '/' + asPathNestedRoutes.slice(0, index + 1).join('/');
    const text = paths[subpath];

    return { href, text };
  });

  return crumblist;
};
