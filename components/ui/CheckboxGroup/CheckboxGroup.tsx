import React, { useCallback, useEffect, useMemo, useState } from 'react';

import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { useRouterQuery } from 'hooks/useRouterQuery';
import { CheckboxValue } from 'api/models/catalog';
import { Filter } from 'types';

import { checkFilterListLarge, sliceFilters } from './helpers';
import { FiltersButton } from '../FiltersButton';
import { Filters } from './compoments/Filters';
import { ExpandedFilters } from './compoments/ExpandedFilters';

import styles from './checkboxGroup.module.scss';

const CheckboxGroup: React.FC<Filter> = ({
  filtersRequest,
  filter,
  setFiltersRequest,
  handleAnchorClick,
}) => {
  const [isHiddenFilters, setHiddenFilters] = useState(true);
  const { getQueryOption } = useRouterQuery();

  const { title, slug, values } = filter;

  const isFilterListLarge = checkFilterListLarge(values);

  const toggleHiddenFilters = () => {
    setHiddenFilters((isHiddenFilters) => !isHiddenFilters);
  };

  const filters = useMemo(() => {
    if (isHiddenFilters) {
      return isFilterListLarge ? sliceFilters(values) : values;
    }

    return values;
  }, [values, isFilterListLarge, isHiddenFilters]);

  const filterGroup = filtersRequest?.[slug];

  useEffect(() => {
    const queryOption = getQueryOption(slug);

    if (queryOption) {
      const options = Array.isArray(queryOption) ? queryOption : [queryOption];
      setFiltersRequest((filtersRequest) => ({
        ...filtersRequest,
        [slug]: options,
      }));
      return;
    }
    setFiltersRequest((filtersRequest) => ({
      ...filtersRequest,
      [slug]: [],
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setOnChange = useCallback(
    (checked: boolean, { value }: CheckboxValue) => {
      if (!filterGroup) {
        return;
      }

      if (!checked) {
        setFiltersRequest((filtersRequest) => ({
          ...filtersRequest,
          [slug]: filterGroup.filter((filter) => filter !== value),
        }));
        return;
      }

      setFiltersRequest((filtersRequest) => ({
        ...filtersRequest,
        [slug]: [...filterGroup, value],
      }));
    },
    [slug, setFiltersRequest, filterGroup],
  );

  const getIsChecked = useCallback(
    (name?: string) => {
      if (!name) {
        return;
      }

      const isChecked = Boolean(
        filterGroup?.find((element) => element === name),
      );

      return isChecked;
    },
    [filterGroup],
  );

  return (
    <FormControl component='div' className={styles.checkboxContainer}>
      <FormLabel focused={false} id={slug} className={styles.title}>
        {title}
      </FormLabel>

      {isHiddenFilters ? (
        <Filters
          filters={filters}
          setOnChange={setOnChange}
          getIsChecked={getIsChecked}
          handleAnchorClick={handleAnchorClick}
        />
      ) : (
        <ExpandedFilters
          slug={slug}
          filters={filters}
          setOnChange={setOnChange}
          getIsChecked={getIsChecked}
          handleAnchorClick={handleAnchorClick}
          setFiltersRequest={setFiltersRequest}
        />
      )}

      {isFilterListLarge && (
        <FiltersButton onClick={toggleHiddenFilters}>
          {isHiddenFilters ? 'Показать все' : 'Свернуть'}
        </FiltersButton>
      )}
    </FormControl>
  );
};

export { CheckboxGroup };
