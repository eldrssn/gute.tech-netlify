import React, { FC, useMemo, useState } from 'react';
import Box from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';

import { useRouterQuery } from 'hooks/useRouterQuery';
import { MIN_FILTERS_COUNT } from 'constants/variables';

import { Filters } from './Filters';
import { FiltersSmallButton } from '../../FiltersSmallButton';

import { checkIsAllFiltersChoosen, chooseAllFilters } from '../helpers';
import { ExpandedFilterProps } from '../types';
import styles from '../checkboxGroup.module.scss';

const ExpandedFilters: FC<ExpandedFilterProps> = ({
  slug,
  filters,
  setOnChange,
  getIsChecked,
  handleAnchorClick,
}) => {
  const router = useRouter();
  const { removeQuery, getQueryOption } = useRouterQuery();
  const [searchValue, setSearchValue] = useState('');

  const isAllFiltersChoosen = useMemo(
    () => checkIsAllFiltersChoosen(slug, getQueryOption, filters),
    [slug, getQueryOption, filters],
  );

  const isTooManyFilters = filters && filters?.length > MIN_FILTERS_COUNT;

  const handleChangeInput = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue);
  };

  const handleClickReset = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    removeQuery(slug, undefined, false);
    handleAnchorClick(event);
  };

  const handleClickChooseAllFilters = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    handleAnchorClick(event);
    chooseAllFilters(router, slug, filters);
  };

  return (
    <>
      {isTooManyFilters && (
        <TextField
          className={styles.textfield}
          placeholder='Найти'
          onChange={(event) => handleChangeInput(event)}
          value={searchValue}
        />
      )}

      {isAllFiltersChoosen ? (
        <FiltersSmallButton onClick={handleClickReset}>
          Снять все
        </FiltersSmallButton>
      ) : (
        <FiltersSmallButton onClick={handleClickChooseAllFilters}>
          Выбрать все
        </FiltersSmallButton>
      )}

      <Box className={styles.expandFilterList}>
        <Filters
          filters={filters}
          setOnChange={setOnChange}
          getIsChecked={getIsChecked}
          handleAnchorClick={handleAnchorClick}
          searchValue={searchValue}
        />
      </Box>
    </>
  );
};

export { ExpandedFilters };
