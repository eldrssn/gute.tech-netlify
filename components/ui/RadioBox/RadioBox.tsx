import React, { useCallback, useEffect, useMemo, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { useRouterQuery } from 'hooks/useRouterQuery';
import { Filter } from 'types';

import { checkFilterListLarge, sliceFilters } from '../CheckboxGroup/helpers';
import { FiltersButton } from '../FiltersButton';
import { ExpandedFilters } from './components/ExpandedFilters';
import { Filters } from './components/Filters';

import styles from './radioBox.module.scss';

const RadioBox: React.FC<Filter> = ({
  filtersRequest,
  filter,
  setFiltersRequest,
  handleAnchorClick,
}) => {
  const { getQueryOption } = useRouterQuery();

  const [isHiddenFilters, setHiddenFilters] = useState(true);

  const { title, slug, values } = filter;

  const setOnChange = (event: ChangeEvent) => {
    const { value } = event.target;

    setFiltersRequest((filtersRequest) => ({
      ...filtersRequest,
      [slug]: [value],
    }));
  };

  const isFilterListLarge = checkFilterListLarge(values);

  const toggleHiddenFilters = () =>
    setHiddenFilters((isHiddenFilters) => !isHiddenFilters);

  const filterGroup = filtersRequest?.[slug];

  const filters = useMemo(() => {
    if (isHiddenFilters) {
      return isFilterListLarge ? sliceFilters(values) : values;
    }

    return values;
  }, [values, isFilterListLarge, isHiddenFilters]);

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

  const getIsChecked = useCallback(
    (name: string) => {
      const isChecked = Boolean(
        filterGroup?.find((element) => element === name),
      );

      return isChecked;
    },
    [filterGroup],
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
