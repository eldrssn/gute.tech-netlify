import { TreeCategoryResponseData } from 'api/models/catalog';
import { GetCrumbs } from './types';

export const getCrumbs = (
  catalogTree?: TreeCategoryResponseData[],
): Record<string, string> => {
  if (!catalogTree) {
    return {};
  }

  return catalogTree.reduce((crumbs, item) => {
    const childrenCrumbs = item.children?.length
      ? getCrumbs(item.children)
      : {};

    return { ...crumbs, [item.slug]: item.title, ...childrenCrumbs };
  }, {});
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

export const getCrumblistFromURL: GetCrumbs = (router, paths, lastTitle) => {
  const [asPathWithoutQuery] = router.asPath.split('?');
  const asPathNestedRoutes = asPathWithoutQuery
    .split('/')
    .filter((slug) => slug.length > 0);

  const crumblist = asPathNestedRoutes.map((subpath, index) => {
    const href = '/' + asPathNestedRoutes.slice(0, index + 1).join('/');
    const text = paths[subpath] || lastTitle;

    return { href, text };
  });

  return crumblist;
};
