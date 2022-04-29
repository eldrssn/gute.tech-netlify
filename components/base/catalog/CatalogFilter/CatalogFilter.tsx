import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { selectCategoriesFilterList } from 'store/reducers/catalog/selectors';
import { Loader } from 'components/ui/Loader';

import { componentByType } from './constants';

export const CatalogFilter: FC = () => {
  const filtersResponce = useSelector(selectCategoriesFilterList);
  const { isLoading, data } = filtersResponce;

  return isLoading ? (
    <Loader />
  ) : (
    <>
      {data.map((filter) => {
        const Component = componentByType[filter.type];

        return <Component key={filter.slug} filter={filter} />;
      })}
    </>
  );
};
