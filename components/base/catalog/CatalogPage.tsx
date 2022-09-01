import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import {
  clearCatalog,
  fetchCategoriesFiltersList,
  fetchTransportFilterList,
} from 'store/reducers/catalog/actions';
import { makeAnArray } from 'utility/helpers';
import { selectTransportId } from 'store/reducers/transport/selectors';

import { CatalogTitle } from './components/CatalogTitle';
import { CatalogMain } from './components/CatalogMain';

const CatalogPage: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const transportId = useSelector(selectTransportId);

  const { categorySlug } = router.query;
  const categorySlugAnArray = makeAnArray(categorySlug);
  const lastCategorySlug = categorySlugAnArray[categorySlugAnArray.length - 1];

  useEffect(() => {
    const getSearchTransportFilterList = (categorySlug: string) => {
      dispatch(
        fetchTransportFilterList({
          transportId,
          categorySlug,
        }),
      );
    };

    transportId
      ? getSearchTransportFilterList(lastCategorySlug)
      : dispatch(
          fetchCategoriesFiltersList({ categorySlug: lastCategorySlug }),
        );

    return () => {
      dispatch(clearCatalog());
    };
  }, [dispatch, transportId, categorySlug, lastCategorySlug]);

  return (
    <>
      <CatalogTitle />
      <CatalogMain />
    </>
  );
};

export { CatalogPage };
