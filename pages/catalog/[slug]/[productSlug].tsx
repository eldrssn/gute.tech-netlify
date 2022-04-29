import { makeStringify } from 'components/base/catalog/helpers';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchCategoriesProductsRead,
  fetchCategoriesSubcategoriesList,
} from 'store/reducers/catalog/actions';

import { ProductMain } from 'components/base/product/ProductMain';

const Product = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { slug, productSlug } = router.query;

  const stringifiedCategorySlug = makeStringify(slug);
  const stringifiedProductSlug = makeStringify(productSlug);

  useEffect(() => {
    if (!stringifiedCategorySlug || !stringifiedProductSlug) {
      return;
    }

    dispatch(
      fetchCategoriesProductsRead({
        categorySlug: stringifiedCategorySlug,
        productSlug: stringifiedProductSlug,
      }),
    );
    dispatch(
      fetchCategoriesSubcategoriesList({
        categorySlug: stringifiedCategorySlug,
      }),
    );
  }, [stringifiedCategorySlug, stringifiedProductSlug, dispatch]);

  return <ProductMain />;
};

export default Product;
