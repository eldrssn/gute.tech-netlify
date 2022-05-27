import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import {
  fetchCategoriesFiltersList,
  fetchTransportFilterList,
} from 'store/reducers/catalog/actions';

import { CatalogTitle } from '../CatalogTitle';
import { CatalogMain } from '../CatalogMain';

import { makeStringify } from '../helpers';
import { QueryUrl } from 'constants/variables';
import { useRouterQuery } from 'hooks/useRouterQuery';
import { getSlugsFromUrl } from 'utility/helpers';

const Catalog: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { getQueryOption } = useRouterQuery();

  const transportQuery = getQueryOption(QueryUrl.TRANSPORT_QUERY);

  const { slug } = router.query;

  useEffect(() => {
    if (!slug) {
      return;
    }

    const getSearchTransportFilterList = (slug: string) => {
      if (typeof transportQuery === 'string' || !transportQuery) {
        return;
      }

      const transportSlugs = getSlugsFromUrl(transportQuery);

      const { brandSlug, modelSlug, yearSlug, engineSlug } = transportSlugs;

      dispatch(
        fetchTransportFilterList({
          brandSlug,
          modelSlug,
          yearSlug,
          engineSlug,
          categorySlug: slug,
        }),
      );
    };

    const stringifySlug = makeStringify(slug);

    transportQuery
      ? getSearchTransportFilterList(stringifySlug)
      : dispatch(fetchCategoriesFiltersList({ categorySlug: stringifySlug }));
  }, [slug, dispatch, transportQuery]);

  return (
    <>
      <CatalogTitle />
      <CatalogMain />
    </>
  );
};

export { Catalog };
