import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { fetchCategoriesFiltersList } from 'store/reducers/catalog/actions';

import { CatalogTitle } from '../CatalogTitle';
import { CatalogMain } from '../CatalogMain';

import { makeStringify } from '../helpers';

const Catalog: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { slug } = router.query;

  useEffect(() => {
    if (!slug) {
      return;
    }

    const stringifySlug = makeStringify(slug);

    dispatch(fetchCategoriesFiltersList({ categorySlug: stringifySlug }));
  }, [slug, dispatch]);

  return (
    <>
      <CatalogTitle />
      <CatalogMain />
    </>
  );
};

export { Catalog };
