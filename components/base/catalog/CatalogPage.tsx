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
import { Props } from './types';

const CatalogPage: FC<Props> = ({ isParentCategory }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const transportId = useSelector(selectTransportId);

  const { subcategorySlug, categorySlug } = router.query;

  useEffect(() => {
    const getSearchTransportFilterList = (categorySlug: string) => {
      if (!transportId) {
        return;
      }

      dispatch(
        fetchTransportFilterList({
          transportId,
          categorySlug,
        }),
      );
    };

    const stringifySlug = makeStringify(
      isParentCategory ? categorySlug : subcategorySlug,
    );

    transportId
      ? getSearchTransportFilterList(stringifySlug)
      : dispatch(
          fetchCategoriesFiltersList({ subcategorySlug: stringifySlug }),
        );

    return () => {
      dispatch(clearCatalog());
    };
  }, [subcategorySlug, dispatch, transportId, categorySlug, isParentCategory]);

  return (
    <>
      <CatalogTitle />
      <CatalogMain isParentCategory={isParentCategory} />
    </>
  );
};

export { CatalogPage };
