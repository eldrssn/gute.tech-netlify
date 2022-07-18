import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchCategoriesProductsRead,
  fetchCategoriesSubcategoriesList,
  fetchCategoriesSubcategoriesRead,
} from 'store/reducers/catalog/actions';
import { selectTransportId } from 'store/reducers/transport/selectors';

import { ProductPage } from 'components/base/product';
import { makeStringify } from 'utility/helpers';

const Product = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const transportId = useSelector(selectTransportId);

  const { categorySlug, productSlug } = router.query;

  const stringifiedCategorySlug = makeStringify(categorySlug);
  const stringifiedProductSlug = makeStringify(productSlug);

  useEffect(() => {
    if (!stringifiedCategorySlug || !stringifiedProductSlug) {
      return;
    }

    if (transportId) {
      dispatch(
        fetchCategoriesSubcategoriesRead({
          transportId,
          categorySlug: stringifiedCategorySlug,
        }),
      );
    }

    if (!transportId) {
      dispatch(
        fetchCategoriesSubcategoriesList({
          categorySlug: stringifiedCategorySlug,
        }),
      );
    }

    dispatch(
      fetchCategoriesProductsRead({
        categorySlug: stringifiedCategorySlug,
        productSlug: stringifiedProductSlug,
      }),
    );
  }, [stringifiedCategorySlug, stringifiedProductSlug, transportId, dispatch]);

  return <ProductPage />;
};

export default Product;
