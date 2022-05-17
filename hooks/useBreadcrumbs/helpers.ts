import { TreeCategoryResponseData } from 'api/models/catalog';
import { GetCrumbs } from './types';

const getCrumbs = (
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

const getCrumblistFromQuery: GetCrumbs = (router, paths) => {
  const queryEntries = Object.entries(router.query);

  const queryEntriesFormated = queryEntries.map(([key, subpath]) => {
    const subpathFormatted = Array.isArray(subpath)
      ? `${subpath.map((path) => [key, path].join('=')).join('&')}`
      : [key, subpath].join('=');

    return subpathFormatted;
  });

  const crumblist = queryEntries.map(([, subpath], index) => {
    const href = '?' + queryEntriesFormated.slice(0, index + 1).join('&');

    let text =
      typeof subpath === 'string'
        ? paths[subpath]
        : subpath?.map((path) => paths[path]).join(' ');

    if (href?.startsWith('?transport') && !href?.includes('category')) {
      text = 'Поиск по вашему авто';
    }

    return { href, text };
  });

  return crumblist;
};

const getCrumblistFromURL: GetCrumbs = (router, paths, lastTitle) => {
  const [asPathWithoutQuery, queryParams] = router.asPath.split('?');
  const asPathNestedRoutes = asPathWithoutQuery
    .split('/')
    .filter((slug) => slug.length > 0);

  const crumblist = asPathNestedRoutes.map((subpath, index) => {
    const href = '/' + asPathNestedRoutes.slice(0, index + 1).join('/');
    let text = paths[subpath] || lastTitle;

    if (queryParams?.startsWith('transport') && href?.endsWith('catalog')) {
      text = 'Поиск по вашему авто';
    }

    return { href, text };
  });

  return crumblist;
};

export { getCrumbs, getCrumblistFromQuery, getCrumblistFromURL };
