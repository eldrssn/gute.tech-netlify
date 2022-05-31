import { TreeCategoryResponseData } from 'api/models/catalog';
import { PAGE_QUERY } from 'components/base/catalog/constants';
import { QueryUrl } from 'constants/variables';
import { getTransportSlugs } from 'utility/helpers/linkmakers';
import { SEARCH_TEXT } from './constants';
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

    return {
      ...crumbs,
      [item.slug]: item.title,
      ...childrenCrumbs,
    };
  }, {});
};

const getCrumblistFromQuery: GetCrumbs = (router, paths) => {
  const { transport, transport_id, category } = router.query;

  if (transport && transport_id) {
    const currentPath = router.asPath;

    const parsedPaths = currentPath.split('category=');

    return parsedPaths.map((path, index) => {
      const href = parsedPaths.slice(0, index + 1).join('');

      const isCategory =
        typeof category === 'string' && href.includes(category);

      return isCategory
        ? {
            text: paths[category],
            href: currentPath,
          }
        : {
            text: 'Поиск по вашему авто',
            href,
          };
    });
  }

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
      text = SEARCH_TEXT;
    }

    return { href, text };
  });

  return crumblist;
};

const getCrumblistFromURL: GetCrumbs = (router, paths, lastTitle) => {
  const [asPathWithoutQuery] = router.asPath.split('?');
  const asPathNestedRoutes = asPathWithoutQuery
    .split('/')
    .filter((slug) => slug.length > 0);

  const { transport, transport_id } = router.query;

  const [, category, subcategory] = asPathNestedRoutes;

  if (transport && transport_id) {
    const transportDetails = getTransportSlugs({
      transportQuery: transport,
      transportId: transport_id,
    });

    const transportCrumblist = asPathNestedRoutes.map((subpath, index) => {
      if (index === 1) {
        const text = paths[subpath];
        const href = `/?${transportDetails}&${QueryUrl.CATEGORY_QUERY}=${category}`;
        return { text, href };
      }

      if (index === 2) {
        const text = paths[subpath];
        const href = `/catalog/${category}/${subcategory}?${transportDetails}&${PAGE_QUERY}`;
        return { text, href };
      }

      if (index === 3) {
        const text = lastTitle;
        const href = router.asPath;
        return { text, href };
      }

      return { text: paths[subpath], href: subpath };
    });

    const homeCrumb = {
      text: SEARCH_TEXT,
      href: `/?${transportDetails}`,
    };

    return [homeCrumb, ...transportCrumblist.slice(1)];
  }

  const crumblist = asPathNestedRoutes.map((subpath, index) => {
    const href = '/' + asPathNestedRoutes.slice(0, index + 1).join('/');
    const text = paths[subpath] || lastTitle;

    return { href, text };
  });

  return crumblist.slice(1);
};

export { getCrumbs, getCrumblistFromQuery, getCrumblistFromURL };
