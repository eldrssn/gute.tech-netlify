import React, { FC, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { FiltersSmallButton } from 'components/ui/FiltersSmallButton/FiltersSmallButton';
import {
  checkIsAllFiltersChoosen,
  chooseAllFilters,
} from 'components/ui/CheckboxGroup/helpers';
import { useRouterQuery } from 'hooks/useRouterQuery';

import { Filters } from './Filters';
import { ExpandedFiltersProps } from '../types';

import styles from '../radioBox.module.scss';

const ExpandedFilters: FC<ExpandedFiltersProps> = ({
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
      <TextField
        className={styles.textfield}
        placeholder='Найти'
        onChange={(event) => handleChangeInput(event)}
        value={searchValue}
      />
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
