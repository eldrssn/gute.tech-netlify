import React, { useCallback, useEffect, useMemo, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { useRouterQuery } from 'hooks/useRouterQuery';
import { setQueryParam } from 'hooks/useRouterQuery/helpers';
import { Filter } from 'types';

import { checkFilterListLarge, sliceFilters } from '../CheckboxGroup/helpers';
import { FiltersButton } from '../FiltersButton';
import { ExpandedFilters } from './components/ExpandedFilters';
import { Filters } from './components/Filters';

import styles from './radioBox.module.scss';

const RadioBox: React.FC<Filter> = ({
  filter,
  setFilterRequest,
  handleAnchorClick,
}) => {
  const routerQuery = useRouterQuery();

  const [isHiddenFilters, setHiddenFilters] = useState(true);

  const { title, slug, values } = filter;

  const queryOption = routerQuery.getQueryOption(slug);

  const setOnChange = setQueryParam(routerQuery, slug, false);

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

  const getIsChecked = useCallback(
    (name: string) => {
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
    <FormControl component='div' className={styles.radioBoxContainer}>
      <FormLabel focused={false} id='radio' className={styles.title}>
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

export { RadioBox };
