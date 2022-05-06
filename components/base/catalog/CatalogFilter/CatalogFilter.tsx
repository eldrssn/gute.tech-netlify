import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { useRouterQuery } from 'hooks/useRouterQuery';
import { selectCategoriesFilterList } from 'store/reducers/catalog/selectors';
import { Loader } from 'components/ui/Loader';

import { componentByType } from './constants';
import { CatalogFilterProps } from './types';

import styles from './catalogFilter.module.scss';

const CatalogFilter: FC<CatalogFilterProps> = ({ setFilterRequest }) => {
  const { removeQuery } = useRouterQuery();
  const filtersResponce = useSelector(selectCategoriesFilterList);
  const { isLoading, data } = filtersResponce;

  const removeQueries = (data: string[]) => {
    data.map((slug) => {
      removeQuery(slug);
    });
  };

  const handleResetClick = () => {
    const filterSlugs = data.reduce<string[]>(
      (accumulator, { slug }) => [...accumulator, slug],
      [],
    );

    removeQueries(filterSlugs);
    setFilterRequest(
      filterSlugs.reduce(
        (accumulator, slug) => ({ ...accumulator, [slug]: [] }),
        {},
      ),
    );
  };

  return isLoading ? (
    <Loader />
  ) : (
    <>
      {data.map((filter) => {
        const Component = componentByType[filter.type];

        return (
          <Component
            key={filter.slug}
            filter={filter}
            setFilterRequest={setFilterRequest}
          />
        );
      })}

      <a className={styles.resetButton} onClick={handleResetClick}>
        Cбросить фильтры
      </a>
    </>
  );
};

export { CatalogFilter };
