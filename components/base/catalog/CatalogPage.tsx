import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import {
  clearCatalog,
  fetchCategoriesFiltersList,
  fetchTransportFilterList,
} from 'store/reducers/catalog/actions';
import { makeStringify } from 'utility/helpers';
import { selectTransportId } from 'store/reducers/transport/selectors';

import { CatalogTitle } from './components/CatalogTitle';
import { CatalogMain } from './components/CatalogMain';

const CatalogPage: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const transportId = useSelector(selectTransportId);

  const { subcategorySlug } = router.query;

  useEffect(() => {
    if (!subcategorySlug) {
      return;
    }

    const getSearchTransportFilterList = (subcategorySlug: string) => {
      if (!transportId) {
        return;
      }

      dispatch(
        fetchTransportFilterList({
          transportId,
          subcategorySlug,
        }),
      );
    };

    const stringifySlug = makeStringify(subcategorySlug);

    transportId
      ? getSearchTransportFilterList(stringifySlug)
      : dispatch(
          fetchCategoriesFiltersList({ subcategorySlug: stringifySlug }),
        );

    return () => {
      dispatch(clearCatalog());
    };
  }, [subcategorySlug, dispatch, transportId]);

  return (
    <>
      <CatalogTitle />
      <CatalogMain />
    </>
  );
};

export { CatalogPage };
