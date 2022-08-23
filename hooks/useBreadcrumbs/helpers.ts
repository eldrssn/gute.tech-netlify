import { TreeCategoryResponseData } from 'api/models/catalog';
import { PAGE_QUERY } from 'components/base/catalog/constants';
import { getTransportSlugs } from 'utility/helpers/linkmakers';
import { CATALOG_QUERY_DEFAULT } from 'utility/utils/constants';

import { defaultPaths, MAIN_TITLE } from './constants';
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

const getCrumblistFromURL: GetCrumbs = (
  router,
  paths,
  lastTitle,
  transportId,
) => {
  const [asPathWithoutQuery] = router.asPath.split('?');

  const asPathNestedRoutes = asPathWithoutQuery
    .split('/')
    .filter((slug) => slug.length > 0);

  const [, category, subcategory] = asPathNestedRoutes;

  if (transportId) {
    const transportDetails = getTransportSlugs({
      transportId,
    });

    const transportCrumblist = asPathNestedRoutes.map((subpath, index) => {
      if (index === 1) {
        const text = paths[subpath];
        const href = `/catalog/${category}`;
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
      text: MAIN_TITLE,
      href: `/?${transportDetails}`,
    };

    return [homeCrumb, ...transportCrumblist.slice(1)];
  }

  const crumblist = asPathNestedRoutes.map((subpath, index) => {
    const href = '/' + asPathNestedRoutes.slice(0, index + 1).join('/');

    const text = paths[subpath] || lastTitle;

    if (index === 2) {
      return { href: `${href}?${CATALOG_QUERY_DEFAULT}`, text };
    }

    return { href, text };
  });

  return [...defaultPaths, ...crumblist.slice(1)];
};

export { getCrumbs, getCrumblistFromURL };
