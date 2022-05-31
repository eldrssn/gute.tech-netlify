import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import {
  fetchCategoriesFiltersList,
  fetchTransportFilterList,
} from 'store/reducers/catalog/actions';

import { QueryUrl } from 'constants/variables';
import { useRouterQuery } from 'hooks/useRouterQuery';
import { makeStringify } from 'utility/helpers';

import { CatalogTitle } from '../CatalogTitle';
import { CatalogMain } from '../CatalogMain';

const Catalog: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { getQueryOption } = useRouterQuery();

  const transportId = getQueryOption(QueryUrl.TRANSPORT_ID);

  const { subcategorySlug } = router.query;

  useEffect(() => {
    if (!subcategorySlug) {
      return;
    }

    const getSearchTransportFilterList = (subcategorySlug: string) => {
      if (!transportId || Array.isArray(transportId)) {
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
  }, [subcategorySlug, dispatch, transportId]);

  return (
    <>
      <CatalogTitle />
      <CatalogMain />
    </>
  );
};

export { Catalog };
