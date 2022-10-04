import { PRODUCT_MARKER } from 'utility/utils/constants';

const getSlugs = (allSlugs: string[]) => {
  const categorySlug = allSlugs[allSlugs.length - 2];
  const productLink = allSlugs[allSlugs.length - 1];
  const productSlug = productLink.split(PRODUCT_MARKER)[1];

  return [categorySlug, productSlug];
};

export { getSlugs };
