import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';

import { QueryUrl } from 'constants/variables';
import { useRouterQuery } from 'hooks/useRouterQuery';
import {
  selectCategoriesFilterList,
  selectTransportFilterList,
} from 'store/reducers/catalog/selectors';
import { Loader } from 'components/ui/Loader';

import { componentByType } from './constants';
import { CatalogFilterProps } from './types';

import styles from './catalogFilter.module.scss';

const CatalogFilter: FC<CatalogFilterProps> = ({ setFilterRequest }) => {
  const routerQuery = useRouterQuery();
  const router = useRouter();

  const { slug } = router.query;

  const transportQuery = routerQuery.getQueryOption(QueryUrl.TRANSPORT_QUERY);

  const currentSelector = transportQuery
    ? selectTransportFilterList
    : selectCategoriesFilterList;

  const { isLoading, data: filters } = useSelector(currentSelector);

  const isTransportQuery =
    Array.isArray(transportQuery) && transportQuery.length > 0;

  const getTransportSlug = () => {
    if (isTransportQuery) {
      const transportQueryFormatted = transportQuery.map(
        (query) => `${QueryUrl.TRANSPORT_QUERY}=${query}`,
      );
      return transportQueryFormatted.join('&');
    }
  };

  const goToFiltersUrl = () => {
    router.push(
      `/catalog/${slug}?${getTransportSlug()}&page=1&order=byPopularDown`,
      undefined,
      { shallow: true },
    );
  };

  useEffect(
    () => () => {
      setFilterRequest({});
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleResetClick = () => {
    transportQuery
      ? goToFiltersUrl()
      : router.push(`/catalog/${slug}?page=1&order=byPopularDown`);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <>
      {filters.map((filter) => {
        const Component = componentByType[filter.type];

        return (
          <Component
            key={filter.slug}
            filter={filter}
            setFilterRequest={setFilterRequest}
          />
        );
      })}

      <Box
        sx={{ marginBottom: { xs: '40px', md: 0 } }}
        className={styles.resetButton}
        onClick={handleResetClick}
      >
        Cбросить фильтры
      </Box>
    </>
  );
};

export { CatalogFilter };
