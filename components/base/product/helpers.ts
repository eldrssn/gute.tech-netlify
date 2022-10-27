import { NextRouter } from 'next/router';
import { makeAnArray } from 'utility/helpers';

const getProductSlug = (categorySlug: string) =>
  categorySlug.split('_')[1].split('&')[0];

const getProductSlugQuery = (router: NextRouter) => {
  const { categorySlug } = router.query;
  const categorySlugAnArray = makeAnArray(categorySlug);
  const productSlug = getProductSlug(
    categorySlugAnArray[categorySlugAnArray.length - 1],
  );
  return productSlug;
};

export { getProductSlug, getProductSlugQuery };
