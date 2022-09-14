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
  filterRequest,
  filter,
  setFilterRequest,
  handleAnchorClick,
}) => {
  const [isHiddenFilters, setHiddenFilters] = useState(true);
  const { getQueryOption } = useRouterQuery();

  const { title, slug, values } = filter;

  const queryOption = getQueryOption(slug);

  const isFilterListLarge = checkFilterListLarge(values);

  const toggleHiddenFilters = () =>
    setHiddenFilters((isHiddenFilters) => !isHiddenFilters);

  const filters = useMemo(() => {
    if (isHiddenFilters) {
      return isFilterListLarge ? sliceFilters(values) : values;
    }

    return values;
  }, [values, isFilterListLarge, isHiddenFilters]);

  const filterGroup = filterRequest?.[slug];

  useEffect(() => {
    if (queryOption) {
      const options = Array.isArray(queryOption) ? queryOption : [queryOption];
      setFilterRequest((filterRequest) => ({
        ...filterRequest,
        [slug]: options,
      }));
      return;
    }
    setFilterRequest((filterRequest) => ({
      ...filterRequest,
      [slug]: [],
    }));
  }, [setFilterRequest, queryOption, slug]);

  const setOnChange = useCallback(
    (checked: boolean, { value }: CheckboxValue) => {
      if (!filterGroup) {
        return;
      }

      if (!checked) {
        setFilterRequest((filterRequest) => ({
          ...filterRequest,
          [slug]: filterGroup.filter((filter) => filter !== value),
        }));
        return;
      }

      setFilterRequest((filterRequest) => ({
        ...filterRequest,
        [slug]: [...filterGroup, value],
      }));
    },
    [slug, setFilterRequest, filterGroup],
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
