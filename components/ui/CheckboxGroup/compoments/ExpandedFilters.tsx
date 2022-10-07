import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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
  setFiltersRequest,
}) => {
  const { getQueryOption } = useRouterQuery();
  const [searchValue, setSearchValue] = useState('');

  const [isAllFiltersChoosen, setIsAllFiltersChoosen] = useState<
    boolean | (() => boolean)
  >(checkIsAllFiltersChoosen(slug, getQueryOption, filters));

  const toggleAllFiltersChoosen = () => {
    setIsAllFiltersChoosen((isAllFiltersChoosen) => !isAllFiltersChoosen);
  };

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
    setFiltersRequest((filtersRequest) => ({
      ...filtersRequest,
      [slug]: [],
    }));

    toggleAllFiltersChoosen();
    handleAnchorClick(event);
  };

  const handleClickChooseAllFilters = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    toggleAllFiltersChoosen();
    handleAnchorClick(event);
    chooseAllFilters({ setFiltersRequest, slug, filters });
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
