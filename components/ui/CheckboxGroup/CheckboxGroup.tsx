import React, { useCallback, useEffect, useMemo, useState } from 'react';

import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { useRouterQuery } from 'hooks/useRouterQuery';
import { CheckboxValue } from 'api/models/catalog';
import { Filter } from 'types';

import styles from './checkboxGroup.module.scss';
import { checkFilterListLarge, sliceFilters } from './helpers';
import { Button } from './compoments/Button';
import { Filters } from './compoments/Filters';
import { ExpandedFilters } from './compoments/ExpandedFilters';

const CheckboxGroup: React.FC<Filter> = ({
  filter,
  setFilterRequest,
  handleAnchorClick,
}) => {
  const [isHiddenFilters, setHiddenFilters] = useState(true);
  const { updateQueryOption, getQueryOption, removeQuery } = useRouterQuery();

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
      if (!checked) {
        removeQuery(slug, value, false);
        return;
      }
      updateQueryOption(slug, value, false);
    },
    [removeQuery, slug, updateQueryOption],
  );

  const getIsChecked = useCallback(
    (name?: string) => {
      if (!name) {
        return;
      }

      if (!Array.isArray(queryOption)) {
        const isChecked = queryOption === name;

        return isChecked;
      }

      const isChecked = Boolean(
        queryOption.find((element) => element === name),
      );

      return isChecked;
    },
    [queryOption],
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
        <Button onClick={toggleHiddenFilters}>
          {isHiddenFilters ? 'Показать все' : 'Свернуть'}
        </Button>
      )}
    </FormControl>
  );
};

export { CheckboxGroup };
