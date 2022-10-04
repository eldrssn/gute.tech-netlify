import { TreeCategoryResponseData } from 'api/models/catalog';
import { getTransportSlugs } from 'utility/helpers/linkmakers';
import { CATALOG_QUERY_DEFAULT } from 'utility/utils/constants';
import { getIsProductInCategorySlug } from 'utility/helpers';

import { defaultPaths } from './constants';
import { TCrumbs } from './types';

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

const getCrumblistFromURL = ({
  router,
  paths,
  lastTitle,
  transportId,
  isAddDefaultPaths,
}: TCrumbs) => {
  const asPath = router.asPath.split('?')[0].split('/').splice(1);

  const crumblist = asPath.map((subpath, index) => {
    const href = '/' + asPath.slice(0, index + 1).join('/');

    const text = paths[subpath] || lastTitle;

    const isProductInCategorySlug = getIsProductInCategorySlug(subpath);

    if (index > 0 && !isProductInCategorySlug) {
      return {
        href: `${href}?${CATALOG_QUERY_DEFAULT}${
          transportId && getTransportSlugs({ transportId })
        }`,
        text,
      };
    }

    return { href, text };
  });

  return isAddDefaultPaths
    ? [...defaultPaths, ...crumblist.slice(1)]
    : [...crumblist.slice(1)];
};

export { getCrumbs, getCrumblistFromURL };
